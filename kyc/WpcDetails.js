import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../modules";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../constants/styles";
import {
    __generateRandomString,
    isValidAadhaar,
    isValidPAN,
} from "../utils/funtion";
import PageBox from "../components/common/PageBox";
import { __verifyPANno } from "../utils/api/commonApi";
const WpcDetails = ({ onClickContinue = () => {}, onClickBack = () => {} }) => {
    const [state, setState] = useState({
        panNumber: "ABCDE1234F",
        isLoading: false,
        wpcDocumentUrl: "",
        panDocumentUrl: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isLoading, wpcLicenseNumber, wpcDocumentUrl } = state;

    return (
        <>
            <Loader isShow={isLoading} />
            <View
                style={{
                    flex: 1,
                    margin: 10,
                    backgroundColor: Colors.whiteColor,
                    borderWidth: 1,
                    borderColor: Colors.borderColor,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 10,
                    }}
                >
                    <TextAreaBox
                        value={wpcLicenseNumber}
                        onChangeText={updateState}
                        placeholder={"Enter WPC number"}
                        title={"WPC Licence"}
                        valuekey={"wpcLicenseNumber"}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                        }}
                        inputCustomStyle={{
                            marginHorizontal: 0,
                            borderWidth: 1,
                            borderColor: "#c1c1c1ff",
                            elevation: 0,
                            backgroundColor: Colors.whiteColor,
                            paddingVertical: 5,
                        }}
                        customStyle={{ marginBottom: 5, flex: 1 }}
                    />
                </View>
                <PageBox
                    item={null}
                    type="pdf"
                    title={"Upload WPC Document"}
                    dyWidth="100%"
                    onChange={(value) => {
                        // let newArr = new Array(...interpretation);
                        // newArr[index] = value;
                        // updateState({
                        //     interpretation: newArr,
                        // });
                    }}
                    onRemove={() => {
                        // let newArr = new Array(...interpretation);
                        // newArr[index] = {};
                        // console.log(newArr);
                        // updateState({
                        //     interpretation: newArr,
                        // });
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 15,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => onClickBack()}
                        style={{
                            backgroundColor: Colors.lightGrayColor,
                            height: 45,
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            // width: 150,
                            borderRadius: 30,
                            marginVertical: 15,
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                fontSize: 14,
                                color: Colors.whiteColor,
                            }}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onClickContinue({
                                wpcLicenseNumber,
                                wpcDocumentUrl,
                            });
                        }}
                        style={{
                            backgroundColor: Colors.primaryColor,
                            height: 45,
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 150,
                            borderRadius: 30,
                            marginVertical: 15,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                fontSize: 14,
                                color: Colors.whiteColor,
                            }}
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default WpcDetails;
