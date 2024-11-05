# My Bookshelf
## JavaScript Advanced Project

<details>
  <summary>Tables of Contents</summary>
    <ol>
      <li><a href="#overview">Overview</a></li>
      <li><a href="#about-the-project">About The Project</a></li>
      <li><a href="#built-with">Built With</a></li>
      <li><a href="#links-and-contacts">Links and Contacts</a></li>
        <ul>
          <li><a href="#try-the-website">Try the Website</a></li>
          <li><a href="#my-contacts">My Contacts</a></li>
        </ul>
     </ol>
</details>

## Overview
![homepage-and-loading](https://github.com/user-attachments/assets/14dcb434-26ae-4082-8e62-48b6389fa898)
![book-list](https://github.com/user-attachments/assets/d6e89f29-50c3-42f0-b13a-70575f1906a5)
![book-description](https://github.com/user-attachments/assets/1822da6f-939f-407a-a666-8a15bc5b85c8)

## About the Project
**My Bookshelf** is my third project carried out within the **Full Stack Development** course, which I am taking on [start2impact](https://www.start2impact.it/).

The project's goal is to create an application that encourages book reading.

The **application** consists of a simple **textbox** in which the user can type in the genre of book he or she wishes to read. As soon as the **“Search” button** is pressed, the application will contact the **API** of the external service **Open Library** (https://openlibrary.org/subjects/{input}.json), thus retrieving the list of books belonging to that genre and displaying their titles, authors and covers (https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg).

By clicking on the **“Description” button**, the application will contact another **API** (https://openlibrary.org${bookKey}.json), passing the key of the book present in the previous response, allowing the user to view the full description of the book.

In order to make content exploration easier and more intuitive, I also decided to include a **"Back to Results" button**. When the user presses this button, an anonymous function will be executed to handle the event of **returning** to the **search results**.
In this way, the content of the book description will be removed from the results container, allowing the search results to be displayed again.

To keep API URL management flexible and secure, these URLS are managed through environment variables. In the code, in fact, these variables are accessed using process.env, as follows:
* API_URL for the Open Library subject API, which retrieves the list of books by genre: `${process.env.API_URL}/${input}.json?limit=${maxResults}`
* COVER_BASE_URL for retrieving book covers: `${process.env.COVER_BASE_URL}/${book.cover_id}-M.jpg`
* BASE_BOOK_URL for fetching book descriptions by specific keys: `${process.env.BASE_BOOK_URL}${bookKey}.json`

By using environment variables, these URLs can be adjusted easily without modifying the main code, allowing for better adaptability and security in different deployment environments.

## Built With
* **HTML** used to define the basic structure of the page;
* **CSS** applied to style the user interface, make the app visually appealing and handle responsiveness through media queries;
* **JavaScript** responsible for the site’s logic, managing user input and API calls;
* **Axios** which simplifies API calls, allowing http requests to be sent in a clearer and more concise way;
* **Webpack** used for bundling and module management, simplifying code organization and making page loading more efficient. Webpack, in combination with dotenv-webpack, allows to use environment variables from the .env file, thus keeping sensitive data hidden from the code and enhancing security and maintainability.

## Links and Contacts
### Try My Bookshelf
**Project Link**: https://mybookshelf-project.netlify.app/

### My Contacts
* [My Website](https://saraol.github.io/)
* [Instagram](https://www.instagram.com/sarainwonderweb/)
* [LinkedIn](https://www.linkedin.com/in/saraol84/)
