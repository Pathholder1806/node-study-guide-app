window.addEventListener("load", (e) => {
    console.log("page is fully loaded");
    e.preventDefault();

    const link = "http://127.0.0.1:3000/study";

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
                anchor.setAttribute("href", "subject");
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
        const classValue = e.target.textContent;
        console.log(classValue);
        localStorage.setItem("class", JSON.stringify(classValue));
    }
});
