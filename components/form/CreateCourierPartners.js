import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { Feather, FontAwesome } from "@expo/vector-icons";

const CreateCourier = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        courierName: "",
        code: "",
        // Service types
        isEconomy: true,
        isExpress: false,
        isSameDay: false,
        isHandyDrop: false,
        // Support
        isCodSupport: false,
        isInsuranceSupport: false,
        status: { name: "Active" },
        // API Integration
        baseUrl: "",
        authType: { name: "None" },
        webhookUrl: "",
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        courierName,
        code,
        isEconomy,
        isExpress,
        isSameDay,
        isHandyDrop,
        isCodSupport,
        isInsuranceSupport,
        status,
        baseUrl,
        authType,
        webhookUrl,
    } = state;

    const __handleSave = () => {
        console.log("Saving Courier Data:", state);
    };

    return (
        <>
            <Loader isShow={isLoading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Name and Code Row */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Courier name *"
                        placeholder="e.g. Delhivery"
                        value={courierName}
                        valuekey="courierName"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Code *"
                        placeholder="e.g. DELHIVERY"
                        value={code}
                        valuekey="code"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Service Types Supported */}
                <Text style={labelTitle}>Service types supported</Text>
                <View
                    style={[
                        rowStyle,
                        { flexWrap: "wrap", marginTop: 8, marginTop: 20 },
                    ]}
                >
                    <Checkbox
                        itemLabel="Economy"
                        selected={isEconomy}
                        onPress={() => updateState({ isEconomy: !isEconomy })}
                    />
                    <Checkbox
                        itemLabel="Express"
                        selected={isExpress}
                        onPress={() => updateState({ isExpress: !isExpress })}
                    />
                    <Checkbox
                        itemLabel="Same-day"
                        selected={isSameDay}
                        onPress={() => updateState({ isSameDay: !isSameDay })}
                    />
                    <Checkbox
                        itemLabel="Handy Drop"
                        selected={isHandyDrop}
                        onPress={() =>
                            updateState({ isHandyDrop: !isHandyDrop })
                        }
                    />
                    <Checkbox
                        itemLabel="COD support"
                        selected={isCodSupport}
                        onPress={() =>
                            updateState({ isCodSupport: !isCodSupport })
                        }
                    />
                    <Checkbox
                        itemLabel="Insurance support"
                        selected={isInsuranceSupport}
                        onPress={() =>
                            updateState({
                                isInsuranceSupport: !isInsuranceSupport,
                            })
                        }
                    />
                </View>

                {/* Status Dropdown */}
                <DropDownTextAreaBox
                    type="select"
                    title="Status"
                    list={[{ name: "Active" }, { name: "Inactive" }]}
                    value={status}
                    onSelected={(value) => updateState({ status: value })}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* API Integration Section */}
                <Text style={sectionHeader}>API integration</Text>
                <Text style={descriptionText}>
                    Manage API credentials and endpoints. Credentials are stored
                    securely (placeholder; replace with real secret manager in
                    production).
                </Text>

                <TextAreaBox
                    title="Base URL"
                    placeholder="https://api.courier.com"
                    value={baseUrl}
                    valuekey="baseUrl"
                    onChangeText={updateState}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                <DropDownTextAreaBox
                    type="select"
                    title="Auth type"
                    list={[
                        { name: "None" },
                        { name: "Bearer Token" },
                        { name: "API Key" },
                    ]}
                    value={authType}
                    onSelected={(value) => updateState({ authType: value })}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                <TextAreaBox
                    title="Webhook URL (optional)"
                    placeholder="https://your-domain.com/webhooks/courier"
                    value={webhookUrl}
                    valuekey="webhookUrl"
                    onChangeText={updateState}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

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

// Reusable Checkbox Component following your style
const Checkbox = ({ itemLabel, selected, onPress }) => (
    <TouchableOpacity style={checkboxContainer} onPress={onPress}>
        <Feather
            name={selected ? "check-square" : "square"}
            size={20}
            color={selected ? Colors.primaryColor : Colors.lightGrayColor}
        />
        <Text style={checkboxLabel}>{itemLabel}</Text>
    </TouchableOpacity>
);

export default CreateCourier;

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

const labelTitle = {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 20,
};

const rowStyle = {
    flexDirection: "row",
    gap: 12,
};

const sectionHeader = {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 30,
    marginBottom: 5,
};

const descriptionText = {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
    marginBottom: 10,
};

const checkboxContainer = {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
    gap: 10,
};

const checkboxBase = {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
};

const checkboxChecked = {
    backgroundColor: Colors.primaryColor,
};

const checkboxInner = {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 2,
};

const checkboxLabel = {
    fontSize: 14,
    color: "#374151",
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
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createText: {
        color: Colors.whiteColor,
        ...Fonts.blackColor14Bold,
    },
};
