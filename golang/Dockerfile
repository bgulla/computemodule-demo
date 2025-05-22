# Use the official Golang image to build the application
FROM golang:1.20 AS builder

WORKDIR /app

# Install CA certificates
RUN apt-get update && apt-get install -y ca-certificates

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code
COPY go-book-api .

# Generate Swagger documentation
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init

# Build the Go application
RUN go build -o /go-book-api main.go

# Use a minimal image to run the application
FROM alpine:latest

WORKDIR /

# Copy the binary and Swagger docs from the builder image
COPY --from=builder /go-book-api /go-book-api
COPY --from=builder /app/docs /docs

# Install CA certificates for HTTPS
RUN apk --no-cache add ca-certificates

# Expose the application on port 8080
EXPOSE 8080

# Command to run the executable
CMD ["/go-book-api"]
