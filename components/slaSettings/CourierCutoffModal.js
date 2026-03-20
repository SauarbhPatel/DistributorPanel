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

const CourierCutoffModal = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        name: "",
        courierId: "",
        cutoffTime: "5",
        timezone: "Asia/Kolkata",
        regionCode: "IN",
        workingDays: {
            Sun: true,
            Mon: true,
            Tue: true,
            Wed: true,
            Thu: true,
            Fri: true,
            Sat: true,
        },
    });

    const toggleDay = (day) => {
        setForm({
            ...form,
            workingDays: { ...form.workingDays, [day]: !form.workingDays[day] },
        });
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="plus" size={24} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            {edit ? "Edit" : "Add"} courier cut-off
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. BlueDart - North"
                                placeholderTextColor="#adb5bd"
                                value={form.name}
                            />
                        </View>

                        {/* Courier ID */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Courier ID (optional)
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Blue dirt"
                                placeholderTextColor="#adb5bd"
                                value={form.courierId}
                            />
                        </View>

                        {/* Cut-off Time */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Cut-off time for pickup
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="5"
                                keyboardType="numeric"
                                value={form.cutoffTime}
                            />
                            <Text style={styles.helperText}>
                                Orders must be ready (hours before this time)
                                for same-day pickup.
                            </Text>
                        </View>

                        {/* Timezone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Timezone</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Asia/Kolkata"
                                value={form.timezone}
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
                                value={form.regionCode}
                            />
                        </View>

                        {/* Working Days Checkboxes */}
                        <Text style={styles.label}>
                            Working days (pickup available)
                        </Text>
                        <View style={styles.daysRow}>
                            {days.map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    style={styles.dayItem}
                                    onPress={() => toggleDay(day)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            form.workingDays[day] &&
                                                styles.checkboxActive,
                                        ]}
                                    >
                                        {form.workingDays[day] && (
                                            <Feather
                                                name="check"
                                                size={10}
                                                color="#fff"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.dayLabel}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Section */}
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
    helperText: { fontSize: 12, color: "#94A3B8", marginTop: 6 },
    daysRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 5,
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 10,
    },
    dayItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: { backgroundColor: "#0070ba", borderColor: "#0070ba" },
    dayLabel: { fontSize: 13, color: "#64748b" },
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

export default CourierCutoffModal;
