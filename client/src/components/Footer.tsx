import { Brain, Train, Github, Book, Trophy, User, Lightbulb } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold">AutoForage</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Privacy-first AI agentic system built for NASSCOM AI Hackathon 2025. 
              Inspired by Inya.ai and the Open Source Agent Stack.
            </p>
            <p className="text-slate-400 text-sm">MIT © 2025 Manasvi Gowda P</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Deployment</h4>
            <div className="space-y-2 text-sm">
              <a href="https://autoforage-production.up.railway.app" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Train className="h-4 w-4" />
                <span>Backend on Railway</span>
              </a>
              <a href="https://manasvi-gowda.github.io/autoforage" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Github className="h-4 w-4" />
                <span>Frontend on GitHub Pages</span>
              </a>
              <a href="https://github.com/manasvi-gowda/autoforage" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Book className="h-4 w-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hackathon</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-slate-300">
                <Trophy className="h-4 w-4 text-orange-500" />
                <span>NASSCOM AI Hackathon 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <User className="h-4 w-4" />
                <span>Team: Manasvi Gowda P</span>
              </div>
              <a href="https://superprofile.bio/vp/forage-library" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Lightbulb className="h-4 w-4" />
                <span>2000+ N8N Workflows Available</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Deployed-Railway</span>
            </div>
            <div className="flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Live-GitHubPages</span>
            </div>
            <div className="flex items-center space-x-1 bg-orange-600 text-white px-2 py-1 rounded text-xs">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Hackathon-NASSCOM2025</span>
            </div>
          </div>
          
          <div className="text-slate-400 text-sm">
            Built with Express.js, React, Tailwind CSS, and AI-powered privacy protection
          </div>
        </div>
      </div>
    </footer>
  );
}
