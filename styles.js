import { ScreenWidth } from '@freakycoder/react-native-helpers';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    // ----------ALL----------
    container: {
      flex: 1,
      backgroundColor: 'white'
      // borderColor: 'red',
      // borderWidth: 2,
    },
    appBar: {
      // backgroundColor: '#9F6FDD',
      //height: 80 * scaleFactor,
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: '5%',
      marginTop: 40 * scaleFactor,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      paddingBottom: 5,

      // backgroundColor: '#fff',
      // borderRadius: 10,
      // elevation: 8, // Increased elevation for a more pronounced effect on Android
      // shadowColor: '#000', // iOS shadow
      // shadowOffset: { width: 0, height: 8 },
      // shadowOpacity: 0.4, // Increased shadow opacity for a more pronounced effect on iOS
      // shadowRadius: 4,
      // padding: 16,
    },
    backArrow: {
      flexDirection: 'row',
      justifyContent: 'left',
      paddingBottom: 20,
      paddingRight: 50
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    classNameText: {
      fontSize: 20 * scaleFactor,
    },
    backButton: {
      position: 'absolute',
      left: 5,
      top: 0,
      padding: 10
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    },
    button: {
      //height: "100%",
      borderRadius: 20,
      backgroundColor: '#5e42a6',
      padding: 5,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20 * scaleFactor,
      fontWeight: 'bold',
    },
    // ---------- ^^ Top Header ^^ ----------
    classInfo: {
      flexDirection: 'column'
    },
    courseDetails: {
      margin: '3%',
      flexDirection: 'column',
    },
    courseDetailTop: {
      flexDirection: 'row',
    },
    courseDetailBottom: {
      flexDirection: 'row',
    },
    pageHeader: {
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      // marginTop: -50 * scaleFactor, // Moves the title/course/class up into header
    },
    sectionHeader: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'normal',
      marginLeft: 10
    },
    backTEXT: {
      fontSize: 18,
      marginLeft: 5,
    },

    // ----------HomePage----------
    courseSection: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'left',
    },
    courseContainer: {
      marginTop: 5,
    },
    courseBox: {
      flexDirection: 'row', // have course name and join button in one row
      padding: 30,
      margin: 10,
      width: screenWidth * 0.95,
      borderWidth: 2,
      borderColor: 'darkgrey',
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-between', // align items along the row
      alignItems: 'center'
    },
    courseBoxTEXT: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
    },
    askButton: {
      width: 70,
      borderRadius: 20,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    askButtonTEXT: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginRight: 5,
      marginLeft: 5
    },
    menuModalOverlay: {
      ...StyleSheet.absoluteFillObject, // apply fill to custom modal
      justifyContent: 'center',
      alignItems: 'left',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // value for transparency
    },
    menuModalContent: {
      width: screenWidth * 0.7,
      height: screenHeight,
      backgroundColor: "#9f6fdd",
      borderRadius: 20, // round corners
    },
    menuModalTEXT: {
      marginTop: '75%',
      textAlign: 'center',
    },

    // ----------CoursePage----------
      questionBox: {
        padding: 10,
        margin: 10,
        width: screenWidth * 0.95,
        height: 100,
        borderWidth: 2,
        borderColor: '#9F6FDD',
        borderRadius: 20,
      },
      questionTEXT: {
        fontSize: 17,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5
      },
      courseCollabButton: {
        width: 145,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      courseCollabButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      scrollContainer: {
        alignItems: 'center',
        paddingBottom: '60%',
      },
      OHInfo: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      OHText: {
        flex: 1,
      },
      // ----------QuestionPage----------
      chatArea: {
        flex: 1,
        height: 0,
        paddingLeft: 5,
        paddingRight: 5,
        // borderColor: "green",
        // borderWidth: 5,
      },
      infoButton: {
        position: 'absolute',
        top: 0,
        right: 5,
        padding: 10
      },
      // ------ Text Message Styling  -------- 
      senderStyle: {
        color: 'rgb(76, 77, 77)',
        marginLeft: 10,
        fontSize: 13,
        marginRight: 10,
        marginTop: 5
      },
      message: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
      },
      // ------ Text Message Styling  -------- 


      customModalOverlay: {
        ...StyleSheet.absoluteFillObject, // apply fill to custom modal
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // value for transparency
      },
      modalContent: {
        width: screenWidth * 0.8, 
        height: 500,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 20, // round corners
        borderColor: 'black',
        borderWidth: 2,
      },
      modalHeader: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      },
      modalHeaderTEXT: {
        // margin: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
      },
      modalHeaderTEXT2: {
        // margin: 5,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
      },
      modalUncollab: {
        flex: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      cancelButton: {
        position: 'absolute',
        right: 0,
        top: 0,
      },
      inputContainer: {
        // borderColor: 'red',
        // borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
        paddingVertical: 7,
        justifyContent: 'space-between',
        // height: 55,
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
      cameraIcon: {
        marginLeft: 5, // add space between the text input and camera icon
      },

      // ------ Notification Info -------- 
      NotiContainer: {
        // borderBlockColor: "blue",
        // borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: '20%',
      },
      NotificationInfo: {
        // borderColor: "red",
        // borderWidth: 2,
        flexDirection: 'row',
        width: .9 * ScreenWidth,
        height: '10%',
        marginTop: '3%', 
        marginBottom: '3%', 
      },
      NotiText: {
        // borderColor: "green",
        // borderWidth: 2,
        height: '100%',
        marginLeft: '5%',
        flex: 1,
        flexWrap: 'wrap', // Allow text to wrap
        overflow: 'hidden', // Hide overflow content
      },
      NotiIcon: {
        marginLeft: '5%',
        // borderColor: "purple",
        // borderWidth: 2,
        // marginRight: '60%',
      },

      // ------ Collab Info -------- 
      collabContainer: {
        marginTop: '20%',
        height: '100%',
      },
      collabHeader : {
        marginBottom: 25,
      },
      collabBox: {
        padding: 10,
        margin: 10,
        width: screenWidth * 0.95,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#b986ee',
        justifyContent: 'space-between',
        maxHeight: '25%',
      },
      collabTopRow: {
        // borderBlockColor: "green",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      },
      collabEarphone: {
        // borderBlockColor: "red",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      },
      collabPeopleIcon: {
        // borderBlockColor: "white",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
        // flex: 1,
      },
      collabMid: {
        // borderBlockColor: "red",
        // borderWidth: 2,
        // flex: 1,
        flexWrap: 'wrap', // Allow text to wrap
        overflow: 'hidden', // Hide overflow content
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      },
      collabBot: {
        // borderBlockColor: "white",
        // borderWidth: 2,
        marginTop: 5,
        flexWrap: 'wrap', // Allow text to wrap
        overflow: 'hidden', // Hide overflow content
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      },
      collabButton: {
        height: "100%",
        borderRadius: 20,
        backgroundColor: 'black',
        padding: 5,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      collabButtonText: {
        color: 'white',
        fontSize: 20 * scaleFactor,
        fontWeight: 'bold',
      },

      // ------ Collab Info -------- 

      // ------ Queue Box Scrolling Info -------- 

      queueBox: {
        margin: 10,
        width: screenWidth * 0.95,
        justifyContent: 'space-between',
        maxHeight: '35%',

        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 8, // Increased elevation for a more pronounced effect on Android
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, // Increased shadow opacity for a more pronounced effect on iOS
        shadowRadius: 4,
        padding: 10,


      },
      queueTopRow: {
        // borderBlockColor: "green",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 5
      },
      questionNumsBlock: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
      },
      iconBlock: {
        flexDirection: "row",
      },
      questionIcon: {
        alignSelf: "center"
      },
      expectedText: {
        marginLeft: 5,
        fontSize: 20,
        alignSelf: 'flex-end',
      },
      queueBot: {
        // borderBlockColor: "white",
        // borderWidth: 2,
        marginTop: 5,
        flexWrap: 'wrap', // Allow text to wrap
        overflow: 'hidden', // Hide overflow content
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      }
  });

export default styles;