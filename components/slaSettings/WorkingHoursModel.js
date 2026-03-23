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

const WorkingHoursModel = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        regionCode: "IN",
        timezone: "Asia/Kolkata",
        workingDays: {
            Sun: true,
            Mon: true,
            Tue: true,
            Wed: true,
            Thu: true,
            Fri: true,
            Sat: true,
        },
        startTime: "10:00 AM",
        endTime: "07:00 PM",
        cutoffTime: "05:00 AM",
        holidayCalendarId: "cal-in",
        assignTo: "All Seller",
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header with Circular Plus Icon */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="plus" size={24} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            {edit ? "Edit" : "Add"} working hours
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* Region & Timezone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Region code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. IN"
                                value={form.regionCode}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Timezone</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Asia/Kolkata"
                                value={form.timezone}
                            />
                        </View>

                        {/* Working Days Row */}
                        <Text style={styles.label}>Working days</Text>
                        <View style={styles.daysContainer}>
                            {days.map((day) => (
                                <View key={day} style={styles.dayItem}>
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
                                                size={12}
                                                color="#fff"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.dayText}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Time Slots Row (3 Columns) */}
                        <View style={styles.timeRow}>
                            <TimeInput
                                label="Start time"
                                value={form.startTime}
                            />
                            <TimeInput label="End time" value={form.endTime} />
                            <TimeInput
                                label="Cutoff time"
                                value={form.cutoffTime}
                            />
                        </View>

                        {/* Holiday Calendar */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Holiday calendar ID (optional)
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="cal-in"
                                value={form.holidayCalendarId}
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

                {/* Standardized Footer */}
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

const TimeInput = ({ label, value }) => (
    <View style={styles.timeField}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.input}>
            <Text style={styles.timeText}>{value}</Text>
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
    daysContainer: {
        flexDirection: "row",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 12,
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
    dayText: { fontSize: 13, color: "#64748b" },
    timeRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
    timeField: { flex: 1 },
    timeText: { fontSize: 14, color: "#4B5563" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 12,
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

export default WorkingHoursModel;
