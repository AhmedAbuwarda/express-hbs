import express from "express";
import hbs from "hbs";
import path from "path";

const port = process.env.NODE_PORT || 3000;
const books = [
    {id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310},
    {id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 916},
    {id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224},
    {id: 4, title: "The Grapes of Wrath", author: "John Steinbeck", pages: 268},
    {id: 5, title: "Animal Farm", author: "George Orwell", pages: 256},
    {id: 6, title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180},
    {id: 7, title: "The Scarlet Letter", author: "Nathaniel Hawthorne", pages: 552},
];

// create express app
const app = express();
// set express app to use public folder
app.use(express.static('src/public'));
// set express app to use hbs engine
app.set('view engine', 'hbs');
// set express app to use views folder
app.set('views', path.resolve('./src/views'));

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home',
        message: 'Welcome to the home page',
        books: books
    });
});

// start express app
app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});