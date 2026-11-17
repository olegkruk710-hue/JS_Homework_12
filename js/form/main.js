import { createData } from "../main/api.js";

const nameInput = document.querySelector("#nameInput");
const contenText =  document.querySelector("#contenText");
const raitingSelect = document.querySelector("#raitingSelect");
const form = document.querySelector("form");
const body = document.querySelector("body");

function createReview() {
    let review = {
        name: nameInput.value.trim(),
        text: contenText.value.trim(),
        rating: ratingValue ?? 0
    }

    return review;
}

let ratingValue;

raitingSelect.addEventListener("change", (e) => {
    ratingValue = Number(e.target.value);
});

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    let data = createReview();
    if (!data.name || !data.text) {
        return;
    }

    if (e.submitter.tagName === "BUTTON") {
        try {
            await createData("reviews", data);
            body.innerHTML = `<h3 class="thanks">Спасибо за отзыв!</h3>`;
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 3000);
            
        } catch(error) {
            console.log(error.message);
        }
    }
})





