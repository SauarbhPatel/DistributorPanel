import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    CheckBox,
    Switch,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";

const CreateShippingMethods = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        methodName: "",
        courierPartner: null,
        serviceMode: { name: "Economy" },
        paymentSupport: { name: "Both" },
        priority: "0",
        status: { name: "Draft" },
        // Weight & Value
        minWeight: "0",
        maxWeight: "50",
        volumetricAllowed: false,
        oversizeAllowed: false,
        minOrderValue: "",
        maxOrderValue: "",
        codMaxLimit: "",
        insuranceThreshold: "",
        // Charges
        chargeModel: { name: "Flat rate" },
        baseCharge: "0",
        perKgCharge: "0",
        remoteAreaSurcharge: "0",
        codFee: "0",
        // Categories
        categorySearch: "",
        selectedCategories: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        methodName,
        courierPartner,
        serviceMode,
        paymentSupport,
        priority,
        status,
        minWeight,
        maxWeight,
        volumetricAllowed,
        oversizeAllowed,
        minOrderValue,
        maxOrderValue,
        codMaxLimit,
        insuranceThreshold,
        chargeModel,
        baseCharge,
        perKgCharge,
        remoteAreaSurcharge,
        codFee,
        categorySearch,
        selectedCategories,
    } = state;

    // Logic to handle saving based on the new fields
    const __handleSave = () => {
        // Validation and API call logic here
        console.log("Saving Shipping Method:", state);
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
                {/* Method Name */}
                <TextAreaBox
                    title="Method name *"
                    placeholder="e.g. Delhivery Economy 0–5kg"
                    value={methodName}
                    valuekey="methodName"
                    onChangeText={updateState}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* Courier and Service Mode */}
                <View style={rowStyle}>
                    <DropDownTextAreaBox
                        type="select"
                        title="Courier partner *"
                        placeholder=" Select "
                        list={[{ name: "Delhivery" }, { name: "FedEx" }]}
                        value={courierPartner}
                        onSelected={(value) =>
                            updateState({ courierPartner: value })
                        }
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <DropDownTextAreaBox
                        type="select"
                        title="Service mode"
                        list={[{ name: "Economy" }, { name: "Express" }]}
                        value={serviceMode}
                        onSelected={(value) =>
                            updateState({ serviceMode: value })
                        }
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Payment Support and Priority */}
                <View style={rowStyle}>
                    <DropDownTextAreaBox
                        type="select"
                        title="Payment support"
                        list={[
                            { name: "Both" },
                            { name: "Prepaid" },
                            { name: "COD" },
                        ]}
                        value={paymentSupport}
                        onSelected={(value) =>
                            updateState({ paymentSupport: value })
                        }
                        customStyle={{ flex: 1, marginTop: 13 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                        isSearchable
                    />
                    <TextAreaBox
                        title="Priority (higher = preferred when multiple match)"
                        value={priority}
                        valuekey="priority"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Status */}
                <DropDownTextAreaBox
                    type="select"
                    title="Status"
                    list={[{ name: "Draft" }, { name: "Active" }]}
                    value={status}
                    onSelected={(value) => updateState({ status: value })}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                    isSearchable
                />

                <Text style={sectionHeader}>Weight & value conditions</Text>

                {/* Min/Max Weight */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Min weight (kg)"
                        value={minWeight}
                        valuekey="minWeight"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Max weight (kg)"
                        value={maxWeight}
                        valuekey="maxWeight"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>
                        Volumetric weight allowed
                    </Text>
                    <Switch
                        value={volumetricAllowed}
                        onValueChange={(value) =>
                            updateState({ volumetricAllowed: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>
                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>
                        Oversize allowed
                    </Text>
                    <Switch
                        value={checkboxChecked}
                        onValueChange={(value) =>
                            updateState({ checkboxChecked: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>

                {/* Min/Max Order Value */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Min order value (optional)"
                        placeholder=""
                        value={minOrderValue}
                        valuekey="minOrderValue"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Max order value (optional)"
                        placeholder=""
                        value={maxOrderValue}
                        valuekey="maxOrderValue"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* COD and Insurance */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="COD max limit (optional)"
                        placeholder=""
                        value={codMaxLimit}
                        valuekey="codMaxLimit"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Insurance threshold (optional)"
                        placeholder=""
                        value={insuranceThreshold}
                        valuekey="insuranceThreshold"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                <Text style={sectionHeader}>Charges</Text>

                <DropDownTextAreaBox
                    type="select"
                    title="Charge model"
                    list={[{ name: "Flat rate" }, { name: "Weight based" }]}
                    value={chargeModel}
                    onSelected={(value) => updateState({ chargeModel: value })}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                    isSearchable
                />

                {/* Base and Per Kg Charge */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Base charge (₹)"
                        value={baseCharge}
                        valuekey="baseCharge"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Per kg charge (₹)"
                        value={perKgCharge}
                        valuekey="perKgCharge"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Surcharge and COD Fee */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Remote area surcharge (₹)"
                        value={remoteAreaSurcharge}
                        valuekey="remoteAreaSurcharge"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="COD fee (₹)"
                        value={codFee}
                        valuekey="codFee"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                <Text style={sectionHeader}>Applicable categories (leaf)</Text>
                <Text
                    style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}
                >
                    Select leaf categories where this method is allowed. Empty =
                    all categories.
                </Text>

                <DropDownTextAreaBox
                    type="select"
                    placeholder=" Add category "
                    list={[]}
                    onSelected={() => {}}
                    inputCustomStyle={inputStyle}
                    customStyle={{ marginTop: 10 }}
                    isSearchable
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
                            {isEdit ? "Update" : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default CreateShippingMethods;

// Styles to maintain consistency with your provided code
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
    // fontSize: 14,
    // color: "#111827",
    // fontWeight: "500",
    // marginBottom: 4,
    // marginTop: 12,
};

const rowStyle = {
    flexDirection: "row",
    gap: 12,
};

const sectionHeader = {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 25,
    marginBottom: 10,
};

const checkboxContainer = {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
};

const checkboxBase = {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 3,
    marginRight: 8,
};

const checkboxChecked = {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
};

const checkboxLabel = {
    fontSize: 14,
    color: "#374151",
};

const styles = {
    statusBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        // marginTop: 10,
        backgroundColor: Colors.whiteColor,
        marginTop: 20,
    },

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
