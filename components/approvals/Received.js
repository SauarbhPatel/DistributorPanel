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

const Received = ({ navigation, lable }) => {
    const [list, setlist] = useState([
        {
            ReferenceNumber: "BF888s-TEST",
            ProcessNumber: "PID00003",
            Stage: "WIP",
            Status: "Approved",
            BOBNumber: "BOM00000 (Walki Talki - BF888S)",
            FGItem: "SKU00008",
            FGName: "BF888S",
            Process: "Master Process",
        },
        {
            ReferenceNumber: "12",
            ProcessNumber: "PID00002",
            Stage: "Planned",
            Status: "-",
            BOBNumber: "BOM00000 (Walki Talki - BF888S)",
            FGItem: "SKU00008",
            FGName: "BF888S",
            Process: "Master Process",
        },
        {
            ReferenceNumber: "12",
            ProcessNumber: "PID00002",
            Stage: "Planned",
            Status: "-",
            BOBNumber: "BOM00000 (Walki Talki - BF888S)",
            FGItem: "SKU00008",
            FGName: "BF888S",
            Process: "Master Process",
        },
    ]);
    return (
        <>
            <Text
                style={{
                    ...Fonts.blackColor15Bold,
                    paddingStart: 10,
                }}
            >
                {lable}
            </Text>
            <FlatList
                data={list}
                renderItem={({ item }) => (
                    <CardBox item={item} navigation={navigation} />
                )}
                keyExtractor={() => __generateRandomString(10)}
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                }}
            />
        </>
    );
};

export default Received;
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

const CardBox = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            {boxContainer(
                <>
                    {leftTextBox("Document Number", "DOC-2026-00124")}
                    {rightTextBox("Document Type", "Invoice")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Counter Party", "ABC Pvt. Ltd.")}
                    {rightTextBox("Amount", "₹25,000")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Created By", "Saurabh Patel")}
                    {rightTextBox("Created Date", "06 Jan 2026")}
                </>
            )}
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
