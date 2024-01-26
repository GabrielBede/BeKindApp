import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const carouselData = [
  {
    image: require("../../img/Carrossel1.png"),
    text1: "BeKind",
    text2:
      "Seja a mudança que você quer ver no mundo. Com o BeKind, você tem o poder de fazer a diferença na vida daqueles que mais precisam. Junte-se a nós e compartilhe bondade.",
  },
  {
    image: require("../../img/Carrossel2.png"),
    text1: "BeKind | Projeto",
    text2:
      "Transformando vidas através de projetos sociais. Da alimentação à capacitação, proporcionamos apoio abrangente para ajudar pessoas em vulnerabilidade a reconstruir suas vidas com dignidade e esperança.",
  },
  {
    image: require("../../img/Carrossel3.png"),
    text1: "BeKind | Propósito",
    text2:
      "Conheça nossos projetos e descubra como eles estão transformando vidas. Juntos, podemos criar um futuro onde todos tenham o direito de pertencer e prosperar.",
  },
];

const CarouselScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('hasShownWelcomeScreen')
      .then((value) => {
        if (!value) {
          setShowWelcome(true);
          AsyncStorage.setItem('hasShownWelcomeScreen', 'true');
        } else {
          navigation.navigate('Login'); 
        }
      })
      .catch((error) => {
        console.error('Error reading AsyncStorage: ', error);
      });
  }, []);

  const handleNextSlide = () => {
    if (currentIndex < carouselData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current.scrollTo({ x: (currentIndex + 1) * windowWidth });
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollViewRef.current.scrollTo({ x: (currentIndex - 1) * windowWidth });
    }
  };

  if (showWelcome) {
    return (
      <View style={styles.container}>
      <View>
        <Image
          style={styles.Logo}
          source={require("../../img/LogoCompleta.png")}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / windowWidth);
          setCurrentIndex(index);
        }}
        ref={scrollViewRef}
      >
        {carouselData.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.touchAreaRight}
        onPress={handleNextSlide}
      />

      <TouchableOpacity
        style={styles.touchAreaLeft}
        onPress={handlePrevSlide}
      />

      <View style={styles.indicatorContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{carouselData[currentIndex].text1}</Text>
        <Text style={styles.text2}>{carouselData[currentIndex].text2}</Text>
      </View>
      <View style={styles.BotaoContainer}>
        <TouchableOpacity
          style={styles.Botao}
          onPress={() => {
            AsyncStorage.setItem('hasShownWelcomeScreen', 'true');
            navigation.navigate('Login');
          }}
        >
          <Text
            style={{
              width: 200,
              fontSize: 15,
              color: "#fff",
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
              alignSelf: "center",
            }}
            value={""}
          >
            {" "}
            Iniciar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  } else {
    // Se showWelcome for falso, não renderize nada.
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  Logo: {
    width: 100,
    height: 60,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: "contain",
  },
  carouselItem: {
    width: windowWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    paddingLeft: 30,
    width: "92%",
    height: 200,
    marginTop: 10,
    marginBottom: 40,
  },
  text1: {
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
    color: "black",
    marginBottom: 22,
  },
  text2: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "black",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginLeft: 27,
    marginTop: 30,
  },
  indicator: {
    width: 30,
    height: 5,
    borderRadius: 4,
    backgroundColor: "gray",
    margin: 3,
  },
  activeIndicator: {
    backgroundColor: "#252525",
    width: 30,
  },
  BotaoContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  Botao: {
    backgroundColor: "#252525",
    width: "86%",
    borderRadius: 8,
    padding: 13,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  touchAreaRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: windowWidth / 2,
  },
  touchAreaLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: windowWidth / 2,
  },
});

export default CarouselScreen;
