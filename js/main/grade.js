export function getGrade(reviewList) {
    if (reviewList.length < 1) {
        return 0;
    }

    const result = reviewList.reduce((sum, review) => sum + review.rating, 0);

    return Math.round((result / reviewList.length)*10) / 10;
}
export function renderGrade(grade) {
    const cafeGrade = document.querySelector("#cafeGrade");
    if (!grade) {
        cafeGrade.innerHTML = "Нет ни одного отзыва!";
        return;
    }

    cafeGrade.innerHTML = `Средняя оценка: ${grade}`;
}