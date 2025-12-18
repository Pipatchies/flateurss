# Flateurss - Microservices Edition

Nouvelle version de l'application Flateurss, modernisée en microservices containerisés.

## Architecture

L'application est décomposée en 3 microservices :

- **`api-users`** (Port 3001) : Gestion des utilisateurs.
- **`api-posts`** (Port 3002) : Gestion du contenu (Preuves/Commentaires).
- **`api-matchmaker`** (Port 3003) : Algorithmes de matching (Scientific Team).

## Développement Local

### Prérequis
- Docker & Docker Compose
- Node.js 20 (optionnel, pour tests locaux sans Docker)

### Lancement
Utilisez Docker Compose pour lancer toute la stack :

```bash
docker-compose up --build
```

Les APIs seront accessibles sur `http://localhost:300X`.

## Déploiement

### CI/CD
Le pipeline est défini dans `.github/workflows/ci.yml`. Il automatise :
1. Les tests unitaires.
2. Le build des images Docker.
3. Le push vers Docker Hub.

### Kubernetes
Les manifestes de déploiement pour la production sont dans le dossier `k8s/`.

```bash
kubectl apply -f k8s/
```
