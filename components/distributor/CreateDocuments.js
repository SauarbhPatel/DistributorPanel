import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import BottomPopup from "../common/BottomPopup";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../modules";

const CreateDocuments = ({ navigation }) => {
    const [state, setState] = useState({
        isShowSupplier: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowSupplier } = state;
    return (
        <>
            <FontAwesome
                name="plus"
                size={20}
                color={Colors.primaryColor}
                onPress={() => {
                    updateState({ isShowSupplier: true });
                }}
            />
            <BottomPopup
                isShow={isShowSupplier}
                title="Add Company"
                onClose={() => {
                    updateState({ isShowSupplier: false, path: "" });
                }}
                component={
                    <View
                        style={{
                            paddingBottom: 100,
                            backgroundColor: Colors.whiteColor,
                            gap: 10,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{
                                    height: 1,
                                    width: 10,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                            <Text>Contact Person Details</Text>
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                        </View>
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Name"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Email"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Phone No."}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{
                                    height: 1,
                                    width: 10,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                            <Text>Company Details</Text>
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                        </View>
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Company Name"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Email"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"GST Number"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <DropDownTextAreaBox
                            type="select"
                            title={"GST Type"}
                            placeholder={"Select GST Type"}
                            list={[]}
                            value={null}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            onSelected={(value) => {}}
                            customStyle={{ marginBottom: 5 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Address Line 1"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Address Line 2"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Pincode"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"City"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />
                        <DropDownTextAreaBox
                            type="select"
                            title={"Country"}
                            placeholder={"Select Country"}
                            list={[]}
                            value={null}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            onSelected={(value) => {}}
                            customStyle={{ marginBottom: 5 }}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{
                                    height: 1,
                                    width: 10,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                            <Text>Additional Details</Text>
                            <View
                                style={{
                                    height: 1,
                                    flex: 1,
                                    backgroundColor: "#c1c1c1ff",
                                }}
                            />
                        </View>
                        <TextAreaBox
                            value={""}
                            onChangeText={(value) => {
                                // updateState(value);
                            }}
                            placeholder={"0"}
                            required
                            title={"Company Reference Code"}
                            valuekey={"res"}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            customStyle={{ marginBottom: 0, flex: 1 }}
                        />

                        <DropDownTextAreaBox
                            type="select"
                            title={"Tags"}
                            placeholder={"Select Tags"}
                            list={[]}
                            value={null}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={{
                                marginHorizontal: 0,
                                borderWidth: 1,
                                borderColor: "#c1c1c1ff",
                                elevation: 0,
                                backgroundColor: Colors.whiteColor,
                                paddingVertical: 5,
                            }}
                            onSelected={(value) => {}}
                            customStyle={{ marginBottom: 5 }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.greenColor,
                                padding: 15,
                                borderRadius: 30,
                                alignSelf: "center",
                                minWidth: 150,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor13Bold,
                                    color: Colors.whiteColor,
                                    textAlign: "center",
                                }}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </>
    );
};

export default CreateDocuments;
