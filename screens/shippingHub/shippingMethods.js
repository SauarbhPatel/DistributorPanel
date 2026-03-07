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
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import CreateDocument from "../../components/form/CreateDocument";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import CreateShippingZones from "../../components/form/CreateShippingZones";
import CreateShippingMethods from "../../components/form/CreateShippingMethods";

const ShippingMethods = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        list: [],
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isShowCreate,
        loading,
        list,
        totalAttributes,
        filterableAttributes,
        variantAttributes,
    } = state;

    const __handleGetData = async (ser = "") => {
        try {
            updateState({ loading: ser == "" ? true : false });
            // const res = await __getApiData(`/taxes/getAllTax`);
            const res = await __getApiData(
                `/complianceDocument/getAllComplianceDocument?page=1&limit=100&search=${ser}&sortBy=name&sortOrder=desc`,
            );
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data?.records,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading: false });
        }
    };

    useEffect(() => {
        // __handleGetData(search);
    }, [search]);

    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Document",
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
                                `/complianceDocument/deleteComplianceDocumentById/${id}`,
                            );
                            if (res?.success) {
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
            <CommonHeader title={"Shipping Methods"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {/* {statsCards()} */}
                {searchAndAdd()}
                {attributeCards()}
            </ScrollView>
            <BottomPopup
                isShow={isShowCreate}
                title="Add Shipping Methods"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateShippingMethods
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
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
                                title="Total Tax Rates"
                                value={6}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="percent"
                            />

                            <StatCard
                                title="GST Rates (India)"
                                value={4}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="percent"
                            />
                            <StatCard
                                title="VAT Rates"
                                value={2}
                                colors={["#10B981", "#059669"]}
                                icon="percent"
                            />

                            <StatCard
                                title="Countries Covered"
                                value={3}
                                colors={["#F97316", "#EA580C"]}
                                icon="globe"
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
                        placeholder="Search..."
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
                    <Text style={styles.addText}>Add Method</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        name: "Standard Ground",
                        courier: "FedEx",
                        mode: "Surface",
                        weightKg: "0 - 15",
                        chargeModel: "Flat Rate",
                        categories: ["All"],
                        status: "Active",
                    },
                    {
                        name: "Express Overnight",
                        courier: "DHL",
                        mode: "Air",
                        weightKg: "0 - 5",
                        chargeModel: "Per kg",
                        categories: ["Electronics", "Documents"],
                        status: "Active",
                    },
                    {
                        name: "Heavy Freight",
                        courier: "UPS",
                        mode: "Surface",
                        weightKg: "> 50",
                        chargeModel: "Zone-based",
                        categories: ["Furniture", "Appliances"],
                        status: "Active",
                    },
                    {
                        name: "Local Same Day",
                        courier: "Delhivery",
                        mode: "Surface",
                        weightKg: "Up to 2",
                        chargeModel: "Flat Rate",
                        categories: ["Groceries", "Perishables"],
                        status: "Active",
                    },
                    {
                        name: "International Economy",
                        courier: "FedEx",
                        mode: "Sea",
                        weightKg: "10 - 100",
                        chargeModel: "Tiered",
                        categories: ["All"],
                        status: "Inactive",
                    },
                    {
                        name: "Apparel Free Ship",
                        courier: "Blue Dart",
                        mode: "Air",
                        weightKg: "Up to 1",
                        chargeModel: "Free",
                        categories: ["Apparel", "Beauty"],
                        status: "Active",
                    },
                    {
                        name: "Fragile Special Care",
                        courier: "Bluedart",
                        mode: "Air",
                        weightKg: "0 - 10",
                        chargeModel: "Per kg + Surcharge",
                        categories: ["Glassware", "Art"],
                        status: "Active",
                    },
                    {
                        name: "Bulk B2B Surface",
                        courier: "Safexpress",
                        mode: "Surface",
                        weightKg: "> 100",
                        chargeModel: "Per kg",
                        categories: ["Industrial", "Wholesale"],
                        status: "Active",
                    },
                ]?.map((item) => (
                    <ListCard
                        item={item}
                        key={item?.name}
                        onDelete={__handleDelete}
                        onDone={() => __handleGetData(search)}
                    />
                ))}
            </View>
        );
    }
};

export default ShippingMethods;

const ListCard = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            {/* Header: Name & Status */}
            <View style={styles.cardHeader}>
                <Text style={styles.nameText}>{item?.name || "mjj"}</Text>

                {/* Status Badge */}
                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor:
                                item?.status === "INACTIVE"
                                    ? "#FEE2E2"
                                    : "#E0F8E9",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            {
                                color:
                                    item?.status === "INACTIVE"
                                        ? "#EF4444"
                                        : "#10B981",
                            },
                        ]}
                    >
                        {item?.status || "ACTIVE"}
                    </Text>
                </View>
            </View>

            {/* Body: Location & Pincode Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Courier:</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                        {item?.courier || ""}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Mode:</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                        {item?.mode || ""}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Weight (kg):</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                        {item?.weightKg || ""}KG
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Charge Model:</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                        {item?.chargeModel || ""}KG
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Categories:</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                        {item?.categories.join(", ") || ""}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Footer: Methods & Actions */}
            <View style={styles.cardFooter}>
                <Text style={{ fontWeight: "600", color: "#111827" }}></Text>

                <View style={styles.actionContainer}>
                    {/* Add onDelete back here if you still need it, the image only showed Edit */}
                    <TouchableOpacity
                        onPress={() => onEdit(item)}
                        style={styles.actionBtn}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>
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

    /* ================= List Card Styles ================= */
    card: {
        backgroundColor: Colors.whiteColor || "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    nameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        textTransform: "capitalize",
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    detailsContainer: {
        marginBottom: 12,
    },

    detailRow: {
        flexDirection: "row",
        marginBottom: 6,
        alignItems: "center",
    },

    detailLabel: {
        width: 110, // Fixed width to align values perfectly
        fontSize: 13,
        color: "#6B7280",
        fontWeight: "500",
    },

    detailValue: {
        flex: 1,
        fontSize: 14,
        color: "#374151",
        fontWeight: "500",
        textTransform: "capitalize",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginBottom: 12,
    },

    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    methodsText: {
        fontSize: 14,
        color: "#6B7280",
    },

    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    actionBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },

    editText: {
        fontSize: 15,
        color: "#000000", // Matches the dark 'Edit' text in your image
        fontWeight: "600",
    },
});
