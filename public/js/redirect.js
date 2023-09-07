// Get messages DOM Elements
let helloMsg = document.querySelector('.helloMessage');
let errMessage = document.querySelector('.errMessage');

// Get modal DOM Elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const proceedBtn = document.querySelector('.btnProceed');

// Event listener to the open modal when the reset Count button is clicked
openModalBtn.addEventListener("click", openModal);

// Event listener for the proceed button on the modal
proceedBtn.addEventListener("click", clearCount);

// Event Listener to close the modal when the close button or overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//Event Listener to close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
     closeModal();
   }
 });

 // Open modal function
 function openModal(){
    // removes the hidden class to show the modal and overlay
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
 }
 
 // Close modal function
 function closeModal(){
    // adds the hidden class to show the modal and overlay
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
 }
 
 // show an alert before resetting the app.
 function clearCount(){
   closeModal();
    
   if (modal.classList.contains("hidden")) {
      window.location.href='/reset';
   }
 }

// if helloMsg is visible clear the message after 3 seconds 
if(helloMsg){
   setTimeout(() => {
      helloMsg.innerHTML = ""; 
   }, 3000);
}

// if errMessage is visible clear the message after 3 seconds 
if(errMessage){
   setTimeout(() => {
      errMessage.innerHTML = ""; 
   }, 3000);
}

//


