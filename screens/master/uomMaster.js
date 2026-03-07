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
import CreateUoMUnit from "../../components/form/CreateUoMUnit";

const UomMaster = ({ navigation }) => {
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
            <CommonHeader
                title={"UoM Master"}
                subTitle={
                    "Manage units of measure: base and derived, with conversion factors"
                }
                navigation={navigation}
            />
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
                title="Add Unit"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateUoMUnit
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            />
        </SafeAreaView>
    );

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
                    <Text style={styles.addText}>Add Unit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        id: "1",
                        name: "Box",
                        abbreviation: "box",
                        category: "Count",
                        type: "base",
                        baseUnit: "—",
                        conversion: "1",
                        status: "active",
                    },
                    {
                        id: "2",
                        name: "Celsius",
                        abbreviation: "°C",
                        category: "Temperature",
                        type: "base",
                        baseUnit: "—",
                        conversion: "1",
                        status: "active",
                    },
                    {
                        id: "3",
                        name: "Centimetre",
                        abbreviation: "cm",
                        category: "Length",
                        type: "derived",
                        baseUnit: "Metre (m)",
                        conversion: "0.01",
                        status: "active",
                    },
                    {
                        id: "4",
                        name: "Gram",
                        abbreviation: "g",
                        category: "Weight",
                        type: "base",
                        baseUnit: "—",
                        conversion: "1",
                        status: "active",
                    },
                    {
                        id: "5",
                        name: "Kilogram",
                        abbreviation: "kg",
                        category: "Weight",
                        type: "derived",
                        baseUnit: "Gram (g)",
                        conversion: "1000",
                        status: "inactive",
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

export default UomMaster;

const ListCard = ({ item, onEdit }) => {
    return (
        <View style={styles.card}>
            {/* Header: Name & Edit Action */}
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.nameText}>
                        {item?.name || "Centimetre"}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => onEdit(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* Body: UoM Specific Fields */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Abbreviation</Text>
                        <Text style={styles.detailValue}>
                            {item?.abbreviation || "cm"}
                        </Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Category</Text>
                        <Text style={styles.detailValue}>
                            {item?.category || "Length"}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Type</Text>
                        <View
                            style={[
                                styles.typeBadge,
                                {
                                    backgroundColor:
                                        item?.type?.toLowerCase() === "base"
                                            ? "#2563EB" // Blue for base
                                            : "#E5E7EB", // Grey for derived
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.typeText,
                                    {
                                        color:
                                            item?.type?.toLowerCase() === "base"
                                                ? "#FFFFFF"
                                                : "#4B5563",
                                    },
                                ]}
                            >
                                {item?.type || "derived"}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Base Unit</Text>
                        <Text style={styles.detailValue}>
                            {item?.baseUnit || "Metre (m)"}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Conversion</Text>
                        <Text style={styles.detailValue}>
                            {item?.conversion || "0.01"}
                        </Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor:
                                        item?.status?.toLowerCase() ===
                                        "inactive"
                                            ? "#FEE2E2"
                                            : "#DCFCE7",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    {
                                        color:
                                            item?.status?.toLowerCase() ===
                                            "inactive"
                                                ? "#EF4444"
                                                : "#16A34A",
                                    },
                                ]}
                            >
                                {item?.status || "active"}
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
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        // Elevation for Android
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        paddingBottom: 12,
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: "#6B7280", // Text-gray-500
        marginBottom: 2,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827", // Text-gray-900
    },
    actionBtn: {
        backgroundColor: "#EFF6FF", // Light blue background
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    editText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2563EB", // Brand blue
    },
    detailsContainer: {
        gap: 12, // Modern React Native gap property
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoColumn: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 11,
        color: "#9CA3AF", // Text-gray-400
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        color: "#374151", // Text-gray-700
        fontWeight: "500",
    },
    // Pill/Badge Styles
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    typeText: {
        fontSize: 11,
        fontWeight: "700",
        textTransform: "lowercase",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "600",
        textTransform: "lowercase",
    },
});
