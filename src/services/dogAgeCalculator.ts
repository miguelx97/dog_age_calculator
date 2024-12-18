/**
 * Calculates the dog's age in human years.
 * @param breed - The breed of the dog (e.g., "Labrador").
 * @param age - The real age of the dog in years.
 * @param weight - The weight of the dog in kg (optional).
 * @returns The age in human years or an error message if the breed is not found.
 */
const calculateHumanAge = (breed: string, age: number, weight?: number): number | string => {
    // Get size category from breed
    const sizeCategory = breedToSize[breed];

    if (!sizeCategory) {
        return `Breed ${breed} not found. Please ensure the breed is in the list.`;
    }

    const factors = sizeFactors[sizeCategory];

    if (age <= 0) {
        return "Age must be greater than 0.";
    }

    // Calculate human years based on the dog's age
    let humanAge = factors.initial;

    if (age > 1) {
        humanAge += factors.secondYear;
    }

    if (age > 2) {
        humanAge += (age - 2) * factors.annual;
    }

    // Optional adjustment for weight (e.g., refine aging within the size category)
    if (weight) {
        if (weight < 0) {
            return "Weight must be greater than 0.";
        }
        // Example refinement for weight (adjust logic as needed)
        if (sizeCategory === "medium" && weight < 15) {
            humanAge -= 1; // Reduce slightly for lighter medium dogs
        }
    }

    return humanAge;
};