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
import CreateCategoryConditions from "../../components/form/CreateCategoryConditions";

const CategoryConditions = ({ navigation }) => {
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
        __handleGetData(search);
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
                title={"Category Conditions"}
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
                title="Add Rule"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateCategoryConditions
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
                    <Text style={styles.addText}>Add Rule</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        _id: "2",
                        ruleName: "Battery Compliance",
                        category: { name: "Mobile Accessories" },
                        document: { name: "Battery Safety Report" },
                        applicableTo: "Seller",
                    },
                    {
                        _id: "3",
                        ruleName: "Import License Check",
                        category: { name: "Home Appliances" },
                        document: { name: "Import License" },
                        applicableTo: "Buyer",
                    },
                    {
                        _id: "4",
                        ruleName: "Trademark Verification",
                        category: { name: "Fashion" },
                        document: { name: "Trademark Certificate" },
                        applicableTo: "Seller",
                    },
                    {
                        _id: "5",
                        ruleName: "Food Safety Rule",
                        category: { name: "Grocery" },
                        document: { name: "FSSAI Certificate" },
                        applicableTo: "Seller",
                    },
                    {
                        _id: "6",
                        ruleName: "Medical Product Approval",
                        category: { name: "Healthcare" },
                        document: { name: "FDA Approval" },
                        applicableTo: "Buyer",
                    },
                ]?.map((item) => (
                    <ListCard
                        item={item}
                        key={item?._id}
                        onDelete={__handleDelete}
                        onDone={() => __handleGetData(search)}
                    />
                ))}
            </View>
        );
    }
};

export default CategoryConditions;

const ListCard = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            {/* Row Content */}
            <View style={styles.rowContainer}>
                {/* Left Content */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.ruleName}>{item?.ruleName || "-"}</Text>

                    <Text style={styles.metaText}>
                        {item?.category?.name || "-"}
                    </Text>

                    <Text style={styles.metaText}>
                        {item?.document?.name || "-"}
                    </Text>

                    <Text style={styles.applicableText}>
                        Apply on: {item?.applicableTo || "-"}
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => onEdit(item)}
                        style={styles.actionBtn}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onDelete(item?._id)}
                        style={styles.actionBtn}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
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

    /* ================= Attribute Set Card ================= */
    card: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    ruleName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 4,
    },

    metaText: {
        fontSize: 13,
        color: "#4B5563",
        marginBottom: 2,
    },

    applicableText: {
        fontSize: 13,
        color: "#1F2937",
        marginTop: 4,
        fontWeight: "500",
    },

    actionContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
    },

    actionBtn: {
        paddingVertical: 4,
    },

    editText: {
        fontSize: 14,
        color: "#2563EB",
        fontWeight: "500",
        marginBottom: 6,
    },

    deleteText: {
        fontSize: 14,
        color: "#DC2626",
        fontWeight: "500",
    },
});
