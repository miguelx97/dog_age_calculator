export interface DogBreed {
    id: number;
    name: string;
    size: Size;
}

export enum Size {
    Giant = "giant",
    Large = "large",
    Medium = "medium",
    Small = "small",
}