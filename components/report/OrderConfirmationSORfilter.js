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
const OrderConfirmationSORfilter = ({ navigation, name }) => {
    return (
        <>
            <View style={{ padding: 15, gap: 5, paddingTop: 0 }}>
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
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"Enter Company Name"}
                    title={"Company Name"}
                    valuekey={"res"}
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
                    customStyle={{ marginBottom: 0 }}
                />
                <DropDownTextAreaBox
                    type="select"
                    title={"Stores"}
                    placeholder={"Select Stores"}
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
                    title={"Item Id"}
                    placeholder={"Select Item Id"}
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
                    title={"Currency"}
                    placeholder={"Select Currency"}
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
                    title={"Item Type"}
                    placeholder={"Select Item Type"}
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
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"0"}
                    title={"Invoicing Status"}
                    valuekey={"res"}
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
                    customStyle={{ marginBottom: 0 }}
                />
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={""}
                    title={"Document Status"}
                    valuekey={"res"}
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
                    customStyle={{ marginBottom: 0 }}
                />
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"Show Alternate UoM"}
                    title={"Show Alternate UoM"}
                    valuekey={"res"}
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
                    customStyle={{ marginBottom: 0 }}
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

export default OrderConfirmationSORfilter;
