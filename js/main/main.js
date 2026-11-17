import { getDATA, deleteData, updateData, createData } from "./api.js";
import { renderReview, renderSelectingReview } from "./renderReviews.js";
import { getGrade, renderGrade } from "./grade.js";
import { filterReviews } from "./filter.js";
import { showQuantity } from "./showQuantity.js";

const reviewsContainer = document.querySelector("#reviewsContainer");
const filterControls = document.querySelector("#filterControls");
const ratingFilter = document.querySelector("#ratingFilter");
const searchInput = document.querySelector("#searchInput");
const showReviewQuantity = document.querySelector("#showReviewQuantity");

let reviewList;

async function start() {
    reviewsContainer.innerHTML = `<p style="text-align: center; font-size: 24px;">Загрузка...</p>`
    // reviewsContainer.textContent = "Загрузка...";
    try{
    let data = await getDATA("reviews");
    reviewsContainer.innerHTML = ``
    reviewList = data;
    renderGrade(getGrade(reviewList));

    // reviewsContainer.textContent = "";
    renderReview(reviewList.toReversed());

    showReviewQuantity.textContent = `Показано: ${showQuantity(reviewList)} из ${showQuantity(reviewList)}`;
    
    } catch(error) {
        console.log(error);
        reviewsContainer.textContent = "Ошибка при получении данных";
    }
    
}

function applyFilters() {
    let gradeValue = ratingFilter.value;
    let search = searchInput.value;

    if (gradeValue !== "all") {
        gradeValue = Number(gradeValue);
    }

    const filteredReviews = filterReviews(
        reviewList.toReversed(),
        gradeValue,
        search
    );

    showReviewQuantity.textContent = `Показано: ${showQuantity(filteredReviews)} из ${showQuantity(reviewList)}`;

    renderSelectingReview(filteredReviews);
}

start();

reviewsContainer.addEventListener("click", async function(event) {
    let button_id;
    if (event.target.tagName !== "BUTTON") return;
    
        button_id = event.target.parentElement.parentElement.id; 
    
        try {
        await deleteData("reviews", button_id);
        reviewList = reviewList.filter(review=>review.id !== button_id);
        for (let item of reviewsContainer.children) {
        if (item.id === button_id) {
            reviewsContainer.removeChild(item);
            break;
        }
        
       }
       showReviewQuantity.textContent = `Показано: ${showQuantity(reviewList)} из ${showQuantity(reviewList)}`;
       renderGrade(getGrade(reviewList));
    } catch(error) {
        console.log(error.message);
    }
});



filterControls.addEventListener("change", applyFilters);
filterControls.addEventListener("input", applyFilters);
filterControls.addEventListener("click", event=>{
    const button_id = event.target.id;
    if (button_id !== "resetFilter") return;
    ratingFilter.value = "all";
    searchInput.value = "";
    renderSelectingReview(reviewList.toReversed());
    showReviewQuantity.textContent = `Показано: ${showQuantity(reviewList)} из ${showQuantity(reviewList)}`
});

