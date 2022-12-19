import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';




const windowHeight = Dimensions.get('window').height;
const SearchListName = (props) => {

    //const customer


    const searchLisEvent = () => {
        props.passData()
    }

    const [selectedItems, setSelectedItems] = useState();
    // const items = [
    //     // name key is must. It is to show the text in front
    //     { id: 1, name: 'Hyundai Feb 2012' },
    //     { id: 2, name: 'Mahindra Feb 2022' },
    //     { id: 3, name: 'Mahindra Feb 2022' },
    //     { id: 4, name: 'Hyundai Feb 2012' },
    //     { id: 5, name: 'Hyundai Feb 2012' },
    //     { id: 6, name: 'Hyundai Feb 2012' },
    //     { id: 7, name: 'Mahindra Feb 2022' },
    //     { id: 8, name: 'Mahindra Feb 2022' },
    //     { id: 9, name: 'Hyundai Feb 2012' },
    //     { id: 10, name: 'Mahindra Feb 2022' },
    // ];
    const items = props.listname;
    // const oldcustomers = items.map((item, index, arr) => {
    //     return item
    // })

    // const newcustomers = oldcustomers.map((ele, index) => {
    //     return ele.customerlist
    // })

    // const lastnewcustomers = oldcustomers.map((elem, index) => {
    //     return {
    //         "final_customer_list": elem.customer_name
    //     }
    // })


    // console.log('====================================');
    // console.log(oldcustomers);
    // console.log('====================================');
    // console.log(newcustomers);
    // console.log('====================================');
    // console.log(lastnewcustomers);
    // console.log(items);
    return (
        <View style={styles.container}>
            <View style={styles.searchlistmodal}>
                <View style={styles.inputContainer}>
                    <SearchableDropdown
                        onTextChange={(text) => (text)}
                        // Listner on the searchable input
                        // onItemSelect={(item) => alert(JSON.stringify(item))}
                        selectedItems={selectedItems}
                        onItemSelect={(item) => {
                            const newitem = item.id;
                        }}

                        // onItemSelect={(item) => setSelectedItems(item)}

                        // Called after the selection
                        containerStyle={{ padding: 5 }}
                        // Suggestion container style
                        textInputStyle={{
                            // Inserted text style
                            padding: 5,
                            borderWidth: 2,
                            borderColor: '#fff',
                            borderBottomColor: "#000",
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            position: "relative",
                            zIndex: 0,
                            width: "90%",
                        }}
                        itemStyle={{
                            // Single dropdown item style
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: "#fff",
                        }}
                        itemTextStyle={{
                            // Text style of a single dropdown item
                            color: '#222',
                        }}
                        itemsContainerStyle={{
                            // Items container style you can pass maxHeight
                            // To restrict the items dropdown hieght
                            maxHeight: '70%',
                            width: "90%",
                            position: "absolute",
                            top: 60,
                            left: "2%",
                            zIndex: 9999,
                            backgroundColor: "#fff"
                        }}
                        items={items}
                        // Mapping of item array
                        defaultIndex={2}
                        // Default selected item index
                        placeholder="Search List Name"
                        // place holder for the search input
                        resPtValue={false}
                        // Reset textInput Value with true and false state
                        underlineColorAndroid="transparent"
                    // To remove the underline from the android input
                    />
                    <View style={{ width: "100%", height: "100%", position: "relative" }}>
                        <TouchableOpacity style={styles.saveBtn1}
                            onPress={searchLisEvent}
                        >
                            <Text style={{ color: "#fff" }}>Ok</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.saveBtn2}
                            >
                                <Text style={{ color: "#fff" }}>Close</Text>
                            </TouchableOpacity> */}
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
    searchlistmodal: {
        width: "100%",
        height: windowHeight,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(52,52,52,0.3)"
    },
    inputContainer: {
        position: "relative",
        width: "95%",
        height: 500,
        backgroundColor: "#fff",
        paddingLeft: "9%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
    },
    saveBtn1: {
        position: "absolute",
        bottom: "15%",
        right: "10%",
        width: 280,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#f5576c",
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 13,
    },
    // saveBtn2: {
    //     position: "absolute",
    //     bottom: "15%",
    //     left: "0%",
    //     width: 70,
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: 5,
    //     backgroundColor: "#f5576c",
    //     borderRadius: 35,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 1 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 1,
    //     elevation: 13,
    // },
})
export default SearchListName;