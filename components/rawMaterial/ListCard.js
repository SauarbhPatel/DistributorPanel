import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { __generateRandomString } from "../../utils/funtion";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { TextAreaBox } from "../../modules";
const { width } = Dimensions.get("window");

const ListCard = ({ item }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate } = state;
    return (
        <View>
            <BottomPopup
                isShow={isShowCreate}
                title="Edit Stock"
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
                            placeholder={"0"}
                            required
                            title={"Available stock"}
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
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Reserved stock"}
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
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Consumed stock"}
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
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.returnAndExchangeItemInfoWrapStyle}
                onPress={() => updateState({ isShowCreate: true })}
            >
                {boxContainer(
                    <>
                        {leftTextBox(
                            "Raw Material Name",
                            item?.RawMaterialName
                        )}
                        {rightTextBox(
                            "Unit of measurement",
                            item?.unitOfMeasurement
                        )}
                    </>
                )}
                {boxContainer(
                    <>
                        {leftTextBox(
                            "Minimum stock level",
                            item?.minimumStockLevel
                        )}
                        {rightTextBox(
                            "Description / notes",
                            item?.descriptionNotes
                        )}
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
    function boxContainer(com) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                    justifyContent: "space-between",
                }}
            >
                {com}
            </View>
        );
    }
    function leftTextBox(title, res) {
        return (
            <View style={{ maxWidth: width / 2 - 30 }}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 15,
                        color: Colors.lightGrayColor,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor15Medium,
                        fontSize: 13,
                        lineHeight: 15,
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
    function rightTextBox(title, res) {
        return (
            <View style={{ alignItems: "flex-end", flex: 1 }}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 15,
                        color: Colors.lightGrayColor,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor15Medium,
                        fontSize: 13,
                        lineHeight: 15,
                        textAlign: "right",
                    }}
                    numberOfLines={2}
                >
                    {res}
                </Text>
            </View>
        );
    }
};

export default ListCard;
const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },

    returnAndExchangeItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        paddingBottom: 20,
    },
});
