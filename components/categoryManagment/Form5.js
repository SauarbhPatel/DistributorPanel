import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

const Form5 = () => {
    const [state, setState] = useState({
        documentType: "",
        selectedDocs: ["Walkie Talkie HSNs Set", "Skin Care Products HSN Set"],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const removeDoc = (index) => {
        const updated = [...state.selectedDocs];
        updated.splice(index, 1);
        updateState({ selectedDocs: updated });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Tax Rules</Text>
                    <Text style={styles.subtitle}>
                        Select an HSN Set created in Tax Manager. It is assigned
                        to this category at creation.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Dropdown */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>HSN Set</Text>

                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.placeholder}>
                            Select document types...
                        </Text>
                        <Feather
                            name="chevron-down"
                            size={18}
                            color="#6b7280"
                        />
                    </TouchableOpacity>
                </View>

                {/* ✅ Selected Documents */}
                {state.selectedDocs.length > 0 && (
                    <View style={styles.selectedBox}>
                        <Text style={styles.selectedTitle}>
                            • Selected HSN sets ({state.selectedDocs.length})
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.tagContainer}
                        >
                            {state.selectedDocs.map((doc, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{doc}</Text>

                                    <TouchableOpacity
                                        onPress={() => removeDoc(index)}
                                    >
                                        <AntDesign
                                            name="closecircle"
                                            size={14}
                                            color="#ef4444"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    HSN sets are managed in Tax Manager and assigned at the
                    category level.
                </Text>
            </View>
        </View>
    );
};

export default Form5;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    body: {
        padding: 16,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
    },

    placeholder: {
        fontSize: 14,
        color: "#9ca3af",
    },

    helper: {
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 5,
    },

    selectedBox: {
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    selectedTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2563eb",
        marginBottom: 8,
        textTransform: "uppercase",
    },

    tagContainer: {
        flexDirection: "row",
        gap: 8,
    },

    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        gap: 6,
    },

    tagText: {
        fontSize: 12,
        color: "#374151",
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 6,
    },

    footerText: {
        fontSize: 11,
        color: "#6b7280",
        flex: 1,
    },
});
