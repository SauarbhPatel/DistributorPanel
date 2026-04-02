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
    Switch,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __patchApiData } from "../../utils/api";
import CreateCategoryManagment from "../../components/form/CreateCategoryManagment";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";
import CategorySearch from "../../components/masters/CategorySearch";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import TablePagination from "../../components/marketing/TablePagination";
import CategoryManagmentModel from "../../components/categoryManagment/CategoryManagmentModel";

const CategoryManagment = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        loading1: false,
        list: [],
        stats: {
            totalCategories: 0,
            activeCategories: 0,
            rootLevels: 0,
        },
        pagination: {},
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
        dropDown1: null,
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
        stats,
        dropDown1,
    } = state;

    const __handleGetData = async (ser = "", page = 1, limit = 5) => {
        try {
            updateState({ loading1: true });
            const res = await __getApiData(
                `/categories/getCategoryTree?search=${ser}&page=${page}&limit=${limit}${dropDown1?.id ? `&status=${dropDown1?.id.trim()}` : ""}`,
            );
            if (res?.success) {
                updateState({
                    list: res.data?.records,
                    stats: res?.data?.stats,
                    pagination: res?.data?.pagination,
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
    }, [search, dropDown1]);

    const handlePageChange = (newPage) => {
        __handleGetData(search, newPage);
    };
    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Category",
            "Are you sure you want to delete this category?",
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
                                `/categories/deleteCategoryById/${id}`,
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
                title={"Category Management"}
                navigation={navigation}
            />
            <Loader isShow={loading} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                <View style={{ paddingHorizontal: 10 }}>
                    <SlaHeader
                        title={"Category Management"}
                        subTitle="Manage your complete category tree structure here.  Create, organize, and control all categories in one place."
                        buttonName="Create Category"
                        onPressButton={() => {
                            updateState({ isShowCreate: true });
                        }}
                        totalCategory={stats?.totalCategories}
                        active={stats?.activeCategories}
                        leaf={stats?.rootLevels}
                    />
                </View>

                <CategorySearch
                    isLoading={loading1}
                    search={search}
                    onChange={updateState}
                    dropDown1={dropDown1}
                    dropDown1List={[
                        { id: "", name: "All Status" },
                        { id: "DRAFT", name: "DRAFT" },
                        { id: "SUBMIT ", name: "SUBMIT" },
                    ]}
                    onExpandAll={() => {}}
                    onCollapseAll={() => {}}
                />
                <View style={{ position: "relative" }}>{attributeCards()}</View>
                {list?.length > 0 && (
                    <View style={{ paddingHorizontal: 16 }}>
                        <TablePagination
                            pagination={state.pagination}
                            onPageChange={handlePageChange}
                        />
                    </View>
                )}
            </ScrollView>
            <CategoryManagmentModel
                visible={isShowCreate}
                onClose={(refresh) => {
                    updateState({ isShowCreate: false });
                    if (refresh) {
                        __handleGetData(search, 1);
                    }
                }}
            />
            {/* <BottomPopup
                isShow={isShowCreate}
                title="Add Root Category"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateCategoryManagment
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            /> */}
        </SafeAreaView>
    );

    function attributeCards() {
        return (
            <View style={{}}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {list.map((item) => (
                                <CategoryCard
                                    key={item._id}
                                    item={item}
                                    onAdd={(item) =>
                                        console.log("Add child", item)
                                    }
                                    onDone={() => __handleGetData(search)}
                                    onDelete={(item) => {
                                        __handleDelete(item._id);
                                    }}
                                    onToggle={(item, value) =>
                                        console.log("Toggle", item._id, value)
                                    }
                                />
                            ))}
                        </>
                    }
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                    }}
                />
            </View>
        );
    }
};

export default CategoryManagment;

