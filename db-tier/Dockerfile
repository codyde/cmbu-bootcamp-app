FROM postgres:10.0

WORKDIR /

COPY create-cmbu-data.sh /docker-entrypoint-initdb.d/init-cmbu-data.sh

ENV POSTGRES_PASSWORD=postgres_password