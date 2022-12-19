import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
  NativeModules,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SearchBar } from 'react-native-elements';
import { LinearGradient } from "react-native-svg";

const { CustomerCreateModule, CallHistoryModule } = NativeModules;

const Searchlist = ({ route, navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])



  useEffect(() => {
    Alert.alert(
      "Alert Message",
      "Please !! First Select A List",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "OK" }
      ]
    );
  }, [])

  const CustomerTotalList = route.params; // this object for back to search List from home page


  //CustomerList.customerlist=route.params.customerlist

  const [userDetails, setnewUserDetails] = useState({
    customerlist: [],
  });

  const [MemberDetails, setMemberDetails] = useState({
    cmpid: CustomerTotalList.cmpid,
    member_id: CustomerTotalList.id,
    member_name: CustomerTotalList.member_name,
    member_location: CustomerTotalList.member_location,
    member_mail: CustomerTotalList.member_mail,
    member_mob_no: CustomerTotalList.member_mob_no,
    member_skip_call: CustomerTotalList.member_skip_call,
  });

  // ===========================GetStatus====================
  const [modStatus, setModStatus] = useState([])

  const cmpid = MemberDetails.cmpid;
  useEffect(() => {
    CustomerCreateModule.getStatus(cmpid)
      .then((res) => JSON.parse(res))
      .then((res) => setModStatus(res))
      .catch((e) => {
        console.error(e);
      })
  }, [])
  // =========================================================
  userDetails.customerlist = route.params.customerlist;

  // console.log(
  //   "==========================List_name==================================="
  // );
  const oldListname = userDetails.customerlist;
  var reportListId;
  oldListname.forEach(element => {
    reportListId = element._id
  });

  const newListname = oldListname.map((element, index, arr) => {
    reportListId = element._id
    return {
      list_name: element.list_name,
      list_id: element._id,
    };
  });

  const customers = oldListname.map((element, index) => {
    return element.customerlist.map((ele, index) => {
      return {
        list_name: element.list_name,
        list_id: element._id,
        customer_name: ele.customer_name,
        customer_mob_no: ele.customer_contact_no,
        customer_whatsapp_no: ele.customer_whatsapp_no ? ele.make_model : "",
        customer_location: ele.customer_location,
        op1: ele.make_model ? ele.make_model : "",
        op2: ele.reg_no ? ele.reg_no : "",
        op3: ele.yom ? ele.yom : "",
        op4: ele.ins_exp ? ele.ins_exp : "",
      };
    });
  });

  // let newCustomerlist = customers.map((element, index) => element.map((ele, index) => { return ele; }).filter((item, index) => item.id == "615c3a557c59c5c8e7dab0f2")).filter((ele) => Array.isArray(ele) && ele.length);

  // console.log(newCustomerlist)


  // ===================================List Searching State===========================

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [showSearchbar, setShowSearchbar] = useState(false)

  const searchBartoggle = () => {
    setShowSearchbar(!showSearchbar)
  }

  useEffect(() => {
    setFilteredDataSource(newListname)
    setMasterDataSource(newListname)
  }, []);



  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.list_name
          ? item.list_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // const ItemView = ({ item }) => {
  //   return (
  //     // Flat List Item
  //     <Text style={styles.itemStyle} onPress={() => getItem(item)}>
  //       {item.id}
  //       {'.'}
  //       {item.name.toUpperCase()}
  //     </Text>
  //   );
  // };


  // console.log("=================Customer_List===================");

  return (
    <View style={styles.container}>
      {
        !showSearchbar ? (
          <View style={styles.headerProfile}>
            <View>
              <TouchableOpacity>
                <EvilIcons
                  name="user"
                  size={50}
                  color="#fff"
                  onPress={() => {
                    navigation.navigate("Profile", MemberDetails);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerProfileRight}>
              {/* <TouchableOpacity
                      onPress={searchListOpenEvent}
                      >
                          <View><MaterialCommunityIcons name='clipboard-list-outline' size={25} color="#fff" /></View>
                      </TouchableOpacity> */}
              <TouchableOpacity>
                <View>
                  <EvilIcons name="refresh" size={45} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={searchBartoggle}
              >
                <View>
                  <EvilIcons name="search" size={35} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.searchBar}>
            <TouchableOpacity style={styles.searchBarCloseIcon}
              onPress={() => setShowSearchbar(!showSearchbar)}
            >
              <AntDesign name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.searchInputBox}>
              <SearchBar
                round
                searchIcon={false}
                containerStyle={{ backgroundColor: '#001e3c', height: 65 }}
                // inputStyle={{ backgroundColor: '#000', height: "auto" }}
                // leftIconContainerStyle={{ backgroundColor: "#000" }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search Your List ..."
                value={search}
              />
            </View>
          </View>
        )
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.listCardContainer}>
          {filteredDataSource.map((ele, key) => {
            const compareId = ele.list_id;
            return (
              <TouchableOpacity
                style={styles.listCard}
                key={key}
                onPress={() => {
                  navigation.navigate("Home", {
                    compareId,
                    customers,
                    MemberDetails,
                    CustomerTotalList,
                    modStatus
                  });
                }}
              >
                <View>
                  <Text
                    style={{
                      // fontSize: 22,
                      color: "#000",
                      // color: "#0069ff",
                      marginBottom: 15,
                    }}
                  >
                    {ele.list_name}
                  </Text>
                </View>
                {/* <View style={styles.listContent}>
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
                      9(6)
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
                      9(6)
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
                      9(6)
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
                      Follow Ups
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 16,
                      }}
                    >
                      9(6)
                    </Text>
                  </View>
                </View> */}
                {/* <View style={styles.ListBorder}></View>
                <View style={styles.searchListBtnContainer}>
                  <TouchableOpacity
                    style={styles.searchListBtn}
                    // disabled={}
                    onPress={() => {
                      navigation.navigate("Home", {
                        compareId,
                        customers,
                        MemberDetails,
                        CustomerTotalList,
                        modStatus
                      });
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      Select
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  headerProfile: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#001e3c",
    color: "#fff",
    width: "100%",
    height: 65,
    paddingLeft: 5,
    paddingRight: 10,
  },
  headerProfileRight: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 110,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: "#001e3c",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 65
  },
  searchInputBox: {
    width: "90%"
  },
  searchBarCloseIcon: {
    width: "10%",
    backgroundColor: "#001e3c",
    paddingLeft: 6
  },

  scrollContainer: {
    width: "100%",
  },
  listCardContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listCard: {
    // marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "95%",
    borderWidth: 1,
    borderBottomColor: "#bbb",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    paddingTop: 10,
    paddingLeft: 5,
    // backgroundColor: "#060333",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // elevation: 5,
    // borderRadius: 15,
  },
  listContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  searchListBtnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  searchListBtn: {
    marginTop: 20,
    marginBottom: 10,
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#0069ff",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  ListBorder: {
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#333148",
  },
});

export default Searchlist;
