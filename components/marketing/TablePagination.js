import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TablePagination = ({ currentPage = 1, totalProducts = 5 }) => {
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.countText}>
                Showing <Text style={styles.boldText}>{totalProducts}</Text> of{" "}
                <Text style={styles.boldText}>{totalProducts}</Text> products
            </Text>

            <View style={styles.paginationRow}>
                <TouchableOpacity
                    style={styles.outlineButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.outlineButtonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.activeButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.activeButtonText}>{currentPage}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.outlineButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.outlineButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    countText: {
        fontSize: 12,
        color: "#64748b",
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    boldText: {
        fontWeight: "700",
        color: "#1e293b",
    },
    paginationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    outlineButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        minWidth: 80,
        alignItems: "center",
        flex: 1,
    },
    outlineButtonText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
    },
    activeButton: {
        backgroundColor: "#0369a1",
        borderRadius: 8,
        width: 43,
        height: 43,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    activeButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
});

export default TablePagination;
