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
const { width } = Dimensions.get("window");

const RawMaterials = () => {
    const [list, setlist] = useState([
        {
            ReferenceNumber: "FG01",
            ProcessNumber: "Finished Good #1",
            Stage: "Kg",
            Status: "10",
            BOBNumber: "Merc Demo Buyer",
            FGItem: "OC00001",
        },
        {
            ReferenceNumber: "FG01",
            ProcessNumber: "Finished Good #1",
            Stage: "Kg",
            Status: "10",
            BOBNumber: "Merc Demo Buyer",
            FGItem: "OC00001",
        },
        {
            ReferenceNumber: "FG01",
            ProcessNumber: "Finished Good #1",
            Stage: "Kg",
            Status: "10",
            BOBNumber: "Merc Demo Buyer",
            FGItem: "OC00001",
        },
    ]);
    return (
        <View style={{ marginTop: 10 }}>
            <Text
                style={{
                    ...Fonts.blackColor16Bold,
                    color: Colors.grayColor,
                    paddingStart: 10,
                    paddingBottom: 10,
                }}
            >
                Raw Materials
            </Text>
            <FlatList
                data={list}
                renderItem={CardBox}
                keyExtractor={() => __generateRandomString(10)}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 10,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default RawMaterials;

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
        // marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        paddingBottom: 20,
        width: width - 60,
    },
});

const CardBox = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            {boxContainer(
                <>
                    {leftTextBox("Id", "SKU00009")}
                    {rightTextBox("Name", "Housing - BF888S")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Item Category", "Raw Materials")}
                    {rightTextBox("Quantity", 1)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Unit", "Nos")}
                    {rightTextBox("Cost Allocation(%)", "100")}
                </>
            )}
            {boxContainer(<>{leftTextBox("Coments", "")}</>)}
        </TouchableOpacity>
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
    function leftTextBox(title, res, isLink) {
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
                        textDecorationLine: isLink ? "underline" : "none",
                        color: isLink ? Colors.primaryColor : Colors.blackColor,
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
    function rightTextBox(title, res, isLink) {
        return (
            <View style={{ alignItems: "flex-end" }}>
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
                        textDecorationLine: isLink ? "underline" : "none",
                        color: isLink ? Colors.primaryColor : Colors.blackColor,
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
};
