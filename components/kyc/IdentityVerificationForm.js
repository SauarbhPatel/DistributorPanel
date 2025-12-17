import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import PageBox from "../common/PageBox";
const IdentityVerificationForm = ({
    onAdd,
    oldanswer = [],
    onClickContinue = () => {},
}) => {
    const [state, setState] = useState({
        res: "",
        period: null,
        answer: [],
        duration_type: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { res, period, answer, duration_type } = state;
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
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter PAN Number"}
                title={"PAN Number"}
                valuekey={"res"}
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
            <PageBox
                item={null}
                title={"Upload PAN Document"}
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
            {/* <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                }}
            >
                <TextAreaBox
                    value={period}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"Duration of Consumption"}
                    valuekey={"period"}
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        borderWidth: 1,
                        borderColor: Colors.lightGrayColor,
                        elevation: 0,
                        backgroundColor: Colors.bodyColor,
                        flex: 1,
                    }}
                    customStyle={{ marginTop: 5, marginBottom: 20, flex: 1 }}
                    keyboardType={"number-pad"}
                />
                <DropDownTextAreaBox
                    type="select"
                    placeholder={"Period"}
                    list={["Years", "Months", "Weeks", "Days"].map((num) => ({
                        id: num,
                        name: num,
                    }))}
                    value={duration_type}
                    isSearchable
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        borderWidth: 1,
                        borderColor: Colors.lightGrayColor,
                        elevation: 0,
                        backgroundColor: Colors.bodyColor,
                        width: 110,
                    }}
                    titleCustomStyle={{ marginHorizontal: 0 }}
                    onSelected={(value) => {
                        updateState({ duration_type: value });
                    }}
                    customStyle={{ marginTop: 5, marginBottom: 20 }}
                />
            </View> */}
            <TouchableOpacity
                onPress={() => onClickContinue()}
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
    );
};

export default IdentityVerificationForm;
