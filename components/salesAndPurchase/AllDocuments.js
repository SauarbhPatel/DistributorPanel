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

const AllDocuments = () => {
    const [list, setlist] = useState([
        {
            poNumber: "PO-2026-001",
            counterParty: "Surya Demo Supplier",
            documentAmount: "150000",
            INRamount: "150000",
            invoiceStatus: "Pending",
            GoodsStatus: "In Transit",
            dueDate: "2026-01-15",
            store: "Mumbai Warehouse",
            amendmentNumber: "0",
            documentDate: "2026-01-02",
            InternalApprovalStatus: "Awaiting Approval",
        },
        {
            poNumber: "PO-2026-002",
            counterParty: "Apex Industries",
            documentAmount: "98000",
            INRamount: "98000",
            invoiceStatus: "Approved",
            GoodsStatus: "Received",
            dueDate: "2026-01-08",
            store: "Delhi Store",
            amendmentNumber: "1",
            documentDate: "2025-12-28",
            InternalApprovalStatus: "Approved",
        },
        {
            poNumber: "PO-2026-003",
            counterParty: "BrightTech Solutions",
            documentAmount: "275000",
            INRamount: "275000",
            invoiceStatus: "Paid",
            GoodsStatus: "Delivered",
            dueDate: "2026-01-05",
            store: "Bangalore Warehouse",
            amendmentNumber: "0",
            documentDate: "2025-12-30",
            InternalApprovalStatus: "Approved",
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

export default AllDocuments;
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
                    {leftTextBox("PO Number", item?.poNumber)}
                    {rightTextBox("Counter Party", item?.counterParty)}
                </>
            )}

            {boxContainer(
                <>
                    {leftTextBox("Document Amount", "₹" + item?.documentAmount)}
                    {rightTextBox("INR Amount", "₹" + item?.INRamount)}
                </>
            )}

            {boxContainer(
                <>
                    {leftTextBox("Invoice Status", item?.invoiceStatus)}
                    {rightTextBox("Goods Status", item?.GoodsStatus)}
                </>
            )}

            {boxContainer(
                <>
                    {leftTextBox("Document Date", item?.documentDate)}
                    {rightTextBox("Due Date", item?.dueDate)}
                </>
            )}

            {boxContainer(
                <>
                    {leftTextBox("Store", item?.store)}
                    {rightTextBox("Amendment No.", item?.amendmentNumber)}
                </>
            )}

            {boxContainer(
                <>
                    {leftTextBox(
                        "Internal Approval",
                        item?.InternalApprovalStatus
                    )}
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
