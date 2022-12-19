import React, { useState } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ScrollView, NativeModules, Linking, Modal, Dimensions, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useValidation } from 'react-native-form-validator';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { CustomerCreateModule } = NativeModules;
const { CalendarModule } = NativeModules;
const FollowupLastdialcall = (props) => {

    // =================================Data access for Lastdialcall =============================
    const [lastdialcallDataState, setlastdialcallDataState] = useState([])
    const MemberDetails = props.MemberDetails;
    const [dataRemark, setRemark] = useState()
    // const skip = props.skip;
    const followupnotificationData = props.followupnotificationData;
    const selectesNumber = props.selectesNumber;
    const selectesCustomerName = props.selectesCustomerName;

    // =================================================FollowupLastdialcall Status================
    const modStatus = props.modStatus;

    // const searchStatus = modStatus.map((ele, index) => {
    //     return {
    //         id: index,
    //         name: ele.status_name,
    //     }
    // })
    const searchStatus = modStatus.map((ele, index) => { return ele.status_name })

    // ========================================================
    var newfollowupnotificationData;
    followupnotificationData.forEach((ele, index) => {
        if (ele.customer_mob_no === selectesNumber && ele.customer_name === selectesCustomerName)
            newfollowupnotificationData = ele
    })


    // ================================= Lastdialcall save date for function =============================
    const dataSaveEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Status Is Saved',
        });
    }
    const dataNotSaveEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Status Not Saved',
        });
    }
    const [newvisible, setnewVisible] = useState(false);
    const dataSaveEvent = () => {
        setnewVisible(true)
        validate({
            selectedItems: { required: true },
        });
        if (selectedItems.name !== "") {
            // props.passSaveDataEvents();
            props.passData();
            const lastdialcallData = followupnotificationData.map((ele, index) => {
                return {
                    // ...ele,
                    customer_location: ele.customer_location,
                    customer_contact_no: ele.customer_mob_no,
                    customer_name: ele.customer_name,
                    customer_whatsapp_no: ele.customer_whatsapp_no,
                    listid: ele.list_id,
                    list_name: ele.list_name,
                    cmpid: MemberDetails.cmpid,
                    status: selectedItems.name,
                    remark: dataRemark,
                    member_id: MemberDetails.member_id,
                    member_name: MemberDetails.member_name,
                    member_location: MemberDetails.member_location,
                    member_mob_no: MemberDetails.member_mob_no,
                    member_skip_call: MemberDetails.member_skip_call,
                    op1: ele.op1,
                    op2: ele.op2,
                    op3: ele.op3,
                    op4: ele.op4,
                }
            })
            CustomerCreateModule.createRemaksResponseup(JSON.stringify(lastdialcallData))
                .then((res) => {
                    // setloading(false)

                    if (res) {
                        console.log("Res:" + res);
                        dataSaveEventToast()
                    }
                    else {
                        dataNotSaveEventToast()
                        //setloading(false)
                    }
                    // setloading(false)
                })
                .catch((e) => {
                    console.error(e);
                    // alert("Your contact is not created");
                });
            setlastdialcallDataState(lastdialcallData)
        }
    }
    // ==================================================================================
    const [selectedItems, setSelectedItems] = useState({ id: 1, name: '' });

    // ======================================= Lastdialcall Data ========================

    const customerLastCallDetails = props.customerLastCallDetails;

    // ========================================Redial Number========================================
    const numberpickep = props.numberpickep;

    const [isFocused, setState] = useState(false);
    const handleFocus = () => setState(true)
    const handleBlur = () => setState(false)

    const closeLastCall = () => {
        // props.passSaveDataEvents();
        props.passData();
    }
    // ====================================open WhatsApp========================

    const [whatsappmsg, setWhatsappmsg] = useState({
        mobileNo: numberpickep,
        message: "Go software",
    })
    const openWhatsApp = () => {
        let msg = whatsappmsg.message;
        let mobile = whatsappmsg.mobileNo;
        if (mobile) {
            if (msg) {
                let url =
                    "whatsapp://send?text=" +
                    whatsappmsg.message +
                    "&phone=91" +
                    whatsappmsg.mobileNo;
                Linking.openURL(url)
                    .then(data => {
                        console.log("WhatsApp Opened successfully " + data);
                    })
                    .catch(() => {
                        alert("Make sure WhatsApp installed on your device");
                    });
            } else {
                alert("Please enter message to send");
            }
        } else {
            alert("Please enter mobile no");
        }
    };

    // const openWhatsApp = () => {
    //     alert("Wellcome To Dialer App")
    // }

    // ===============================Appinment Input Field Data================================
    const appinmentSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Appointment Submit Done',
            position: "bottom"
        });
    }
    const appinmentNotSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Appointment Submit Not Done',
            position: "bottom"
        });
    }

    const [appo_date_time, setappo_date_time] = useState("")
    const [appo_time, setappo_time] = useState("")
    const [appo_purpose, setappo_purpose] = useState("")
    const [appo_status, setappo_status] = useState("")
    const [cus_name, setCus_name] = useState("")
    const [cus_phone, setCus_phone] = useState("")
    const [rem_date, setrem_date] = useState("")
    const [rem_time, setrem_time] = useState("")
    const [rem_remarks, setrem_remarks] = useState("")
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: {
                appo_date_time, cus_name, rem_date, dataRemark
            },
        });

    const [isappointmentDatePickerVisible, setappointmentDatePickerVisibility] = useState(false);
    const [isappointmentTimePickerVisible, setappointmentTimePickerVisibility] = useState(false);
    const [appinmentDateState, setappinmentDataState] = useState(new Date());
    const [appinmentTimeState, setappinmentTimeState] = useState(new Date());

    const showDateappointmentPicker = () => {
        setappointmentDatePickerVisibility(true);
    };

    const showTimeappointmentPicker = () => {
        setappointmentTimePickerVisibility(true);
    };

    const hideappointmentDatePicker = () => {
        setappointmentDatePickerVisibility(false);
    };

    const hideappointmentTimePicker = () => {
        setappointmentTimePickerVisibility(false);
    };

    const handleappointmentDateConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        handledate(date)
        setappinmentDataState(date)
        hideappointmentDatePicker();
    };

    const handleappointmentTimeConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setappinmentTimeState(date)
        handletime(date)
        hideappointmentTimePicker();
    };



    const [appinmentModalVisible, setAppinmentModalVisible] = useState(false);
    const appinmentPurpose = ["Meet Client", "Call Client", "Collect Premium", "Other"]
    const appinmentStatus = ["Won", "Lost", "Pending", "Reschedule"]

    const [appinmentData, setAppinmentData] = useState({})

    // const [appinmentSkipData, setappinmentSkipData] = useState([])

    var appinmentSkipData;

    followupnotificationData.forEach((ele, index) => {
        appinmentSkipData = ele
    })


    const handleName = (data) => {
        setAppinmentData({
            customer_name: appinmentSkipData.customer_name,
        });
    }

    const handlephone_number = (data) => {
        setAppinmentData({
            ...appinmentData,
            customer_mob_no: appinmentSkipData.customer_mob_no,
        });
    }

    const handlewhatsapp_number = (data) => {
        setAppinmentData({
            ...appinmentData,
            customer_whatsapp_no: data ? data : "NA",
        });
        // setcus_whatsapp_no(data)
    }
    const handleLocation = (data) => {
        setAppinmentData({
            ...appinmentData,
            customer_location: appinmentSkipData.customer_location,
        });
    }

    const handledate = (data) => {
        setAppinmentData({
            ...appinmentData,
            appointment_date_time: data,
        });
        setappo_date_time(data)
    }

    const handletime = (data) => {
        setAppinmentData({
            ...appinmentData,
            app_time: data,
        });
        setappo_time(data)
    }
    const handlePurpose = (data) => {
        setAppinmentData({
            ...appinmentData,
            appointment_purpose: data,
        });
        setappo_purpose(data)
    }

    const handleStatus = (data) => {
        setAppinmentData({
            ...appinmentData,
            appointment_status: data,
        });
        setappo_status(data)
    }

    const handleRemark = (data) => {
        setAppinmentData({
            ...appinmentData,

            appointment_remarks: data ? data : "NA",
        });
    }

    const appinmentSubmitEvent = () => {
        validate({
            appo_date_time: { required: true },
            appo_time: { required: true },
            appo_purpose: { required: true },
            appo_status: { required: true }
        });
        if (appo_date_time !== "" && appo_time !== "" && appo_purpose !== "" && appo_status !== "") {
            const newappinmentData = followupnotificationData.map((ele, index) => {
                return {
                    ...ele,
                    customer_whatsapp_no: appinmentData.customer_whatsapp_no ? appinmentData.customer_whatsapp_no : "NA",
                    appointment_date_time: appinmentData.appointment_date_time ? appinmentData.appointment_date_time : appinmentDateState,
                    app_time: appinmentData.app_time ? appinmentData.app_time : appinmentDateState,
                    appointment_purpose: appinmentData.appointment_purpose ? appinmentData.appointment_purpose : "NA",
                    appointment_status: appinmentData.appointment_status ? appinmentData.appointment_status : "NA",
                    appointment_remarks: appinmentData.appointment_remarks ? appinmentData.appointment_remarks : "NA",
                    cmpid: MemberDetails.cmpid ? MemberDetails.cmpid : "NA",
                    member_id: MemberDetails.member_id ? MemberDetails.member_id : "NA",
                    member_name: MemberDetails.member_name ? MemberDetails.member_name : "NA",
                    member_location: MemberDetails.member_location ? MemberDetails.member_location : "NA",
                    member_skip_call: MemberDetails.member_skip_call ? MemberDetails.member_skip_call : "NA",
                }

            })

            CustomerCreateModule.createAppointment(JSON.stringify(newappinmentData))
                .then((res) => {
                    // setloading(false)

                    if (res) {
                        console.log("Res:" + res);
                        appinmentSubmitEventToast()
                    }
                    else {
                        appinmentNotSubmitEventToast()
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
            console.log(newappinmentData)
            setAppinmentModalVisible(false)
            alert("Your Data Is Saved")
        }
    }

    // ============================================== Add To Contact===========================================
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

    const [createContactModalVisible, setcreateContactModalVisible] = useState(false);

    const [createContact, setcreateContact] = useState({})


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
        validate({
            cus_name: { required: true },
            cus_phone: { required: true },
        });
        if (cus_name !== "" && cus_phone !== "") {

        }
        // console.log(createContact)
        const newContactData = followupnotificationData.map((ele, index) => {
            return {
                customer_name: createContact.customer_name ? createContact.customer_name : "NA",
                customer_contact_no: createContact.customer_contact_no ? createContact.customer_contact_no : "NA",
                customer_whatsapp_no: createContact.customer_whatsapp_no ? createContact.customer_whatsapp_no : "NA",
                customer_Location: createContact.customer_Location ? createContact.customer_Location : "NA",
                insurance_exp_date: createContact.insurance_exp_date ? createContact.insurance_exp_date : "NA",
                reg_no: createContact.reg_no ? createContact.reg_no : "NA",
                make_model: createContact.make_model ? createContact.make_model : "NA",
                yom: createContact.yom ? createContact.yom : "NA",
                cmpid: MemberDetails.cmpid ? MemberDetails.cmpid : "NA",
                list_id: ele.list_id ? ele.list_id : "NA",
                list_name: ele.list_name ? ele.list_name : "NA",
                id: MemberDetails.member_id ? MemberDetails.member_id : "NA",
            }
        })

        CustomerCreateModule.createCustomer(JSON.stringify(newContactData))
            .then((res) => {

                if (res) {
                    console.log("Res:" + res);
                    createContactSubmitEventToast()
                }
                else {
                    createContactNotSubmitEventToast()
                }
            })
            .catch((e) => {
                console.error(e);
            });
        setcreateContactModalVisible(false)
    }


    // ============================================== follow up ===========================================
    const followUpDataSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'FollowUp Done',
            position: "bottom"
        });
    }
    const followUpDataNotSubmitEventToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'FollowUp Not Done',
            position: "bottom"
        });
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
        followUpdate(date)
        setflollowUpDataState(date)
        hideFollowUpDatePicker();
    };

    const handleFollowUpTimeConfirm = (date) => {
        setflollowUpTimeState(date)
        followUptime(date)
        hideFollowUpTimePicker();
    };

    const [followUpModalVisible, setfollowUpModalVisible] = useState(false);

    const [followUpData, setfollowUpData] = useState({})

    const followUpName = (data) => {
        setfollowUpData({
            customer_name: data ? data : "NA",
        });
    }

    const followUpphone_number = (data) => {
        setfollowUpData({
            ...followUpData,
            customer_mob_no: data ? data : "NA",
        });
    }

    const followUpwhatsapp_number = (data) => {
        setfollowUpData({
            ...followUpData,
            customer_whatsapp_no: data ? data : "NA",
        });
    }
    const followUpLocation = (data) => {
        setfollowUpData({
            ...followUpData,
            customer_location: data ? data : "NA",
        });
    }

    const followUpdate = (data) => {
        setfollowUpData({
            ...followUpData,
            reminder_date: data,
        });
        setrem_date(data)
    }

    const followUptime = (data) => {
        setfollowUpData({
            ...followUpData,
            reminder_time: data,
        });
        setrem_time(data)
    }

    const followUpRemark = (data) => {
        setfollowUpData({
            ...followUpData,
            reminder_remarks: data ? data : "NA",
        });
        setrem_remarks(data)
    }

    const followUpDataSubmitEvent = () => {
        validate({
            rem_date: { required: true },
            rem_time: { required: true },
            rem_remarks: { required: true },
        });
        if (rem_date !== "" && rem_time !== "" && rem_remarks !== "") {
            const newFollowUpData = followupnotificationData.map((ele, index) => {
                return {
                    ...ele,
                    ...followUpData,
                    cmpid: MemberDetails.cmpid ? MemberDetails.cmpid : "NA",
                    member_name: MemberDetails.member_name ? MemberDetails.member_name : "NA",
                    member_location: MemberDetails.member_location ? MemberDetails.member_location : "NA",
                    member_mob_no: MemberDetails.member_mob_no ? MemberDetails.member_mob_no : "NA",
                    member_skip_call: MemberDetails.member_skip_call ? MemberDetails.member_skip_call : "NA",
                    appinment_date: "",
                    appinment_time: "",
                    member_id: MemberDetails.member_id ? MemberDetails.member_id : "NA",
                    reminder_status: "reminder"
                }
            })
            CustomerCreateModule.createFollowup(JSON.stringify(newFollowUpData))
                .then((res) => {
                    if (res) {
                        console.log("Res:" + res);
                        followUpDataSubmitEventToast()
                    }
                    else {
                        followUpDataNotSubmitEventToast()
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
            setfollowUpModalVisible(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.closeBtn}>
                <TouchableOpacity
                    onPress={closeLastCall}
                    style={styles.CrossBtnStyle}
                >
                    <Entypo name='cross' size={20} color="#fff" />
                </TouchableOpacity>
                <View style={styles.arrowCrossBtn}>
                    <MaterialIcons name='arrow-drop-up' size={35} color="#000" />
                </View>
            </View>
            <View style={{ backgroundColor: "rgba(52,52,52,0.3)", height: 60, width: "100%", position: "relative", zIndex: 0, marginBottom: 10 }}>
                <View style={styles.headerProfile}>
                    <TouchableOpacity style={styles.saveBtn}
                        onPress={dataSaveEvent}
                    >
                        <Text style={{ color: "#fff" }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* ================================================================================================== */}
            <View style={styles.inputContainer}>
                <SelectDropdown
                    data={searchStatus}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                        setSelectedItems(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    // renderDropdownIcon={setappinmentDropdownIconFun}
                    dropdownIconPosition="right"
                    defaultButtonText="Select Status"
                    buttonStyle={{ width: "100%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", borderRadius: 6 }}
                    buttonTextStyle={{ textAlign: "left", width: "100%" }}
                />
                {newvisible && <Text style={{ color: "red", paddingLeft: 5 }}>This Field Is Mandatory</Text>}
            </View>
            <TextInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[styles.input, {
                    borderColor: isFocused
                        ? '#4C83FF'
                        : '#000',
                    borderWidth: isFocused ? 3 : 1,
                }]}
                onChangeText={(remark) => setRemark(remark)}
                value={dataRemark}
                placeholder="Remark"
                keyboardType="default"
                placeholderTextColor='#000'

            />
            {/* ========================user-info=================================================== */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* <Text style={styles.listItemText}>List Name</Text> */}
                    <View style={styles.listBoder}>
                        <View style={styles.userInfoSection}>
                            <View style={styles.userInfo}>
                                <View style={styles.userInfoIcon}>
                                    <Feather name='user' size={40} color="#fff" />
                                </View>
                                <View style={styles.userInfoDetails}>
                                    <View>
                                        <Text style={{ fontSize: 16, color: "#fff", paddingLeft: 3, paddingBottom: 5 }}>{newfollowupnotificationData.customer_name}</Text>
                                    </View>
                                    <View style={styles.userInfoDetailsIcon}>
                                        <Feather name='smartphone' size={25} color="#fff" />
                                        <Text style={[styles.white, styles.fontOne]}>{newfollowupnotificationData.customer_mob_no}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* ===================================list-item========================== */}

                        <View style={[styles.listItemContainer]}>
                            <View style={styles.listItems}>
                                <View style={styles.listItem}>
                                    <FontAwesome name='whatsapp' color="#fff" size={20} />
                                    <Text style={[styles.itemValue, styles.fontOne]}> {newfollowupnotificationData.customer_whatsapp_no}</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <EvilIcons name='location' color="#fff" size={30} style={{ marginLeft: -6 }} />
                                    <Text style={[styles.itemValue, styles.fontOne, { marginLeft: -6 }]}> {newfollowupnotificationData.customer_location}</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <FontAwesome5 name='car' color="#fff" size={20} />
                                    <Text style={[styles.itemValue, styles.fontOne]}> {newfollowupnotificationData.op1}</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Fontisto name='date' color="#fff" size={20} />
                                    <Text style={[styles.itemValue, styles.fontOne]}> {newfollowupnotificationData.op3}</Text>
                                </View>
                                <View style={[styles.listItem]}>
                                    <MaterialCommunityIcons name='update' color="#fff" size={25} />
                                    <Text style={[styles.itemValue, styles.fontOne]}> {newfollowupnotificationData.op4}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View >
                <View style={styles.quickActionContainer}>
                    <View style={styles.quickAction}>
                        <TouchableOpacity style={styles.callStatusBox}
                            onPress={() => props.toggleModalLastcallModel()}
                        >
                            <MaterialIcons name='call' size={20} color="red" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Re Dial</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callStatusBox}
                            onPress={openWhatsApp}
                        >
                            <FontAwesome name='whatsapp' size={20} color="yellow" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Whatsapp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callStatusBox}
                            onPress={() => setAppinmentModalVisible(true)}
                        >
                            <FontAwesome name='calendar' size={20} color="blue" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Appointment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.callStatusBox}
                            onPress={() => setfollowUpModalVisible(true)}
                        >
                            <Entypo name='address' size={20} color="#fff" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Follow Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callStatusBox}
                            onPress={() => setcreateContactModalVisible(true)}
                        >
                            <Ionicons name='person-add-sharp' size={20} color="#fff" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Create Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.callStatusBox}>
                            <Entypo name='v-card' size={20} color="#fff" />
                            <Text style={{ paddingTop: 5, color: "#fff" }}>Business Card</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* ============================================Appinment Modal============================================== */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={appinmentModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setAppinmentModalVisible(!appinmentModalVisible);
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerappointmentInputField}>
                        <View style={styles.appointmentInputField}>
                            <Text style={{ fontSize: 20, textAlign: "center", margin: 15 }}>Appoinment</Text>

                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Customer Name :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={handleName}
                                    placeholder="Enter Customer Name"
                                    allowFontScaling={true}
                                    value={appinmentSkipData.customer_name}
                                    underlineColorAndroid="transparent"

                                />
                            </View>

                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Phone Number :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={handlephone_number}
                                    value={appinmentSkipData.customer_mob_no}
                                    placeholder="Enter Phone Number"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Whatsapp Number :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={handlewhatsapp_number}
                                    value={appinmentData.whatsapp_number}
                                    placeholder="Enter Whatsapp Number"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Location :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={handleLocation}
                                    value={appinmentSkipData.customer_location}
                                    placeholder="Location"

                                />
                            </View>
                            <View style={[styles.inputLabelDateTime]}>
                                <View style={styles.inputDate}>
                                    <Text style={styles.inputLabelText}>Appointment Date : </Text>
                                    <Button title={appinmentDateState.toLocaleDateString()} onPress={showDateappointmentPicker} />
                                    <DateTimePickerModal
                                        isVisible={isappointmentDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleappointmentDateConfirm}
                                        onCancel={hideappointmentDatePicker}
                                    />
                                    <Text style={{ color: "red" }}>{getErrorMessages()}</Text>
                                </View>
                                <View style={styles.inputTime}>
                                    <Text style={styles.inputLabelText}>Appointment Time :</Text>
                                    <Button title={appinmentTimeState.toLocaleTimeString()} onPress={showTimeappointmentPicker} />
                                    <DateTimePickerModal
                                        isVisible={isappointmentTimePickerVisible}
                                        mode="time"
                                        onConfirm={handleappointmentTimeConfirm}
                                        onCancel={hideappointmentTimePicker}
                                    />
                                    <Text style={{ color: "red" }}>{getErrorMessages()}</Text>
                                </View>
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Entypo name='select-arrows' color="#000" size={20} style={styles.appintmentrdropdownIcon1} />
                                <SelectDropdown
                                    data={appinmentPurpose}
                                    onSelect={(selectedItem, index) => {
                                        // console.log(selectedItem, index)
                                        handlePurpose(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    defaultButtonText="Select Purpose"
                                    buttonStyle={{ width: "100%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", borderRadius: 6 }}
                                    buttonTextStyle={{ textAlign: "left", width: "100%", }}
                                />
                                <Text style={{ color: "red" }}>{getErrorMessages()}</Text>
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Entypo name='select-arrows' color="#000" size={20} style={styles.appintmentrdropdownIcon2} />
                                <SelectDropdown
                                    data={appinmentStatus}
                                    onSelect={(selectedItem, index) => {
                                        // console.log(selectedItem, index)
                                        handleStatus(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    // renderDropdownIcon={setappinmentDropdownIconFun}
                                    dropdownIconPosition="right"
                                    defaultButtonText="Select Status"
                                    buttonStyle={{ width: "100%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", borderRadius: 6 }}
                                    buttonTextStyle={{ textAlign: "left", width: "100%" }}
                                />
                                <Text style={{ color: "red" }}>{getErrorMessages()}</Text>
                            </View>
                            <View style={styles.inputLabelOne}>
                                <TextInput
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    style={styles.appointmentInput}
                                    onChangeText={handleRemark}
                                    value={appinmentData.Remark}
                                    placeholder="Remark"
                                    keyboardType="default"
                                    placeholderTextColor='#bbb'

                                />
                            </View>
                            <View style={styles.appinmentBtn}>
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={() => setAppinmentModalVisible(false)}
                                >
                                    <Text style={{ color: "#fff" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={appinmentSubmitEvent}
                                >
                                    <Text style={{ color: "#fff" }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>


            {/* =========================================Create Contact Modal========================== */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={createContactModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setcreateContactModalVisible(!createContactModalVisible);
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerCreateContactInputField}>
                        <View style={styles.appointmentInputField}>
                            <Text style={{ fontSize: 20, textAlign: "center", margin: 15 }}>Add To Contact</Text>

                            <View style={styles.inputLabelOne}>
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

                            <View style={styles.inputLabelOne}>
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
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={() => setcreateContactModalVisible(false)}
                                >
                                    <Text style={{ color: "#fff" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={createContactSubmitEvent}
                                >
                                    <Text style={{ color: "#fff" }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            {/* =========================================Follow Up Modal========================== */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={followUpModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setfollowUpModalVisible(!followUpModalVisible);
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerFollowUpInputField}>
                        <View style={styles.appointmentInputField}>
                            <Text style={{ fontSize: 20, textAlign: "center", margin: 15 }}>Follow Up</Text>

                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Customer Name :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={followUpName}
                                    placeholder="Enter Customer Name"
                                    allowFontScaling={true}
                                    value={appinmentSkipData.customer_name}
                                    underlineColorAndroid="transparent"

                                />
                            </View>

                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Phone Number :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={followUpphone_number}
                                    value={appinmentSkipData.customer_mob_no}
                                    placeholder="Enter Phone Number"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Enter Whatsapp Number :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={followUpwhatsapp_number}
                                    value={appinmentData.whatsapp_number}
                                    placeholder="Enter Whatsapp Number"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.inputLabelDateTime}>
                                <View style={styles.inputDate}>
                                    <Text style={styles.inputLabelText}>Reminder Date :</Text>

                                    <Button title={flollowUpDateState.toLocaleDateString()} onPress={showDateFollowUpPicker} />
                                    <DateTimePickerModal
                                        isVisible={isFollowUpDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleFollowUpDateConfirm}
                                        onCancel={hideFollowUpDatePicker}
                                    />
                                    <Text style={{ color: "red", paddingLeft: 2 }}>{getErrorMessages()}</Text>
                                </View>
                                <View style={styles.inputTime}>
                                    <Text style={styles.inputLabelText}>Reminder Time :</Text>
                                    <Button title={flollowUpTimeState.toLocaleTimeString()} onPress={showTimeFollowUpPicker} />
                                    <DateTimePickerModal
                                        isVisible={isFollowUpTimePickerVisible}
                                        mode="time"
                                        onConfirm={handleFollowUpTimeConfirm}
                                        onCancel={hideFollowUpTimePicker}
                                    />
                                    <Text style={{ color: "red", paddingLeft: 2 }}>{getErrorMessages()}</Text>
                                </View>
                            </View>
                            <View style={styles.inputLabelOne}>
                                <Text style={styles.inputLabelText}>Location :</Text>
                                <TextInput
                                    style={styles.appointmentInput}
                                    onChangeText={followUpLocation}
                                    value={appinmentSkipData.customer_location}
                                    placeholder="Location"
                                />
                            </View>
                            <View style={styles.inputLabelOne}>
                                <TextInput
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    style={styles.appointmentInput}
                                    onChangeText={followUpRemark}
                                    value={followUpData.Remark}
                                    placeholder="Remark"
                                    keyboardType="default"
                                    placeholderTextColor='#bbb'

                                />
                                <Text style={{ color: "red", paddingLeft: 5 }}>{getErrorMessages()}</Text>
                            </View>
                            <View style={[styles.appinmentBtn, { marginTop: 25 }]}>
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={() => setfollowUpModalVisible(false)}
                                >
                                    <Text style={{ color: "#fff" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.appiBtn}
                                    onPress={followUpDataSubmitEvent}
                                >
                                    <Text style={{ color: "#fff" }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Toast
                topOffset={1}
                bottomOffset={1}
            />
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
    headerProfile: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#001e3c",
        color: "#fff",
        width: "100%",
        height: 60,
        paddingLeft: 5,
        paddingRight: 20,
        marginBottom: 20,
        marginTop: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 9,
    },
    closeBtn: {
        position: "relative",
        width: "100%",
        paddingTop: 15,
        height: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(52,52,52,0.3)",
        zIndex: 9,
    },
    CrossBtnStyle: {
        // borderWidth: 1,
        // borderColor: "#fff",
        width: 25,
        height: 25,
        borderRadius: 50,
        padding: 2,
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    arrowCrossBtn: {
        position: "absolute",
        bottom: "-240%",
        left: "45%",
    },
    saveBtn: {
        width: 70,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        backgroundColor: "#f5576c",
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
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
    // fontOne: {
    //     fontSize: 18
    // },
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
        borderBottomLeftRadius: 8
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
        marginTop: 15,
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 8,
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
        zIndex: -9999,
        borderRadius: 15,
        backgroundColor: "blue",
        opacity: 0.1
    },
    listItemText: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#001e3c",
        marginTop: 10,
        textAlign: "center",
        fontSize: 16,
        color: "#000",
        padding: 7,
        marginBottom: 20,
        borderRadius: 10
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
        paddingLeft: 18,
        color: "#fff"
    },
    inputContainer: {
        marginTop: 20,
        width: "95%",
    },
    input: {
        width: "92%",
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 15,
        borderRadius: 6,
        color: "#000",
    },
    quickActionContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    quickAction: {
        marginTop: 25,
        width: "95%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },

    callStatusBox: {
        width: "32%",
        height: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginBottom: 5,
        backgroundColor: "#001e3c",
        borderRadius: 8,
    },
    outerappointmentInputField: {
        width: windowWidth,
        height: "150%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
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
    inputLabelDateTime: {
        marginBottom: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputDate: {
        width: "48%"
    },
    inputTime: {
        width: "48%"
    },
    appinmentBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    appiBtn: {
        marginTop: 5,
        width: 150,
        height: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8C1BAB",
        borderRadius: 25
    },
    fromdatePickerStyle: {
        width: 185,
        marginRight: 20,
    },
    appintmentrdropdownIcon1: {
        position: "absolute",
        right: 10,
        top: 13,
        zIndex: 5,
    },
    appintmentrdropdownIcon2: {
        position: "absolute",
        right: 10,
        top: 13,
        zIndex: 5,
    }
});

export default FollowupLastdialcall;
