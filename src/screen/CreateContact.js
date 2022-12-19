import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, TextInput, ScrollView, NativeModules, Linking, Modal, Dimensions, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useValidation } from 'react-native-form-validator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const { CustomerCreateModule } = NativeModules;
const CreateContact = ({ route, navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const skip = route.params.skip;
    const MemberDetails = route.params.MemberDetails;

    const createContactSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Your Contact Is Created',
            position: "bottom"
        });
    }
    const createContactNotSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Your Contact Is Not Created',
            position: "bottom"
        });
    }

    // const [createContactModalVisible, setcreateContactModalVisible] = useState(false);

    const [createContact, setcreateContact] = useState({})
    // const createContact_Number = createContact.customer_contact_no;
    // const createContact_name = createContact.customer_name;


    // ===================================validation check==================================

    const [cus_name, setCus_name] = useState("")
    const [cus_phone, setCus_phone] = useState("")
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { cus_name },
        });



    const createContactName = (data) => {
        setcreateContact({
            customer_name: data ? data : "NA",
        });
        setCus_name(data)
    }

    const createContactphone_number = (data) => {
        setcreateContact({
            ...createContact,
            customer_contact_no: data ? data : "NA",
        });
        setCus_phone(data)
    }

    const createContactwhatsapp_number = (data) => {
        setcreateContact({
            ...createContact,
            customer_whatsapp_no: data ? data : "NA",
        });
    }
    const createContactLocation = (data) => {
        setcreateContact({
            ...createContact,
            customer_Location: data ? data : "NA",
        });
    }


    const createInsuranceExpireDate = (data) => {
        setcreateContact({
            ...createContact,
            insurance_exp_date: data ? data : "NA",
        });
    }



    const createVehicleRegistrationNumber = (data) => {
        setcreateContact({
            ...createContact,
            reg_no: data ? data : "NA",
        });
    }

    const createVehicleMakeAndModel = (data) => {
        setcreateContact({
            ...createContact,
            make_model: data ? data : "NA",
        });
    }

    const createVehicleYearOfManufacture = (data) => {
        setcreateContact({
            ...createContact,
            yom: data ? data : "NA",
        });
    }


    const createContactSubmitEvent = () => {
        // alert("Your contact is created")
        // console.log(createContact)
        validate({
            cus_name: { required: true },
            cus_phone: { required: true },
        });
        if (cus_name !== "" && cus_phone !== "") {
            const newContactData = skip.map((ele, index) => {
                return {
                    customer_name: createContact.customer_name ? createContact.customer_name : "NA",
                    customer_contact_no: createContact.customer_contact_no ? createContact.customer_contact_no : "NA",
                    customer_whatsapp_no: createContact.customer_whatsapp_no ? createContact.customer_whatsapp_no : "NA",
                    customer_location: createContact.customer_Location ? createContact.customer_Location : "NA",
                    ins_exp: createContact.insurance_exp_date ? createContact.insurance_exp_date : "NA",
                    reg_no: createContact.reg_no ? createContact.reg_no : "NA",
                    make_model: createContact.make_model ? createContact.make_model : "NA",
                    yom: createContact.yom ? createContact.yom : "NA",
                    cmpid: MemberDetails.cmpid ? MemberDetails.cmpid : "NA",
                    list_id: ele.list_id ? ele.list_id : "NA",
                    list_name: ele.list_name ? ele.list_name : "NA",
                    member_id: MemberDetails.member_id ? MemberDetails.member_id : "NA",
                }
            })

            CustomerCreateModule.createCustomer(JSON.stringify(newContactData))
                .then((res) => {

                    if (res) {
                        console.log("Res:" + res);
                        // alert("Your contact is created")
                        createContactSubmitEventToast()
                    }
                    else {
                        // alert("Your contact is not created");
                        createContactNotSubmitEventToast()
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
            console.log(newContactData);
        }

    }
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.outerCreateContactInputField}>
                    <View style={styles.appointmentInputField}>
                        <View style={[styles.inputLabelOne, { marginBottom: -8 }]}>
                            <Text style={styles.inputLabelText}>Enter Customer Name :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createContactName}
                                placeholder="Enter Customer Name"
                                allowFontScaling={true}
                                value={createContact.name}
                                underlineColorAndroid="transparent"

                            />
                            <Text style={{ color: "red", paddingLeft: 5 }}>{getErrorMessages()}</Text>
                        </View>

                        <View style={[styles.inputLabelOne, { marginBottom: -8 }]}>
                            <Text style={styles.inputLabelText}>Enter Phone Number :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createContactphone_number}
                                value={createContact.phone_number}
                                placeholder="Enter Phone Number"
                                keyboardType="numeric"
                            />
                            <Text style={{ color: "red", paddingLeft: 5 }}>{getErrorMessages()}</Text>
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Enter Whatsapp Number :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createContactwhatsapp_number}
                                value={createContact.whatsapp_number}
                                placeholder="Enter Whatsapp Number"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Location :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createContactLocation}
                                value={createContact.Location}
                                placeholder="Location"

                            />
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Vehicle Make And Model :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createVehicleMakeAndModel}
                                value={createContact.Vehicle_Make_And_Model}
                                placeholder="Vehicle Make And Model"

                            />
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Vehicle Registration Number :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createVehicleRegistrationNumber}
                                value={createContact.Vehicle_Registration_Number}
                                placeholder="Vehicle Registration Number"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Vehicle Year Of Manufacture :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createVehicleYearOfManufacture}
                                value={createContact.Vehicle_Year_Of_Manufacture}
                                placeholder="Vehicle Year Of Manufacture"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputLabelOne}>
                            <Text style={styles.inputLabelText}>Insurance Expire Date :</Text>
                            <TextInput
                                style={styles.appointmentInput}
                                onChangeText={createInsuranceExpireDate}
                                value={createContact.Insurance_Expire_Date}
                                placeholder="Insurance Expire Date"
                                keyboardType="numeric"

                            />
                        </View>
                        <View style={styles.appinmentBtn}>
                            {/* <TouchableOpacity style={styles.appiBtn}
                                onPress={() => setcreateContactModalVisible(false)}
                            >
                                <Text style={{ color: "#fff" }}>Close</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.appiBtn}
                                onPress={createContactSubmitEvent}
                            >
                                <Text style={{ color: "#fff" }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Toast
                topOffset={1}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        width: "100%",
    },

    outerCreateContactInputField: {
        width: windowWidth,
        height: "150%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    outerFollowUpInputField: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    appointmentInputField: {
        marginTop: 15,
        width: "95%",
        height: "100%",
        backgroundColor: "#fff"
    },
    appointmentInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#fff",
        paddingLeft: 15,
        borderRadius: 6,
        color: "#000",
        borderColor: "#000"
    },
    inputLabelOne: {
        position: "relative",
        marginBottom: 8,
        width: "100%",
    },
    inputLabelText: {
        padding: 8,
        // fontSize: 16
    },
    appinmentBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    appiBtn: {
        marginTop: 15,
        width: 200,
        height: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8C1BAB",
        borderRadius: 25
    }
});

export default CreateContact;