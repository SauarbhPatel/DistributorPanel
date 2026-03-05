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
import { Image } from "react-native";

const SAMPLE_PRODUCTS = [
    {
        _id: "prod_101",
        name: "Wireless Bluetooth Earphone",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        sku: "SKU-WB-101",
        psn: "PSN-WB-001",
        lid: "LID-SEL-001",
        isActive: true,
        totalStock: 120,
        mrp: 2999,
        price: 2499,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 40 },
            { locationId: "loc2", name: "Delhi", stock: 35 },
            { locationId: "loc3", name: "Tauru", stock: 20 },
            { locationId: "loc4", name: "Chennai", stock: 25 },
        ],
        variants: [
            {
                _id: "var_101a",
                name: "Black Edition",
                image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500",
                sku: "SKU-WB-BLK",
                psn: "PSN-WB-002",
                lid: "LID-SEL-002",
                isActive: true,
                stock: 70,
                mrp: 2999,
                price: 2499,
                inventory: [
                    { locationId: "loc1", name: "Gurgaon", stock: 25 },
                    { locationId: "loc2", name: "Delhi", stock: 20 },
                    { locationId: "loc3", name: "Tauru", stock: 10 },
                    { locationId: "loc4", name: "Chennai", stock: 15 },
                ],
            },
            {
                _id: "var_101b",
                name: "White Edition",
                image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
                sku: "SKU-WB-WHT",
                psn: "PSN-WB-003",
                lid: "LID-SEL-003",
                isActive: true,
                stock: 50,
                mrp: 2899,
                price: 2399,
                inventory: [
                    { locationId: "loc1", name: "Gurgaon", stock: 15 },
                    { locationId: "loc2", name: "Delhi", stock: 15 },
                    { locationId: "loc3", name: "Tauru", stock: 10 },
                    { locationId: "loc4", name: "Chennai", stock: 10 },
                ],
            },
        ],
    },

    {
        _id: "prod_102",
        name: "Portable SSD 1TB",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
        sku: "SKU-SSD-1TB",
        psn: "PSN-SSD-001",
        lid: "LID-SEL-010",
        isActive: true,
        totalStock: 60,
        mrp: 5999,
        price: 5499,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 20 },
            { locationId: "loc2", name: "Delhi", stock: 15 },
            { locationId: "loc3", name: "Tauru", stock: 10 },
            { locationId: "loc4", name: "Chennai", stock: 15 },
        ],
        variants: [],
    },

    {
        _id: "prod_103",
        name: "Smart Fitness Band",
        image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
        sku: "SKU-FB-2026",
        psn: "PSN-FB-001",
        lid: "LID-SEL-020",
        isActive: false,
        totalStock: 35,
        mrp: 3999,
        price: 3499,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 10 },
            { locationId: "loc2", name: "Delhi", stock: 8 },
            { locationId: "loc3", name: "Tauru", stock: 7 },
            { locationId: "loc4", name: "Chennai", stock: 10 },
        ],
        variants: [
            {
                _id: "var_103a",
                name: "Black Strap",
                image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
                sku: "SKU-FB-BLK",
                psn: "PSN-FB-002",
                lid: "LID-SEL-021",
                isActive: true,
                stock: 20,
                mrp: 3999,
                price: 3499,
                inventory: [
                    { locationId: "loc1", name: "Gurgaon", stock: 6 },
                    { locationId: "loc2", name: "Delhi", stock: 5 },
                    { locationId: "loc3", name: "Tauru", stock: 4 },
                    { locationId: "loc4", name: "Chennai", stock: 5 },
                ],
            },
        ],
    },

    {
        _id: "prod_104",
        name: "Gaming Mechanical Keyboard",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
        sku: "SKU-GMK-001",
        psn: "PSN-GMK-001",
        lid: "LID-SEL-030",
        isActive: true,
        totalStock: 45,
        mrp: 4999,
        price: 4599,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 15 },
            { locationId: "loc2", name: "Delhi", stock: 10 },
            { locationId: "loc3", name: "Tauru", stock: 8 },
            { locationId: "loc4", name: "Chennai", stock: 12 },
        ],
        variants: [],
    },

    {
        _id: "prod_105",
        name: "Wireless Gaming Mouse",
        image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
        sku: "SKU-WGM-001",
        psn: "PSN-WGM-001",
        lid: "LID-SEL-040",
        isActive: true,
        totalStock: 80,
        mrp: 2999,
        price: 2699,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 25 },
            { locationId: "loc2", name: "Delhi", stock: 20 },
            { locationId: "loc3", name: "Tauru", stock: 15 },
            { locationId: "loc4", name: "Chennai", stock: 20 },
        ],
        variants: [],
    },

    {
        _id: "prod_106",
        name: "USB-C Fast Charger 65W",
        image: "https://images.unsplash.com/photo-1580894908361-967195033215?w=500",
        sku: "SKU-CHG-65W",
        psn: "PSN-CHG-001",
        lid: "LID-SEL-050",
        isActive: true,
        totalStock: 150,
        mrp: 1999,
        price: 1799,
        inventory: [
            { locationId: "loc1", name: "Gurgaon", stock: 40 },
            { locationId: "loc2", name: "Delhi", stock: 35 },
            { locationId: "loc3", name: "Tauru", stock: 30 },
            { locationId: "loc4", name: "Chennai", stock: 45 },
        ],
        variants: [],
    },
];

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
                // `/globalProducts/getAllGlobalProducts`,
                // `/products/grouped`,
                // `/myListings/getMyListings?page=1&limit=100&search=${ser}&sortBy=createdAt&sortOrder=desc`,
                `/listings/getMyListings?page=1&limit=100&search=${ser}&sortBy=createdAt&sortOrder=desc`,
            );
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data?.records,
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
                            console.log(id);

                            const res = await __deleteApiData(
                                `/products/bulkDeleteProducts`,
                                {
                                    ids: [id],
                                },
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
                title={"Products"}
                subTitle={"Create and manage products"}
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
                title="Create Product"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateGlobalProducts
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
                top="2%"
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

    // function ProductsCards() {
    //     return (
    //         <View style={{ paddingHorizontal: Sizes.fixPadding }}>
    //             {list?.map((item) => (
    //                 <ListCard
    //                     item={item}
    //                     key={item?._id}
    //                     __handleDeleteProducts={__handleDeleteProducts}
    //                     onDone={() => __handleGetData(search)}
    //                 />
    //             ))}
    //         </View>
    //     );
    // }
    function ProductsCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {list?.map((item) => (
                    <ProductCard
                        key={item?._id}
                        item={item}
                        onDelete={() => __handleDeleteProducts(item?._id)}
                    />
                ))}
            </View>
        );
    }
};

