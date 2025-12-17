import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __makeProductDeliveryCheckPostRequest } from "../../utils/api";

const CheckCodDelivery = () => {
    const [loading, setLoading] = useState(false);
    const [pinCode, setPinCode] = useState("");
    const [isServiceable, setIsServiceable] = useState(false);
    const [message, setMessage] = useState("");

    // https://ind-eng.onlineparttimejobs.in/api/delivery-service/pincode
    // {"pincode":"486001"}
    //     {
    //     "error": false,
    //     "is_serviceable": true,
    //     "message": "Pincode is serviceable",
    //     "data": {
    //         "cod": "Y",
    //         "pre_paid": "Y",
    //         "cash": "Y",
    //         "pickup": "Y",
    //         "repl": "Y"
    //     }
    // }

    const __handleCheck = () => {
        setLoading(true);
        __makeProductDeliveryCheckPostRequest({ pincode: pinCode })
            .then((res) => {
                console.log(res);
                setLoading(false);
                setIsServiceable(res?.is_serviceable);
                setMessage(res?.message);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    return (
        <View>
            <Text style={{ ...Fonts.blackColor12Medium }}>COD Delivery</Text>
            <View
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter Delivery Pincode"
                        value={pinCode}
                        onChangeText={(text) => setPinCode(text)}
                        style={{
                            flex: 1,
                            ...Fonts.blackColor15Medium,
                            paddingHorizontal: 15,
                        }}
                        keyboardType="number-pad"
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        pinCode?.length > 5 && !loading && __handleCheck();
                    }}
                    style={{
                        backgroundColor:
                            pinCode?.length > 5
                                ? Colors.primaryColor
                                : Colors.lightGrayColor,
                        width: 100,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 45,
                    }}
                >
                    {loading ? (
                        <ActivityIndicator
                            size={"small"}
                            color={Colors.whiteColor}
                        />
                    ) : (
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                fontSize: 14,
                            }}
                        >
                            Check
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
            {message && (
                <Text
                    style={{
                        ...Fonts.blackColor12Medium,
                        color: isServiceable
                            ? Colors.greenColor
                            : Colors.redColor,
                        marginTop: -5,
                    }}
                >
                    {message}
                </Text>
            )}
        </View>
    );
};

export default CheckCodDelivery;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: Sizes.fixPadding,
        paddingVertical: 2.5,
        // paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        flex: 1,
    },
});
