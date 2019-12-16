FROM mcr.microsoft.com/mssql/server:2017-latest-ubuntu as base

WORKDIR /scripts
COPY docker/sql/setup.sql .

WORKDIR /scripts
COPY docker/sql/entrypointscript.sh .

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "dos2unix"]
RUN ["dos2unix", "entrypointscript.sh"]
RUN ["dos2unix", "setup.sql"]

ENTRYPOINT ["/scripts/entrypointscript.sh"]

