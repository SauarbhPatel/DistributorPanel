import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ProductTableHeader = ({
    title = "Product table",
    subTitle = "From My Listings (Inventory HUB). Columns: Image, id (SKU), title, price, availability, link / image_link, Status.",
}) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.titleText}>{title}</Text>

            <Text style={styles.descriptionText}>{subTitle}</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by title or SKU..."
                    placeholderTextColor="#94a3b8"
                />
            </View>
            <View style={styles.controlsRow}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name="view-column"
                        size={18}
                        color="#1e293b"
                    />
                    <Text style={styles.dropdownText}>Show Column</Text>
                    <Feather name="chevron-down" size={16} color="#1e293b" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownText}>Showing 10-50</Text>
                    <Feather name="chevron-down" size={16} color="#1e293b" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 6,
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
        marginBottom: 16,
    },
    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 15,
    },
    searchContainer: {
        flex: 2,
        minWidth: 200,
    },
    searchInput: {
        height: 44,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 13,
        color: "#1e293b",
    },
    dropdownButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 44,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        minWidth: 140,
    },
    dropdownText: {
        fontSize: 13,
        color: "#64748b",
        marginHorizontal: 8,
        flex: 1,
    },
});

export default ProductTableHeader;
