import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader } from "../../modules";
import { __postApiData } from "../../utils/api";
import {
    __getAllComplianceDocumentList,
    __getAttributeSetById,
    __getBrandList,
    __getHsnCodeList,
    __getProductCategoryList,
} from "../../utils/api/commonApi";

import MobileTabs from "./com/MobileTabs";
import PackageManufacturingForm from "./com/PackageManufacturingForm";
import BasicInfoPricingForm from "./com/BasicInfoPricingForm";
import MediaUploadComponent from "./com/MediaUploadComponent";
import TaxComplianceComponent from "./com/TaxComplianceComponent";
import ProductDescriptionComponent from "./com/ProductDescriptionComponent";
import { productValidateForm } from "./functions";

const STEPS = [
    { key: "1", label: "Category & Brand" },
    { key: "2", label: "Basic Info" },
    { key: "3", label: "Description" },
    { key: "4", label: "Media Upload" },
    { key: "5", label: "Tax & Compliance" },
    { key: "6", label: "Package & Manufacturing" },
];
const VariantSTEPS = [
    { key: "1", label: "Category & Brand" },
    { key: "2", label: "Basic Info" },
    { key: "3", label: "Variation Attributes" },
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
    // PRICING & INVENTORY (if isVariableProduct: false,)
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

    // other
    categoryList: [],
    brandList: [],
    hsnCodeList: [],
    complianceDocumentList: [],
    isVariableProduct: false,
};

