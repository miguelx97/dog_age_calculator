import { useState } from "react";
import { Results } from "../models/Results";

export const useAgeCalculator = () => {
    const [humanAge, setHumanAge] = useState<Results | undefined>(undefined);

    const calculateHumanAge = ({ breedId, birthDate }) => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(birthDate).getFullYear();
        const results = new Results();
        results.calculate(birthDate, breedId);
        setHumanAge(results);
    }

    return {
        humanAge,
        calculateHumanAge,
    }
};