window.addEventListener("load", (e) => {
    e.preventDefault();

    let searchArray;

    if (localStorage.getItem("search-results") === null) {
        favArray = [];
    } else {
        searchArray = JSON.parse(localStorage.getItem("search-results"));
    }

    const displayDiv = document.querySelector(".display-div");

    if (searchArray.length === 0) {
        const message = document.createElement("h3");

        message.appendChild(document.createTextNode("No search results"));

        displayDiv.appendChild(message);
        return;
    }

    const mainList = document.querySelector(".search-list");

    searchArray.forEach((value) => {
        const valueArray = value;
        const chapterTitle = valueArray[2];

        const listItem = document.createElement("li");
        listItem.classList.add("search-list-item");

        const title = document.createElement("h1");
        title.classList.add("chapter-title");
        title.appendChild(document.createTextNode(chapterTitle));
        listItem.appendChild(title);

        const subtitle = document.createElement("h3");
        subtitle.classList.add("chapter-subtitle");
        subtitle.appendChild(
            document.createTextNode(valueArray[0] + ", " + valueArray[1])
        );
        listItem.appendChild(subtitle);

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");

        const gotToBtn = document.createElement("a");
        gotToBtn.classList.add("btn");
        gotToBtn.classList.add("go-to-btn");
        gotToBtn.setAttribute("href", "content");
        gotToBtn.append(document.createTextNode("Go to"));

        btnDiv.appendChild(gotToBtn);

        listItem.appendChild(btnDiv);

        mainList.appendChild(listItem);
    });
});

const mainList = document.querySelector(".search-list");

mainList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("go-to-btn")) {
        const listItem = e.target.parentElement.parentElement;

        const chapter = listItem.childNodes[0].textContent;

        const classValue = listItem.childNodes[1].textContent.split(", ")[0];

        const subject = listItem.childNodes[1].textContent.split(", ")[1];

        localStorage.setItem("class", JSON.stringify(classValue));
        localStorage.setItem("subject", JSON.stringify(subject));
        localStorage.setItem("chapter", JSON.stringify(chapter));

        location.href = "content";
    }
});
