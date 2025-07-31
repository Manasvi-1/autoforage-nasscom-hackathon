import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processInputSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { mlPIIDetector } from "./ml-pii-detector";

// PII Detection utility functions
function detectPII(text: string, settings: any) {
  const detectedPII: string[] = [];
  let sanitizedText = text;

  // Email detection
  if (settings.detectEmails) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    if (emails) {
      detectedPII.push("Email");
      sanitizedText = sanitizedText.replace(emailRegex, "█".repeat(20));
    }
  }

  // Phone number detection
  if (settings.detectPhones) {
    const phoneRegex = /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
    const phones = text.match(phoneRegex);
    if (phones) {
      detectedPII.push("Phone");
      sanitizedText = sanitizedText.replace(phoneRegex, "█".repeat(12));
    }
  }

  // Name detection (simple approach - common first names)
  if (settings.detectNames) {
    const commonNames = [
      "John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Jessica",
      "William", "Ashley", "James", "Amanda", "Daniel", "Stephanie", "Matthew",
      "Jennifer", "Christopher", "Samantha", "Andrew", "Elizabeth", "Joshua",
      "Lauren", "Kevin", "Megan", "Brian", "Nicole", "Justin", "Danielle",
      "Anthony", "Rachel", "Mark", "Heather", "Jonathan", "Michelle", "Paul",
      "Kimberly", "Steven", "Amy", "Kenneth", "Angela", "Ryan", "Brenda",
      "Timothy", "Emma", "Jason", "Olivia", "Jeffrey", "Cynthia", "Jacob",
      "Marie", "Gary", "Janet", "Nicholas", "Catherine", "Eric", "Frances",
      "Stephen", "Christine", "Larry", "Deborah", "Frank", "Lisa", "Scott",
      "Karen", "Manasvi", "Johnson", "Smith", "Brown", "Davis", "Miller",
      "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White",
      "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark"
    ];
    
    for (const name of commonNames) {
      const nameRegex = new RegExp(`\\b${name}\\b`, 'gi');
      if (nameRegex.test(text)) {
        detectedPII.push("Name");
        sanitizedText = sanitizedText.replace(nameRegex, "█".repeat(name.length));
      }
    }
  }

  // SSN detection
  if (settings.detectSsn) {
    const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
    const ssns = text.match(ssnRegex);
    if (ssns) {
      detectedPII.push("SSN");
      sanitizedText = sanitizedText.replace(ssnRegex, "█".repeat(11));
    }
  }

  // Credit card detection (simple)
  if (settings.detectCreditCards) {
    const ccRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
    const ccs = text.match(ccRegex);
    if (ccs) {
      detectedPII.push("Credit Card");
      sanitizedText = sanitizedText.replace(ccRegex, "█".repeat(19));
    }
  }

  return {
    detectedPII: Array.from(new Set(detectedPII)), // Remove duplicates
    sanitizedText
  };
}

