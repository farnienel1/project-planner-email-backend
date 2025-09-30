// Test script for Project Planner Email Backend
const https = require('https');
const http = require('http');

const testEmail = async () => {
    const testData = {
        to: 'test@example.com', // Replace with your email
        subject: 'Test Email from Project Planner',
        body: 'This is a test email from the Raccord MEP Project Planner system. If you receive this, the email service is working correctly!',
        fromName: 'Raccord MEP Test'
    };

    const postData = JSON.stringify(testData);
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/test-email',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Response:', data);
            try {
                const response = JSON.parse(data);
                if (response.success) {
                    console.log('✅ Test email sent successfully!');
                } else {
                    console.log('❌ Test email failed:', response.error);
                }
            } catch (e) {
                console.log('❌ Invalid response format');
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
};

// Health check
const healthCheck = async () => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Health Check Response:', data);
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Health check failed: ${e.message}`);
    });

    req.end();
};

console.log('🧪 Testing Project Planner Email Backend...');
console.log('');

// Run health check first
healthCheck();

// Wait a moment, then test email
setTimeout(() => {
    console.log('');
    console.log('📧 Testing email sending...');
    testEmail();
}, 1000);
