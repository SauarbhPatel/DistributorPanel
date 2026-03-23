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

const HolidayModel = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        calendarId: "Cal-in",
        date: "",
        name: "Republic Day",
        regionCode: "IN",
        assignTo: "All Seller",
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header with Circular Edit/Plus Icon */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="edit-3" size={20} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            {edit ? "Edit" : "Add"} holiday
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* Calendar ID */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Calendar ID</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cal-in"
                                placeholderTextColor="#adb5bd"
                                value={form.calendarId}
                            />
                        </View>

                        {/* Date Picker Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Date</Text>
                            <TouchableOpacity style={styles.dateInput}>
                                <Text style={styles.datePlaceholder}>
                                    mm/dd/yy
                                </Text>
                                <MaterialCommunityIcons
                                    name="calendar-month"
                                    size={18}
                                    color="#1a1b1e"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Holiday Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Republic Day"
                                placeholderTextColor="#adb5bd"
                                value={form.name}
                            />
                        </View>

                        {/* Region Code */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Region code (optional)
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="IN"
                                placeholderTextColor="#adb5bd"
                                value={form.regionCode}
                            />
                        </View>

                        {/* Assign To Dropdown */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Assign to</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownValue}>
                                    {form.assignTo}
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#1a1b1e"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Standardized Detached Footer */}
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
                                {edit ? "Update" : "Save"}
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
    inputGroup: { marginBottom: 15 },
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
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
    },
    datePlaceholder: { color: "#adb5bd", fontSize: 14 },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
    },
    dropdownValue: { fontSize: 14, color: "#64748b" },
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

export default HolidayModel;
