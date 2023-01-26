import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";

function Tile({ value, handleClick }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={handleClick}>
      {value}
    </TouchableOpacity>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const result = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }

    return null;
  };
  const handleClick = (i) => {
    if (board[i] || result(board)) {
      return;
    }

    const nextTile = board.slice();

    if (player === "X") {
      nextTile[i] = "X";
      setBoard(nextTile);
      setPlayer("O");
    } else {
      nextTile[i] = "O";
      setBoard(nextTile);
      setPlayer("X");
    }
  };

  const Winner = result(board);

  const ResultGame = () => {
    if (Winner) {
      return <View style={styles.announce}>Player {Winner} is a Winner!</View>;
    } else {
      return null;
    }
  };

  const Reset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>
      <View style={{ fontFamily: "Georgia" }}>
        <View style={styles.boardRow}>
          <Tile value={board[0]} handleClick={() => handleClick(0)} />
          <Tile value={board[1]} handleClick={() => handleClick(1)} />
          <Tile value={board[2]} handleClick={() => handleClick(2)} />
        </View>
        <View style={styles.boardRow}>
          <Tile value={board[3]} handleClick={() => handleClick(3)} />
          <Tile value={board[4]} handleClick={() => handleClick(4)} />
          <Tile value={board[5]} handleClick={() => handleClick(5)} />
        </View>
        <View style={styles.boardRow}>
          <Tile value={board[6]} handleClick={() => handleClick(6)} />
          <Tile value={board[7]} handleClick={() => handleClick(7)} />
          <Tile value={board[8]} handleClick={() => handleClick(8)} />
        </View>
      </View>
      <ResultGame />
      <Button onPress={Reset} style={styles.button} title="Reset" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  boardRow: {
    flexDirection: "row",
  },
  tile: {
    flex: 1,
    width: 100,
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 50,
    height: 30,
    fontSize: 20,
    marginTop: 50,
  },
  announce: {
    fontSize: 25,
  },
});
