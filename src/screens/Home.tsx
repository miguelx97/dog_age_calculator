import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DogForm } from "../components/DogForm";
import logo from "../../assets/images/logo_perrete.png";
import { useAgeCalculator } from "../hooks/useAgeCalculator";
import { DogData } from "../models/DogData";
import { DogResults } from "../components/DogResults";
import { Preferences } from "../services/preferences";

export default function Home() {
  const { results, calculate } = useAgeCalculator();

  async function calculateAge(dog: DogData) {
    calculate(dog);
    Preferences.set("dog", dog);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineLarge">Dog Age Calculator</Text>
        <View style={styles.form}>
          <DogForm calculateAge={calculateAge} />
        </View>
        <DogResults results={results} />
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
