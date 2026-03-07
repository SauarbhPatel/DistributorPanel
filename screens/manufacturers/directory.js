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

const Directory = ({ navigation }) => {
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
                title={"Directory"}
                subTitle={
                    "Single-window control: list, filters, bulk actions, messaging."
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
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        id: "MFR001",
                        name: "Alpha Electronics Pvt Ltd",
                        status: "approved", // Options: approved, under review, on hold
                        category: "Electronics, Mobile",
                        region: "North / Noida",
                        performance: "92%",
                        sla: "SLA 1",
                        compliance: "ok",
                        finance: "ok",
                        manager: "Raj Kumar",
                        last30d: {
                            orders: "1240",
                            revenue: "₹24.5L",
                            returns: "28",
                        },
                    },
                    {
                        id: "MFR002",
                        name: "Beta Fashions India",
                        status: "under review",
                        category: "Apparel, Footwear",
                        region: "South / Bengaluru",
                        performance: "0%",
                        sla: "missing",
                        compliance: "missing",
                        finance: "ok",
                        manager: "—",
                        last30d: {
                            orders: "0",
                            revenue: "₹0.0L",
                            returns: "0",
                        },
                    },
                    {
                        id: "MFR003",
                        name: "Gamma Home Appliances",
                        status: "on hold",
                        category: "Home, Kitchen",
                        region: "West / Mumbai",
                        performance: "78%",
                        sla: "SLA 5",
                        compliance: "expiring",
                        finance: "holds",
                        manager: "Priya S",
                        last30d: {
                            orders: "890",
                            revenue: "₹18.9L",
                            returns: "42",
                        },
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

export default Directory;

const ListCard = ({ item, onEdit }) => {
    return (
        <View style={styles.card}>
            {/* Header: Name/ID & Action */}
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Name / ID</Text>
                    <Text style={styles.nameText}>
                        {item?.name || "Alpha Electronics Pvt Ltd"}
                    </Text>
                    <Text style={styles.idSubtext}>{item?.id || "MFR001"}</Text>
                </View>

                <View style={styles.headerRight}>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: "#E0F8E9" },
                        ]}
                    >
                        <Text style={[styles.statusText, { color: "#10B981" }]}>
                            {item?.status || "approved"}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => onEdit(item)}
                        style={styles.moreBtn}
                    >
                        <Text style={styles.moreText}>•••</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Grid Body */}
            <View style={styles.detailsContainer}>
                {/* Row 1: Category & Region */}
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Category focus</Text>
                        <Text style={styles.detailValue}>
                            {item?.category || "Electronics, Mobile"}
                        </Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Region / City</Text>
                        <Text style={styles.detailValue}>
                            {item?.region || "North / Noida"}
                        </Text>
                    </View>
                </View>

                {/* Row 2: Performance & Compliance */}
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Performance</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.detailValue}>92% </Text>
                            <View style={styles.slaBadge}>
                                <Text style={styles.slaText}>SLA 1</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Compliance</Text>
                        <View style={styles.okBadge}>
                            <Text style={styles.okText}>ok</Text>
                        </View>
                    </View>
                </View>

                {/* Row 3: Finance & Account Manager */}
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Finance</Text>
                        <View style={styles.okBadge}>
                            <Text style={styles.okText}>ok</Text>
                        </View>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Account manager</Text>
                        <Text style={styles.detailValue}>
                            {item?.manager || "Raj Kumar"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Footer: Last 30 Days Stats */}
            <View style={styles.footer}>
                <Text style={styles.footerLabel}>Last 30d</Text>
                <Text style={styles.statsText}>1240 ord • ₹24.5L • 28 ret</Text>
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
        marginVertical: 8,
        borderRadius: 10,
        padding: 15,
        // elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#edf2f7",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    label: {
        fontSize: 11,
        color: "#718096",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    nameText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1a202c",
        marginTop: 2,
    },
    idSubtext: {
        fontSize: 12,
        color: "#a0aec0",
    },
    moreBtn: {
        padding: 5,
    },
    moreText: {
        fontSize: 18,
        color: "#718096",
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 12,
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
        color: "#718096",
        marginBottom: 3,
    },
    detailValue: {
        fontSize: 13,
        color: "#2d3748",
        fontWeight: "500",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },
    slaBadge: {
        backgroundColor: "#EF4444",
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },
    slaText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    okBadge: {
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 1,
        borderRadius: 4,
    },
    okText: {
        color: "#16a34a",
        fontSize: 11,
        fontWeight: "600",
    },
    footer: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerLabel: {
        fontSize: 12,
        color: "#718096",
        fontWeight: "600",
    },
    statsText: {
        fontSize: 13,
        color: "#1a202c",
        fontWeight: "700",
    },
});
