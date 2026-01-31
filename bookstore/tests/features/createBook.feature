Feature: Create Book

    After creating a book, it must be visible on the home page

    Scenario: Create a book
        When the user creates a book by API:
            | title  | Rashmirathi           |
            | author | Ramdhari Singh Dinkar |
            | genre  | Fiction               |
            | stock  | 500                   |
            | price  | 1200                  |
            | rating | 5                     |
        And navigates to the home page
        Then following book should be visible on the page:
            | Name   | Rashmirathi           |
            | Author | Ramdhari Singh Dinkar |
            | Genre  | Fiction               |
            | Stock  | 500                   |
            | Price  | 1200                  |