import Estrela from "@/components/estrela/Estrela";
import EstrelaModal from "@/components/modals/EstrelaModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/themed-view";
import { IEstrela } from "@/interfaces/IEstrela";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


export default function EstrelaListScreen() {
  const [estrelas, setEstrelas] = useState<IEstrela[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (nome: string, tipo: string, idade: number) => {
    const novaEstrela: IEstrela = {
      id: Math.random() * 1000,
      nome: nome,
      tipo: tipo,
      idade: idade
    };

    const novaListaEstrela: IEstrela[] = [...estrelas, novaEstrela];

    setEstrelas(novaListaEstrela);
    setModalVisible(false);
  };

  const openModal = () => {
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
      </ThemedView>
      <ThemedView style={styles.container}>
        {estrelas.map((estrela) => (
          <Estrela
            key={estrela.id}
            nome={estrela.nome}
            tipo={estrela.tipo}
            idade={estrela.idade}
          />
        ))}
      </ThemedView>
      <EstrelaModal
        visibilidade={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    reactLogo: {
        bottom: 0,
        left: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerButton: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20,
    }
})