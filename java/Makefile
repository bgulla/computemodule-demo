# Variables
IMAGE_NAME = java-book-api
CONTAINER_NAME = java-book-api-container
PORT = 8080

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):8080 -d $(IMAGE_NAME)

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Push the Docker image to a registry
# Replace <your-docker-repo> with your actual Docker repository
push:
	docker tag $(IMAGE_NAME) <your-docker-repo>/$(IMAGE_NAME)
	docker push <your-docker-repo>/$(IMAGE_NAME)

# Test the API by adding a new book
test-add-book:
	curl -X POST "http://localhost:$(PORT)/books" \
	-H "Content-Type: application/json" \
	-H "User-ID: 12345" \
	-d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "publishedYear": 1925}'

# Test the API by getting a book by ID
# Replace <bookId> with the actual book ID
test-get-book:
	curl -X GET "http://localhost:$(PORT)/books/<bookId>"

# Clean up Docker images and containers
clean:
	docker rmi $(IMAGE_NAME) || true
	docker rmi <your-docker-repo>/$(IMAGE_NAME) || true
	docker system prune -f

# Rebuild and run the container
rebuild: stop build run

# Default target
default: build
