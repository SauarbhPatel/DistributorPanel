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
const IdentityVerificationForm = ({ onClickContinue = () => {} }) => {
    const [state, setState] = useState({
        panNumber: "ABCDE1234F",
        isLoading: false,
        isPanVerified: false,
        aadhaarNumber: "123412341234",
        isAadharVerified: false,
        aadhaarDocumentUrl: "",
        panDocumentUrl: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isLoading,
        panNumber,
        isPanVerified,
        aadhaarNumber,
        isAadharVerified,
        aadhaarDocumentUrl,
        panDocumentUrl,
    } = state;

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
                        value={panNumber}
                        editable={!isPanVerified}
                        onChangeText={(value) => {
                            updateState(value);
                        }}
                        placeholder={"Enter PAN Number"}
                        title={"PAN Number"}
                        valuekey={"panNumber"}
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
                    <TouchableOpacity
                        disabled={isPanVerified}
                        onPress={async () => {
                            if (isValidPAN(panNumber)) {
                                updateState({
                                    isLoading: true,
                                });
                                const res = await __verifyPANno(panNumber);
                                console.log(res);
                                if (res?.data?.error) {
                                    updateState({
                                        isLoading: false,
                                    });
                                    Alert.alert(
                                        "Failed",
                                        res?.data?.message?.message,
                                    );
                                } else {
                                    updateState({
                                        isLoading: false,
                                        isPanVerified: true,
                                    });
                                    Alert.alert(
                                        "Success",
                                        res?.data?.message?.message,
                                    );
                                }
                            } else {
                                Alert.alert("Failed", "Enter Valid PAN Number");
                            }
                        }}
                        style={{
                            height: 50,
                            marginBottom: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 15,
                            backgroundColor: isPanVerified ? "green" : "orange",
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor12Medium,
                                color: Colors.whiteColor,
                                fontSize: 14,
                            }}
                        >
                            {isPanVerified ? "Verified" : "Verify"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <PageBox
                    item={null}
                    title={"Upload PAN Document"}
                    dyWidth="100%"
                    type="pdf"
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
                        alignItems: "flex-end",
                        gap: 10,
                    }}
                >
                    <TextAreaBox
                        value={aadhaarNumber}
                        onChangeText={updateState}
                        placeholder={"Enter Aadhaar Number"}
                        title={"Aadhaar Number"}
                        valuekey={"aadhaarNumber"}
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
                        editable={!isAadharVerified}
                    />
                </View>
                <PageBox
                    item={null}
                    type="pdf"
                    title={"Upload Aadhaar Document"}
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

                <TouchableOpacity
                    onPress={() => {
                        if (!isValidPAN(panNumber)) {
                            return Alert.alert("", "Enter Valid PAN Number");
                        }
                        // if (!isPanVerified) {
                        //     return Alert.alert("", "Verify PAN Number");
                        // }
                        if (!isValidAadhaar(aadhaarNumber)) {
                            return Alert.alert(
                                "",
                                "Enter Valid Aadhaar Number",
                            );
                        }
                        onClickContinue({
                            panNumber,
                            aadhaarNumber,
                            aadhaarDocumentUrl,
                            panDocumentUrl,
                            isPanVerified,
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
        </>
    );
};

export default IdentityVerificationForm;
