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
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SLARuleModal = ({ visible, onClose }) => {
    const [form, setForm] = useState({
        ruleName: "",
        priority: "10",
        isDefault: true,
        sellerScope: "All",
        categoryScope: "All",
        shippingZoneScope: "All",
        courierScope: "All",
        serviceMode: "Express",
        paymentType: "Both",
        isB2BOnly: true,
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="edit-3" size={16} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>Add SLA rule</Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Rule name (optional)
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Accept Order, Pack Order"
                                placeholderTextColor="#adb5bd"
                                value={form.ruleName}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Priority (higher = more specific)
                            </Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    {form.priority}
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#1a1b1e"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.highlightCheckbox}
                            onPress={() =>
                                setForm({ ...form, isDefault: !form.isDefault })
                            }
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    form.isDefault && styles.checkboxActive,
                                ]}
                            >
                                {form.isDefault && (
                                    <Feather
                                        name="check"
                                        size={12}
                                        color="#1a1b1e"
                                    />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                Default rule
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.sectionTitle}>Conditions</Text>

                        <View style={styles.row}>
                            <DropdownField
                                label="Seller scope"
                                value={form.sellerScope}
                            />
                            <DropdownField
                                label="Category scope"
                                value={form.categoryScope}
                            />
                        </View>

                        <View style={styles.row}>
                            <DropdownField
                                label="Shipping zone scope"
                                value={form.shippingZoneScope}
                            />
                            <DropdownField
                                label="Courier scope"
                                value={form.courierScope}
                            />
                        </View>

                        <View style={styles.row}>
                            <DropdownField
                                label="Service mode"
                                value={form.serviceMode}
                            />
                            <View style={styles.fieldFlex}>
                                <Text style={styles.label}>Payment type</Text>
                                <View style={styles.stepperContainer}>
                                    <TextInput
                                        style={styles.stepperInput}
                                        value={form.paymentType}
                                        editable={false}
                                    />
                                    <View style={styles.stepperControls}>
                                        <TouchableOpacity
                                            style={styles.stepperBtn}
                                        >
                                            <Feather
                                                name="chevron-up"
                                                size={12}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.stepperDivider} />

                                        <TouchableOpacity
                                            style={styles.stepperBtn}
                                        >
                                            <Feather
                                                name="chevron-down"
                                                size={12}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.highlightCheckbox}
                            onPress={() =>
                                setForm({ ...form, isB2BOnly: !form.isB2BOnly })
                            }
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    form.isB2BOnly && styles.checkboxActive,
                                ]}
                            >
                                {form.isB2BOnly && (
                                    <Feather
                                        name="check"
                                        size={12}
                                        color="#1a1b1e"
                                    />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                B2B orders only
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
                            <Text style={styles.saveBtnText}>Save Changes</Text>

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

const DropdownField = ({ label, value }) => (
    <View style={styles.fieldFlex}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{value}</Text>
            <Feather name="chevron-down" size={18} color="#1a1b1e" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F0F4F8" },
    header: { padding: 20 },
    headerTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    blueIconCircle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
    },
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0066A2",
        marginBottom: 16,
        marginTop: 10,
    },
    inputGroup: { marginBottom: 15 },
    row: { flexDirection: "row", marginBottom: 15, gap: 12 },
    fieldFlex: { flex: 1 },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        padding: 12,
        height: 48,
    },
    dropdownText: { fontSize: 14, color: "#64748b" },
    highlightCheckbox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#F8FAFC",
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#1a1b1e",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#fff" },
    checkboxLabel: { fontSize: 13, color: "#64748b", fontWeight: "500" },
    stepperContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        height: 48,
        overflow: "hidden",
    },
    stepperInput: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#64748b",
    },
    stepperControls: {
        width: 30,
        borderLeftWidth: 1,
        borderLeftColor: "#E2E8F0",
    },
    stepperBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
    stepperDivider: { height: 1, backgroundColor: "#E2E8F0" },

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

export default SLARuleModal;
