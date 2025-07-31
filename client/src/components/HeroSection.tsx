import { Bot, UserX, TrendingUp, Code } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Privacy-First AI Processing</h2>
        <p className="text-lg opacity-90 mb-6">
          Process sensitive automation queries while automatically redacting personally identifiable information (PII). 
          Built for NASSCOM AI Hackathon 2025. Creator of 2000+ pre-built N8N automation workflows.
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg">
            <Bot className="h-4 w-4" />
            <span>Agent-Powered</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg">
            <UserX className="h-4 w-4" />
            <span>PII Redaction</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg">
            <TrendingUp className="h-4 w-4" />
            <span>Real-time Logging</span>
          </div>
          <a href="https://superprofile.bio/vp/forage-library" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors">
            <Code className="h-4 w-4" />
            <span>By Manasvi Gowda P</span>
          </a>
        </div>
      </div>
    </div>
  );
}
