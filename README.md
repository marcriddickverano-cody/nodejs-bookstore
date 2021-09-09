# Bookstore API

This is a simple REST API for a bookstore using NodeJS.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

1. Download and install [NodeJS](https://nodejs.org/en/).
2. Verify if `NodeJS` is installed by running the following command:
   ```JS
   node --version
   ```
3. Verify `npm` is installed successfully by running the following command:
   ```JS
   npm --version
   ```
4. Open a terminal and go to the folder where you want to clone the project.
5. Clone the repository:
   ```JS
   https://github.com/marcriddickverano-cody/nodejs-bookstore.git
   ```
6. Now, let's install the packages:
   ```JS
   npm install
   ```
7. For the database, download and install [postgres](https://www.postgresql.org/).
8. Run `postgres` server.
9. In the project, copy file `env.example` and name it `.env`.
10. Now, let's install the packages:
    ```JS
    APP_PORT=
    ```
11. Input the database config into the `.env`.
    ```JS
    DB_HOST=
    DB_USER=
    DB_NAME=
    DB_PASSWORD=
    DB_PORT=
    ```
13. To create the tables and some dummy data, go to the project and find `database/` folder. Open the `.sql` files and run it to the database.
    - tables.sql
    - data.sql
12. Finally, run the application server with this command.
    ```JS
    npm run dev
    ```
14. You should be able to see this in the terminal:
    ```JS
    [nodemon] starting `node server.js`
    Listening on port 3000...
    ```

You're finished with the setup.