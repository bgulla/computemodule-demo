package main

import (
    "fmt"
    "net/http"
    "sync"

    "github.com/gin-gonic/gin"
    "github.com/swaggo/files"
    "github.com/swaggo/gin-swagger"
    _ "go-book-api/docs"
    "go-book-api/models"
)

var (
    books = make(map[string]models.Book)
    mu    sync.Mutex
)

// @title Book API
// @version 1.0
// @description This is a simple book API.
// @host localhost:8080
// @BasePath /

func main() {
    r := gin.Default()

    r.POST("/books", addBook)
    r.GET("/books/:id", getBook)

    // Swagger documentation
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    r.Run(":8080")
}

// addBook godoc
// @Summary Add a new book
// @Produce json
// @Param User-ID header string true "User ID"
// @Param book body models.Book true "Book Data"
// @Success 200 {string} string "Book ID"
// @Router /books [post]
func addBook(c *gin.Context) {
    mu.Lock()
    defer mu.Unlock()

    var book models.Book
    if err := c.ShouldBindJSON(&book); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    userID := c.GetHeader("User-ID")
    book.ID = generateID()
    book.AddedBy = userID
    books[book.ID] = book

    c.JSON(http.StatusOK, gin.H{"id": book.ID})
}

// getBook godoc
// @Summary Get a book by ID
// @Produce json
// @Param id path string true "Book ID"
// @Success 200 {object} models.Book
// @Failure 404 {string} string "Book not found"
// @Router /books/{id} [get]
func getBook(c *gin.Context) {
    mu.Lock()
    defer mu.Unlock()

    id := c.Param("id")
    book, exists := books[id]
    if !exists {
        c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
        return
    }

    c.JSON(http.StatusOK, book)
}

func generateID() string {
    return fmt.Sprintf("%d", len(books)+1)
}
