import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const B2BSettingsHeader = ({ tabsData }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textWrapper}>
                <Text style={styles.mainTitle}>B2B Settings</Text>
                <Text style={styles.subTitle}>
                    Order Status Manager, Transition Rules, Role Permissions,
                    and Audit Log for B2B orders.
                </Text>
            </View>

            {!tabsData?.hideAllButton ? (
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.secondaryBtn}>
                        <Feather name="upload" size={14} color="#555" />
                        <Text style={styles.secondaryBtnText}>Import</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn}>
                        <Feather name="download" size={14} color="#555" />
                        <Text style={styles.secondaryBtnText}>Export</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn}>
                        <MaterialCommunityIcons
                            name="file-export-outline"
                            size={16}
                            color="#555"
                        />
                        <Text style={styles.secondaryBtnText}>Bulk Export</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {!tabsData?.hideAllButton ? (
                <TouchableOpacity style={styles.primaryBtn}>
                    <AntDesign name="plus" size={16} color="#FFF" />
                    <Text style={styles.primaryBtnText}>
                        {tabsData?.buttonName}
                    </Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingTop: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        flexWrap: "wrap",
    },
    textWrapper: {
        flex: 1,
        minWidth: 280,
        marginBottom: 12,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 4,
    },
    subTitle: {
        fontSize: 13,
        color: "#888",
        lineHeight: 18,
    },
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    secondaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
    },
    secondaryBtnText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "500",
        color: "#444",
    },
    primaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#0067a9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        flex: 1,
        justifyContent: "center",
        marginTop: 15,
    },
    primaryBtnText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
    },
});

export default B2BSettingsHeader;
