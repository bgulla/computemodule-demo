# Variables
IMAGE_NAME = go-book-api
CONTAINER_NAME = go-book-api-container
PORT = 8080

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):8080 -d $(IMAGE_NAME)

# Stop and remove the Docker container
stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Clean up Docker images and containers
clean: stop
	docker rmi $(IMAGE_NAME) || true
	docker system prune -f

# Rebuild and run the container
rebuild: clean build run

# Default target
default: build
