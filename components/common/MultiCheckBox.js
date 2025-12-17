import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";

const BorderBox = ({ title, com }) => {
    return (
        <>
            {title && (
                <Text
                    style={{
                        // position: "absolute",
                        // top: -12,
                        // left: 5,
                        // zIndex: 1,
                        backgroundColor: Colors.whiteColor,
                        // paddingHorizontal: 10,
                        fontSize: 12,
                        ...Fonts.fontFamilyMedium,
                        marginTop: 20,
                    }}
                >
                    {title}
                </Text>
            )}
            <View
                style={{
                    borderWidth: 1,
                    borderColor: Colors.lightGrayColor,
                    padding: 10,
                    borderRadius: 10,
                    position: "relative",
                    marginTop: 10,
                }}
            >
                {/* {title && (
                <Text
                    style={{
                        // position: "absolute",
                        // top: -12,
                        // left: 5,
                        // zIndex: 1,
                        backgroundColor: Colors.whiteColor,
                        paddingHorizontal: 10,
                        fontSize: 12,
                        ...Fonts.fontFamilyMedium,
                    }}
                >
                    {title}
                </Text>
            )} */}
                {com}
            </View>
        </>
    );
};
const CircleCheckBoxCommon = ({ navigation, isActive, onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                borderColor: Colors.grayColor,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isActive && (
                <View
                    style={{
                        backgroundColor: color || Colors.greenColor,
                        width: 15,
                        height: 15,
                        borderRadius: 50,
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

const MultiCheckBox = ({
    title = "",
    selected = [],
    onChange = () => {},
    list = [],
}) => {
    return (
        <>
            <BorderBox
                title={title}
                com={
                    <View style={{}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={list}
                            keyExtractor={() => __generateRandomString(10)}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ flexDirection: "row", gap: 5 }}
                                    onPress={() => onChange(item.id)}
                                >
                                    <CircleCheckBoxCommon
                                        isActive={
                                            selected.includes(item.id)
                                                ? true
                                                : false
                                        }
                                        onPress={() => onChange(item.id)}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor15Medium,
                                            fontSize: 13,
                                            marginRight: 10,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{
                                gap: 10,
                                paddingVertical: 5,
                            }}
                        />
                    </View>
                }
            />
        </>
    );
};

export default MultiCheckBox;
