import {StyleSheet, image} from "react-native";
import {Image} from "react-native";

export default function ImageViewer({placeHolderImage}) {
    return(
      <Image source={{placeHolderImage}} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 600,
        borderRadius: 18
    }
});