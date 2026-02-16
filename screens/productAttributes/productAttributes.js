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
    ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import CreateProductAttribute from "../../components/form/CreateProductAttribute";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";

const ProductAttributes = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        loading1: false,
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
        loading1,
        list,
        totalAttributes,
        filterableAttributes,
        variantAttributes,
    } = state;

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading1: true });
            const res = await __getApiData(
                `/productAttributes/getAllAttributes?search=${ser}&page=1&limit=100`,
            );
            // console.log(JSON.stringify(res));

            if (res?.success) {
                updateState({
                    list: res.data?.data,
                    ...res?.data?.stats,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading1: false });
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
            <CommonHeader
                title={"Product Attributes"}
                subTitle={
                    "Manage product attributes for filtering and creating variants"
                }
                navigation={navigation}
            />
            <Loader isShow={loading} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {statsCards()}
                {searchAndAdd()}
                <View style={{ position: "relative" }}>
                    {loading1 && (
                        <ActivityIndicator
                            style={{
                                margin: 10,
                            }}
                        />
                    )}
                    {attributeCards()}
                </View>
            </ScrollView>
            <BottomPopup
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
                                title="Total Attributes"
                                value={totalAttributes}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Active Attributes"
                                value={variantAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Total Values"
                                value={filterableAttributes}
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
                        placeholder="Search attributes..."
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
                    <Text style={styles.addText}>Add Attribute</Text>
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

export default ProductAttributes;

// const ListCard = ({ item, __handleDeleteAttribute, onDone = () => {} }) => {
//     const [state, setState] = useState({
//         isShowCreate: false,
//     });

//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const { isShowCreate } = state;
//     return (
//         <View style={styles.attributeCard}>
//             <BottomPopup
//                 isShow={isShowCreate}
//                 title="Edit Attribute"
//                 onClose={() => updateState({ isShowCreate: false })}
//                 component={
//                     <CreateProductAttribute
//                         onClose={() => {
//                             updateState({ isShowCreate: false });
//                             onDone();
//                         }}
//                         isEdit
//                         item={item}
//                     />
//                 }
//             />
//             <View style={{ flex: 1 }}>
//                 <View style={styles.attrTitleRow}>
//                     <MaterialIcons
//                         name="label-outline"
//                         size={20}
//                         color={Colors.primaryColor}
//                     />
//                     <Text style={styles.attrTitle}>{item.name}</Text>
//                 </View>

//                 <View style={styles.valuesRow}>
//                     {item?.allowedValues?.map((val, index) => (
//                         <View key={index} style={styles.valueChip}>
//                             <Text style={styles.valueText}>{val}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>

//             <View style={styles.rightSection}>
//                 <View style={styles.activeBadge}>
//                     <Text style={styles.activeText}>
//                         {item.status ? "Active" : "In-Active"}
//                     </Text>
//                 </View>

//                 <View style={styles.actionRow}>
//                     <TouchableOpacity
//                         onPress={() => updateState({ isShowCreate: true })}
//                     >
//                         <Feather
//                             name="edit-2"
//                             size={18}
//                             color={Colors.primaryColor}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{ marginLeft: 12 }}
//                         onPress={() => __handleDeleteAttribute(item._id)}
//                     >
//                         <Feather name="trash-2" size={18} color="red" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

const ListCard = ({ item, __handleDeleteAttribute, onDone = () => {} }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <View style={styles.card}>
            <BottomPopup
                isShow={state.isShowCreate}
                title="Edit Attribute"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateProductAttribute
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                    />
                }
            />

            {/* HEADER */}
            <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    {item.description && (
                        <Text style={styles.subtitle}>{item.description}</Text>
                    )}
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: item.isActive
                                ? "#ECFDF5"
                                : "#FEF2F2",
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: item.isActive ? "#047857" : "#B91C1C",
                            fontSize: 12,
                            fontWeight: "700",
                        }}
                    >
                        {item.isActive ? "ACTIVE" : "INACTIVE"}
                    </Text>
                </View>
            </View>

            {/* INFO GRID */}
            <View style={styles.infoGrid}>
                <InfoItem label="Code" value={item?.code} />
                <InfoItem label="Data Type" value={item?.type} />
            </View>

            <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>Scope</Text>
                    <View style={styles.scopeBadge}>
                        <Text style={styles.scopeText}>
                            {item.scope || "-"}
                        </Text>
                    </View>
                </View>

                <InfoItem
                    label="Flags"
                    value={[
                        item?.isFilterable ? "Filterable" : "",
                        item?.isSearchable ? "Searchable" : "",
                        item?.isSortable ? "Sortable" : "",
                        item?.isVariant ? "Variant" : "",
                        item?.isComparable ? "Comparable" : "",
                        item?.isVisibleOnFrontend ? "Visible on Frontend" : "",
                        item?.isEditableAfterApproval
                            ? "Editable After Approval"
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" • ")}
                />
            </View>

            {/* ACTIONS */}
            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => updateState({ isShowCreate: true })}
                >
                    <Feather
                        name="edit-2"
                        size={16}
                        color={Colors.primaryColor}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconBtn, { marginLeft: 12 }]}
                    onPress={() => __handleDeleteAttribute(item._id)}
                >
                    <Feather name="trash-2" size={16} color="#DC2626" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>
            {value || "-"}
        </Text>
    </View>
);

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

    valuesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    valueChip: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 6,
        marginBottom: 6,
    },
    valueText: {
        fontSize: 12,
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
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
        gap: 10,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    infoGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 12,
    },

    infoItem: {
        flex: 1,
    },

    label: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    scopeBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    scopeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#4F46E5",
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 14,
    },

    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
});
