window.addEventListener("load", (e) => {
    e.preventDefault();

    const classValue = JSON.parse(localStorage.getItem("class"));
    const subjectValue = JSON.parse(localStorage.getItem("subject"));
    const chapterValue = JSON.parse(localStorage.getItem("chapter"));

    const link = `https://node-study-guide-app.herokuapp.com/study?class=${classValue}&subject=${subjectValue}&chapter=${chapterValue}`;

    const mainHeading = document.querySelector(".chapter-heading");

    mainHeading.appendChild(document.createTextNode(chapterValue));

    let favArray;

    if (localStorage.getItem("fav-chapters") === null) {
        favArray = [];
    } else {
        favArray = JSON.parse(localStorage.getItem("fav-chapters"));
    }

    const val = [];
    val.push(classValue);
    val.push(subjectValue);
    val.push(chapterValue);

    let isPresent = false;

    favArray.forEach((value) => {
        if (JSON.stringify(value) === JSON.stringify(val)) {
            isPresent = true;
        }
    });

    if (isPresent) {
        const star = document.createElement("i");
        star.className = "far fa-bookmark fa-xs";
        star.style.color = "#3d5a80";
        star.style.marginLeft = "1rem";
        mainHeading.appendChild(star);
    }

    fetch(link)
        .then(async (respones) => {
            const data = await respones.text();
            if (!data) {
                return console.log("No data fetched");
            }

            console.log(data);

            const chapterContentDiv =
                document.querySelector(".chapter-content");

            chapterContentDiv.appendChild(document.createTextNode(data));
        })
        .catch((err) => {
            console.log(err);
        });
});

const favButton = document.querySelector(".fav-btn");

favButton.addEventListener("click", (e) => {
    e.preventDefault();

    let favArray;

    if (localStorage.getItem("fav-chapters") === null) {
        favArray = [];
    } else {
        favArray = JSON.parse(localStorage.getItem("fav-chapters"));
    }

    // get all the info

    const classValue = JSON.parse(localStorage.getItem("class"));
    const subjectValue = JSON.parse(localStorage.getItem("subject"));
    const chapterValue = JSON.parse(localStorage.getItem("chapter"));

    const val = [];
    val.push(classValue);
    val.push(subjectValue);
    val.push(chapterValue);

    let isPresent = false;

    favArray.forEach((value) => {
        if (JSON.stringify(value) === JSON.stringify(val)) {
            isPresent = true;
        }
    });

    if (!isPresent) {
        favArray.push(val);
        const star = document.createElement("i");
        star.className = "far fa-bookmark fa-xs";
        star.style.color = "#3d5a80";
        star.style.marginLeft = "1rem";
        const mainHeading = document.querySelector(".chapter-heading");
        mainHeading.appendChild(star);
    }

    localStorage.setItem("fav-chapters", JSON.stringify(favArray));
});

const unFavButton = document.querySelector(".unfav-btn");
unFavButton.addEventListener("click", (e) => {
    e.preventDefault();

    let favArray;

    if (localStorage.getItem("fav-chapters") === null) {
        favArray = [];
    } else {
        favArray = JSON.parse(localStorage.getItem("fav-chapters"));
    }

    const classValue = JSON.parse(localStorage.getItem("class"));
    const subjectValue = JSON.parse(localStorage.getItem("subject"));
    const chapterValue = JSON.parse(localStorage.getItem("chapter"));

    const val = [];
    val.push(classValue);
    val.push(subjectValue);
    val.push(chapterValue);

    let indexToRemove = -1;

    for (let index = 0; index < favArray.length; index++) {
        if (JSON.stringify(val) === JSON.stringify(favArray[index])) {
            indexToRemove = index;
        }
    }

    console.log(indexToRemove);

    if (indexToRemove > -1) {
        favArray.splice(indexToRemove, 1);
        const star = document.querySelector(".far");
        star.remove();
    }

    localStorage.setItem("fav-chapters", JSON.stringify(favArray));
});
