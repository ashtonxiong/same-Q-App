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
        // borderColor: 'red',
        // borderWidth: 2,
    },
    appBar: {
      backgroundColor: "#9F6FDD",
      height: 115,
    },
    pageHeader: {
      // borderBlockColor: "blue",
      // borderWidth: 2,
      marginTop: '20%',
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
  },
  sectionHeader: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'normal',
      marginTop: '10%', // adjust space from course name header
      marginLeft: '3%'
  },
    // pageHeader: {
    //     marginTop: '5%',
    //     textAlign: 'center',
    //     fontSize: 40,
    //     fontWeight: 'bold',
    // },
    // sectionHeader: {
    //     color: 'black',
    //     fontSize: 30,
    //     fontWeight: 'normal',
    //     marginTop: '10%', // adjust space from course name header
    //     marginLeft: 20,
    // },
    backArrow: {
      flexDirection: 'row',
      justifyContent: 'left',
      marginLeft: '5%',
      marginTop: '17%',
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
    bottomSection: {
      justifyContent: 'flex-end',
      height: '100%',
      marginBottom: '40%', // adjust space from bottom of screen
    },
    courseContainer: {
      marginTop: 5,
    },
    courseBox: {
      flexDirection: 'row', // have course name and join button in one row
      padding: 30,
      margin: 10,
      width: screenWidth * 0.95,
      borderRadius: 20,
      backgroundColor: '#b986ee',
      justifyContent: 'space-between', // align items along the row
    },
    courseBoxTEXT: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
    },
    joinButton: {
      width: 70,
      borderRadius: 20,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    joinButtonTEXT: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
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
        fontSize: 22,
      },
      courseCollabButton: {
        width: 145,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      courseCollabButtonTEXT: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      scrollContainer: {
        alignItems: 'center'
      },

      // ----------QuestionPage----------
      questionContainer: {
        flex: 1,
      },
      questionPageBox: {
        backgroundColor: "#9F6FDD",
        height: screenHeight * 0.23,
      },
      questionPageBoxHeader: {
        flexDirection: 'row',
        marginTop: 45,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between',
      },
      chatArea: {
        flex: 1,
        height: 0,
        borderColor: "green",
        borderWidth: 5,
      },
      customModalOverlay: {
        ...StyleSheet.absoluteFillObject, // apply fill to custom modal
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // value for transparency
      },
      modalContent: {
        width: screenWidth * 0.8, 
        height: 500,
        padding: 25,
        backgroundColor: "#CFB8E9",
        borderRadius: 20, // round corners
        borderColor: 'black',
        borderWidth: 2,
      },
      modalHeader: {
        alignItems: 'flex-end',
      },
      modalHeaderTEXT: {
        margin: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalHeaderTEXT2: {
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
      },
      uncollabButton: {
        width: 175,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalUncollab: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      cancelButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: '5%',
        marginTop: 10,
      },
      cancelTEXT: {
        fontSize: 18,
        marginLeft: 5,
      },
      questionInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 5,
      },
      questionHost: {
        fontSize: 18,
        fontWeight: '200',
      },
      numCollaborators: {
        flexDirection: 'row',
      },
      numInHuddle: {
        flexDirection: 'row'
      },
      inputContainer: {
        borderColor: 'red',
        borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
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

      // ------ Notification Info -------- 

      // ------ Collab Info -------- 
      collabScroll: {
        // borderBlockColor: "red",
        // borderWidth: 2,
        // flex: 1,
        // flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        // alignItems: 'center'
      },
      collabContainer: {
        // borderBlockColor: "green",
        // borderWidth: 2,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: '20%',
        // paddingTop: 10,
        height: '100%',
        paddingBottom: '0.5%',
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

  });

export default styles;