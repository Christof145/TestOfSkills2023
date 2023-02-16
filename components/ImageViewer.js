import {StyleSheet, Image} from "react-native";
import React from "react";
export default function ImageViewer({placeHolderImage}) {
    return(
      <Image source={{uri: placeHolderImage}} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 600,
        borderRadius: 18
    }
});