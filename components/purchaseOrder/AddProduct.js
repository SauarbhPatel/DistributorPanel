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
const AddProduct = () => {
    return (
        <>
            <View style={{ padding: 15, gap: 5, paddingTop: 0 }}>
                <DropDownTextAreaBox
                    type="select"
                    title={"Item Id"}
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
                    title={"Item Description"}
                    placeholder={"Select Item Description"}
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
                    placeholder={"Enter HSN/SAC Code"}
                    title={"HSN/SAC Code"}
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
                    placeholder={"Enter Quantity"}
                    title={"Quantity"}
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
                    title={"Units"}
                    placeholder={"Select Units"}
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
                    placeholder={"Current Stock"}
                    title={"Current Stock"}
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
                    placeholder={"Enter Price"}
                    title={"Price"}
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
                    title={"Tax"}
                    placeholder={"Select Tax"}
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
                    placeholder={"Totak Before Tax"}
                    title={"Totak Before Tax"}
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
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default AddProduct;
