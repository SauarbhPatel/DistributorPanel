import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { __formatDate2 } from "../../utils/funtion";
import NoDataCard from "../common/NoDataCard";
import { __deleteApiData } from "../../utils/api";
import { Loader } from "../../modules";

const TaxSlabCard = ({
    name,
    code,
    taxTypeName,
    rate,
    jurisdictionName,
    effectiveFrom,
    isActive,
    onDelete = () => {},
}) => {
    const activeBlue = "#0071BC";
    const statusGreen = "#10B981";

    return (
        <View style={[styles.card, isActive && styles.activeCard]}>
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="percent"
                            size={18}
                            color={activeBlue}
                        />
                    </View>
                    <View>
                        <Text style={styles.taxNameText}>{name}</Text>
                        <Text style={styles.taxSubtitleText}>{code}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                    <Feather
                        name="trash-2"
                        size={18}
                        color="#FF5252"
                        onPress={onDelete}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>Rate</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{rate}</Text>
                        </View>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>TAX TYPE</Text>
                        <Text style={styles.valueText}>{taxTypeName}</Text>
                    </View>
                </View>

                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>JURISDICTION</Text>
                        <Text style={styles.valueText}>{jurisdictionName}</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>EFFECTIVE FROM</Text>
                        <Text style={styles.valueText}>
                            {__formatDate2(effectiveFrom)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.statusWrapper}>
                    <View
                        style={[
                            styles.statusDot,
                            { backgroundColor: statusGreen },
                        ]}
                    />
                    <Text style={styles.statusText}>
                        {isActive ? "ACTIVE" : "INACTIVE"}
                    </Text>
                </View>

                <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                    <Feather name="edit-3" size={14} color="#FFF" />
                    <Text style={styles.editButtonText}>Edit Slab</Text>
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

const TaxSlabList = ({ list = [], onChange = () => {}, onDone = () => {} }) => {
    const [state, setState] = useState({
        loading: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { loading } = state;
    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Tax Master",
            "Are you sure you want to delete?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            updateState({ loading: true });
                            console.log(id);

                            const res = await __deleteApiData(
                                `/taxSlabs/deleteTaxSlabById/${id}`,
                            );
                            if (res?.success) {
                                onDone();
                            } else {
                                Alert.alert("Error", res?.message);
                            }
                        } catch (error) {
                            Alert.alert("Error", "Something went wrong");
                        } finally {
                            updateState({ loading: false });
                        }
                    },
                },
            ],
            { cancelable: true },
        );
    };
    return (
        <View style={styles.container}>
            <Loader isShow={loading} />
            {list.length > 0 ? (
                list.map((item, index) => (
                    <TaxSlabCard
                        key={item?._id}
                        {...item}
                        onDelete={() => {
                            __handleDelete(item?._id);
                        }}
                    />
                ))
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Tax Slabs Configured"
                    subTitle="Define your tax percentage groups (e.g., 5%, 12%, 18%) and their effective dates to enable automated tax calculations for your products."
                    buttonName="Create Tax Slab"
                    icon={
                        <MaterialCommunityIcons
                            name="percent-outline"
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
        paddingBottom: 30,
    },
    scrollPadding: {},
    screenTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 15,
        marginLeft: 5,
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
    },
    activeCard: {},
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
        marginBottom: 15,
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    iconContainer: {
        width: 36,
        height: 36,
        backgroundColor: "#F0F7FF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    taxNameText: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    taxSubtitleText: { fontSize: 11, color: "#64748B" },
    gridContainer: {
        backgroundColor: "#FDFDFD",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginBottom: 15,
    },
    gridRow: { flexDirection: "row", marginBottom: 12 },
    gridItem: { flex: 1 },
    label: {
        fontSize: 9,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    valueText: { fontSize: 13, fontWeight: "600", color: "#334155" },
    badge: {
        backgroundColor: "#FFF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    badgeText: { fontSize: 11, fontWeight: "700", color: "#475569" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12,
    },
    statusWrapper: { flexDirection: "row", alignItems: "center" },
    statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
    statusText: { fontSize: 11, fontWeight: "700", color: "#475569" },
    editButton: {
        backgroundColor: "#0071BC",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 4,
    },
    deleteButton: { padding: 4 },
});

export default TaxSlabList;
