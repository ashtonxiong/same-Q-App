import React from "react";
import {
 Text,
 View,
 Image,
 StyleSheet, 
 TouchableOpacity,
 Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FontIcon from "react-native-vector-icons/FontAwesome";

const SettingsPage = () => {
    const navigation = useNavigation();
    
    const handleFakePagePress = (prevPage) => {
        console.log(`Navigating to Filler Page`);
        navigation.navigate("FillerPage", { prevPage });
      };

    return (
        <View style={styles.container}>
            <View style={styles.appBar}></View>
            <View style={styles.courseHeaderContainer}>
                <Text style={styles.pageHeader}>Settings</Text>
            </View>

        <View style={styles.bottomContainer}>
            <View style={styles.option}>
                <TouchableOpacity onPress={() => handleFakePagePress("SettingsPage")} style={styles.rowContainer}>
                    <View style={styles.backArrow}>
                        <Icon name="user" size={25} color="#000" />
                    </View>
                    <Text style={styles.optionHeader}>Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.option}>
                <TouchableOpacity onPress={() => handleFakePagePress("SettingsPage")} style={styles.rowContainer}>
                    <View style={styles.backArrow}>
                        <Icon name="bell" size={25} color="#000" />
                    </View>
                    <Text style={styles.optionHeader}>Notification Preferences</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.option}>
                <TouchableOpacity onPress={() => handleFakePagePress("SettingsPage")} style={styles.rowContainer}>
                    <View style={styles.backArrow}>
                        <Icon name="equalizer" size={25} color="#000" />
                    </View>
                    <Text style={styles.optionHeader}>Appearance</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.option}>
                <TouchableOpacity onPress={() => handleFakePagePress("SettingsPage")} style={styles.rowContainer}>
                    <View style={styles.backArrow}>
                        <Icon name="question" size={25} color="#000" />
                    </View>
                    <Text style={styles.optionHeader}>Help and Support</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.option}>
                <TouchableOpacity onPress={() => handleFakePagePress("SettingsPage")} style={styles.rowContainer}>
                    <View style={styles.backArrow}>
                        <Icon name="info" size={25} color="#000" />
                    </View>
                    <Text style={styles.optionHeader}>About</Text>
                </TouchableOpacity>
            </View>
        </View>

        </View>
    )
};

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#f2ecff",
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '5%',
    },
      appBar: {
        backgroundColor: "white",
        height: 115 * scaleFactor,
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
      },
      courseHeaderContainer: {
        marginTop: -50 * scaleFactor, // move tilte into appBar header
        justifyContent: 'center',
      },
      pageHeader: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
      },
      backArrow: {
        marginRight: '5%', // space between icon and label
        justifyContent: 'flex-start'
      },
      option: {
        flex: 1,
        padding: '5%',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex', 
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3', 
        borderStyle: 'solid',
        borderTopWidth: 1, 
        borderTopColor: '#d3d3d3',
        borderStyle: 'solid',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
    },
    optionHeader: {
        fontSize: scaleFactor * 25,
        textAlign: 'left',
        justifyContent: 'center',
    }
});

export default SettingsPage;