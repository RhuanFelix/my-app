import { Text, View, StyleSheet } from "react-native";

export type PlanetaProps = {
  nome: string;
  tipo: string;
  nomeEstrela: string;
};

export default function Planeta({ nome, tipo, nomeEstrela }: PlanetaProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.info}>{tipo}</Text>
      <Text style={styles.info}>{nomeEstrela}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    fontSize: 10,
  },
});
