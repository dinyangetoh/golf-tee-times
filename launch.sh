#!/bin/bash
set -e

echo "🚀 Starting Golf Tee Times infrastructure..."

# Start PostgreSQL container
echo "📦 Starting PostgreSQL container..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Setup backend
echo "🔧 Setting up backend..."
cd "backend-api"
npm install
cp env.example .env
npx prisma migrate dev --name init

# Start backend server in background
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Setup frontend
echo "🔧 Setting up frontend..."
cd ../frontend
npm install

# Start frontend server
echo "🚀 Starting frontend server..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
