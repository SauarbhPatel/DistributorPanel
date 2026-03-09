import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";

const CreatePaymentMethodsMaster = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        methodCode: "",
        methodName: "",
        description: "",
        paymentGateway: { name: "None" },
        checkoutTemplate: { name: "None" },
        faviconType: "Local file",
        paymentInstructions: "",
        userGroups: [], // guest, registered, manufacturer, etc.
        categories: { name: "Select categories..." },
        extraChargeApply: "",
        extraChargeTitle: "",
        transactionFee: "",
        status: { name: "Active" },
    });

    useEffect(() => {
        if (isEdit && item) {
            updateState({
                methodCode: item.code,
                methodName: item.methodName,
                description: item.description,
                transactionFee: item.transactionFee?.replace("%", "") || "",
                status: {
                    name: item.status === "active" ? "Active" : "Inactive",
                },
                // ... map other fields as per API response
            });
        }
    }, [isEdit, item]);

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const toggleUserGroup = (group) => {
        const current = [...state.userGroups];
        const index = current.indexOf(group);
        if (index > -1) current.splice(index, 1);
        else current.push(group);
        updateState({ userGroups: current });
    };

    const {
        isLoading,
        methodCode,
        methodName,
        description,
        paymentGateway,
        checkoutTemplate,
        faviconType,
        paymentInstructions,
        userGroups,
        categories,
        extraChargeApply,
        extraChargeTitle,
        transactionFee,
        status,
    } = state;

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
                {/* 1 & 2. Method Code and Name */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Method Code *"
                        placeholder="E.G. CC, UPI, CASH"
                        value={methodCode}
                        valuekey="methodCode"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Method Name *"
                        placeholder="e.g. Credit Card, UPI"
                        value={methodName}
                        valuekey="methodName"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* 3. Description */}
                <TextAreaBox
                    title="Description (optional)"
                    placeholder="Brief description of the payment method"
                    value={description}
                    valuekey="description"
                    onChangeText={updateState}
                    multiline={true}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* 4 & 5. Gateway and Template */}
                <View style={{}}>
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="4. Service Payment Gateway *"
                            list={[
                                { name: "None" },
                                { name: "Stripe" },
                                { name: "PayPal" },
                            ]}
                            value={paymentGateway}
                            onSelected={(v) =>
                                updateState({ paymentGateway: v })
                            }
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="5. Assign Checkout Template *"
                            list={[{ name: "None" }, { name: "Default" }]}
                            value={checkoutTemplate}
                            onSelected={(v) =>
                                updateState({ checkoutTemplate: v })
                            }
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                        />
                    </View>
                </View>

                {/* 6. Favicon / Image Radio Buttons */}
                <Text style={[titleStyle, { marginTop: 15 }]}>
                    6. Favicon / Image *
                </Text>
                <View style={[rowStyle, { gap: 20, marginVertical: 10 }]}>
                    {["Local file", "Server path", "URL"].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={radioRow}
                            onPress={() => updateState({ faviconType: type })}
                        >
                            <View
                                style={[
                                    radioCircle,
                                    faviconType === type && radioSelected,
                                ]}
                            />
                            <Text>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TextAreaBox
                    placeholder="File name or path"
                    // value={methodCode}
                    // valuekey="methodCode"
                    onChangeText={updateState}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* 7. Payment Instructions */}
                <TextAreaBox
                    title="7. Payment Instructions"
                    placeholder="Instructions shown to the user at checkout (e.g. UPI ID, bank details)"
                    value={paymentInstructions}
                    valuekey="paymentInstructions"
                    onChangeText={updateState}
                    multiline={true}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* 8. User Groups Checkboxes */}
                <Text style={[titleStyle, { marginTop: 15 }]}>
                    8. User Groups *
                </Text>
                <Text style={{ fontSize: 12, color: "gray", marginBottom: 10 }}>
                    Select which user types can use this payment method. At
                    least one is required.
                </Text>
                <View style={[rowStyle, { flexWrap: "wrap", gap: 15 }]}>
                    {[
                        "All",
                        "Guest",
                        "Registered User",
                        "Manufacturer",
                        "Distributor",
                        "Seller",
                    ].map((group) => (
                        <TouchableOpacity
                            key={group}
                            style={radioRow}
                            onPress={() => toggleUserGroup(group)}
                        >
                            <View
                                style={[
                                    checkboxSquare,
                                    userGroups.includes(group) && radioSelected,
                                ]}
                            />
                            <Text>{group}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Categories */}
                <DropDownTextAreaBox
                    type="select"
                    title="Assign Categories"
                    list={[{ name: "Electronics" }, { name: "Service" }]}
                    value={categories}
                    onSelected={(v) => updateState({ categories: v })}
                    titleCustomStyle={titleStyle}
                    inputCustomStyle={inputStyle}
                />

                {/* 9 & 10. Extra Charge */}
                <View style={{}}>
                    <TextAreaBox
                        title="9. Extra Charge Apply"
                        placeholder="e.g. 2 (for 2%) or 10 (fixed amount)"
                        value={extraChargeApply}
                        valuekey="extraChargeApply"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="10. Extra Charge Title"
                        placeholder="e.g. Processing fee"
                        value={extraChargeTitle}
                        valuekey="extraChargeTitle"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Transaction Fee and Status */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Transaction Fee % (optional)"
                        placeholder="e.g. 1.5"
                        value={transactionFee}
                        valuekey="transactionFee"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="Status"
                            list={[{ name: "Active" }, { name: "Inactive" }]}
                            value={status}
                            onSelected={(v) => updateState({ status: v })}
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                        />
                    </View>
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
                        // onPress={__handleSave}
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

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};
const titleStyle = { marginHorizontal: 0 };
const rowStyle = { flexDirection: "row", gap: 10 };
const radioRow = { flexDirection: "row", alignItems: "center", gap: 6 };
const radioCircle = {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
};
const checkboxSquare = {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#d1d5db",
};
const radioSelected = { backgroundColor: "#2563EB", borderColor: "#2563EB" };

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
    createText: { color: Colors.whiteColor, ...Fonts.blackColor14Bold },
};

export default CreatePaymentMethodsMaster;
