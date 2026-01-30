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
import { Loader } from "../../modules";

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

const AttributeSets = ({ navigation }) => {
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
            const res = await __getApiData(`/attributeSet/getAllAttributeSet`);
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data?.map((item) => ({
                        ...item,
                        attributes: item?.variantAttributes
                            .map((variant) => variant?.name)
                            .concat(
                                item?.regularAttributes.map(
                                    (variant) => variant?.name,
                                ),
                            ),
                    })),
                    // ...res?.data?.stats,
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
            <CommonHeader title={"Attribute Sets"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {statsCards()}
                {searchAndAdd()}
                {attributeCards()}
            </ScrollView>
            {/* <BottomPopup
                isShow={isShowCreate}
                title="Add New Attribute"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateProductAttribute
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            /> */}
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
                                title="Total Attribute Sets"
                                value={totalAttributes}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Total Attributes"
                                value={filterableAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Avg Attrs per Set"
                                value={variantAttributes}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="layers"
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
                        placeholder="Search attribute sets..."
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
                    <Text style={styles.addText}>Add Attribute Set</Text>
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

export default AttributeSets;

const ListCard = ({ item, __handleDeleteAttribute, onDone = () => {} }) => {
    const [state, setState] = useState({ isShowCreate: false });
    const updateState = (data) => setState((s) => ({ ...s, ...data }));

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                    <MaterialIcons
                        name="category"
                        size={20}
                        color={Colors.primaryColor}
                    />
                    <Text style={styles.cardTitle} numberOfLines={1}>
                        {item.name}
                    </Text>
                </View>

                {/* <View
                    style={[
                        styles.statusBadge,
                        item.status !== "Active" && styles.inactiveBadge,
                    ]}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </View> */}
            </View>

            {/* Description */}
            {item.description ? (
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
            ) : null}

            {/* Attribute Chips */}
            <View style={styles.chipRow}>
                {item.attributes.slice(0, 5).map((attr, index) => (
                    <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{attr}</Text>
                    </View>
                ))}

                {item.attributes.length > 5 && (
                    <View style={styles.moreChip}>
                        <Text style={styles.moreText}>
                            +{item.attributes.length - 5} more
                        </Text>
                    </View>
                )}
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
                <Text style={styles.countText}>
                    {item.attributes.length} Attributes
                </Text>

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
                        onPress={() => __handleDeleteAttribute(item._id)}
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
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        elevation: 3,
    },

    /* Header */
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },

    cardTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
        color: Colors.blackColor,
    },

    statusBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    inactiveBadge: {
        backgroundColor: "#FEE2E2",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#166534",
    },

    /* Description */
    description: {
        marginTop: 6,
        fontSize: 13,
        color: "#6B7280",
    },

    /* Chips */
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },

    chip: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 14,
        marginRight: 6,
        marginBottom: 6,
    },

    chipText: {
        fontSize: 12,
        color: "#111827",
    },

    moreChip: {
        backgroundColor: "#E5E7EB",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 14,
        marginBottom: 6,
    },

    moreText: {
        fontSize: 12,
        color: "#374151",
        fontWeight: "500",
    },

    /* Footer */
    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
    },

    countText: {
        fontSize: 13,
        color: "#6B7280",
    },

    actions: {
        flexDirection: "row",
    },

    iconBtn: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        marginLeft: 10,
    },

    deleteBtn: {
        backgroundColor: "#FEF2F2",
    },

    /* ================= Attribute Chips ================= */

    valuesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    valueChip: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },

    valueText: {
        fontSize: 12,
        ...Fonts.blackColor12Medium,
    },

    /* ================= Old Attribute Card (kept safe) ================= */

    attributeCard: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: "row",
        elevation: 2,
    },

    attrTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    attrTitle: {
        marginLeft: 8,
        ...Fonts.blackColor16Medium,
    },

    rightSection: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    activeBadge: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    activeText: {
        color: "#fff",
        fontSize: 12,
    },

    actionRow: {
        flexDirection: "row",
        marginTop: 10,
    },
});
