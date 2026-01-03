import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";

const CreateDocuments = ({ navigation }) => {
    const [state, setState] = useState({
        isShowCreate: false,
        isShowSupplier: false,
        path: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate, isShowSupplier, path } = state;
    return (
        <>
            <FontAwesome
                name="plus"
                size={20}
                color={Colors.primaryColor}
                onPress={() => {
                    updateState({ isShowCreate: true });
                }}
            />

            <BottomPopup
                isShow={isShowCreate}
                title="Create New Record"
                onClose={() => {
                    updateState({ isShowCreate: false, path: "" });
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
                            placeholder={"Please Enter Raw Material Name"}
                            required
                            title={"Raw Material Name"}
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
                            customStyle={{ marginBottom: 0 }}
                        />
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <DropDownTextAreaBox
                                type="select"
                                title={"Unit of measurement"}
                                placeholder={"Select"}
                                list={[].map((num) => ({
                                    id: num,
                                    name: num,
                                }))}
                                required
                                value={null}
                                isSearchable
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 5,
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
                                customStyle={{ marginBottom: 0, flex: 1 }}
                            />
                            <DropDownTextAreaBox
                                type="select"
                                title={"Minimum stock level"}
                                placeholder={"Select"}
                                list={[].map((num) => ({
                                    id: num,
                                    name: num,
                                }))}
                                required
                                value={null}
                                isSearchable
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 5,
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
                                customStyle={{ marginBottom: 0, flex: 1 }}
                            />
                        </View>
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"Enter Description / notes"}
                            required
                            title={"Description / notes"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 0,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0 }}
                        />
                        <TouchableOpacity
                            style={{
                                borderRadius: 30,
                                backgroundColor: Colors.greenColor,
                                padding: 15,
                                marginTop: 15,
                                alignSelf: "center",
                                alignItems: "center",
                                paddingHorizontal: 20,
                                minWidth: 180,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor15Bold,
                                    color: Colors.whiteColor,
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
