import {StatusBar} from 'expo-status-bar';
import {Image, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {Suspense, useState} from 'react'
import axios from 'axios';
import ImageViewer from "./components/ImageViewer";
import { AppRegistry } from 'react-native';
import {Icon, ThemeProvider, Button} from "react-native-magnus";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const queryClient = new QueryClient();
const placeHolderImage = require('./assets/cat.png')
let catImageURl;

// this is our custom theme
const theme = {
    // Colors
    colors: {
        violet100: "#8A2BE2",
    },
    // FontSizes
    fontSize: {
        bigText100: 32,
    },
    //Buttons
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
    //General Container
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    //Login screen
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
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

const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Main} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App({ navigation }) {
  return (
      <QueryClientProvider client={queryClient}>
          <MyStack/>
      </QueryClientProvider>
  );
}
AppRegistry.registerComponent('app', () => App);

function MyImageComponent() {
    console.log("Make Image Component")
    console.log(catImageURl)
    return  <Suspense><ImageViewer selectedCat={catImageURl}  placeHolderImage={placeHolderImage} style={{ width: 400, height : 600, borderRadius: 10 }}/></Suspense>
}
function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={theme.container}>
            <Text style={theme.logo}>Human Destresser</Text>
            <View style={theme.inputView} >
                <TextInput
                    style={theme.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={setEmail}
                    value={email}/>
            </View>
            <View style={theme.inputView} >
                <TextInput
                    secureTextEntry
                    style={theme.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={setPassword}
                    value={password}/>
            </View>

            <TouchableOpacity>
                <Text style={theme.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={theme.loginBtn} onPress={() => navigation.navigate('Home')}>
                <Text style={theme.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={theme.loginText} onPress={() => navigation.navigate('Register')}>Signup</Text>
            </TouchableOpacity>
        </View>

    );
};

function Main({navigation}) {
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

function Register({navigation}) {
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [check_textInputChange , setCheck_textInputChange ] = useState(false);
    const [secureTextEntry , setSecureTextEntry ] = useState(true);
    const [confirmSecureTextEntry , setConfirmSecureTextEntry ] = useState(true);

    function updateSecureTextEntry(){
        if (secureTextEntry){
            setSecureTextEntry(false)
        }else {
            setSecureTextEntry(true)
        }
    }

    function updateConfirmSecureTextEntry() {
        if (confirmSecureTextEntry){
            setConfirmSecureTextEntry(false)
        }else {
            setConfirmSecureTextEntry(true)
        }
    }
    function InsertRecord() {
        console.log("Get here 1")
        const Email = email;
        const Password = password;
        const ConfirmPw = confirmPw;
        const checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

        console.log("Get here 1")

        if ((Email.length === 0) || (Password.length === 0) || (ConfirmPw.length === 0)){
            alert("Required Field Is Missing!!!");
        }else if (!(checkEmail).test(Email)){
            alert("invalid email!!!");
        }
        // Password validations
        else if (Password.length<2){
            alert("Minimum 08 characters required!!!");
        }else if (!((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(Password))){
            alert("Use at least 01 special character!!!");
        }else if (((/ /).test(Password))){
            alert("Don't include space in password!!!");
        }else if(Password !== ConfirmPw){
            alert("Password does not match!!!");
        }


        else{
            const InsertAPIURL = "http://10.0.2.2:80/SignIn/SignUp.php";   //API to render signup

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const Data ={
                Email: Email,
                Password: Password
            };

            // FETCH func ------------------------------------
            fetch(InsertAPIURL,{
                method:'POST',
                headers:headers,
                body: JSON.stringify(Data) //convert data to JSON
            })
                .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                .then((response)=>{
                    alert(response[0]);       // If data is in JSON => Display alert msg
                    navigation.navigate("SignInScreen"); //Navigate to next screen if authentications are valid
                })
                .catch((error)=>{
                    alert("Error Occured" + error);
                })
        }
    }

    return (
        <View style={theme.container}>
            <View style={theme.inputView} >
                <TextInput
                    placeholder="Enter Email"
                    placeholderTextColor="#003f5c"
                    style={theme.inputText}
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={theme.inputView} >
                <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={secureTextEntry}
                    style={theme.inputText}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                {secureTextEntry ?
                    <Icon name="eye-off" left={'50%'} bottom={25} color="white" fontFamily="Feather" fontSize={30}/>
                    :
                    <Icon name="eye" left={'50%'} bottom={25} color="white" fontFamily="Feather"  fontSize={30}/>
                }
            </TouchableOpacity>
            </View>


            <View style={theme.inputView} >
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    style={theme.inputText}
                    onChangeText={setConfirmPw}
                    value={confirmPw}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <TouchableOpacity  style={theme.loginBtn} onPress={() => InsertRecord}>
                <Text style={theme.loginText}>Register</Text>
            </TouchableOpacity>


        </View>
    );
}