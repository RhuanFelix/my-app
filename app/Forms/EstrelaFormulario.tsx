import { IEstrela } from "@/interfaces/IEstrela";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EstrelaFormulario() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [idade, setIdade] = useState(0);
  const [estrelas, setEstrelas] = useState<IEstrela[]>([]);

  const [id, setId] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@Estrelas:estrelas");
        const estrelasData = data != null ? JSON.parse(data) : [];
        setEstrelas(estrelasData);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const navigateToEstrelaListScreen = () => {
    router.replace("/EstrelaListScreen");
  };

  const onAdd = (nome: string, tipo: string, idade: number, id?: number) => {
    if (!id || id <= 0) {
      const novaEstrela: IEstrela = {
        id: Math.random() * 1000,
        nome: nome,
        tipo: tipo,
        idade: idade,
      };

      const novaListaEstrela: IEstrela[] = [...estrelas, novaEstrela];

      setEstrelas(novaListaEstrela);
      AsyncStorage.setItem(
        "@Estrelas:estrelas",
        JSON.stringify(novaListaEstrela),
      );
    } else {
      estrelas.forEach((estrela) => {
        if (estrela.id === id) {
          estrela.nome = nome;
          estrela.tipo = tipo;
          estrela.idade = idade;
        }
      });
      setEstrelas([...estrelas]);
      AsyncStorage.setItem("@Estrelas:estrelas", JSON.stringify(estrelas));
    }
  };

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
          onPress={() => {
            onAdd(nome, tipo, idade, id);
            navigateToEstrelaListScreen();
          }}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigateToEstrelaListScreen()}
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
    height: "100%",
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
