import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DogForm } from "../components/DogForm";
import logo from "../../assets/images/logo_perrete.png";
import { useAgeCalculator } from "../hooks/useAgeCalculator";
import { DogData } from "../models/DogData";

export default function Home() {
  const { humanAge, calculateHumanAge } = useAgeCalculator();
  function calculateAge(dog: DogData) {
    calculateHumanAge(dog);
  }
  return (
    <View>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineLarge">Dog Age Calculator</Text>
        <View style={styles.form}>
          <DogForm calculateAge={calculateAge} />
          <Text variant="bodySmall" style={styles.result}>
            {humanAge
              ? `Your dog is ${humanAge.humanAge.toString()} years old`
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    maxWidth: 400,
    marginTop: 40,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 40,
  },
  result: {
    textAlign: "center",
    marginTop: 20,
  },
});
