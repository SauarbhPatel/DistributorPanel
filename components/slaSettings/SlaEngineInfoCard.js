import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SlaEngineInfoCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.iconBox}>
                    <Feather name="info" size={20} color="#fff" />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>SLA engine (system logic)</Text>

                <Text style={styles.description}>
                    At order creation the system assigns an SLA rule using order
                    metadata (seller, category, zone, courier, weight, value,
                    payment type, B2B). Milestone deadlines are computed and
                    stored. A scheduled job detects overdue milestones and marks
                    breaches; escalations and notifications can be configured.
                </Text>

                <Text style={[styles.description, { marginTop: 12 }]}>
                    Policy changes do not retroactively change already-assigned
                    SLA unless explicitly migrated. Waivers are auditable and
                    reported separately.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        backgroundColor: "#E0E7FF",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#E0E7FF",
    },
    iconContainer: {
        marginRight: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        backgroundColor: "#5E5CE6",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1C2D",
        marginBottom: 6,
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
        color: "#4A5568",
        opacity: 0.9,
    },
    boldText: {
        fontWeight: "600",
        color: "#2D3748",
    },
});

export default SlaEngineInfoCard;
