import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomReports = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>2</Text>
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>Custom reports</Text>
                    <Text style={styles.subtitle}>
                        Build and save report templates; schedule
                        daily/weekly/monthly.
                    </Text>
                </View>
            </View>
            <View style={{ padding: 16 }}>
                <View style={styles.alertBox}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={18}
                        color="#B45309"
                    />
                    <Text style={styles.alertText}>
                        No saved reports yet. Create a report to select
                        dimensions and metrics.
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={20}
                        color="white"
                    />
                    <Text style={styles.buttonText}>Build Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomReports;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: "#FAF5FF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    badge: {
        width: 28,
        height: 28,
        borderRadius: 16,
        backgroundColor: "#AD46FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginTop: 2,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    headerTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
    },
    alertBox: {
        flexDirection: "row",
        backgroundColor: "#FFFBEB",
        borderWidth: 1,
        borderColor: "#FEF3C7",
        borderRadius: 10,
        padding: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    alertText: {
        flex: 1,
        color: "#B45309",
        fontSize: 13,
        marginLeft: 10,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#0277BD",
        alignSelf: "flex-start",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 8,
    },
});
