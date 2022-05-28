import express from "express";
// import session from "express-session";
import session from "cookie-session";
import hbs from "hbs";
import path from "path";

const port = process.env.NODE_PORT || 3000;
const books = [
    {id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, price: 20.00},
    {id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 916, price: 30.00},
    {id: 3, title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224, price: 10.00},
    {id: 4, title: "The Grapes of Wrath", author: "John Steinbeck", pages: 268, price: 15.00},
    {id: 5, title: "Animal Farm", author: "George Orwell", pages: 256, price: 5.00},
    {id: 6, title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, price: 25.00},
    {id: 7, title: "The Scarlet Letter", author: "Nathaniel Hawthorne", pages: 552, price: 15.00},
];

// create express app
const app = express();
// set express app to use public folder
app.use(express.static('src/public'));
// use body parser for parsing request body
app.use(express.urlencoded({extended: true}));
// set session to use cookies
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: "MySecret",
}));
// set express app to use hbs engine
app.set('view engine', 'hbs');
// set express app to use views folder
app.set('views', path.resolve('./src/views'));
// set hbs upper case helper
hbs.registerHelper('upper', value => value.toUpperCase());
// set hbs currency helper
hbs.registerHelper('curr', value => "₪" + value);
// set hbs partial helper
hbs.registerPartials(path.resolve('./src/views/partials'));
// set local as template data
hbs.localsAsTemplateData(app);
app.locals.title = "Library";

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home',
        message: 'Welcome to the home page',
        books: books
    });
});

// get request to /new-book
app.get('/new-book', (req, res, next) => {
    res.render('new-book', {
        title: 'New Book',
        message: 'Add a new book'
    });
});

// get request to /about
app.get('/about', (req, res, next) => {
    req.session.count = (req.session.count || 0) + 1;
    res.render('about', {
        title: 'About',
        message: 'About the app',
        count: req.session.count
    });
});

// post request to /new-book
app.post('/new-book', (req, res, next) => {
    let book = req.body;
    book.id = books.length + 1;
    books.push(book);
    res.redirect('/');
});

// start express app
app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});