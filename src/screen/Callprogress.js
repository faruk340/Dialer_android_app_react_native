import { View, Text, StyleSheet, BackHandler } from 'react-native';
import React, { useState } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Callprogress = () => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const [progressNum, setprogressNum] = useState(0)
    const callReady = () => {
        alert("Are you Sure You Want to !!!")
    }
    const circularProgress = "5";
    return (
        <View style={styles.container}>

            <AnimatedCircularProgress
                size={100}
                width={5}
                duration={5000}
                fill={progressNum.fill}
                // ref={(ref) => { ref.circularProgress = ref }}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                onAnimationComplete={callReady}
            >

                {(fill) => (<Text style={{ fontSize: 50 }}>{parseInt(fill)}</Text>)}

            </AnimatedCircularProgress>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});
export default Callprogress;