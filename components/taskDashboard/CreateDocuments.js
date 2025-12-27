import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";

const CreateDocuments = ({ navigation }) => {
    const [state, setState] = useState({
        isShowSupplier: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowSupplier } = state;
    return (
        <>
            <FontAwesome
                name="plus"
                size={20}
                color={Colors.primaryColor}
                onPress={() => {
                    updateState({ isShowSupplier: true });
                }}
            />
            <BottomPopup
                isShow={isShowSupplier}
                title="Create a new task"
                onClose={() => {
                    updateState({ isShowSupplier: false, path: "" });
                }}
                component={
                    <View
                        style={{
                            paddingBottom: 100,
                            backgroundColor: Colors.whiteColor,
                            gap: 10,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                        }}
                    >
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={""}
                            required
                            title={"Task name"}
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
                            customInputProps={{
                                multiline: true,
                                numberOfLines: 6,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <DropDownTextAreaBox
                            type="select"
                            title={"Assign to"}
                            placeholder={"Select Assign to"}
                            list={[]}
                            value={null}
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
                            onSelected={(value) => {}}
                            customStyle={{ marginBottom: 5 }}
                        />
                        <DropDownTextAreaBox
                            type="date"
                            title={"Due date"}
                            placeholder={"Select Date"}
                            list={[]}
                            value={null}
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
                            onSelected={(value) => {}}
                            customStyle={{ marginBottom: 5 }}
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.greenColor,
                                padding: 15,
                                borderRadius: 30,
                                alignSelf: "center",
                                minWidth: 150,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor13Bold,
                                    color: Colors.whiteColor,
                                    textAlign: "center",
                                }}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
};

export default CreateDocuments;
