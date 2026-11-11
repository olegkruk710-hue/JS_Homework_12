export function createReview(element) {
    const stars = "★".repeat(element.rating) + "☆".repeat(5 - element.rating);
    return `
        <p id="autorName" class="review-author">${element.name}</p>
        <p id="reviewsText" class="review-text">${element.text}</p>
        <p id="rating" class="review-rating">Рейтинг: <span class="stars">${stars}</span></p>
        ` 
}

export function renderReview(reviewsList) {
    const reviewsContainer = document.querySelector("#reviewsContainer");
    if (reviewsList.length === 0) {
        reviewsContainer.textContent = "Отзывов пока нет!";
        return;
    }
    
    reviewsList.forEach(function(review) {
        const temp = document.createElement("div");
        temp.className = "review-block";
        temp.id = review.id;
        reviewsContainer.append(temp)
        temp.innerHTML = createReview(review);
    })
}

