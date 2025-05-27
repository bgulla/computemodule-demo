# Use a Node.js image to build and run the application
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 8080

# Run the application
CMD ["node", "dist/index.js"]
