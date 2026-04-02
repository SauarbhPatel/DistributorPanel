import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { TextAreaBox } from "../modules";
import { Colors, Fonts } from "../constants/styles";
import { __generateRandomString } from "../utils/funtion";
const PersonalDetailsForm = ({
    onClickContinue = () => {},
    onClickBack = () => {},
}) => {
    const [state, setState] = useState({
        name: "",
        alternateMobile: "",
        phoneNumber: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { name, alternateMobile, phoneNumber } = state;
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
                value={name}
                onChangeText={(value) => {
                    updateState(value);
                }}
                placeholder={"Enter Name"}
                title={"Name"}
                valuekey={"name"}
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
            <View style={{ flexDirection: "row", gap: 10 }}>
                <TextAreaBox
                    value={phoneNumber}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"000 000 0000"}
                    title={"Mobile"}
                    valuekey={"phoneNumber"}
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
                    leftIcon={<Text>+91</Text>}
                    customInputProps={{
                        maxLength: 10,
                    }}
                />
                <TextAreaBox
                    value={alternateMobile}
                    onChangeText={(value) => {
                        updateState(value);
                    }}
                    placeholder={"000 000 0000"}
                    title={"Alternate Mobile"}
                    valuekey={"alternateMobile"}
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
                    leftIcon={<Text>+91</Text>}
                    customInputProps={{
                        maxLength: 10,
                    }}
                />
            </View>
            {/* <View style={{ flexDirection: "row", gap: 10 }}>
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />

                <DropDownTextAreaBox
                    type="select"
                    title={"Select Country"}
                    placeholder={"Select Country"}
                    list={["India", "USA"].map((num) => ({
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
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
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
            </View>

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
            /> */}

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
                        if (!name.trim()) {
                            return Alert.alert("", "Enter Name");
                        }
                        if (phoneNumber.length != 10) {
                            return Alert.alert("", "Enter valid mobile number");
                        }
                        if (alternateMobile.length != 10) {
                            return Alert.alert(
                                "",
                                "Enter valid alternate mobile number",
                            );
                        }
                        onClickContinue({ name, alternateMobile, phoneNumber });
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

export default PersonalDetailsForm;
