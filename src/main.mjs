import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.NODE_PORT || 3000;
// create express app
const app = express();
// set express app to use public folder
app.use(express.static('src/public'));
// set express app to use hbs engine
app.set('view engine', 'hbs');
// set express app to use views folder
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home',
        message: 'Welcome to the home page'
    });
});

// start express app
app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});