import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    Alert,
    FlatList,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getProductAllAttributeList,
    __getProductAttributeSetList,
    __getProductRegularAttributeSetList,
} from "../../utils/api/commonApi";
import BottomPopup from "../common/BottomPopup";
import ProductAttribute from "./com/ProductAttribute";

const CreateAttribute = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isShowCreate: false,
        attributeName: "",
        description: "",
        isActive: true,
        //
        loading: false,
        //
        productAllAttribute: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isShowCreate,
        loading,
        attributeName,
        description,
        isActive,
        //
        productAllAttribute,
    } = state;
    const [list, setList] = useState([]);

    const validateForm = () => {
        if (!attributeName?.trim()) {
            Alert.alert("Validation Error", "Attribute name is required");
            return false;
        }

        if (attributeName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Attribute name must be at least 2 characters",
            );
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __postApiData("/attributeSet/createAttributeSet", {
            name: attributeName,
            description: description,
            attributes: list,
            isActive: isActive,
        })
            .then((res) => {
                if (res?.success) {
                    Alert.alert("", res.message);
                    onClose();
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

    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __patchApiData("/attributeSet/updateAttributeSetById/" + item?._id, {
            name: attributeName,
            description: description,
            attributes: list,
            isActive: isActive,
        })
            .then((res) => {
                if (res?.success) {
                    Alert.alert("", res.message);
                    onClose();
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
        if (isEdit) {
            updateState({
                attributeName: item?.name,
                description: item?.description,
                isActive: item?.isActive,
            });
            setList(
                item?.attributes?.map((attr) => ({
                    attributeId: attr?._id,
                    name: attr?.name,
                    type: attr?.type,
                    isMandatory: attr?.isMandatory,
                    isVariant: attr?.isVariant,
                })) || [],
            );
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const code = await __getProductAllAttributeList();
            updateState({
                productAllAttribute: code,
            });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    const toggleValue = (id, key) => {
        setList((prev) =>
            prev.map((item) =>
                item.attributeId === id ? { ...item, [key]: !item[key] } : item,
            ),
        );
    };

    const removeItem = (id) => {
        setList((prev) => prev.filter((item) => item.attributeId !== id));
    };

    return (
        <>
            <Loader isShow={loading} />
            <BottomPopup
                isShow={isShowCreate}
                title="Select Attribute"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <>
                        <ProductAttribute
                            list={productAllAttribute.filter((attr) =>
                                list.every(
                                    (selected) =>
                                        selected.attributeId !==
                                        attr.attributeId,
                                ),
                            )}
                            onAdd={(item) => {
                                updateState({ isShowCreate: false });
                                const newItem = item;
                                delete newItem.code;
                                setList((prev) => [...prev, newItem]);
                            }}
                        />
                    </>
                }
                top="10%"
            />

            <View
                style={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    // gap: 12,
                }}
            >
                <TextAreaBox
                    title="Attribute Set Name"
                    placeholder="e.g., Color, Size"
                    required
                    value={attributeName}
                    valuekey="attributeName"
                    onChangeText={updateState}
                    titleCustomStyle={{ marginHorizontal: 0 }}
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1.6 }}
                />
                <TextAreaBox
                    title="Description"
                    placeholder="Describe this attribute set."
                    value={description}
                    valuekey="description"
                    onChangeText={updateState}
                    titleCustomStyle={{ marginHorizontal: 0, marginTop: 10 }}
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1.6 }}
                />
                <Text
                    style={{
                        marginTop: 10,
                        color: "#000000",
                        fontSize: 12.0,
                        fontFamily: "Roboto_Medium",
                        marginBottom: 10,
                    }}
                >
                    Assign attributes from library
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        updateState({ isShowCreate: true });
                    }}
                    style={{
                        alignSelf: "center",
                        padding: 10,
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 30,
                        marginBottom: 10,
                        paddingHorizontal: 60,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.whiteColor,
                            fontSize: 12.0,
                            fontFamily: "Roboto_Medium",
                        }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={list}
                    keyExtractor={(item) => item.attributeId}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <AttributeCard
                            item={item}
                            onToggle={toggleValue}
                            onRemove={removeItem}
                        />
                    )}
                />
                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>Active</Text>
                    <Switch
                        value={isActive}
                        onValueChange={(value) =>
                            updateState({ isActive: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onClose}
                    >
                        <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() =>
                            isEdit ? __handleEditSave() : __handleSave()
                        }
                    >
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CreateAttribute;
const AttributeCard = ({ item, onToggle, onRemove }) => {
    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.code}>{item.type}</Text>
                </View>

                <TouchableOpacity onPress={() => onRemove(item.attributeId)}>
                    <Feather name="trash-2" size={18} color="#DC2626" />
                </TouchableOpacity>
            </View>

            {/* TOGGLES */}
            <View style={styles.toggleRow}>
                <ToggleItem
                    label="Mandatory"
                    value={item.isMandatory}
                    onPress={() => onToggle(item.attributeId, "isMandatory")}
                />

                <ToggleItem
                    label="Variant"
                    value={item.isVariant}
                    onPress={() => onToggle(item.attributeId, "isVariant")}
                />
            </View>
        </View>
    );
};

const ToggleItem = ({ label, value, onPress }) => (
    <TouchableOpacity
        style={[styles.toggleBox, value && styles.toggleActive]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Feather
            name={value ? "check-circle" : "circle"}
            size={18}
            color={value ? "#2563EB" : "#9CA3AF"}
        />
        <Text style={[styles.toggleText, value && { color: "#2563EB" }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const hintText = {
    ...Fonts.blackColor11Medium,
    marginTop: -5,
};

const styles = {
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    chipText: {
        fontSize: 12,
    },

    statusBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        // marginTop: 10,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 20,
    },

    cancelBtn: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },

    createBtn: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
    },

    createText: {
        color: Colors.whiteColor,
        ...Fonts.blackColor14Bold,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    code: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },

    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    toggleBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
    },

    toggleActive: {
        backgroundColor: "#EFF6FF",
        borderColor: "#2563EB",
    },

    toggleText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },
};
