import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const StepInput = ({ value, onChange }) => {
    const increase = () => {
        const num = parseFloat(value) || 0;
        if (num < 100) onChange(String(num + 1));
    };

    const decrease = () => {
        const num = parseFloat(value) || 0;
        if (num > 0) onChange(String(num - 1));
    };

    return (
        <View style={styles.stepContainer}>
            <TextInput
                style={styles.stepInput}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
            />

            <View style={styles.stepButtons}>
                <TouchableOpacity style={styles.stepBtn} onPress={increase}>
                    <Feather name="chevron-up" size={14} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.stepBtn} onPress={decrease}>
                    <Feather name="chevron-down" size={14} color="#6b7280" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Form9 = ({ state, updateState }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>SEO Configuration</Text>
                    <Text style={styles.subtitle}>
                        Set SEO defaults for category pages.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            <View style={styles.body}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Meta Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Page title for search engines"
                        placeholderTextColor="#9ca3af"
                        value={state.metaTitle}
                        onChangeText={(val) => updateState({ metaTitle: val })}
                        maxLength={60}
                    />
                    <Text style={styles.counter}>
                        {state.metaTitle.length}/60
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Meta Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Brief description for search results"
                        placeholderTextColor="#9ca3af"
                        multiline
                        numberOfLines={4}
                        value={state.metaDescription}
                        onChangeText={(val) =>
                            updateState({ metaDescription: val })
                        }
                        maxLength={160}
                    />
                    <Text style={styles.counter}>
                        {state.metaDescription.length}/160
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Canonical URL *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. /electronics/walkie-talkies"
                        placeholderTextColor="#9ca3af"
                        value={state.canonicalUrl}
                        onChangeText={(val) =>
                            updateState({ canonicalUrl: val })
                        }
                    />
                    <Text style={styles.helper}>
                        Auto-generated from slug. Edit if a different canonical
                        is needed.
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Priority Score (0–100)</Text>

                    <View style={{}}>
                        <StepInput
                            value={state.priorityScore}
                            onChange={(val) => {
                                console.log(val);
                                let num = Number(val);

                                if (isNaN(num)) num = 0;

                                if (num < 0) num = 0;
                                if (num > 100) num = 100;

                                updateState({ priorityScore: String(num) });
                            }}
                        />
                    </View>

                    <Text style={styles.helper}>
                        Higher score = higher crawl priority in sitemap.
                    </Text>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Display Order (0–100)</Text>

                    <View style={{}}>
                        <StepInput
                            value={state.displayOrder}
                            onChange={(val) => {
                                console.log(val);
                                let num = Number(val);

                                if (isNaN(num)) num = 0;

                                if (num < 0) num = 0;
                                if (num > 100) num = 100;

                                updateState({ displayOrder: String(num) });
                            }}
                        />
                    </View>
                </View>

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Visible For Customer</Text>

                    <Switch
                        value={state.visibleForConsumer}
                        onValueChange={(val) =>
                            updateState({ visibleForConsumer: val })
                        }
                        trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                        thumbColor={"#fff"}
                    />
                </View>

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Is Active</Text>

                    <Switch
                        value={state.isActive}
                        onValueChange={(val) => updateState({ isActive: val })}
                        trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                        thumbColor={"#fff"}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Meta Title defines the page title displayed in search engine
                    results.
                </Text>
            </View>
        </View>
    );
};

export default Form9;

/* 🔹 Styles */
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

    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        backgroundColor: "#fff",
    },

    textArea: {
        height: 100,
        textAlignVertical: "top",
    },

    helper: {
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 5,
    },

    counter: {
        fontSize: 10,
        color: "#9ca3af",
        textAlign: "right",
        marginTop: 4,
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

    /* Step Input */
    stepContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    stepInput: {
        flex: 1,
        padding: 10,
        fontSize: 14,
    },

    stepButtons: {
        borderLeftWidth: 1,
        borderLeftColor: "#e5e7eb",
        justifyContent: "center",
    },

    stepBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
});
