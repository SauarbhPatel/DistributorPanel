import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import NoDataCard from "../common/NoDataCard";

const InvoiceTemplateCard = ({
    name,
    hsn,
    tax_break,
    rev_charge,
    gstin,
    status,
    isActive,
}) => {
    const activeBlue = "#0071BC";
    const statusGreen = "#10B981";

    return (
        <View style={[styles.card, isActive && styles.activeCard]}>
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="cube-outline"
                            size={20}
                            color={activeBlue}
                        />
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.subtitleText}>
                            GSTIN - {gstin ? "Yes" : "No"}
                        </Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Feather name="trash-2" size={18} color="#FF5252" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>HSN</Text>
                    <Text style={styles.valueText}>{hsn ? "Yes" : "No"}</Text>
                </View>
                <View style={[styles.infoItem, { alignItems: "center" }]}>
                    <Text style={styles.label}>TAX BREAK</Text>
                    <Text style={styles.valueText}>
                        {tax_break ? "Yes" : "No"}
                    </Text>
                </View>
                <View style={[styles.infoItem, { alignItems: "flex-end" }]}>
                    <Text style={styles.label}>REV. CHARGE</Text>
                    <View style={styles.statusWrapper}>
                        <Text style={styles.valueText}>
                            {rev_charge ? "Yes" : "No"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                    <Feather name="edit-3" size={14} color="#FFF" />
                    <Text style={styles.editButtonText}>Edit Details</Text>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    styles.accentBorder,
                    { backgroundColor: isActive ? activeBlue : statusGreen },
                ]}
            />
        </View>
    );
};

const InvoiceTemplateList = ({ onChange = () => {} }) => {
    const hsnData = [
        {
            id: 1,
            name: "Default GST Invoice",
            gstin: true,
            hsn: true,
            tax_break: true,
            rev_charge: true,
            is_default: true,
            status: "active",
        },
        {
            id: 2,
            name: "Default GST Invoice",
            gstin: true,
            hsn: true,
            tax_break: true,
            rev_charge: true,
            is_default: true,
            status: "inactive",
        },
    ];

    return (
        <View style={styles.container}>
            {hsnData.length > 0 ? (
                hsnData.map((item, index) => (
                    <InvoiceTemplateCard key={index} {...item} />
                ))
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Invoice Templates"
                    subTitle="Create and customize professional invoice layouts with your own branding, tax rules, and terms."
                    buttonName="Create Template"
                    icon={
                        <MaterialCommunityIcons
                            name="file-document-edit-outline"
                            size={42}
                            color="#94A3B8"
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 15,
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
        alignItems: "center",
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        backgroundColor: "#F0F7FF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    titleWrapper: {
        flex: 1,
    },
    nameText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    subtitleText: {
        fontSize: 11,
        color: "#64748B",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
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
    infoRow: {
        flexDirection: "row",
        marginBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    infoItem: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    codeBadge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    codeBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#475569",
    },
    valueText: {
        fontSize: 12,
        color: "#475569",
        fontWeight: "500",
    },
    descriptionText: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 16,
    },
    statusWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 11,
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
});

export default InvoiceTemplateList;
