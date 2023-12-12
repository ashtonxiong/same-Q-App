import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const SettingsPage = () => {
  const [showWebView, setShowWebView] = useState(false);

  // Function to toggle WebView
  const toggleWebView = () => {
    setShowWebView(!showWebView);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/gradient.png")}
        resizeMode="cover"
      >
        {!showWebView ? (
          <>
            <View style={styles.appBar}></View>
            <View style={styles.courseHeaderContainer}>
              <Text style={styles.pageHeader}>Settings</Text>
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={toggleWebView}
                  style={styles.rowContainer}
                >
                  <View style={styles.backArrow}>
                    <Icon name="user" size={25} color="white" />
                  </View>
                  <Text style={styles.optionHeader}>Account</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={toggleWebView}
                  style={styles.rowContainer}
                >
                  <View style={styles.backArrow}>
                    <Icon name="bell" size={25} color="white" />
                  </View>
                  <Text style={styles.optionHeader}>
                    Notification Preferences
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={toggleWebView}
                  style={styles.rowContainer}
                >
                  <View style={styles.backArrow}>
                    <Icon name="equalizer" size={25} color="white" />
                  </View>
                  <Text style={styles.optionHeader}>Appearance</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={toggleWebView}
                  style={styles.rowContainer}
                >
                  <View style={styles.backArrow}>
                    <Icon name="question" size={25} color="white" />
                  </View>
                  <Text style={styles.optionHeader}>Help and Support</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.option}>
                <TouchableOpacity
                  onPress={toggleWebView}
                  style={styles.rowContainer}
                >
                  <View style={styles.backArrow}>
                    <Icon name="info" size={25} color="white" />
                  </View>
                  <Text style={styles.optionHeader}>About</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <WebView
            source={{ uri: "https://www.same-q.com" }}
            style={{ flex: 1 }}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2ecff",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "5%",
  },
  appBar: {
    height: 115 * scaleFactor,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  courseHeaderContainer: {
    marginTop: -50 * scaleFactor,
    justifyContent: "center",
  },
  pageHeader: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  backArrow: {
    marginRight: "5%",
    justifyContent: "flex-start",
  },
  option: {
    flex: 1,
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  optionHeader: {
    fontSize: scaleFactor * 25,
    textAlign: "left",
    justifyContent: "center",
    color: "white",
  },
});

export default SettingsPage;
