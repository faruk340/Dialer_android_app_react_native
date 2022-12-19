import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, ScrollView, Animated, Easing, RefreshControl, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { set } from 'react-native-reanimated';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const { CallHistoryModule } = NativeModules;
const Header = (props) => {
    const callDoneState = props.callDoneState;
    const [loading, setloading] = useState(false);
    // ======================================Followupnotification Data===========================
    // const compareId = props.compareId;



    const followupnotificationData = props.callReminder;
    // console.log("call NewReminder:", followupnotificationData);
    const lengthOfFollowupNotification = followupnotificationData.length;


    // ==================================================================================================
    // const { itemId, otherParam } = route.params;
    const MemberDetails = props.MemberDetails;
    const skip = props.skip;
    const listname = props.listname;
    const modStatus = props.modStatus;

    const CustomerTotalList = props.CustomerTotalList;

    const listlength = listname.map((len, index) => len.length)
    // const customerNewlist = listname.map((newItem, index) => newItem.map((newItemTwo, index) => newItemTwo.name))

    const skipstateUpdate = props.skipstateUpdate;

    if (skipstateUpdate >= listlength) {
        alert("Your List Has finished !! Please Select Another List")
    } else {
        // console.log("list not finished")
    }


    // const customerNewlist = listname.forEach((element, index) => element.map((elementTwo, index) => index));

    // console.log(customerNewlist)

    const navigation = useNavigation();
    const [newvisible, setnewVisible] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false);
    const customerlist = props.listname;
    // console.log(props.username);


    // ===============================================page Refresh state===============================

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // ==========================================this function define for call skip============================

    const skipFun = () => {
        setnewVisible(true);
    }
    const clickSkip = () => {
        alert("Are You Sure, You Want to Skip Your Call !!");
    }

    // const searchListOpenEvent = () => {
    //     setisModalVisible(true)
    // }

    const searchListCloseEvent = () => {
        setisModalVisible(false)
    }

    // ============================ user Details Card Animation =====================
    let opacity = new Animated.Value(0);

    const animate = easing => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            easing,
            useNativeDriver: false
        }).start();
    };

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 670]
    });

    const animatedStyles = [
        styles.box,
        {
            opacity,
            width: size,
            height: size,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }
    ];

    // ==============================================================================

    return (
        <View style={styles.container}>
            {/* =============================headerProfile======================== */}
            <View style={styles.headerProfile}>
                <View>
                    <TouchableOpacity>
                        <EvilIcons name='user' size={50} color="#fff"
                            onPress={() => { navigation.navigate('Profile', MemberDetails) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerProfileRight}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('CreateContact', { skip, MemberDetails }) }}
                    >
                        <View><MaterialIcons name='person-add-alt' size={25} color="#fff" /></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Searchlist', CustomerTotalList) }}
                    >
                        <View><MaterialCommunityIcons name='clipboard-list-outline' size={25} color="#fff" /></View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }

                    >
                        <View><EvilIcons name='refresh' size={45} color="#fff" /></View>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Followupnotification', { followupnotificationData, MemberDetails, skip, modStatus }) }}
                    >
                        {lengthOfFollowupNotification > 0 ?
                            <View style={styles.notificationCountContainer}>
                                <View style={styles.notificationCountBox}>
                                    <View style={styles.notificationCountInnerBox}>
                                        <Text style={{ color: "#fff", paddingBottom: 2, fontSize: 10 }}>{lengthOfFollowupNotification}</Text>
                                    </View>
                                </View>
                                <Ionicons style={{ position: "relative", zIndex: 1 }} name='notifications-outline' size={30} color="#fff" />
                            </View> : <Ionicons style={{ position: "relative", zIndex: 1 }} name='notifications-outline' size={30} color="#fff" />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {/* ========================user-info=================================================== */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    listname.map((newItem, index) => newItem.map((newItemTwo, index) => {
                        if (index == skipstateUpdate) {
                            // animate(Easing.bezier(0, 2, 1, -1))
                            animate(Easing.in(Easing.bounce))
                            return (
                                // <Animated.View key={index} style={[animatedStyles, { width: "125%", }]}>
                                <View key={index} style={{ width: "100%", }}>
                                    <View style={styles.listBoder}>
                                        <View style={styles.headerTextContainer}>
                                            <View style={styles.listItemText}>
                                                <Text style={styles.listNameStyle}>{newItemTwo.list_name}</Text>
                                                <View style={styles.listContent}>
                                                    <View style={styles.listText}>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            Call Done
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                textAlign: "center",
                                                                color: "#fff",
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {callDoneState.call_done}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.listText}>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            Skip Call
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                textAlign: "center",
                                                                color: "#fff",
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {callDoneState.skip_call}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.listText}>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            Leads
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                textAlign: "center",
                                                                color: "#fff",
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {callDoneState.call_leads}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.listText, { borderWidth: 0 }]}>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                color: "#fff",
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            Follow Ups
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                textAlign: "center",
                                                                color: "#fff",
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {lengthOfFollowupNotification}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.userInfoSection}>
                                            <View style={styles.userInfo}>
                                                <View style={styles.userInfoIcon}>
                                                    <Feather name='user' size={40} color="#fff" />
                                                </View>
                                                <View style={styles.userInfoDetails}>
                                                    <View>
                                                        <Text style={{ fontSize: 16, color: "#fff", paddingLeft: 3, paddingBottom: 5 }}>{newItemTwo.customer_name}</Text>
                                                    </View>
                                                    <View style={styles.userInfoDetailsIcon}>
                                                        <Feather name='smartphone' size={25} color="#fff" />
                                                        <Text style={[styles.white, styles.fontOne]}>{newItemTwo.customer_mob_no}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* ===================================list-item========================== */}

                                        <View style={[styles.listItemContainer]}>
                                            <View style={styles.listItems}>
                                                <View style={styles.listItem}>
                                                    <MaterialIcons name='double-arrow' size={15} color="#fff" style={styles.listIcon} />
                                                    <Text style={[styles.itemValue, styles.fontOne]}> {newItemTwo.customer_whatsapp_no}</Text>
                                                </View>
                                                <View style={styles.listItem}>
                                                    <MaterialIcons name='double-arrow' size={15} color="#fff" style={styles.listIcon} />
                                                    <Text style={[styles.itemValue, styles.fontOne]}> {newItemTwo.customer_location}</Text>
                                                </View>
                                                <View style={styles.listItem}>
                                                    <MaterialIcons name='double-arrow' size={15} color="#fff" style={styles.listIcon} />
                                                    <Text style={[styles.itemValue, styles.fontOne]}> {newItemTwo.op1}</Text>
                                                </View>
                                                <View style={styles.listItem}>
                                                    <MaterialIcons name='double-arrow' size={15} color="#fff" style={styles.listIcon} />
                                                    <Text style={[styles.itemValue, styles.fontOne]}> {newItemTwo.op3}</Text>
                                                </View>
                                                <View style={[styles.listItem]}>
                                                    <MaterialIcons name='double-arrow' size={15} color="#fff" style={styles.listIcon} />
                                                    <Text style={[styles.itemValue, styles.fontOne]}> {newItemTwo.op4}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={styles.listItemInnerContainer}>
                                    </View> */}
                                        </View>
                                        <View style={styles.listCounter}>
                                            <Text style={{ fontSize: 20, color: "#000" }}>{index + 1} / {listlength}</Text>
                                        </View>
                                    </View>
                                </View>
                                // </Animated.View>
                            )
                        }
                    }))
                }
            </ScrollView>
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        width: "100%",
    },
    white: {
        color: "#fff",
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
    },
    listContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
    },
    // fontOne: {
    //     fontSize: 15
    // },
    listIcon: {
        width: 30,
        height: 25,
    },
    // listText: {
    //     borderWidth: 1,
    //     borderBottomColor: "#001e3c",
    //     borderTopColor: "#001e3c",
    //     borderLeftColor: "#001e3c",
    //     borderRightColor: "#fff",
    //     padding: 10
    // },
    headerProfile: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001e3c",
        color: "#fff",
        width: "100%",
        height: 60,
        paddingLeft: 5,
        paddingRight: 10,
    },
    notificationCountBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001e3c",
    },
    headerProfileRight: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 110,
    },
    notificationCountContainer: {
        position: "relative",
        zIndex: 1
    },
    notificationCountInnerBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "red",
        width: 18,
        height: 18,
        backgroundColor: "red",
        borderRadius: 50,
        color: "#fff",
    },
    notificationCountBox: {
        position: "absolute",
        color: "#fff",
        top: -4,
        right: -4,
        zIndex: 999
    },
    userInfoSection: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
    },
    userInfo: {
        width: "95%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#f5576c",
        borderRadius: 8,
    },
    userInfoIcon: {
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001e3c",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    userInfoDetails: {
        width: "80%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 9,
        paddingBottom: 9,
    },
    userInfoDetailsIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    listBoder: {
        width: "98%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 2,
        // borderColor: "#76767d",
        // marginRight: -10,
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 8,
        marginBottom: 100,
    },
    scrollContainer: {

    },
    listItemContainer: {
        position: 'relative',
        width: "95%",
        marginTop: 25,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: "#001e3c",
        padding: 15,
        zIndex: 1,
    },
    listItemInnerContainer: {
        position: "absolute",
        bottom: "-4%",
        right: "-3%",
        width: "112%",
        height: "117%",
        // borderWidth: 1,
        // borderColor: "red",
        zIndex: -9999,
        borderRadius: 15,
        backgroundColor: "blue",
        opacity: 0.1
    },
    headerTextContainer: {
        width: "100%",
    },
    listItemText: {
        width: "100%",
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
        color: "#000",
        marginBottom: 20,
        backgroundColor: "#001e3c",
        marginTop: -10,
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    listNameStyle: {
        color: "#fff",
        textAlign: "center",
        fontSize: 22,
        borderWidth: 1,
        width: "100%",
        borderBottomColor: "#fff",
        borderTopColor: "#001e3c",
        borderLeftColor: "#001e3c",
        borderRightColor: "#001e3c",
        paddingBottom: 5

    },
    listItems: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },
    itemValue: {
        color: "#fff",
    },
    listCounter: {
        borderRadius: 8,
        marginTop: 5
    },
    skipBotton: {
        width: 150,
        marginTop: 50,
        borderWidth: 2,
        borderColor: "#f5576c",
        borderRadius: 25,
        backgroundColor: "#FFF720",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 8,
    },
    skipBottonText: {
        fontSize: 20,
        textAlign: "center",
        padding: 10
    },
    bottomView: {
        width: '106%',
        height: 70,
        // backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    buttonContainer: {
        position: "relative",
        width: "95%",
        height: 70,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderWidth: 1,
        // borderColor: "red",
        backgroundColor: "#3028c3",
        zIndex: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    callbtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        // borderWidth: 1,
        // borderColor: "red",
        padding: 5,
        borderRadius: 45,
    },
    gridbtn: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        top: "-115%",
        borderWidth: 1,
        borderColor: "red",
        padding: 5,
        borderRadius: 45,
        marginTop: 50,
        zIndex: 1,
        backgroundColor: "#fff",
        margin: 50
    },
    stepforwardbtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        // borderWidth: 1,
        // borderColor: "red",
        padding: 5,
        borderRadius: 45,
    },
    bottomIcon: {
        position: "relative",
        bottom: "-10%",
        width: "100%",
        height: 77,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderWidth: 1,
        borderColor: "red",
    },
    // skipPopup: {
    //     width: "80%",
    //     height: 90,
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingRight: 40,
    // },
});

export default Header;
