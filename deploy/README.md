
# Deployment

To deploy the application services. The services' images must be published in their corresponding
repositories.

## Minikube

Prior to deploying to Minikube, VirtualBox and HTTPie must be installed also. The deployment script
has to be run from project root: `minikube.sh` it initializes a Minikube instance and deploy the
application service.

You can find more information inside the script file.

## Heroku

To deploy the WAR in Heroku. First setup the Heroku CLI tool and project:

```bash
heroku login
heroku plugins:install heroku-cli-deploy
heroku create realworld
```

And then build and upload the binary:

```bash
gw clean assemble
heroku war:deploy backend/build/libs/ROOT.war --app realworld
```
