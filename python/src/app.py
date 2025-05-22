from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
import uuid

app = Flask(__name__)
api = Api(app, version='1.0', title='Book API', description='A simple Book API')

ns = api.namespace('books', description='Books operations')

books = {}

book_model = api.model('Book', {
    'title': fields.String(required=True, description='The book title'),
    'author': fields.String(required=True, description='The book author'),
    'published_year': fields.Integer(required=True, description='The year the book was published')
})

@ns.route('/')
class BookList(Resource):
    @ns.doc('add_book')
    @ns.expect(book_model)
    @ns.response(200, 'Success')
    def post(self):
        """Add a new book"""
        data = request.json
        user_id = request.headers.get('User-ID')
        title = data.get('title')
        author = data.get('author')
        published_year = int(data.get('published_year'))

        book_id = str(uuid.uuid4())

        books[book_id] = {
            'title': title,
            'author': author,
            'published_year': published_year,
            'added_by': user_id
        }
        return jsonify(book_id), 200

@ns.route('/<string:book_id>')
@ns.param('book_id', 'The book identifier')
class Book(Resource):
    @ns.doc('get_book')
    @ns.response(200, 'Success')
    @ns.response(404, 'Book not found')
    def get(self, book_id):
        """Fetch a book given its identifier"""
        book = books.get(book_id)
        if book:
            return jsonify(book), 200
        else:
            ns.abort(404, "Book not found")

if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0')
