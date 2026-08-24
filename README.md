## 🚀 Lancer l'application complète

### Avec Docker

L'application nécessite l'API ([repo-api](https://github.com/malikcherfi/devops_configuration_generator_api)). 

Pour tout démarrer d'un coup, crée un fichier `docker-compose.yml` avec le contenu suivant puis lancer la commande `docker compose up -d` :

```yaml
services:
  api:
    image: ghcr.io/malikcherfi/devops_configuration_generator_api:latest
    ports:
      - "8000:8000"
    restart: always

  app:
    image: ghcr.io/malikcherfi/repo-app:latest
    ports:
      - "3000:3000"
    depends_on:
      - api
    restart: always
```
 
### Sans Docker

```bash
npm install
npm start
```
L'API sera accessible sur `http://localhost:3000`.