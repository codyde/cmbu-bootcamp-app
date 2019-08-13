### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10.10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod


### STAGE 2: Setup ###

FROM nginx:1.14-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

COPY requirements.txt /tmp/requirements.txt

RUN apk add --no-cache \
    python3 \
    bash \
    postgresql-dev \
    gcc \ 
    python3-dev \ 
    musl-dev \
    git \
    linux-headers && \ 
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    pip3 install -r /tmp/requirements.txt && \
    rm -r /root/.cache

RUN pip install git+https://github.com/Supervisor/supervisor@master

COPY ./app /app
COPY app.conf /usr/supervisord.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/cmbu-bootcamp-app /usr/share/nginx/html

CMD ["/usr/bin/supervisord","--nodaemon","-c","/usr/supervisord.conf"]