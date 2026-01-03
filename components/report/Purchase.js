import React, { useState } from "react";
import ItemCard from "./ItemCard";
import OrderConfirmationSORfilter from "./OrderConfirmationSORfilter";
import BottomPopup from "../common/BottomPopup";
import { View } from "react-native";
import { Colors } from "../../constants/styles";

const Purchase = ({ navigation, list = [] }) => {
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
                        <OrderConfirmationSORfilter
                            navigation={navigation}
                            name={name}
                        />
                    </View>
                }
            />

            {list?.map((item) => (
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

export default Purchase;
