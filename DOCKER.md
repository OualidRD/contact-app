# 🐳 Guide Docker - Contact App

---

## 📋 Prérequis

- **Docker** (version 20.10+)
- **Docker Compose** (version 1.29+)

### Installation Docker

**Windows:**
- Télécharger [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- Installer et redémarrer

**Mac:**
```bash
brew install docker docker-compose
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

---

## 🚀 Démarrage Rapide

### Lancer l'application complète

```bash
# Allez à la racine du projet
cd contact-app

# Démarrer tous les services (PostgreSQL + Backend + Frontend)
docker-compose up -d

# Vérifier les logs
docker-compose logs -f

# Accéder à l'application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080/api
```

### Arrêter l'application

```bash
docker-compose down

# Arrêter et supprimer les volumes (données)
docker-compose down -v
```

---

## 📊 Architecture Docker
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐                   │
│  │  Frontend    │                   │
│  │  Container   │                   │
│  │  Port 5173   │                   │
│  └──────────────┘                   │
│         │                           │
│         └────────────┐              │
│                      │              │
│  ┌──────────────┐    │              │
│  │  Backend     │◄───┘              │
│  │  Container   │                   │
│  │  Port 8080   │                   │
│  └──────────────┘                   │
│         │                           │
│         └────────────┐              │
│                      │              │
│  ┌──────────────┐    │              │
│  │  PostgreSQL  │◄───┘              │
│  │  Container   │                   │
│  │  Port 5432   │                   │
│  └──────────────┘                   │
│                                     │
└─────────────────────────────────────┘

