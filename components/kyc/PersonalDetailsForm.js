import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import PageBox from "../common/PageBox";
const PersonalDetailsForm = ({
    onAdd,
    oldanswer = [],
    onClickContinue = () => {},
    onClickBack = () => {},
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
                placeholder={"Enter Name"}
                title={"Name"}
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
            <TextAreaBox
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Mobile"}
                title={"Mobile"}
                valuekey={"res"}
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
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Alternate Mobile"}
                title={"Alternate Mobile"}
                valuekey={"res"}
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
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Present Address"}
                title={"Present Address"}
                valuekey={"res"}
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

            <DropDownTextAreaBox
                type="select"
                title={"Select Country"}
                placeholder={"Select Country"}
                list={["Years", "Months", "Weeks", "Days"].map((num) => ({
                    id: num,
                    name: num,
                }))}
                value={duration_type}
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
                    // updateState({ duration_type: value });
                }}
                // customStyle={{marginBottom: 20 }}
                customStyle={{ marginBottom: 5 }}
            />
            <TextAreaBox
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Pin Code"}
                title={"Pin Code"}
                valuekey={"res"}
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
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter State"}
                title={"State"}
                valuekey={"res"}
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
                value={res}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Education Qualification"}
                title={"Education Qualification"}
                valuekey={"res"}
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
                    onPress={() => onClickContinue()}
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

export default PersonalDetailsForm;
