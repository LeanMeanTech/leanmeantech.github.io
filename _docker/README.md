# LeanMeanTech Web Docker

A Docker image that lets you run the leanmeantech.github.io development environment.

## Purpose

This is a development helper, not currently used in production.

## Docker Prerequisites

Requires Docker 1.5+

## Bootstrap & Install

This assumes you'll have your installation at ~, there will be two directories: 
* leanmeantech.github.io-data
* leanmeantech.github.io (this repository)
    
Adjust the paths if necessary.

**Bootstrap Data**
```
cd ~;
mkdir leanmeantech.github.io-data;
cd leanmeantech.github.io-data;
mkdir -p opt/apps/log;
```

**Repositories**

Assumes that:
* https://github.com/LeanMeanTech/leanmeantech.github.io

is cloned into ~.

## Creating Data Container w/ Volumes

This needs to be done once, if `leanmeantech.github.io-data` is listed in 
`docker ps -a` this step should't be run.

```
docker run \
  -v ~/leanmeantech.github.io-data/opt/apps/log:/opt/apps/log \
  -v ~/leanmeantech.github.io:/opt/apps/leanmeantech.github.io \
  --name leanmeantech.github.io-data busybox true;
```

## Running Development Container w/ Volumes

**Build Development Container**

This needs to be done once (unless the Dockerfile is updated), if you have
`leanmeantech/leanmeantech.github.io` in your `docker images` output then you can 
skip this step.

```
cd ~/leanmeantech.github.io/_docker;
docker build -t leanmeantech/leanmeantech.github.io .;
```

**Start Development Container**

```
docker run -it -d \
  -p 4000:4000 \
  --volumes-from leanmeantech.github.io-data \
  --name leanmeantech.github.io \
  --hostname leanmeantech.github.io \
  leanmeantech/leanmeantech.github.io;
```

**Connect Development Container**
```
docker exec -it leanmeantech.github.io /bin/bash;
```

**Run Jekyll**
```
# on container
cd /opt/apps/leanmeantech.github.io; jekyll serve --host=0.0.0.0 --force_polling;
```

**Stopping Container**

The container will continue to run until stopped, which can be done via:
`docker stop leanmeantech.github.io` and restarted with 
`docker start leanmeantech.github.io`. Note that jekyll will need to be restarted 
as well.

## Ports

The following ports are exposed:

 * 4000

Retrieve the container (or virtual machine) ip and connect on port 4000

Linux:
```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' leanmeantech.github.io
```

OSX:
```
boot2docker ip
```

On OSX (if using B2D) this is typically going to be http://192.168.59.103:4000 
