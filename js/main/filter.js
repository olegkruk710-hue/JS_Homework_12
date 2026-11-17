export function filterReviews(reviewsList, grade_value, name="") {
    let filtered;
    filtered = reviewsList.filter(review=> {
        if (grade_value !== "all" && review.rating !== grade_value) {
            return false;
        }

        return review.name.toLowerCase().includes(name.trim().toLowerCase());
    })

    return filtered;
}