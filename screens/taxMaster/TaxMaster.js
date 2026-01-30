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
import CreateTaxType from "../../components/form/CreateTaxType";
import { Loader } from "../../modules";
import CreateTax from "../../components/form/CreateTax";

const TaxMaster = ({ navigation }) => {
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

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading: true });
            const res = await __getApiData(`/taxes/getAllTax`);
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading: false });
        }
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Tax Master",
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
                                `/taxes/deleteTaxById/${id}`,
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
                title={"Tax Masters"}
                subTitle={"Manage Tax Masters."}
                navigation={navigation}
            />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {statsCards()}
                {searchAndAdd()}
                {attributeCards()}
            </ScrollView>
            <BottomPopup
                isShow={isShowCreate}
                title="Add Tax Master"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateTax
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
                        placeholder="Search Tax Masters..."
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
                    <Text style={styles.addText}>Add Tax</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {list
                    ?.filter(
                        (item) =>
                            item?.name
                                ?.toLowerCase()
                                .includes(search.toLowerCase()) ||
                            item?.code
                                ?.toLowerCase()
                                .includes(search.toLowerCase()),
                    )
                    ?.map((item) => (
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

export default TaxMaster;

const ListCard = ({ item, onDone, onDelete }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate } = state;
    return (
        <View style={styles.card}>
            {/* Header */}
            <BottomPopup
                isShow={isShowCreate}
                title="Edit Tax Master"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateTax
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                    />
                }
            />
            <View style={styles.header}>
                <View>
                    <Text style={styles.taxName}>{item?.name}</Text>
                    <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>
                            {item?.taxTypeId?.name}
                        </Text>
                    </View>
                </View>

                <View style={styles.rateBox}>
                    <Text style={styles.rate}>{item?.rate}%</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details */}
            <View style={styles.row}>
                <Text style={styles.label}>Country</Text>
                <Text style={styles.value}>{item?.countryId?.name}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Ledger</Text>
                <Text style={styles.value} numberOfLines={1}>
                    {item?.ledgerId?.name}
                </Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => {
                        updateState({ isShowCreate: true });
                    }}
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
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    taxName: {
        ...Fonts.blackColor15Bold,
        marginBottom: 6,
    },

    typeBadge: {
        backgroundColor: "#E0ECFF",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    typeText: {
        fontSize: 12,
        color: "#2563EB",
        fontWeight: "600",
    },

    rateBox: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
    },

    rate: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.blackColor,
    },

    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    label: {
        fontSize: 12,
        color: "#6B7280",
    },

    value: {
        fontSize: 13,
        color: Colors.blackColor,
        fontWeight: "500",
        maxWidth: "65%",
        textAlign: "right",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        gap: 12,
    },

    iconBtn: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#F9FAFB",
    },

    deleteBtn: {
        backgroundColor: "#FEF2F2",
    },
});
