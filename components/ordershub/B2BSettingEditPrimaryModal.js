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

const B2BSettingEditPrimaryModal = ({ visible, onClose, initialData }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Edit primary status</Text>
                    <Text style={styles.headerSub}>
                        Status code is unique and immutable once used. Use
                        Deactivate instead of deleting if the status has
                        historical orders.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* 1. Status Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Status name{" "}
                                <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Order name"
                                placeholderTextColor="#adb5bd"
                            />
                        </View>

                        {/* 2. Status Code (Immutable Note) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Status code * (unique, immutable)
                            </Text>
                            <TextInput
                                style={[styles.input, styles.disabledInput]}
                                value="NEW_ORDER2"
                                editable={false}
                            />
                            <Text style={styles.helperText}>
                                Code cannot be changed after creation.
                            </Text>
                        </View>

                        {/* 3. Internal Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Description (internal)
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    { height: 80, textAlignVertical: "top" },
                                ]}
                                placeholder="Optional"
                                multiline={true}
                            />
                            <Text style={styles.helperText}>
                                Internal code decided after discussion. Must be
                                unique.
                            </Text>
                        </View>

                        {/* 4. Status Type Dropdown */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Status type</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>Open</Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                            <Text style={styles.helperText}>
                                Open / In Progress / Closed — for grouping in
                                UI.
                            </Text>
                        </View>

                        {/* 5. Terminal Flag Section */}
                        <View style={styles.flagCard}>
                            <View style={styles.checkboxRow}>
                                <MaterialCommunityIcons
                                    name="checkbox-marked"
                                    size={20}
                                    color="#0071BC"
                                />
                                <Text style={styles.flagText}>
                                    Is terminal (cannot move forward except
                                    exceptions)
                                </Text>
                            </View>
                        </View>

                        {/* 6. Visibility Roles */}
                        <View style={[styles.flagCard, { marginTop: 15 }]}>
                            <Text style={[styles.label, { marginBottom: 12 }]}>
                                Visibility (internal)
                            </Text>
                            <View style={styles.rolesRow}>
                                <RoleToggle label="Admin" active={true} />
                                <RoleToggle label="Seller" active={true} />
                                <RoleToggle label="Buyer" active={true} />
                            </View>
                        </View>

                        {/* 7. Sort Order & Active Status */}
                        <View style={[styles.row, { marginTop: 15 }]}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Sort order / priority
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    defaultValue="0"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Active</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        Active
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#495057"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bottom Tip */}
                        <View style={styles.tipContainer}>
                            <Feather
                                name="message-square"
                                size={16}
                                color="#adb5bd"
                            />
                            <Text style={styles.tipText}>
                                This name will be visible to users in the order
                                workflow.
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Actions */}
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
                            <Text style={styles.saveBtnText}>Save</Text>
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

const RoleToggle = ({ label, active }) => (
    <View style={styles.roleItem}>
        <MaterialCommunityIcons
            name={active ? "checkbox-marked" : "checkbox-blank-outline"}
            size={20}
            color={active ? "#10B981" : "#adb5bd"}
        />
        <Text style={styles.roleLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f4f6" },
    header: { padding: 20 },
    headerSub: { color: "#6b7280", fontSize: 12, marginTop: 4, lineHeight: 18 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#1a1b1e" },
    content: { flex: 1, paddingHorizontal: 16 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 20,
    },
    inputGroup: { marginBottom: 15 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    required: { color: "#ef4444" },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    disabledInput: { backgroundColor: "#f9fafb", color: "#9ca3af" },
    helperText: { fontSize: 11, color: "#9ca3af", marginTop: 4 },
    row: { flexDirection: "row" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 12,
    },
    dropdownText: { fontSize: 14, color: "#1f2937" },
    flagCard: { backgroundColor: "#f9fafb", padding: 12, borderRadius: 8 },
    checkboxRow: { flexDirection: "row", alignItems: "center" },
    flagText: {
        marginLeft: 10,
        fontSize: 13,
        color: "#374151",
        fontWeight: "500",
    },
    rolesRow: { flexDirection: "row", gap: 20 },
    roleItem: { flexDirection: "row", alignItems: "center" },
    roleLabel: { marginLeft: 6, fontSize: 13, color: "#4b5563" },
    tipContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 5,
    },
    tipText: { marginLeft: 10, fontSize: 12, color: "#9ca3af" },
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

export default B2BSettingEditPrimaryModal;
