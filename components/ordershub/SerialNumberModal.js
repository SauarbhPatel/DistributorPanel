import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { submitSerialNumbers } from "../../utils/api/orderApi";
import { Colors } from "../../constants/styles";

const SerialNumberModal = ({ visible, onClose, item, onSuccess }) => {
    // item._raw._id  = MongoDB _id for API
    // item._raw.items[0].serialNumbersRequired = count of inputs needed
    const rawRecord = item?._raw ?? {};
    const mongoId = rawRecord._id ?? "";
    const requiredCount = rawRecord.items?.[0]?.serialNumbersRequired ?? 1;

    const [serials, setSerials] = useState(Array(requiredCount).fill(""));
    const [loading, setLoading] = useState(false);

    const updateSerial = (index, value) => {
        const updated = [...serials];
        updated[index] = value;
        setSerials(updated);
    };

    const handleSubmit = async () => {
        const filled = serials.map((s) => s.trim());
        if (filled.some((s) => !s)) {
            Alert.alert("Validation", "Please fill all serial number fields.");
            return;
        }
        const unique = new Set(filled);
        if (unique.size !== filled.length) {
            Alert.alert(
                "Validation",
                "Duplicate serial numbers are not allowed.",
            );
            return;
        }
        try {
            setLoading(true);
            const res = await submitSerialNumbers(mongoId, filled);
            if (res?.success) {
                onSuccess?.();
                onClose?.();
            } else {
                const msg =
                    typeof res?.message === "object"
                        ? res?.message?.message
                        : (res?.message ?? "Something went wrong");
                Alert.alert("Error", msg);
            }
        } catch (e) {
            Alert.alert("Error", "Request failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <SafeAreaView style={styles.overlay}>
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>
                                Enter Product Serial Numbers
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeBtn}
                        >
                            <Feather name="x" size={20} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.desc}>
                        Enter {requiredCount} serial number
                        {requiredCount > 1 ? "s" : ""} for {item?.id ?? "—"}
                    </Text>

                    <ScrollView
                        contentContainerStyle={styles.inputList}
                        showsVerticalScrollIndicator={false}
                    >
                        {serials.map((val, i) => (
                            <View key={i} style={styles.inputRow}>
                                <Text style={styles.inputLabel}>
                                    Serial #{i + 1}
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter serial number ${i + 1}`}
                                    placeholderTextColor="#94A3B8"
                                    value={val}
                                    onChangeText={(t) => updateSerial(i, t)}
                                    autoCapitalize="characters"
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Footer buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.submitBtn,
                                loading && { opacity: 0.6 },
                            ]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.submitText}>
                                {loading ? "Submitting..." : "Save"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        maxHeight: "85%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    title: { fontSize: 18, fontWeight: "800", color: "#111827" },
    subtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    closeBtn: { padding: 4 },
    desc: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 16,
        lineHeight: 20,
    },
    inputList: { paddingBottom: 8 },
    inputRow: { marginBottom: 14 },
    inputLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: "#111827",
        backgroundColor: "#F8FAFC",
    },
    footer: {
        flexDirection: "row",
        gap: 12,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    cancelText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
    submitBtn: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
    },
    submitText: { fontSize: 14, fontWeight: "700", color: "#fff" },
});

export default SerialNumberModal;
