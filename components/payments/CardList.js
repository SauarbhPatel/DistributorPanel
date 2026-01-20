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

const CardList = ({ navigation }) => {
    const [list, setlist] = useState([
        {
            companyName: "Surya Demo Supplier",
            documentNumber: "PO-00003",
            transactionDetails: "Purchase Order dated 12/12/2025",
            invoiceStatus: "Invoice Pending",
            goodsStatus: "Not Received",
            lastModified: "18/12/2025 18:10",
        },
        {
            companyName: "Surya Demo Supplier",
            documentNumber: "PO-00004",
            transactionDetails: "Purchase Order for Raw Material 1 (Dummy)",
            invoiceStatus: "Invoice Created",
            goodsStatus: "Received",
            lastModified: "11/12/2025 08:57",
        },
        {
            companyName: "Surya Demo Supplier",
            documentNumber: "PO-00004",
            transactionDetails: "Purchase Order for Raw Material 1 (Dummy)",
            invoiceStatus: "Invoice Created",
            goodsStatus: "Received",
            lastModified: "11/12/2025 08:57",
        },
        {
            companyName: "Surya Demo Supplier",
            documentNumber: "PO-00004",
            transactionDetails: "Purchase Order for Raw Material 1 (Dummy)",
            invoiceStatus: "Invoice Created",
            goodsStatus: "Received",
            lastModified: "11/12/2025 08:57",
        },
    ]);
    return (
        <>
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

export default CardList;
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
                    {leftTextBox("Company", "Merc Demo Buyer")}
                    {rightTextBox("Document Type", "Invoice")}
                </>
            )}
            {boxContainer(
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PaymentInvoice")}
                    >
                        {leftTextBox(
                            "Document Number",
                            "INVDM0002 (PO: PO/0001 | OC: OC00001)",
                            true
                        )}
                    </TouchableOpacity>

                    {rightTextBox("Document Date", "11/12/2025")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Payment Due Date", "26/12/2025")}
                    {rightTextBox("Last Modified At", item?.lastModified)}
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
