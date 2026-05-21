# 📁 Docker Files Reference

## Quick Navigation

This file explains all Docker-related files in the project.

---

## 🐳 Dockerfile Specifications

### `backend/Dockerfile`
- **Purpose**: Container for Node.js backend API
- **Base Image**: `node:18-alpine` (lightweight)
- **Exposed Port**: 5000
- **Features**: Health check endpoint, production mode
- **Build Time**: ~30-60 seconds

### `frontend/Dockerfile`
- **Purpose**: Container for React user booking app
- **Build Strategy**: Multi-stage (Node.js builder + Nginx)
- **Base Image**: `node:18-alpine` → `nginx:alpine`
- **Exposed Port**: 5173
- **Features**: Optimized static build, Nginx serving

### `driver-app/Dockerfile`
- **Purpose**: Container for React driver app
- **Build Strategy**: Multi-stage (Node.js builder + Nginx)
- **Base Image**: `node:18-alpine` → `nginx:alpine`
- **Exposed Port**: 5174
- **Features**: Optimized static build, Nginx serving

### `admin-dashboard/Dockerfile`
- **Purpose**: Container for React admin dashboard
- **Build Strategy**: Multi-stage (Node.js builder + Nginx)
- **Base Image**: `node:18-alpine` → `nginx:alpine`
- **Exposed Port**: 5175
- **Features**: Optimized static build, Nginx serving

---

## 🎼 Docker Compose Files

### `docker-compose.yml` (Main)
**Purpose**: Defines all services and their configuration

**Services Defined**:
1. `mongodb` - Database
2. `backend` - API server
3. `frontend` - User app
4. `driver-app` - Driver application
5. `admin-dashboard` - Admin panel

**Features**:
- Service dependencies
- Health checks
- Volume management
- Network configuration
- Environment variables
- Port mappings

**Usage**:
```bash
docker-compose up -d --build
```

### `docker-compose.prod.yml` (Production)
**Purpose**: Production-specific configuration overrides

**Changes from Main**:
- Production logging
- Resource limits (CPU/Memory)
- Always restart policy
- Optional Nginx reverse proxy

**Usage**:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 🌐 Nginx Configuration Files

### `frontend/nginx.conf`
**Purpose**: Serve React app with proper routing
- Listens on port 5173
- Serves static files from `/usr/share/nginx/html`
- Handles SPA routing (try_files)
- Error page handling

### `driver-app/nginx.conf`
**Purpose**: Serve driver app with proper routing
- Listens on port 5174
- Same configuration as frontend

### `admin-dashboard/nginx.conf`
**Purpose**: Serve admin dashboard with proper routing
- Listens on port 5175
- Same configuration as frontend

---

## ⚙️ Configuration Files

### `.env.docker`
**Purpose**: Docker-specific environment variables

**Content**:
```env
GOOGLE_MAPS_API_KEY=your_api_key
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

**Usage**: Copy to `.env` before running containers

### `.env.example`
**Purpose**: Local development environment template

**Difference from .env.docker**: 
- No Docker-specific configurations
- For local npm/Node.js development

### `backend/.dockerignore`
**Purpose**: Exclude files from Docker build context

**Contents**:
```
node_modules/
npm-debug.log
.env
.env.local
```

**Benefit**: Faster builds, smaller context

---

## 🛠️ Helper Script

### `docker-helper.sh`
**Purpose**: Convenient wrapper for common Docker commands

**Features**:
- Colored output for readability
- Help messages
- Error handling
- Service-specific operations

**Commands**:
```bash
./docker-helper.sh up              # Start
./docker-helper.sh down            # Stop
./docker-helper.sh restart         # Restart
./docker-helper.sh logs [service]  # View logs
./docker-helper.sh ps              # Show status
./docker-helper.sh rebuild [svc]   # Rebuild
./docker-helper.sh shell [svc]     # Access shell
./docker-helper.sh clean           # Clean up
./docker-helper.sh help            # Help
```

**Permissions**: Executable (`755`)

---

## 📚 Documentation Files

### `DOCKER_SETUP.md`
- **Content**: Comprehensive Docker setup guide
- **Audience**: Users new to Docker
- **Topics**: Prerequisites, configuration, troubleshooting
- **Length**: ~400 lines

### `DOCKER_GUIDE.md`
- **Content**: Quick reference guide
- **Audience**: All users
- **Topics**: Services, workflows, commands
- **Length**: ~300 lines

### `DOCKER_README.txt`
- **Content**: Setup summary
- **Audience**: Quick overview
- **Topics**: Files created, quick start, features
- **Length**: ~100 lines

### `README.md` (Updated)
- **New Section**: "Running with Docker"
- **Content**: Quick Docker instructions
- **Links**: Points to DOCKER_SETUP.md

### `QUICK_START.md` (Updated)
- **New Section**: Docker quick start
- **Content**: Docker commands
- **Links**: Points to helper script

---

## 📊 Service Relationships

```
docker-compose.yml
├── mongodb (database)
│   ├── Health check
│   ├── Volumes: mongodb_data, mongodb_config
│   └── Network: taxi-network
│
├── backend (depends on mongodb)
│   ├── Health check: /health endpoint
│   ├── Port: 5000
│   ├── Build: backend/Dockerfile
│   └── Environment: API keys, JWT secret
│
├── frontend (depends on backend)
│   ├── Port: 5173
│   ├── Build: frontend/Dockerfile + nginx.conf
│   └── Environment: API URL
│
├── driver-app (depends on backend)
│   ├── Port: 5174
│   ├── Build: driver-app/Dockerfile + nginx.conf
│   └── Environment: API URL
│
└── admin-dashboard (depends on backend)
    ├── Port: 5175
    ├── Build: admin-dashboard/Dockerfile + nginx.conf
    └── Environment: API URL
