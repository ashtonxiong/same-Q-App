import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";

const AskPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const clickMenuModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={clickMenuModal}>
          <View style={styles.backArrow}>
            <Icon name="menu" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.courseHeaderContainer}>
        <Text style={styles.pageHeader}>Create Question</Text>
      </View>
      <View>
        <Text> Tags</Text>
      </View>
      <View>
        <Text> Question Area </Text>
      </View>
      <Text> Test </Text>

      <Modal transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.menuModalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menuModalContent}>
                <Text style={styles.menuModalTEXT}>TEST</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AskPage;
