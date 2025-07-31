import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const processLogs = pgTable("process_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  rawInput: text("raw_input").notNull(),
  sanitizedInput: text("sanitized_input").notNull(),
  agentResponse: text("agent_response"),
  piiDetected: text("pii_detected").array(), // Array of detected PII types
  processingTime: integer("processing_time").notNull(), // in milliseconds
  status: varchar("status").notNull().default("success"),
  confidenceScores: text("confidence_scores"), // JSON string of confidence scores
  mlAnalysis: text("ml_analysis"), // JSON string of ML analysis data
});

export const systemStats = pgTable("system_stats", {
  id: varchar("id").primaryKey().default("global"),
  queriesProcessed: integer("queries_processed").notNull().default(0),
  piiRedacted: integer("pii_redacted").notNull().default(0),
  avgProcessingTime: integer("avg_processing_time").notNull().default(0), // in milliseconds
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const piiSettings = pgTable("pii_settings", {
  id: varchar("id").primaryKey().default("global"),
  detectNames: boolean("detect_names").notNull().default(true),
  detectEmails: boolean("detect_emails").notNull().default(true),
  detectPhones: boolean("detect_phones").notNull().default(true),
  detectSsn: boolean("detect_ssn").notNull().default(false),
  detectCreditCards: boolean("detect_credit_cards").notNull().default(false),
  detectAddresses: boolean("detect_addresses").notNull().default(false),
  enableAiRedaction: boolean("enable_ai_redaction").notNull().default(true),
  enableRegexPatterns: boolean("enable_regex_patterns").notNull().default(true),
  enableMlModels: boolean("enable_ml_models").notNull().default(true),
  mlConfidenceThreshold: integer("ml_confidence_threshold").notNull().default(80), // 0-100
});

export const insertProcessLogSchema = createInsertSchema(processLogs).omit({
  id: true,
  timestamp: true,
});

export const insertSystemStatsSchema = createInsertSchema(systemStats).omit({
  id: true,
  updatedAt: true,
});

export const insertPiiSettingsSchema = createInsertSchema(piiSettings).omit({
  id: true,
});

export const processInputSchema = z.object({
  input: z.string().min(1).max(10000),
  settings: z.object({
    detectNames: z.boolean().default(true),
    detectEmails: z.boolean().default(true),
    detectPhones: z.boolean().default(true),
    detectSsn: z.boolean().default(false),
    detectCreditCards: z.boolean().default(false),
    detectAddresses: z.boolean().default(false),
    enableAiRedaction: z.boolean().default(true),
    enableRegexPatterns: z.boolean().default(true),
  }).optional(),
});

export type ProcessLog = typeof processLogs.$inferSelect;
export type InsertProcessLog = z.infer<typeof insertProcessLogSchema>;
export type SystemStats = typeof systemStats.$inferSelect;
export type InsertSystemStats = z.infer<typeof insertSystemStatsSchema>;
export type PiiSettings = typeof piiSettings.$inferSelect;
export type InsertPiiSettings = z.infer<typeof insertPiiSettingsSchema>;
export type ProcessInput = z.infer<typeof processInputSchema>;
