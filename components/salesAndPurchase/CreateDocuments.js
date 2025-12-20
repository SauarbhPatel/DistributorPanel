import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDownTextAreaBox } from "../../modules";

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
                isShow={isShowSupplier}
                title="Please Add/Select Supplier"
                onClose={() => {
                    updateState({ isShowSupplier: false, path: "" });
                }}
                top={"55%"}
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
                        <DropDownTextAreaBox
                            type="select"
                            title={"Select Supplier"}
                            placeholder={"Select Supplier"}
                            list={["Surya Demo Supplier"].map((num) => ({
                                id: num,
                                name: num,
                            }))}
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
                            onSelected={(value) => {
                                // updateState({ duration_type: value });
                                navigation.push(path);
                                updateState({
                                    isShowCreate: false,
                                    isShowSupplier: false,
                                    path: "",
                                });
                            }}
                            // customStyle={{marginBottom: 20 }}
                            customStyle={{ marginBottom: 5 }}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                            <Text>Or</Text>
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: Colors.greenColor,
                                padding: 15,
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor13Bold,
                                    color: Colors.greenColor,
                                    textAlign: "center",
                                }}
                            >
                                Process with a Dummy Supplier
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <BottomPopup
                isShow={isShowCreate}
                title="Create Documents"
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
                        {[
                            { label: "Purchase Order", path: "PurchaseOrder" },
                            { label: "Service Order", path: "" },
                            { label: "Order Confirmation", path: "" },
                            { label: "Service Confirmation", path: "" },
                            { label: "Invoice", path: "" },
                            { label: "Adhoc Invoice", path: "" },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={item?.label + index}
                                onPress={() =>
                                    updateState({
                                        isShowSupplier: true,
                                        path: item.path,
                                    })
                                }
                                style={{
                                    backgroundColor: Colors.bodyColor,
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    borderColor: Colors.borderColor,
                                    padding: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor13Medium,
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                }
            />
        </>
    );
};

export default CreateDocuments;
