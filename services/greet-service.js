export default function queries(database){

    // Get all records from the users table
    async function all() {
        let userData = await database.any("SELECT * from users");
        return userData;
    }

    // Add a user record to the users table
    async function addUser(userName) {
        let results = await database.none("INSERT INTO users (name, count) VALUES ($1, 1);",[userName]); // ON CONFLICT (name) DO UPDATE SET count = users.count + 1
                                          
        return results;
    }

    // Update a user records in the users table
    async function updateUser(userName){
        let results = await database.oneOrNone("Update users SET count = count + 1 WHERE name = $1;",[userName]);

        return results;
    }

    // Get all records from the users table
    async function getGreeted() {
        let results = await database.manyOrNone("SELECT * FROM users");
        
        return results;
    }
    
    // Get a count for the given user
    async function getUserCount(username) {
        let results = await database.oneOrNone("SELECT COUNT(name) FROM users WHERE name = $1", [username]);
        return results;
    }
    
    // Get all records for a given user
    async function getUserData(username) {
        let results = await database.oneOrNone("SELECT * FROM users WHERE name = $1", [username]);
        return results;
    }

    // Clears the table of all data and resets the index
    async function resetData(){
        let results = await database.none("TRUNCATE TABLE users RESTART IDENTITY;");
        
        return results;
    }

    return {
        all,
        addUser,
        updateUser,
        getUserCount,
        getGreeted,
        getUserData,
        resetData,
    };
};