```

---

## 🔄 Build & Run Flow

```
1. docker-compose up -d --build
   ↓
2. Read docker-compose.yml
   ↓
3. Build images (parallel):
   - backend/Dockerfile
   - frontend/Dockerfile
   - driver-app/Dockerfile
   - admin-dashboard/Dockerfile
   ↓
4. Pull official images:
   - mongo:7.0
   - nginx:alpine
   ↓
5. Create network: taxi-network
   ↓
6. Start containers in order:
   - mongodb (starts first)
   - backend (waits for mongodb health check)
   - frontend, driver-app, admin-dashboard (parallel)
   ↓
7. All services running and accessible
```

---

## 💾 Volume Management

### `mongodb_data`
- **Purpose**: Store MongoDB database files
- **Mount Point**: `/data/db` in container
- **Persistence**: Data survives container removal
- **Backup**: Can be backed up from this volume

### `mongodb_config`
- **Purpose**: Store MongoDB configuration
- **Mount Point**: `/data/configdb` in container
- **Persistence**: Configuration persists

---

## 🌐 Network Architecture

```
Host Machine
└─ Bridge Network: taxi-network
   ├─ backend (internal: backend:5000)
   ├─ frontend (internal: frontend:5173)
   ├─ driver-app (internal: driver-app:5174)
   ├─ admin-dashboard (internal: admin-dashboard:5175)
   └─ mongodb (internal: mongodb:27017)

Services communicate via container names:
- backend connects to mongodb:27017
- frontend connects to http://localhost:5000 (from host)
```

---

## 🔐 Environment Variables

### Backend (docker-compose.yml)
```env
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/taxi-booking?authSource=admin
NODE_ENV=production
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
FRONTEND_URL=http://localhost:5173
DRIVER_APP_URL=http://localhost:5174
ADMIN_URL=http://localhost:5175
```

### Frontend/Driver/Admin
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
```

---

## ✅ Health Checks

### Backend
```yaml
healthcheck:
  test: curl -f http://localhost:5000/health || exit 1
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### MongoDB
```yaml
healthcheck:
  test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
  interval: 10s
  timeout: 5s
  retries: 5
```

---

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Start all | `docker-compose up -d --build` |
| Stop all | `docker-compose down` |
| View logs | `docker-compose logs -f` |
| View specific logs | `docker-compose logs -f backend` |
| Rebuild | `docker-compose build --no-cache` |
| Execute command | `docker-compose exec backend npm list` |
| Clean up | `docker-compose down -v` |
| Access shell | `docker-compose exec backend sh` |

---

## 🎯 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port in use | `lsof -i :5000` then `kill -9 <PID>` |
| Build fails | `docker-compose build --no-cache` |
| MongoDB won't start | `docker-compose logs mongodb` |
| Slow builds | Use `.dockerignore` to exclude files |
| Services won't communicate | Check network: `docker network ls` |

---

## 📚 Related Documentation

- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Full guide
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Quick reference
- [README.md](README.md) - Main documentation
- [QUICK_START.md](QUICK_START.md) - Quick commands

---

**For help**: Check the documentation files or run `./docker-helper.sh help`
