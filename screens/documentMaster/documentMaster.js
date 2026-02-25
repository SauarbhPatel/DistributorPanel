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

const DocumentMaster = ({ navigation }) => {
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
                title={"Document master"}
                subTitle={"Compliance document master"}
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
                title="Add document type"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateDocument
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
                        placeholder="Search Documents..."
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
                    <Text style={styles.addText}>Add Document</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {list?.map((item) => (
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

export default DocumentMaster;

const ListCard = ({ item, onDone, onDelete }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { isShowCreate } = state;

    return (
        <View style={styles.card}>
            {/* Edit Popup */}
            <BottomPopup
                isShow={isShowCreate}
                title="Edit Document"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateDocument
                        isEdit
                        item={item}
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                    />
                }
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item?.name}</Text>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item?.code}</Text>
                    </View>
                </View>

                <View style={styles.authorityBox}>
                    <Text style={styles.authorityText}>
                        {item?.issuingAuthority}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details */}
            <View style={styles.row}>
                <Text style={styles.label}>Jurisdiction</Text>
                <Text style={styles.value}>
                    {item?.jurisdiction?.name || "-"}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Category</Text>
                <Text style={styles.value}>{item?.category?.name || "-"}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Validity Required</Text>
                <Text style={styles.value}>
                    {item?.validityRequired ? "Yes" : "No"}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Expiry Mandatory</Text>
                <Text style={styles.value}>
                    {item?.mandatoryExpiryDate ? "Yes" : "No"}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Renewal Reminder</Text>
                <Text style={styles.value}>
                    {item?.renewalReminderDays
                        ? `${item.renewalReminderDays} Days`
                        : "-"}
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.statusBox}>
                    <View
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    item?.status === "ACTIVE"
                                        ? "#16A34A"
                                        : "#DC2626",
                            },
                        ]}
                    />
                    <Text style={styles.statusText}>{item?.status}</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => updateState({ isShowCreate: true })}
                    >
                        <Feather
                            name="edit-2"
                            size={18}
                            color={Colors.primaryColor}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.iconBtn, styles.deleteBtn]}
                        onPress={() => onDelete(item?._id)}
                    >
                        <Feather name="trash-2" size={18} color="#EF4444" />
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
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    badge: {
        alignSelf: "flex-start",
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 4,
    },
    badgeText: {
        fontSize: 12,
        color: "#4338CA",
        fontWeight: "500",
    },
    authorityBox: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: "center",
    },
    authorityText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 13,
        color: "#6B7280",
    },
    value: {
        fontSize: 13,
        fontWeight: "500",
        color: "#111827",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    statusBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: "#6B7280",
    },
    actions: {
        flexDirection: "row",
        marginLeft: "auto",
    },
    iconBtn: {
        padding: 6,
        marginLeft: 10,
    },
    deleteBtn: {
        backgroundColor: "#FEF2F2",
        borderRadius: 6,
    },
});
