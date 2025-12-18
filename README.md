# Flateurss - Microservices Edition

Nouvelle version de l'application Flateurss, modernisée en microservices containerisés.

## Architecture

```
                    ┌─────────────────┐
                    │   API Gateway   │
                    │   (Port 8600)   │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   api-users   │   │   api-posts   │   │api-matchmaker │
│  (Port 3001)  │   │  (Port 3002)  │   │  (Port 3003)  │
└───────────────┘   └───────────────┘   └───────────────┘
```

### Services
| Service | Port | Description |
|---------|------|-------------|
| `api-gateway` | 8600 | Point d'entrée unique, proxy vers les microservices |
| `api-users` | 3001 | Gestion des utilisateurs |
| `api-posts` | 3002 | Gestion du contenu (Posts/Commentaires) |
| `api-matchmaker` | 3003 | Algorithmes de matching entre utilisateurs |

## API Endpoints

Via le Gateway (`http://localhost:8600`) :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Liste tous les utilisateurs |
| POST | `/users` | Créer un utilisateur |
| GET | `/users/:id` | Récupérer un utilisateur |
| GET | `/posts` | Liste tous les posts |
| POST | `/posts` | Créer un post |
| GET | `/matchmake/:uid` | Obtenir des matches pour un utilisateur |
| GET | `/ping` | Health check du gateway |

## Développement Local

### Prérequis
- Docker & Docker Compose
- Node.js 20 (optionnel, pour tests locaux sans Docker)

### Lancement avec Docker Compose
```bash
docker-compose up --build
```

L'API Gateway sera accessible sur `http://localhost:8600`.

### Structure des données
Chaque microservice possède son propre dossier `data/` avec des données initiales :
- `api-users/data/users.json` - Utilisateurs initiaux
- `api-posts/data/posts.json` - Posts initiaux

## Déploiement

### CI/CD
Le pipeline est défini dans `.github/workflows/ci.yml`. Il automatise :
1. Les tests unitaires
2. Le build des images Docker
3. Le push vers Docker Hub (`pipatchies/flateurss-*`)

### Kubernetes
Les manifestes de déploiement sont dans le dossier `k8s/`.

```bash
# Appliquer les déploiements
kubectl apply -f k8s/

# Redémarrer les pods (après mise à jour des images)
kubectl rollout restart deployment api-users api-posts api-matchmaker api-gateway
```

### Variables d'environnement
| Variable | Description | Défaut |
|----------|-------------|--------|
| `USERS_SERVICE_URL` | URL du service users | `http://api-users:3001` |
| `POSTS_SERVICE_URL` | URL du service posts | `http://api-posts:3002` |
| `MATCHMAKER_SERVICE_URL` | URL du service matchmaker | `http://api-matchmaker:3003` |

