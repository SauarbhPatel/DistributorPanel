import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const GenerateReportForm = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerSubtitle}>
                Select seller (optional) and report type, then click Generate
                report.
            </Text>

            <View style={styles.formCard}>
                {/* Seller Search Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Selle</Text>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="New Order"
                            placeholderTextColor="#94a3b8"
                        />
                        <Feather name="search" size={20} color="#000" />
                    </View>
                </View>

                {/* Report Type Dropdown */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Report type</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>
                            SLA compliance summary
                        </Text>
                        <Feather name="chevron-down" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Choose Sellers Dropdown */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Choose sellers</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>All sellers</Text>
                        <Feather name="chevron-down" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <MaterialIcons
                        name="chat-bubble-outline"
                        size={18}
                        color="#94a3b8"
                    />
                    <Text style={styles.infoText}>
                        Enter a name that will be shown to users in the order
                        workflow.
                    </Text>
                </View>
            </View>

            {/* Bottom Action Section */}
            <View style={styles.actionSection}>
                <TouchableOpacity
                    style={styles.generateBtn}
                    activeOpacity={0.8}
                >
                    <Feather name="plus" size={20} color="#fff" />
                    <Text style={styles.generateBtnText}>Generate report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, marginBottom: 10 },
    headerTitle: { fontSize: 22, fontWeight: "700", color: "#1e293b" },
    headerSubtitle: {
        fontSize: 13,
        color: "#64748b",
        marginTop: 4,
        marginBottom: 20,
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inputGroup: { marginBottom: 16 },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 8,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
    },
    input: { flex: 1, fontSize: 14, color: "#1e293b" },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
    },
    dropdownText: { fontSize: 14, color: "#64748b" },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 12,
        marginHorizontal: -16,
        marginBottom: -16,
        marginTop: 10,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    infoText: { fontSize: 12, color: "#64748b", flex: 1 },
    actionSection: {
        backgroundColor: "#fff",
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderTopWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    generateBtn: {
        flexDirection: "row",
        backgroundColor: "#0061f2",
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        gap: 6,
    },
    generateBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});

export default GenerateReportForm;
