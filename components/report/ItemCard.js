import { TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ItemCard = ({ title, sub_title, type, onPress = () => {} }) => {
    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 10,
                backgroundColor: Colors.whiteColor,
                borderWidth: 1,
                borderColor: Colors.borderColor,
                padding: 15,
                borderRadius: 10,
                gap: 5,
                marginTop: 10,
            }}
        >
            {type && (
                <View
                    style={{
                        backgroundColor: Colors.primaryColor,
                        alignSelf: "flex-start",
                        padding: 3,
                        paddingHorizontal: 12,
                        borderRadius: 30,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor11Medium,
                            color: Colors.whiteColor,
                        }}
                    >
                        {type}
                    </Text>
                </View>
            )}
            <Text style={{ ...Fonts.blackColor13SemiBold, fontSize: 13 }}>
                {title}
            </Text>
            {sub_title ? (
                <Text style={{ ...Fonts.blackColor12Medium, fontSize: 11 }}>
                    {sub_title}
                </Text>
            ) : null}

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 15,
                }}
            >
                <FontAwesome5
                    name="clipboard-list"
                    size={22}
                    color={Colors.greenColor}
                />
                <Text
                    style={{
                        ...Fonts.blackColor13SemiBold,
                        fontSize: 13,
                        color: Colors.greenColor,
                    }}
                >
                    Generate Report
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ItemCard;
