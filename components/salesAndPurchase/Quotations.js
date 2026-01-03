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

const Quotations = () => {
    const [list, setlist] = useState([
        {
            quotationNumber: "QT-00123",
            companyName: "Surya Demo Supplier",
            enquiryNumber: "ENQ-4587",
            totalAmount: "125000",
            ocCreated: "Yes",
            dealStatus: "In Progress",
            dealOwner: "Rahul Sharma",
            nextActionDate: "2026-01-10",
            tags: "Hot, Priority",
            createdBy: "Admin",
            creationDate: "2026-01-01",
        },
        {
            quotationNumber: "QT-00124",
            companyName: "Apex Industries",
            enquiryNumber: "ENQ-4588",
            totalAmount: "89000",
            ocCreated: "No",
            dealStatus: "Pending",
            dealOwner: "Anita Verma",
            nextActionDate: "2026-01-12",
            tags: "Warm",
            createdBy: "Sales Team",
            creationDate: "2026-01-02",
        },
        {
            quotationNumber: "QT-00125",
            companyName: "BrightTech Solutions",
            enquiryNumber: "ENQ-4589",
            totalAmount: "210000",
            ocCreated: "Yes",
            dealStatus: "Closed Won",
            dealOwner: "Karan Mehta",
            nextActionDate: "2026-01-05",
            tags: "Closed, High Value",
            createdBy: "Admin",
            creationDate: "2025-12-28",
        },
    ]);
    return (
        <>
            <FlatList
                data={list}
                renderItem={CardBox}
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

export default Quotations;
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

const CardBox = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            {boxContainer(
                <>
                    {leftTextBox("Quotation", item?.quotationNumber)}
                    {rightTextBox("Company Name", item?.companyName)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Enquiry Number", item?.enquiryNumber)}
                    {rightTextBox("Total Amount", "₹" + item?.totalAmount)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("OC Created", item?.ocCreated)}
                    {rightTextBox("Deal Status", item?.dealStatus)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Deal Owner", item?.dealOwner)}
                    {rightTextBox("Next Action Date", item?.nextActionDate)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Created By", item?.createdBy)}
                    {rightTextBox("Creation Date", item?.creationDate)}
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
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
};
