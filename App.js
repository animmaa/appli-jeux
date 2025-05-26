import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import liste from './liste-jeux.json'

export default function App() {
  const onPress = () => {
    console.log("ok")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h1} >Liste des jeux de sociétés</Text>
    {liste.map((jeu, index) => (
      <View>
        <Button onPress={onPress} key={index} title={jeu.titre}/>
      </View>
    ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
