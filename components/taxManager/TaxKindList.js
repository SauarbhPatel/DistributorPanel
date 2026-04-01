import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import NoDataCard from "../common/NoDataCard";
import DeleteAlert from "../common/DeleteAlert";
import { __deleteApiData } from "../../utils/api";
import TaxKindModel from "./TaxKindModel";

const TaxKindCard = ({
    name,
    code,
    description,
    isActive,
    onDelete = () => {},
    onEdit = () => {},
}) => {
    const activeBlue = "#0071BC";
    const statusGreen = "#10B981";

    return (
        <View style={[styles.card]}>
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="cube-outline"
                            size={20}
                            color={activeBlue}
                        />
                    </View>
                    <View>
                        <Text style={styles.taxNameText}>{name}</Text>
                        {/* <Text style={styles.taxSubtitleText}>{code}</Text> */}
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete()}
                >
                    <Feather name="trash-2" size={18} color="#FF5252" />
                </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>TAX CODE</Text>
                    <View style={styles.codeBadge}>
                        <Text style={styles.codeBadgeText}>{code}</Text>
                    </View>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>STATUS</Text>
                    <View style={styles.statusWrapper}>
                        <View
                            style={[
                                styles.statusDot,
                                {
                                    backgroundColor: isActive
                                        ? statusGreen
                                        : "#EF4444",
                                },
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {isActive ? "Active" : "In-Active"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.label}>DESCRIPTION</Text>
                <Text style={styles.descriptionText}>{description || "-"}</Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={styles.editButton}
                    activeOpacity={0.8}
                    onPress={onEdit}
                >
                    <Feather name="edit-3" size={14} color="#FFF" />
                    <Text style={styles.editButtonText}>Edit Details</Text>
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

const TaxKindList = ({ onChange = () => {}, list = [], onDone = () => {} }) => {
    const [state, setState] = useState({
        loading: false,
        isShowDelete: false,
        isShowCreate: false,
        itemId: null,
        itemDetails: null,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowDelete, isShowCreate, loading, itemId, itemDetails } = state;

    const __handleDelete = async (id) => {
        try {
            updateState({ loading: true });
            const res = await __deleteApiData(
                `/tax-kinds/deleteTaxKindById/${id}`,
            );
            if (res?.success) {
                onDone();
                updateState({
                    isShowDelete: false,
                    itemId: null,
                });
            } else {
                Alert.alert(
                    "Error",
                    res?.message || "Failed, Please try again.",
                );
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            updateState({ loading: false });
        }
    };

    return (
        <View style={styles.container}>
            <DeleteAlert
                visible={isShowDelete}
                isLoading={loading}
                onCancel={() => {
                    updateState({
                        isShowDelete: false,
                        itemId: null,
                    });
                }}
                onDelete={() => {
                    __handleDelete(itemId);
                }}
            />
            <TaxKindModel
                item={itemDetails}
                visible={isShowCreate}
                onClose={(refresh) => {
                    updateState({ isShowCreate: false });
                    if (refresh) {
                        onDone();
                    }
                }}
                isEdit
            />
            {list.length > 0 ? (
                list.map((item, index) => (
                    <TaxKindCard
                        key={index}
                        {...item}
                        onDelete={() => {
                            updateState({
                                isShowDelete: true,
                                itemId: item?._id,
                            });
                        }}
                        onEdit={() => {
                            updateState({
                                isShowCreate: true,
                                itemDetails: item,
                            });
                        }}
                    />
                ))
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Tax Kinds Defined"
                    subTitle="Categorize your items by defining tax kinds (e.g., Electronics, Services). This helps in mapping specific tax rules and validation settings across your inventory."
                    buttonName="Add Tax Kind"
                    icon={
                        <MaterialCommunityIcons
                            name="shape-outline"
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
        paddingBottom: 0,
    },
    scrollPadding: {
        padding: 15,
        paddingBottom: 30,
    },
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
        alignItems: "flex-start",
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#F0F7FF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    taxNameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    taxSubtitleText: {
        fontSize: 12,
        color: "#64748B",
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 15,
    },
    infoItem: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    codeBadge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    codeBadgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
    },
    statusWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },
    descriptionContainer: {
        marginBottom: 15,
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
    },
    actionRow: {
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12,
    },
    editButton: {
        backgroundColor: "#0071BC",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 8,
    },
    deleteButton: {
        padding: 4,
    },
});

export default TaxKindList;
