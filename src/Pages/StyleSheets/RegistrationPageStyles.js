import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    paddingTop: 30
  },
  loginFormContainer: {
    backgroundColor: "#f1f1f1",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    paddingTop: 70,
    paddingLeft: 25,
    paddingRight: 25
  },
  logoPillContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#e6e6e6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10
  },
  logo: {
    width: 27.9,
    height: 26
  },
  loginTitle: {
    fontFamily: "LatoBlack",
    fontSize: 25,
    letterSpacing: 0,
    textAlign: "left",
    color: "#272727"
  },
  loginSubtitle: {
    marginTop: 10,
    fontFamily: "Lato",
    fontSize: 15,
    textAlign: "left",
    color: "#272727"
  },
  loginContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    flexDirection: "column"
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 20,
    borderBottomColor: "#272727",
    borderBottomWidth: 1
  },
  inputIcon: {
    width: 15,
    height: 15
  },
  inputContainer: {
    marginLeft: 15,
    width: "100%"
  },
  nextbtnContainer: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    elevation: 3
  },
  nextbtnText: {
    textAlign: "center",
    color: "#343434",
    fontSize: 20,
    fontFamily: "Lato"
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
    width: "100%"
  },
  bottomPills: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    height: 30,
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomPillsActive: {
    borderRadius: 20,
    backgroundColor: "#e5ccbe",
    height: 30,
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomPillText: {
    color: "#343434",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Lato"
  },
  radioText: {
    color: "#272727",
    fontFamily: "Lato",
    fontSize: 15
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontFamily: "Lato"
  }
});

export default styles;
