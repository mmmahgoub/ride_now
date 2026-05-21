# 🐳 Docker Setup Guide

## Overview

The Taxi Booking Platform is fully containerized with Docker. All services run in isolated containers and are orchestrated with Docker Compose.

### Services Included

- **MongoDB** - NoSQL Database (Port 27017)
- **Backend API** - Node.js/Express (Port 5000)
- **Frontend** - React app (Port 5173)
- **Driver App** - React app (Port 5174)
- **Admin Dashboard** - React app (Port 5175)

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/) (v1.29+)
- At least 4GB of available RAM
- Google Maps API Key (optional but recommended)

## Quick Start with Docker

### 1. Clone and Setup

```bash
cd mowasalat-copy
cp .env.docker .env
```

### 2. Configure Environment Variables

Edit `.env` and add your credentials:

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Build and Start All Services

```bash
docker-compose up -d --build
```

This command:
- Builds Docker images for all services
- Creates and starts containers
- Initializes MongoDB
- Sets up the network

### 4. Access Applications

- **User App**: http://localhost:5173
- **Driver App**: http://localhost:5174
- **Admin Dashboard**: http://localhost:5175
- **API Server**: http://localhost:5000
- **MongoDB**: mongodb://admin:password123@localhost:27017

## Common Docker Commands

### View Running Services

```bash
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Stop Services

```bash
docker-compose stop
```

### Start Services

```bash
docker-compose start
```

### Restart Services

```bash
docker-compose restart
```

### Remove All Containers and Volumes

```bash
docker-compose down -v
```

### Rebuild Specific Service

```bash
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Execute Command in Container

```bash
# Run command in backend container
docker-compose exec backend npm install new-package

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password123 taxi-booking
```

## Docker Compose Structure

### backend service
- Builds from `backend/Dockerfile`
- Uses Node.js 18 Alpine image
- Depends on MongoDB
- Health check enabled
- Port: 5000

### frontend service
- Multi-stage build (Node.js + Nginx)
- Builds React app and serves with Nginx
- Port: 5173

### driver-app service
- Multi-stage build (Node.js + Nginx)
- Builds React app and serves with Nginx
- Port: 5174

### admin-dashboard service
- Multi-stage build (Node.js + Nginx)
- Builds React app and serves with Nginx
- Port: 5175

### mongodb service
- Official MongoDB 7.0 image
- Authentication enabled
- Persistent volumes
- Health check enabled
- Port: 27017

## Environment Variables Reference

```env
# Backend
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/taxi-booking?authSource=admin
NODE_ENV=production
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# APIs
GOOGLE_MAPS_API_KEY=your_api_key
STRIPE_PUBLIC_KEY=pk_test_key
STRIPE_SECRET_KEY=sk_test_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Frontend URLs
FRONTEND_URL=http://localhost:5173
DRIVER_APP_URL=http://localhost:5174
ADMIN_URL=http://localhost:5175
```

## Volumes

- `mongodb_data` - MongoDB database files
- `mongodb_config` - MongoDB configuration

These volumes persist data even when containers are removed.

## Networks

- `taxi-network` - Bridge network connecting all services
- Services communicate using container names (e.g., `mongodb:27017`)

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify MongoDB is running
docker-compose ps mongodb
```

### Build Failures

```bash
# Clean build without cache
docker-compose build --no-cache

# Then start
docker-compose up -d
```

### Frontend Not Loading

```bash
# Check frontend logs
docker-compose logs frontend

# Verify container is running
docker-compose ps frontend
```

### Clear Everything and Start Fresh

```bash
# Remove all containers, volumes, and networks
docker-compose down -v

# Rebuild everything
docker-compose up -d --build
```

## Production Deployment

For production deployment:

1. Update `docker-compose.yml`:
   - Set `NODE_ENV=production`
   - Use strong passwords
   - Enable HTTPS/SSL

2. Use environment-specific compose files:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

3. Consider using:
   - Docker Swarm or Kubernetes
   - Managed database services (MongoDB Atlas)
   - CDN for static files
   - Load balancer

## Performance Tips

1. **Use Alpine images** - Smaller and faster (already configured)
2. **Multi-stage builds** - Reduces final image size (already configured)
3. **Layer caching** - Order Dockerfile commands efficiently
4. **Resource limits** - Add in docker-compose.yml if needed

Example with resource limits:

```yaml
services:
  backend:
    resources:
      limits:
        cpus: '0.5'
        memory: 512M
      reservations:
        cpus: '0.25'
        memory: 256M
```

## Monitoring

### View Container Stats

```bash
docker stats
```

### Inspect Container

```bash
docker inspect taxi-booking-backend
```

### Check Health Status

```bash
docker-compose ps
```

## Useful Tools

- **Docker Desktop** - GUI for managing containers
- **Portainer** - Web UI for container management
- **Docker CLI** - Command-line interface

## Next Steps

1. Configure your API keys in `.env`
2. Run `docker-compose up -d --build`
3. Access the applications
4. Test endpoints using Postman
5. Deploy to your infrastructure

---

**Need help?** Check the main [README.md](README.md) or [QUICK_START.md](QUICK_START.md)