export default GlobalProducts;
const ProductCard = ({ item, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.productContainer}>
            {/* ================= MAIN PRODUCT ROW ================= */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setExpanded(!expanded)}
                style={styles.productRow}
            >
                {/* Left - Image */}
                <Image
                    source={{ uri: item?.listing?.product?.mainImageUrl }}
                    style={styles.productImage}
                />

                {/* Middle - Info */}
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.productName} numberOfLines={1}>
                        {item?.globalProduct?.title}
                    </Text>

                    <Text style={styles.metaText}>
                        SKU: {item?.globalProduct?.slug}
                    </Text>
                    <Text style={styles.metaText}>
                        PSN: {item?.listings[0]?.product?.psn}
                    </Text>
                    <Text style={styles.metaText}>LID: {item?.lid}</Text>

                    {/* Status */}
                    <View
                        style={[
                            styles.statusBadge,
                            !item?.isActive && styles.inactiveBadge,
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                !item?.isActive && styles.inactiveText,
                            ]}
                        >
                            {item?.isActive ? "ACTIVE" : "INACTIVE"}
                        </Text>
                    </View>

                    {/* Stock */}
                    <Text style={styles.stockLabel}>Total Stock</Text>
                    <Text style={styles.stockValue}>
                        {item?.listing?.stock} units
                    </Text>

                    {/* Price */}
                    <Text style={styles.mrpText}>
                        MRP: ₹{item?.listing?.boxMrp} / piece
                    </Text>

                    <View style={styles.priceBadge}>
                        <Text style={styles.priceText}>
                            ₹ {item?.listing?.boxsellingPrice} / piece
                        </Text>
                    </View>
                </View>

                {/* Right - Actions */}
                <View style={styles.actionColumn}>
                    <Feather name="eye" size={18} color="#2563EB" />
                    <Feather name="edit" size={18} color="#10B981" />
                    <Feather name="copy" size={18} color="#8B5CF6" />
                    <TouchableOpacity onPress={onDelete}>
                        <Feather name="trash-2" size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* ================= EXPANDED SECTION ================= */}
            {expanded && (
                <View style={styles.expandedSection}>
                    {/* Inventory */}
                    <Text style={styles.sectionTitle}>
                        Inventory by Location
                    </Text>

                    <View style={styles.inventoryGrid}>
                        {/* {item?.inventory?.map((loc) => ( */}
                        {item?.listing?.inventoryByPickup?.map((loc) => (
                            <View
                                key={loc.pickupPointId}
                                style={styles.inventoryCard}
                            >
                                <Text style={styles.locationName}>
                                    {loc.pickupPointName}
                                </Text>

                                <Text style={styles.locationStock}>
                                    {loc.quantity}
                                </Text>

                                <TouchableOpacity
                                    style={styles.updateBtn}
                                    onPress={() =>
                                        console.log("Update", loc.locationId)
                                    }
                                >
                                    <Text style={styles.updateText}>
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Variants */}
                    {item?.variants?.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Variants</Text>

                            {item?.variants.map((variant) => (
                                <VariantCard
                                    key={variant._id}
                                    variant={variant}
                                />
                            ))}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const VariantCard = ({ variant }) => {
    return (
        <View style={styles.variantContainer}>
            <Image
                source={{ uri: variant.image }}
                style={styles.variantImage}
            />

            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Text style={styles.variantName}>{variant.name}</Text>

                <Text style={styles.metaText}>SKU: {variant.sku}</Text>

                <Text style={styles.stockValue}>{variant.stock} units</Text>

                <Text style={styles.mrpText}>MRP: ₹{variant.mrp}</Text>

                <View style={styles.priceBadgeSmall}>
                    <Text style={styles.priceTextSmall}>₹ {variant.price}</Text>
                </View>
            </View>

            <View style={styles.actionColumn}>
                <Feather name="eye" size={16} color="#2563EB" />
                <Feather name="edit" size={16} color="#10B981" />
                <Feather name="copy" size={16} color="#8B5CF6" />
                <Feather name="trash-2" size={16} color="#EF4444" />
            </View>
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
    //

    productContainer: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
        elevation: 3,
    },

    productRow: {
        flexDirection: "row",
    },

    productImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },

    productName: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: "#111",
    },

    metaText: {
        fontSize: 12,
        color: "#6B7280",
    },

    statusBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginTop: 6,
    },

    inactiveBadge: {
        backgroundColor: "#FEE2E2",
    },

    statusText: {
        fontSize: 10,
        color: "#16A34A",
        fontFamily: Fonts.medium,
    },

    inactiveText: {
        color: "#DC2626",
    },

    stockLabel: {
        marginTop: 6,
        fontSize: 11,
        color: "#6B7280",
    },

    stockValue: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },

    mrpText: {
        fontSize: 11,
        color: "#6B7280",
        marginTop: 4,
    },

    priceBadge: {
        backgroundColor: "#FFF1E6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 4,
    },

    priceText: {
        color: "#EA580C",
        fontSize: 12,
        fontFamily: Fonts.medium,
    },

    actionColumn: {
        justifyContent: "space-between",
        marginLeft: 6,
    },

    expandedSection: {
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 12,
    },

    sectionTitle: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        marginBottom: 10,
    },

    inventoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    inventoryCard: {
        backgroundColor: "#F3F4F6",
        width: "48%",
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },

    locationName: {
        fontSize: 12,
        color: "#6B7280",
    },

    locationStock: {
        fontSize: 18,
        fontFamily: Fonts.medium,
        marginVertical: 4,
    },

    updateBtn: {
        backgroundColor: "#E0EAFF",
        paddingVertical: 4,
        borderRadius: 6,
        alignItems: "center",
    },

    updateText: {
        fontSize: 12,
        color: "#2563EB",
        fontFamily: Fonts.medium,
    },

    variantContainer: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },

    variantImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },

    variantName: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },

    priceBadgeSmall: {
        backgroundColor: "#E0EAFF",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: "flex-start",
        marginTop: 4,
    },

    priceTextSmall: {
        fontSize: 11,
        color: "#2563EB",
        fontFamily: Fonts.medium,
    },
});
