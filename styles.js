import { ScreenWidth } from '@freakycoder/react-native-helpers';
import { StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    // ----------ALL----------
    container: {
        flex: 1,
    },
    pageHeader: {
        marginTop: '10%',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    sectionHeader: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'normal',
        marginTop: '10%', // adjust space from course name header
    },

    // ----------HomePage----------
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    courseSection: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // borderWidth: 2, // Set the border width USED TO TEST FOR BORDERS
      // borderColor: 'red', // Set the border color
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
      width: screenWidth * 0.8,
      borderWidth: 2,
      borderColor: '#000',
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

    // ----------CoursePage----------
    container2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      questionBox: {
        padding: 10,
        margin: 10,
        width: screenWidth * 0.9,
        height: 100,
        borderWidth: 2,
        borderColor: '#9F6FDD',
        borderRadius: 20,
      },
      questionTEXT: {
        fontSize: 22,
      },
      collabButton: {
        width: 145,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      collabButtonTEXT: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      backArrow: {
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: '5%',
        marginTop: '15%',
      },
      backTEXT: {
        fontSize: 18,
        marginLeft: 5,
      },

      // ----------QuestionPage----------
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
        borderWidth: 5,
      },
      modalHeader: {
        // flexDirection: 'row',
        alignItems: 'flex-end',
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
      input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
      },
      bottomSection2: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1,
      },

      // ------ Notification Info -------- 
      NotiContainer: {
        borderBlockColor: "blue",
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
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
      collabHeader : {
        borderBlockColor: "blue",
        borderWidth: 2,
        // flex: 1,
        alignItems: 'center',
      },
      collabBox: {
        // flexDirection: 'row', // have course name and join button in one row
        padding: 10,
        margin: 10,
        width: screenWidth * 0.8,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        backgroundColor: '#b986ee',
        justifyContent: 'space-between', // align items along the row
      },
      collabTopRow: {
        borderBlockColor: "green",
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: 'center', // align items along the row
      },
      collabEarphone: {
        // borderBlockColor: "red",
        // borderWidth: 2,
        // flex: 1,
      },
      collabPeopleIcon: {
        // borderBlockColor: "white",
        // borderWidth: 2,
        // flex: 1,
      },

      // ------ Collab Info -------- 

  });

export default styles;
