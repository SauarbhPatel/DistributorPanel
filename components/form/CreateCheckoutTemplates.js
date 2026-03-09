import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { MaterialIcons } from "@expo/vector-icons";

const CreateCheckoutTemplates = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        templateCode: "",
        templateName: "",
        description: "",
        fileName: "", // To store the name of the uploaded file
        status: { name: "Active" },
    });

    useEffect(() => {
        if (isEdit && item) {
            updateState({
                templateCode: item.code || "",
                templateName: item.name || "",
                description: item.description || "",
                fileName: item.templateFile || "",
                status: {
                    name:
                        item.status?.charAt(0).toUpperCase() +
                            item.status?.slice(1) || "Active",
                },
            });
        }
    }, [isEdit, item]);

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        templateCode,
        templateName,
        description,
        fileName,
        status,
    } = state;

    const __handleSave = () => {
        console.log("Saving Template Data:", state);
    };

    return (
        <>
            <Loader isShow={isLoading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Template Code and Name Row */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Template Code *"
                        placeholder="E.G. DEFAULT, MINIMAL"
                        value={templateCode}
                        valuekey="templateCode"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Template Name *"
                        placeholder="e.g. Default Checkout"
                        value={templateName}
                        valuekey="templateName"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Description Field */}
                <TextAreaBox
                    title="Description (optional)"
                    placeholder="Brief description of the checkout template"
                    value={description}
                    valuekey="description"
                    onChangeText={updateState}
                    multiline={true}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* Upload Section */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[titleStyle, { marginBottom: 4 }]}>
                        Upload pre-built template
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "gray",
                            marginBottom: 10,
                        }}
                    >
                        Upload an HTML or text template file. The file name will
                        be stored and content saved for use.
                    </Text>

                    <TouchableOpacity
                        style={uploadBtnStyle}
                        activeOpacity={0.7}
                        onPress={() => console.log("Open File Picker")}
                    >
                        <MaterialIcons
                            name="file-upload"
                            size={20}
                            color="black"
                        />
                        <Text style={{ marginLeft: 8 }}>Choose file</Text>
                    </TouchableOpacity>

                    {fileName ? (
                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 13,
                                color: Colors.primaryColor,
                            }}
                        >
                            Selected: {fileName}
                        </Text>
                    ) : null}
                </View>

                {/* Status Dropdown */}
                <View style={{}}>
                    <DropDownTextAreaBox
                        type="select"
                        title="Status"
                        list={[{ name: "Active" }, { name: "Inactive" }]}
                        value={status}
                        onSelected={(value) => updateState({ status: value })}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Footer Buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onClose}
                    >
                        <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={__handleSave}
                    >
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Save changes"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default CreateCheckoutTemplates;

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const titleStyle = {
    marginHorizontal: 0,
};

const rowStyle = {
    flexDirection: "row",
    gap: 12,
};

const uploadBtnStyle = {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#f9fafb",
};

const styles = {
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 40,
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createBtn: {
        backgroundColor: Colors.primaryColor || "#2563EB",
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createText: {
        color: Colors.whiteColor,
        ...Fonts.blackColor14Bold,
    },
};
