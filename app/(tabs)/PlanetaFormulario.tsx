import { IPlaneta } from "@/interfaces/IPlaneta";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type PlanetaModal = {
  visibilidade: boolean;
  onAdd: (nome: string, tipo: string, nomeEstrela: string, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  planeta?: IPlaneta;
};

export default function PlanetaFormulario({
  visibilidade,
  onAdd,
  onCancel,
  onDelete,
  planeta,
}: PlanetaModal) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [nomeEstrela, setNomeEstrela] = useState("");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (planeta) {
      setNome(planeta.nome);
      setTipo(planeta.tipo);
      setNomeEstrela(planeta.nomeEstrela);
      setId(planeta.id);
    } else {
      setNome("");
      setTipo("");
      setNomeEstrela("");
      setId(0);
    }
  }, [planeta]);

  return (
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
          onPress={() => onAdd(nome, tipo, nomeEstrela, id)}
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
    height:"100%"
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
    backgroundColor: "orange",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  buttonDelete: {
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
