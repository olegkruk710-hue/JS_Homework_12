const reviewsContainer = document.querySelector("#reviewsContainer");

export function createReview(element) {
    const stars = "★".repeat(element.rating) + "☆".repeat(5 - element.rating);
    return `
        <p id="autorName" class="review-author">${element.name}</p>
        <p id="reviewsText" class="review-text">${element.text}</p>
        <div class="review-footer">
        <p id="rating" class="review-rating">Рейтинг: <span class="stars">${stars}</span></p>
        <button id="deleteReview" class="delete-review">Удалить</button>
        </div>
        ` 
}
export function createReviews(reviewsList) {
    reviewsList.forEach(function(review) {
        const temp = document.createElement("div");
        temp.className = "review-block";
        temp.id = review.id;
        reviewsContainer.append(temp)
        temp.innerHTML = createReview(review);
    })
}

export function renderReview(reviewsList) {
    if (reviewsList.length === 0) {
        
        reviewsContainer.textContent = "Отзывов пока нет!";
        return;
    }

    createReviews(reviewsList);
}

export function renderSelectingReview(reviewsList) {
    reviewsContainer.innerHTML = '';

    if (reviewsList.length === 0) {
        reviewsContainer.textContent = "Отзывы не найдены!";
        return;
    }

    createReviews(reviewsList);
}

