import { ThemedView } from "@/components/themed-view";
import { IEstrela } from "@/interfaces/IEstrela";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const EstrelaDetailScreen = () => {
  const { estrelaId } = useLocalSearchParams();
  const [estrelaForDetail, setEstrelaForDetail] = useState<IEstrela>();
  const [estrelas, setEstrelas] = useState<IEstrela[]>([]);

  const [nomeEditar, setNomeEditar] = useState("");
  const [tipoEditar, setTipoEditar] = useState("");
  const [idadeEditar, setIdadeEditar] = useState(0);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@Estrelas:estrelas");
        const estrelasData: IEstrela[] = data != null ? JSON.parse(data) : [];
        setEstrelas(estrelasData);
        estrelasData.forEach((element) => {
          if (element.id.toString() === estrelaId) {
            setEstrelaForDetail(element);
            setId(Number(estrelaId));
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const navigateToEstrelaListScreen = () => {
    router.replace("/EstrelaListScreen");
  };

  const editar = (nome: string, tipo: string, idade: number, id?: number) => {
    estrelas.forEach((estrela) => {
      if (estrela.id === id) {
        estrela.nome = nome;
        estrela.tipo = tipo;
        estrela.idade = idade;
      }
    });
    setEstrelas([...estrelas]);
    AsyncStorage.setItem("@Estrelas:estrelas", JSON.stringify(estrelas));
  };

  const onDelete = () => {
    if (estrelaForDetail) {
      const novasEstrelas: Array<IEstrela> = [];

      for (let index = 0; index < estrelas.length; index++) {
        const estrela = estrelas[index];
        if (estrela.id !== estrelaForDetail!.id) {
          novasEstrelas.push(estrela);
        }
      }

      setEstrelas(novasEstrelas);
      AsyncStorage.setItem("@Estrelas:estrelas", JSON.stringify(novasEstrelas));
    }
    router.replace("/EstrelaListScreen");
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
          {estrelaForDetail ? estrelaForDetail.nome : ""}
        </Text>
        <Text style={styles.subtitle}>
          {estrelaForDetail ? estrelaForDetail.tipo : ""}
        </Text>
        <Text style={styles.subtitle}>
          {estrelaForDetail ? estrelaForDetail.idade : ""}
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
              value={idadeEditar.toString()}
              onChangeText={(text) => setIdadeEditar(Number(text))}
              placeholder="idade"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => {
                  editar(nomeEditar, tipoEditar, idadeEditar, id);
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

export default EstrelaDetailScreen;
