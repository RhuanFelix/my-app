import { IPlaneta } from "@/interfaces/IPlaneta";
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

export default function PlanetaFormulario() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [nomeEstrela, setNomeEstrela] = useState("");
  const [planetas, setPlanetas] = useState<IPlaneta[]>([]);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@Planetas:planetas");
        const planetasData = data != null ? JSON.parse(data) : [];
        setPlanetas(planetasData);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [])

  const navigateToPlanetasListScreen = () => {
    router.replace("/PlanetasListScreen");
  };

  const onAdd = (nome: string, tipo: string,nomeEstrela: string, id?: number) => {
      const novoPlaneta: IPlaneta = {
        id: Math.random() * 1000,
        nome: nome,
        tipo: tipo,
        nomeEstrela: nomeEstrela,
      };

      const novaListaPlanetas: IPlaneta[] = [...planetas, novoPlaneta];

      setPlanetas(novaListaPlanetas);
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(novaListaPlanetas))
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
        value={nomeEstrela}
        onChangeText={(text) => setNomeEstrela(text)}
        placeholder="nome da estrela"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            onAdd(nome, tipo, nomeEstrela, id);
            navigateToPlanetasListScreen();
          }}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigateToPlanetasListScreen()}
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
