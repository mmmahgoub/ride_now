# Driver App Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY driver-app/package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY driver-app ./

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY driver-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
