package models

type Book struct {
    ID            string `json:"id"`
    Title         string `json:"title"`
    Author        string `json:"author"`
    PublishedYear int    `json:"published_year"`
    AddedBy       string `json:"added_by"`
}
