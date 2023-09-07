import queries from "../services/greet-service.js";
import database from "./database.js"            // Import database connection - routes

let query = queries(database);

export default function greetUsers() {
    let greetedUserName = "";
    let greetLanguage = "";
    let errorMessage = "";
    
    function resetVariables(){
        greetedUserName = "";
        greetLanguage = "";
        errorMessage = "";
    }

    function checkInputs(userName,language){
        const regExVal = /^[A-Za-z|\s|-]+$/;
        
        if(userName.length === 0 && language == undefined){
            setErrorMessage("Please enter a name and select a language");
        }        
        else if(userName.length === 0){
            setErrorMessage("Please enter a name");
        }
        else if(regExVal.test(userName)===false){
            setErrorMessage("Please enter a valid name");
        }
        else if(language == undefined){
            setErrorMessage("Please select a language");
        }
        else{
            setErrorMessage("");
        }
        return errorMessage;
    }

    function setErrorMessage(message){
        errorMessage = message;
    }
    
    function setUserName(userName) {
        greetedUserName =  titleCase(userName) ;
    }

    function getUserName() {
        return greetedUserName;
    }

    function titleCase(str) {
        //keep track of the original string passed
        const originalStr = str;
        const regexHyphen = /-/
        str = str.toLowerCase().split(/\s|-/);

        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }

        if(regexHyphen.test(originalStr)=== true){
           str = str.join('-')
        }
        else{
            str = str.join(' ');
        }

        return str;
      } 

    function setLanguage(language) {
        greetLanguage = language;
    }

    function getLanguage() {
        return greetLanguage;
    }

    function getLanguagesGreet() {
        if (getLanguage() == "English") {
            return "Hello";
        }
        if (getLanguage() == "Afrikaans") {
            return "Hallo";
        }
        if (getLanguage() == "isiXhosa") {
            return "Molo";
        }
    }

    function getUserGreeting() {
        return getLanguagesGreet() + ", " + greetedUserName;
    }

    function checkValidName(userName) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(userName);
    }

    async function homePage() {
        let greetedUsersData = await query.all();
        let userGreeting = false;
        let userCount = greetedUsersData.length;
        let userError = "";

        if (getUserGreeting().includes("Hello") || getUserGreeting().includes("Hallo") || getUserGreeting().includes("Molo")) {
            userGreeting = getUserGreeting();
        }

        if(errorMessage.length > 0){
            userError = errorMessage;
        }

        return {
            userError,
            userGreeting,
            userCount
        };
    }

    async function addUser(language, username, req) {        
        checkInputs(username,language);
        switch(errorMessage){
            case "Please enter a name and select a language":
            case "Please enter a name":
            case "Please enter a valid name":
            case "Please select a language":
            break;
            case "":
                setUserName(username);
                setLanguage(language);
                let userExists = await query.getUserCount(getUserName());

                if(userExists.count>0){
                    await query.updateUser(getUserName());
                }
                else{
                    await query.addUser(getUserName());
                }
                
                break;
            default:
                
        }
    }

    async function greetedUsers() {
        let greetedUsers = await query.getGreeted();
        
        return greetedUsers;
    }

    async function userCounter(username) {
        const userCount = await query.getUserData(username);
        return userCount;
    }

    async function resetData() {
        await query.resetData();
    }

    return {
        setUserName,
        getUserName,
        getLanguage,
        getUserGreeting,
        getLanguagesGreet,
        setLanguage,        
        checkValidName,
        resetVariables,

        homePage,
        addUser,
        greetedUsers,
        userCounter,
        resetData,
    };
}