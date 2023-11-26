import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    // ALL
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
    courseBoxTEXT: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
    },
    icons : {
      // Nothing here yet
    },
    input : {
      width: "100%",
      height: 82,
      fontSize: 18,
      textAlignVertical: 'center',
      paddingRight: 80,
      paddingLeft: 20,
    },
    input2 : {
      paddingBottom: 20,
      backgroundColor: "#D9D9D9",
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
    },
    bottomSection: {
      justifyContent: 'flex-end',
      height: '100%',
      marginBottom: '40%', // adjust space from bottom of screen
    },
    // sectionHeader: {
    //   color: 'black',
    //   fontSize: 30,
    //   fontWeight: 'normal',
    //   marginTop: '10%', // adjust space from 'Courses' header
    // },
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
        fontSize: 20,
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

      //QuestionPage
      questionContainer: {
        flex: 1,
        justifyContent: 'space-between'
      },
      pageHeader: {
        marginTop: '15%',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      // pageHeaderText : {
      //   fontSize: 30,
      //   marginTop: 30,
      //   fontWeight: 'bold',
      // },
      topBlock: {
        width: '100%',
        backgroundColor: '#c061fb',
        borderRadius: '15em',
        marginTop: '-10%',
        zIndex: 1
      },
      QuestionInfo : {
        width: '100%',
        marginLeft: 20,
        marginTop: 10,

        // This margin controlls the amount of space below the icons
        marginBottom: "1%",
      },
      QuestionInfoText : {
        fontSize: 18,
      },
      questionHelpTimeText : {
        marginTop: "2%",

        // This margin controls the amount of space for the icons (Sorry, a little scuffed)
        marginBottom: "5%"
      },
      questionActivityIndicator : {
        // backgroundColor: "white",
        width: "40%",
        height: 40,
        position: 'absolute',
        bottom: 0,
        right: 30,
        justifyContent: 'space-evenly',
        alignItems: "right",
        paddingTop: 7,
        flexDirection: "row"
      },
      questionMembers : {
        flexDirection: "row"
      },
      activityNumbers : {
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 1
      },
      sendMessage : {
        justifyContent : 'flex-end',
        width : "100%",
        backgroundColor: "#D9D9D9",
        paddingTop: 10 
      },
      sendMessageBUTTON : {
        position: "absolute",
        bottom: "45%",
        right: 30,
      },
      TextsArea : {
        flex : 1,
      },
      // huddleButton : {
      //   position : 'absolute',
      //   height : 100,
      //   width : 100,
      //   backgroundColor: 'grey',
      //   bottom: 20,
      //   right : 20,
      //   borderRadius: '100%'
      // },
      huddleBar: {
        width: '100%',
        backgroundColor: 'grey',
        marginTop : "-5%",
        paddingTop: "7%",
        borderBottomLeftRadius: "18em", 
        borderBottomRightRadius: "18em",
        justifyContent: "center",
        alignItems: "center",
      },
      huddleBarTEXT: {
        paddingBottom: "1%",
        fontSize: 16
      }
}
);

export default styles;
