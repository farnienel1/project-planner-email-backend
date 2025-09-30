#!/bin/bash

# Project Planner Email Backend Deployment Script

echo "🚀 Deploying Project Planner Email Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cat > .env << EOF
EMAIL_USER=info@raccordmep.co.uk
EMAIL_PASSWORD=Raccord50!
PORT=3000
EOF
    echo "✅ .env file created. Please update with your actual credentials."
fi

# Start the server
echo "🚀 Starting server..."
echo "📧 Using email: info@raccordmep.co.uk"
echo "🌐 Server will be available at: http://localhost:3000"
echo "🔍 Health check: http://localhost:3000/health"
echo ""
echo "Press Ctrl+C to stop the server"

npm start
