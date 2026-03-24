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

const B2BSettingEditPrimaryModal = ({ visible, onClose }) => {
    const [form, setForm] = useState({
        statusType: "Open",
        visibleTo: { Admin: true, Seller: true, Buyer: false },
        assignmentMode: "Manual Only",
    });

    const toggleRole = (role) => {
        setForm({
            ...form,
            visibleTo: { ...form.visibleTo, [role]: !form.visibleTo[role] },
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="edit-2" size={18} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            Edit primary status
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Top Alert/Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxTitle}>
                            Status Configuration
                        </Text>
                        <Text style={styles.infoBoxText}>
                            Primary statuses represent major stages in the order
                            lifecycle. Changes here will affect all mapped
                            secondary statuses and transition rules.
                        </Text>
                    </View>

                    <View style={styles.mainCard}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Primary status name *
                            </Text>
                            <TextInput
                                style={styles.input}
                                defaultValue="New Order"
                                placeholderTextColor="#adb5bd"
                            />
                        </View>

                        {/* Code and Sort Row */}
                        <View style={styles.row}>
                            <View style={styles.fieldFlex}>
                                <Text style={styles.label}>
                                    Code * (unique)
                                </Text>
                                <TextInput
                                    style={[styles.input, styles.disabledInput]}
                                    value="NEW_ORDER"
                                    editable={false}
                                />
                            </View>
                            <StepperField label="Sort order" value="10" />
                        </View>

                        {/* Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                defaultValue="Order just placed; pending verification and assignment"
                                multiline={true}
                            />
                        </View>

                        {/* Dropdown for Status Type */}
                        <View style={styles.row}>
                            <DropdownField
                                label="Status type"
                                value={form.statusType}
                            />
                            <DropdownField
                                label="Default assignment"
                                value={form.assignmentMode}
                            />
                        </View>

                        {/* Role Visibility Selection */}
                        <Text style={styles.label}>Visible to</Text>
                        <View style={styles.checkboxContainer}>
                            {Object.keys(form.visibleTo).map((role) => (
                                <TouchableOpacity
                                    key={role}
                                    style={styles.checkboxItem}
                                    onPress={() => toggleRole(role)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            form.visibleTo[role] &&
                                                styles.checkboxActive,
                                        ]}
                                    >
                                        {form.visibleTo[role] && (
                                            <Feather
                                                name="check"
                                                size={12}
                                                color="#fff"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.checkboxLabel}>
                                        {role}
                                    </Text>
                                </TouchableOpacity>
                            ))}
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
                        <Text style={styles.cancelText}>Discard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>
                                Update Status
                            </Text>
                            <Feather
                                name="check-circle"
                                size={18}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

// --- Reusable Sub-Components ---

const DropdownField = ({ label, value }) => (
    <View style={styles.fieldFlex}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{value}</Text>
            <Feather name="chevron-down" size={18} color="#1a1b1e" />
        </TouchableOpacity>
    </View>
);

const StepperField = ({ label, value }) => (
    <View style={styles.fieldFlex}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.stepperContainer}>
            <TextInput
                style={styles.stepperInput}
                value={value}
                keyboardType="numeric"
            />
            <View style={styles.stepperControls}>
                <TouchableOpacity style={styles.stepperBtn}>
                    <Feather name="chevron-up" size={12} />
                </TouchableOpacity>
                <View style={styles.stepperDivider} />
                <TouchableOpacity style={styles.stepperBtn}>
                    <Feather name="chevron-down" size={12} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F0F4F8" },
    header: { padding: 20 },
    headerTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    blueIconCircle: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#0070ba",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#1a1b1e" },
    content: { flex: 1, paddingHorizontal: 16 },
    infoBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    infoBoxTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 8,
    },
    infoBoxText: { fontSize: 12, color: "#64748b", lineHeight: 18 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 20,
    },
    inputGroup: { marginBottom: 15 },
    row: { flexDirection: "row", marginBottom: 15, gap: 12 },
    fieldFlex: { flex: 1 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
    },
    disabledInput: { backgroundColor: "#f8fafc", color: "#94a3b8" },
    textArea: { height: 60, textAlignVertical: "top" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
    },
    dropdownText: { fontSize: 14, color: "#475569" },
    stepperContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        height: 48,
        overflow: "hidden",
    },
    stepperInput: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#1e293b",
    },
    stepperControls: {
        width: 30,
        borderLeftWidth: 1,
        borderLeftColor: "#E2E8F0",
    },
    stepperBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
    stepperDivider: { height: 1, backgroundColor: "#E2E8F0" },
    checkboxContainer: {
        flexDirection: "row",
        gap: 20,
        marginTop: 10,
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 10,
    },
    checkboxItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#0070ba",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#0070ba" },
    checkboxLabel: { fontSize: 14, color: "#475569", fontWeight: "600" },
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
        borderRadius: 12,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

export default B2BSettingEditPrimaryModal;
