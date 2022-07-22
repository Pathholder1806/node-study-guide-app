window.addEventListener("load", (e) => {
    e.preventDefault();

    const classValue = JSON.parse(localStorage.getItem("class"));
    const subjectValue = JSON.parse(localStorage.getItem("subject"));

    const link = `https://node-study-guide-app.herokuapp.com/study?class=${classValue}&subject=${subjectValue}`;

    fetch(link)
        .then(async (respones) => {
            const data = await respones.json();
            if (!data) {
                return console.log("No data fetched");
            }

            const list = document.querySelector(".main-class-list");

            data.forEach((item) => {
                const listItem = document.createElement("div");

                listItem.classList.add("main-list-item");

                const anchor = document.createElement("a");
                anchor.appendChild(document.createTextNode(item));
                anchor.setAttribute("href", "content");
                listItem.appendChild(anchor);

                list.appendChild(listItem);
            });

            const displayDiv = document.getElementById("display-div");
            displayDiv.appendChild(list);
        })
        .catch((err) => {
            console.log(err);
        });
});

const mainList = document.querySelector(".main-class-list");

mainList.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("main-list-item")) {
        const chapterValue = e.target.textContent;
        console.log(chapterValue);
        localStorage.setItem("chapter", JSON.stringify(chapterValue));
    }
});
