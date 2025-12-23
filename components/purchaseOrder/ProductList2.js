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
import { __generateRandomString } from "../../utils/funtion";

const ProductList2 = ({ title }) => {
    const [state, setState] = useState({
        list: [
            {
                itemId: "RMO1",
                itemDescription: "Row Material 1",
                hsnSacCode: "",
                quantity: "1",
                units: "Kg",
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
                units: "Kg",
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
                                        {titleBox(
                                            "Item Description",
                                            true,
                                            true,
                                            200
                                        )}
                                        {titleBox(
                                            "HSN/SAC Code",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox("Quantity", true, true, 100)}
                                        {titleBox("Rate", true, true, 100)}
                                        {titleBox(
                                            "Taxable Amount",
                                            true,
                                            true,
                                            130
                                        )}
                                        {titleBox("CGST Rate", true, true, 100)}
                                        {titleBox(
                                            "CGST Amount",
                                            true,
                                            true,
                                            110
                                        )}
                                        {titleBox("SGST Rate", true, true, 100)}
                                        {titleBox(
                                            "SGST Amount",
                                            true,
                                            true,
                                            110
                                        )}
                                        {titleBox("Total", false, true, 130)}
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
                        }}
                    >
                        {text1}
                    </Text>
                </View>
            </View>
        );
    }
};

export default ProductList2;
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
                {listText("", 0, 120)}
                {listText(data?.quantity + data?.units, 0, 100)}
                {listText("₹150", 0, 100)}
                {listText("₹150", 0, 130)}
                {listText("1.5%", 0, 100)}
                {listText("₹2.25", 0, 110)}
                {listText("1.5%", 0, 100)}
                {listText("₹2.25", 0, 110)}
                {listText("₹150", 0, 130, true)}
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
