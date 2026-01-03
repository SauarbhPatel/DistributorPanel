import { Text, View } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";

const CardBox = ({ title, list = [] }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 10,
                borderColor: Colors.borderColor,
                padding: 10,
                gap: 10,
            }}
        >
            <Text style={{ ...Fonts.blackColor15SemiBold }}>{title}</Text>

            {list?.map((item) => (
                <View
                    key={item?.id}
                    style={{
                        backgroundColor: Colors.bodyColor,
                        padding: 10,
                        borderRadius: 10,
                        gap: 10,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor15SemiBold }}>
                        ₹{item?.amount}
                    </Text>
                    {item?.countLable ? (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {item?.countLable && (
                                <Text
                                    style={{
                                        ...Fonts.blackColor11Medium,
                                        color: Colors.grayColor,
                                    }}
                                >
                                    {item?.count} {item?.countLable}
                                </Text>
                            )}
                            {item?.percent && (
                                <Text
                                    style={{
                                        ...Fonts.blackColor15Bold,
                                        color: Colors.primaryColor,
                                        fontSize: 11,
                                    }}
                                >
                                    {item?.percent}
                                </Text>
                            )}
                        </View>
                    ) : null}
                </View>
            ))}
        </View>
    );
};

export default CardBox;
