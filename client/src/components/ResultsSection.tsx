import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Bot, Info } from "lucide-react";
import { type ProcessLog } from "@shared/schema";

interface ResultsSectionProps {
  processResult: ProcessLog | null;
  isProcessing: boolean;
}

export default function ResultsSection({ processResult, isProcessing }: ResultsSectionProps) {
  if (!processResult && !isProcessing) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Processing Results</span>
        </h3>

        {isProcessing ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Processing your input...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Raw Input */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>Raw Input (Sensitive)</span>
                </h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
                  <p className="text-slate-600 whitespace-pre-wrap">{processResult?.rawInput}</p>
                </div>
              </div>

              {/* Sanitized Output */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Sanitized Output</span>
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                  <p className="text-slate-600 whitespace-pre-wrap">{processResult?.sanitizedInput}</p>
                </div>
              </div>
            </div>

            {/* PII Detection Results */}
            {processResult?.piiDetected && processResult.piiDetected.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">PII Detected & Redacted</h4>
                <div className="flex flex-wrap gap-2">
                  {processResult.piiDetected.map((pii, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                      {pii}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Response */}
            {processResult?.agentResponse && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <span>Agent Response</span>
                </h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-slate-700 mb-3">{processResult.agentResponse}</p>
                  <div className="p-2 bg-white rounded border text-xs text-slate-500 flex items-center space-x-1">
                    <Info className="h-3 w-3" />
                    <span>Response generated from sanitized input - no PII exposed to AI model</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
