const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formInput = document.querySelector(".form-input");

    const searchValue = formInput.value;

    const link = `https://node-study-guide-app.herokuapp.com/search?chapter=${searchValue}`;

    fetch(link)
        .then(async (response) => {
            const searchResults = await response.json();

            localStorage.setItem(
                "search-results",
                JSON.stringify(searchResults)
            );

            if (searchResults.length === 0) {
                return alert("No results found");
            }

            location.href = "search-page";
        })
        .catch((error) => {
            console.log(error);
        });
});
