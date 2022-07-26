# The Riftwar Cycle Bookshop

A website dedicated to the Riftwar Cycle novels published by Raymond E Feist. The website allows users to purchase copies of the books and leave reviews on them.

## Technology Used

- React
- Redux
- NodeJS
- Express
- MongoDB (Mongoose ORM)
- Tailwind (some daisyUI components)
- Stripe

## Features

User authentication made possible with JSON web tokens, and Redux was used to manage the global state of the application. In some cases, React Query was used to fetch data to reduce the reliance of a global state manager.
A user can signin, signout, view their information and their orders. They also have the ability to leave reviews on products when logged in.
The backend stores user credentials orders and handles tokens and data storage.

## Get up and running

1. Clone the repository or download the zip file.
2. Run npm install on the root directory to install any packages.
3. Create a MongoDB account, and set up MongoDB Cloud with the database. Follow [this guide](https://www.mongodb.com/docs/atlas/getting-started/) to do so.
4. An optional step, install MongoDB Compass, a desktop app to monitor your database. Connect via the connection string generated through MongoDB cloud.
5. Create a .env file that contains your port number, MONGO_URI and JWT secret.
6. Change directory to the client by doing cd/client.
7. Run npm install to install any packages.
8. Run npm run dev to start the client and server, register a user to populate the database.
