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

const SLAPolicyModal = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        policyName: "",
        status: "Draft",
        appliesTo: "B2C only",
        effectiveFrom: "2026-03-07",
        effectiveTo: "2026-03-07",
        notes: "",
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {edit ? "Edit" : "Create"} SLA Policy
                    </Text>
                    <Text style={styles.headerSub}>
                        Policy name, status, effective dates, and applicability
                        (B2C/B2B). Add milestones after saving.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        <Text style={styles.sectionTitle}>Policy details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Policy name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Standard B2C SLA India"
                                placeholderTextColor="#adb5bd"
                                value={form.policyName}
                                onChangeText={(text) =>
                                    setForm({ ...form, policyName: text })
                                }
                            />
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    {
                                        flex: 1,
                                        marginRight: 12,
                                        paddingRight: 0,
                                    },
                                ]}
                            >
                                <Text style={styles.label}>Status</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        {form.status}
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#1a1b1e"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, paddingLeft: 0 },
                                ]}
                            >
                                <Text style={styles.label}>Applies to</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        {form.appliesTo}
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={18}
                                        color="#1a1b1e"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    {
                                        flex: 1,
                                        marginRight: 12,
                                        paddingRight: 0,
                                    },
                                ]}
                            >
                                <Text style={styles.label}>Effective from</Text>
                                <TouchableOpacity style={styles.dateInput}>
                                    <Text style={styles.dateText}>
                                        {form.effectiveFrom}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="calendar-month"
                                        size={20}
                                        color="#1a1b1e"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, paddingLeft: 0 },
                                ]}
                            >
                                <Text style={styles.label}>Effective to</Text>
                                <TouchableOpacity style={styles.dateInput}>
                                    <Text style={styles.dateText}>
                                        {form.effectiveTo}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="calendar-month"
                                        size={20}
                                        color="#1a1b1e"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Notes</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Default marketplace SLA for B2C orders."
                                placeholderTextColor="#adb5bd"
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                value={form.notes}
                                onChangeText={(text) =>
                                    setForm({ ...form, notes: text })
                                }
                            />
                        </View>

                        {/* Info Tip Footer of Card */}
                        <View style={styles.infoTip}>
                            <Feather
                                name="message-square"
                                size={16}
                                color="#868e96"
                            />
                            <Text style={styles.infoTipText}>
                                A unique name to identify this policy (e.g.,
                                "Standard B2C SLA India").
                            </Text>
                        </View>
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    header: { padding: 20, backgroundColor: "#f8f9fa" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1a1b1e" },
    headerSub: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1b1e",
        padding: 16,
        paddingBottom: 10,
    },
    inputGroup: { paddingHorizontal: 16, marginBottom: 15 },
    label: {
        fontSize: 13,
        fontWeight: "600",
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
    textArea: { height: 100, paddingTop: 12 },
    row: { flexDirection: "row" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 14,
    },
    dropdownText: { fontSize: 14, color: "#495057" },
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 14,
    },
    dateText: { fontSize: 14, color: "#adb5bd" },
    infoTip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 16,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        marginTop: 10,
    },
    infoTipText: { fontSize: 12, color: "#868e96", flex: 1, lineHeight: 18 },
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

export default SLAPolicyModal;
