import { ScreenWidth } from '@freakycoder/react-native-helpers';
import { StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;

const { width, height } = Dimensions.get('window');
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width
    

const styles = StyleSheet.create({
    // ALL
    container: {
        flex: 1,
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
    },

    // HomePage
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

    // CoursePage
    container2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      questionBox: {
        padding: 30,
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

      // ------ Notification Info -------- 
      NotiContainer: {
        // borderBlockColor: "blue",
        // borderWidth: 2,
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
      collabScroll: {
        borderBlockColor: "red",
        borderWidth: 2,
        // flex: 1,
        // flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        // alignItems: 'center'
      },
      collabContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: '0%',
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
        paddingBottom: '0.5%',
      },
      collabHeader : {
        marginBottom: 25,
      },
      collabBox: {
        padding: 10,
        margin: 10,
        width: screenWidth * 0.8,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
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