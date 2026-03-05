import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";
import CreateGlobalProducts from "../../components/form/CreateGlobalProducts";

const SAMPLE_PRODUCTS = [
    {
        id: "1",
        productName: "Samsung 55 Inch 4K Smart TV",
        productImage:
            "https://images.unsplash.com/photo-1593784991095-a205069470b6",
        sku: "SAM-55-4K",
        price: 54999,
        mrp: 59999,
        stock: 25,
        status: "Active",
        inventoryUpdate: true,

        variants: [
            {
                id: "1-1",
                variantName: "55 Inch / Black",
                sku: "SAM-55-BLK",
                price: 54999,
                mrp: 59999,
                stock: 25,
                status: "Active",
                productImage:
                    "https://images.unsplash.com/photo-1593784991095-a205069470b6",
            },
            {
                id: "1-2",
                variantName: "65 Inch / Black",
                sku: "SAM-65-BLK",
                price: 74999,
                mrp: 79999,
                stock: 12,
                status: "Active",
                productImage:
                    "https://images.unsplash.com/photo-1593784991095-a205069470b6",
            },
        ],
    },

    {
        id: "2",
        productName: "Nike Running Shoes",
        productImage:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        sku: "NIKE-RUN",
        price: 3999,
        mrp: 4999,
        stock: 40,
        status: "Active",
        inventoryUpdate: true,

        variants: [
            {
                id: "2-1",
                variantName: "Size 8 / White",
                sku: "NIKE-8-WHT",
                price: 3999,
                mrp: 4999,
                stock: 20,
                status: "Active",
            },
            {
                id: "2-2",
                variantName: "Size 9 / Black",
                sku: "NIKE-9-BLK",
                price: 3999,
                mrp: 4999,
                stock: 20,
                status: "Inactive",
            },
        ],
    },

    {
        id: "3",
        productName: "Redmi Note 13 Pro",
        productImage:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        sku: "REDMI-N13P",
        price: 23999,
        mrp: 25999,
        stock: 100,
        status: "Inactive",
        inventoryUpdate: true,

        variants: [], // simple product
    },

    {
        id: "4",
        productName: "Wooden Office Chair",
        productImage:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        sku: "UW-CHAIR-01",
        price: 5999,
        mrp: 7999,
        stock: 15,
        status: "Active",
        inventoryUpdate: true,

        variants: [],
    },
];

