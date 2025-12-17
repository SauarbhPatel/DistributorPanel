import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Linking, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
const UserLicence = () => {
    return (
        <View style={{ gap: 5 }}>
            <Text style={{ ...Fonts.blackColor12Medium }}>
                <AntDesign name="tags" color={Colors.blackColor} size={15} /> If
                you do not have WPC user Licence{" "}
                <Text
                    style={{ color: Colors.primaryColor }}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.nsws.gov.in/portal/approval-details/ministry-of-communications/department-of-telecommunications/wpc-network-fixed-land-mobile-hf-vhf-uhf-below-806-mhz"
                        )
                    }
                >
                    click HERE
                </Text>{" "}
                to apply.
            </Text>
            <Text style={{ ...Fonts.blackColor12Medium }}>
                <AntDesign name="tags" color={Colors.blackColor} size={15} /> If
                you want to know more about the WPC user Licences{" "}
                <Text
                    style={{ color: Colors.primaryColor }}
                    onPress={() =>
                        Linking.openURL(
                            "https://baofengradios.s3.ap-south-1.amazonaws.com/image-1763129140040.pdf"
                        )
                    }
                >
                    click HERE
                </Text>{" "}
            </Text>
            {/* <Text style={{ ...Fonts.blackColor12Medium }}>
                        {getLocalizedString("MEATZ PACKAGING")}:
                    </Text> */}

            {/* {item?.product?.variation_Form[0]?.data?.map((item, i) => (
                        <Text
                            key={__generateRandomString(10)}
                            style={[
                                {
                                    ...Fonts.blackColor12Medium,
                                    borderWidth: 1,
                                    borderColor: Colors.grayColor,
                                    paddingHorizontal: Sizes.fixPadding,
                                    marginHorizontal: Sizes.fixPadding,
                                    borderRadius: 3,
                                    marginBottom: 5,
                                    textTransform: "uppercase",
                                },
                                variations.weight == item && {
                                    borderColor: Colors.primaryColor,
                                    backgroundColor: Colors.primaryColor,
                                    ...Fonts.whiteColor12Medium,
                                },
                            ]}
                            onPress={() => __handleChangeVariant(item)}
                        >
                            {item}
                        </Text>
                    ))} */}
        </View>
    );
};

export default UserLicence;
