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
import { Loader } from "../../modules";

const GenericProducts = ({ navigation }) => {
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
                title={"Generic Products"}
                subTitle="Auto-generate and manage generic products from global products"
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
                                title="Global Products"
                                value={totalProductss}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Total Generic Products"
                                value={filterableProductss}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Active Generic Products"
                                value={variantProductss}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="layers"
                            />
                            <StatCard
                                title="Variant Attributes"
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

                {/* <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => updateState({ isShowCreate: true })}
                >
                    <Feather name="plus" size={18} color={Colors.whiteColor} />
                    <Text style={styles.addText}>Add Products</Text>
                </TouchableOpacity> */}
            </View>
        );
    }

    function ProductsCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        id: "p1",
                        name: "Nike Air T-Shirt",
                        type: "VARIABLE",
                        category: "T-Shirts",
                        brand: "Nike",
                        variantsCount: 4,
                        variants: [
                            {
                                id: "v1",
                                sku: "NIK-AIR-RED-S",
                                title: "Red / S",
                                mrp: 1499,
                                price: 1199,
                                stock: 50,
                                active: true,
                            },
                            {
                                id: "v2",
                                sku: "NIK-AIR-RED-M",
                                title: "Red / M",
                                mrp: 1499,
                                price: 1199,
                                stock: 35,
                                active: true,
                            },
                            {
                                id: "v3",
                                sku: "NIK-AIR-BLU-S",
                                title: "Blue / S",
                                mrp: 1499,
                                price: 1199,
                                stock: 20,
                                active: true,
                            },
                            {
                                id: "v4",
                                sku: "NIK-AIR-BLU-M",
                                title: "Blue / M",
                                mrp: 1499,
                                price: 1199,
                                stock: 0,
                                active: true,
                            },
                        ],
                    },
                    {
                        id: "p2",
                        name: "iPhone 15 Pro",
                        type: "VARIABLE",
                        category: "Smartphones",
                        brand: "Apple",
                        variantsCount: 3,
                        variants: [],
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

export default GenericProducts;

const ListCard = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.productCard}>
            {/* Header */}
            <TouchableOpacity
                style={styles.header}
                onPress={() => setOpen(!open)}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subText}>
                        {item.category} • {item.brand} • {item.variantsCount}{" "}
                        variants
                    </Text>
                </View>

                <View style={styles.typeChip}>
                    <Text style={styles.typeText}>Variable</Text>
                </View>
            </TouchableOpacity>

            {/* Action */}
            <TouchableOpacity style={styles.generateBtn}>
                <Feather name="refresh-cw" size={14} />
                <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>

            {/* Variants */}
            {open &&
                item.variants.map((v) => <VariantCard key={v.id} item={v} />)}
        </View>
    );
};
const VariantCard = ({ item }) => {
    const isOut = item.stock === 0;

    return (
        <View style={styles.variantCard}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <Text style={styles.variantTitle}>{item.title}</Text>

                <View style={styles.statusWrap}>
                    <View
                        style={[styles.statusDot, isOut && styles.outStock]}
                    />
                    <Text
                        style={[
                            styles.statusText,
                            isOut && { color: "#EF4444" },
                        ]}
                    >
                        {isOut ? "Out" : "Live"}
                    </Text>
                </View>
            </View>

            {/* SKU */}
            <Text style={styles.sku}>SKU: {item.sku}</Text>

            {/* Meta Row */}
            <View style={styles.metaRow}>
                <View style={styles.priceBox}>
                    <Text style={styles.price}>₹{item.price}</Text>
                    <Text style={styles.mrp}>₹{item.mrp}</Text>
                </View>

                <View style={[styles.stockBadge, isOut && styles.stockOut]}>
                    <Text
                        style={[
                            styles.stockText,
                            isOut && { color: "#EF4444" },
                        ]}
                    >
                        Stock {item.stock}
                    </Text>
                </View>
            </View>

            {/* Action */}
            <TouchableOpacity style={styles.editBtn}>
                <Feather name="edit-2" size={14} />
                <Text style={styles.editText}>Edit Variant</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        // marginRight: 10,
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
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 16,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
    },

    subText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
    },

    typeChip: {
        backgroundColor: "#E0EAFF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    typeText: {
        fontSize: 12,
        color: "#2563EB",
        fontWeight: "500",
    },

    generateBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
    },

    generateText: {
        fontSize: 13,
        color: "#2563EB",
    },

    variantCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    variantTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },

    statusWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 10,
        backgroundColor: "#22C55E",
    },

    statusText: {
        fontSize: 12,
        color: "#16A34A",
        fontWeight: "500",
    },

    outStock: {
        backgroundColor: "#EF4444",
    },

    sku: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 6,
    },

    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },

    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    mrp: {
        fontSize: 13,
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },

    stockBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: "#ECFDF5",
    },

    stockText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#16A34A",
    },

    stockOut: {
        backgroundColor: "#FEF2F2",
    },

    editBtn: {
        marginTop: 12,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    editText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#2563EB",
    },
});