const MyListings = ({ navigation, route }) => {
    const [search, setSearch] = useState("");

    const [state, setState] = useState({
        loading: false,
        list: SAMPLE_PRODUCTS,
        isShowCreate: false,
        activeTab: "ACTIVE",
        listingStatus: "ALL",
        fulfilledBy: "ALL",
        locationFilter: "ALL",
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        loading,
        list,
        isShowCreate,
        activeTab,
        listingStatus,
        fulfilledBy,
        locationFilter,
    } = state;

    const handleDelete = (id) => {
        Alert.alert("Delete Product", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    updateState({
                        list: list.filter((item) => item._id !== id),
                    });
                },
            },
        ]);
    };

    console.log("fngh", route?.params);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={route?.params?.name || "My Listings"}
                navigation={navigation}
            />

            <Loader isShow={loading} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {statusTabs()}
                {filterRow()}
                {statsCards()}
                {searchAndAdd()}
                {productList()}
            </ScrollView>

            <BottomPopup
                isShow={isShowCreate}
                title="Create Product"
                onClose={() => updateState({ isShowCreate: false })}
                component={<CreateGlobalProducts />}
                top="2%"
            />
        </SafeAreaView>
    );

    /* ================= STATUS TABS ================= */

    function statusTabs() {
        const tabs = [
            { key: "ACTIVE", label: "Active" },
            { key: "INACTIVE", label: "Inactive" },
            { key: "BLOCKED", label: "Blocked" },
            { key: "ARCHIVED", label: "Archived" },
        ];

        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: Sizes.fixPadding }}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => updateState({ activeTab: tab.key })}
                        style={[
                            styles.tabBtn,
                            activeTab === tab.key && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.key && styles.activeTabText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }

    /* ================= FILTER ROW ================= */

    function filterRow() {
        return (
            <View style={styles.filterRow}>
                <FilterBox label="Listing Status" value={listingStatus} />
                <FilterBox label="Fulfilled By" value={fulfilledBy} />
                <FilterBox label="Location" value={locationFilter} />
            </View>
        );
    }

    /* ================= STATS ================= */

    function statsCards() {
        return (
            <View style={styles.statsRow}>
                <StatCard title="Total" value={list.length} />
                <StatCard
                    title="Active"
                    value={list.filter((i) => i.isActive).length}
                />
                <StatCard
                    title="Inactive"
                    value={list.filter((i) => !i.isActive).length}
                />
            </View>
        );
    }

    /* ================= SEARCH ================= */

    function searchAndAdd() {
        return (
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={18} />
                    <TextInput
                        placeholder="Search Products..."
                        style={{ flex: 1, marginLeft: 8 }}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
        );
    }

    /* ================= PRODUCT LIST ================= */

    function productList() {
        return (
            <View style={{ padding: Sizes.fixPadding }}>
                {SAMPLE_PRODUCTS.map((item) => (
                    <ProductCard
                        key={item._id}
                        item={item}
                        onDelete={() => handleDelete(item._id)}
                    />
                ))}
            </View>
        );
    }
};

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ item, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.row}
                onPress={() => setExpanded(!expanded)}
            >
                <Image
                    source={{ uri: item.productImage }}
                    style={styles.image}
                />

                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.name}>{item.productName}</Text>
                    <Text style={styles.meta}>SKU: {item.sku}</Text>
                    <Text style={styles.meta}>PSN: {item.psn}</Text>
                    <Text style={styles.meta}>LID: {item.lid}</Text>

                    <View
                        style={[
                            styles.badge,
                            !item.isActive && styles.badgeInactive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.badgeText,
                                !item.isActive && styles.badgeInactiveText,
                            ]}
                        >
                            {item.isActive ? "ACTIVE" : "INACTIVE"}
                        </Text>
                    </View>

                    <Text style={styles.price}>₹ {item.price}</Text>
                </View>

                <View style={styles.actions}>
                    <Feather name="eye" size={18} />
                    <Feather name="edit" size={18} />
                    <TouchableOpacity onPress={onDelete}>
                        <Feather name="trash-2" size={18} color="red" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.expand}>
                    {item.variants?.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Variants</Text>
                            {item.variants.map((v) => (
                                <View key={v._id} style={styles.variantRow}>
                                    <Image
                                        source={{
                                            uri: v.productImage,
                                        }}
                                        style={styles.variantImg}
                                    />
                                    <View style={{ flex: 1, paddingStart: 10 }}>
                                        <Text>{v.variantName}</Text>
                                        <Text>₹ {v.price}</Text>
                                    </View>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

/* ================= SMALL COMPONENTS ================= */

const FilterBox = ({ label, value }) => (
    <View style={styles.filterBox}>
        <Text style={styles.filterLabel}>{label}</Text>
        <Text style={styles.filterValue}>{value}</Text>
    </View>
);

const StatCard = ({ title, value }) => (
    <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.statCard}>
        <Text style={{ color: "#fff" }}>{title}</Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>{value}</Text>
    </LinearGradient>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    tabBtn: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    activeTab: { backgroundColor: "#DCFCE7" },
    tabText: { fontSize: 13 },
    activeTabText: { color: "#16A34A" },

    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.fixPadding,
    },
    filterBox: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        width: "31%",
    },
    filterLabel: { fontSize: 10, color: "#6B7280" },
    filterValue: { fontSize: 12, fontWeight: "600" },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: Sizes.fixPadding,
    },
    statCard: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 12,
        padding: 12,
    },

    searchRow: {
        flexDirection: "row",
        padding: Sizes.fixPadding,
        alignItems: "center",
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        height: 45,
        borderRadius: 10,
        marginRight: 10,
    },
    addBtn: {
        flexDirection: "row",
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 14,
        height: 45,
        borderRadius: 10,
        alignItems: "center",
    },
    addText: { color: "#fff", marginLeft: 6 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
    },
    row: { flexDirection: "row" },
    image: { width: 70, height: 70, borderRadius: 12 },
    name: { fontSize: 16, fontWeight: "600" },
    meta: { fontSize: 12, color: "#6B7280" },
    badge: {
        backgroundColor: "#DCFCE7",
        padding: 4,
        borderRadius: 20,
        marginTop: 6,
        alignSelf: "flex-start",
    },
    badgeInactive: { backgroundColor: "#FEE2E2" },
    badgeText: { fontSize: 10, color: "#16A34A" },
    badgeInactiveText: { color: "#DC2626" },
    price: { marginTop: 6, fontWeight: "bold" },

    actions: { justifyContent: "space-between" },
    expand: { marginTop: 12 },
    sectionTitle: { fontWeight: "600", marginBottom: 8 },

    inventoryWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    inventoryCard: {
        backgroundColor: "#F3F4F6",
        width: "48%",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    variantRow: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    variantImg: { width: 50, height: 50, borderRadius: 8 },
});

export default MyListings;
