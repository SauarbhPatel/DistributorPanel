import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ShippingMethodModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Create shipping method
                    </Text>
                    <Text style={styles.headerSub}>
                        Courier, service mode, weight/value conditions, charges,
                        and leaf categories. Assign this method to zones so it
                        appears at checkout.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* 1. Basic Details */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Method name{" "}
                                <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Delhivery Economy 0–5kg"
                                placeholderTextColor="#adb5bd"
                            />
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Courier partner{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        — Select —
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#495057"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Service mode</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        Economy
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#495057"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{}}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Payment support
                                </Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        Both
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#495057"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Priority (higher = preferred when multiple
                                    match)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Status</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>Draft</Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* 2. Weight & Value Conditions */}
                        <Text style={styles.sectionTitle}>
                            Weight & value conditions
                        </Text>
                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Min weight (kg)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Max weight (kg)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="50"
                                />
                            </View>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <FlagItem
                                label="Volumetric weight allowed"
                                active={false}
                            />
                            <FlagItem label="Oversize allowed" active={false} />
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Min order value (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="—"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Max order value (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="—"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    COD max limit (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="—"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Insurance threshold (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="—"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* 3. Charges */}
                        <Text style={styles.sectionTitle}>Charges</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Charge model</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    Flat rate
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Base charge (₹)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Per kg charge (₹)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Remote area surcharge (₹)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginTop: "auto" },
                                ]}
                            >
                                <Text style={styles.label}>COD fee (₹)</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                        </View>

                        {/* 4. Categories */}
                        <Text style={styles.sectionTitle}>
                            Applicable categories (leaf)
                        </Text>
                        <Text style={styles.helperText}>
                            Select leaf categories where this method is allowed.
                            Empty = all categories.
                        </Text>

                        <View style={styles.searchBox}>
                            <Feather name="search" size={16} color="#adb5bd" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search categories..."
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.dropdown, { marginTop: 10 }]}
                        >
                            <Text style={styles.dropdownText}>
                                — Add category —
                            </Text>
                            <Feather
                                name="chevron-down"
                                size={18}
                                color="#495057"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                    >
                        <Feather
                            name="chevron-left"
                            size={20}
                            color="#868e96"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>Save Method</Text>
                            <Feather
                                name="chevron-right"
                                size={20}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const FlagItem = ({ label, active }) => (
    <View style={styles.flagItem}>
        <View style={[styles.checkbox, active && styles.checkboxActive]}>
            {active && <Feather name="check" size={12} color="#fff" />}
        </View>
        <Text style={styles.flagLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    header: { padding: 20 },
    headerTitle: { fontSize: 24, fontWeight: "800", color: "#1a1b1e" },
    headerSub: { color: "#868e96", fontSize: 13, marginTop: 4, lineHeight: 18 },
    content: { flex: 1, paddingHorizontal: 15 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 16, // Premium rounded corners
        padding: 16,
        borderWidth: 1,
        borderColor: "#e9ecef",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#1a1b1e",
        marginTop: 10,
        marginBottom: 5,
    },
    inputGroup: { marginBottom: 15 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    required: { color: "#fa5252" },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    row: { flexDirection: "row" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
    },
    dropdownText: { fontSize: 14, color: "#495057" },
    checkboxContainer: { flexDirection: "row", gap: 20, marginBottom: 15 },
    flagItem: { flexDirection: "row", alignItems: "center", gap: 10 },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#adb5bd",
    },
    checkboxActive: { backgroundColor: "#0070ba", borderColor: "#0070ba" },
    flagLabel: { fontSize: 12, color: "#495057", fontWeight: "500" },
    helperText: { fontSize: 12, color: "#868e96", marginBottom: 10 },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        paddingHorizontal: 12,
        // paddingVertical: 10,
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
    },
    cancelBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
    cancelText: { color: "#868e96", fontWeight: "700", fontSize: 15 },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

export default ShippingMethodModal;
