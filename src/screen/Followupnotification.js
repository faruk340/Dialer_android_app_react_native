import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, BackHandler, NativeModules, Modal, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FollowupLastdialcall from '../component/FollowupLastdialcall';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const { CalendarModule } = NativeModules;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Followupnotification = ({ route, navigation }) => {
    const [emptyState, setemptyState] = useState(false);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const [isModalVisible, setisModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const followupnotificationData = route.params.followupnotificationData;
    const MemberDetails = route.params.MemberDetails;
    const modStatus = route.params.modStatus;

    const toggleModalLastcallModel = () => {
        setModalVisible(true)
        setTimeout(setisModalVisible, 8000)
    };
    const closeLastCall = () => {
        setisModalVisible(false)
    }
    const UrgeWithPleasureComponent = () => {
        CalendarModule.dialNumber(selectesNumber);
    }
    var selectesNumber;
    var selectesCustomerName;
    useEffect(() => {
        if (selectesNumber === undefined) {
            setemptyState(true)
        }
    })
    return (
        <View style={styles.container}>

            {/* ================================================================================ */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.CallhistoryScrollview}
            >
                {
                    followupnotificationData.map((ele, index) => {
                        selectesNumber = ele.customer_mob_no
                        selectesCustomerName = ele.customer_name
                        return (
                            <View style={styles.CallhistoryCardviewContainer} key={index}>
                                <View style={styles.CallhistoryCardview}>
                                    <View style={styles.CallStatus}>
                                        <Text style={{ color: "#fff", fontSize: 20 }}>{ele.customer_name}</Text>
                                        <Text style={{ color: "#fff" }}>{ele.customer_mob_no}</Text>
                                        <Text style={{ color: "#fff" }}>{ele.op3}</Text>
                                        <Text style={{ color: "#fff" }}>{ele.reminder_date}</Text>
                                        <Text style={{ color: "#fff" }}>{ele.reminder_remark}</Text>
                                    </View>
                                    {/* <Text style={{ color: "#fff" }}>Kolkata</Text> */}
                                    <View style={styles.CallhistoryIcon}>
                                        <TouchableOpacity style={[styles.CallhistoryIconBtn, styles.CallhistoryIconBtn1]}
                                            // onPress={() => CalendarModule.dialNumber(ele.customer_mob_no)}
                                            onPress={toggleModalLastcallModel}
                                        >
                                            <MaterialIcons name='call' size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.modalView}>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                    // onRequestClose={() => {
                                    //     Alert.alert("Modal has been closed.");
                                    //     setModalVisible(!modalVisible);
                                    // }}
                                    >
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                        // onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}></Text>
                                        </Pressable>
                                        <View style={styles.countDown}>
                                            <CountdownCircleTimer
                                                isPlaying={true}
                                                duration={5}
                                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                colorsTime={[7, 5, 2, 0]}
                                                onComplete={() => {
                                                    UrgeWithPleasureComponent();
                                                    // do your stuff here
                                                    // const args = {
                                                    //     number: '9093900003', // String value with the number to call
                                                    //     prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                                    // }

                                                    // call(args).catch(console.error)
                                                    return setModalVisible(!modalVisible);
                                                }}
                                            >
                                                {({ remainingTime }) => <Text style={{ fontSize: 50, color: "#fff" }}>{remainingTime}</Text>}
                                            </CountdownCircleTimer>
                                        </View>
                                    </Modal>
                                </View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={isModalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setisModalVisible(!isModalVisible);
                                    }}
                                >
                                    <FollowupLastdialcall
                                        passData={closeLastCall}
                                        // customerLastCallDetails={customerLastCallDetails}
                                        // numberpickep={numberpickep}
                                        toggleModalLastcallModel={toggleModalLastcallModel}
                                        // passSaveDataEvents={skipForwardEvents}
                                        followupnotificationData={followupnotificationData}
                                        selectesCustomerName={selectesCustomerName}
                                        selectesNumber={selectesNumber}
                                        // skip={skip}
                                        MemberDetails={MemberDetails}
                                        modStatus={modStatus}
                                    />
                                </Modal>
                            </View>
                        )
                    })
                }
            </ScrollView>
            {
                emptyState &&
                <View style={styles.emptySymbol}>
                    <Image
                        style={{ width: 300, height: 300 }}
                        source={require('../images/empty_notification.png')}
                    />

                </View>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        width: "100%",
    },
    inputContainer: {
        marginTop: 15,
        marginBottom: 10,
        width: "90%",
    },
    AutocompleteDropdownStyle: {
        zIndex: 99
    },
    sortFilter: {
        marginTop: 10,
        paddingBottom: 15,
        width: "95%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sort: {
        width: 110,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        justifyContent: "space-around",
        backgroundColor: "#F55555",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
    },
    CallhistoryScrollview: {
        width: "100%"
    },
    CallhistoryCardviewContainer: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0
    },
    CallhistoryCardview: {
        marginTop: 15,
        width: "95%",
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#001e3c",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 13,
    },
    CallStatus: {
        paddingTop: 7,
        paddingBottom: 7,
        // display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
    },
    CallhistoryIcon: {
        // paddingTop: 15,
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-around",
    },
    CallhistoryIconBtn: {
        width: 50,
        height: 50,
        borderRadius: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13
    },
    CallhistoryIconBtn1: {
        backgroundColor: "#130CB7",
    },
    CallhistoryIconBtn2: {
        backgroundColor: "#075E54",
    },
    CallhistoryIconBtn3: {
        backgroundColor: "#130CB7",
    },
    CallhistoryIconBtn4: {
        backgroundColor: "#8C1BAB",
    },
    CallLaterText: {
        width: 100,
        padding: 3,
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13

    },
    countDown: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: windowHeight,
        backgroundColor: "rgba(52,52,52,0.8)",
        position: "absolute",
    },
    emptySymbol: {
        display: "flex",
        width: "100%",
        height: windowHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
})
export default Followupnotification;