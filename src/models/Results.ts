import dayjs, { Dayjs, } from "dayjs";
import { getDogBreeds, getDogSizeAge } from "../utils/resources";
import { DogBreed, Size } from "./DogBreed";
import { DogSizeAge } from "./DogSizeAge";

export class Results {
    private _dogAge: Date;
    private _humanAge: Date;
    private _humanBirthday: Date;

    calculate(dogBirth: Date, dogBreedId: number): void {
        this.setDogAge(dogBirth);
        this.setHumanAge(dogBreedId);
    }

    private setDogAge(dogBirth: Date): void {
        const currentDate: Dayjs = dayjs()
        const dogBirthDate: Dayjs = dayjs(dogBirth);
        const dogAgeMs: number = currentDate.diff(dogBirthDate, 'milliseconds');
        this._dogAge = new Date(dogAgeMs);
    }

    private setHumanAge(dogBreedId: number) {
        const dogBreeds: DogBreed[] = getDogBreeds();
        const dogsSizesByAge: Map<Size, DogSizeAge> = getDogSizeAge();

        const dogBreed = dogBreeds.find((breed) => breed.id === dogBreedId);
        const dogSizeAge = dogsSizesByAge.get(dogBreed.size ?? Size.Medium);

        const dogAge: Dayjs = dayjs(this._dogAge);
        let totalMs: number = 0;

        if ((dayjs()).diff(dogAge, 'year') < 1) {
            totalMs = dogAge.unix() * dogSizeAge.firstYear;
        } else if ((dayjs()).diff(dogAge, 'year') < 2) {
            const dogYearsSubstractFirstYear = dogAge.diff(dayjs(), 'year') - 1;
            totalMs = dogAge.unix() * dogSizeAge.firstYear + dogYearsSubstractFirstYear * dogSizeAge.secondYear;
        } else {
            const dogYearsSubstractFirstYear = dogAge.diff(dayjs(), 'year') - 1;
            const dogYearsSubstractSecondYear = dogAge.diff(dayjs(), 'year') - 2;
            totalMs = dogAge.unix() * dogSizeAge.firstYear + dogYearsSubstractFirstYear * dogSizeAge.secondYear + dogYearsSubstractSecondYear * dogSizeAge.annual;
        }
        let humanAge: Dayjs = dayjs(totalMs);

        // Multiply the factor by the dog's age
        this._humanAge = new Date(humanAge.unix() * 1000);
    }

    get dogAge(): Date {
        return this._dogAge;
    }

    set dogAge(value: Date) {
        this._dogAge = value;
    }

    get humanAge(): Date {
        return this._humanAge;
    }
}