import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios, {isCancel, AxiosError} from 'axios';
import React, {useState} from "react";
import Button from "./components/Button";
const placeHolderImage = require('./assets/cat.png')
const queryClient = new QueryClient();

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Main />
      </QueryClientProvider>
  );
}

function Main() {
    const [fetchPosts, setFetchPosts] = useState();
    console.log("run")
    const { isLoading, error, data } = useQuery(
        ["posts"],
        () =>
            axios.get("https://api.thecatapi.com/v1/images/search")
                .then(res =>{
                    const items = res.data;
                    console.log(items)
                    res.data
                }),
        {
            enabled: fetchPosts
        }

    );
    console.log(data);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.placeHolderImage}>
                    <Image source={placeHolderImage} style={styles.image}/>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View>
                    <Button label='Get a cat!' onClick={!isLoading}/>
                </View>
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
  },

  imageContainer: {
    flex: 1,
    paddingTop: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    borderRadius: 18,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1 / 8,
    alignItems: 'center',
  },
});
