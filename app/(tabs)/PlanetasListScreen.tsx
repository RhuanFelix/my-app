import PlanetaModal from "@/components/modals/PlanetaModal";
import MyScrollView from "@/components/MyScrollView";
import Planeta from "@/components/planeta/Planeta";
import { ThemedView } from "@/components/themed-view";
import { IPlaneta } from "@/interfaces/IPlaneta";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function PlanetasListScreen() {
  const [planetas, setPlanetas] = useState<IPlaneta[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [planetaSelecionado, setPlanetaSelecionado] = useState<IPlaneta>();

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

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

  const onAdd = (
    nome: string,
    tipo: string,
    nomeEstrela: string,
    id?: number,
  ) => {
    if (!id || id <= 0) {
      const novoPlaneta: IPlaneta = {
        id: Math.random() * 1000,
        nome: nome,
        tipo: tipo,
        nomeEstrela: nomeEstrela,
      };

      const novaListaPlanetas: IPlaneta[] = [...planetas, novoPlaneta];

      setPlanetas(novaListaPlanetas);
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(novaListaPlanetas))
    } else {
      planetas.forEach((planeta) => {
        if (planeta.id === id) {
          planeta.nome = nome;
          planeta.tipo = tipo;
          planeta.nomeEstrela = nomeEstrela;
        }
      });

      setPlanetas([...planetas])
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(planetas))
    }
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const novosPlanetas: Array<IPlaneta> = [];

    for (let index = 0; index < planetas.length; index++) {
      const planeta = planetas[index];

      if (planeta.id !== id) {
        novosPlanetas.push(planeta);
      }

      setPlanetas(novosPlanetas);
      AsyncStorage.setItem("@Planetas:planetas", JSON.stringify(novosPlanetas))
      setModalVisible(false);
    }
  };

  const openModal = () => {
    setPlanetaSelecionado(undefined);
    setModalVisible(true);
  };

  const openEditModal = (planetaselecionada: IPlaneta) => {
    setPlanetaSelecionado(planetaselecionada);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text style={styles.headerButton}>Novo Planeta</Text>
        </TouchableOpacity>
        <Text style={styles.headerButton}>{texto}</Text>
      </ThemedView>
      <ThemedView style={styles.container}>
        {planetas.map((planeta) => (
          <TouchableOpacity key={planeta.id} onPress={() => openEditModal(planeta)}>
            <Planeta
              nome={planeta.nome}
              tipo={planeta.tipo}
              nomeEstrela={planeta.nomeEstrela}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
      <PlanetaModal
        visibilidade={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        planeta={planetaSelecionado}
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
