import {StatusBar} from 'expo-status-bar';
import {Image, StyleSheet, View} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {Suspense, useState} from 'react'
import axios from 'axios';
import ImageViewer from "./components/ImageViewer";
import { AppRegistry } from 'react-native';
import {Icon, ThemeProvider, Button} from "react-native-magnus";

const queryClient = new QueryClient();
const placeHolderImage = require('./assets/cat.png')
let catImageURl;

// this is our custom theme
const theme = {
    colors: {
        violet100: "#8A2BE2",
    },
    fontSize: {
        bigText100: 32,
    },
    buttonContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#000000',
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        width: 310,
        paddingTop: 100,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        borderRadius: 10,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 1/8,
        alignItems: 'center',
    },
};

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Main />
      </QueryClientProvider>
  );
}
AppRegistry.registerComponent('app', () => App);

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
        <ThemeProvider theme={theme}>
            <View style={theme.container}>
                <View style={theme.imageContainer}>
                    <MyImageComponent/>
                </View>
                <View style={theme.footerContainer}>
                    <View style={theme.buttonContainer}>
                        <Button block bg={theme.colors.violet100} suffix={<Icon name="search" position="absolute" left={'25%'} color="white" fontFamily="Feather" />} label={"Find a random cat"} onPress={getData} mt="lg">Get a random cat</Button>
                    </View>
                </View>
                <StatusBar style="auto"/>
            </View>
        </ThemeProvider>
    );
}
