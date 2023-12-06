import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { StyleSheet, Dimensions } from "react-native";
// import {useFonts, Comfortaa_400Regular} from "@expo-google-fonts/dev"

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Comfortaa-Regular': require('../Comfortaa/static/Comfortaa-Regular.ttf'),
//   });
// };

const styles = StyleSheet.create({
  // ----------ALL----------
  container: {
    flex: 1,
    backgroundColor: "#f2ecff",
  },
  tabBarContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // Clip the content within the rounded borders
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android
    height: "10%",
  },
  appBar: {
    backgroundColor: "white",
    height: 115 * scaleFactor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  backArrow: {
    flexDirection: "row",
    justifyContent: "left",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  classNameText: {
    fontSize: 20 * scaleFactor,
  },
  // ---------- ^^ Top Header ^^ ----------
  classInfo: {
    flexDirection: "column",
  },
  courseDetails: {
    margin: "3%",
    flexDirection: "column",
  },
  courseDetailTop: {
    flexDirection: "row",
  },
  courseDetailBottom: {
    flexDirection: "row",
  },
  courseHeaderContainer: {
    marginTop: -50 * scaleFactor, // Moves the title up into header
  },
  pageHeader: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",

    // marginTop: -50 * scaleFactor, // Moves the title/course/class up into header
  },
  sectionHeader: {
    color: "black",
    fontSize: 30,
    fontWeight: "normal",
    marginLeft: "5%",
  },
  backTEXT: {
    fontSize: 18,
    marginLeft: 5,
  },

  // ----------HomePage----------
  courseSection: {
    // marginBottom: 10,
    marginTop: 30,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "left",
  },
  bottomSection: {
    justifyContent: "flex-end",
    height: "100%",
    marginBottom: "40%", // adjust space from bottom of screen
  },
  courseContainer: {
    marginTop: 5,
  },
  courseBox: {
    flexDirection: "row", // have course name and join button in one row
    padding: 30,
    margin: 10,
    width: screenWidth * 0.95,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#5E42A6",
    borderWidth: 1.5,
    justifyContent: "space-between", // align items along the row
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  courseBoxTEXT: {
    // fontFamily:"Comfortaa-Medium",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  joinButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  joinButtonTEXT: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  askButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  askButtonTEXT: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  menuModalOverlay: {
    ...StyleSheet.absoluteFillObject, // apply fill to custom modal
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // value for transparency
  },
  menuModalContent: {
    width: screenWidth * 0.7,
    height: screenHeight,
    backgroundColor: "#DDCFFF",
    borderRadius: 20, // round corners
  },
  menuModalTEXT: {
    marginTop: "75%",
    textAlign: "center",
  },

  // ----------CoursePage----------
  questionBox: {
    padding: 10,
    margin: 10,
    width: screenWidth * 0.95,
    // height: 20,
    borderWidth: 2,
    borderColor: "#9F6FDD",
    // borderRadius: 20,
  },
  questionTEXT: {
    fontSize: 22,
  },
  courseCollabButton: {
    width: 145,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  courseCollabButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    // paddingBottom: '10%',
  },

  // ----------QuestionPage----------
  questionContainer: {
    flex: 1,
  },
  questionPageBox: {
    borderBottomColor: "#5E42A6",
    borderBottomWidth: 2,
    backgroundColor: "white",
    height: screenHeight * 0.23,
  },
  questionPageBoxHeader: {
    flexDirection: "row",
    marginTop: 45,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-between",
  },
  chatArea: {
    flex: 1,
    height: 0,
  },
  // ----------QuestionPage----------

  // ------ Queue Box Scrolling Info --------
  queueBox: {
    padding: 10,
    margin: 10,
    width: screenWidth * 0.95,
    // height: screenHeight * 0.2,
    borderWidth: 2,
    borderColor: "#b986ee",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    // justifyContent: 'space-between',
    // maxHeight: '35%',
  },

  queueTopRow: {
    flexDirection: "row", // align items along the row
    justifyContent: "space-between", // space between icon and help time
  },
  queueEarphone: {
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  queuePeopleIcon: {
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  queueMid: {
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  queueBot: {
    marginTop: 5,
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  queueButton: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    padding: 5,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  queueButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  // ------ Queue Box Scrolling Info --------

  // ------ Text Message Styling  --------
  messageAndTimeContainer: {
    flexDirection: "column",
  },
  grayTextMessageContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
  },
  grayMessage: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    maxWidth: "50%",
  },
  grayMessageInitials: {
    marginLeft: "2%",
    marginRight: "4%",
  },
  grayTextMessageTime: {
    textAlign: "left",
    paddingLeft: "10%",
  },
  purpleTextMessageContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  purpleMessage: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#B74E91",
    maxWidth: "50%",
    marginRight: 5,
  },
  purpleTextMessageTime: {
    textAlign: "right",
    paddingRight: "4%",
  },
  purpleMessageText: {
    color: "white",
  },
  emptyChat: {
    textAlign: "center",
    fontWeight: "200",
  },
  // ------ Text Message Styling  --------

  // ------ Question Page w/ Chat  --------
  customModalOverlay: {
    ...StyleSheet.absoluteFillObject, // apply fill to custom modal
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // value for transparency
  },
  modalContent: {
    width: screenWidth * 0.8,
    height: 500,
    padding: 25,
    backgroundColor: "white",
    borderRadius: 20, // round corners
    borderColor: "black",
    borderWidth: 2,
  },
  modalHeader: {
    alignItems: "flex-end",
  },
  modalHeaderTEXT: {
    margin: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeaderTEXT2: {
    margin: 20,
    fontSize: 20,
    textAlign: "center",
  },
  modalCollabUncollabTEXT: {
    width: 175,
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalCollabUncollab: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: "5%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelTEXT: {
    fontSize: 18,
    marginLeft: 5,
  },
  customHuddleModalOverlay: {
    ...StyleSheet.absoluteFillObject, // apply fill to custom modal
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // value for transparency
  },
  huddleModalContent: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.77,
    padding: 25,
    backgroundColor: "white",
    borderRadius: 20, // round corners
    borderColor: "black",
    borderWidth: 2,
  },
  huddleModalContent2: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.2,
    padding: 25,
    backgroundColor: "white",
    borderRadius: 20, // round corners
    borderColor: "black",
    borderWidth: 2,
  },
  huddleModalHeader: {
    alignItems: "flex-end",
  },
  huddleModalHeaderText: {
    margin: 20,
    fontSize: scaleFactor * 20,
    fontWeight: "600",
    textAlign: "center",
    color: "red",
  },
  huddleModalBodyText: {
    margin: -15,
    fontSize: scaleFactor * 15,
    textAlign: "center",
    fontWeight: "200",
    color: "red",
  },
  collabModalHeaderText: {
    margin: 20,
    fontSize: scaleFactor * 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  collabModalBodyText: {
    margin: -15,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "200",
  },
  questionInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 5,
  },
  questionHost: {
    fontSize: 18,
    fontWeight: "200",
  },
  numCollaborators: {
    flexDirection: "row",
  },
  numInHuddle: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    height: 55,
  },
  emojiIcon: {
    marginRight: 5, // add space between the emoji and text input
  },
  input: {
    flex: 1,
    padding: 0, // remove default padding
    marginLeft: 5, // add space between the emoji and text input
    fontSize: 16,
  },
  input2: {
    flex: 1,
    padding: 0, // remove default padding
    marginLeft: 5, // add space between the emoji and text input
    fontSize: 16,
    fontWeight: "200",
  },
  cameraIcon: {
    marginLeft: 5, // add space between the text input and camera icon
  },
  // ------ Question Page w/ Chat  --------

  // ------ Notification Info --------
  NotiContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    marginTop: "20%",
  },
  NotificationInfo: {
    flexDirection: "row",
    width: 0.9 * ScreenWidth,
    height: "10%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  NotiText: {
    height: "100%",
    marginLeft: "5%",
    flex: 1,
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
  },
  NotiIcon: {
    marginLeft: "5%",
  },

  // ------ Notification Info --------

  // ------ Collab Info --------
  collabScroll: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: "10%",
  },
  collabContainer: {
    marginTop: "20%",
    height: "100%",
    // borderColor: 'pink',
    // borderWidth: 5,
  },
  collabHeader: {
    marginBottom: 25,
    // borderColor: "black",
    // borderWidth: 3,
  },
  collabBox: {
    padding: 5,
    margin: 10,
    width: screenWidth * 0.95,
    borderWidth: 2,
    borderColor: "#5E42A6",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    height: screenWidth * 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  collabTopRow: {
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  collabEarphone: {
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  collabPeopleIcon: {
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  collabMid: {
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  collabBot: {
    marginTop: 5,
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  collabButton: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: "black",
    padding: 5,
  },
  collabButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  // ------ Collab Info --------

  // ------ Ask Page  --------
  tagsContainer: {
    justifyContent: "space-around",
    height: 0.2 * screenHeight,
    flexWrap: "wrap",
  },
  tags: {
    marginLeft: "10%",
    // maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tagButton: {
    borderRadius: 30,
    backgroundColor: "white",
    borderColor: "#5E42A6",
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 2,
    margin: 2,
    marginRight: 8,
    marginLeft: 8,
  },
  questionBoxContainer: {
    height: 0.35 * screenHeight,
  },
  questionInput: {
    backgroundColor: "white",
    height: "60%",
    margin: "10%",
    marginBottom: 0,
    borderColor: "purple",
    borderWidth: 0.5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitQuestionButton: {
    backgroundColor: "#5E42A6",
    paddingHorizontal: "10%",
    paddingVertical: "1%",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitQuestionButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  selectedTag: {
    backgroundColor: "#5E42A6", // Apply your desired background color for selected tags
    borderColor: "white",
  },
  submissionModalContent: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.5,
    backgroundColor: "#DDCFFF",
    borderRadius: 20, // round corners
  },
  submissionModalTEXT: {
    marginTop: "75%",
    textAlign: "center",
  },
  // ------ Ask Page  --------

  // ------ Camera Page ------
  takePictureButtonContainer: {
    bottom: 0,
    alignItems: "center",
    paddingBottom: 10,
  },
  takePictureButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    width: 75,
    height: 75,
    paddingBot: 10,
  },
  flipContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
  },
  flipCameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  cameraExitButton: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  usePicButton: {
    flexDirection: "row",
    width: "50%",
    color: "white",
    justifyContent: "flex-end",
  },
  retakeButton: {
    width: "50%",
    color: "white",
    paddingLeft: 65,
    paddingBottom: 40,
  },
  bottomRowContainer: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  // ------ Camera Page ------
});

export default styles;
