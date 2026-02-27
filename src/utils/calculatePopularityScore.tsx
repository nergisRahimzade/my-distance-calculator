import type { Activity } from "../assets/types/Activity";

export function calculatePopularityScore(activity: Activity): number {
  const rating = parseFloat(activity.rating || '0');
  const price = parseFloat(activity.price?.amount || '0');
  
  // Popularity formula:
  // High rating + reasonable price = likely popular
  let score = rating * 10; // Rating worth 0-50 points
  
  // Price bonus (famous tours are usually €30-€150)
  if (price >= 30 && price <= 150) {
    score += 20; // Sweet spot for popular tours
  } else if (price > 150 && price <= 300) {
    score += 10; // Premium experiences
  } else if (price > 0 && price < 30) {
    score += 5; // Budget activities
  }
  
  // Bonus: Has booking link (bookable = popular)
  if (activity.bookingLink) {
    score += 10;
  }
  
  // Bonus: Has images (professional listings)
  if (activity.pictures && activity.pictures.length > 0) {
    score += 5;
  }
  
  return score;
}