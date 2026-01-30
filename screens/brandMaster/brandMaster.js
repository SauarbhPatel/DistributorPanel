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
import { __deleteApiData, __getApiData } from "../../utils/api";
import CreateProductAttribute from "../../components/form/CreateProductAttribute";
import BottomPopup from "../../components/common/BottomPopup";
import CreateBrand from "../../components/form/CreateBrand";

const ATTRIBUTE_SET_LIST = [
    {
        _id: "set_1",
        name: "Basic T-Shirt Attributes",
        description: "Essential attributes for T-shirts",
        attributes: [
            "Color",
            "Size",
            "Material",
            "Neck Type",
            "Fit",
            "Pattern",
        ],
        status: "Active",
    },
    {
        _id: "set_2",
        name: "Fashion Apparel Complete",
        description: "Complete attribute set for fashion items",
        attributes: [
            "Color",
            "Size",
            "Material",
            "Sleeve Length",
            "Neck Type",
            "Fit",
            "Pattern",
            "Occasion",
            "Wash Care",
            "Brand",
        ],
        status: "Active",
    },
    {
        _id: "set_3",
        name: "Electronics Basic Specs",
        description: "Core specifications for electronics",
        attributes: [
            "Brand",
            "Model",
            "Color",
            "Warranty",
            "Power Consumption",
        ],
        status: "Inactive",
    },
];

const BrandMaster = ({ navigation }) => {
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
            const res = await __getApiData(`/brands/getAllBrand`);
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
            updateState({ loading: false });
        } finally {
            updateState({ loading: false });
        }
    };

    useEffect(() => {
        __handleGetData(search);
    }, [search]);

    const __handleDeleteAttribute = (id) => {
        Alert.alert(
            "Delete Attribute",
            "Are you sure you want to delete this attribute?",
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

                            const res = await __deleteApiData(
                                `/productAttributes/deleteAttributeById/${id}`,
                            );
                            if (res?.success) {
                                // refresh list after delete
                                __handleGetData(search);
                            } else {
                                Alert.alert("Error", res?.message);
                            }
                        } catch (error) {
                            Alert.alert("Error", "Something went wrong");
                            updateState({ loading: false });
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
                title={"Brands Master"}
                subTitle="Manage brand information and distribution"
                navigation={navigation}
            />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {statsCards()}
                {searchAndAdd()}
                {attributeCards()}
            </ScrollView>
            <BottomPopup
                isShow={isShowCreate}
                title="Add New Brand"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateBrand
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
                                title="Total Brands"
                                value={totalAttributes}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="briefcase"
                            />
                            <StatCard
                                title="OEM Brands"
                                value={filterableAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="globe"
                            />

                            <StatCard
                                title="ODM Brands"
                                value={variantAttributes}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="shield"
                            />
                            <StatCard
                                title="Active Brands"
                                value={filterableAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="check-square"
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
                        placeholder="Search brands..."
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
                    <Text style={styles.addText}>Add</Text>
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
                        __handleDeleteAttribute={__handleDeleteAttribute}
                        onDone={() => __handleGetData(search)}
                    />
                ))}
            </View>
        );
    }
};

export default BrandMaster;

const ListCard = ({ item, __handleDeleteAttribute }) => {
    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <MaterialIcons
                        name="business"
                        size={22}
                        color={Colors.primaryColor}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.name}
                    </Text>
                    {item.slug && (
                        <Text style={styles.subTitle}>/{item.slug}</Text>
                    )}
                </View>

                <View
                    style={[
                        styles.status,
                        item.isActive === "Active"
                            ? styles.active
                            : styles.inactive,
                    ]}
                >
                    <Text style={styles.statusText}>
                        {item.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>
            </View>

            {/* BODY */}
            <View style={styles.body}>
                <View style={styles.row}>
                    <Text style={styles.label}>Owner</Text>
                    <Text style={styles.value}>{item.ownerName || "—"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Type</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {item.brandType || "OEM"}
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Country</Text>
                    <View style={styles.country}>
                        <Feather
                            name="globe"
                            size={14}
                            color={Colors.grayColor}
                        />
                        <Text style={styles.value}>
                            {item.country || "Global"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Feather
                        name="edit-2"
                        size={18}
                        color={Colors.primaryColor}
                    />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.deleteBtn]}
                    onPress={() => __handleDeleteAttribute(item._id)}
                >
                    <Feather name="trash-2" size={18} color="#EF4444" />
                    <Text style={styles.deleteText}>Delete</Text>
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
        borderRadius: 14,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        elevation: 3,
    },

    /* HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    title: {
        ...Fonts.blackColor16Medium,
    },

    subTitle: {
        fontSize: 12,
        color: Colors.grayColor,
        marginTop: 2,
    },

    status: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    active: {
        backgroundColor: "#DCFCE7",
    },

    inactive: {
        backgroundColor: "#F3F4F6",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },

    /* BODY */
    body: {
        marginTop: 12,
        gap: 8,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    label: {
        fontSize: 13,
        color: Colors.grayColor,
    },

    value: {
        fontSize: 14,
        color: Colors.blackColor,
    },

    badge: {
        backgroundColor: "#EDE9FE",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        color: "#7C3AED",
        fontWeight: "600",
    },

    country: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    /* FOOTER */
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 12,
    },

    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    actionText: {
        color: Colors.primaryColor,
        fontWeight: "600",
    },

    deleteBtn: {},

    deleteText: {
        color: "#EF4444",
        fontWeight: "600",
    },
});
