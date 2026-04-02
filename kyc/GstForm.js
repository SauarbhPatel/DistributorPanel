import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../modules";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../constants/styles";
import { __generateRandomString } from "../utils/funtion";
import PageBox from "../components/common/PageBox";
import MultiCheckBox from "../components/common/MultiCheckBox";
const GstForm = ({ onClickContinue = () => {}, onClickBack = () => {} }) => {
    const [state, setState] = useState({
        gstRegistered: true,
        gstNumber: "",
        companyName: "",
        distributorType: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { gstRegistered, gstNumber, companyName, distributorType } = state;
    return (
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
            <MultiCheckBox
                title="GST Status (Registered with GST)"
                list={[
                    { name: "Yes", id: true },
                    { name: "No (Not Registered)", id: false },
                ]}
                selected={[gstRegistered]}
                onChange={(value) => {
                    // console.log("IsVerified", value);
                    updateState({ gstRegistered: value });
                }}
            />

            {gstRegistered && (
                <TextAreaBox
                    value={gstNumber}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"Enter Gst Number"}
                    title={"Gst Number"}
                    valuekey={"gstNumber"}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        borderWidth: 1,
                        borderColor: "#c1c1c1ff",
                        elevation: 0,
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: 5,
                    }}
                    customStyle={{ marginBottom: 5 }}
                />
            )}
            <TextAreaBox
                value={companyName}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Company Name"}
                title={"Company Name"}
                valuekey={"companyName"}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
                inputCustomStyle={{
                    marginHorizontal: 0,
                    borderWidth: 1,
                    borderColor: "#c1c1c1ff",
                    elevation: 0,
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 5,
                }}
                customStyle={{ marginBottom: 5 }}
            />
            <TextAreaBox
                value={distributorType}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Distribution Type"}
                title={"Distribution Type"}
                valuekey={"distributorType"}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
                inputCustomStyle={{
                    marginHorizontal: 0,
                    borderWidth: 1,
                    borderColor: "#c1c1c1ff",
                    elevation: 0,
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 5,
                }}
                customStyle={{ marginBottom: 5 }}
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
                    onPress={() =>
                        onClickContinue({
                            gstRegistered,
                            gstNumber,
                            companyName,
                            distributorType,
                        })
                    }
                    style={{
                        backgroundColor: Colors.primaryColor,
                        height: 45,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,

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
    );
};

export default GstForm;
