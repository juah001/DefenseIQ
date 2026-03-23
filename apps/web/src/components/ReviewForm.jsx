import { trackEvent } from "../utils/analytics";

const API = process.env.NEXT_PUBLIC_API_URL;

async function handleSubmit() {
  try {
    const response = await submitReviewForm();

    await trackEvent("review_created", currentUser.id, {
      reviewId: response.id,
      rating: response.rating
    });
  } catch (error) {
    console.error(error);
  }
}