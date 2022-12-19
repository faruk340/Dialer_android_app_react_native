import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, BackHandler } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CountUp } from 'use-count-up';
const Report = ({ route, navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const callReportData = route.params.callReportData;
    const callDoneData = route.params.callDoneData;

    const [reportcallDone, setreportcallDone] = useState(0)
    const [reportCallLeads, setreportCallLeads] = useState(0)
    const [reportSkipCall, setreportSkipCall] = useState(0)
    const [reportFollowUp, setreportFollowUp] = useState(0)

    const countStart = () => {
        // const reportStartDate = flollowUpDateState.toLocaleDateString()
        // const reportEndDate = flollowUpTimeState.toLocaleDateString()

        let callDone = callDoneData.filter(data => {
            return (
                new Date(data.createdAt).getTime() <= flollowUpDateState && new Date(data.createdAt).getTime() <= flollowUpTimeState
            )

        })
        setreportcallDone(callDone.length)

        // ===============================================================================

        let callLeads = callReportData.filter(data => {
            return (
                new Date(data.createdAt).getTime() <= flollowUpDateState && new Date(data.createdAt).getTime() <= flollowUpTimeState && data.status === "Appointment"
            )

        })
        setreportCallLeads(callLeads.length)

        // ======================================================================================

        let skipCall = callReportData.filter(data => {
            return (
                new Date(data.createdAt).getTime() <= flollowUpDateState && new Date(data.createdAt).getTime() <= flollowUpTimeState && data.status === "Skip Call"
            )

        })
        setreportSkipCall(skipCall.length)

        // ==============================================================================
        let followUp = callReportData.filter(data => {
            return (
                new Date(data.createdAt).getTime() <= flollowUpDateState && new Date(data.createdAt).getTime() <= flollowUpTimeState && data.status === "opened"
            )
        })
        setreportFollowUp(followUp.length)
    }




    const [isFollowUpDatePickerVisible, setFollowUpDatePickerVisibility] = useState(false);
    const [isFollowUpTimePickerVisible, setFollowUpTimePickerVisibility] = useState(false);

    const [flollowUpDateState, setflollowUpDataState] = useState(new Date());
    const [flollowUpTimeState, setflollowUpTimeState] = useState(new Date());

    const showDateFollowUpPicker = () => {
        setFollowUpDatePickerVisibility(true);
    };

    const showTimeFollowUpPicker = () => {
        setFollowUpTimePickerVisibility(true);
    };

    const hideFollowUpDatePicker = () => {
        setFollowUpDatePickerVisibility(false);
    };

    const hideFollowUpTimePicker = () => {
        setFollowUpTimePickerVisibility(false);
    };

    const handleFollowUpDateConfirm = (date) => {
        setflollowUpDataState(date)
        hideFollowUpDatePicker();
    };

    const handleFollowUpTimeConfirm = (date) => {
        setflollowUpTimeState(date)
        hideFollowUpTimePicker();
    };


    return (
        <View style={styles.container}>
            <View style={styles.reportCard}>
                <View style={styles.inputLabelDateTime}>
                    <View style={styles.inputDate}>
                        <Text style={[styles.inputLabelText, { paddingBottom: 10, width: 130, textAlign: "center" }]}>Start Date :</Text>

                        <Button title={flollowUpDateState.toLocaleDateString()} onPress={showDateFollowUpPicker} />
                        <DateTimePickerModal
                            isVisible={isFollowUpDatePickerVisible}
                            mode="date"
                            onConfirm={handleFollowUpDateConfirm}
                            onCancel={hideFollowUpDatePicker}
                        />
                    </View>
                    <Text>To</Text>
                    <View style={styles.inputTime}>
                        <Text style={[styles.inputLabelText, { paddingBottom: 10, width: 130, textAlign: "center" }]}>End Date :</Text>
                        <Button title={flollowUpTimeState.toLocaleDateString()} onPress={showTimeFollowUpPicker} />
                        <DateTimePickerModal
                            isVisible={isFollowUpTimePickerVisible}
                            mode="date"
                            onConfirm={handleFollowUpTimeConfirm}
                            onCancel={hideFollowUpTimePicker}
                        />

                    </View>
                </View>
                <TouchableOpacity style={styles.reportBtn} onPress={countStart}>
                    <Text style={{ textAlign: "center", padding: 15, color: "#fff", fontSize: 16 }}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.reportDynamicBox}>
                <View style={styles.reportDynamicBoxOne}>
                    <View style={styles.reportBox}>
                        <Text style={styles.reportBoxText}>
                            <CountUp isCounting end={reportcallDone} duration={3.5} onStart={countStart} />
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>Call Done</Text>
                    </View>
                    <View style={styles.reportBox}>
                        <Text style={styles.reportBoxText}>
                            <CountUp isCounting end={reportSkipCall} duration={3.5} />
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>Skip Call</Text>
                    </View>
                </View>
                <View style={styles.reportDynamicBoxTwo}>
                    <View style={styles.reportBox}>
                        <Text style={styles.reportBoxText}>
                            <CountUp isCounting end={reportCallLeads} duration={3.5} />
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>Leads</Text>
                    </View>
                    <View style={styles.reportBox}>
                        <Text style={styles.reportBoxText}>
                            <CountUp isCounting end={reportFollowUp} duration={3.5} />
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>Follow Ups</Text>
                    </View>
                </View>
            </View>
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
    reportCard: {
        width: "95%",
        marginTop: 20,
        // borderWidth: 1,
        // borderColor: '#001e3c',
        padding: 25,
        borderRadius: 15,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "110%"
    },
    inputFlexBox: {
        width: "100%",
    },
    inputLabelDateTime: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    dateFlexBox: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        // borderWidth: 1,
        // borderColor: "#001e3c",
        marginTop: 10,
        marginBottom: 30,
        // padding: 25,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    fromdatePickerStyle: {
        width: 150,
        marginRight: 20,
    },
    todatePickerStyle: {
        width: 150,
        marginLeft: 20,
    },
    inputDate: {
        marginRight: 40,
        marginBottom: 20
    },
    inputTime: {
        marginLeft: 40,
        marginBottom: 20
    },
    reportBtn: {
        width: 200,
        marginTop: 15,
        alignSelf: "center",
        borderRadius: 25,
        backgroundColor: "#001e3c"
    },
    reportDynamicBox: {
        marginTop: 50,
        width: "95%",
        height: "50%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    reportDynamicBoxOne: {
        width: "50%",
        height: "100%",
    },
    reportDynamicBoxTwo: {
        width: "50%",
        height: "100%",
    },
    reportBox: {
        width: "85%",
        height: "44%",
        borderWidth: 3,
        borderColor: "red",
        margin: 12,
        borderRadius: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001e3c",
    },
    reportBoxText: {
        fontSize: 40,
        color: "#fff"
    }

});
export default Report;