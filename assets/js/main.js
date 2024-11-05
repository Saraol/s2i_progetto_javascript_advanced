import axios from 'axios';
import '../css/styles.css';


//Get references to the search form, results container, and loading element
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const resultsContainer = document.getElementById("results");
    const loadingElement = document.getElementById("loading");
    let lastSearchResults = []; // Temporary storage for search results

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behaviour
        loadingElement.classList.add("show"); //Show the loading animation
        const input = document.getElementById("input").value.trim().toLowerCase();

        if (input === "") {
            resultsContainer.innerHTML = "<p class='error-message'>Please, enter a genre!</p>"; // Error message if the textbox is empty 
            loadingElement.classList.remove("show"); //Hide the loading animation
            return;
        }

        const maxResults = 300; //Maximum number of results to fetch
        const apiUrl = `${process.env.API_URL}/${input}.json?limit=${maxResults}`; //API URL with environment variable

        // Make the API call with Axios
        axios.get(apiUrl)
            .then(response => {
                lastSearchResults = response.data.works; //Save the results for possible later use
                displayBooks(lastSearchResults); // Display fetched books
                loadingElement.classList.remove("show"); // Hide the loading animation
            })
            .catch(error => { //Handle errors that occur during the fetch operation
                console.error("Error fetching books:", error);
                resultsContainer.innerHTML = "<p>Oops, something went wrong. Please try again later...</p>"; // Display an error message
                loadingElement.classList.remove("show"); //Hide loading animation
            });
    });

    function displayBooks(books) { //Display a booklist 
        resultsContainer.innerHTML = ""; //Clear any previous results

        books.forEach(book => {
            const title = truncateTitle(book.title, 30); //Truncate the title if it's longer than 30 characters
            const authors = book.authors ? truncateAuthors(book.authors.map(author => author.name).join(", "), 50) : "Unknown author"; //Get authors'name
            const bookKey = book.key; 
            const coverUrl = `${process.env.COVER_BASE_URL}/${book.cover_id}-M.jpg`; //Cover image URL 

            //Container for each book item
            const bookItem = document.createElement("div");
            bookItem.classList.add("book-item");

            //Book cover image
            const coverImg = document.createElement("img");
            coverImg.src = coverUrl;
            coverImg.alt = `${title} cover`;
            coverImg.classList.add("book-cover");
            bookItem.appendChild(coverImg);

            //Book info
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");

            //Title element
            const titleElement = document.createElement("h2"); 
            titleElement.textContent = title;
            titleElement.classList.add("book-title");
            bookInfo.appendChild(titleElement);

            //Authors element
            const authorsElement = document.createElement("p"); 
            authorsElement.textContent = `Authors: ${authors}`;
            authorsElement.classList.add("authors");
            bookInfo.appendChild(authorsElement);

            //Description button 
            const descriptionButtonWrapper = document.createElement("div");
            descriptionButtonWrapper.classList.add("description-button-wrapper");

            const descriptionButton = document.createElement("button");
            descriptionButton.textContent = "Description";
            descriptionButton.classList.add("btn", "description-button");
            descriptionButton.addEventListener("click", function () {
                getBookDescription(bookKey); //fetch and display book description
            });
            descriptionButtonWrapper.appendChild(descriptionButton); //Append description button to description button wrapper
            bookItem.appendChild(descriptionButtonWrapper); //Append description button wrapper to book item

            bookItem.appendChild(bookInfo); //Append book info to book item
            resultsContainer.appendChild(bookItem); //Append book item to results container 
        });
    }

    function getBookDescription(bookKey) {
        const apiUrl = `${process.env.BASE_BOOK_URL}${bookKey}.json`; //API URL for book details

        //Axios to fetch book details from the API
        axios.get(apiUrl)
            .then(response => {
                displayBookDescription(response.data); // Show book description if fetch is successful
            })
            .catch(error => {
                console.error("Error fetching book description:", error);
                resultsContainer.innerHTML = "<p>Oops! Something went wrong... Please try again later.</p>"; // Error message if fetch fails
            });
    }

    //Display book description
    function displayBookDescription(book) {
        const bookDescriptionContainer = document.createElement("div"); //Container for book description
        bookDescriptionContainer.classList.add("book-description-container");
        
        //Title element for book description
        const titleElement = document.createElement("div"); 
        titleElement.classList.add("book-title-description");
        titleElement.textContent = book.title;

        const descriptionElement = document.createElement("p"); //Description text
        descriptionElement.classList.add("p-description");
        let descriptionText = "Sorry, description not available!"; //Error message if no description is available 

        //Check and retrieve book description handling different data types
        if (typeof book.description === "string") {
            descriptionText = book.description;
        } else if (typeof book.description === "object" && book.description !== null) {
            if (book.description.value) {
                descriptionText = book.description.value;
            }
        }

        descriptionElement.textContent = descriptionText;

        //Back to results button
        const backButton = document.createElement("button");
        backButton.textContent = "Back to Results";
        backButton.classList.add("btn", "back-button");
        backButton.addEventListener("click", function () {
            displayBooks(lastSearchResults); //Return to search results 
        });

        //Append elements to description container 
        bookDescriptionContainer.appendChild(titleElement);
        bookDescriptionContainer.appendChild(descriptionElement);
        bookDescriptionContainer.appendChild(backButton);

        resultsContainer.innerHTML = ""; //Clear the current display
        resultsContainer.appendChild(bookDescriptionContainer); //Append description container to results container
    }

    // Function to shorten title if it's too long 
    function truncateTitle(title, maxLength) {
        return title.length > maxLength ? title.substring(0, maxLength - 3) + "..." : title;
    }
    
    //Function to shorten authors'names if they are too long
    function truncateAuthors(authors, maxLength) {
        return authors.length > maxLength ? authors.substring(0, maxLength - 3) + "..." : authors;
    }
});
