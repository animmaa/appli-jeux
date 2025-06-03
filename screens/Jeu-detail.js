import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { images } from "../assets/images";

export default function DetailScreen() {
  const route = useRoute();
  const { jeu } = route.params;

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  }
});
