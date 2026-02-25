import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getAttributeSetList,
    __getBrandList,
    __getcategoryList,
    __getHsnSetList,
    __getProductCategoryList,
} from "../../utils/api/commonApi";
import MobileTabs from "./com/MobileTabs";
import PackageManufacturingForm from "./com/PackageManufacturingForm";
import BasicInfoPricingForm from "./com/BasicInfoPricingForm";
import MediaUploadComponent from "./com/MediaUploadComponent";
import TaxComplianceComponent from "./com/TaxComplianceComponent";
import ProductDescriptionComponent from "./com/ProductDescriptionComponent";
const STEPS = [
    { key: "1", label: "Category & Brand" },
    { key: "2", label: "Basic Info" },
    { key: "3", label: "Description" },
    { key: "4", label: "Media Upload" },
    { key: "5", label: "Tax & Compliance" },
    { key: "6", label: "Package & Manufacturing" },
];
const PRODUCT_TYPES = [
    {
        key: "SINGLE",
        title: "Single",
        description:
            "No variations. Only regular attributes (no variant attributes).",
        icon: "📦",
    },
    {
        key: "VARIABLE",
        title: "Variable",
        description: "All attributes shown. Select which create variations.",
        icon: "🧩",
    },
    {
        key: "COMBO",
        title: "Combo",
        description: "Bundle of existing products sold together.",
        icon: "🎁",
    },
];

