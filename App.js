import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from "react-native";
import Home from './src/screen/Home';
import Report from './src/screen/Report';
import Callprogress from "./src/screen/Callprogress";
import Callhistory from './src/screen/Callhistory';
import Profile from './src/screen/Profile';
import Loginpage from './src/screen/Loginpage';
import SearchListName from './src/component/SearchListName';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Searchlist from './src/screen/Searchlist';
import Lastdialcall from './src/component/Lastdialcall';
import Followupnotification from './src/screen/Followupnotification';
import CreateContact from './src/screen/CreateContact';
// import 'react-native-reanimated';


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        // buttonNeutral: "Ask Me Later",
        // buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the App");
    } else {
      console.log("App permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const App = () => {
  useEffect(() => {
    requestCameraPermission()
  }, [])

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Loginpage'>
          <Stack.Screen name="Home" component={Home}
            options={{
              title: "Home",
              headerShown: false
            }}
          />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Loginpage" component={Loginpage} options={{
            title: "Login Page",
            headerShown: false
          }} />
          <Stack.Screen name="Callhistory" component={Callhistory} options={{
            title: "Call History",
          }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SearchListName" component={SearchListName} />
          <Stack.Screen name="Searchlist" component={Searchlist}
            options={{
              title: "Select List",
              headerShown: false
            }}
          />
          <Stack.Screen name="Followupnotification" component={Followupnotification}
            options={{
              title: "Followup Notification",
              // headerShown: false
            }}
          />

          <Stack.Screen name="CreateContact" component={CreateContact}
            options={{
              title: "Add To Contact",
              // headerShown: false
            }}
          />

          {/* <Stack.Screen name="Callprogress" options={{ title: 'Call' }} component={Callprogress} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;