import React, { useEffect, useState } from "react";
import { PaperSelect } from "react-native-paper-select";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { Button, TextInput, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { DogData } from "../models/DogData";
import { getDogBreeds } from "../utils/resources";
import { DogBreed } from "../models/DogBreed";
import { Preferences } from "../services/preferences";

export function DogForm({
  calculateAge,
}: {
  calculateAge: (dog: DogData) => void;
}) {
  function getBreedFromJson(): ListItem[] {
    const dogBreeds: DogBreed[] = getDogBreeds();

    return dogBreeds.map((breed) => {
      return {
        _id: String(breed.id),
        value: breed.name,
      };
    });
  }

  useEffect(() => {
    Preferences.get("dog").then((dogPreferences) => {
      console.log("🚀 ~ useEffect ~ dogPreferences:", dogPreferences);

      if (dogPreferences) {
        const dog: DogData = {
          breedId: dogPreferences?.breedId,
          birthDate: dogPreferences?.birthDate
            ? new Date(dogPreferences?.birthDate)
            : null,
        };
        console.log("🚀 ~ useEffect ~ dog:", dog);
        const breed: DogBreed = getDogBreeds().find(
          (breed) => breed.id === dog.breedId
        );
        setBreed({
          value: breed?.name || "",
          list: getBreedFromJson(),
          selectedList: breed ? [breed] : [],
        });
        setBirth({
          date: dog.birthDate,
          open: false,
        });
        calculateAge(dog);
      }
    });
  }, []);

  const [breed, setBreed] = useState({
    value: "",
    list: getBreedFromJson(),
    selectedList: [],
  });

  // Initialize birth state with proper default values
  const [birth, setBirth] = useState<{
    date: Date | null;
    open: boolean;
  }>({
    date: null,
    open: false,
  });

  // Correct the setOpen function to directly update the `open` property
  const setOpen = (isOpen: boolean): void =>
    setBirth((prevBirth) => ({ ...prevBirth, open: isOpen }));

  const onDismissSingle = React.useCallback(() => setOpen(false), []);

  const onConfirmSingle = (params: any) => {
    calculateAge({
      breedId: Number(breed?.selectedList[0]?._id),
      birthDate: params.date,
    });
    setBirth({ date: params.date, open: false }); // Update both date and open
  };

  // Breed selection handler
  const onSelect = (value: any) => {
    calculateAge({
      breedId: Number(value.selectedList[0]?._id),
      birthDate: birth.date,
    });
    setBreed({
      ...breed,
      value: value.text,
      selectedList: value.selectedList,
    });
  };

  return (
    <>
      <PaperSelect
        label="Select Breed"
        value={breed.value}
        textInputProps={{
          left: <TextInput.Icon icon="dog-side" />,
        }}
        onSelection={onSelect}
        arrayList={[...breed.list]}
        selectedArrayList={breed.selectedList}
        multiEnable={false}
      />
      <TextInput
        label="Birth Date"
        left={<TextInput.Icon icon="calendar" />}
        value={birth.date ? birth.date.toLocaleDateString() : ""}
        onFocus={() => setOpen(true)} // Open the date picker
      />

      <DatePickerModal
        locale="en"
        label="Select birth date"
        mode="single"
        visible={birth.open}
        onDismiss={onDismissSingle}
        date={birth.date}
        inputFormat="MM/DD/YYYY"
        onConfirm={onConfirmSingle}
      />
    </>
  );
}
