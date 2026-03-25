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

const CategoryManagment = ({ navigation }) => {
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
                `/categories/getCategoryTree?search=${ser}&page=1&limit=10`,
            );
            console.log(JSON.stringify(res));

            if (res?.success) {
                updateState({
                    list: res.data?.records,
                    // ...res?.data?.stats,
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
                        totalCategory="10"
                        active="9"
                        leaf="0"
                    />
                </View>

                <CategorySearch />
                <View style={{ position: "relative" }}>
                    {/* {loading1 && (
                        <ActivityIndicator
                            style={{
                                margin: 10,
                            }}
                        />
                    )} */}
                    {attributeCards()}
                </View>
            </ScrollView>
            <BottomPopup
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
                                title="Total Categories"
                                value={totalAttributes}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="Active"
                                value={filterableAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Root Levels"
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
                        placeholder="Search categories..."
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
                    <Text style={styles.addText}>Add Category</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

                    <Text numberOfLines={1} style={styles.title}>
                        {item.name}
                    </Text>
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
