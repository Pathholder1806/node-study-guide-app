const path = require("path");
const express = require("express");
const hbs = require("hbs");
var cors = require("cors");

const mapModule = require("./utils/map-functions");

const app = express();
app.use(cors());

// public directory set-up
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

// template views set-up
const viewsDirectory = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", viewsDirectory);

// Partials set-up
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Yashjeet Singh",
    });
});

app.get("/class", (req, res) => {
    res.render("class", {});
});

app.get("/study", (req, res) => {
    const map = mapModule.mapInit();
    if (!req.query.class) {
        const classes = mapModule.getAllClasses(map);
        return res.send(classes);
    }

    const currentClass = req.query.class;

    if (!req.query.subject) {
        const subjects = mapModule.getAllSubjects(map, currentClass);
        return res.send(subjects);
    }

    const currentSubject = req.query.subject;

    if (!req.query.chapter) {
        const chapters = mapModule.getAllChapters(
            map,
            currentClass,
            currentSubject
        );
        return res.send(chapters);
    }

    const chapterValue = req.query.chapter;

    const chapterContent = mapModule.getAllChapterContent(
        map,
        currentClass,
        currentSubject,
        chapterValue
    );

    return res.send(chapterContent);
});

app.get("/search", (req, res) => {
    const map = mapModule.mapInit();

    const searchValue = req.query.chapter;

    const searchResult = mapModule.searchChapter(map, searchValue);

    res.send(searchResult);
});

app.get("/class", (req, res) => {
    res.render("class");
});

app.get("/subject", (req, res) => {
    res.render("subject");
});

app.get("/chapters", (req, res) => {
    res.render("chapters");
});

app.get("/content", (req, res) => {
    res.render("content");
});

app.get("/favourites", (req, res) => {
    res.render("favourites");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/search-page", (req, res) => {
    res.render("search-page");
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000");
});
