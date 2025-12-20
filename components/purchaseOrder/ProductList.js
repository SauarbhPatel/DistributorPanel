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
import BottomPopup from "../common/BottomPopup";
import AddProduct from "./AddProduct";

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
        ],
        isShowAdd: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { list, isShowAdd } = state;

    return (
        <>
            <BottomPopup
                isShow={isShowAdd}
                title="Add Item"
                onClose={() => {
                    updateState({ isShowAdd: false });
                }}
                component={
                    <View
                        style={{
                            paddingBottom: 100,
                            backgroundColor: Colors.whiteColor,
                            paddingTop: 10,
                        }}
                    >
                        <AddProduct />
                    </View>
                }
            />
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
                        backgroundColor: Colors.primaryColor,
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        paddingVertical: 12,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            color: Colors.whiteColor,
                        }}
                    >
                        {title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            updateState({ isShowAdd: true });
                        }}
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                color: Colors.whiteColor,
                            }}
                        >
                            Add Item
                        </Text>
                        <Feather
                            name="plus"
                            size={18}
                            color={Colors.whiteColor}
                        />
                    </TouchableOpacity>
                </View>

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
                                        {titleBox("Units", true, true, 100)}
                                        {titleBox(
                                            "Current Stock",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox("Price", true, true, 100)}
                                        {titleBox("Tax", true, true, 100)}
                                        {titleBox(
                                            "Totak Before Tax",
                                            false,
                                            true,
                                            130
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
                {listText(data?.hsnSacCode, 0, 120)}
                {listText(data?.quantity, 0, 100)}
                {listText(data?.units, 0, 100)}
                {listText(data?.currentStock, 0, 120)}
                {listText(data?.price, 0, 100)}
                {listText(data?.tax, 0, 100)}
                {listText(data?.totalBeforeTax, 0, 130, true)}
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
