import { Text, View, StyleSheet } from "react-native";

export type EstrelaProps = {
  nome: string;
  tipo: string;
  idade: number;
};

export default function Estrela({ nome, tipo, idade }: EstrelaProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.info}>{tipo}</Text>
      <Text style={styles.info}>{idade}</Text>
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
