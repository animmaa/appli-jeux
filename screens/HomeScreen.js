import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View, Image } from "react-native";
import * as Speech from "expo-speech";
import liste from "../liste-jeux.json";
import { images } from "../assets/images";

export default function HomeScreen({ navigation }) {
  const speak = () => {
    const thingToSay = "bonjour, il fait beau aujourd'hui";
    Speech.speak(thingToSay, {
      language: "fr-FR",
      voice: "fr-fr-x-frd-network",
      pitch: 1.2,
      rate: 1.0,
    });
  };

  const listeTriee = [...liste].sort((a, b) => a.titre.localeCompare(b.titre));
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.h1}>Liste des jeux de sociétés</Text>
        {listeTriee.map((jeu, index) => (
          <View key={index} style={styles.liste}>
            <Image style={styles.tinyLogo} source={images[jeu.photo]} />
            <Button
              onPress={() => navigation.navigate("Detail", { jeu: jeu })}
              title={jeu.titre}
            />
          </View>
        ))}
        <StatusBar style="auto" />
      </View>
      <View style={styles.container}>
        <Button title="Press to hear some words" onPress={speak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  liste: {
    marginBottom: 10,
    flexDirection: "row",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
