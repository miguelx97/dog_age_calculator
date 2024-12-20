import dogBreedsJson from "../../assets/data/dog_breed_size.json";
import dogSizeAgeJson from "../../assets/data/dog_size_age.json";
import { DogBreed, Size } from "../models/DogBreed";
import { DogSizeAge } from "../models/DogSizeAge";

const dogBreeds: DogBreed[] = dogBreedsJson.map(breed => ({
    ...breed,
    size: breed.size as Size,
})).sort((a, b) => a.name.localeCompare(b.name));
dogBreeds.unshift({ id: 99, name: "Another Breed", size: Size.Medium });

const dogSizeAge: Map<Size, DogSizeAge> = new Map<Size, DogSizeAge>(
    Object.entries(dogSizeAgeJson).map(([key, value]) => [key as Size, value])
);

function getDogBreeds(): DogBreed[] {
    const dogBreedsAux: DogBreed[] = Object.assign([], dogBreeds);
    return dogBreedsAux;
}
function getMapDogBreeds(): Map<number, DogBreed> {
    return new Map(dogBreeds.map(breed => [breed.id, breed]));
}

function getDogSizeAge(): Map<Size, DogSizeAge> {
    return new Map(dogSizeAge);
}

export { getDogBreeds, getMapDogBreeds, getDogSizeAge };