# Use an OpenJDK image with Java 21 as the base for building
FROM openjdk:25-jdk-slim-bullseye AS build
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy the project files and build the application
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Use an OpenJDK image with Java 21 to run the application
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

USER 5000

## from flask
#LABEL server.openapi='{"openapi":"3.0.0","servers":[{"url":"http://localhost:8080"}],"paths":{"/books":{"post":{"operationId":"addBook","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string"},"author":{"type":"string"},"published_year":{"type":"integer"}}}}}},"parameters":[{"name":"User-ID","in":"header","schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"type":"string"}}}}}}},"/books/{book_id}":{"get":{"operationId":"getBook","parameters":[{"name":"book_id","in":"path","schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"type":"object","properties":{"title":{"type":"string"},"author":{"type":"string"},"published_year":{"type":"integer"},"added_by":{"type":"string"}}}}}}}}}}}'
# LABEL server.openapi='{"openapi":"3.0.1","info":{"title":"OpenAPI definition","version":"v0"},"servers":[{"url":"http://localhost:8080","description":"Generated server url"}],"tags":[{"name":"Books","description":"Operations related to books"}],"paths":{"/books":{"post":{"tags":["Books"],"summary":"Add a new book","operationId":"addBook","parameters":[{"name":"User-ID","in":"header","required":true,"schema":{"type":"string"}}],"requestBody":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/Book"}}},"required":true},"responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"type":"string"}}}}}}},"/books/{bookId}":{"get":{"tags":["Books"],"summary":"Get a book by ID","operationId":"getBook","parameters":[],"responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"$ref":"#/components/schemas/Book"}}}}}}}},"components":{"schemas":{"Book":{"type":"object","properties":{"title":{"type":"string"},"author":{"type":"string"},"publishedYear":{"type":"integer","format":"int32"},"addedBy":{"type":"string"}}}}}}'
ENTRYPOINT ["java", "-jar", "app.jar"]
