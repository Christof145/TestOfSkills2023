import {StatusBar} from 'expo-status-bar';
import {Image, StyleSheet, View} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {Suspense, useState} from 'react'
import axios from 'axios';
import {Button} from "./components/Button";
import ImageViewer from "./components/ImageViewer";

const queryClient = new QueryClient();
const placeHolderImage = require('./assets/cat.png')
let catImageURl;

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Main />
      </QueryClientProvider>
  );
}

function MyImageComponent() {
    console.log("Make Image Component")
    console.log(catImageURl)
    return  <Suspense><ImageViewer selectedCat={catImageURl}  placeHolderImage={placeHolderImage} style={{ width: 400, height : 600, borderRadius: 10 }}/></Suspense>
}

function Main() {
    const [displayedCat, setDisplayedCat] = useState(null);
    const getData = async () => {
        return await axios.get(
            "https://api.thecatapi.com/v1/images/search"
        ).then(res => {
            console.log("getData")
            catImageURl = res.data[0].url
            setDisplayedCat(res.data[0].url);
        });
    };
    const { status, isStale, isFetching, error, data } = useQuery(
        'cat',
        getData
    );
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <MyImageComponent/>
            </View>
            <View style={styles.footerContainer}>
                <View>
                    <Button label='Get a cat!' onPress={getData}/>
                </View>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
            // console.log(status, isStale, isFetching, error, data);
            // console.log("got here 2")
            // const [fetchPosts, setFetchPosts] = useState();
            // console.log("got here 3")
            // useQuery(["posts"], () => getData());
    // const {isLoading, error, data} = useQuery(
    //     ["posts"],
    //     () =>
    //         axios.get("https://api.thecatapi.com/v1/images/search")
    //             .then(res => {
    //                 console.log("got here 4")
    //                 res.data
    //                 let catImageURl = res.data[0].url
    //                 // console.log(res.data[0].url)
    //                 console.log(catImageURl)
    //
    //             }),
    //     {
    //         enabled: fetchPosts
    //     }
    // );
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
