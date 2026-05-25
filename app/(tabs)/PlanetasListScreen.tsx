import MyScrollView from "@/components/MyScrollView";
import Planeta from "@/components/planeta/Planeta";
import { ThemedView } from "@/components/themed-view";
import { IPlaneta } from "@/interfaces/IPlaneta";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function PlanetasListScreen() {
  const [planetas, setPlanetas] = useState<IPlaneta[]>([]);

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

  const navigateToDetails = (planetaSelecionado: IPlaneta) => {
    router.push({pathname: "/Screens/PlanetaDetailScreen", params:{planetaId: planetaSelecionado.id}})
  };

  const navigateToForm = () => {
    router.push({pathname: "/Forms/PlanetaFormulario"})
  }

  return (
    <MyScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigateToForm()}>
          <Text style={styles.headerButton}>Novo Planeta</Text>
        </TouchableOpacity>
        <Text style={styles.headerButton}>{texto}</Text>
      </ThemedView>
      <ThemedView style={styles.container}>
        {planetas.map((planeta) => (
          <TouchableOpacity key={planeta.id} onPress={() => navigateToDetails(planeta)}>
            <Planeta
              nome={planeta.nome}
              tipo={planeta.tipo}
              nomeEstrela={planeta.nomeEstrela}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
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
