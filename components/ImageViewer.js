import {StyleSheet, Image} from "react-native";
import React from "react";
export default function ImageViewer({selectedCat, placeHolderImage}) {
    const imageSource = selectedCat !== null
        ? { uri: selectedCat }
        : placeHolderImage;
    return(
      <Image source={imageSource} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 600,
        borderRadius: 18
    }
});