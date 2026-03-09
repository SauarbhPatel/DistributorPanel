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

const OrdersManagement = ({ navigation }) => {
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
            <CommonHeader title={"Orders Management"} navigation={navigation} />
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
                        id: "ORD-2024-002505",
                        productName: "Smart Band",
                        sku: "SKU-WT-03",
                        seller: "GadgetHub",
                        date: "17 Feb 2024, 06:00 pm",
                        buyer: "Suresh Pillai",
                        address:
                            "11, Statue Road, Thiruvananthapuram, Kerala 695001",
                        phone: "+91 56789 01234",
                        email: "suresh.p@email.com",
                        total: 2657,
                        status: "New Order",
                        payment: "Prepaid",
                        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
                    },
                    {
                        id: "ORD-2024-002504",
                        productName: "Women Casual Top",
                        sku: "SKU-TS-203",
                        seller: "FashionStore",
                        date: "17 Feb 2024, 04:35 pm",
                        buyer: "Neha Gupta",
                        address: "22, C Scheme, Jaipur, Rajasthan 302001",
                        phone: "+91 67890 12345",
                        email: "neha.g@email.com",
                        total: 2306,
                        status: "New Order",
                        payment: "Pending",
                        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
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

export default OrdersManagement;

const ListCard = ({ item, onEdit }) => {
    return (
        <View style={styles.card}>
            {/* Product Info */}
            <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={{ flex: 1 }}>
                    <Text style={styles.product}>{item.productName}</Text>
                    <Text style={styles.meta}>SKU: {item.sku}</Text>
                    <Text style={styles.meta}>Seller: {item.seller}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>

            {/* Order ID */}
            <View style={styles.section}>
                <Text style={styles.label}>Order ID</Text>
                <Text style={styles.value}>{item.id}</Text>
            </View>

            {/* Buyer */}
            <View style={styles.section}>
                <Text style={styles.label}>Buyer</Text>
                <Text style={styles.value}>{item.buyer}</Text>
                <Text style={styles.meta}>{item.address}</Text>
                <Text style={styles.meta}>{item.phone}</Text>
            </View>

            {/* Price & Status */}
            <View style={styles.rowBetween}>
                <Text style={styles.total}>₹{item.total}</Text>

                <View style={styles.statusBox}>
                    <Text style={styles.status}>{item.status}</Text>
                </View>

                <View
                    style={[
                        styles.paymentBox,
                        {
                            backgroundColor:
                                item.payment === "Prepaid"
                                    ? "#DFF5E1"
                                    : "#FFE7CC",
                        },
                    ]}
                >
                    <Text style={styles.payment}>{item.payment}</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        {
                            backgroundColor: "#E6F7E6",
                            borderColor: "green",
                            borderWidth: 1,
                        },
                    ]}
                >
                    <Text style={styles.green}>Mark Verified</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.btn,
                        {
                            backgroundColor: "#FFF4E5",
                            borderColor: "#D97706",
                            borderWidth: 1,
                        },
                    ]}
                >
                    <Text style={styles.orange}>Mark Unverified</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Text>Update Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btnOutline, { borderColor: "red" }]}
                >
                    <Text style={{ color: "red" }}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },

    row: {
        flexDirection: "row",
        marginBottom: 10,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 10,
    },

    product: {
        fontSize: 16,
        fontWeight: "600",
    },

    meta: {
        fontSize: 12,
        color: "#666",
    },

    date: {
        fontSize: 11,
        color: "#999",
    },

    section: {
        marginBottom: 8,
    },

    label: {
        fontSize: 12,
        color: "#888",
    },

    value: {
        fontSize: 14,
        fontWeight: "500",
    },

    total: {
        fontSize: 18,
        fontWeight: "bold",
    },

    statusBox: {
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    status: {
        fontSize: 12,
    },

    paymentBox: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    payment: {
        fontSize: 12,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    btn: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        marginHorizontal: 4,
        alignItems: "center",
    },

    btnOutline: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 4,
        alignItems: "center",
    },

    green: {
        color: "green",
    },

    orange: {
        color: "#D97706",
    },
});
