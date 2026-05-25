import { ThemedView } from "@/components/themed-view";
import { IPlaneta } from "@/interfaces/IPlaneta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const PlanetaDetailScreen = () => {
  const { planetaId } = useLocalSearchParams();
  const [planetaForDetail, setPlanetaForDetail] = useState<IPlaneta>();
  const [planetas, setPlanetas] = useState<IPlaneta[]>([]);

  const [nomeEditar, setNomeEditar] = useState("");
  const [tipoEditar, setTipoEditar] = useState("");
  const [nomeEstrelaEditar, setNomeEstrelaEditar] = useState("");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@Planetas:planetas");
        const planetasData: IPlaneta[] = data != null ? JSON.parse(data) : [];
        setPlanetas(planetasData);
        planetasData.forEach((element) => {
          if (element.id.toString() === planetaId) {
            setPlanetaForDetail(element);
            setId(Number(planetaId));
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const navigateToPlanetasListScreen = () => {
    router.replace("/PlanetasListScreen");
  };

  const editar = (
    nome: string,
    tipo: string,
    nomeEstrela: string,
    id?: number,
  ) => {
    planetas.forEach((planeta) => {
      if (planeta.id === id) {
        planeta.nome = nome;
        planeta.tipo = tipo;
        planeta.nomeEstrela = nomeEstrela;
      }
    });

    setPlanetas([...planetas]);
    AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(planetas));
  };

  const onDelete = () => {
    if (planetaForDetail) {
      const novosPlanetas: Array<IPlaneta> = [];

      for (let index = 0; index < planetas.length; index++) {
        const planeta = planetas[index];
        if (planeta.id !== planetaForDetail!.id) {
          novosPlanetas.push(planeta);
        }
      }

      setPlanetas(novosPlanetas);
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(novosPlanetas));
    }
    router.replace("/PlanetasListScreen");
  };

  return (
    <View style={styles.boxContainer}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => onDelete()}>
          <Text style={styles.headerButton}>X</Text>
        </TouchableOpacity>
      </ThemedView>

      <View style={styles.box}>
        <Text style={styles.title}>
          {planetaForDetail ? planetaForDetail.nome : ""}
        </Text>
        <Text style={styles.subtitle}>
          {planetaForDetail ? planetaForDetail.nomeEstrela : ""}
        </Text>
        <Text style={styles.subtitle}>
          {planetaForDetail ? planetaForDetail.tipo : ""}
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.boxInput}
          placeholder="nome"
          value={nomeEditar}
          onChangeText={(text) => setNomeEditar(text)}
          autoFocus
        />
        <TextInput
          style={styles.boxInput}
          value={tipoEditar}
          onChangeText={(text) => setTipoEditar(text)}
          placeholder="tipo"
        />
        <TextInput
          style={styles.boxInput}
          value={nomeEstrelaEditar}
          onChangeText={(text) => setNomeEstrelaEditar(text)}
          placeholder="nome da estrela"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              editar(nomeEditar, tipoEditar, nomeEstrelaEditar, id);
              navigateToPlanetasListScreen();
            }}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigateToPlanetasListScreen()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "gray",
    height: "100%",
  },
  box: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
  },
  headerButton: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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

export default PlanetaDetailScreen;
