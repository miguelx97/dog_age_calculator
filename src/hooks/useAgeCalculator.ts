import { useState } from "react";
import { Results } from "../models/Results";
import { DogData } from "../models/DogData";

export const useAgeCalculator = (): {
    results: Results | undefined;
    calculate: (dog: DogData) => void;
} => {
    const [results, setResults] = useState<Results | undefined>(undefined);

    const calculate = ({ breedId, birthDate }) => {
        console.log("🚀 ~ calculateHumanAge ~ { breedId, birthDate }:", { breedId, birthDate })
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