import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, NativeModules } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


const Callhistory = ({ route, navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


    const callHistoryData = route.params.callHistoryData;
    const modStatus = route.params.modStatus;

    // console.log("modStatus", typeof modStatus)


    // const obj = ["skip call", "Appointment", "reminder"]

    const newData = []
    modStatus.forEach(ele => {
        newData.push(
            ele,
            { "cmpid": "53716", "id": "61261bfd30078146c921fd61", "status_name": "Skip Call" },
            { "cmpid": "53716", "id": "61261bfd30078146c921fd61", "status_name": "Appointment" },
            { "cmpid": "53716", "id": "61261bfd30078146c921fd61", "status_name": "reminder" }
        )
    });

    const statusName = newData.map((ele, index) => ele.status_name)
    const uniqueStatus = statusName.filter((item, index) => statusName.indexOf(item) === index)
    // ======================call status for searchbar=========================

    const searchStatus = uniqueStatus.map((ele, index) => {
        return {
            id: index,
            title: ele,
        }
    })

    // console.log("searchStatus", searchStatus);
    // =============================Auto Complete Search=========================

    useEffect(() => {
        setFilteredDataSource(callHistoryData)
        setMasterDataSource(callHistoryData)
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blantitlek
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newText = text.title
            const newData = masterDataSource.filter(function (item) {
                // console.log(item.status)
                const itemData = item.status
                //     ? newText.toUpperCase()
                //     : ''.toUpperCase();
                // const textData = newText.toUpperCase();
                return itemData === newText;
            });

            setFilteredDataSource(newData);
            setSearch(newText);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    //   =====================================================

    // const [selectedItems, setSelectedItems] = useState();
    // const items = [
    //     // name key is must. It is to show the text in front
    //     { id: 1, name: 'Go Software' },
    //     { id: 2, name: 'Go Software' },
    //     { id: 3, name: 'Go Software' },
    //     { id: 4, name: 'Go Software' },
    //     { id: 5, name: 'Go Software' },
    //     { id: 6, name: 'Go Software' },
    //     { id: 7, name: 'Go Software' },
    //     { id: 8, name: 'Go Software' },
    //     { id: 9, name: 'Go Software' },
    //     { id: 10, name: 'Go Software' },
    // ];

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{ id: '2' }}
                    onSelectItem={(setSelectedItem) => searchFilterFunction(setSelectedItem)}
                    dataSet={searchStatus}
                    // onChangeText={searchFilterFunction}
                    textInputProps={{
                        placeholder: 'Search Status',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {
                            borderRadius: 8,
                            backgroundColor: '#001e3c',
                            color: '#fff',
                            paddingLeft: 18,
                            height: 50
                        },
                    }}
                    rightButtonsContainerStyle={{
                        right: 8,
                        height: 30,
                        color: "#fff",
                        alignSelf: 'center',
                    }}
                    inputContainerStyle={{
                        // backgroundColor: '#383b42',
                        backgroundColor: '#001e3c',
                        borderRadius: 8,
                    }}
                    suggestionsListContainerStyle={{
                        marginTop: 8,
                        backgroundColor: '#fff',
                        color: "#fff"
                    }}
                    containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                />
            </View>

            {/* ================================================================================ */}
            <View style={styles.sortFilter}>
                <TouchableOpacity>
                    <View style={styles.sort}>
                        <MaterialCommunityIcons name='sort-variant' size={20} color="#fff" />
                        <Text style={{ color: "#fff" }}>Sort</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.sort}>
                        <FontAwesome name='filter' size={20} color="#fff" />
                        <Text style={{ color: "#fff" }}>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.CallhistoryScrollview}
            >
                <View style={styles.CallhistoryCardviewContainer}>
                    {
                        filteredDataSource.map((ele, index) => {
                            return (
                                <View style={styles.CallhistoryCardview} key={index}>
                                    <Text style={{ color: "#fff" }}>{ele.customer_name}</Text>
                                    <View style={styles.CallStatus}>
                                        <Text style={{ color: "#fff" }}>{ele.customer_mob_no}</Text>
                                        <Text style={styles.CallLaterText}>{ele.status}</Text>
                                    </View>
                                    <Text style={{ color: "#fff" }}>{ele.createdAt}</Text>
                                    <View style={styles.CallhistoryIcon}>
                                        <TouchableOpacity style={[styles.CallhistoryIconBtn, styles.CallhistoryIconBtn1]}>
                                            <MaterialIcons name='call' size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.CallhistoryIconBtn, styles.CallhistoryIconBtn2]}>
                                            <FontAwesome name='whatsapp' size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.CallhistoryIconBtn, styles.CallhistoryIconBtn3]}>
                                            <FontAwesome name='calendar' size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.CallhistoryIconBtn, styles.CallhistoryIconBtn4]}>
                                            <Entypo name='address' size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>
            </ScrollView>
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
        width: "95%",
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
        backgroundColor: "#F55555",

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 13,
    },
    CallStatus: {
        paddingTop: 7,
        paddingBottom: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    CallhistoryIcon: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
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

    }
})
export default Callhistory;