import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import { TextAreaBox } from "../../modules";
import CreateDocuments from "../../components/salesAndPurchase/CreateDocuments";
import AddressDetailsCard from "../../components/purchaseOrder/AddressDetailsCard";
import PlaceOfSupply from "../../components/purchaseOrder/PlaceOfSupply";
import PrimaryDocumentDetails from "../../components/purchaseOrder/PrimaryDocumentDetails";
import ProductList from "../../components/purchaseOrder/ProductList";
const { width } = Dimensions.get("window");

const PurchaseOrderScreen = ({ navigation }) => {
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
    ]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}

                <FlatList
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                    ListHeaderComponent={
                        <View style={{ gap: 10 }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            // alignItems: "center",
                                            gap: 10,
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <AddressDetailsCard
                                            title={"Buyer Details"}
                                            lable={"Abaris Products"}
                                            address="98 B, II Floor, NFC, Near JMI"
                                            address2="South Delhi (Delhi)"
                                            address3="India - 110025"
                                            gstin="07AAECA1234Q1ZV"
                                        />
                                        <AddressDetailsCard
                                            title={"Delivery Location"}
                                            lable={"Main"}
                                            address="98 B, II Floor, NFC, Near JMI"
                                            address2="South Delhi (Delhi)"
                                            address3="India - 110025"
                                            gstin="07AAECA1234Q1ZV"
                                        />
                                        <AddressDetailsCard
                                            title={"Supplier Details"}
                                            lable={"Surya Demo Supplier"}
                                            address="26/3, 30, Nanik Niwas, Dr.D.D Sathe Marg, Near Girgaon Church, Opera House"
                                            address2="Mumbai (Maharashtra)"
                                            address3="India - 400004"
                                            gstin="27AACCF7457K1Z7"
                                        />
                                    </View>
                                }
                            />
                            <PlaceOfSupply title={"Place Of Supply"} />
                            <PrimaryDocumentDetails
                                title={"Primary Document Details"}
                            />
                            <ProductList title={"Product List"} />
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                        flex: 1,
                    }}
                >
                    Purchase Order
                </Text>
            </View>
        );
    }
};

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

export default PurchaseOrderScreen;

const CardBox = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            {boxContainer(
                <>
                    {leftTextBox("Company Name", item?.companyName)}
                    {rightTextBox("Document Number", item?.documentNumber)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox(
                        "Transaction Details",
                        item?.transactionDetails
                    )}
                    {rightTextBox("Invoice Status", item?.invoiceStatus)}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Goods Status", item?.goodsStatus)}
                    {rightTextBox("Last Modified", item?.lastModified)}
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
