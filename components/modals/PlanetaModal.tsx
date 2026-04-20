import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type PlanetaModal = {
  visibilidade: boolean;
  onAdd: (nome: string, tipo: string, nomeEstrela: string) => void;
  onCancel: () => void;
};

export default function PlanetaModal({
  visibilidade,
  onAdd,
  onCancel,
}: PlanetaModal) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [nomeEstrela, setNomeEstrela] = useState("");

  return (
    <Modal
      visible={visibilidade}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            value={tipo}
            onChangeText={(text) => setTipo(text)}
            placeholder="tipo"
          />
          <TextInput
            style={styles.boxInput}
            value={nomeEstrela}
            onChangeText={(text) => setNomeEstrela(text)}
            placeholder="nome da estrela"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => onAdd(nome, tipo, nomeEstrela)}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => onCancel()}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  boxContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  buttonAdd: {
    backgroundColor: "green",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: "red",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    height: 70,
  },
  boxInput: {
    alignSelf: "stretch",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#ddd",
    margin: 5,
  },
});
