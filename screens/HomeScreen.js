import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';
import liste from '../liste-jeux.json'

export default function HomeScreen({navigation}) {
    const listeTriee = [...liste].sort((a, b) => a.titre.localeCompare(b.titre));
  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.h1} >Liste des jeux de sociétés</Text>
    {listeTriee.map((jeu, index) => (
        <View key={index} style={styles.liste}>
        <Button onPress={() => navigation.navigate('Detail', {jeu: jeu})} title={jeu.titre}/>
      </View>
    ))}
      <StatusBar style="auto" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  liste: {
    marginBottom: 10,
  }
});
