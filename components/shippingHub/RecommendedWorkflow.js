import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WorkflowCard = ({
    number,
    title,
    description,
    icon,
    color,
    buttonColor,
    navigation,
    path = null,
}) => (
    <View style={styles.card}>
        <View style={[styles.numberBadge, { backgroundColor: buttonColor }]}>
            <Text style={styles.numberText}>{number}</Text>
        </View>

        <View style={styles.header}>
            <MaterialCommunityIcons name={icon} size={22} color={buttonColor} />
            <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonColor }]}
                onPress={() => path && navigation.push(path)}
            >
                <Text style={styles.buttonText}>Configure</Text>
                <MaterialCommunityIcons
                    name="arrow-right"
                    size={16}
                    color="#FFF"
                />
            </TouchableOpacity>

            <View style={styles.countBubble}>
                <Text style={styles.countText}>0</Text>
            </View>
        </View>
    </View>
);

const RecommendedWorkflow = ({ navigation }) => {
    const steps = [
        {
            number: 1,
            title: "Courier Partners",
            icon: "package-variant-closed",
            buttonColor: "#1A73E8",
            description:
                "Register courier partners, service types (Economy/Express/Same-day), COD & insurance support, API credentials and serviceability.",
            path: "CourierPartners",
        },
        {
            number: 2,
            title: "Shipping Zones",
            icon: "web",
            buttonColor: "#5C5CFF",
            description:
                "Define geographic zones by country, state, city, pincode range. Control remote area, COD, return pickup. Assign shipping methods to zones.",
            path: "ShippingZones",
        },
        {
            number: 3,
            title: "Shipping Methods",
            icon: "tune-vertical",
            buttonColor: "#A855F7",
            description:
                "Rule-based methods: courier, service mode, weight/value conditions, charge model (flat/slab/hybrid), and leaf category mapping.",
            path: "ShippingMethods",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <View style={styles.orangeCircle}>
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={16}
                        color="#FFF"
                    />
                </View>
                <Text style={styles.sectionTitle}>Recommended workflow</Text>
            </View>

            {steps.map((step) => (
                <WorkflowCard
                    key={step.number}
                    {...step}
                    navigation={navigation}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    orangeCircle: {
        width: 24,
        height: 24,
        backgroundColor: "#FF8C00",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        position: "relative",
    },
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    numberText: {
        color: "#FFF",
        fontWeight: "800",
        fontSize: 14,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginLeft: 10,
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 22,
        marginBottom: 24,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 14,
        marginRight: 8,
    },
    countBubble: {
        width: 36,
        height: 36,
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    countText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },
});

export default RecommendedWorkflow;
