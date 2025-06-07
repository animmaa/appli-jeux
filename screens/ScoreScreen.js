import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { useRoute } from "@react-navigation/native";

export default function ScoreScreen() {
  const route = useRoute();
  const { jeu } = route.params;

  const [players, setPlayers] = useState(["Joueur 1", "Joueur 2", "Joueur 3"]);
  const [scores, setScores] = useState([[null, null, null]]);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Réinitialise la grille si on change de jeu
  useEffect(() => {
    setPlayers(["Joueur 1", "Joueur 2", "Joueur 3"]);
    setScores([[null, null, null]]);
  }, [jeu?.titre]);

  // Ajoute une nouvelle ligne dès qu'une valeur est entrée dans la dernière
  useEffect(() => {
    const lastRow = scores[scores.length - 1];
    const hasScore = lastRow.some((val) => val !== null && val !== "");
    if (hasScore) {
      setScores((prev) => [...prev, Array(players.length).fill(null)]);
    }
  }, [scores]);

  const handleScoreChange = (text, rowIndex, colIndex) => {
    const value = text === "" ? null : parseInt(text, 10);
    const updated = [...scores];
    updated[rowIndex][colIndex] = isNaN(value) ? null : value;
    setScores(updated);
  };

  const getTotalScores = () =>
    players.map((_, col) =>
      scores.reduce((sum, row) => sum + (row[col] || 0), 0)
    );

  const addPlayer = () => {
    const newName = `Joueur ${players.length + 1}`;
    setPlayers((prev) => [...prev, newName]);
    setScores((prev) => prev.map((row) => [...row, null]));
  };

  const resetGrid = () => {
    setPlayers(["Joueur 1", "Joueur 2", "Joueur 3"]);
    setScores([[null, null, null]]);
  };

  const resetScore = () => {
  setScores([Array(players.length).fill(null)]);
};

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView horizontal>
        <View
          style={[styles.gridContainer, isLandscape && styles.landscapeLayout]}
        >
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Tour</Text>
            </View>
            {players.map((name, index) => (
              <View key={index} style={styles.cell}>
                <TextInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={(text) => {
                    const updated = [...players];
                    updated[index] = text;
                    setPlayers(updated);
                  }}
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addPlayerButton}
              onPress={addPlayer}
            >
              <Text style={styles.addPlayerText}>➕</Text>
            </TouchableOpacity>
          </View>

          {scores.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.headerText}>{`Tour ${rowIndex + 1}`}</Text>
              </View>
              {row.map((score, colIndex) => (
                <View key={colIndex} style={styles.cell}>
                  <TextInput
                    keyboardType="numeric"
                    value={score !== null ? score.toString() : ""}
                    onChangeText={(text) =>
                      handleScoreChange(text, rowIndex, colIndex)
                    }
                    style={styles.input}
                  />
                </View>
              ))}
            </View>
          ))}

          <View style={[styles.row, styles.totalRow]}>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Total</Text>
            </View>
            {getTotalScores().map((total, index) => (
              <View key={index} style={styles.cell}>
                <Text style={styles.totalText}>{total}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <Button title="Réinitialiser la grille" onPress={resetGrid} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button title="Réinitialiser le score" onPress={resetScore} />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: 10,
    minWidth: 600,
  },
  landscapeLayout: {
    flex: 1,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 100,
    alignItems: "center",
  },
  nameInput: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
  headerText: {
    fontWeight: "bold",
  },
  totalRow: {
    backgroundColor: "#f2f2f2",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  addPlayerButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  addPlayerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
