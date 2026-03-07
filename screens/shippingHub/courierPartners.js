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
import CreateCourierPartners from "../../components/form/CreateCourierPartners";

const CourierPartners = ({ navigation }) => {
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
            <CommonHeader title={"Courier Partners"} navigation={navigation} />
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
                title="Add Courier Partners"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateCourierPartners
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
                    <Text style={styles.addText}>Add Partners</Text>
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

export default CourierPartners;

const ListCard = ({ item, onEdit }) => {
    return (
        <View style={styles.card}>
            {/* Header: Name & Edit Action */}
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.nameText}>{item?.name || "vbn"}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => onEdit(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* Body: Responsive Grid for Table Fields */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Code</Text>
                        <Text style={styles.detailValue}>
                            {item?.code || "nfghjm"}
                        </Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Service modes</Text>
                        <Text
                            style={[styles.detailValue, { color: "#9ca3af" }]}
                        >
                            {item?.serviceModes || "Economy"}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>COD</Text>
                        <Text style={styles.detailValue}>
                            {item?.cod || "No"}
                        </Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Insurance</Text>
                        <Text style={styles.detailValue}>
                            {item?.insurance || "No"}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>API</Text>
                        <Text style={styles.detailValue}>—</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Status</Text>
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
        backgroundColor: Colors.whiteColor,
        // marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
        padding: 15,
        // elevation: 3, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#f3f4f6",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    label: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 2,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
    },
    editText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    detailsContainer: {
        gap: 12,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoColumn: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "500",
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },
    actionBtn: {
        paddingVertical: 4,
        paddingLeft: 10,
    },
});
