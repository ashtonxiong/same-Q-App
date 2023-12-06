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

const FillerPage = ({ route }) => {
    const navigation = useNavigation();

    const { prevPage } = route.params;

    const handleBackHome = (home) => {
        console.log(`Navigating to HomePage`);
        navigation.navigate("HomePage");
    };

    const handleBackSettings = (settings) => {
        console.log(`Navigating to SettingsPage`);
        navigation.navigate("SettingsPage");
    };

    return (
        // <View>
        <View style={styles.container}>
             <View style={styles.appBar}>
        {prevPage === "HomePage" ? (
          <TouchableOpacity onPress={handleBackHome}>
            <View style={styles.backArrow}>
              <Icon name="arrow-left" size={20} color="#000" />
              <Text style={styles.backTEXT}>Home</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleBackSettings}>
            <View style={styles.backArrow}>
              <Icon name="arrow-left" size={20} color="#000" />
              <Text style={styles.backTEXT}>Settings</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
            <View style={styles.container2}>
                <Image style={styles.fillerImage} source={require("../assets/construction.png")} />
                <Text style={styles.text}>Page under construction.</Text>
            </View>
        </View>
    )
};

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f2ecff"
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fillerImage: {
        width: 250,
        height: 250,
    },
    text: {
        fontSize: 30,
        fontWeight: '300'
    },
    backArrow: {
        flexDirection: "row",
        justifyContent: "left",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      backTEXT: {
        fontSize: 18,
        marginLeft: 5,
      },
      appBar: {
        backgroundColor: "white",
        height: 115 * scaleFactor,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%",
        width: '100%',
      },
});

export default FillerPage;