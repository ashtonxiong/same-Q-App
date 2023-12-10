import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { StyleSheet, Dimensions } from "react-native";
// import {useFonts, Comfortaa_400Regular} from "@expo-google-fonts/dev"

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  // ----------ALL----------
  container: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "#5E42A6",
    height: 115 * scaleFactor,
    flexDirection: "column",
    //  alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
  appBarQuestion: {
    backgroundColor: "transparent",
    height: 115 * scaleFactor,
    flexDirection: "column",
    //  alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
  appBarHome: {
    // backgroundColor: "#5E42A6",
    height: 115 * scaleFactor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  backArrow: {
    flexDirection: "row",
    justifyContent: "left",
    paddingBottom: 10,
    paddingRight: 50,
  },
  backArrowBigButton: {
    flexDirection: "row",
    justifyContent: "left",
    paddingBottom: 10,
    paddingRight: 0,
  },
  backArrowSeamus: {
    position: "absolute",
    top: 40 * scaleFactor,
    left: 0,
    padding: 20,
  },
  backTextBar: {
    flexDirection: "row", // Horizontal layout
    alignItems: "center", // Center items vertically
  },
  backButton: {
    position: "absolute",
    left: 5 * scaleFactor,
    top: 50 * scaleFactor,
    padding: 10,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  classNameText: {
    fontSize: 20 * scaleFactor,
  },
  logoImage: {
    width: 60,
    height: 60,
    alignSelf: "center",
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
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    // marginTop: -50 * scaleFactor, // Moves the title/course/class up into header
  },
  pageHeader2: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  sectionHeader: {
    //  color: "black",
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    marginLeft: "5%",
  },
  sectionHeader2: {
    color: "black",
    // color: 'white',
    fontSize: 30,
    fontWeight: "600",
    marginLeft: "5%",
  },
  backTEXT: {
    fontSize: 18,
    marginLeft: 5,
    color: "white",
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
    borderRadius: 10,
    backgroundColor: "white",
    //  borderColor: "#5E42A6",
    borderColor: "white",
    borderWidth: 2,
    //  borderWidth: 1.5,
    justifyContent: "space-between", // align items along the row
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  courseBoxTEXT: {
    fontSize: 24,
    fontWeight: "bold",
    //  color: "black",
    color: "#312450",
    textAlign: "left",
  },
  joinButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    // borderColor: '#312450',
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    //  shadowColor: "#000",
    //  shadowOffset: { width: 0, height: 2 },
    //  shadowOpacity: 0.5,
    //  shadowRadius: 4,
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
    // borderColor: '#312450',
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    //  shadowColor: "#000",
    //  shadowOffset: { width: 0, height: 2 },
    //  shadowOpacity: 0.5,
    //  shadowRadius: 10,
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
    flex: 1,
    width: screenWidth * 0.7,
    height: screenHeight,
    //  backgroundColor: "#DDCFFF",
    backgroundColor: "#312450",
    borderRadius: 20, // round corners
    padding: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  menuModalTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "-40%",
  },
  menuModalBottom: {
    alignItems: "center",
    marginTop: "-60%",
    flexDirection: "column",
  },
  menuModalHeader: {
    marginTop: "50%",
    fontSize: scaleFactor * 27,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  menuModalBody: {
    marginTop: "20%",
    textAlign: "center",
    fontSize: scaleFactor * 20,
    marginTop: 5,
    color: "white",
  },
  menuModalImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginTop: "50%",
    borderColor: "white",
    borderWidth: 3,
  },
  logoutButtonContainer: {
    justifyContent: "flex-end",
    width: "40%",
    alignItems: "center",
  },
  logoutButton: {
    borderRadius: 25,
    backgroundColor: "#5E42A6",
    // borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    width: "150%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  canvasImage: {
    width: 30,
    height: 30,
  },
  fakePage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "25%",
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
    borderRadius: 10,
    backgroundColor: "white",
    //  borderColor: "#5E42A6",
    borderColor: "white",
    borderWidth: 2,
    //  borderWidth: 1.5,
    justifyContent: "space-between", // align items along the row
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  courseBoxTEXT: {
    fontSize: 24,
    fontWeight: "bold",
    //  color: "black",
    color: "#312450",
    textAlign: "left",
  },
  joinButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    // borderColor: '#312450',
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    //  shadowColor: "#000",
    //  shadowOffset: { width: 0, height: 2 },
    //  shadowOpacity: 0.5,
    //  shadowRadius: 4,
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
    // borderColor: '#312450',
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    //  shadowColor: "#000",
    //  shadowOffset: { width: 0, height: 2 },
    //  shadowOpacity: 0.5,
    //  shadowRadius: 10,
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
    flex: 1,
    width: screenWidth * 0.7,
    height: screenHeight,
    //  backgroundColor: "#DDCFFF",
    backgroundColor: "#312450",
    borderRadius: 20, // round corners
    padding: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  menuModalTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "-40%",
  },
  menuModalBottom: {
    alignItems: "center",
    marginTop: "-60%",
    flexDirection: "column",
  },
  menuModalHeader: {
    marginTop: "50%",
    fontSize: scaleFactor * 27,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  menuModalBody: {
    marginTop: "20%",
    textAlign: "center",
    fontSize: scaleFactor * 20,
    marginTop: 5,
    color: "white",
  },
  menuModalImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginTop: "50%",
    borderColor: "white",
    borderWidth: 3,
  },
  logoutButtonContainer: {
    justifyContent: "flex-end",
    width: "40%",
    alignItems: "center",
  },
  logoutButton: {
    borderRadius: 25,
    backgroundColor: "#5E42A6",
    // borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    width: "150%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  canvasImage: {
    width: 30,
    height: 30,
  },
  fakePage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "25%",
  },
  // ----------HomePage----------

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
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 54,
    marginBottom: 20,
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
    paddingHorizontal: 5,
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
    // borderBottomColor: "#5E42A6",
    backgroundColor: "#5E42A6",
    borderBottomWidth: 2,
    // minHeight: screenHeight * 0.1,
    // backgroundColor: "white",
  },
  questionPageBoxHeader: {
    // flexDirection: "row",
    // marginTop: 40,
    // marginLeft: 0,
    // marginRight: 15,
    // justifyContent: "space-between",
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
    borderWidth: 2,
    borderColor: "#5E42A6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  queueTopRow: {
    flex: 1,
    flexDirection: "row", // align items along the row
    justifyContent: "flex-start", // space between icon and help time
    // alignContent: 'flex-start'
  },
  queueTopRowText: {
    marginLeft: "1.5%",
    fontSize: scaleFactor * 15,
    marginTop: "-0.5%",
  },
  queueTopRowTextEnd: {
    fontSize: scaleFactor * 15,
    marginTop: "-0.5%",
    justifyContent: "flex-end",
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
    marginTop: "2%",
  },
  queueBot: {
    marginTop: "2%",
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
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
    backgroundColor: "#DDD",
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
    backgroundColor: "#5E42A6",
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
    marginTop: "20%",
    color: "white",
    fontSize: scaleFactor * 15,
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
    // color: 'white',
  },
  modalHeaderTEXT2: {
    margin: 20,
    fontSize: 20,
    textAlign: "center",
    // color: 'white',
  },
  modalCollabUncollabTEXT: {
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 10,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "column",
    padding: 5,
    paddingRight: 15,
    paddingTop: 10,
    right: -0,
    top: 50,
    position: "absolute",
  },
  questionHost: {
    fontSize: 18,
    fontWeight: "200",
    color: "white",
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
  cameraExitButton: {
    borderWidth: 2,
    borderColor: "blue",
    position: "absolute",
    top: 50 * scaleFactor,
    left: 30 * scaleFactor,
  },
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
  // ------ Question Page w/ Chat  --------

  // ------ Notification Info --------
  NotiContainer: {
    flex: 1,
    backgroundColor: "#f2ecff",
  },
  NotificationInfo: {
    flexDirection: "row",
    width: 0.9 * ScreenWidth,
    height: "10%",
    marginTop: "5%",
    marginBottom: "3%",
  },
  NotiText: {
    height: "100%",
    marginLeft: "5%",
    flex: 1,
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    color: "white",
  },
  NotiIcon: {
    marginLeft: "5%",
  },

  // ------ Notification Info --------

  // ------ Collab Info --------
  collabContainer: {
    flex: 1,
    backgroundColor: "#f2ecff",
  },
  collabBox: {
    padding: 10,
    margin: 10,
    width: screenWidth * 0.95,
    borderWidth: 2,
    borderColor: "#5E42A6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  collabTopRow: {
    flex: 1,
    flexDirection: "row", // align items along the row
    justifyContent: "space-around", // space between icon and help time
    padding: "2%",
  },
  Earphone: {
    flexDirection: "row",
  },
  collabIcons: {
    flex: 1,
    flexDirection: "row",
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
    marginTop: "2%",
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
  askContainer: {
    flex: 1,
    backgroundColor: "#5E42A6",
  },
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
    //  backgroundColor: "white",
    borderColor: "white",
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
    margin: "20%",
    marginBottom: 0,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitQuestionButton: {
    //  backgroundColor: "#5E42A6",
    borderColor: "white",
    borderWidth: 2,
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
    backgroundColor: "white", // Apply your desired background color for selected tags
    borderColor: "white",
  },
  // ------ New Question Boxes  --------
  queueBox: {
    margin: 10,
    width: screenWidth * 0.95,
    justifyContent: "space-between",
    // maxHeight: '35%',

    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8, // Increased elevation for a more pronounced effect on Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, // Increased shadow opacity for a more pronounced effect on iOS
    shadowRadius: 4,
    padding: 10,
  },
  queueTopRow: {
    // borderBlockColor: "green",
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  questionNumsBlock: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  iconBlock: {
    flexDirection: "row",
  },
  questionIcon: {
    alignSelf: "center",
  },
  expectedText: {
    marginLeft: 5,
    fontSize: 20,
    alignSelf: "flex-end",
  },
  queueBot: {
    // borderBlockColor: "white",
    // borderWidth: 2,
    marginTop: 5,
    flexWrap: "wrap", // Allow text to wrap
    overflow: "hidden", // Hide overflow content
    flexDirection: "row",
    justifyContent: "center", // align items along the row
  },
  button: {
    //height: "100%",
    borderRadius: 20,
    backgroundColor: "#5e42a6",
    padding: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
  },
  infoButton: {
    position: "absolute",
    top: 40,
    right: 5,
    padding: 10,
  },
  // ------ Ask Page  --------
  askContainer: {
    flex: 1,
    backgroundColor: "#5E42A6",
  },
  tagsContainer: {
    justifyContent: "space-around",
    height: 0.2 * screenHeight,
    flexWrap: "wrap",
    marginLeft: "10%",
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
    //  backgroundColor: "white",
    borderColor: "white",
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
    //  backgroundColor: "white",
    height: "60%",
    marginLeft: "10%",
    marginTop: "5%",
    marginRight: "10%",
    backgroundColor: "white",

    marginBottom: 0,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  submitQuestionButton: {
    //  backgroundColor: "#5E42A6",
    borderColor: "white",
    borderWidth: 2,
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
    backgroundColor: "white", // Apply your desired background color for selected tags
    borderColor: "white",
  },
  submissionModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // More opaque background
  },
  submissionModalContent: {
    width: "80%", // Adjust width as needed
    backgroundColor: "white", // Solid background for content
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
