import React, { useState } from "react";
import ItemCard from "./ItemCard";
import BottomPopup from "../common/BottomPopup";
import { View } from "react-native";
import { Colors } from "../../constants/styles";
import OrderConfirmationSORfilter from "./OrderConfirmationSORfilter";
import RFQRegisterFilter from "./RFQRegisterFilter";

const MostUsed = ({ navigation }) => {
    const [state, setState] = useState({
        isShow: false,
        name: "",
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShow, name } = state;
    return (
        <>
            <BottomPopup
                isShow={isShow}
                title={name}
                onClose={() => {
                    updateState({ isShow: false });
                }}
                component={
                    <View
                        style={{
                            paddingBottom: 100,
                            backgroundColor: Colors.whiteColor,
                            gap: 10,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                        }}
                    >
                        {name ==
                            "Order Confirmation / Sales Order Register (Item-wise)" && (
                            <OrderConfirmationSORfilter
                                navigation={navigation}
                                name={name}
                            />
                        )}
                        {name == "RFQ Register (Item-wise)" && (
                            <RFQRegisterFilter
                                navigation={navigation}
                                name={name}
                            />
                        )}
                    </View>
                }
            />

            {[
                {
                    type: "Sales",
                    title: "Order Confirmation / Sales Order Register (Item-wise)",
                    sub_title:
                        "Item-wise details of all the order confirmation along with their status",
                },
                {
                    type: "Purchase",
                    title: "RFQ Register (Item-wise)",
                    sub_title:
                        "Item-wise details of all request for quotations",
                },
            ].map((item) => (
                <ItemCard
                    key={item?.title}
                    {...item}
                    onPress={() => {
                        updateState({ isShow: true, name: item?.title });
                    }}
                />
            ))}
        </>
    );
};

export default MostUsed;
