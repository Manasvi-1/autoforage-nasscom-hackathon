import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Download, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type ProcessLog } from "@shared/schema";

export default function LoggingSection() {
  const { data: logs = [] } = useQuery<ProcessLog[]>({
    queryKey: ["/api/logs"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const truncateText = (text: string, maxLength = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
            <List className="h-5 w-5 text-slate-600" />
            <span>Processing Logs</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Input Preview</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">PII Detected</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Processing Time</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-slate-500">
                    No processing logs available. Process some input to see logs here.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs">
                      <div className="truncate">{truncateText(log.rawInput)}</div>
                    </td>
                    <td className="py-3 px-4">
                      {log.piiDetected && log.piiDetected.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {log.piiDetected.map((pii, index) => (
                            <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                              {pii}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">None detected</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{log.processingTime}ms</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        log.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-xs">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
