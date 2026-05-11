import Estrela from "@/components/estrela/Estrela";
import EstrelaModal from "@/components/modals/EstrelaModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/themed-view";
import { IEstrela } from "@/interfaces/IEstrela";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function EstrelaListScreen() {
  const [estrelas, setEstrelas] = useState<IEstrela[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [estrelaSelecionada, setEstrelaSelecionada] = useState<IEstrela>();

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@Estrelas:estrelas");
        const estrelaData = data != null ? JSON.parse(data) : [];
        setEstrelas(estrelaData);
      } catch (error) {
        console.error(error);
        
      }
    }
    getData();
  }, [])

  useEffect(() => {
    async function getLocalizacao() {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("O acesso ao local foi negado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getLocalizacao()
  }, [])

  let texto = "esperando...";
  if (errorMsg) {
    texto = errorMsg;
  } else if (location) {
    texto = JSON.stringify(location);
  }

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
      AsyncStorage.setItem("@Estrelas:estrelas", JSON.stringify(novaListaEstrela))
    } else {
      estrelas.forEach((estrela) => {
        if (estrela.id === id) {
          estrela.nome = nome;
          estrela.tipo = tipo;
          estrela.idade = idade;
        }
      });
      setEstrelas([...estrelas])
      AsyncStorage.setItem("@Estrelas:estrelas", JSON.stringify(estrelas))
    }
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const novasEstrelas: Array<IEstrela> = [];

    for (let index = 0; index < estrelas.length; index++) {
      const estrela = estrelas[index];

      if (estrela.id !== id) {
        novasEstrelas.push(estrela);
      }

      setEstrelas(novasEstrelas);
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(novosPlanetas))
      setModalVisible(false);
    }
  };

  const openModal = () => {
    setEstrelaSelecionada(undefined);
    setModalVisible(true);
  };

  const openEditModal = (estrelaSelecionada: IEstrela) => {
    setEstrelaSelecionada(estrelaSelecionada);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text style={styles.headerButton}>Nova Estrela</Text>
        </TouchableOpacity>
        <Text style={styles.headerButton}>{texto}</Text>
      </ThemedView>
      <ThemedView style={styles.container}>
        {estrelas.map((estrela) => (
          <TouchableOpacity key={estrela.id} onPress={() => openEditModal(estrela)}>
            <Estrela
              key={estrela.id}
              nome={estrela.nome}
              tipo={estrela.tipo}
              idade={estrela.idade}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
      <EstrelaModal
        visibilidade={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        estrela={estrelaSelecionada}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  headerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
  },
});
