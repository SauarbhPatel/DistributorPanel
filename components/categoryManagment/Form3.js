import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Form3 = () => {
    const [attributes, setAttributes] = useState([
        {
            name: "Brand",
            type: "TEXT",
            required: true,
            variant: true,
            selected: true,
        },
        {
            name: "Frequency",
            type: "DROPDOWN",
            required: true,
            variant: true,
            selected: true,
        },
        {
            name: "Output Power",
            type: "TEXT",
            required: true,
            variant: true,
            selected: true,
        },
        {
            name: "License Type",
            type: "TEXT",
            required: true,
            variant: false,
            selected: false,
        },
        {
            name: "Battery Capacity",
            type: "NUMBER",
            required: false,
            variant: true,
            selected: false,
        },
        {
            name: "Color",
            type: "DROPDOWN",
            required: false,
            variant: true,
            selected: false,
        },
    ]);

    const toggleSelect = (index) => {
        const updated = [...attributes];
        updated[index].selected = !updated[index].selected;
        setAttributes(updated);
    };

    const selectedVariants = attributes.filter(
        (item) => item.selected && item.variant,
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        Variation Rule Configuration
                    </Text>
                    <Text style={styles.subtitle}>
                        Define which attributes create product variations.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            {/* Attribute List */}
            <View style={styles.body}>
                {attributes.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => toggleSelect(index)}
                    >
                        {/* Left */}
                        <View style={styles.left}>
                            {/* Custom Checkbox */}
                            <View
                                style={{
                                    ...styles.checkbox,
                                    backgroundColor: !item.selected
                                        ? "#fff"
                                        : "#6366f1",
                                }}
                            >
                                {item.selected && (
                                    <MaterialCommunityIcons
                                        name="check-bold"
                                        size={14}
                                        color="#fff"
                                    />
                                )}
                            </View>

                            <Text style={styles.name}>{item.name}</Text>
                        </View>

                        {/* Right */}
                        <View style={styles.right}>
                            <Text style={styles.typeTag}>{item.type}</Text>

                            {item.required && (
                                <Text style={styles.requiredTag}>REQUIRED</Text>
                            )}

                            {item.variant && (
                                <Text style={styles.variantTag}>VARIANT</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Selected Variants */}
            <View style={styles.selectedBox}>
                <Text style={styles.selectedTitle}>
                    • VARIANT-ENABLED ATTRIBUTES ({selectedVariants.length})
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tagContainer}
                >
                    {selectedVariants.map((item, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{item.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Define which attributes will generate product variations
                    (e.g. size, color, capacity).
                </Text>
            </View>
        </View>
    );
};

export default Form3;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        margin: 10,
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
        padding: 12,
        gap: 10,
    },

    card: {
        backgroundColor: "#f9fafb",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        justifyContent: "center",
        alignItems: "center",
    },

    name: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },

    right: {
        flexDirection: "row",
        gap: 6,
        marginTop: 10,
    },

    typeTag: {
        fontSize: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "#e5e7eb",
        color: "#374151",
    },

    requiredTag: {
        fontSize: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "#d1fae5",
        color: "#059669",
    },

    variantTag: {
        fontSize: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "#e0e7ff",
        color: "#4f46e5",
    },

    selectedBox: {
        backgroundColor: "#f3f4f6",
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },

    selectedTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2563eb",
        marginBottom: 8,
    },

    tagContainer: {
        flexDirection: "row",
        gap: 8,
    },

    tag: {
        backgroundColor: "#e0e7ff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    tagText: {
        fontSize: 12,
        color: "#3730a3",
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
