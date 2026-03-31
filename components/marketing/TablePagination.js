import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TablePagination = ({ pagination = {}, onPageChange = () => {} }) => {
    const { total = 0, page = 1, limit = 10, totalPages = 1 } = pagination;

    // Calculate showing range
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <View style={styles.footerContainer}>
            <Text style={styles.countText}>
                Showing{" "}
                <Text style={styles.boldText}>
                    {total === 0 ? 0 : start}-{end}
                </Text>{" "}
                of <Text style={styles.boldText}>{total}</Text> products
            </Text>

            <View style={styles.paginationRow}>
                <TouchableOpacity
                    style={[
                        styles.outlineButton,
                        isFirstPage && styles.disabledButton,
                    ]}
                    disabled={isFirstPage}
                    onPress={() => onPageChange(page - 1)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.outlineButtonText,
                            isFirstPage && styles.disabledText,
                        ]}
                    >
                        Previous
                    </Text>
                </TouchableOpacity>

                <View style={styles.activeButton}>
                    <Text style={styles.activeButtonText}>{page}</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.outlineButton,
                        isLastPage && styles.disabledButton,
                    ]}
                    disabled={isLastPage}
                    onPress={() => onPageChange(page + 1)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.outlineButtonText,
                            isLastPage && styles.disabledText,
                        ]}
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {},
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
        elevation: 3,
    },
    activeButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
    disabledButton: {
        backgroundColor: "#f1f5f9",
        borderColor: "#e2e8f0",
    },
    disabledText: {
        color: "#94a3b8",
    },
});

export default TablePagination;
