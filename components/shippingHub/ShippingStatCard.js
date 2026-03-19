import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ShippingStatCard = ({
    icon,
    tag,
    count,
    label,
    color,
    bgColor,
    tagColor,
    tagBg,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={[styles.iconBox, { backgroundColor: color }]}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={22}
                        color="#FFF"
                    />
                </View>
                <View style={[styles.tag, { backgroundColor: tagBg }]}>
                    <Text style={[styles.tagText, { color: tagColor }]}>
                        {tag}
                    </Text>
                </View>
            </View>

            <Text style={styles.countText}>{count}</Text>

            <View style={styles.footerRow}>
                <Text style={styles.labelText}>{label}</Text>
                <View style={styles.dotsContainer}>
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: tagColor, opacity: 0.3 },
                        ]}
                    />
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: tagColor, opacity: 0.5 },
                        ]}
                    />
                    <View style={[styles.dot, { backgroundColor: tagColor }]} />
                </View>
            </View>
        </View>
    );
};

const ShippingDashboard = () => {
    const data = [
        {
            icon: "map-marker-outline",
            tag: "ZONES",
            count: 0,
            label: "Shipping zones",
            color: "#1A73E8",
            tagColor: "#1A73E8",
            tagBg: "#E8F0FE",
        },
        {
            icon: "tune-vertical",
            tag: "METHODS",
            count: 0,
            label: "Shipping methods",
            color: "#5C5CFF",
            tagColor: "#5C5CFF",
            tagBg: "#EEF2FF",
        },
        {
            icon: "truck-outline",
            tag: "PARTNERS",
            count: 0,
            label: "Courier partners",
            color: "#A855F7",
            tagColor: "#A855F7",
            tagBg: "#F5F3FF",
        },
    ];

    return (
        <View style={styles.scrollContainer}>
            {data.map((item, index) => (
                <ShippingStatCard key={index} {...item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        gap: 10,
        marginTop: 10,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 10,
        fontWeight: "800",
    },
    countText: {
        fontSize: 36,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    labelText: {
        fontSize: 14,
        color: "#6B7280",
    },
    dotsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginLeft: 3,
    },
});

export default ShippingDashboard;
