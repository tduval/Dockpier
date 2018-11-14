# Dockpier
Dockpier is personnal project to study Docker Container and API usage.
It is composed of 2 elements which is :
- [**Dockpier-apy**](https://github.com/tduval/Dockpier-apy) : Python-based API made with Flask, Flask-Restful and Docker-Py libraries to contact and interact with the local Docker Engine.
- [**Dockpier**](https://github.com/tduval/Dockpier) : Web-based Frontend made with VueJS frameworks which present the result of the python API by async request.

## Presentation
![GIF of Dockpier](https://github.com/tduval/Dockpier/blob/master/Dockpier-presentation.gif)

## Try it with Docker
This app is available on Community Docker Hub at the following URL https://hub.docker.com/r/tduval/dockpier-apy/
Launch the backend container on a Manager Docker node with the following command :
```
docker run -dti --name dockpier-apy -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock tduval/dockpier-apy:latest
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