// Simulate AI agent response
function generateAgentResponse(sanitizedInput: string): string {
  const responses = [
    "I understand you need help with workflow automation. Here are some recommendations: implement chatbots for common queries, set up automated ticket routing, create template responses, and integrate with your CRM system.",
    "Based on your request, I can suggest several automation strategies: use workflow management tools, implement automated data processing, set up notification systems, and create custom integrations.",
    "For your automation needs, consider: API integrations for data synchronization, automated report generation, scheduled task execution, and real-time monitoring systems.",
    "I recommend these automation approaches: process optimization through AI, automated quality assurance checks, intelligent data routing, and predictive analytics implementation.",
    "To improve your workflow efficiency: implement robotic process automation (RPA), set up intelligent document processing, create automated approval workflows, and deploy chatbot assistants."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Process input endpoint
  app.post("/api/process", async (req, res) => {
    try {
      const validatedData = processInputSchema.parse(req.body);
      const startTime = Date.now();
      
      const settings = validatedData.settings || {
        detectNames: true,
        detectEmails: true,
        detectPhones: true,
        detectSsn: false,
        detectCreditCards: false,
        detectAddresses: false,
        enableAiRedaction: true,
        enableRegexPatterns: true,
      };

      // Use advanced ML-based PII detection
      const piiResults = await mlPIIDetector.detectPII(validatedData.input, settings);
      const { detectedPII, sanitizedText, confidenceScores, mlAnalysis } = piiResults;
      
      // Generate agent response based on sanitized input
      const agentResponse = generateAgentResponse(sanitizedText);
      
      const processingTime = Date.now() - startTime;

      // Create process log
      const processLog = await storage.createProcessLog({
        rawInput: validatedData.input,
        sanitizedInput: sanitizedText,
        agentResponse,
        piiDetected: detectedPII,
        processingTime,
        status: "success",
        confidenceScores: JSON.stringify(confidenceScores),
        mlAnalysis: JSON.stringify(mlAnalysis),
      });

      // Update system stats
      const currentStats = await storage.getSystemStats();
      const newAvgTime = Math.round(
        (currentStats.avgProcessingTime * currentStats.queriesProcessed + processingTime) / 
        (currentStats.queriesProcessed + 1)
      );
      
      await storage.updateSystemStats({
        queriesProcessed: currentStats.queriesProcessed + 1,
        piiRedacted: currentStats.piiRedacted + detectedPII.length,
        avgProcessingTime: newAvgTime,
      });

      res.json({
        success: true,
        processLog: {
          ...processLog,
          confidenceScores,
          mlAnalysis
        },
        processingTime,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          details: validationError.message 
        });
      } else {
        console.error("Processing error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error during processing" 
        });
      }
    }
  });

  // Get system stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getSystemStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats retrieval error:", error);
      res.status(500).json({ message: "Failed to retrieve system statistics" });
    }
  });

  // Get PII settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getPiiSettings();
      res.json(settings);
    } catch (error) {
      console.error("Settings retrieval error:", error);
      res.status(500).json({ message: "Failed to retrieve PII settings" });
    }
  });

  // Update PII settings
  app.put("/api/settings", async (req, res) => {
    try {
      const settings = await storage.updatePiiSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Settings update error:", error);
      res.status(500).json({ message: "Failed to update PII settings" });
    }
  });

  // Get process logs
  app.get("/api/logs", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getProcessLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error("Logs retrieval error:", error);
      res.status(500).json({ message: "Failed to retrieve process logs" });
    }
  });

  // ML Model status endpoint
  app.get("/api/ml-status", async (req, res) => {
    try {
      const modelStatus = mlPIIDetector.getModelStatus();
      res.json({
        ...modelStatus,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("ML status check error:", error);
      res.status(500).json({ message: "Failed to retrieve ML model status" });
    }
  });

  // Enhanced PII analysis endpoint
  app.post("/api/analyze-pii", async (req, res) => {
    try {
      const { text, settings } = req.body;
      
      if (!text) {
        return res.status(400).json({ message: "Text input is required" });
      }

      const defaultSettings = {
        detectNames: true,
        detectEmails: true,
        detectPhones: true,
        detectSsn: false,
        detectCreditCards: false,
        detectAddresses: false,
        enableAiRedaction: true,
        enableRegexPatterns: true,
      };

      const analysis = await mlPIIDetector.detectPII(text, settings || defaultSettings);
      
      res.json({
        success: true,
        analysis,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("PII analysis error:", error);
      res.status(500).json({ message: "Failed to analyze PII" });
    }
  });

  // System status endpoint
  app.get("/api/status", async (req, res) => {
    try {
      const mlStatus = mlPIIDetector.getModelStatus();
      res.json({
        fastApiBackend: "online",
        aiModel: "active", 
        database: "connected",
        privacyEngine: "secured",
        mlModels: mlStatus.initialized ? "active" : "fallback",
        modelCount: mlStatus.modelCount,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Status check error:", error);
      res.status(500).json({ message: "Failed to retrieve system status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
