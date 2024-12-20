import { useState } from "react";
import { Results } from "../models/Results";
import { DogData } from "../models/DogData";

export const useAgeCalculator = (): {
    results: Results | undefined;
    calculate: (dog: DogData) => void;
} => {
    const [results, setResults] = useState<Results | undefined>(undefined);

    const calculate = (dog: DogData) => {
        if (!dog) return setResults(undefined);
        const { birthDate, breedId } = dog;
        if (!birthDate || !breedId) {
            return;
        }
        const results = new Results();
        results.calculate(birthDate, breedId);
        setResults(results);
    }

    return {
        results,
        calculate,
    }
};