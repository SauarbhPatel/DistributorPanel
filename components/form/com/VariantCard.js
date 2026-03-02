const STEPS = [
    { key: "2", label: "Basic Info" },
    { key: "3", label: "Description" },
    { key: "4", label: "Media Upload" },
    { key: "5", label: "Tax & Compliance" },
    { key: "6", label: "Package & Manufacturing" },
];

import React, { useEffect, useState } from "react";
import MobileTabs from "./MobileTabs";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import VariantBasicInfoPricingForm from "./VariantBasicInfoPricingForm";
import ProductDescriptionComponent from "./ProductDescriptionComponent";
import MediaUploadComponent from "./MediaUploadComponent";
import TaxComplianceComponent from "./TaxComplianceComponent";
import PackageManufacturingForm from "./PackageManufacturingForm";
import {
    __getAllComplianceDocumentList,
    __getHsnCodeList,
} from "../../../utils/api/commonApi";
import { Loader } from "../../../modules";
import { productValidateForm } from "../functions";
const initalState = {
    activeTab: "2",
    productName: "",
    code: "",
    displayOrder: "1",
    isActive: true,
    loading: false,

    hsnsetId: null,
    attributeSetId: null,

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
    hsnCodeList: [],
    complianceDocumentList: [],
    isVariableProduct: false,
};

const VariantCard = ({
    onClose = () => {},
    onDone = () => {},
    defaultSku,
    defaultData,
}) => {
    const [state, setState] = useState({
        ...initalState,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { activeTab, loading } = state;

    const __handleGetData = async () => {
        try {
            updateState({
                loading: true,
            });
            const [hsn, compliance] = await Promise.all([
                __getHsnCodeList(),
                __getAllComplianceDocumentList(),
            ]);

            updateState({
                hsnCodeList: hsn || [],
                complianceDocumentList: compliance || [],
                loading: false,
            });
        } catch {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    const __handleComplete = (productStatus) => {
        if (!productValidateForm(Number(activeTab), state, true)) return;
        onDone({
            // variantHash: {
            //     Color: "Red",
            //     Size: "M",
            // },
            sku: defaultSku || state?.sku,
            ean: state?.ean,
            pricing: {
                quantityPerBox: Number(state?.quantityPerBox),
                boxMrp: Number(state?.boxMrp),
                boxSellingPrice: Number(state?.boxSellingPrice),
                discountType: state?.discountType,
                discountValue: Number(state?.discountValue),
                minOrderQuantity: Number(state?.minOrderQuantity),
                stock: Number(state?.stock),
            },
            listingStatus: state?.listingStatus,
            fulfilledBy: state?.fulfilledBy,

            isActive: true,
            metaTitle: state?.metaTitle,
            metaDescription: state?.metaDescription,

            // tab 3
            regularAttributes: state?.regularAttributes.map((attr) => {
                delete attr._id;
                delete attr.isMandatory;
                return { ...attr };
            }),
            dynamicSection: state?.dynamicSection,
            description: state?.description,
            fullDescriptionHtmlContent: state?.fullDescriptionHtmlContent,
            // tab 4
            shortVideoUrl: state?.shortVideoUrl,
            mainImageUrl: state?.mainImageUrl,
            galleryImageUrls: state?.galleryImageUrls,

            // tab 5
            hsn: state?.hsn
                ? {
                      hsnCodeId: state?.hsn?._id,
                      code: state?.hsn?.code,
                      taxRate: state?.hsn?.taxRate,
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
            //
            productStatus: productStatus || "DRAFT",
            isActive: true,
        });
    };

    useEffect(() => {
        console.log(defaultData);

        defaultData &&
            updateState({
                ...defaultData,
                hsn: defaultData?.hsn
                    ? {
                          name: defaultData?.hsn?.code,
                          id: defaultData?.hsn?.hsnCodeId,
                          taxRate: defaultData?.hsn?.taxRate,
                      }
                    : null,
                complianceDocuments: defaultData?.complianceDocuments?.map(
                    (doc) => ({
                        ...doc,
                        id: doc?.complianceId,
                        name: doc?.documentName,
                    }),
                ),
                packageDimension: {
                    height: String(defaultData?.packageDimension?.height),
                    length: String(defaultData?.packageDimension?.length),
                    lengthUnit: defaultData?.packageDimension?.lengthUnit,
                    weight: String(defaultData?.packageDimension?.weight),
                    weightUnit: defaultData?.packageDimension?.weightUnit,
                    width: String(defaultData?.packageDimension?.width),
                },
                boxMrp: String(defaultData?.pricing?.boxMrp),
                boxSellingPrice: String(defaultData?.pricing?.boxSellingPrice),
                discountType: defaultData?.pricing?.discountType,
                discountValue: String(defaultData?.pricing?.discountValue),
                minOrderQuantity: String(
                    defaultData?.pricing?.minOrderQuantity,
                ),
                quantityPerBox: String(defaultData?.pricing?.quantityPerBox),
                stock: String(defaultData?.pricing?.stock),
                productDimension: {
                    height: String(defaultData?.productDimension?.height),
                    length: String(defaultData?.productDimension?.length),
                    lengthUnit: defaultData?.productDimension?.lengthUnit,
                    weight: String(defaultData?.productDimension?.weight),
                    weightUnit: defaultData?.productDimension?.weightUnit,
                    width: String(defaultData?.productDimension?.width),
                },
            });
    }, [defaultData]);

    // console.log(JSON.stringify(state));
    return (
        <View style={{ backgroundColor: Colors.whiteColor }}>
            <Loader isShow={loading} />
            <MobileTabs
                activeStep={activeTab}
                onChange={(id) => updateState({ activeTab: id })}
                STEPS={STEPS}
            />
            <View style={{ paddingHorizontal: 10, paddingBottom: 100 }}>
                {activeTab === "2" && (
                    <VariantBasicInfoPricingForm
                        value={{ ...state, defaultSku }}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === "3" && (
                    <ProductDescriptionComponent
                        value={state}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === "4" && (
                    <MediaUploadComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === "5" && (
                    <TaxComplianceComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === "6" && (
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

                    {activeTab !== "2" && (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() =>
                                updateState({
                                    activeTab:
                                        STEPS[
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

                    {activeTab !== "6" ? (
                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={() => {
                                if (
                                    !productValidateForm(
                                        Number(activeTab),
                                        state,
                                        true,
                                    )
                                )
                                    return;
                                updateState({
                                    activeTab:
                                        STEPS[
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
                                __handleComplete();

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
