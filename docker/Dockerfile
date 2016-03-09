#
# LeanMeanTech Website Development Container
# DEVELOPMENT USE ONLY
#

FROM ubuntu:14.04
MAINTAINER Artur Ergashev <artur@leanmeantech.com>

# Bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Un-@&#@ VI
ADD files/root/.vimrc /root/.vimrc

# Update System
RUN apt-get update && apt-get upgrade -y -o DPkg::Options::=--force-confold
RUN apt-get install -y software-properties-common dmidecode wget

# Install Build Essentials
RUN apt-get install build-essential --yes

# Ruby
RUN apt-get install curl --yes
RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
RUN \curl -L https://get.rvm.io | bash -s stable
RUN /bin/bash -l -c "rvm requirements"
RUN /bin/bash -l -c "rvm install 2.0"
RUN /bin/bash -l -c "gem install bundler --no-ri --no-rdoc"

# Jekyll
RUN /bin/bash -l -c "gem install jekyll"

# RVM Helper
ADD files/root/.bashrc /root/.bashrc

# Volumes
VOLUME ['/opt/apps/leanmeantech.github.io', '/opt/apps/log']

# Ports
EXPOSE 4000