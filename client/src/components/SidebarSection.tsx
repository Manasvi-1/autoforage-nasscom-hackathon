import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart3, Settings, Server } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type SystemStats, type PiiSettings } from "@shared/schema";

export default function SidebarSection() {
  const queryClient = useQueryClient();

  const { data: stats } = useQuery<SystemStats>({
    queryKey: ["/api/stats"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: systemStatus } = useQuery({
    queryKey: ["/api/status"],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { data: piiSettings } = useQuery<PiiSettings>({
    queryKey: ["/api/settings"],
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<PiiSettings>) => {
      const response = await apiRequest("PUT", "/api/settings", newSettings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
    },
  });

  const handleSettingChange = (key: keyof PiiSettings, value: boolean) => {
    updateSettingsMutation.mutate({ [key]: value });
  };

  const privacyScore = stats ? Math.max(85, Math.min(99, 100 - (stats.piiRedacted / Math.max(stats.queriesProcessed, 1)) * 2)) : 0;

  return (
    <div className="space-y-6">
      {/* Statistics Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Session Stats</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Queries Processed</span>
              <span className="font-semibold text-slate-900">{stats?.queriesProcessed || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">PII Items Redacted</span>
              <span className="font-semibold text-green-600">{stats?.piiRedacted || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Privacy Score</span>
              <span className="font-semibold text-green-600">{privacyScore.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Processing Time</span>
              <span className="font-semibold text-slate-900">{stats?.avgProcessingTime || 0}ms avg</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PII Detection Settings */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Settings className="h-5 w-5 text-slate-600" />
            <span>Detection Settings</span>
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Names</span>
              <Checkbox 
                checked={piiSettings?.detectNames}
                onCheckedChange={(checked) => handleSettingChange('detectNames', !!checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Email Addresses</span>
              <Checkbox 
                checked={piiSettings?.detectEmails}
                onCheckedChange={(checked) => handleSettingChange('detectEmails', !!checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Phone Numbers</span>
              <Checkbox 
                checked={piiSettings?.detectPhones}
                onCheckedChange={(checked) => handleSettingChange('detectPhones', !!checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Social Security</span>
              <Checkbox 
                checked={piiSettings?.detectSsn}
                onCheckedChange={(checked) => handleSettingChange('detectSsn', !!checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Credit Cards</span>
              <Checkbox 
                checked={piiSettings?.detectCreditCards}
                onCheckedChange={(checked) => handleSettingChange('detectCreditCards', !!checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Addresses</span>
              <Checkbox 
                checked={piiSettings?.detectAddresses}
                onCheckedChange={(checked) => handleSettingChange('detectAddresses', !!checked)}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Server className="h-5 w-5 text-slate-600" />
            <span>System Status</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Express Backend</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">AI Model</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Memory Storage</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Privacy Engine</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Secured</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
