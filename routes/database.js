import dotenv from 'dotenv';
import pgPromise from "pg-promise";
//import 'dotenv/config'

dotenv.config();

// Instantiate pg-promise
let pgp = pgPromise();

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
let myPort = 3000;
// if we have a DB URL and the env is not local use SSL
if (process.env.DATABASE_HOST && !local) {
    useSSL = true;
    myPort = process.env.DATABASE_PORT;
}

// Connection object for pg-promise
const connection = {
    host:process.env.DATABASE_HOST,
    port:5432,
    database:process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: true,

}
// which db connection to use
const connectionString= process.env.CONNECTION_STRING;

// Instaniate Database
//const database = pgp(connection);
const database = pgp(connectionString);

// Open the connection to the database
//database.connect();

export default database ;