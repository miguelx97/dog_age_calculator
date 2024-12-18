import { LogicProps } from "react-native-paper-form-builder/dist/Types/Types";
import dogBreeds from "../../assets/data/dog_breed_size.json";
import { useEffect } from "react";

function getBreedFromJson() {
  const breeds = Object.keys(dogBreeds);
  breeds.sort();
  breeds.push("Another breed");

  return breeds.map((breed) => {
    return {
      value: breed,
      label: breed,
    };
  });
}

export const DogFormFields: (
  | Omit<LogicProps, "control">
  | Omit<LogicProps, "control">[]
)[] = [
  // {
  //   type: "text",
  //   name: "years",
  //   defaultValue: "",
  //   rules: {
  //     required: {
  //       value: true,
  //       message: "Years is required",
  //     },
  //   },
  //   textInputProps: {
  //     label: "Years",
  //     keyboardType: "numeric",
  //   },
  // },
  // {
  //   type: "text",
  //   name: "weight",
  //   defaultValue: "",
  //   textInputProps: {
  //     label: "Weight",
  //     keyboardType: "numeric",
  //   },
  // },
  {
    name: "breed",
    type: "autocomplete",
    defaultValue: "",
    textInputProps: {
      label: "Breed",
    },
    options: getBreedFromJson(),
  },
];
