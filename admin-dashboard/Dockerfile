# Admin Dashboard Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY admin-dashboard/package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY admin-dashboard ./

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY admin-dashboard/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5175

CMD ["nginx", "-g", "daemon off;"]
