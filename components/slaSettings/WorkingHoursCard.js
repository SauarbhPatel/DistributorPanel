import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const WorkingHoursCard = ({ item }) => {
    return (
        <View
            style={[
                styles.card,
                {
                    borderColor: item.themeColor + "40",
                    backgroundColor: item.themeColor + "08",
                },
            ]}
        >
            <View style={styles.content}>
                {/* ROW 1: REGION & BADGES */}
                <View style={styles.headerRow}>
                    <View
                        style={[
                            styles.regionIcon,
                            { backgroundColor: item.themeColor },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={14}
                            color="#fff"
                        />
                        <Text style={styles.regionText}>{item.regionCode}</Text>
                    </View>

                    <View style={styles.badgeGroup}>
                        <View style={styles.outlineBadge}>
                            <Feather name="globe" size={12} color="#666" />
                            <Text style={styles.badgeText}>
                                {item.timezone}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.filledBadge,
                                { backgroundColor: item.themeColor + "15" },
                            ]}
                        >
                            {item.assignTo.includes("Tier") ? (
                                <Feather
                                    name="star"
                                    size={12}
                                    color={item.themeColor}
                                />
                            ) : (
                                <Feather
                                    name="users"
                                    size={12}
                                    color={item.themeColor}
                                />
                            )}
                            <Text
                                style={[
                                    styles.badgeText,
                                    { color: item.themeColor },
                                ]}
                            >
                                {item.assignTo}
                            </Text>
                        </View>
                    </View>

                    {/* ACTIONS */}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionCircle}>
                            <Feather name="edit-2" size={14} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionCircle}>
                            <Feather name="trash-2" size={14} color="#fa5252" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ROW 2: DAYS */}
                <View style={styles.daysRow}>
                    {item.days.map((day, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dayBadge,
                                { backgroundColor: item.themeColor + "20" },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    { color: item.themeColor },
                                ]}
                            >
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* ROW 3: TIME & CALENDAR */}
                <View style={styles.footerRow}>
                    <View style={styles.infoItem}>
                        <Feather
                            name="clock"
                            size={14}
                            color={item.themeColor}
                        />
                        <Text style={styles.infoText}>{item.workingHours}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Feather name="sun" size={14} color={item.themeColor} />
                        <Text style={styles.infoText}>
                            Cutoff:{" "}
                            <Text style={{ fontWeight: "700" }}>
                                {item.cutoffTime}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Feather
                            name="calendar"
                            size={14}
                            color={item.themeColor}
                        />
                        <Text style={styles.infoText}>{item.calendarCode}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default WorkingHoursCard;
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        overflow: "hidden", // Ensures accentBar doesn't bleed out
        flexDirection: "row",
    },
    accentBar: {
        width: 6,
        height: "100%",
    },
    content: {
        flex: 1,
        padding: 12,
        paddingLeft: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    regionIcon: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 12,
        gap: 4,
    },
    regionText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    badgeGroup: {
        flexDirection: "row",
        flex: 1,
        gap: 8,
    },
    outlineBadge: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    filledBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    badgeText: {
        fontSize: 11,
        color: "#495057",
        fontWeight: "500",
    },
    actions: {
        flexDirection: "row",
        gap: 0,
    },
    actionCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ececec",
    },
    daysRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 12,
    },
    dayBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
    },
    dayText: {
        fontSize: 11,
        fontWeight: "600",
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: "#f1f3f5",
        paddingTop: 10,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    infoText: {
        fontSize: 12,
        color: "#495057",
    },
});
