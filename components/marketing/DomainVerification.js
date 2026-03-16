import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DomainVerification = () => {
    return (
        <View style={styles.container}>
            {/* Top Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#00C950", "#009966"]}
                    style={styles.iconBox}
                >
                    <Ionicons name="globe-outline" size={20} color="#FFF" />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Domain verification</Text>
                    <Text style={styles.headerSubtitle}>
                        Meta uses domain verification for link permissions and
                        tracking.
                    </Text>
                </View>
            </View>

            {/* Domain Status Card Section */}
            <View style={styles.content}>
                <View style={styles.statusCard}>
                    <View style={styles.statusLeft}>
                        <View style={styles.checkCircle}>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={22}
                                color="#ffffff"
                            />
                        </View>
                        <View>
                            <View style={styles.domainRow}>
                                <Text style={styles.domainText}>
                                    baofengradios.com
                                </Text>
                                <View style={styles.verifiedBadge}>
                                    <Text style={styles.verifiedText}>
                                        VERIFIED
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.methodText}>
                                Status: verified • Method: DNS TXT
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.reVerifyButton}>
                        <Text style={styles.reVerifyText}>Re-verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        backgroundColor: "#F0FDF4",
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    content: {
        padding: 15,
    },
    statusCard: {
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DCFCE7",
        padding: 16,
    },
    statusLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkCircle: {
        marginRight: 12,
        backgroundColor: "#00BC7D",
        borderRadius: 50,
        padding: 5,
    },
    domainRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    domainText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    verifiedBadge: {
        backgroundColor: "#10B981",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    verifiedText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "800",
    },
    methodText: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },
    reVerifyButton: {
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 10,
    },
    reVerifyText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1E293B",
    },
});

export default DomainVerification;
