# ETAPA 1: Compilación (Usamos Maven y Java 21)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos el contenido de la carpeta backend al contenedor
COPY ./backend /app

# Ejecutamos el comando de compilación (mvn clean install) 
# Saltamos los tests para que el build sea más rápido
RUN mvn clean install -DskipTests

# ETAPA 2: Ejecución (Solo necesitamos el JRE para correr el .jar)
FROM eclipse-temurin:21-jre
WORKDIR /app

# Traemos el archivo generado (.jar) desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto que usa Spring Boot
EXPOSE 8080

# Comando para arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]