## 🚀 Lancer l'application complète

L'application nécessite l'API ([repo-api](https://github.com/MalikCherfi/devops_configuration_generator_api)). 

Pour tout démarrer d'un coup, crée un fichier `docker-compose.yml` avec le contenu suivant :

```yaml
services:
  api:
    image: ghcr.io/MalikCherfi/devops_configuration_generator_api:latest
    ports:
      - "8000:8000"
    restart: always

  app:
    image: ghcr.io/MalikCherfi/repo-app:latest
    ports:
      - "3000:3000"
    depends_on:
      - api
    restart: always