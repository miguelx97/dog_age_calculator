import React, { useContext, useEffect, useState } from "react";
import { PaperSelect } from "react-native-paper-select";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { getDogBreeds, getMapDogBreeds } from "../services/resources";
import { DogBreed } from "../models/DogBreed";
import { Preferences } from "../services/preferences";
import { DogDataContext } from "../store/dog-data-context";
import { DogData } from "../models/DogData";
import { localeDateOptions } from "../utils/utils";

export function DogForm() {
  function getBreedFromJson(): ListItem[] {
    const dogBreeds: DogBreed[] = getDogBreeds();

    return dogBreeds.map((breed) => {
      return {
        _id: String(breed.id),
        value: breed.name,
      };
    });
  }

  const { setDog, dog } = useContext(DogDataContext);

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

  useEffect(() => {
    Preferences.get("dog").then((dogPreferences) => {
      if (!dogPreferences) return;
      const dog: DogData = {
        breedId: dogPreferences?.breedId,
        birthDate: dogPreferences?.birthDate
          ? new Date(dogPreferences?.birthDate)
          : null,
      };
      console.log("🚀 ~ Preferences.get ~ dog:", dog);

      setBreed({
        ...breed,
        value: getNameDogBreed(dog.breedId),
        selectedList: [
          {
            _id: String(dog.breedId),
            value: getNameDogBreed(dog.breedId),
          },
        ],
      });

      setBirth({
        ...birth,
        date: dog.birthDate,
      });

      setDog(dog);
    });
  }, []);

  // Correct the setOpen function to directly update the `open` property
  const setOpen = (isOpen: boolean): void =>
    setBirth((prevBirth) => ({ ...prevBirth, open: isOpen }));

  const onDismissSingle = React.useCallback(() => setOpen(false), []);

  const onConfirmSingle = (params: any) => {
    setDog({
      breedId: Number(breed?.selectedList[0]?._id),
      birthDate: params.date,
    });
    setBirth({ date: params.date, open: false }); // Update both date and open
  };

  // Breed selection handler
  const onSelect = (value: any) => {
    setDog({
      breedId: Number(value.selectedList[0]?._id),
      birthDate: birth.date,
    });
    setBreed({
      ...breed,
      value: value.text,
      selectedList: value.selectedList,
    });
  };

  const getNameDogBreed = (breedId: number): string =>
    getMapDogBreeds().get(breedId)?.name || "";

  return (
    <>
      <PaperSelect
        label="Select Breed"
        value={getNameDogBreed(dog?.breedId)}
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
        value={
          dog?.birthDate
            ? dog.birthDate.toLocaleDateString(
                localeDateOptions.lang,
                localeDateOptions.short
              )
            : ""
        }
        onFocus={() => setOpen(true)} // Open the date picker
      />

      <DatePickerModal
        locale="es"
        label="Select birth date"
        mode="single"
        visible={birth.open}
        onDismiss={onDismissSingle}
        date={dog?.birthDate ?? new Date()}
        onConfirm={onConfirmSingle}
      />
    </>
  );
}
