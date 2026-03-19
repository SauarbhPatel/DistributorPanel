import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import NoDataCard from "../common/NoDataCard";

const ZoneCard = ({ name, country, city, pincode, methods, status }) => {
    return (
        <View style={styles.card}>
            {/* Left Accent Border (Simulating the table selection) */}
            <View
                style={[
                    styles.accentBorder,
                    {
                        backgroundColor:
                            country === "China" ? "#00BFA5" : "#0071BC",
                    },
                ]}
            />

            <View style={styles.cardContent}>
                {/* Header: Name and Delete */}
                <View style={styles.header}>
                    <Text style={styles.zoneName}>{name}</Text>
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="trash-2" size={20} color="#FF5252" />
                    </TouchableOpacity>
                </View>

                {/* Info Grid */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>COUNTRY</Text>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>{country}</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>METHODS</Text>
                            <Text style={styles.valueText}>{methods}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>STATE / CITY</Text>
                            <Text style={styles.valueText}>{city}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>PINCODES</Text>
                            <Text style={styles.valueText}>{pincode}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer: Status and Edit Button */}
                <View style={styles.footer}>
                    <View style={styles.statusRow}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>{status}</Text>
                    </View>

                    <TouchableOpacity>
                        <LinearGradient
                            colors={["#0071BC", "#005A96"]}
                            style={styles.editButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Feather name="edit-3" size={14} color="#FFF" />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ZoneList = ({ onChange }) => {
    const zoneData = [
        {
            id: 1,
            name: "Zone name",
            country: "India",
            city: "8517, 8516",
            pincode: "110011",
            methods: 0,
            status: "ACTIVE",
        },
        {
            id: 2,
            name: "Zone name",
            country: "China",
            city: "8517, 8516",
            pincode: "110011",
            methods: 0,
            status: "ACTIVE",
        },
        {
            id: 3,
            name: "Zone name",
            country: "India",
            city: "8517, 8516",
            pincode: "110011",
            methods: 0,
            status: "ACTIVE",
        },
    ];

    return (
        <View style={styles.container}>
            {zoneData.length > 0 ? (
                zoneData.map((zone) => <ZoneCard key={zone.id} {...zone} />)
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Shipping Zones Found"
                    subTitle="You haven't created any geographic zones yet. Create one to start assigning shipping methods to specific regions."
                    buttonName="Create Your First Zone"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        marginHorizontal: 10,
        marginTop: 10,
        marginBlockStart: 40,
        gap: 10,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    accentBorder: {
        width: 6,
        height: "100%",
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    zoneName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    infoContainer: {
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
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
    valueText: {
        fontSize: 13,
        color: "#475569",
        fontWeight: "500",
    },
    tag: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    tagText: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10B981", // Active Green
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#64748B",
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
    },
});

export default ZoneList;
