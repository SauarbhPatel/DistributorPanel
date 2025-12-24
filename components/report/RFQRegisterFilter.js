import React from "react";
import {
    Dimensions,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";
const RFQRegisterFilter = ({ navigation, name }) => {
    return (
        <>
            <View style={{ padding: 15, gap: 5, paddingTop: 0 }}>
                <DropDownTextAreaBox
                    type="select"
                    title={"RFQ Date Interval"}
                    placeholder={"Select"}
                    list={[].map((num) => ({
                        id: num,
                        name: num,
                    }))}
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
                    title={"Creation Date Interval"}
                    placeholder={"Select"}
                    list={[].map((num) => ({
                        id: num,
                        name: num,
                    }))}
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
                    title={"Delivery Date Interval"}
                    placeholder={"Select"}
                    list={[].map((num) => ({
                        id: num,
                        name: num,
                    }))}
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
                    title={"Bidding End Date Interval"}
                    placeholder={"Select"}
                    list={[].map((num) => ({
                        id: num,
                        name: num,
                    }))}
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

                <TouchableOpacity
                    onPress={() =>
                        navigation.push("ReportDetails", { name: name })
                    }
                    style={{
                        borderRadius: 30,
                        backgroundColor: Colors.greenColor,
                        padding: 10,
                        marginTop: 15,
                        alignSelf: "center",
                        minWidth: width / 2,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor15Bold,
                            color: Colors.whiteColor,
                        }}
                    >
                        Generate Report
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default RFQRegisterFilter;
