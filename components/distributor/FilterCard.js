import React, { useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";

const FilterCard = ({ navigation }) => {
    const [state, setState] = useState({
        isShowSupplier: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowSupplier } = state;
    return (
        <>
            <TextAreaBox
                value={""}
                onChangeText={(value) => {
                    // updateState(value);
                }}
                placeholder={"Search"}
                valuekey={"res"}
                titleCustomStyle={{
                    marginHorizontal: 0,
                }}
                inputCustomStyle={{
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "#c1c1c1ff",
                    elevation: 0,
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 5,
                }}
                leftIcon={
                    <Feather
                        name="search"
                        size={20}
                        color={Colors.lightGrayColor}
                    />
                }
                rightIcon={
                    <FontAwesome
                        name="filter"
                        size={20}
                        color={Colors.primaryColor}
                        onPress={() => updateState({ isShowSupplier: true })}
                    />
                }
                customStyle={{ marginBottom: 5, marginTop: 10 }}
            />
            <BottomPopup
                isShow={isShowSupplier}
                title="Filters"
                onClose={() => {
                    updateState({ isShowSupplier: false, path: "" });
                }}
                top="65%"
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
                            title={"Company Type"}
                            placeholder={"Select"}
                            list={[
                                { id: "1", name: "All" },
                                { id: "2", name: "Buyers" },
                                { id: "3", name: "Suppliers" },
                            ]}
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
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
};

export default FilterCard;
