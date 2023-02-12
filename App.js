import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: '#3ca832',}}>Hello</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <StatusBar style="auto" />
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={{color: '#3ca832',}}>Get a cat!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    height: 20,
    width: 50,
    marginHorizontal: 30,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'centre',
    justifyContent: 'centre',
    flexDirection: 'row',
  }

});
