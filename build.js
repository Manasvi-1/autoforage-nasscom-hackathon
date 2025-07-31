import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

console.log('🏗️  Building AutoForage for production...');

// Create dist directory
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
}

try {
  // Build client
  console.log('📦 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });

  // Build server
  console.log('🚀 Building backend...');
  execSync('npx esbuild server/index.ts --bundle --platform=node --target=node18 --outfile=dist/server.js --external:tsx --external:@replit/* --format=esm', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📁 Files created:');
  console.log('   - client/dist/ (frontend)');
  console.log('   - dist/server.js (backend)');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}