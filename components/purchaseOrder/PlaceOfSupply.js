import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";

const PlaceOfSupply = ({
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
            </View>

            <View style={{ padding: 15, gap: 5, paddingTop: 0 }}>
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"Enter City"}
                    required
                    title={"City"}
                    valuekey={"res"}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                    }}
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        borderWidth: 1,
                        borderColor: "#c1c1c1ff",
                        elevation: 0,
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: 5,
                    }}
                    customStyle={{ marginBottom: 0 }}
                />
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <DropDownTextAreaBox
                        type="select"
                        title={"State"}
                        placeholder={"Select State"}
                        list={[].map((num) => ({
                            id: num,
                            name: num,
                        }))}
                        required
                        value={null}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 5,
                        }}
                        inputCustomStyle={{
                            marginHorizontal: 0,
                            borderWidth: 1,
                            borderColor: "#c1c1c1ff",
                            elevation: 0,
                            backgroundColor: Colors.whiteColor,
                            paddingVertical: 5,
                        }}
                        onSelected={(value) => {
                            // updateState({ duration_type: value });
                        }}
                        // customStyle={{marginBottom: 20 }}
                        customStyle={{ marginBottom: 0, flex: 1 }}
                    />

                    <DropDownTextAreaBox
                        type="select"
                        title={"Country"}
                        placeholder={"Select Country"}
                        list={[].map((num) => ({
                            id: num,
                            name: num,
                        }))}
                        value={null}
                        required
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 5,
                        }}
                        inputCustomStyle={{
                            marginHorizontal: 0,
                            borderWidth: 1,
                            borderColor: "#c1c1c1ff",
                            elevation: 0,
                            backgroundColor: Colors.whiteColor,
                            paddingVertical: 5,
                        }}
                        onSelected={(value) => {
                            // updateState({ duration_type: value });
                        }}
                        // customStyle={{marginBottom: 20 }}
                        customStyle={{ marginBottom: 0, flex: 1 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default PlaceOfSupply;
