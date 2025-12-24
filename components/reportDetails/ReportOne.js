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

const ReportOne = ({ title }) => {
    const [state, setState] = useState({
        list: [],
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
                                        {titleBox(
                                            "Customer Name",
                                            true,
                                            true,
                                            150
                                        )}
                                        {titleBox("OC Number", true, true, 150)}
                                        {titleBox("OC Date", true, true, 120)}
                                        {titleBox("PO Number", true, true, 100)}
                                        {titleBox(
                                            "Original Creation Date",
                                            true,
                                            true,
                                            180
                                        )}
                                        {titleBox(
                                            "Document Status",
                                            true,
                                            true,
                                            150
                                        )}
                                        {titleBox(
                                            "Invoicing Status",
                                            true,
                                            true,
                                            150
                                        )}
                                        {titleBox(
                                            "OC Delivery Date ",
                                            true,
                                            true,
                                            150
                                        )}
                                        {titleBox("Item Id", false, true, 130)}
                                        {titleBox(
                                            "Item Description",
                                            false,
                                            true,
                                            150
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
                            <Text>No data found</Text>
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

export default ReportOne;
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
