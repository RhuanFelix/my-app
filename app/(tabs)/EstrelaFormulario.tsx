import { IEstrela } from "@/interfaces/IEstrela";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type EstrelaModalProps = {
  visibilidade: boolean;
  onAdd: (nome: string, tipo: string, idade: number, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  estrela?: IEstrela;
};

export default function EstrelaModal({
  visibilidade,
  onAdd,
  onCancel,
  onDelete,
  estrela,
}: EstrelaModalProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [idade, setIdade] = useState(0);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (estrela) {
      setNome(estrela.nome);
      setTipo(estrela.tipo);
      setIdade(estrela.idade);
      setId(estrela.id);
    } else {
      setNome("");
      setTipo("");
      setIdade(0);
      setId(0);
    }
  }, [estrela]);

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
        value={idade.toString()}
        onChangeText={(text) => setIdade(Number(text))}
        placeholder="idade"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => onAdd(nome, tipo, idade, id)}
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
    height: "100%"
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
