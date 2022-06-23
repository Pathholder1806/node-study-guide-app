const ps = require("prompt-sync");
const prompt = ps();

const getDataFromFile = (path) => {
    const fs = require("fs");
    const dataBuffer = fs.readFileSync(path);
    const data = dataBuffer.toString();
    const jsonData = JSON.parse(data);
    return jsonData;
};

const convertJsonToMap = (obj) => {
    const map = new Map();
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            const nestedMap = convertJsonToMap(obj[key]);
            map.set(key, nestedMap);
        } else {
            map.set(key, obj[key]);
        }
    }
    return map;
};

const displayMap = (map) => {
    let counter = 1;
    for (let key of map.keys()) {
        if (key === "Back") {
            console.log("");
            console.log("0. " + key);
        } else {
            console.log(counter + ". " + key);
            counter++;
        }
    }
};

const returnMapKeys = (map) => {
    let counter = 1;

    const keysArray = [];

    for (let key of map.keys()) {
        if (key === "Back") {
            keysArray.push("0. " + key);
        } else {
            keysArray.push(counter + ". " + key);
            counter++;
        }
    }

    return keysArray;
};

const iterateInMap = (map) => {
    // displayMap(map);
    returnMapKeys(map);

    let userInput = prompt("Please make your selection: ");

    let sizeOfMap = 0;

    for (let key of map.keys()) {
        sizeOfMap++;
    }

    if (userInput > sizeOfMap) {
        iterateInMap(map);
    } else if (userInput == 0) {
        const parent = map.get("Back");
        if (parent !== null) {
            console.log("");
            iterateInMap(parent);
        } else {
            process.exit();
        }
    } else {
        let counter = 1;

        for (let [key, value] of map) {
            if (counter == userInput) {
                if (value instanceof Map) {
                    console.log("");
                    iterateInMap(value);
                } else {
                    console.log("");
                    console.log(value);
                }
                break;
            } else {
                counter++;
            }
        }
    }
};

const setBackPath = (map, parentMap) => {
    map.set("Back", parentMap);

    for (let [key, value] of map) {
        if (key !== "Back") {
            if (value instanceof Map) {
                setBackPath(value, map);
            } else {
                const chapterMap = new Map();
                chapterMap.set("content", value);
                chapterMap.set("Back", map);
                map.set(key, chapterMap);
            }
        }
    }
};

const mapInit = () => {
    const jsonData = getDataFromFile("./src/utils/dummy.json"); // gets data in json format
    const map = convertJsonToMap(jsonData); // jsonData -> Map
    // setBackPath(map, map);
    return map;
};

const getAllClasses = (map) => {
    const keys = [];

    for (let key of map.keys()) {
        keys.push(key);
    }

    return keys;
};

const getAllSubjects = (map, currClass) => {
    const subjects = [];

    for (let subject of map.get(currClass).keys()) {
        subjects.push(subject);
    }

    return subjects;
};

const getAllChapters = (map, currClass, currSubject) => {
    const chapters = [];

    for (let chapter of map.get(currClass).get(currSubject).keys()) {
        chapters.push(chapter);
    }

    return chapters;
};

const getAllChapterContent = (map, currClass, currSubject, currChapter) => {
    return map.get(currClass).get(currSubject).get(currChapter);
};

const searchChapter = (map, searchValue) => {
    const searchResults = [];

    const classes = getAllClasses(map);

    classes.forEach((classValue) => {
        const subjects = getAllSubjects(map, classValue);

        subjects.forEach((subject) => {
            const chapters = getAllChapters(map, classValue, subject);

            chapters.forEach((chapter) => {
                if (chapter.toLowerCase().includes(searchValue.toLowerCase())) {
                    const searchResult = [];
                    searchResult.push(classValue, subject, chapter);

                    searchResults.push(searchResult);
                }
            });
        });
    });

    return searchResults;
};

// const jsonData = getDataFromFile("./dummy.json"); // gets data in json format

// const map = convertJsonToMap(jsonData); // jsonData -> Map

// setBackPath(map, map);

// const map = mapInit();
// searchChapter(map, "1");

// console.log(map.get("Class-VI").get("English").get("Chapter 1"));

// iterateInMap(map);

/*

Extra functions

const saveDataToFile = (path, data) => {
    const fs = require("fs");
    fs.writeFileSync(path, data);
};

const covertMapToJSON = (map) => {
    const obj = {};

    for (const [key, value] of map) {
        if (value instanceof Map) {
            obj[key] = covertMapToJSON(value);
        } else {
            obj[key] = value;
        }
    }

    return obj;
};


*/

module.exports = {
    mapInit: mapInit,
    iterateInMap: iterateInMap,
    getAllClasses: getAllClasses,
    getAllSubjects: getAllSubjects,
    getAllChapters: getAllChapters,
    getAllChapterContent: getAllChapterContent,
    searchChapter: searchChapter,
};
