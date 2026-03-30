import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function UniversoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/universo-1-e1568576112307-800x400.jpg")}
          style={styles.imagemUniverso}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Universo</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          A formação do universo: o Big Bang
        </ThemedText>
        <ThemedText>
          Segundo a teoria criada pelo astrônomo George Lemaître (1894-1966), o
          universo tem uma origem comum, a partir da qual tudo se originou. Esta
          teoria foi confirmada pelo astrônomo norte-americano Edwin Hubble, que
          verificou que as galáxias estão em constante expansão e afastamento.
        </ThemedText>
        <ThemedText>
          A teoria do Big Bang diz que toda matéria e energia se concentravam em
          um ponto super denso e quente, conhecido como singularidade. A partir
          deste ponto, o universo se expandiu num processo conhecido como
          inflação, que durou uma fração infinitesimal de tempo.
        </ThemedText>
        <ThemedText>
          Uma série de transformações continuou a acontecer por bilhões de anos,
          até a estrutura com que o conhecemos hoje. O universo foi se
          expandindo cada vez mais, de forma que foi se resfriando, dando origem
          aos diversos astros.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">A idade do universo</ThemedText>
        <ThemedText>
          A idade do universo é um dos assuntos mais debatidos pela cosmologia e
          astronomia. Estudos mais recentes apontam que a idade aproximada está
          entre 13,8 a 14 bilhões de anos.
        </ThemedText>
        <ThemedText>
          Para chegar a tal conclusão, diversos estudos foram realizados e
          comparados. Dados foram coletados a partir de satélites, como o
          satélite Planck, e observatórios terrestres como o Atacama Cosmology
          Telescope (ACT).
        </ThemedText>
        <ThemedText>
          Estes estudos consideram a velocidade de expansão do universo. É
          importante lembrar que a ciência está em constante avanço e tais
          conclusões estão baseadas no que é possível observar hoje.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Fonte</ThemedText>
        <ThemedText>Toda Matéria</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
  imagemUniverso: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
  },
});
