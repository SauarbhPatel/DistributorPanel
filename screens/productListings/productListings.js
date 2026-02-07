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
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";

const ProductListings = ({ navigation }) => {
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
                title={"Product Listings"}
                subTitle={
                    "Manage product listings with SKU, pricing, and inventory"
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
            {/* <BottomPopup
                isShow={isShowCreate}
                title="Add New Products"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateProductProducts
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            /> */}
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
                                title="Total Listings"
                                value={totalProductss}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Active Listings"
                                value={filterableProductss}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Total Inventory"
                                value={variantProductss}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="layers"
                            />
                            <StatCard
                                title="Total Value"
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
                    <Text style={styles.addText}>Add Listing</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function ProductsCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        id: "1",
                        productName: "Nike Air T-Shirt",
                        variant: "Red / S",
                        sku: "NIK-AIR-RED-S",
                        fsn: "FSN00000001",
                        ean: "8901234567890",
                        mrp: 999,
                        price: 799,
                        stock: 89,
                        isActive: true,
                    },
                    {
                        id: "2",
                        productName: "Nike Air T-Shirt",
                        variant: "Red / M",
                        sku: "NIK-AIR-RED-M",
                        fsn: "FSN00000002",
                        ean: "8901234567891",
                        mrp: 1099,
                        price: 879,
                        stock: 76,
                        isActive: true,
                    },
                ]?.map((item) => (
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

export default ProductListings;

const ListCard = ({ item }) => {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.variant}>{item.variant}</Text>
                </View>

                <View
                    style={[styles.status, !item.isActive && styles.inactive]}
                >
                    <Text style={styles.statusText}>
                        {item.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>
            </View>

            {/* Codes */}
            <View style={styles.codeRow}>
                <Text style={styles.code}>SKU: {item.sku}</Text>
                <Text style={styles.code}>FSN: {item.fsn}</Text>
                <Text style={styles.code}>EAN: {item.ean}</Text>
            </View>

            {/* Price + Stock */}
            <View style={styles.metaRow}>
                <View style={styles.priceWrap}>
                    <Text style={styles.price}>₹{item.price}</Text>
                    <Text style={styles.mrp}>₹{item.mrp}</Text>
                </View>

                <View style={styles.stock}>
                    <Text style={styles.stockText}>📦 {item.stock}</Text>
                </View>
            </View>

            {/* Actions */}
            <View style={styles.footer}>
                <Action icon="eye" label="View" onPress={() => {}} />
                <Action icon="edit-2" label="Edit" onPress={() => {}} />
                <Action
                    icon="trash-2"
                    label="Delete"
                    danger
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

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
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    productName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },

    variant: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },

    status: {
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    inactive: {
        backgroundColor: "#FEE2E2",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2563EB",
    },

    codeRow: {
        marginTop: 10,
    },

    code: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    metaRow: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    priceWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#16A34A",
    },

    mrp: {
        fontSize: 13,
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },

    stock: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    stockText: {
        fontSize: 12,
        fontWeight: "600",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },

    action: {
        fontSize: 13,
        fontWeight: "600",
        color: "#2563EB",
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
