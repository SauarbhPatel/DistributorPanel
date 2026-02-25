import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VariationRuleCard = ({ attributes = [], onSelected = () => {} }) => {
    const [selectedVariants, setSelectedVariants] = useState({});

    const toggleVariant = (id) => {
        setSelectedVariants((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const enabledVariants = attributes.filter(
        (item) => selectedVariants[item._id],
    );

    useEffect(() => {
        onSelected(enabledVariants);
    }, [selectedVariants]);

    useEffect(() => {
        setSelectedVariants({});
    }, [attributes]);

    return (
        <View style={styles.card}>
            {/* Header */}
            <Text style={styles.title}>Variation Rule Configuration</Text>
            <Text style={styles.subtitle}>
                Define which attributes create product variations.
            </Text>

            {/* Attribute List */}
            {attributes.map((item) => {
                const checked = !!selectedVariants[item._id];

                return (
                    <TouchableOpacity
                        key={item._id}
                        activeOpacity={0.8}
                        style={styles.row}
                        onPress={() => toggleVariant(item._id)}
                    >
                        <View style={styles.left}>
                            <Ionicons
                                name={checked ? "checkbox" : "square-outline"}
                                size={22}
                                color={checked ? "#2563EB" : "#9CA3AF"}
                            />

                            <Text style={styles.name}>{item.name}</Text>

                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {item.type}
                                </Text>
                            </View>

                            {item.isMandatory && (
                                <View style={styles.requiredBadge}>
                                    <Text style={styles.requiredText}>
                                        Required
                                    </Text>
                                </View>
                            )}
                        </View>

                        {checked && (
                            <View style={styles.variantBadge}>
                                <Text style={styles.variantText}>Variant</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}

            {/* Footer */}
            {enabledVariants.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>
                        Variant-enabled attributes ({enabledVariants.length}):
                    </Text>
                    <Text style={styles.footerText}>
                        {enabledVariants.map((i) => i.name).join(", ")}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default VariationRuleCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginTop: 10,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#111827",
    },

    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 12,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 10,
        marginRight: 8,
        color: "#111827",
    },

    badge: {
        backgroundColor: "#F3F4F6",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginRight: 6,
    },

    badgeText: {
        fontSize: 11,
        color: "#374151",
    },

    requiredBadge: {
        backgroundColor: "#EEF2FF",
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },

    requiredText: {
        fontSize: 11,
        color: "#4338CA",
    },

    variantBadge: {
        backgroundColor: "#DBEAFE",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    variantText: {
        fontSize: 12,
        color: "#2563EB",
        fontWeight: "600",
    },

    footer: {
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        padding: 12,
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    footerTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },

    footerText: {
        fontSize: 13,
        color: "#374151",
        marginTop: 2,
    },
});
