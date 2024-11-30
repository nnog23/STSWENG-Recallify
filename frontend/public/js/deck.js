// FRONT-END JS For Adding cards
const submitBtn = document.querySelector("#addDeck");
const confirmeditBtn = document.querySelector('#confirmeditDeck');
const addCardForm = document.querySelector('#addDeckForm');
const editCardForm = document.forms.editDeckForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    // Select the form fields directly from the form object
    const title = addDeckForm?.title.value.trim();
    const description = addDeckForm?.description.value.trim();

    if (!title || !description) {
        alert("Both fields must be filled out.");
        return;
    }

    console.log(title, description);  // Check if values are correctly logged

    // Create an object with the form data to send as JSON
    const formObject = {
        title: title,
        description: description,
    };

    try {
        const response = await fetch("http://localhost:8000/decks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),  // Send the form data as JSON
        });

        const data = await response.json();  // Parse the JSON response

        if (response.status === 201) {
            alert("Card added successfully!");
            location.reload();  // Reload the page to reflect changes
        } else {
            console.log("Status code received: " + response.status);
            alert("Failed to add card: " + (data.error || data.details));
        }
        
    } catch (err) {
        console.error(err);
        alert("An error occurred while adding the card.");
    }
});

confirmeditBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(editCardForm);
    console.log('submit');

    const url = window.location.pathname;
    const parts = url.split('/');
    const cardid = parts[parts.length - 1]; // assuming the id is at the end of the URL

    try {
        const response = await fetch("/card/" + cardid, {
            method: 'PUT',
            body: formData,
        });
        
        console.log(response);
        window.location.href = '/admin/news';  
        if (response.status === 200) {
            window.location.href = '/';   // maybe change to deckid next time?
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});