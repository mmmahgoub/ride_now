#!/bin/bash

# Taxi Booking Platform - Docker Helper Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Commands
case "${1:-help}" in
    up)
        print_header "Starting Taxi Booking Platform..."
        docker-compose up -d --build
        print_success "Services started!"
        echo ""
        echo "Access the applications at:"
        echo "  - User App: http://localhost:5173"
        echo "  - Driver App: http://localhost:5174"
        echo "  - Admin Dashboard: http://localhost:5175"
        echo "  - API: http://localhost:5000"
        ;;
    down)
        print_header "Stopping services..."
        docker-compose down
        print_success "Services stopped"
        ;;
    restart)
        print_header "Restarting services..."
        docker-compose restart
        print_success "Services restarted"
        ;;
    logs)
        service=${2:-""}
        if [ -z "$service" ]; then
            docker-compose logs -f
        else
            docker-compose logs -f "$service"
        fi
        ;;
    ps)
        print_header "Running Services"
        docker-compose ps
        ;;
    clean)
        print_warning "This will remove all containers and volumes!"
        read -p "Continue? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose down -v
            print_success "Cleaned up"
        else
            print_warning "Cancelled"
        fi
        ;;
    rebuild)
        service=${2:-""}
        if [ -z "$service" ]; then
            print_header "Rebuilding all services..."
            docker-compose build --no-cache
        else
            print_header "Rebuilding $service..."
            docker-compose build --no-cache "$service"
        fi
        print_success "Build complete"
        ;;
    shell)
        service=${2:-"backend"}
        print_header "Accessing $service container..."
        docker-compose exec "$service" /bin/sh
        ;;
    help|*)
        print_header "Taxi Booking Platform - Docker Helper"
        echo ""
        echo "Usage: ./docker-helper.sh [command] [service]"
        echo ""
        echo "Commands:"
        echo "  up              Start all services"
        echo "  down            Stop all services"
        echo "  restart         Restart all services"
        echo "  logs [service]  View logs (optional: specific service)"
        echo "  ps              Show running services"
        echo "  clean           Remove all containers and volumes"
        echo "  rebuild [svc]   Rebuild images (optional: specific service)"
        echo "  shell [svc]     Access container shell (default: backend)"
        echo "  help            Show this help message"
        echo ""
        echo "Services: backend, frontend, driver-app, admin-dashboard, mongodb"
        echo ""
        echo "Examples:"
        echo "  ./docker-helper.sh up"
        echo "  ./docker-helper.sh logs backend"
        echo "  ./docker-helper.sh rebuild frontend"
        echo "  ./docker-helper.sh shell mongodb"
        ;;
esac
