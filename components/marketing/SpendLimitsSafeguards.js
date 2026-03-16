import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SpendLimitsSafeguards = () => {
    const [dailyCap, setDailyCap] = useState("5000");
    const [monthlyCap, setMonthlyCap] = useState("100000");
    const [isAutoPauseEnabled, setIsAutoPauseEnabled] = useState(true);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#AD46FF", "#F6339A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerIconBox}
                >
                    <Feather name="shield" size={20} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.headerTextContent}>
                    <Text style={styles.headerTitle}>
                        Spend limits and safeguards
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Marketplace governance: seller daily/monthly cap,
                        auto-pause rules, restricted categories enforcement.
                    </Text>
                </View>
            </View>

            <View style={styles.inputBody}>
                <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            Daily spend cap per seller (₹)
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Feather
                                name="dollar-sign"
                                size={16}
                                color="#94a3b8"
                                style={styles.currencyIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={dailyCap}
                                onChangeText={setDailyCap}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            Monthly spend cap per seller (₹)
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Feather
                                name="dollar-sign"
                                size={16}
                                color="#94a3b8"
                                style={styles.currencyIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={monthlyCap}
                                onChangeText={setMonthlyCap}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setIsAutoPauseEnabled(!isAutoPauseEnabled)}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            styles.checkbox,
                            isAutoPauseEnabled && styles.checkboxActive,
                        ]}
                    >
                        {isAutoPauseEnabled && (
                            <Ionicons name="checkmark" size={14} color="#FFF" />
                        )}
                    </View>
                    <View style={styles.checkboxTextContent}>
                        <Text style={styles.checkboxTitle}>
                            Auto-pause campaigns when spend threshold reached
                            without conversions
                        </Text>
                        <Text style={styles.checkboxSubtitle}>
                            Automatically pause campaigns that reach spending
                            limits without generating conversions
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#FAF5FF",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTextContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 16,
    },
    inputBody: {
        padding: 16,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 24,
    },
    inputGroup: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 8,
        marginTop: "auto",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        backgroundColor: "#FFFFFF",
    },
    currencyIcon: {
        marginRight: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: "#64748B",
        fontWeight: "500",
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#CBD5E1",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        marginRight: 12,
    },
    checkboxActive: {
        backgroundColor: "#0284C7",
        borderColor: "#0284C7",
    },
    checkboxTextContent: {
        flex: 1,
    },
    checkboxTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 4,
    },
    checkboxSubtitle: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 18,
    },
});

export default SpendLimitsSafeguards;
