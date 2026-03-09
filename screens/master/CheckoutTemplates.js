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
import CreateCheckoutTemplates from "../../components/form/CreateCheckoutTemplates";

const CheckoutTemplates = ({ navigation }) => {
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
                title={"Checkout Templates"}
                subTitle={
                    "Create and manage checkout templates; assign them to payment methods."
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
                title="Add Template"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateCheckoutTemplates
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
                    <Text style={styles.addText}>Add Template</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        code: "BANK",
                        methodName: "Bank Transfer",
                        description: "Direct bank transfer / NEFT / IMPS",
                        templateFile: "default-checkout.html",
                        status: "active",
                    },
                    {
                        code: "CASH",
                        methodName: "Cash",
                        description: "Cash payment",
                        templateFile: "default-checkout.html",
                        status: "active",
                    },
                    {
                        code: "CC",
                        methodName: "Credit Card",
                        description: "Credit card payment",
                        templateFile: "default-checkout.html",
                        status: "active",
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

export default CheckoutTemplates;

const ListCard = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            {/* Header: Method Name and Actions */}
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.nameText}>{item?.methodName}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => onEdit(item)}
                        style={styles.actionBtn}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onDelete(item)}
                        style={styles.deleteBtn}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body: Matching Table Columns */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Code</Text>
                        <Text style={styles.detailValue}>{item?.code}</Text>
                    </View>

                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Template file</Text>
                        <Text style={styles.detailValue}>
                            {item?.templateFile}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.detailLabel}>Description</Text>
                        <Text style={styles.detailValue}>
                            {item?.description}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor:
                                        item?.status === "active"
                                            ? "#DCFCE7"
                                            : "#FEE2E2",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    {
                                        color:
                                            item?.status === "active"
                                                ? "#16A34A"
                                                : "#EF4444",
                                    },
                                ]}
                            >
                                {item?.status}
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
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    label: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
    },

    nameText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

    actionBtn: {
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
    },

    editText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "500",
    },

    deleteBtn: {
        backgroundColor: "#FEE2E2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },

    deleteText: {
        color: "#DC2626",
        fontSize: 13,
        fontWeight: "500",
    },

    detailsContainer: {
        marginTop: 4,
    },

    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    infoColumn: {
        flex: 1,
    },

    detailLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 3,
    },

    detailValue: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "500",
    },

    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "capitalize",
    },
});
