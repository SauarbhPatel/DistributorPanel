import React, { useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Form3 = ({ state, updateState }) => {
    const selectedSets = state?.selectedSets || [];
    const selectedVariantAttributes = state?.variantAttributes || [];

    const allVariantAttributes = useMemo(() => {
        return selectedSets.flatMap((item) => item.variantAttributes || []);
    }, [selectedSets]);

    const selectedIds = useMemo(() => {
        return new Set(selectedVariantAttributes.map((item) => item._id));
    }, [selectedVariantAttributes]);

    const toggleAttribute = (item) => {
        let updated;

        if (selectedIds.has(item._id)) {
            updated = selectedVariantAttributes.filter(
                (i) => i._id !== item._id,
            );
        } else {
            updated = [...selectedVariantAttributes, item];
        }

        updateState({ variantAttributes: updated });
    };

    return (
        <View style={styles.container}>
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

            <View style={styles.body}>
                {allVariantAttributes.map((item) => {
                    const isSelected = selectedIds.has(item._id);

                    return (
                        <TouchableOpacity
                            key={item._id}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => toggleAttribute(item)}
                        >
                            <View style={styles.left}>
                                <View
                                    style={[
                                        styles.checkbox,
                                        {
                                            backgroundColor: isSelected
                                                ? "#6366f1"
                                                : "#fff",
                                        },
                                    ]}
                                >
                                    {isSelected && (
                                        <MaterialCommunityIcons
                                            name="check-bold"
                                            size={14}
                                            color="#fff"
                                        />
                                    )}
                                </View>

                                <Text style={styles.name}>{item.name}</Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.typeTag}>{item.type}</Text>

                                {item.isMandatory && (
                                    <Text style={styles.requiredTag}>
                                        REQUIRED
                                    </Text>
                                )}

                                {item.isVariant && (
                                    <Text style={styles.variantTag}>
                                        VARIANT
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.selectedBox}>
                <Text style={styles.selectedTitle}>
                    • VARIANT-ENABLED ATTRIBUTES (
                    {selectedVariantAttributes.length})
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tagContainer}
                >
                    {selectedVariantAttributes.map((item) => (
                        <View key={item._id} style={styles.tag}>
                            <Text style={styles.tagText}>{item.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

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