const CreateGlobalProducts = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
}) => {
    const [productType, setProductType] = useState("SINGLE");

    const [state, setState] = useState({
        activeTab: "1",
        metaTitle: "",
        metaDescription: "",
        productName: "",
        description: "",
        code: "",
        hsnsetId: null,
        attributeSetId: null,
        displayOrder: "1",
        isActive: true,
        status: true,
        loading: false,
        //
        categoryList: [],
        brandList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        activeTab,
        loading,
        metaTitle,
        metaDescription,
        productName,
        description,
        code,
        displayOrder,
        isActive,
        hsnsetId,
        attributeSetId,
        status,
        //
        categoryList,
        brandList,
    } = state;

    const validateForm = () => {
        if (!productName?.trim()) {
            Alert.alert("Validation Error", "category name is required");
            return false;
        }
        if (!code?.trim()) {
            Alert.alert("Validation Error", "code is required");
            return false;
        }
        if (!attributeSetId) {
            Alert.alert("Validation Error", "attribute set is required");
            return false;
        }
        if (!hsnsetId) {
            Alert.alert("Validation Error", "HSN code is required");
            return false;
        }

        if (productName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "category name must be at least 2 characters",
            );
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });
        console.log({
            name: productName,
            code,
            parentId: parentId,
            displayOrder: Number(displayOrder),
            enabled: isActive,
            isActive: isActive,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            hsnsetId: hsnsetId?.id || null,
            attributeSetId: attributeSetId?.id || null,
        });

        __postApiData("/categories/createCategory", {
            name: productName,
            code,
            parentId: parentId,
            displayOrder: Number(displayOrder),
            enabled: isActive,
            isActive: isActive,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            hsnsetId: hsnsetId?.id || null,
            attributeSetId: attributeSetId?.id || null,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res?.success) {
                    // setError(res.message);
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
        try {
            return;
            updateState({ loading: true });

            __patchApiData("/categories/updateCategoryById/" + item?._id, {
                name: productName,
                code,
                displayOrder: Number(displayOrder),
                enabled: isActive,
                isActive: isActive,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                hsnsetId: hsnsetId?.id || null,
                attributeSetId: attributeSetId?.id || null,
            })
                .then((res) => {
                    console.log(JSON.stringify(res));
                    if (res?.success) {
                        // setError(res.message);
                        Alert.alert("", res.message);
                        onClose();
                    } else {
                        Alert.alert("", res.message);
                    }
                    updateState({ loading: false });
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("", "Failed");
                    updateState({ loading: false });
                });
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (isEdit) {
    //         console.log(item);
    //         updateState({
    //             productName: item?.name,
    //             code: item?.code,
    //             metaTitle: item?.metaTitle,
    //             metaDescription: item?.metaDescription,
    //             hsnsetId: item?.hsnsetId
    //                 ? { id: item?.hsnsetId, name: item?.hsnSetName }
    //                 : null,
    //             attributeSetId: item?.attributeSetId
    //                 ? { id: item?.attributeSetId, name: item?.attributeSetName }
    //                 : null,
    //             displayOrder: String(item?.displayOrder) || "1",
    //             isActive: item?.isActive || false,
    //         });
    //     }
    // }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const code = await __getProductCategoryList();
            const attra = await __getBrandList(true);
            updateState({ categoryList: code, brandList: attra });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <View style={{ marginTop: 10, backgroundColor: Colors.whiteColor }}>
            <Loader isShow={loading} />

            <MobileTabs
                activeStep={activeTab}
                onChange={(id) => {
                    console.log("Selected tab ID:", id);
                    updateState({ activeTab: id });
                }}
            />
            <View
                style={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    gap: 12,
                }}
            >
                {activeTab == "2" && (
                    <BasicInfoPricingForm
                        value={null}
                        onChange={(data) => {
                            console.log("Updated:", data);
                        }}
                    />
                )}
                {activeTab == "1" && (
                    <View
                        style={{
                            ...inputStyle,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            paddingBottom: 10,
                            marginTop: 10,
                        }}
                    >
                        <DropDownTextAreaBox
                            type="select"
                            title={"Category"}
                            placeholder={"Select Category"}
                            required
                            list={categoryList}
                            value={hsnsetId}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    hsnsetId: value,
                                });
                            }}
                            editable={!isEdit}
                        />
                        <DropDownTextAreaBox
                            type="select"
                            title={"Brand"}
                            required
                            placeholder={"Select Brand"}
                            list={brandList}
                            value={attributeSetId}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    attributeSetId: value,
                                });
                            }}
                            editable={!isEdit}
                        />
                    </View>
                )}
                {activeTab == "3" && (
                    <View>
                        <ProductDescriptionComponent />
                    </View>
                )}
                {activeTab == "4" && (
                    <View>
                        <MediaUploadComponent
                            mainImage={state?.mainImage}
                            galleryImages={state?.galleryImages}
                            shortVideo={state?.shortVideo}
                            updateState={updateState}
                        />
                    </View>
                )}
                {activeTab == "5" && (
                    <View>
                        <TaxComplianceComponent
                            hsnSearch={state.hsnSearch}
                            selectedHsn={state.selectedHsn}
                            hsnList={[]} // [{id, name}]
                            // documentTypeList={[]} // [{id, name}]
                            updateState={updateState}
                        />
                    </View>
                )}
                {activeTab == "6" && (
                    <View>
                        <PackageManufacturingForm />
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onClose}
                    >
                        <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                    </TouchableOpacity>

                    {activeTab != "1" && (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => {
                                const currentIndex = STEPS.findIndex(
                                    (s) => s.key === activeTab,
                                );
                                if (currentIndex > 0) {
                                    updateState({
                                        activeTab: STEPS[currentIndex - 1].key,
                                    });
                                }
                            }}
                        >
                            <Text style={styles.createText}>Back</Text>
                        </TouchableOpacity>
                    )}
                    {activeTab != "6" && (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => {
                                const currentIndex = STEPS.findIndex(
                                    (s) => s.key === activeTab,
                                );
                                if (currentIndex < STEPS.length - 1) {
                                    updateState({
                                        activeTab: STEPS[currentIndex + 1].key,
                                    });
                                }
                            }}
                        >
                            <Text style={styles.createText}>Next</Text>
                        </TouchableOpacity>
                    )}
                    {activeTab == "6" && (
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
                    )}
                </View>
            </View>
        </View>
    );
};

export default CreateGlobalProducts;
const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
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
        marginTop: 10,
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

    //
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardActive: {
        borderColor: "#2563EB",
        backgroundColor: "#EFF6FF",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 20,
    },

    title: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },

    desc: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
    },

    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#9CA3AF",
        alignItems: "center",
        justifyContent: "center",
    },

    radioActive: {
        borderColor: "#2563EB",
    },

    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2563EB",
    },
};

const ProductTypeCard = ({ item, selected, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.card, selected && styles.cardActive]}
        >
            <View style={styles.row}>
                <View style={styles.iconWrap}>
                    <Text style={styles.icon}>{item.icon}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                </View>

                <View style={[styles.radio, selected && styles.radioActive]}>
                    {selected && <View style={styles.radioDot} />}
                </View>
            </View>
        </TouchableOpacity>
    );
};
