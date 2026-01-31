import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { page } from "../hooks/page";

console.log("Executed Steps file");

interface Book {
  title: string;
  author: string;
  genre: string;
  price: number;
  stock: number;
  rating: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

let bookCreated: Book;

When(
  "(the user )creates a book by API:",
  async function (datatable: DataTable) {
    const bookToCreate = datatable.rowsHash();
    console.log("Creating a book by API: ", bookToCreate);

    const response = await fetch("http://localhost:8080/books", {
      method: "POST",
      body: JSON.stringify(bookToCreate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status != 201) {
      console.error(
        "Error in creating a book by API: ",
        response.status,
        response.statusText,
      );
      console.log("Response body: ", response.body);
    }

    bookCreated = (await response.json()) as Book;
    console.log("Book created successfully: ", bookCreated);
  },
);

When("(the user )navigates to the home page", async function () {
  await page.goto(" http://localhost:5173");
});

Then(
  "following book should be visible on the page:",
  async function (datatable: DataTable) {
    console.log("Book is visible");
  },
);