const CategoryCard = ({
    item,
    level = 0,
    onAdd,
    onDone,
    onDelete,
    onToggle,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [state, setState] = useState({
        isShowCreate: false,
        isShowAdd: false,
        loading: false,
        isAcitve: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate, isShowAdd, isActive } = state;

    const __handleEditSave = (status) => {
        updateState({ loading: true });

        __patchApiData("/categories/updateCategoryById/" + item?._id, {
            isActive: status,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res?.success) {
                    Alert.alert("", res.message);
                    onDone();
                } else {
                    Alert.alert("", res.message);
                }
                updateState({ loading: false });
            })
            .catch((error) => {
                Alert.alert("", "Failed");
                updateState({ loading: false });
            });
    };
    useEffect(() => {
        if (item) updateState({ isActive: item.isActive });
    }, [item]);

    return (
        <View
            style={[
                styles.card,
                { marginLeft: level * 16 },
                level && {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                },
            ]}
        >
            <BottomPopup
                isShow={isShowAdd}
                title="Add Sub-Category"
                onClose={() => updateState({ isShowAdd: false })}
                component={
                    <CreateCategoryManagment
                        onClose={() => {
                            updateState({ isShowAdd: false });
                            onDone();
                        }}
                        parentId={item?._id || null}
                    />
                }
            />
            <BottomPopup
                isShow={isShowCreate}
                title="Edit Category"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateCategoryManagment
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                        parentId={item?.parentId || null}
                    />
                }
            />
            {/* Row */}
            <View style={{ ...styles.row, marginBottom: expanded ? 10 : 0 }}>
                {/* Left */}
                <View style={styles.left}>
                    {item.children?.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => setExpanded(!expanded)}
                        >
                            <Feather
                                name={
                                    expanded ? "chevron-down" : "chevron-right"
                                }
                                size={18}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 18 }} />
                    )}

                    <MaterialIcons
                        name="folder"
                        size={20}
                        color={Colors.primaryColor}
                        style={{ marginLeft: 6 }}
                    />
                    <View>
                        <Text numberOfLines={1} style={{ fontSize: 12 }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 8,
                                    backgroundColor: "#e0e0e0",
                                    alignSelf: "flex-start",
                                    paddingHorizontal: 5,
                                    paddingVertical: 1,
                                    borderRadius: 2,
                                }}
                            >
                                {item.code}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 8,
                                    backgroundColor: "#d6ffd498",
                                    alignSelf: "flex-start",
                                    paddingHorizontal: 5,
                                    paddingVertical: 1,
                                    borderRadius: 2,
                                    color: "#056c00",
                                }}
                            >
                                {item.status}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Right */}
                <View style={styles.right}>
                    {item.enabled && (
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeText}>Active</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => updateState({ isShowAdd: true })}
                    >
                        <Feather name="plus" size={18} color="#10B981" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => updateState({ isShowCreate: true })}
                    >
                        <Feather name="edit-2" size={18} color="#2563EB" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onDelete(item)}>
                        <Feather name="trash-2" size={18} color="#EF4444" />
                    </TouchableOpacity>

                    <Switch
                        value={isActive}
                        onValueChange={(v) => {
                            onToggle(item, v);
                            __handleEditSave(v);
                            updateState({ isActive: v });
                        }}
                        trackColor={{
                            false: "#E5E7EB",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>
            </View>

            {/* Children */}
            {expanded &&
                item.children?.map((child) => (
                    <CategoryCard
                        key={child._id}
                        item={child}
                        level={level + 1}
                        onAdd={onAdd}
                        onDone={onDone}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))}
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
    // card
    card: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
        padding: 12,
        paddingEnd: 0,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 6,
    },

    title: {
        ...Fonts.blackColor14Medium,
        marginLeft: 6,
        flexShrink: 1,
    },

    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginEnd: 10,
    },

    activeBadge: {
        backgroundColor: "#D1FAE5",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },

    activeText: {
        fontSize: 11,
        color: "#065F46",
        fontWeight: "600",
    },
});
