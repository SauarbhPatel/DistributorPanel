import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const ProductEligibilityCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.contentRow}>
                <View style={styles.iconContainer}>
                    <Feather name="filter" size={20} color="#2563eb" />
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.titleText}>
                            Step 1: Product eligibility rules
                        </Text>
                        <View style={styles.stepBadge}>
                            <Text style={styles.stepBadgeText}>STEP 1</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionText}>
                        Controls which products can be advertised: Listing
                        status Approved + Active, stock (or backorder policy),
                        category allowed, compliance OK, required feed fields
                        present.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 10,
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    iconContainer: {
        backgroundColor: "#eff6ff",

        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 35,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginRight: 10,
    },
    stepBadge: {
        backgroundColor: "#dbeafe",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 10,
    },
    stepBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#2563eb",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
});

export default ProductEligibilityCard;
