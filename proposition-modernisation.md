# Proposition de Modernisation - Flateurss

Ce document présente la solution technique pour la modernisation de l'application Flateurss vers une architecture microservices avec une chaîne CI/CD automatisée.

## 1. Décomposition en Microservices
- **Microservices identifiés :**
    - `api-users` : Gestion des profils et données utilisateurs.
    - `api-posts` : Gestion des preuves (posts) et des commentaires.
    - `api-matchmaker` : Logique de mise en relation (équipe scientifique).
    - `api-gateway` : Point d'entrée unique et routage.
- **Cohérence & Communication :** Utilisation de l'API Gateway pour uniformiser les accès et de contrats d'API clairs (via documentation Swagger/OpenAPI) pour faciliter le travail entre les équipes (Production vs Scientifique).

## 2. Containerisation avec Docker
- **Dockerisation :** Chaque microservice possède son propre `Dockerfile` basé sur une image légère (Alpine) garantissant la portabilité et l'isolation.
- **Dépendances :** Gestion via `docker-compose` pour le développement local, permettant de lancer toute la stack en une commande, et via les URLs de services internes Docker pour la communication inter-services.

## 3. Orchestration avec Kubernetes
- **Essentiel pour :** La haute disponibilité (auto-healing), le passage à l'échelle automatique (auto-scaling) et la gestion des déploiements sans interruption (rolling updates).
- **Flexibilité :** Utilisation de `Deployments` pour la scalabilité et de `Services` (LoadBalancer/ClusterIP) pour la découverte automatique des microservices au sein du cluster.

## 4. Chaîne CI/CD Automatisée
- **Séparation des équipes :** 
    - Mise en place de `CODEOWNERS` sur GitHub pour que l'équipe scientifique valide toute modification du Matchmaker.
    - Environnements distincts (Staging pour les scientifiques, Prod pour la Production).
- **Étapes Automatisées :**
    - **Linting** : Validation de la qualité du code à chaque push.
    - **Unit Tests** : Validation de la logique métier (ex: Match score).
    - **Docker Build & Push** : Création automatique des images tagguées sur Docker Hub.
    - **Scientific Validation** : Étape spécifique au matchmaker dans le pipeline CI.

## 5. Tests Automatisés
- **Intégration CI/CD :** Les tests sont exécutés avant tout build d'image. Un échec bloque le pipeline, empêchant le déploiement d'un code défectueux.
- **Types de tests essentiels :**
    - **Tests Unitaires** : Tester les algorithmes de matching (voir `api-matchmaker/tests/`).
    - **Tests d'Intégration (Proxification)** : Vérifier dans la CI que la Gateway est configurée pour router vers les bonnes URLs internes (voir `api-gateway/tests/gateway.test.js`).
    - **Tests de Charge** : S'assurer que le système tient lors d'un pic de trafic.

## 6. Surveillance et Logging
L'application est désormais équipée d'une stack complète d'observabilité (PLG Stack) :
- **Surveillance (Prometheus & Grafana) :** 
    - Chaque microservice expose `/metrics` via `prom-client`.
    - **Prometheus** collecte ces métriques toutes les 15s.
    - **Grafana** (port 3000) permet de visualiser les performances.
- **Logging Centralisé (Loki & Promtail) :** 
    - **Promtail** surveille les logs Docker via `/var/run/docker.sock`.
    - **Loki** indexe les logs pour une recherche ultra-rapide.
    - Consultation via l'onglet "Explore" dans Grafana.

> [!IMPORTANT]
> Les données de surveillance sont persistées localement dans `./monitoring/loki/data` et `./monitoring/grafana/data`, mais ces dossiers sont exclus de Git pour éviter de surcharger le dépôt.
