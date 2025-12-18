# Sujet DevOps : Projet de Startup - Flateurss

## Contexte Initial

Flateurss est une startup dans la mise en relation de platistes convaincus pour améliorer l'entre soi et les échanges de preuves que la terre n'est pas si ronde que ça. En bon platiste convaincu, vous avez été embauché pour moderniser l'application et tout "remettre à plat".
Le projet actuel utilise une architecture monolithique avec un language unique: Javascript. Différents stagiaires sont passés par là avant que l'entreprise ne soit considérée comme telle. Les équipes actuelles maitrisent différents languages de programmation mais sont obligés d'utiliser le Javascript. Le code est donc très hétérogène et peu maintenable. De plus, l'application est très gourmande en ressources et les déploiements sont manuels. Enfin, il n'y a pas de tests automatisés, ce qui rend les déploiements risqués.

**Problèmes Actuels :**

1. **Monolithique et Gourmande en Ressources :** L'application fonctionne comme un monolithe sur des ordinateurs gourmands en ressources, entraînant des inefficacités et des coûts élevés.

2. **Processus de Production Archaïque :** Le processus de production est manuel, nécessitant une compilation et un déploiement manuels de la part de l'équipe de développement.

3. **Absence de Tests Automatisés :** L'application n'est pas testée de manière automatisée, ce qui accroît les risques d'erreurs et de dysfonctionnements lors des déploiements.

4. Un seul language: Javascript

5. Javascript => Typescript

## Objectif de Modernisation

L'objectif principal est de transformer cette application monolithique en une architecture basée sur des microservices, tout en établissant une chaîne d'outils automatisée pour l'intégration continue (CI) et le déploiement continu (CD). Cette modernisation devrait améliorer l'efficacité, la fiabilité et la gestion des ressources de l'application.

## Énoncé

En tant que nouvel(le) ingénieur(e) au sein de notre entreprise, votre mission est de proposer une solution complète pour moderniser notre application et mettre en place une chaîne d'outils automatisée. Considérez les spécificités de notre culture d'entreprise, caractérisée par une forte séparation entre les équipes scientifiques et de production, ainsi que la diversité internationale de nos équipes de recherche.

**Questions pour la Proposition de Solution :**

1. **Décomposition en Microservices :**
   - Quelles fonctionnalités spécifiques de l'application peuvent être transformées en microservices indépendants ?
   - Comment assurer la cohérence et la communication entre les équipes travaillant sur différents microservices ?

2. **Containerisation avec Docker :**
   - Comment Docker peut-il être utilisé pour containeriser chaque microservice ?
   - Comment gérer les dépendances entre microservices dans un environnement Dockerisé ?

3. **Orchestration avec Kubernetes :**
   - Pourquoi Kubernetes est-il essentiel pour orchestrer le déploiement des microservices ?
   - Comment garantir la flexibilité et l'évolutivité des microservices grâce à Kubernetes ?

4. **Chaîne CI/CD Automatisée :**
   - Comment mettre en place une chaîne CI/CD tenant compte de la séparation entre les équipes scientifiques et de production ?
   - Quelles étapes spécifiques doivent être automatisées pour garantir un processus CI/CD fiable ?

5. **Tests Automatisés :**
   - Comment intégrer des tests automatisés à chaque étape du processus CI/CD ?
   - Quels types de tests sont essentiels pour assurer la stabilité des microservices ?

6. **Surveillance et Logging :**
   - Comment mettre en place une surveillance efficace des microservices en production ?
   - Quels mécanismes de logging peuvent aider à identifier rapidement les problèmes potentiels ?

## Sources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Testing Microservices: Best Practices](https://martinfowler.com/articles/microservice-testing/)
- [The DevOps Handbook](https://www.itrevolution.com/the-devops-handbook/)