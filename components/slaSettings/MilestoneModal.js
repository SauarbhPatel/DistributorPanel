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

const MilestoneModal = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        name: "",
        startTrigger: "Order created",
        endTrigger: "Status reached",
        duration: "60",
        durationType: "Calendar hours",
        gracePeriod: "15",
        severity: "Low",
        includeSellerSLA: true,
        courierCutOff: "None",
        hoursBeforeCutOff: "5",
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="plus" size={20} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            {edit ? "Edit" : "Add"} milestone
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxTitle}>
                            SLA time calculation
                        </Text>
                        <Text style={styles.infoBoxText}>
                            Total SLA = Seller SLA Time (for procurement, given
                            at product creation) + End trigger time. When
                            courier cut-off is set, order must be ready X hours
                            before cut-off.
                        </Text>
                    </View>

                    <View style={styles.mainCard}>
                        {/* Milestone Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Milestone name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Accept Order, Pack Order"
                                placeholderTextColor="#adb5bd"
                            />
                        </View>

                        {/* Trigger Row */}
                        <View style={styles.row}>
                            <DropdownField
                                label="Start trigger"
                                value={form.startTrigger}
                            />
                            <DropdownField
                                label="End trigger"
                                value={form.endTrigger}
                            />
                        </View>

                        {/* Duration Row */}
                        <View style={styles.row}>
                            <StepperField
                                label="Duration (minutes)"
                                value={form.duration}
                            />
                            <DropdownField
                                label="Duration type"
                                value={form.durationType}
                            />
                        </View>

                        {/* Grace & Severity Row */}
                        <View style={styles.row}>
                            <StepperField
                                label="Grace period (minutes)"
                                value={form.gracePeriod}
                            />
                            <DropdownField
                                label="Severity"
                                value={form.severity}
                            />
                        </View>

                        {/* Checkbox Section */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() =>
                                setForm({
                                    ...form,
                                    includeSellerSLA: !form.includeSellerSLA,
                                })
                            }
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    form.includeSellerSLA &&
                                        styles.checkboxActive,
                                ]}
                            >
                                {form.includeSellerSLA && (
                                    <Feather
                                        name="check"
                                        size={12}
                                        color="#1a1b1e"
                                    />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                Include seller procurement SLA (from product
                                creation) in total SLA
                            </Text>
                        </TouchableOpacity>

                        {/* Courier Cut-off Section */}
                        <View style={{ gap: 15 }}>
                            <View style={{ flex: 1.2, marginRight: 12 }}>
                                <DropdownField
                                    label="Courier cut-off for pickup"
                                    value={form.courierCutOff}
                                />
                                <Text style={styles.helperText}>
                                    Deadline = cut-off time minus X hours
                                </Text>
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <StepperField
                                    label="Hours before cut-off"
                                    value={form.hoursBeforeCutOff}
                                />
                                <Text style={styles.helperText}>
                                    e.g. 5 → ready by 12 PM if cut-off is 5 PM
                                </Text>
                            </View>
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
                            <Text style={styles.saveBtnText}>
                                {edit ? "Update" : "Add"} Milestone
                            </Text>
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
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#2563EB",
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
        alignItems: "center",
        gap: 10,
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#1a1b1e",
    },
    checkboxActive: { backgroundColor: "#fff" },
    checkboxLabel: { flex: 1, fontSize: 12, color: "#64748b" },
    helperText: { fontSize: 11, color: "#94A3B8", marginTop: 6 },
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

export default MilestoneModal;
