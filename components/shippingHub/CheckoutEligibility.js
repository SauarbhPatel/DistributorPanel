import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CheckoutEligibility = () => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.headerRow}>
                <LinearGradient
                    colors={["#00C853", "#009624"]}
                    style={styles.iconGradient}
                >
                    <Feather name="check-circle" size={20} color="#FFF" />
                </LinearGradient>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Checkout eligibility</Text>
                    <View style={styles.infoIconCircle}>
                        <Feather name="info" size={12} color="#2F80ED" />
                    </View>
                </View>
            </View>

            <LinearGradient
                colors={["#F0F6FF", "#F3E8FF"]}
                style={styles.descriptionGradient}
            >
                <Text style={styles.descriptionText}>
                    A shipping method is shown at checkout only if: buyer
                    pincode belongs to an active zone; the method is assigned
                    and active in that zone; method supports all leaf categories
                    in the cart; shipment weight and order value are within
                    method range; COD constraints are satisfied if COD is
                    selected.
                </Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    iconGradient: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1C1E",
        marginRight: 6,
    },
    infoIconCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#E8F0FE",
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionGradient: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E0E7FF",
    },
    descriptionText: {
        fontSize: 13,
        color: "#4B5563",
        lineHeight: 20,
    },
});

export default CheckoutEligibility;
