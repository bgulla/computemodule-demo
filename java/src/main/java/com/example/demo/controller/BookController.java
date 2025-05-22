package com.example.demo.controller;

import com.example.demo.model.Book;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/books")
@Tag(name = "Books", description = "Operations related to books")
public class BookController {

    private final Map<String, Book> books = new HashMap<>();

    @Operation(summary = "Add a new book")
    @PostMapping
    public ResponseEntity<String> addBook(@RequestHeader("User-ID") String userId, @RequestBody Book book) {
        String bookId = UUID.randomUUID().toString();
        book.setAddedBy(userId);
        books.put(bookId, book);
        return ResponseEntity.ok(bookId);
    }

    @Operation(summary = "Get a book by ID")
    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBook(@PathVariable String bookId) {
        Book book = books.get(bookId);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
