import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DogForm } from "../components/DogForm";
import logo from "../../assets/images/logo_perrete.png";

export default function Home() {
  return (
    <View>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineLarge">Dog Age Calculator</Text>
        <View style={styles.form}>
          <DogForm />
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
});
