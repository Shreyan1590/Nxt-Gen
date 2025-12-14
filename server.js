/**
 * ==========================================
 * 🚀 NXT-GEN COMPUTING - EXPRESS SERVER
 * Static file server for React application
 * ==========================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// MIME types for static files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Parse URL
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Remove query strings
    filePath = filePath.split('?')[0];

    // Security: prevent directory traversal
    filePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');

    // Full file path
    const fullPath = path.join(__dirname, filePath);

    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found - serve index.html for SPA routing
                if (!ext || ext === '.html') {
                    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                } else {
                    res.writeHead(404);
                    res.end('File Not Found');
                }
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Set appropriate headers
            const headers = {
                'Content-Type': contentType,
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'SAMEORIGIN',
                'X-XSS-Protection': '1; mode=block'
            };

            // Cache static assets
            if (['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'].includes(ext)) {
                headers['Cache-Control'] = 'public, max-age=31536000';
            }

            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, HOST, () => {
    console.log('\n');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║                                                          ║');
    console.log('║   🚀 NXT-GEN COMPUTING SERVER                            ║');
    console.log('║   Cuberto Light Theme - React Application                ║');
    console.log('║                                                          ║');
    console.log(`║   Local:   http://localhost:${PORT}                         ║`);
    console.log(`║   Network: http://${HOST}:${PORT}                           ║`);
    console.log('║                                                          ║');
    console.log('║   Press Ctrl+C to stop                                   ║');
    console.log('║                                                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('\n');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use.`);
        console.error(`   Try a different port or stop the existing server.\n`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...\n');
    server.close(() => {
        console.log('Server closed.\n');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});
