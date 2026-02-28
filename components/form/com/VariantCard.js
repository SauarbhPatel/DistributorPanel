const STEPS = [
    { key: "1", label: "Basic Info" },
    { key: "2", label: "Description" },
    { key: "3", label: "Media Upload" },
    { key: "4", label: "Tax & Compliance" },
    { key: "5", label: "Package & Manufacturing" },
];

import React, { useState } from "react";
import MobileTabs from "./MobileTabs";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import VariantBasicInfoPricingForm from "./VariantBasicInfoPricingForm";
import ProductDescriptionComponent from "./ProductDescriptionComponent";
import MediaUploadComponent from "./MediaUploadComponent";
import TaxComplianceComponent from "./TaxComplianceComponent";
import PackageManufacturingForm from "./PackageManufacturingForm";
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
    listingStatus: "DRAFT",
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
    isVariableProduct: false,
};

const VariantCard = ({ onClose = () => {} }) => {
    const [state, setState] = useState({
        ...initalState,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { activeTab, loading } = state;
    return (
        <View style={{ backgroundColor: Colors.whiteColor }}>
            <MobileTabs
                activeStep={activeTab}
                onChange={(id) => updateState({ activeTab: id })}
                STEPS={STEPS}
            />
            <View style={{ paddingHorizontal: 10, paddingBottom: 100 }}>
                {activeTab === "1" && (
                    <VariantBasicInfoPricingForm
                        value={state}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === "2" && (
                    <ProductDescriptionComponent
                        value={state}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === "3" && (
                    <MediaUploadComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === "4" && (
                    <TaxComplianceComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === "5" && (
                    <PackageManufacturingForm
                        value={state}
                        onChange={updateState}
                    />
                )}
                <View style={styles.footer}>
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
                        >
                            <Text style={styles.createText}>Back</Text>
                        </TouchableOpacity>
                    )}

                    {activeTab !== "5" ? (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => {
                                // if (
                                //     !productValidateForm(
                                //         Number(activeTab),
                                //         state,
                                //     )
                                // )
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
                            }}
                        >
                            <Text style={styles.createText}>Next</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => {
                                // if (
                                //     !productValidateForm(
                                //         Number(activeTab),
                                //         state,
                                //     )
                                // )
                                //     return;
                                // __handleSave("SUBMIT");
                            }}
                        >
                            <Text style={styles.createText}>Done</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default VariantCard;

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
};
