import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { getDogSizeAge, getMapDogBreeds } from "../services/resources";
import { DogBreed, Size } from "./DogBreed";
import { DogSizeAge } from "./DogSizeAge";
import { localeDateOptions } from "../utils/utils";

dayjs.extend(duration);

export class Results {
    private _dogAgeMs: number; // dog age in milliseconds
    private _humanAgeMs: number; // human age in milliseconds
    private _dogBirth: Date;
    private _humanBirth: Date;

    calculate(dogBirth: Date, dogBreedId: number): void {
        this._dogBirth = dogBirth;
        this._dogAgeMs = this.calculateDogAge(dogBirth);
        this._humanAgeMs = this.calculateHumanAge(dogBreedId);
        this._humanBirth = this.calculateHumanBirth();
    }

    private calculateDogAge(dogBirth: Date): number {
        const currentDate = dayjs();
        const dogBirthDate = dayjs(dogBirth);
        return currentDate.diff(dogBirthDate, "milliseconds");
    }

    private calculateHumanAge(dogBreedId: number): number {
        const dogBreeds: Map<number, DogBreed> = getMapDogBreeds();
        const dogsSizesByAge: Map<Size, DogSizeAge> = getDogSizeAge();

        const dogBreed = dogBreeds.get(dogBreedId);
        if (!dogBreed) {
            throw new Error("Invalid dog breed ID");
        }

        const dogSizeAge = dogsSizesByAge.get(dogBreed.size ?? Size.Medium);
        if (!dogSizeAge) {
            throw new Error("Invalid size to age mapping");
        }

        const dogAgeYears = this._dogAgeMs / (1000 * 60 * 60 * 24 * 365.25);
        let humanAgeYears = 0;

        if (dogAgeYears <= 1) {
            humanAgeYears = dogAgeYears * dogSizeAge.firstYear;
        } else if (dogAgeYears <= 2) {
            humanAgeYears =
                dogSizeAge.firstYear +
                (dogAgeYears - 1) * dogSizeAge.secondYear;
        } else {
            humanAgeYears =
                dogSizeAge.firstYear +
                dogSizeAge.secondYear +
                (dogAgeYears - 2) * dogSizeAge.annual;
        }

        return humanAgeYears * 1000 * 60 * 60 * 24 * 365.25;
    }

    calculateHumanBirth(): Date {
        const currentDate = dayjs();
        const humanBirthDate = currentDate.subtract(this._humanAgeMs, "milliseconds");
        return humanBirthDate.toDate();
    }

    get dogAge(): Duration {
        return new Duration(this._dogAgeMs);
    }

    get humanAge(): Duration {
        return new Duration(this._humanAgeMs);
    }

    get dogBirthFormated(): String {
        return this._dogBirth.toLocaleDateString(localeDateOptions.lang, localeDateOptions.long);
    }

    get humanBirthFormated(): String {
        return this._humanBirth.toLocaleDateString();
    }
}

class Duration {
    days: number;
    months: number;
    years: number;

    constructor(ms: number) {
        const duration = dayjs.duration(ms);
        this.days = duration.days();
        this.months = duration.months();
        this.years = duration.years();
    }

    toString(): string {
        return `${this.years} years, ${this.months} months, and ${this.days} days`;
    }
}
