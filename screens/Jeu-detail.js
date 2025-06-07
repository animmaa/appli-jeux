import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { images } from "../assets/images";

export default function DetailScreen({ navigation }) {
  const route = useRoute();
  const { jeu } = route.params;

  const [players, setPlayers] = useState(["Joueur 1", "Joueur 2", "Joueur 3"]);
  const [scores, setScores] = useState([[null, null, null]]);

  useEffect(() => {
    setPlayers(["Joueur 1", "Joueur 2", "Joueur 3"]);
    setScores([[null, null, null]]);
  }, [jeu.titre]);

  return (
    <ScrollView style={styles.margeBot}>
      <Image style={styles.tinyLogo} source={images[jeu.photo]} />
      <View style={styles.container}>
        <Text style={styles.h1}>{jeu.titre}</Text>
      </View>
      <View>
        <Text style={styles.text}>
          installation du jeu:{"\n"}
          {"\n"}
          {jeu.miseEnPlace}
        </Text>
      </View>
      <View>
        <Text style={styles.text}>
          Résumé des règles:{"\n"}
          {"\n"}
          {jeu.resume}
        </Text>
      </View>
      <View>
        <Button
          title="Ouvrir la fiche de score"
          onPress={() =>
            navigation.navigate("ScoreScreen", {
              initialPlayers: players,
              initialScores: scores,
              jeu: jeu,
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  margeBot: {
    marginBottom: "15%",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
  },
  tinyLogo: {
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
