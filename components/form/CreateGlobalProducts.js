import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader } from "../../modules";
import { __postApiData } from "../../utils/api";
import {
    __getAllComplianceDocumentList,
    __getAttributeSetById,
    __getBrandByCategoryIdList,
    __getBrandList,
    __getDistributorPickupPointsList,
    __getHSNByCategoryIdList,
    __getHsnCodeList,
    __getProductCategoryList,
    __getRegularAttributeByAttributeSetList,
    __getSelectedVarinetAttributesList,
} from "../../utils/api/commonApi";

import MobileTabs from "./com/MobileTabs";
import PackageManufacturingForm from "./com/PackageManufacturingForm";
import BasicInfoPricingForm from "./com/BasicInfoPricingForm";
import MediaUploadComponent from "./com/MediaUploadComponent";
import TaxComplianceComponent from "./com/TaxComplianceComponent";
import ProductDescriptionComponent from "./com/ProductDescriptionComponent";
import { productValidateForm } from "./functions";
import VariationAttributes from "./com/VariationAttributes";
import CategoryAndBrand from "./com/CategoryAndBrand";
import { Feather } from "@expo/vector-icons";
import ReviewAndSumbit from "./com/ReviewAndSumbit";
import AttributeForm from "./com/AttributeForm";

const STEPS = [
    { key: "1", label: "Category & Brand", subTitle: "Select product type" },
    {
        key: "2",
        label: "Basic Info & Pricing",
        subTitle: "Price and SKU",
    },
    { key: "3", label: "Attribute Mapping", subTitle: "Category attributes" },
    { key: "4", label: "Description", subTitle: "Detailed info" },
    { key: "5", label: "Media Upload", subTitle: "Images & Video" },
    {
        key: "6",
        label: "Tax & Compliance",
        subTitle: "HSN & Origin",
    },
    {
        key: "7",
        label: "Package & Manufacturing",
        subTitle: "Dimensions",
    },
    {
        key: "8",
        label: "Review & Submit",
        subTitle: "Final check",
    },
];
const VariantSTEPS = [
    { key: "1", label: "Category & Brand", subTitle: "Select product type" },
    { key: "2", label: "Basic Info", subTitle: "Price and SKU" },
    {
        key: "3",
        label: "Variation Attributes",
        subTitle: "Define variations",
    },
    {
        key: "4",
        label: "Review & Submit",
        subTitle: "Final check",
    },
];
const initalState = {
    activeTab: "1",
    productName: "",
    code: "",
    displayOrder: "1",
    isActive: true,
    loading: false,

    hsnsetId: null,
    attributeSetId: null,

    // tab 1
    categoryId: null,
    brandId: null,

    // tab 2
    title: "",
    modelName: "",
    sku: "",
    slug: "",
    // PRICING & INVENTORY (if isVariableProduct: false,)
    // ****
    ean: "",
    quantityPerBox: "1",
    boxMrp: "",
    boxSellingPrice: "",
    discountType: "PERCENTAGE",
    discountValue: "0",
    minOrderQuantity: "1",
    stock: "0",
    listingStatus: "ACTIVE",
    fulfilledBy: "SELLER",
    // tab 3
    regularAttributes: [],
    dynamicSection: [],
    description: "",
    fullDescriptionHtmlContent: "",

    // tab 4
    shortVideoUrl: "",
    mainImageUrl: "",
    galleryImageUrls: [],
    // tab 5
    hsn: null,
    complianceDocuments: [],
    // tab 6
    productDimension: {
        length: "",
        width: "",
        height: "",
        weight: "",
        lengthUnit: "cm",
        weightUnit: "kg",
    },
    packageDimension: {
        length: "",
        width: "",
        height: "",
        weight: "",
        lengthUnit: "cm",
        weightUnit: "kg",
    },
    metaTitle: "",
    metaDescription: "",

    //** **/
    variantAttributes: [],
    variants: [],

    // other
    categoryList: [],
    brandList: [],
    hsnCodeList: [],
    complianceDocumentList: [],
    pickupPointsList: [],
    regularAttributesList: null,
    isVariableProduct: false,
};

