import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import React from "react";
import Button from "./components/Button";

const placeHolderImage = require('./assets/cat.png')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.placeHolderImage} >
        <Image source={placeHolderImage} style={styles.image}/>
      </View>
      <View>
        <Button label='Get a cat!'/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 100
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
