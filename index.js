import express from 'express';                          // Import ExpressJS
import exphbs from 'express-handlebars';                // Import handlebars middleware
import bodyParser from 'body-parser';                   // Import the body parser built in middleware
import greetedUsers from './routes/greet-route.js'      // Import the factory function - routes
//import 'dotenv/config'
//import dotenv from 'dotenv';
// ? Index.js connects to routes and routes connect to services (DB)

//dotenv.config();

// * ExpressJS Server START
// Setup a simple ExpressJS server
let app = express();
// Make public folder available to the app
app.use(express.static('public'));

// * Handlebars Setup START
// handlebar engine settings
const handlebarSetup = exphbs.engine({
    partialsDir: './views/partials',
    viewPath: './views',
    layoutsDir: './views/layouts'
})
// setup handlebars
app.engine('handlebars', handlebarSetup);
// set handlebars as the view engine
app.set('view engine', 'handlebars');

// * Body-parser Setup START
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

let greetingApp = greetedUsers();

// Landing page route
app.get("/", async (req, res) => {
    const homePage = await greetingApp.homePage();
    res.render("index", {
        userCount: homePage.userCount,
        userGreeting: homePage.userGreeting,
        userError: homePage.userError,
    });
    // this is done so that previous messages aren't displayed on page refresh.
    await greetingApp.resetVariables();
});

// Greeted users route
app.get("/greeted", async (req, res) => {
    const greetedUsers = await greetingApp.greetedUsers();
    // console.log(greetedUsers);
    res.render("GreetedUsers", { greetedUsersData: greetedUsers });
});

// Count for specific user route
app.get("/counter/:username", async (req, res) => {
    const userData = await greetingApp.userCounter(req.params.username);
    res.render("UserCount", {userData: userData});
});

// Reset data route
app.get("/reset", async (req, res) => {
    await greetingApp.resetData();
    res.redirect("/");
});

// Greet route when user is greeted
app.post("/greet", async (req, res) => {
    await greetingApp.addUser(req.body.radioLang, req.body.txtBoxName, req);
    res.redirect("/");
});

// Set PORT variable
let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});