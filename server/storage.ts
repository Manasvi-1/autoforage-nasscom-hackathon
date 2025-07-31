import { type ProcessLog, type InsertProcessLog, type SystemStats, type InsertSystemStats, type PiiSettings, type InsertPiiSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Process Logs
  createProcessLog(log: InsertProcessLog): Promise<ProcessLog>;
  getProcessLogs(limit?: number): Promise<ProcessLog[]>;
  getProcessLogById(id: string): Promise<ProcessLog | undefined>;
  
  // System Stats
  getSystemStats(): Promise<SystemStats>;
  updateSystemStats(stats: Partial<InsertSystemStats>): Promise<SystemStats>;
  
  // PII Settings
  getPiiSettings(): Promise<PiiSettings>;
  updatePiiSettings(settings: Partial<InsertPiiSettings>): Promise<PiiSettings>;
}

export class MemStorage implements IStorage {
  private processLogs: Map<string, ProcessLog>;
  private systemStats: SystemStats;
  private piiSettings: PiiSettings;

  constructor() {
    this.processLogs = new Map();
    
    // Initialize system stats
    this.systemStats = {
      id: "global",
      queriesProcessed: 0,
      piiRedacted: 0,
      avgProcessingTime: 0,
      updatedAt: new Date(),
    };
    
    // Initialize PII settings
    this.piiSettings = {
      id: "global",
      detectNames: true,
      detectEmails: true,
      detectPhones: true,
      detectSsn: false,
      detectCreditCards: false,
      detectAddresses: false,
      enableAiRedaction: true,
      enableRegexPatterns: true,
      enableMlModels: true,
      mlConfidenceThreshold: 80,
    };
  }

  async createProcessLog(insertLog: InsertProcessLog): Promise<ProcessLog> {
    const id = randomUUID();
    const log: ProcessLog = {
      id,
      timestamp: new Date(),
      rawInput: insertLog.rawInput,
      sanitizedInput: insertLog.sanitizedInput,
      agentResponse: insertLog.agentResponse || null,
      piiDetected: insertLog.piiDetected || null,
      processingTime: insertLog.processingTime,
      status: insertLog.status || "success",
      confidenceScores: insertLog.confidenceScores || null,
      mlAnalysis: insertLog.mlAnalysis || null,
    };
    this.processLogs.set(id, log);
    return log;
  }

  async getProcessLogs(limit = 50): Promise<ProcessLog[]> {
    const logs = Array.from(this.processLogs.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    return logs;
  }

  async getProcessLogById(id: string): Promise<ProcessLog | undefined> {
    return this.processLogs.get(id);
  }

  async getSystemStats(): Promise<SystemStats> {
    return { ...this.systemStats };
  }

  async updateSystemStats(stats: Partial<InsertSystemStats>): Promise<SystemStats> {
    this.systemStats = {
      ...this.systemStats,
      ...stats,
      updatedAt: new Date(),
    };
    return { ...this.systemStats };
  }

  async getPiiSettings(): Promise<PiiSettings> {
    return { ...this.piiSettings };
  }

  async updatePiiSettings(settings: Partial<InsertPiiSettings>): Promise<PiiSettings> {
    this.piiSettings = {
      ...this.piiSettings,
      ...settings,
    };
    return { ...this.piiSettings };
  }
}

export const storage = new MemStorage();
