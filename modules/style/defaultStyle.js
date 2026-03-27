import { Dimensions } from "react-native";
import { dynamicColors } from "./customeStyle";
const { width } = Dimensions.get("window");

export const Fonts = {};

export const Colors = {
    blackColor: "#000000",
    redColor: "#FF0000",
    grayColor: "#B7B7B7",
    //not used

    whiteColor: "#FFFFFF",
    primaryColor: "#7C8B4B",
    lightWhiteColor: "#FAFAFA",
    lightPrimaryColor: "#DEEDA8",
    orangeColor: "#FFAC33",
    greenColor: "#008F11",
    purpleColor: "#757DE8",
    pinkColor: "#D05CE3",
    darkPinkColor: "#FF6090",
    bodyColor: "#f5f6fb",

    ...dynamicColors,
};

export const Sizes = {
    fixPadding: 10.0,
};

export const inputTitleDefaultStyle = {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding * 2.0,
    color: Colors.blackColor,
    fontSize: 12,
    fontFamily: "Roboto_Medium",
};
export const inputBoxDefaultStyle = {
    paddingVertical: 3,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: Sizes.fixPadding,
    fontSize: 14,
    color: "#1a1b1e",
};

export const selectFormTitleDefaultStyle = {
    borderBottomWidth: 0.5,
    borderColor: Colors.grayColor,
    paddingBottom: 10,
    marginBottom: 15,
};
export const selectFormModelDefaultStyle = {
    width: width - 40,
    backgroundColor: Colors.whiteColor,

    alignSelf: "center",
    borderRadius: 20,
    elevation: 5,
    position: "relative",
    shadowColor: Colors.primaryColor,
    maxHeight: 400,
    minHeight: 250,
};
export const selectListItemDefaultStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.fixPadding,
    margin: Sizes.fixPadding,
    marginHorizontal: 0,
};
export const selectListItemTextDefaultStyle = {
    fontSize: 12.0,
    color: Colors.blackColor,
    flex: 1,
};
export const dropDownTextDefaultStyle = {
    fontSize: 14.0,
    color: Colors.blackColor,
    flex: 1,
};
export const searchBoxDefaultStyle = {};
export const otpMainBoxDefaultStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 2,
    justifyContent: "center",
};
export const otpContainerDefaultStyle = {
    width: width - 40,
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    borderRadius: 20,
    elevation: 5,
    position: "relative",
    shadowColor: Colors.primaryColor,
};
export const otpTitleDefaultStyle = {
    fontSize: 24,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    textAlign: "center",
};
export const otpSubButtonDefaultStyle = {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 3.0,
    textAlign: "center",
};
export const otpButtonDefaultStyle = {
    backgroundColor: Colors.primaryColor,
    alignSelf: "center",
    marginVertical: Sizes.fixPadding * 2.0,
    borderRadius: 5,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "center",
    padding: 10,
    color: Colors.whiteColor,
};
