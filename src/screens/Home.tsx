import React, { useContext, useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { DogForm } from "../components/DogForm";
import logo from "../../assets/images/logo_perrete.png";
import { useAgeCalculator } from "../hooks/useAgeCalculator";
import { DogResults } from "../components/DogResults";
import { Preferences } from "../services/preferences";
import { DogDataContext } from "../store/dog-data-context";
import { RestartButton } from "../components/RestartButton";

export default function Home() {
  const { results, calculate } = useAgeCalculator();
  const { dog } = useContext(DogDataContext);

  useEffect(() => {
    calculate(dog);
    if (dog) {
      Preferences.set("dog", dog);
    } else {
      Preferences.remove("dog");
    }
  }, [dog]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineLarge">Dog Age Calculator</Text>
        <View style={styles.form}>
          <DogForm />
        </View>
        {results && (
          <>
            <DogResults results={results} />
            <RestartButton />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    width: "85%",
    maxWidth: 400,
    marginTop: 40,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 40,
  },
});
