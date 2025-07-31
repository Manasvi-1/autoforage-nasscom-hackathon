import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, Shield } from "lucide-react";
import { type ProcessLog } from "@shared/schema";

interface MLAnalysisPanelProps {
  processResult: ProcessLog | null;
}

export default function MLAnalysisPanel({ processResult }: MLAnalysisPanelProps) {
  if (!processResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>ML Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-slate-500 py-8">
            Process text to see ML-powered PII analysis
          </div>
        </CardContent>
      </Card>
    );
  }

  // Parse ML analysis data
  const confidenceScores: Record<string, number> = processResult.confidenceScores 
    ? (typeof processResult.confidenceScores === 'string' 
        ? JSON.parse(processResult.confidenceScores) 
        : processResult.confidenceScores)
    : {};

  const mlAnalysis: Record<string, any> = processResult.mlAnalysis 
    ? (typeof processResult.mlAnalysis === 'string' 
        ? JSON.parse(processResult.mlAnalysis) 
        : processResult.mlAnalysis)
    : {};

  const avgConfidence = Object.values(confidenceScores).length > 0 
    ? Math.round(Object.values(confidenceScores).reduce((a, b) => a + b, 0) / Object.values(confidenceScores).length * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span>ML Analysis</span>
          <Badge variant="secondary" className="ml-auto">
            v2.0
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center space-x-1">
              <Target className="h-4 w-4 text-green-600" />
              <span>Overall Confidence</span>
            </span>
            <span className="text-sm font-bold text-green-600">{avgConfidence}%</span>
          </div>
          <Progress value={avgConfidence} className="h-2" />
        </div>

        {/* Individual PII Type Confidence */}
        {Object.keys(confidenceScores).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center space-x-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Detection Confidence by Type</span>
            </h4>
            {Object.entries(confidenceScores).map(([type, confidence]) => (
              <div key={type} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{type}</span>
                  <span className="text-xs font-medium">{Math.round(confidence * 100)}%</span>
                </div>
                <Progress value={confidence * 100} className="h-1" />
              </div>
            ))}
          </div>
        )}

        {/* ML Analysis Details */}
        {Object.keys(mlAnalysis).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span>Advanced Analysis</span>
            </h4>
            {Object.entries(mlAnalysis).map(([type, analysis]) => (
              <div key={type} className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs font-medium text-slate-700 mb-2">{type} Analysis</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {analysis && typeof analysis === 'object' && Object.entries(analysis).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">
                        {typeof value === 'number' 
                          ? value.toFixed(2)
                          : Array.isArray(value) 
                            ? value.length 
                            : String(value).substring(0, 20)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Processing Stats */}
        <div className="border-t pt-3">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-center">
              <div className="font-semibold text-blue-600">{processResult.processingTime}ms</div>
              <div className="text-slate-500">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-600">{processResult.piiDetected?.length || 0}</div>
              <div className="text-slate-500">PII Types Found</div>
            </div>
          </div>
        </div>

        {/* AI Enhancement Badge */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            <Brain className="h-3 w-3 mr-1" />
            Enhanced with TensorFlow.js + NLP
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}