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

const OptionModal = ({ visible, onClose, edit = false }) => {
    const [form, setForm] = useState({
        code: "",
        label: "",
        sortOrder: "5",
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                {/* Header with Floating Icon */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.blueIconCircle}>
                            <Feather name="plus" size={20} color="#fff" />
                        </View>
                        <Text style={styles.headerTitle}>
                            {edit ? "Edit" : "Add"} option
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        {/* Code Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. ORDER_CREATED"
                                placeholderTextColor="#adb5bd"
                                value={form.code}
                                onChangeText={(text) =>
                                    setForm({ ...form, code: text })
                                }
                            />
                        </View>

                        {/* Label Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Label</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Display name"
                                placeholderTextColor="#adb5bd"
                                value={form.label}
                                onChangeText={(text) =>
                                    setForm({ ...form, label: text })
                                }
                            />
                        </View>

                        {/* Sort Order Stepper */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Sort order</Text>
                            <View style={styles.stepperContainer}>
                                <TextInput
                                    style={styles.stepperInput}
                                    value={form.sortOrder}
                                    keyboardType="numeric"
                                    onChangeText={(text) =>
                                        setForm({ ...form, sortOrder: text })
                                    }
                                />
                                <View style={styles.stepperControls}>
                                    <TouchableOpacity style={styles.stepperBtn}>
                                        <Feather
                                            name="chevron-up"
                                            size={14}
                                            color="#adb5bd"
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.stepperDivider} />
                                    <TouchableOpacity style={styles.stepperBtn}>
                                        <Feather
                                            name="chevron-down"
                                            size={14}
                                            color="#adb5bd"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
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

export default OptionModal;