const CreateGlobalProducts = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
}) => {
    const [state, setState] = useState({
        ...initalState,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        activeTab,
        loading,
        productName,
        code,
        displayOrder,
        isActive,
        hsnsetId,
        attributeSetId,
        categoryList,
        brandList,
    } = state;

    const __handleSave = async (productStatus) => {
        try {
            console.log("first");
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
                    stock: Number(state?.stock),
                },
                listingStatus: state?.listingStatus,
                fulfilledBy: state?.fulfilledBy,
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

                productStatus: productStatus || "DRAFT",
                isActive: true,
            };
            const payload = {
                // tab 1
                categoryId: state?.categoryId?.id,
                brandId: state?.brandId?.id,
                // tab 2
                title: state?.title,
                modelName: state?.modelName,
                sku: state?.sku,
                ...(state?.isVariableProduct
                    ? {}
                    : { productType: "SINGLE", singleProductData }),
            };
            console.log(JSON.stringify(payload));
        } catch (error) {
            console.log(error);
        }
        return;

        updateState({ loading: true });

        try {
            const res = await __postApiData("/categories/createCategory", {
                name: productName,
                code,
                parentId,
                displayOrder: Number(displayOrder),
                isActive,
                enabled: isActive,
                hsnsetId: hsnsetId?.id,
                attributeSetId: attributeSetId?.id,
            });

            Alert.alert("", res?.message || "Success");
            if (res?.success) onClose();
        } catch {
            Alert.alert("", "Failed to create product");
        } finally {
            updateState({ loading: false });
        }
    };

    const __handleGetData = async () => {
        try {
            updateState({
                loading: true,
            });
            const [categories, brands, hsn, compliance] = await Promise.all([
                __getProductCategoryList(),
                __getBrandList(),
                __getHsnCodeList(),
                __getAllComplianceDocumentList(),
            ]);

            updateState({
                categoryList: categories || [],
                brandList: brands || [],
                hsnCodeList: hsn || [],
                complianceDocumentList: compliance || [],
                loading: false,
            });
        } catch {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <View style={{ marginTop: 10, backgroundColor: Colors.whiteColor }}>
            <Loader isShow={loading} />

            <MobileTabs
                activeStep={activeTab}
                onChange={(id) => updateState({ activeTab: id })}
                STEPS={state?.isVariableProduct ? VariantSTEPS : STEPS}
            />

            <View style={containerStyle}>
                {activeTab === "1" && (
                    <View style={boxStyle}>
                        <DropDownTextAreaBox
                            type="select"
                            title="Category"
                            placeholder="Select Category"
                            required
                            list={categoryList}
                            value={state?.categoryId}
                            isSearchable
                            inputCustomStyle={inputStyle}
                            onSelected={async (value) => {
                                console.log(value);
                                updateState({ categoryId: value });
                                const attributeData =
                                    await __getAttributeSetById(
                                        value?.attributeSetId,
                                    );

                                console.log(attributeData);
                                attributeData &&
                                    updateState({
                                        regularAttributes:
                                            attributeData?.regularAttributes?.map(
                                                (ite) => ({
                                                    ...ite,
                                                    values: [],
                                                }),
                                            ) || [],
                                    });
                            }}
                            // editable={!isEdit}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 0,
                            }}
                        />

                        <DropDownTextAreaBox
                            type="select"
                            title="Brand"
                            placeholder="Select Brand"
                            required
                            list={brandList}
                            value={state?.brandId}
                            isSearchable
                            inputCustomStyle={inputStyle}
                            onSelected={(value) =>
                                updateState({ brandId: value })
                            }
                            editable={!isEdit}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                        />
                    </View>
                )}

                {activeTab === "2" && (
                    <BasicInfoPricingForm
                        value={state}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === (state?.isVariableProduct ? "4" : "3") && (
                    <ProductDescriptionComponent
                        value={state}
                        onChange={(data) => updateState(data)}
                    />
                )}
                {activeTab === (state?.isVariableProduct ? "5" : "4") && (
                    <MediaUploadComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === (state?.isVariableProduct ? "6" : "5") && (
                    <TaxComplianceComponent
                        value={state}
                        onChange={updateState}
                    />
                )}
                {activeTab === (state?.isVariableProduct ? "7" : "6") && (
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

                    {activeTab !== (state?.isVariableProduct ? "7" : "6") ? (
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

// {
//   // "title": "Samsung Galaxy S21",
//   // "modelName": "SM-G991B",
//   // "sku": "SAM-ELEC-S21",
//   // "categoryId": "699869bb718d1b48b749715a",
//   // "brandId": "699991cb76d28be87c1ec652",
//   "productType": "SINGLE",
//   "variantAttributes": [
//     {
//       "attributeId": "65f2ab12cd34ef6789012345",
//       "name": "Color",
//       "values": [
//         "Red",
//         "Blue",
//         "Green"
//       ],
//       "type": "SELECT",
//       "isVariant": true
//     }
//   ],
//   "variants": [
//     {
//       "variantHash": {
//         "Color": "Red",
//         "Size": "M"
//       },
//       "sku": "SKU-RED-M",
//       "ean": "1234567890123",
//       "hsn": {
//         "hsnCodeId": "65f2ab12cd34ef6789012345",
//         "code": "8517",
//         "taxRate": 18
//       },
//       "pricing": {
//         "quantityPerBox": 100,
//         "boxMrp": 10000,
//         "boxSellingPrice": 8000,
//         "discountType": "PERCENTAGE",
//         "discountValue": 20,
//         "minOrderQuantity": 10,
//         "stock": 500
//       },
//       "shipping": {
//         "shippingCharge": 50,
//         "freeShipping": false,
//         "shippingRuleId": "65f2ab12cd34ef6789012345",
//         "fulfilledBy": "SELLER"
//       },
//       "regularAttributes": [
//         {
//           "attributeId": "65f2ab12cd34ef6789012345",
//           "name": "Color",
//           "values": [
//             "Red",
//             "Blue",
//             "Green"
//           ],
//           "type": "SELECT",
//           "isVariant": true
//         }
//       ],
//       "complianceDocuments": [
//         {
//           "complianceId": "65f2ab12cd34ef6789012345",
//           "documentName": "FSSAI Certificate",
//           "isMandatory": true,
//           "url": "https://example.com/certificate.pdf",
//           "issueDate": "2024-01-01",
//           "expiryDate": "2025-01-01"
//         }
//       ],
//       "productDimension": {
//         "length": 10,
//         "width": 5,
//         "height": 15,
//         "weight": 2,
//         "lengthUnit": "cm",
//         "weightUnit": "kg"
//       },
//       "packageDimension": {
//         "length": 10,
//         "width": 5,
//         "height": 15,
//         "weight": 2,
//         "lengthUnit": "cm",
//         "weightUnit": "kg"
//       },
//       "dynamicSection": [
//         {
//           "sectionTitle": "Warranty",
//           "content": "1 year manufacturer warranty"
//         }
//       ],
//       "description": "string",
//       "metaTitle": "string",
//       "metaDescription": "string",
//       "shortVideoUrl": "https://example.com/short-video.mp4",
//       "mainImageUrl": "https://example.com/main-image.jpg",
//       "galleryImageUrls": [
//         "https://example.com/image1.jpg"
//       ],
//       "listingStatus": "DRAFT",
//       "productStatus": "DRAFT",
//       "isActive": true
//     }
//   ],
//   "singleProductData": {
//     "variantHash": {
//       "Color": "Red",
//       "Size": "M"
//     },
//     "sku": "SKU-RED-M",
//     // "ean": "1234567890123",
//     // "hsn": {
//     //   "hsnCodeId": "65f2ab12cd34ef6789012345",
//     //   "code": "8517",
//     //   "taxRate": 18
//     // },
//     // "pricing": {
//     //   "quantityPerBox": 100,
//     //   "boxMrp": 10000,
//     //   "boxSellingPrice": 8000,
//     //   "discountType": "PERCENTAGE",
//     //   "discountValue": 20,
//     //   "minOrderQuantity": 10,
//     //   "stock": 500
//     // },
//     "shipping": {
//       "shippingCharge": 50,
//       "freeShipping": false,
//       "shippingRuleId": "65f2ab12cd34ef6789012345",
//       // "fulfilledBy": "SELLER"
//     },
//     // "regularAttributes": [
//     //   {
//     //     "attributeId": "65f2ab12cd34ef6789012345",
//     //     "name": "Color",
//     //     "values": [
//     //       "Red",
//     //       "Blue",
//     //       "Green"
//     //     ],
//     //     "type": "SELECT",
//     //     "isVariant": true
//     //   }
//     // ],
//     // "complianceDocuments": [
//     //   {
//     //     "complianceId": "65f2ab12cd34ef6789012345",
//     //     "documentName": "FSSAI Certificate",
//     //     "isMandatory": true,
//     //     "url": "https://example.com/certificate.pdf",
//     //     "issueDate": "2024-01-01",
//     //     "expiryDate": "2025-01-01"
//     //   }
//     // ],
//     // "productDimension": {
//     //   "length": 10,
//     //   "width": 5,
//     //   "height": 15,
//     //   "weight": 2,
//     //   "lengthUnit": "cm",
//     //   "weightUnit": "kg"
//     // },
//     // "packageDimension": {
//     //   "length": 10,
//     //   "width": 5,
//     //   "height": 15,
//     //   "weight": 2,
//     //   "lengthUnit": "cm",
//     //   "weightUnit": "kg"
//     // },
//     // "dynamicSection": [
//     //   {
//     //     "sectionTitle": "Warranty",
//     //     "content": "1 year manufacturer warranty"
//     //   }
//     // ],
//     // "description": "string",
//     "metaTitle": "string",
//     "metaDescription": "string",
//     // "shortVideoUrl": "https://example.com/short-video.mp4",
//     // "mainImageUrl": "https://example.com/main-image.jpg",
//     // "galleryImageUrls": [
//     //   "https://example.com/image1.jpg"
//     // ],
//     "listingStatus": "DRAFT",
//     "productStatus": "DRAFT",
//     "isActive": true
//   },
//   "isActive": true
// }
