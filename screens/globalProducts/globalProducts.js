import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";
import CreateGlobalProducts from "../../components/form/CreateGlobalProducts";

const GlobalProducts = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        list: [],
        totalProductss: 0,
        filterableProductss: 0,
        variantProductss: 0,
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isShowCreate,
        loading,
        list,
        totalProductss,
        filterableProductss,
        variantProductss,
    } = state;

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading: true });
            const res = await __getApiData(
                `/globalProducts/getAllGlobalProducts`,
            );
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data,
                    // ...res?.data?.stats,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading: false });
        }
    };

    useEffect(() => {
        __handleGetData(search);
    }, [search]);

    const __handleDeleteProducts = (id) => {
        Alert.alert(
            "Delete Products",
            "Are you sure you want to delete this Products?",
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

                            const res = await __deleteApiData(
                                `/productProductss/deleteProductsById/${id}`,
                            );
                            if (res?.success) {
                                // refresh list after delete
                                __handleGetData(search);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={"Global Products"}
                subTitle={
                    "Create and manage global products (groups of generic products)"
                }
                navigation={navigation}
            />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {statsCards()}
                {searchAndAdd()}
                {ProductsCards()}
            </ScrollView>
            <BottomPopup
                isShow={isShowCreate}
                title="Create Global Product"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateGlobalProducts
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
                top="10%"
            />
        </SafeAreaView>
    );

    function statsCards() {
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={styles.statsRow}>
                            <StatCard
                                title="Total Products"
                                value={totalProductss}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Approved"
                                value={filterableProductss}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Pending Review"
                                value={variantProductss}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="layers"
                            />
                            <StatCard
                                title="Total Generic Products"
                                value={filterableProductss}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                        </View>
                    </>
                }
            />
        );
    }

    function searchAndAdd() {
        return (
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={18} color={Colors.grayColor} />
                    <TextInput
                        placeholder="Search Products..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => updateState({ isShowCreate: true })}
                >
                    <Feather name="plus" size={18} color={Colors.whiteColor} />
                    <Text style={styles.addText}>Add Products</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function ProductsCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {list?.map((item) => (
                    <ListCard
                        item={item}
                        key={item?._id}
                        __handleDeleteProducts={__handleDeleteProducts}
                        onDone={() => __handleGetData(search)}
                    />
                ))}
            </View>
        );
    }
};

export default GlobalProducts;

const ListCard = ({ item, onView, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.name}
                    </Text>

                    {item.description ? (
                        <Text style={styles.subtitle} numberOfLines={2}>
                            {item.description}
                        </Text>
                    ) : null}
                </View>

                <View
                    style={[
                        styles.statusPill,
                        !item.isActive && styles.statusInactive,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            !item.isActive && styles.statusTextInactive,
                        ]}
                    >
                        {item.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>
            </View>

            {/* Type Chip */}
            <View style={styles.typeChip}>
                <Text style={styles.typeText}>{item.productType}</Text>
            </View>

            {/* Meta Grid */}
            <View style={styles.metaGrid}>
                <MetaItem label="HSN" value={item.hsn?.code} />
                <MetaItem label="Tax" value={`${item.hsn?.taxRate}%`} />
                <MetaItem
                    label="Variants"
                    value={item.variantProductss?.length || 0}
                />
                <MetaItem
                    label="Productss"
                    value={item.regularProductss?.length || 0}
                />
            </View>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <Action icon="eye" label="View" onPress={onView} />
                <Action icon="edit-2" label="Edit" onPress={onEdit} />
                <Action
                    icon="trash-2"
                    label="Delete"
                    danger
                    onPress={onDelete}
                />
            </View>
        </View>
    );
};

const MetaItem = ({ label, value }) => (
    <View style={styles.metaItem}>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
    </View>
);

const Action = ({ icon, label, danger, onPress }) => (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
        <Feather
            name={icon}
            size={18}
            color={danger ? "#EF4444" : Colors.primaryColor}
        />
        <Text style={[styles.actionText, danger && { color: "#EF4444" }]}>
            {label}
        </Text>
    </TouchableOpacity>
);
const StatCard = ({ title, value, colors, icon }) => (
    <LinearGradient colors={colors} style={styles.statCard}>
        <View style={{ marginEnd: 10 }}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
        <View style={styles.statIcon}>
            <Feather name={icon} size={22} color="#fff" />
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    header: {
        padding: Sizes.fixPadding,
    },

    subTitle: {
        marginTop: 4,
        ...Fonts.grayColor14Regular,
    },

    /* ================= Stats Cards ================= */

    statsRow: {
        flexDirection: "row",
        paddingHorizontal: Sizes.fixPadding - 5,
        justifyContent: "space-between",
    },

    statCard: {
        flex: 1,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statTitle: {
        color: "#E5E7EB",
        fontSize: 12,
    },

    statValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 4,
    },

    statIcon: {
        backgroundColor: "rgba(255,255,255,0.25)",
        padding: 10,
        borderRadius: 12,
    },

    /* ================= Search + Add ================= */

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: Sizes.fixPadding,
    },

    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        height: 45,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        marginLeft: 8,
    },

    addBtn: {
        flexDirection: "row",
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 14,
        height: 45,
        borderRadius: Sizes.fixPadding,
        alignItems: "center",
    },

    addText: {
        color: Colors.whiteColor,
        marginLeft: 6,
        fontWeight: "600",
    },

    /* ================= Products Set Card ================= */
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        elevation: 3,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },

    title: {
        fontSize: 17,
        fontFamily: Fonts.medium,
        color: "#111",
    },

    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
    },

    statusPill: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusInactive: {
        backgroundColor: "#FEE2E2",
    },

    statusText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: "#16A34A",
    },

    statusTextInactive: {
        color: "#DC2626",
    },

    typeChip: {
        alignSelf: "flex-start",
        backgroundColor: "#E0EAFF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginTop: 10,
    },

    typeText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: "#2563EB",
    },

    metaGrid: {
        marginTop: 14,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    metaItem: {
        width: "48%",
    },

    metaLabel: {
        fontSize: 12,
        color: "#6B7280",
    },

    metaValue: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: "#111",
        marginTop: 2,
    },

    footer: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    actionText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.primaryColor,
    },
});
