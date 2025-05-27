import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { addBook, getBook } from './controllers/bookController';

const app = express();
const port = 8080;

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Book API',
    version: '1.0.0',
    description: 'A simple Book API'
  },
  paths: {
    '/books': {
      post: {
        summary: 'Add a new book',
        parameters: [
          {
            name: 'User-ID',
            in: 'header',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  author: { type: 'string' },
                  publishedYear: { type: 'integer' }
                },
                required: ['title', 'author', 'publishedYear']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Book added',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    bookId: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/books/{bookId}': {
      get: {
        summary: 'Get a book by ID',
        parameters: [
          {
            name: 'bookId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Book found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Book'
                }
              }
            }
          },
          '404': {
            description: 'Book not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          author: { type: 'string' },
          publishedYear: { type: 'integer' },
          addedBy: { type: 'string' }
        }
      }
    }
  }
};

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/books', addBook);
app.get('/books/:bookId', getBook);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
