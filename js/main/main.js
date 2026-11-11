import { getDATA, deleteData, updateData, createData } from "./api.js";
import { renderReview } from "./renderReviews.js";
import { getGrade, renderGrade } from "./grade.js";

const reviewsContainer = document.querySelector("#reviewsContainer");

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
    renderReview(reviewList.reverse());
    
    } catch(error) {
        console.log(error);
        reviewsContainer.textContent = "Ошибка при получении данных";
    }
    
}

start();
    
