import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import liste from '../liste-jeux.json';

export default function HomeScreen({ navigation }) {
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [filtreActif, setFiltreActif] = useState(false);

  const listeTriee = [...liste].sort((a, b) => a.titre.localeCompare(b.titre));
   const min = parseInt(minPlayers, 10);
  const max = parseInt(maxPlayers, 10);

  const listeFiltrée = listeTriee.filter((jeu) => {
    if (!filtreActif) return true;

    // Si aucun des champs n'est rempli, afficher tous les jeux
    if (isNaN(min) && isNaN(max)) return true;

    // Si les deux champs sont remplis
    if (!isNaN(min) && !isNaN(max)) {
      return jeu.nbJoueurMinimum <= max && jeu.nbJoueurMaximum >= min;
    }

    // Si seulement min est renseigné
    if (!isNaN(min)) {
      return jeu.nbJoueurMaximum >= min;
    }

    // Si seulement max est renseigné
    if (!isNaN(max)) {
      return jeu.nbJoueurMinimum <= max;
    }

    return true;
      });
console.log(listeFiltrée)
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Nombre de joueurs</Text>

        <TextInput
          placeholder="Nombre minimum"
          keyboardType="numeric"
          value={minPlayers}
          onChangeText={setMinPlayers}
          style={styles.input}
        />

        <TextInput
          placeholder="Nombre maximum"
          keyboardType="numeric"
          value={maxPlayers}
          onChangeText={setMaxPlayers}
          style={styles.input}
        />

        <Button title="Filtrer" onPress={() => setFiltreActif(true)} />
        <Button title="Réinitialiser" onPress={() => {
          setMinPlayers('');
          setMaxPlayers('');
          setFiltreActif(false);
        }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.h1}>Liste des jeux de société</Text>
        {listeFiltrée.map((jeu, index) => (
          <View style={styles.liste} key={index}>
            <Button
              onPress={() => navigation.navigate('Detail', { jeu })}
              title={jeu.titre}
            />
          </View>
        ))}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
