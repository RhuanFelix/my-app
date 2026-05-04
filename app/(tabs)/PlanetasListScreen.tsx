import PlanetaModal from "@/components/modals/PlanetaModal";
import MyScrollView from "@/components/MyScrollView";
import Planeta from "@/components/planeta/Planeta";
import { ThemedView } from "@/components/themed-view";
import { IPlaneta } from "@/interfaces/IPlaneta";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PlanetasListScreen() {
  const [planetas, setPlanetas] = useState<IPlaneta[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [planetaSelecionado, setPlanetaSelecionado] = useState<IPlaneta>();

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
    } else {
      planetas.forEach((planeta) => {
        if (planeta.id === id) {
          planeta.nome = nome;
          planeta.tipo = tipo;
          planeta.nomeEstrela = nomeEstrela;
        }
      });

      setPlanetas([...planetas])
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
