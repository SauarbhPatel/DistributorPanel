import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ShippingZonesHeader = ({ search, onChange = () => {} }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textSection}>
                {/* <Text style={styles.titleText}>Shipping Zones</Text> */}
                <Text style={styles.descriptionText}>
                    Geographic zones by country, state, city, and pincode
                    ranges. Assign shipping methods to each zone so buyers in
                    that region see the right options.
                </Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Feather name="download" size={16} color="#4B5563" />
                    <Text style={styles.secondaryButtonText}>Export</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                    <MaterialCommunityIcons
                        name="file-document-outline"
                        size={16}
                        color="#4B5563"
                    />
                    <Text style={styles.secondaryButtonText}>Bulk Export</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onChange({ isShowCreate: true })}
            >
                <LinearGradient
                    colors={["#0061A8", "#004A80"]}
                    style={styles.primaryButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Feather name="plus" size={18} color="#FFF" />
                    <Text style={styles.primaryButtonText}>Create Zone</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.filterRow}>
                <View style={styles.searchBar}>
                    <Feather
                        name="search"
                        size={16}
                        color="#9CA3AF"
                        style={{ marginRight: 8 }}
                    />
                    <TextInput
                        placeholder="Name, country, state..."
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        value={search}
                        onChangeText={(text) => onChange({ search: text })}
                    />
                </View>

                <TouchableOpacity
                    style={styles.statusDropdown}
                    activeOpacity={0.9}
                >
                    <Text style={styles.statusText}>By Status</Text>
                    <Feather name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    textSection: {
        marginBottom: 20,
    },
    titleText: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 6,
    },
    descriptionText: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 20,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    secondaryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingVertical: 10,
        width: "48%",
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4B5563",
        marginLeft: 6,
    },
    primaryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 12,
        marginBottom: 16,
        // Soft Shadow
        shadowColor: "#0061A8",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    primaryButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 6,
    },
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#111827",
    },
    statusDropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
        width: 110,
    },
    statusText: {
        fontSize: 13,
        color: "#4B5563",
        fontWeight: "500",
    },
});

export default ShippingZonesHeader;
