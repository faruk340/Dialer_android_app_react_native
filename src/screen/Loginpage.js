import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Dimensions, BackHandler, TouchableOpacity, NativeModules, Image, ImageBackground, StatusBar } from "react-native";
import CheckBox from '@react-native-community/checkbox';
//import NetworkChecker from 'react-native-network-checker';
import AwesomeLoading from 'react-native-awesome-loading';
import { useValidation } from 'react-native-form-validator';


const windowHeight = Dimensions.get('window').height;

const { LoginpageModule } = NativeModules;

const Loginpage = ({ navigation }) => {


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const [loading, setloading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { username },
        });

    const verifyLogin = () => {
        validate({
            username: { required: true },
            password: { required: true },
        });
        if (username !== "" && password !== "") {
            setloading(true)
            LoginpageModule.isValid(username, password)
                .then((res) => {
                    // setloading(false)
                    // console.log("Valid:" + res);
                    if (res) {
                        LoginpageModule.getUserDetails(username)
                            .then(res => {
                                // console.log("User Details:" + res);
                                const obj = JSON.parse(res);
                                navigation.navigate('Searchlist', obj)
                            })
                    }
                    else {
                        alert("Login Failed");
                        setloading(false)
                    }
                    setloading(false)
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }


    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [btnDisabled, setbtnDisabled] = useState(true)

    const [isFocused, setState] = useState(false);
    const [isFocused2, setState2] = useState(false);


    const handleFocus = () => setState(true)
    const handleBlur = () => setState(false)

    const handleFocus2 = () => setState2(true)
    const handleBlur2 = () => setState2(false)


    return (
        // <NetworkChecker
        //     position="bottom"
        //     duration={2000} // In milliseconds
        //     notConnectedMessage="Not connected to Internet!"
        //     notConnectedTextColor="white"
        //     notConnectedBackgroundColor="grey"
        //     connectedMessage="Connected to Internet!"
        //     connectedTextColor="white"
        //     connectedBackgroundColor="green"
        // >
        loading ? <AwesomeLoading indicatorId={5} size={100} isActive={true} text="loading" />
            : <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#004AAD"
                // barStyle={statusBarStyle}
                // showHideTransition={statusBarTransition}
                // hidden={hidden} 
                />
                <ImageBackground style={styles.Textcontainer}
                    source={require('../images/login_page_backgroung.png')}
                    resizeMode="cover"
                >
                    {/* <Text style={{ color: "#fff", fontSize: 30 }}>Go Software</Text> */}
                    <View style={styles.phoneCallIcon}
                    >
                        {/* <Feather name="phone-call" size={25} color="#fff" /> */}
                        <Text style={{ color: "#ffff", fontSize: 18, width: "100%" }}>Wellcome To</Text>
                        <Text style={{ color: "#ffff", fontSize: 25, width: "100%" }}>Go Digo Office</Text>
                    </View>
                </ImageBackground>
                <View style={styles.inputContainer}>
                    <TextInput
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={[styles.input, {
                            borderColor: isFocused
                                ? '#4C83FF'
                                : '#000',
                            borderWidth: isFocused ? 3 : 1,
                            marginBottom: 0
                        }]}
                        onChangeText={(username) => setUsername(username)}
                        // value={number}
                        placeholder="User Name"
                        keyboardType="default"
                        placeholderTextColor='#000'

                    />
                    <Text style={{ color: "red", paddingLeft: 5, width: "85%" }}>{getErrorMessages()}</Text>
                    <TextInput
                        onFocus={handleFocus2}
                        onBlur={handleBlur2}
                        style={[styles.input, {
                            borderColor: isFocused2
                                ? '#4C83FF'
                                : '#000',
                            borderWidth: isFocused2 ? 3 : 1,
                            marginBottom: 0
                        }]}
                        // style={styles.input}
                        onChangeText={(password) => setPassword(password)}
                        // value={number}
                        placeholder="Password"
                        keyboardType="default"
                        placeholderTextColor='#000'
                        changeColor="#000"
                        secureTextEntry={true}
                    />
                    <Text style={{ color: "red", paddingLeft: 5, width: "85%" }}>{getErrorMessages()}</Text>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            tintColors={{ true: '#123597', false: '#000' }}
                        />
                        <Text style={{ color: "#000" }}>Are You Sure For Login</Text>
                    </View>
                    <TouchableOpacity style={[styles.loginBtn, {
                        backgroundColor: toggleCheckBox ? "#123597" : "grey"
                    }]}
                        disabled={toggleCheckBox ? false : true}
                        onPress={() => verifyLogin()}
                    >

                        <Text style={{ color: "#fff", fontSize: 16 }}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.gosoftwareLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../images/gs_logo.png')}
                        />
                    </View>
                </View>
            </View>
        // </NetworkChecker>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        width: "100%",
        height: windowHeight,
        backgroundColor: "#004AAD",
    },
    Textcontainer: {
        position: "relative",
        width: "100%",
        height: windowHeight - 550,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
        // borderColor: "red",

    },
    phoneCallIcon: {
        // width: 100,
        // height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#6E01EF",
        // backgroundColor: "#123597",
        borderRadius: 100
    },
    inputContainer: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: windowHeight,
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    input: {
        width: "90%",
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 15,
        borderRadius: 25,
        color: "#000",
    },
    textInputFocus: {
        width: "90%",
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: "red",
        padding: 15,
        borderRadius: 6,
        color: "#fff",
        fontSize: 18,
    },
    checkBoxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
    },
    loginBtn: {
        marginTop: 40,
        padding: 10,
        width: 230,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    gosoftwareLogo: {
        marginTop: 60,
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    tinyLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
})
export default Loginpage;
