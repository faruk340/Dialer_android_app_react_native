import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, BackHandler } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WavyBackground from "react-native-wavy-background";
import NetInfo from "@react-native-community/netinfo";

const Profile = ({ route, navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    // =================================User profile Page Details =======================

    const MemberDetails = route.params;

    // ==================================================================================


    const [netInfo, setNetInfo] = useState('');
    useEffect(() => {
        const Data = NetInfo.addEventListener((state) => {
            setNetInfo(`isConnected? : ${state.isConnected}`)
        });

        return () => {
            Data()
        }
    }, []);

    // console.log(netInfo);
    const networkTypeHandler = () => {
        NetInfo.fetch().then((state) => {
            // console.log(state.isConnected)
        })
    }
    networkTypeHandler();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    return (
        <View style={styles.container}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}>
                <WavyBackground
                    height={150}
                    width={1100}
                    amplitude={40}
                    frequency={3}
                    offset={90}
                    color="#1F618D"
                    bottom={false}
                />
            </View>
            <View style={styles.headerProfile}>
                <View style={styles.headerProfileIcon}>
                    <View style={styles.headerProfileIconBorder}>
                        <Image
                            style={styles.propileImage}
                            source={require('../images/download.jpg')}
                        />
                    </View>
                </View>
                <Text style={{ fontSize: 25, paddingBottom: 5, color: "#fff" }}>{MemberDetails.member_name}</Text>
                <Text style={{ fontSize: 15, color: "#fff" }}>Customer Support Executive</Text>
            </View>
            <View style={styles.profileDetails}>
                <View style={styles.detailsIcon}>
                    <AntDesign name='mail' size={20} color="#fff" />
                    <Text style={{ paddingLeft: 15, color: "#fff" }}>{MemberDetails.member_mail}</Text>
                </View>
                <View style={styles.detailsIcon}>
                    <Feather name='smartphone' size={20} color="#fff" />
                    <Text style={{ paddingLeft: 15, color: "#fff" }}>{MemberDetails.member_mob_no}</Text>
                </View>
                <View style={styles.detailsIcon}>
                    <EvilIcons name='location' size={20} color="#fff" />
                    <Text style={{ paddingLeft: 15, color: "#fff" }}>Add To Group</Text>
                </View>
            </View>
            <View style={styles.logOut}>
                <View>
                    <View style={styles.footerBoxFlex}>
                        <View style={styles.footerIcon}>
                            <MaterialCommunityIcons name='vibrate' size={20} color="#fff" />
                            <Text style={{ paddingLeft: 15, color: "#fff" }}>Vibration</Text>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.footerBoxFlex}>
                        <View style={styles.footerIcon}>
                            <AntDesign name='sound' size={20} color="#fff" />
                            <Text style={{ paddingLeft: 15, color: "#fff" }}>Silent</Text>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.logoutBtn}>
                    <TouchableOpacity style={styles.logoutBox}
                        onPress={() => { navigation.navigate('Loginpage') }}
                    >
                        <Text style={{ color: "#fff", paddingRight: 15, fontSize: 18 }}>logOut</Text>
                        <AntDesign name='logout' size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F55555",
    },
    headerProfile: {
        paddingTop: 50,
        paddingBottom: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerProfileName: {
        marginRight: 30,
    },
    headerProfileIconBorder: {
        borderWidth: 7,
        borderRadius: 100,
        borderColor: "#1F618D",
        // borderTopColor: "#fff",
    },
    profileDetails: {
        padding: 10,
        width: "95%",
        // backgroundColor: "#00d4ff",
        // borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 13,
    },
    detailsIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    logOut: {
        marginTop: 10,
        height: "100%",
        width: "100%",
        backgroundColor: "#F55555",
        borderTopLeftRadius: 50,
        padding: 30,
    },
    footerIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    footerBoxFlex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logoutBtn: {
        marginTop: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutBox: {
        width: 150,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        backgroundColor: "#1F618D",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
        borderRadius: 25,
    },
    propileImage: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 100,
    }
})
export default Profile;