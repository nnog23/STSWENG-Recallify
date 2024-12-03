function updateCardReviewSM2(card, rating) {
  let { easeFactor, repetitionCount, intervalDays, nextReviewDate } = card;

  // Ensure rating is either 0 (fail) or 1 (pass)
  if (rating !== 0 && rating !== 1) {
    throw new Error("Rating must be 0 (fail) or 1 (pass).");
  }

  // If the user passes the card (rating 1), increase the repetition count
  if (rating === 1) {
    repetitionCount++;
  } else {
    repetitionCount = 0; // Reset repetition count if the user fails
  }

  if (rating === 0) {
    easeFactor -= 0.2; // Decrease ease factor if the user fails
  } 

  // If the user has passed three times in a row (every 3rd repetition), increase the ease factor by 0.2 but don't exceed 2.5
  if (repetitionCount % 3 === 0 && repetitionCount !== 0) {
    easeFactor += 0.2; // Increase ease factor by 0.2 for three consecutive passes
  }

  // Ensure ease factor doesn't exceed 2.5
  if (easeFactor > 2.5) easeFactor = 2.5;

  // Ensure ease factor doesn't drop below 1.3
  if (easeFactor < 1.3) easeFactor = 1.3;

  // If the user passes the card, we calculate the interval days for the next review
  if (repetitionCount === 1) {
    intervalDays = 1; // First repetition, review in 1 day
  } else if (repetitionCount === 2) {
    intervalDays = 6; // Second repetition, review in 6 days
  } else if (repetitionCount > 2) {
    intervalDays = Math.round(intervalDays * easeFactor); // For subsequent repetitions, adjust interval by ease factor
  }

  // Calculate the next review date based on the interval days
  const today = new Date();
  nextReviewDate = new Date(today.setDate(today.getDate() + intervalDays));

  // Return the updated card object with the new values
  return {
    easeFactor,
    repetitionCount,
    intervalDays,
    nextReviewDate,
  };
}

module.exports = updateCardReviewSM2;
