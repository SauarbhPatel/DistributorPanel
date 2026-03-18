import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const ProductTitleHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name="trending-up" size={20} color="#FFFFFF" />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>Product table</Text>
                <Text style={styles.subtitle}>
                    Winners and losers by ROAS; filter by category, brand, price
                    band.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    iconContainer: {
        backgroundColor: "#00C853",

        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
    },
});

export default ProductTitleHeader;
