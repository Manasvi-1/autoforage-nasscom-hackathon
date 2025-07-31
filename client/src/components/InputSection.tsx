import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type ProcessLog } from "@shared/schema";

interface InputSectionProps {
  onProcessResult: (result: ProcessLog) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function InputSection({ onProcessResult, isProcessing, setIsProcessing }: InputSectionProps) {
  const [input, setInput] = useState("");
  const [settings, setSettings] = useState({
    detectNames: true,
    detectEmails: true,
    detectPhones: true,
    detectSsn: false,
    detectCreditCards: false,
    detectAddresses: false,
    enableAiRedaction: true,
    enableRegexPatterns: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const processMutation = useMutation({
    mutationFn: async (data: { input: string; settings: typeof settings }) => {
      const response = await apiRequest("POST", "/api/process", data);
      return response.json();
    },
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: (data) => {
      onProcessResult(data.processLog);
      toast({
        title: "Processing Complete",
        description: `Processed in ${data.processingTime}ms`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/logs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    processMutation.mutate({ input, settings });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
            <Edit className="h-5 w-5 text-blue-600" />
            <span>Input Processing</span>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">Status:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isProcessing 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {isProcessing ? "Processing..." : "Ready"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="sensitive-input" className="block text-sm font-medium text-slate-700 mb-2">
              Enter your sensitive query or text
            </label>
            <Textarea
              id="sensitive-input"
              placeholder="Example: Hi, my name is John Smith and my email is john.smith@company.com. I need help with automating my workflow. You can reach me at (555) 123-4567."
              className="h-32 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={settings.enableAiRedaction}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableAiRedaction: !!checked }))
                  }
                />
                <span className="text-sm text-slate-600">Enable AI redaction</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={settings.enableRegexPatterns}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableRegexPatterns: !!checked }))
                  }
                />
                <span className="text-sm text-slate-600">Regex patterns</span>
              </label>
            </div>
            
            <Button 
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>{isProcessing ? "Processing..." : "Process Input"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
