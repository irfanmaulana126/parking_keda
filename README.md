run `npm install` to install the project dependencies

#### Setting up the PostgreSQL database
Install the following PostgreSQL environments.

- [PostgreSQL](https://www.postgresql.org/download/)an opensource relational databse management system.
- [pgAdmin](https://www.pgadmin.org/download/), standalone destop application for managing PostgreSQL databases.

Once installed and well configured, create a database and a table to work with.

- Create a database, `parking`.

```SQL
CREATE DATABASE parking;
```

- Create a table, `parking`.

```SQL
CREATE TABLE public.parking (
	id int8 NOT NULL DEFAULT nextval('product_id_seq'::regclass),
	type_transport varchar NULL,
	start_date timestamp NULL,
	end_date timestamp NULL,
	price varchar NULL
);

```

### Running the application

- Start the development server by Running:

```bash
nodemon .\src\index.js
```

- In a browser, visit `http://localhost/4000`;

- Interact with the application.