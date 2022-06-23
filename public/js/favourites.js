window.addEventListener("load", (e) => {
    e.preventDefault();

    let favArray;

    if (localStorage.getItem("fav-chapters") === null) {
        favArray = [];
    } else {
        favArray = JSON.parse(localStorage.getItem("fav-chapters"));
    }

    const displayDiv = document.querySelector(".display-div");

    if (favArray.length === 0) {
        const message = document.createElement("h3");

        message.appendChild(document.createTextNode("No favourites"));

        displayDiv.appendChild(message);
        return;
    }

    const mainList = document.querySelector(".favourite-list");

    favArray.forEach((value) => {
        const listItem = document.createElement("li");
        listItem.classList.add("favourite-list-item");
        listItem.appendChild(document.createTextNode(value));

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");

        const gotToBtn = document.createElement("a");
        gotToBtn.classList.add("btn");
        gotToBtn.classList.add("go-to-btn");
        gotToBtn.setAttribute("href", "content");
        gotToBtn.append(document.createTextNode("Go to"));

        btnDiv.appendChild(gotToBtn);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn");
        removeBtn.classList.add("remove-btn");
        removeBtn.append(document.createTextNode("Remove"));

        btnDiv.appendChild(removeBtn);

        listItem.appendChild(btnDiv);

        mainList.appendChild(listItem);
    });
});

const mainList = document.querySelector(".favourite-list");

mainList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("go-to-btn")) {
        const listItem = e.target.parentElement.parentElement;

        let text = listItem.textContent;
        console.log(text);

        text = text.replace("Remove", "");
        text = text.replace("Go to", "");

        const valArray = text.split(",");

        localStorage.setItem("class", JSON.stringify(valArray[0]));
        localStorage.setItem("subject", JSON.stringify(valArray[1]));
        localStorage.setItem("chapter", JSON.stringify(valArray[2]));

        location.href = "content";
    }
});

mainList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("remove-btn")) {
        const listItem = e.target.parentElement.parentElement;

        let text = listItem.textContent;

        text = text.replace("Remove", "");
        text = text.replace("Go to", "");

        console.log(text);

        const valArray = text.split(",");

        localStorage.setItem("class", JSON.stringify(valArray[0]));
        localStorage.setItem("subject", JSON.stringify(valArray[1]));
        localStorage.setItem("chapter", JSON.stringify(valArray[2]));

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

        if (indexToRemove > -1) {
            favArray.splice(indexToRemove, 1);
            e.target.parentElement.parentElement.remove();
        }

        localStorage.setItem("fav-chapters", JSON.stringify(favArray));

        location.reload();
    }
});
