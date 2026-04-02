import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../modules";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../constants/styles";
import { __generateRandomString } from "../utils/funtion";
import PageBox from "../components/common/PageBox";
const BankDetails = ({
    onClickContinue = () => {},
    onClickBack = () => {},
}) => {
    const [state, setState] = useState({
        bankName: "",
        ifsc: "",
        accountNumber: "",
        accountType: null,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { bankName, ifsc, accountNumber, accountType } = state;
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
            <TextAreaBox
                value={bankName}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Bank Name"}
                title={"Bank Name"}
                valuekey={"bankName"}
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
                customStyle={{ marginBottom: 5 }}
            />
            <View style={{}}>
                <TextAreaBox
                    value={accountNumber}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"000 000 0000 0000 0000"}
                    title={"Account Number"}
                    valuekey={"accountNumber"}
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
                    keyboardType={"number-pad"}
                    customInputProps={{
                        maxLength: 16,
                    }}
                />
                <TextAreaBox
                    value={ifsc}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"Enter IFSC Code"}
                    title={"IFSC Code"}
                    valuekey={"ifsc"}
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
            </View>
            <DropDownTextAreaBox
                type="select"
                title={"Account Type"}
                placeholder={"Select Account Type"}
                list={["Savings", "Current"].map((num) => ({
                    id: num,
                    name: num,
                }))}
                value={accountType}
                isSearchable
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
                onSelected={(value) => {
                    updateState({ accountType: value });
                }}
                // customStyle={{marginBottom: 20 }}
                customStyle={{ marginBottom: 5, flex: 1 }}
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
                            bankName,
                            ifsc,
                            accountNumber,
                            accountType,
                        });
                    }}
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

export default BankDetails;
