import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, List } from "react-native-paper";

export function DogResults({ results }) {
  return (
    <View style={styles.result}>
      <Card>
        <Card.Content>
          <List.Section>
            <List.Subheader style={styles.subheader}>Dog Age</List.Subheader>
            <List.Item title={results.dogAge.toString()} />
          </List.Section>
          <List.Section>
            <List.Subheader style={styles.subheader}>Human Age</List.Subheader>
            <List.Item title={results.humanAge.toString()} />
          </List.Section>
          <List.Section>
            <List.Subheader style={styles.subheader}>
              Dog's Birthday
            </List.Subheader>
            <List.Item title={results.dogBirthFormated} />
          </List.Section>
          {/* <List.Section>
            <List.Subheader style={styles.subheader}>
              Human's Birthday
            </List.Subheader>
            <List.Item title={results.humanBirthFormated} />
          </List.Section> */}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    width: "85%",
    maxWidth: 400,
    marginTop: 40,
    marginBottom: 20,
  },
  subheader: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});
