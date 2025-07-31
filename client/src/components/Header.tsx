import { Shield, Brain, Trophy, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">AutoForage</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">Privacy-First</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>AI Agentic System</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* NASSCOM Badge */}
            <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>NASSCOM 2025</span>
            </div>
            
            {/* Deployment Status */}
            <div className="flex items-center space-x-2">
              <button onClick={() => window.open('https://railway.app', '_blank')} className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Deploy Railway</span>
              </button>
              <button onClick={() => window.open('https://github.com/new', '_blank')} className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Create GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
