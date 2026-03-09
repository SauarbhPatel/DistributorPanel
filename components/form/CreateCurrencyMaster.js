import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { MaterialIcons } from "@expo/vector-icons";

const CreateCurrencyMaster = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        currencyCode: "",
        currencyName: "",
        symbol: "",
        conversionRate: "1",
        effectiveDate: "",
        status: { name: "Active" },
        isBaseCurrency: false,
    });

    useEffect(() => {
        if (isEdit && item) {
            updateState({
                currencyCode: item.currencyCode,
                currencyName: item.currencyName,
                symbol: item.symbol,
                conversionRate: item.conversionRate?.toString() || "1",
                effectiveDate: item.effectiveDate,
                status: {
                    name:
                        item.status.charAt(0).toUpperCase() +
                        item.status.slice(1),
                },
                isBaseCurrency: !!item.isBaseCurrency,
            });
        }
    }, [isEdit, item]);

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        currencyCode,
        currencyName,
        symbol,
        conversionRate,
        effectiveDate,
        status,
        isBaseCurrency,
    } = state;

    const __handleSave = () => {
        console.log("Saving Currency Data:", state);
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
                {/* Currency Code and Name Row */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Currency Code (ISO)"
                        placeholder="E.G. USD, INR"
                        value={currencyCode}
                        valuekey="currencyCode"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Currency Name"
                        placeholder="e.g. US Dollar"
                        value={currencyName}
                        valuekey="currencyName"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Symbol and Conversion Rate Row */}
                <View style={[rowStyle]}>
                    <TextAreaBox
                        title="Symbol"
                        placeholder="e.g. $, ₹, €"
                        value={symbol}
                        valuekey="symbol"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Conversion Rate to Base"
                        placeholder="1"
                        value={conversionRate}
                        valuekey="conversionRate"
                        onChangeText={updateState}
                        keyboardType="numeric"
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Date and Status Row */}
                <View style={[rowStyle]}>
                    <TextAreaBox
                        title="Effective Date (optional)"
                        placeholder="dd-mm-yyyy"
                        value={effectiveDate}
                        valuekey="effectiveDate"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                        rightIcon={
                            <MaterialIcons
                                name="calendar-today"
                                size={18}
                                color="black"
                            />
                        }
                    />
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="Status"
                            list={[{ name: "Active" }, { name: "Inactive" }]}
                            value={status}
                            onSelected={(value) =>
                                updateState({ status: value })
                            }
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                        />
                    </View>
                </View>

                {/* Checkbox Section */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.checkboxContainer}
                    onPress={() =>
                        updateState({ isBaseCurrency: !isBaseCurrency })
                    }
                >
                    <View
                        style={[
                            styles.checkbox,
                            isBaseCurrency && styles.checkboxActive,
                        ]}
                    >
                        {isBaseCurrency && (
                            <MaterialIcons
                                name="check"
                                size={14}
                                color="white"
                            />
                        )}
                    </View>
                    <Text style={styles.checkboxLabel}>Is Base Currency</Text>
                </TouchableOpacity>

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

export default CreateCurrencyMaster;

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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        gap: 10,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: {
        backgroundColor: Colors.primaryColor || "#2563EB",
        borderColor: Colors.primaryColor || "#2563EB",
    },
    checkboxLabel: {
        ...Fonts.blackColor14Medium,
        fontSize: 15,
    },
};
