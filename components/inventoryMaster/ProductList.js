import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/funtion";

const ProductList = ({ title }) => {
    const [state, setState] = useState({
        list: [
            {
                itemId: "RMO1",
                itemDescription: "Row Material 1",
                hsnSacCode: "",
                quantity: "1",
                units: "KG",
                currentStock: "140",
                price: "₹150",
                tax: "5%",
                totalBeforeTax: "₹150",
            },
            {
                itemId: "RMO2",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO3",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO4",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO5",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO6",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO7",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO8",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RMO9",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RM10",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RM11",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
            {
                itemId: "RM12",
                itemDescription: "Row Material 2",
                hsnSacCode: "",
                quantity: "2",
                units: "KG",
                currentStock: "80",
                price: "₹200",
                tax: "5%",
                totalBeforeTax: "₹400",
            },
        ],
        isShowAdd: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { list, isShowAdd } = state;

    return (
        <>
            <View
                style={{
                    // width: width * 0.75,
                    borderRadius: 5,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: 10,
                }}
            >
                <View
                    style={{
                        padding: 15,
                        gap: 5,
                        paddingTop: 0,
                        paddingHorizontal: 0,
                    }}
                >
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={
                            <>
                                <View
                                    style={{
                                        overflow: "hidden",
                                        // borderRadius: 5,
                                        margin: 0.5,
                                        backgroundColor: Colors.whiteColor,
                                        elevation: 2,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            backgroundColor: Colors.borderColor,
                                        }}
                                    >
                                        {titleBox("S.No", true, true, 60)}
                                        {titleBox("Item Id", true, true, 100)}
                                        {titleBox("Item Name", true, true, 200)}
                                        {titleBox(
                                            "Item Category",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Current Stock",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox("Unit", true, true, 120)}
                                        {titleBox(
                                            "Default Price",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Regular Buying Price",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Wholesale Buying Price",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Regular Selling Price",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox("MRP", true, true, 120)}
                                        {titleBox(
                                            "Dealer Price",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Distributor Price ",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Stock Status",
                                            true,
                                            true,
                                            130
                                        )}
                                        {titleBox("Type", true, true, 120)}
                                        {titleBox("HSN Code", true, true, 120)}
                                        {titleBox("Tax", true, true, 100)}
                                        {titleBox(
                                            "Minimum Stock Level",
                                            true,
                                            true,
                                            160
                                        )}
                                        {titleBox(
                                            "Maximum Stock Level",
                                            false,
                                            true,
                                            160
                                        )}
                                    </View>
                                    {list
                                        .map((item, i) => ({
                                            ...item,
                                            sr: i + 1,

                                            bottom:
                                                i + 1 == list.length
                                                    ? true
                                                    : false,
                                        }))
                                        .map((item) => (
                                            <ListBox
                                                key={__generateRandomString(10)}
                                                data={item}
                                            />
                                        ))}
                                </View>
                            </>
                        }
                    />

                    {list.length === 0 && (
                        <View
                            style={{
                                alignItems: "center",
                                paddingVertical: 20,
                                backgroundColor: Colors.bodyColor,
                                borderRadius: 10,
                            }}
                        >
                            <Text>No Item Added</Text>
                        </View>
                    )}
                </View>
            </View>
        </>
    );
    function titleBox(text1, right, bottom, width) {
        return (
            <View
                style={{
                    width: width,
                }}
            >
                <View
                    style={{
                        borderRightWidth: right ? 0.5 : 0,
                        borderBottomWidth: bottom ? 0.5 : 0,
                        borderColor: Colors.lightGrayColor,
                        height: 32,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            fontSize: 12,
                            // color: Colors.whiteColor,
                        }}
                    >
                        {text1}
                    </Text>
                </View>
            </View>
        );
    }
};

export default ProductList;
const ListBox = ({ data }) => {
    const { bottom, sr } = data;

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    borderBottomWidth: bottom ? 0 : 0.5,
                    borderColor: Colors.lightGrayColor,
                    backgroundColor: Colors.whiteColor,
                }}
            >
                {listText(sr, 0, 60)}
                {listText(data?.itemId, 0, 100)}
                {listText(data?.itemDescription, 0, 200)}
                {listText("-", 0, 120)}
                {listText("120", 0, 120)}
                {listText("Kg", 0, 120)}
                {listText("₹150.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("₹0.00", 0, 120)}
                {listText("Min Limit missing", 0, 130)}
                {listText("Buy", 0, 120)}
                {listText("-", 0, 120)}
                {listText("-", 0, 100)}
                {listText("-", 0, 160)}
                {listText("-", 0, 160, true)}
            </View>
        </View>
    );

    function listText(text, flexGrow, width, isEnd) {
        return (
            <View
                style={{
                    borderRightWidth: isEnd ? 0 : 0.5,
                    width: width || "auto",
                    borderColor: Colors.lightGrayColor,
                    height: 32,
                    justifyContent: "center",
                    flexGrow: flexGrow,
                    paddingHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.whiteColor15Regular,
                        color: Colors.grayColor,
                        fontSize: 13,
                    }}
                >
                    {text}
                </Text>
            </View>
        );
    }
};
