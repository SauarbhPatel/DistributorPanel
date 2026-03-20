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

const CourierPartnerModal = ({ visible, onClose }) => {
    const [form, setForm] = useState({
        courierName: "",
        code: "",
        status: "Active",
        services: {
            economy: true,
            express: false,
            sameDay: false,
            handyDrop: false,
        },
        codSupport: false,
        insuranceSupport: false,
        baseUrl: "",
        authType: "None",
    });

    const toggleService = (key) => {
        setForm({
            ...form,
            services: { ...form.services, [key]: !form.services[key] },
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Add courier partner</Text>
                    <Text style={styles.headerSub}>
                        Courier name, service types, and API integration
                        settings.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* Basic Info Row */}
                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.inputGroup,
                                    { flex: 1, marginRight: 10 },
                                ]}
                            >
                                <Text style={styles.label}>
                                    Courier name{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Delhivery"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>
                                    Code <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. DELHIVERY"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>

                        {/* Service Types Checklist */}
                        <Text style={styles.sectionLabel}>
                            Service types supported
                        </Text>
                        <View style={styles.checkboxGrid}>
                            <CheckboxItem
                                label="Economy"
                                active={form.services.economy}
                                onPress={() => toggleService("economy")}
                            />
                            <CheckboxItem
                                label="Express"
                                active={form.services.express}
                                onPress={() => toggleService("express")}
                            />
                            <CheckboxItem
                                label="Same-day"
                                active={form.services.sameDay}
                                onPress={() => toggleService("sameDay")}
                            />
                            <CheckboxItem
                                label="Handy Drop"
                                active={form.services.handyDrop}
                                onPress={() => toggleService("handyDrop")}
                            />
                        </View>

                        <View
                            style={[
                                styles.checkboxGrid,
                                {
                                    marginTop: 10,
                                    borderTopWidth: 1,
                                    borderTopColor: "#f1f3f5",
                                    paddingTop: 10,
                                },
                            ]}
                        >
                            <CheckboxItem
                                label="COD support"
                                active={form.codSupport}
                                onPress={() =>
                                    setForm({
                                        ...form,
                                        codSupport: !form.codSupport,
                                    })
                                }
                            />
                            <CheckboxItem
                                label="Insurance support"
                                active={form.insuranceSupport}
                                onPress={() =>
                                    setForm({
                                        ...form,
                                        insuranceSupport:
                                            !form.insuranceSupport,
                                    })
                                }
                            />
                        </View>

                        {/* Status Dropdown */}
                        <View style={[styles.inputGroup, { marginTop: 10 }]}>
                            <Text style={styles.label}>Status</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    {form.status}
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={20}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* API Integration Section */}
                        <View style={styles.apiSection}>
                            <View style={styles.apiHeader}>
                                <Text style={styles.apiTitle}>
                                    API integration
                                </Text>
                            </View>
                            <Text style={styles.apiSub}>
                                Manage API credentials and endpoints.
                                Credentials are stored securely (placeholder;
                                replace with real secret manager in production).
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Base URL</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="https://api.courier.com"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Auth type</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        — None —
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={20}
                                        color="#495057"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Webhook URL (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="https://your-domain.com/webhooks"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>
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
                            <Text style={styles.saveBtnText}>
                                Save courier partner
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

const CheckboxItem = ({ label, active, onPress }) => (
    <TouchableOpacity style={styles.checkboxItem} onPress={onPress}>
        <View style={[styles.checkbox, active && styles.checkboxActive]}>
            {active && <Feather name="check" size={12} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    header: {
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1a1b1e" },
    headerSub: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15, paddingTop: 15 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e9ecef",
        marginBottom: 20,
    },
    row: { flexDirection: "row", marginBottom: 0 },
    inputGroup: { marginBottom: 10 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 12,
    },
    required: { color: "#fa5252" },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
    },
    checkboxGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        minWidth: "45%",
        marginBottom: 5,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#adb5bd",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#0070ba", borderColor: "#0070ba" },
    checkboxLabel: { fontSize: 13, color: "#495057" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fafafa",
    },
    dropdownText: { fontSize: 14, color: "#495057" },
    apiSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    apiHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 5,
    },
    apiTitle: { fontSize: 16, fontWeight: "800", color: "#1a1b1e" },
    apiSub: { fontSize: 12, color: "#868e96", marginBottom: 20 },
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

export default CourierPartnerModal;
