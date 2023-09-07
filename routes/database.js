import pgPromise from "pg-promise";
import dotenv from 'dotenv';

dotenv.config();
// Instantiate pg-promise
let pgp = pgPromise();

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
// if we have a DB URL and the env is not local use SSL
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
const connectionString= process.env.DATABASE_URL+useSSL;
console.log(connectionString);

// Instaniate Database
const database = pgp(connectionString);

// Open the connection to the database
database.connect();

export default database ;