# Use Node 20 explicitly
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files from backend directory
COPY backend/package.json backend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy backend source code
COPY backend/ .

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/server.js"]
