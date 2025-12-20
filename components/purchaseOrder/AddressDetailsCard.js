import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";

const AddressDetailsCard = ({
    title,
    lable,
    address,
    address2,
    address3,
    gstin,
}) => {
    return (
        <View
            style={{
                width: width * 0.75,
                borderRadius: 5,
                backgroundColor: Colors.whiteColor,
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
                <Feather name="edit-2" size={22} color={Colors.whiteColor} />
            </View>

            <View style={{ padding: 15, gap: 5 }}>
                <Text
                    style={{
                        ...Fonts.blackColor13Bold,
                        color: Colors.grayColor,
                    }}
                >
                    {lable}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                    }}
                    numberOfLines={1}
                >
                    {address}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                    }}
                >
                    {address2}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                    }}
                >
                    {address3}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                        marginBottom: 10,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Bold,
                            color: Colors.grayColor,
                        }}
                    >
                        GSTIN :
                    </Text>{" "}
                    {gstin}
                </Text>

                <View
                    style={{
                        borderWidth: 1.5,
                        padding: 5,
                        marginTop: "auto",
                        borderRadius: 5,
                        borderColor: Colors.lightGrayColor,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Bold,
                            textAlign: "center",
                            color: Colors.primaryColor,
                        }}
                    >
                        Place Of Supply
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default AddressDetailsCard;
