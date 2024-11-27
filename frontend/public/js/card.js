// FRONT-END JS For Adding cards
const submitBtn = document.querySelector("#addCard");
const confirmeditBtn = document.querySelector('#confirmeditCard');
const addCardForm = document.forms.addCardForm;
const editCardForm = document.forms.editCardForm;

submitBtn?.addEventListener("click", async (e) => {

    e.preventDefault();
    const formData = new FormData(addCardForm);


    try {
        const response = await fetch("/cards", {

            method: 'POST',
            body: formData

        });
        
        console.log(response);
        if (response.status === 200) {
            // Check for redirect
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                location.reload();
            }
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
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