const CreateGlobalProducts = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
    isVariant = false,
}) => {
    const [state, setState] = useState({
        ...initalState,
        isVariableProduct: isVariant,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { activeTab, loading } = state;

    const __handleSave = async (productStatus) => {
        try {
            const singleProductData = {
                sku: state?.sku,
                ean: state?.ean,
                pricing: {
                    quantityPerBox: Number(state?.quantityPerBox),
                    boxMrp: Number(state?.boxMrp),
                    boxSellingPrice: Number(state?.boxSellingPrice),
                    discountType: state?.discountType,
                    discountValue: Number(state?.discountValue),
                    minOrderQuantity: Number(state?.minOrderQuantity),
                    // stock: Number(state?.stock),
                },
                inventoryByPickup: state?.pickupPointsList?.map((attr) => {
                    return {
                        pickupPointId: attr._id,
                        quantity: Number(attr?.quantity || 0),
                        pickupPointName: attr?.label,
                    };
                }),
                listingStatus: state?.listingStatus,
                fulfilledBy: state?.fulfilledBy,
                metaTitle: state?.metaTitle,
                metaDescription: state?.metaDescription,
                // tab 3
                regularAttributeSet: [
                    {
                        order: 1,
                        attributeSetId:
                            state?.regularAttributesList?.attributeSetId,
                        attributeSetName:
                            state?.regularAttributesList?.attributeSetName,
                        regularAttributes: state?.regularAttributes.map(
                            (attr) => {
                                let formattedValues =
                                    attr?.newvalues || attr?.values || [];

                                if (attr?.type === "UNIT_RANGE") {
                                    formattedValues = formattedValues.flatMap(
                                        (val) => {
                                            const nums =
                                                val.match(/\d+(\.\d+)?/g); // extract numbers

                                            if (nums && nums.length >= 2) {
                                                return [
                                                    Number(nums[0]),
                                                    Number(nums[1]),
                                                ];
                                            }

                                            return []; // skip invalid
                                        },
                                    );
                                }

                                return {
                                    attributeId: attr?.attributeId,
                                    name: attr?.name,
                                    values: formattedValues,
                                    type: attr?.type,
                                    isMandatory: attr?.isMandatory,
                                    isVariant: attr?.isVariant,
                                };
                            },
                        ),
                    },
                ],

                //
                dynamicSection: state?.dynamicSection,
                description: state?.description,
                fullDescriptionHtmlContent: state?.fullDescriptionHtmlContent,
                bulletPoints: [],
                // tab 4
                shortVideoUrl: state?.shortVideoUrl,
                mainImageUrl: state?.mainImageUrl,
                galleryImageUrls: state?.galleryImageUrls,
                // tab 5
                hsn: state?.hsn
                    ? {
                          hsnCodeId: state?.hsn?._id,
                          code: state?.hsn?.code,
                          taxRate: state?.hsn?.taxSlabs?.[0]?.taxRate,
                      }
                    : null,
                complianceDocuments: state?.complianceDocuments?.map((ite) => ({
                    complianceId: ite?._id,
                    documentName: ite?.name,
                    isMandatory: ite?.isMandatory,
                    url: ite?.url,
                    issueDate: ite?.issueDate || null,
                    expiryDate: ite?.expiryDate,
                })),

                // tab 6
                productDimension: {
                    length: Number(state?.productDimension?.length),
                    width: Number(state?.productDimension?.width),
                    height: Number(state?.productDimension?.height),
                    weight: Number(state?.productDimension?.weight),
                    lengthUnit: state?.productDimension?.lengthUnit,
                    weightUnit: state?.productDimension?.weightUnit,
                },
                packageDimension: {
                    length: Number(state?.packageDimension?.length),
                    width: Number(state?.packageDimension?.width),
                    height: Number(state?.packageDimension?.height),
                    weight: Number(state?.packageDimension?.weight),
                    lengthUnit: state?.packageDimension?.lengthUnit,
                    weightUnit: state?.packageDimension?.weightUnit,
                },
                manufacturingDetails: {
                    country: state?.country,
                    manufacturerName: state?.manufacturer,
                    packerDetails: state?.packer,
                    importerDetails: state?.importer,
                },

                productStatus: productStatus || "SUBMIT",
                isActive: true,
            };
            const payload = {
                // tab 1
                categoryId: state?.categoryId?.id,
                brandId: state?.brandId?.id,
                // tab 2
                title: state?.title,
                modelName: state?.modelName,
                // sku: state?.sku,
                slug: state?.slug,

                ...(state?.isVariableProduct
                    ? {
                          productType: "VARIABLE",
                          variantAttributes: state?.variantAttributes?.map(
                              (varian) => ({
                                  attributeId: varian?.attributeId,
                                  name: varian?.name,
                                  type: varian?.type,
                                  // "isMandatory": false,
                                  isVariant: varian?.isVariant,
                                  values: varian?.values,
                              }),
                          ),
                          variants: state?.variants?.map(
                              (subpro) => subpro?.variationData,
                          ),
                      }
                    : { productType: "SINGLE", singleProductData }),
                isActive: true,
            };
            console.log(JSON.stringify(payload));

            updateState({ loading: true });

            const res = await __postApiData(
                "/globalProducts/createGlobalProduct",
                payload,
            );

            Alert.alert("", res?.message || "Success");
            // if (res?.success) onClose();
        } catch {
            Alert.alert("", "Failed to create product");
        } finally {
            updateState({ loading: false });
        }
    };

    const __handleGetData = async () => {
        try {
            updateState({
                categoryLoading: true,
            });
            const [categories, compliance, pickupPoints] = await Promise.all([
                __getProductCategoryList(),
                __getAllComplianceDocumentList(),
                __getDistributorPickupPointsList(),
            ]);

            updateState({
                categoryList: categories || [],
                complianceDocumentList: compliance || [],
                pickupPointsList: pickupPoints || [],
                categoryLoading: false,
            });
        } catch {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    const __handleGetOtherData = async () => {
        try {
            updateState({
                brandLoading: true,
            });
            const [brands, hsn, regularAttributes, variantList] =
                await Promise.all([
                    __getBrandByCategoryIdList(state?.categoryId?.id),
                    __getHSNByCategoryIdList(state?.categoryId?.id),
                    __getRegularAttributeByAttributeSetList(
                        state?.categoryId?.id,
                    ),
                    __getSelectedVarinetAttributesList(state?.categoryId?.id),
                ]);
            updateState({
                brandList: brands || [],
                hsnCodeList: hsn || [],
                regularAttributesList: regularAttributes || [],
                regularAttributes: regularAttributes?.regularAttributes || [],
                variantAttributes:
                    variantList?.map((item) => ({
                        ...item,
                        values: [],
                        s_values: item?.values || [],
                    })) || [],
                brandLoading: false,
            });
        } catch {}
    };

    useEffect(() => {
        state?.categoryId?.id && __handleGetOtherData();
    }, [state?.categoryId?.id]);

    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                flex: 1,
            }}
        >
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: 0,
                }}
            >
                <MobileTabs
                    activeStep={activeTab}
                    setActiveStep={(id) => updateState({ activeTab: id })}
                    STEPS={state?.isVariableProduct ? VariantSTEPS : STEPS}
                />

                <View style={containerStyle}>
                    {activeTab === "1" && (
                        <CategoryAndBrand
                            state={state}
                            updateState={updateState}
                        />
                    )}

                    {activeTab === "2" && (
                        <BasicInfoPricingForm
                            value={state}
                            onChange={(data) => updateState(data)}
                        />
                    )}

                    {state?.isVariableProduct ? (
                        <>
                            {activeTab === "3" && (
                                <VariationAttributes
                                    value={state}
                                    onChange={(data) => updateState(data)}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {activeTab === "3" && (
                                <AttributeForm
                                    value={state}
                                    updateFinal={(data) => updateState(data)}
                                />
                            )}
                            {activeTab === "4" && (
                                <ProductDescriptionComponent
                                    value={state}
                                    onChange={(data) => updateState(data)}
                                />
                            )}

                            {activeTab === "5" && (
                                <MediaUploadComponent
                                    value={state}
                                    onChange={updateState}
                                />
                            )}
                            {activeTab === "6" && (
                                <TaxComplianceComponent
                                    value={state}
                                    onChange={updateState}
                                />
                            )}
                            {activeTab === "7" && (
                                <PackageManufacturingForm
                                    value={state}
                                    onChange={updateState}
                                />
                            )}
                            {activeTab === "8" && (
                                <ReviewAndSumbit
                                    value={state}
                                    onChange={updateState}
                                    onSubmit={() => __handleSave("SUBMIT")}
                                />
                            )}
                        </>
                    )}

                    {/* <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onClose}
                        >
                            <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                        </TouchableOpacity>

                        {activeTab !== "1" && (
                            <TouchableOpacity
                                style={styles.createBtn}
                                onPress={() =>
                                    updateState({
                                        activeTab: state?.isVariableProduct
                                            ? VariantSTEPS[
                                                  VariantSTEPS.findIndex(
                                                      (s) =>
                                                          s.key === activeTab,
                                                  ) - 1
                                              ].key
                                            : STEPS[
                                                  STEPS.findIndex(
                                                      (s) =>
                                                          s.key === activeTab,
                                                  ) - 1
                                              ].key,
                                    })
                                }
                            >
                                <Text style={styles.createText}>Back</Text>
                            </TouchableOpacity>
                        )}

                        {activeTab !==
                        (state?.isVariableProduct ? "3" : "6") ? (
                            <TouchableOpacity
                                style={styles.createBtn}
                                onPress={() => {
                                    if (
                                        !productValidateForm(
                                            Number(activeTab),
                                            state,
                                        )
                                    )
                                        return;
                                    updateState({
                                        activeTab: state?.isVariableProduct
                                            ? VariantSTEPS[
                                                  VariantSTEPS.findIndex(
                                                      (s) =>
                                                          s.key === activeTab,
                                                  ) + 1
                                              ].key
                                            : STEPS[
                                                  STEPS.findIndex(
                                                      (s) =>
                                                          s.key === activeTab,
                                                  ) + 1
                                              ].key,
                                    });
                                }}
                            >
                                <Text style={styles.createText}>Next</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.createBtn}
                                onPress={() => {
                                    if (
                                        !productValidateForm(
                                            Number(activeTab),
                                            state,
                                        )
                                    )
                                        return;
                                    __handleSave("SUBMIT");
                                }}
                            >
                                <Text style={styles.createText}>Create</Text>
                            </TouchableOpacity>
                        )}
                    </View> */}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() =>
                        updateState({
                            activeTab: state?.isVariableProduct
                                ? VariantSTEPS[
                                      VariantSTEPS.findIndex(
                                          (s) => s.key === activeTab,
                                      ) - 1
                                  ].key
                                : STEPS[
                                      STEPS.findIndex(
                                          (s) => s.key === activeTab,
                                      ) - 1
                                  ].key,
                        })
                    }
                    disabled={activeTab === "1"}
                    style={{
                        ...styles.cancelBtn,
                        padding: 7,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                    }}
                >
                    <Feather name="chevron-left" size={18} color="#64748b" />
                    <Text style={styles.cancelText}>Previous</Text>
                </TouchableOpacity>
                {/* {!isLastStep && ( */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (
                            activeTab !== (state?.isVariableProduct ? "3" : "8")
                        ) {
                            // if (!productValidateForm(Number(activeTab), state))
                            //     return;
                            updateState({
                                activeTab: state?.isVariableProduct
                                    ? VariantSTEPS[
                                          VariantSTEPS.findIndex(
                                              (s) => s.key === activeTab,
                                          ) + 1
                                      ].key
                                    : STEPS[
                                          STEPS.findIndex(
                                              (s) => s.key === activeTab,
                                          ) + 1
                                      ].key,
                            });
                        } else {
                            if (!productValidateForm(Number(activeTab), state))
                                return;
                            __handleSave("SUBMIT");
                        }
                    }}
                    style={{
                        ...styles.cancelBtn,
                        backgroundColor: Colors.primaryColor,
                        padding: 7,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                    }}
                >
                    <Text style={styles.saveBtnText}>
                        {activeTab !== (state?.isVariableProduct ? "3" : "8")
                            ? "Next Step"
                            : "Save Product"}
                    </Text>
                    <Feather
                        name="chevron-right"
                        size={18}
                        color={Colors.whiteColor}
                    />
                </TouchableOpacity>
                {/* )} */}
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

const containerStyle = {
    paddingBottom: 100,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: Colors.whiteColor,
};

const boxStyle = {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
};

const styles = {
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    cancelBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
    cancelText: { color: "#868e96", fontWeight: "700", fontSize: 15 },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
};
