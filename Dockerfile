# FROM openjdk:11

# WORKDIR /app

# COPY application/target/thingsboard-3.4.4-boot.jar /opt/app/thingsboard-3.4.4-boot.jar

# COPY application/target/data/sql/ /docker-entrypoint-initdb.d/

# EXPOSE 9090

# CMD java -jar /opt/app/thingsboard-3.4.4-boot.jar --installScript=install/psql_ts/install-tb-schema-entities-ts-psql.sql
FROM thingsboard/openjdk11:bullseye-slim
MAINTAINER AldrichEugene
ADD application/target/data/ /usr/share/thingsboard/data
ADD application/target/thingsboard-3.4.4-boot.jar /usr/share/thingsboard/bin/thingsboard.jar
EXPOSE 8080
EXPOSE 1883
EXPOSE 5683/udp
EXPOSE 5685/udp
ENTRYPOINT ["java","-jar","/usr/share/thingsboard/bin/thingsboard.jar"]