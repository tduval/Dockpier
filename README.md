# Dockpier


## Try it with Docker
This app is available on Community Docker Hub at the following URL https://hub.docker.com/r/tduval/dockpier/
Launch the container on a Manager Docker node with the following command :
```
docker run -dti --name dockpier -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock tduval/dockpier:latest
```
