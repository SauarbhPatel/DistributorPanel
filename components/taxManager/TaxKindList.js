import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Sizes } from "../../constants/styles";

const TaxKindCard = ({
    name,
    subtitle,
    code,
    description,
    status,
    isActive,
}) => {
    const activeBlue = "#0071BC";
    const statusGreen = "#10B981";

    return (
        <View style={[styles.card, isActive && styles.activeCard]}>
            {/* Top Row: Icon, Name, and Delete */}
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="cube-outline"
                            size={20}
                            color={activeBlue}
                        />
                    </View>
                    <View>
                        <Text style={styles.taxNameText}>{name}</Text>
                        <Text style={styles.taxSubtitleText}>{subtitle}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                    <Feather name="trash-2" size={18} color="#FF5252" />
                </TouchableOpacity>
            </View>

            {/* Middle Row: Code and Status */}
            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>TAX CODE</Text>
                    <View style={styles.codeBadge}>
                        <Text style={styles.codeBadgeText}>{code}</Text>
                    </View>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>STATUS</Text>
                    <View style={styles.statusWrapper}>
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: statusGreen },
                            ]}
                        />
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>
            </View>

            {/* Description Section */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.label}>DESCRIPTION</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>

            {/* Bottom Row: Actions (Only shows Edit if active) */}
            {isActive && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.editButton}
                        activeOpacity={0.8}
                    >
                        <Feather name="edit-3" size={14} color="#FFF" />
                        <Text style={styles.editButtonText}>Edit Details</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Left Accent Border */}
            <View
                style={[
                    styles.accentBorder,
                    { backgroundColor: isActive ? activeBlue : statusGreen },
                ]}
            />
        </View>
    );
};

const TaxKindList = () => {
    const taxData = [
        {
            name: "GST",
            subtitle: "National consumption tax",
            code: "GST",
            description:
                "Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services.",
            status: "ACTIVE",
            isActive: true,
        },
        {
            name: "VAT",
            subtitle: "Value added tax",
            code: "VAT",
            description:
                "Value Added Tax is a consumption tax placed on a product whenever value is added at each stage of the supply chain.",
            status: "ACTIVE",
            isActive: false,
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollPadding}
        >
            <Text style={styles.screenTitle}>Tax Kinds</Text>
            {taxData.map((item, index) => (
                <TaxKindCard key={index} {...item} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    scrollPadding: {
        padding: 15,
        paddingBottom: 30,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 15,
        marginLeft: 5,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 16,
        position: "relative",
        overflow: "hidden",
        // Shadow for Mobile depth
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    activeCard: {
        borderColor: "#0071BC",
        borderWidth: 1.5,
        backgroundColor: "#F0F9FF",
    },
    accentBorder: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#F0F7FF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    taxNameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    taxSubtitleText: {
        fontSize: 12,
        color: "#64748B",
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 15,
    },
    infoItem: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    codeBadge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    codeBadgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
    },
    statusWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },
    descriptionContainer: {
        marginBottom: 15,
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
    },
    actionRow: {
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12,
    },
    editButton: {
        backgroundColor: "#0071BC",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 8,
    },
    deleteButton: {
        padding: 4,
    },
});

export default TaxKindList;
