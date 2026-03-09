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
    Image,
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
import CreateUoMUnit from "../../components/form/CreateUoMUnit";
import DashboardCards from "../../components/ordershub/DashboardCards";

const AbandonedOrders = ({ navigation }) => {
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
            <CommonHeader title={"Abandoned Orders"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {/* {statsCards()} */}
                <DashboardCards />
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
                        id: "ABN-2024-001",
                        buyer: "Raj Kumar",
                        session: "sess_abc123",
                        travel: "Contact entered",
                        lastActivity: "07 Mar 2026, 09:28 am",
                        cartValue: 12499,
                        items: 3,
                        email: "raj.kumar@gmail.cc",
                        phone: "+91 9876543210",
                        attempts: 0,
                        status: "New Abandoned",
                    },
                    {
                        id: "ABN-2024-002",
                        buyer: "Guest User",
                        session: "sess_guest_xyz",
                        travel: "Payment failed",
                        lastActivity: "07 Mar 2026, 08:13 am",
                        cartValue: 4599,
                        items: 1,
                        email: "guest@example.cc",
                        phone: "+91 9876543210",
                        attempts: 2,
                        status: "Assigned to Team",
                    },
                    {
                        id: "ABN-2024-003",
                        buyer: "Priya Sharma",
                        session: "sess_def456",
                        travel: "Address entered",
                        lastActivity: "06 Mar 2026, 10:13 am",
                        cartValue: 28900,
                        items: 5,
                        email: "priya.s@outlook.cc",
                        phone: "+91 9123456789",
                        attempts: 1,
                        status: "New Abandoned",
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

export default AbandonedOrders;

const ListCard = ({ item, onEdit }) => {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.id}>{item.id}</Text>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            {/* Buyer */}
            <View style={styles.row}>
                <Feather name="user" size={16} color="#666" />
                <Text style={styles.value}>{item.buyer}</Text>
                <Text style={styles.session}>{item.session}</Text>
            </View>

            {/* Travel */}
            <View style={styles.row}>
                <Text style={styles.label}>Travel:</Text>
                <Text style={styles.badge}>{item.travel}</Text>
            </View>

            {/* Activity */}
            <View style={styles.row}>
                <Text style={styles.label}>Last Activity:</Text>
                <Text style={styles.value}>{item.lastActivity}</Text>
            </View>

            {/* Cart */}
            <View style={styles.cartRow}>
                <Text style={styles.price}>₹{item.cartValue}</Text>
                <Text style={styles.items}>{item.items} items</Text>
            </View>

            {/* Contact */}
            <View style={styles.contact}>
                <Text style={styles.contactText}>{item.email}</Text>
                <Text style={styles.contactText}>{item.phone}</Text>
            </View>

            {/* Attempts */}
            <View style={styles.row}>
                <Text style={styles.label}>Attempts:</Text>
                <Text style={styles.value}>{item.attempts}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.viewBtn}>
                    <Feather name="eye" size={16} color="#444" />
                    <Text style={styles.viewText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.recoverBtn}>
                    <Feather name="rotate-ccw" size={16} color="#fff" />
                    <Text style={styles.recoverText}>Recover</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    id: {
        fontWeight: "600",
        fontSize: 14,
        color: "#1D4ED8",
    },

    statusBadge: {
        backgroundColor: "#FFF3CD",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    statusText: {
        fontSize: 11,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    label: {
        fontSize: 12,
        color: "#888",
        marginRight: 5,
    },

    value: {
        fontSize: 13,
        marginRight: 8,
    },

    session: {
        fontSize: 11,
        color: "#999",
    },

    badge: {
        backgroundColor: "#E6F7FF",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        fontSize: 11,
    },

    cartRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
    },

    price: {
        fontSize: 18,
        fontWeight: "bold",
    },

    items: {
        fontSize: 13,
        color: "#666",
    },

    contact: {
        marginBottom: 8,
    },

    contactText: {
        fontSize: 12,
        color: "#444",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    viewBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        borderRadius: 6,
        flex: 1,
        justifyContent: "center",
        marginRight: 5,
    },

    viewText: {
        marginLeft: 5,
    },

    recoverBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2563EB",
        padding: 8,
        borderRadius: 6,
        flex: 1,
        justifyContent: "center",
        marginLeft: 5,
    },

    recoverText: {
        color: "#fff",
        marginLeft: 5,
    },
});
