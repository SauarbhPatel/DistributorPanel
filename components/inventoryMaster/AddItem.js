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
const AddItem = () => {
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
                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"Enter Item Name"}
                    title={"Item Name"}
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
                    title={"Buy/Sell/Both"}
                    placeholder={"Select Buy/Sell/Both"}
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
                    title={"Product/Service"}
                    placeholder={"Select Product/Service"}
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
                    title={"Unit of Measurement (UoM)"}
                    placeholder={"Select Unit of Measurement (UoM)"}
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
                    title={"Item Category"}
                    placeholder={"Select Item Category"}
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
                    placeholder={"₹0"}
                    title={"Default Price"}
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
                    placeholder={"HSN Code"}
                    title={"HSN Code"}
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
                    placeholder={"0"}
                    title={"Minimum Stock Level"}
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
                    placeholder={"0"}
                    title={"Maximum Stock Level"}
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

export default AddItem;
