import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

// Simple static file server for production
const server = createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // API routes - in production, these would be handled by the backend
  if (filePath.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API endpoint - deploy with backend' }));
    return;
  }

  // Serve static files from client/dist
  const fullPath = join(__dirname, 'client/dist', filePath);
  
  try {
    const content = readFileSync(fullPath);
    const ext = filePath.split('.').pop();
    let contentType = 'text/html';
    
    switch (ext) {
      case 'js': contentType = 'application/javascript'; break;
      case 'css': contentType = 'text/css'; break;
      case 'json': contentType = 'application/json'; break;
      case 'png': contentType = 'image/png'; break;
      case 'jpg': case 'jpeg': contentType = 'image/jpeg'; break;
      case 'svg': contentType = 'image/svg+xml'; break;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    // Fallback to index.html for SPA routing
    try {
      const indexContent = readFileSync(join(__dirname, 'client/dist/index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexContent);
    } catch (indexError) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AutoForage server running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://0.0.0.0:${PORT}`);
});