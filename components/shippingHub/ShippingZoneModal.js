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

const ShippingZoneModal = ({ visible, onClose }) => {
    const [form, setForm] = useState({
        zoneName: "",
        country: "",
        state: "",
        categoryCode: "",
        status: "Active",
        isRemote: true,
        isCOD: true,
        isReturn: true,
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create shipping zone</Text>
                    <Text style={styles.headerSub}>
                        Define zone by country, state, city, and pincode ranges.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        <View
                            style={{
                                backgroundColor: "#F8FAFC",

                                padding: 16,
                                marginHorizontal: -16,
                                marginTop: -16,
                                borderBottomWidth: 1,
                                borderColor: "#e9ecef",
                                marginBottom: 10,
                            }}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>
                                    Shipping Zone Setup
                                </Text>
                                <Feather
                                    name="info"
                                    size={18}
                                    color="#0070ba"
                                />
                            </View>
                            <Text style={styles.cardSub}>
                                Define a shipping zone by location or pincode
                                range to control delivery options.
                            </Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Zone name <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. India Metro Zone"
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
                                    Country{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. India"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>State / Region</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Maharashtra"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Category Code{" "}
                                <Text style={styles.required}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Mumbai"
                                placeholderTextColor="#adb5bd"
                            />
                            <Text style={styles.helperText}>
                                Comma-separated ranges or list of pincodes.
                            </Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Status</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>Active</Text>
                                <Feather
                                    name="chevron-down"
                                    size={20}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.flagsSection}>
                            <Text style={styles.flagTitle}>Zone Flags</Text>
                            <View style={styles.flagsRow}>
                                <FlagItem
                                    label="Remote area"
                                    active={form.isRemote}
                                />
                                <FlagItem
                                    label="COD allowed"
                                    active={form.isCOD}
                                />
                                <FlagItem
                                    label="Return pickup supported"
                                    active={form.isReturn}
                                />
                            </View>
                        </View>

                        <View style={styles.tipBox}>
                            <MaterialCommunityIcons
                                name="comment-text-outline"
                                size={20}
                                color="#868e96"
                            />
                            <Text style={styles.tipText}>
                                Name this shipping zone for easy identification
                                (e.g., Metro Cities, North Region).
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
                            <Text style={styles.saveBtnText}>Save Zone</Text>
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
    header: { padding: 20, backgroundColor: "#f8f9fa" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1a1b1e" },
    headerSub: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e9ecef",
        overflow: "hidden",
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: { fontSize: 16, fontWeight: "700", color: "#1a1b1e" },
    cardSub: { fontSize: 12, color: "#868e96", marginTop: 4, marginBottom: 20 },
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
    helperText: { fontSize: 11, color: "#868e96", marginTop: 6 },
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
    flagsSection: {
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 15,
    },
    flagTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 12,
    },
    flagsRow: { gap: 10 },
    flagItem: { flexDirection: "row", alignItems: "center", gap: 10 },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#adb5bd",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#00c853", borderColor: "#00c853" },
    flagLabel: { fontSize: 12, color: "#495057", fontWeight: "500" },
    tipBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 15,
        marginTop: 20,
        marginHorizontal: -16,
        marginBottom: -16,
        gap: 12,
    },
    tipText: { flex: 1, fontSize: 12, color: "#868e96", lineHeight: 18 },
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

export default ShippingZoneModal;
