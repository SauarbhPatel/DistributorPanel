import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getAllComplianceDocumentList,
    __getAttributeSetList,
    __getHsnCodeList,
    __getHsnSetList,
    __getShippingList,
} from "../../utils/api/commonApi";
import SingleSelectTab from "../common/SingleSelectTab";
import VariationRuleCard from "./com/VariationRuleCard";
import CommissionConfigCard from "./com/CommissionConfigCard";

const CreateCategoryManagment = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
}) => {
    const [state, setState] = useState({
        //
        categoryName: "",
        code: "",
        displayOrder: "1",
        statusId: null,
        isActive: true,
        visibleForConsumer: true,
        //
        attributeSetId: null,
        variantAttributes: [],
        //
        complianceDocuments: [],
        //
        hsnsetId: null,
        //
        commissionPercentage: "",
        closingFees: "",
        sellerTierOverrides: [
            {
                id: Date.now().toString(),
                sellerTier: "",
                commissionPercentage: "",
            },
        ],
        //
        canonicalUrl: "",
        priorityScore: "0",
        shippingRuleId: null,
        //

        metaTitle: "",
        metaDescription: "",
        loading: false,
        //
        hsnCodeList: [],
        attributeList: [],
        complianceDocumentList: [],
        shippingList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        commissionPercentage,
        closingFees,
        sellerTierOverrides,
        loading,
        metaTitle,
        metaDescription,
        categoryName,
        code,
        displayOrder,
        isActive,
        statusId,
        hsnsetId,
        attributeSetId,
        visibleForConsumer,
        variantAttributes,
        complianceDocuments,
        canonicalUrl,
        priorityScore,
        shippingRuleId,
        //
        hsnCodeList,
        attributeList,
        complianceDocumentList,
        shippingList,
    } = state;

    const validateForm = () => {
        // 1. String & Text Field Validations
        if (!categoryName?.trim()) {
            Alert.alert("Validation Error", "Category name is required");
            return false;
        }
        if (categoryName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Category name must be at least 2 characters",
            );
            return false;
        }
        if (!code?.trim()) {
            Alert.alert("Validation Error", "Code is required");
            return false;
        }

        // 2. Dropdown / Object Reference Validations
        if (!statusId || !statusId.id) {
            Alert.alert("Validation Error", "Status is required");
            return false;
        }
        if (!attributeSetId || !attributeSetId.id) {
            Alert.alert("Validation Error", "Attribute set is required");
            return false;
        }
        if (!hsnsetId || !hsnsetId.id) {
            Alert.alert("Validation Error", "HSN code is required");
            return false;
        }

        // 3. Numeric Field Validations
        // Check if displayOrder is empty or not a valid number
        if (
            displayOrder === "" ||
            displayOrder === null ||
            isNaN(Number(displayOrder))
        ) {
            Alert.alert(
                "Validation Error",
                "Display order must be a valid number",
            );
            return false;
        }

        // Commission Percentage should be a number between 0 and 100
        const commPct = Number(commissionPercentage);
        if (
            commissionPercentage === "" ||
            commissionPercentage === null ||
            isNaN(commPct) ||
            commPct < 0 ||
            commPct > 100
        ) {
            Alert.alert(
                "Validation Error",
                "Commission percentage must be a valid number between 0 and 100",
            );
            return false;
        }

        // Closing Fees should be a valid positive number
        const fees = Number(closingFees);
        if (
            closingFees === "" ||
            closingFees === null ||
            isNaN(fees) ||
            fees < 0
        ) {
            Alert.alert(
                "Validation Error",
                "Closing fees must be a valid positive number",
            );
            return false;
        }

        if (
            priorityScore === "" ||
            priorityScore === null ||
            isNaN(Number(priorityScore))
        ) {
            Alert.alert(
                "Validation Error",
                "Priority score must be a valid number",
            );
            return false;
        }

        // 4. Nested Array Validations (Seller Tiers)
        if (sellerTierOverrides && sellerTierOverrides.length > 0) {
            for (let i = 0; i < sellerTierOverrides.length; i++) {
                const override = sellerTierOverrides[i];

                if (!override?.sellerTier) {
                    Alert.alert(
                        "Validation Error",
                        `Seller tier is required for override at row ${i + 1}`,
                    );
                    return false;
                }

                const overrideComm = Number(override?.commissionPercentage);
                if (
                    override?.commissionPercentage === "" ||
                    override?.commissionPercentage === null ||
                    isNaN(overrideComm) ||
                    overrideComm < 0 ||
                    overrideComm > 100
                ) {
                    Alert.alert(
                        "Validation Error",
                        `Please enter a valid commission percentage (0-100) for seller tier: ${override.sellerTier}`,
                    );
                    return false;
                }
            }
        }

        // If all checks pass
        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        const payload = {
            name: categoryName,
            code: code,
            ...(parentId && { parentId: parentId }),
            status: statusId?.id,
            displayOrder: Number(displayOrder),
            isActive: isActive,
            visibleForConsumer: visibleForConsumer,
            //

            attributeSetId: attributeSetId?.id,
            variantAttributes: variantAttributes.map((ids) => {
                const cloneData = ids;
                delete cloneData?._id;
                delete cloneData?.isMandatory;
                return {
                    ...cloneData,
                };
            }),
            //
            complianceDocuments: complianceDocuments.map((ids) => ({
                complianceId: ids?.id,
                documentName: ids?.name,
            })),
            hsnSetId: hsnsetId?.id,
            commissionPercentage: Number(commissionPercentage),
            closingFees: Number(closingFees),
            sellerTierOverrides: sellerTierOverrides?.map((ids) => ({
                sellerTier: ids?.sellerTier,
                commissionPercentage: Number(ids?.commissionPercentage),
            })),
            // shippingRuleId: shippingRuleId?.id,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            canonicalUrl: canonicalUrl,
            priorityScore: Number(priorityScore),
        };
        console.log(JSON.stringify(payload));
        updateState({ loading: true });

        __postApiData("/categories/createCategory", payload)
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
            updateState({ loading: true });
            const payload = {
                name: categoryName,
                code: code,

                status: statusId?.id,
                displayOrder: Number(displayOrder),
                isActive: isActive,
                visibleForConsumer: visibleForConsumer,
                //

                attributeSetId: attributeSetId?.id,
                variantAttributes: variantAttributes.map((ids) => {
                    const cloneData = ids;
                    delete cloneData?._id;
                    delete cloneData?.isMandatory;
                    return {
                        ...cloneData,
                    };
                }),
                //
                complianceDocuments: complianceDocuments.map((ids) => ({
                    complianceId: ids?.id,
                    documentName: ids?.name,
                })),
                hsnSetId: hsnsetId?.id,
                commissionPercentage: Number(commissionPercentage),
                closingFees: Number(closingFees),
                sellerTierOverrides: sellerTierOverrides?.map((ids) => ({
                    sellerTier: ids?.sellerTier,
                    commissionPercentage: Number(ids?.commissionPercentage),
                })),
                // shippingRuleId: shippingRuleId?.id,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                canonicalUrl: canonicalUrl,
                priorityScore: Number(priorityScore),
            };

            console.log(JSON.stringify(payload));

            __patchApiData(
                "/categories/updateCategoryById/" + item?._id,
                payload,
            )
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

    useEffect(() => {
        if (isEdit) {
            console.log(JSON.stringify(item));
            updateState({
                //
                categoryName: item?.name,
                code: item?.code,
                displayOrder: String(item?.displayOrder),
                statusId: {
                    id: item?.status,
                    name: item?.status,
                },
                isActive: item?.isActive,
                visibleForConsumer: item?.visibleForConsumer,
                //
                attributeSetId: item?.attributeSetId
                    ? {
                          id: item?.attributeSetId,
                          name: item?.attributeSetName,
                      }
                    : null,
                variantAttributes: item?.variantAttributes,
                //
                complianceDocuments: item?.complianceDocuments?.map((ids) => ({
                    id: ids?.complianceId,
                    name: ids?.documentName,
                })),
                //
                hsnsetId: item?.hsnSetId
                    ? {
                          id: item?.hsnSetId,
                          name: item?.hsnSetName,
                      }
                    : null,
                //
                commissionPercentage: String(item?.commissionPercentage),
                closingFees: String(item?.closingFees),
                sellerTierOverrides: item?.sellerTierOverrides?.map((ids) => ({
                    sellerTier: ids?.sellerTier,
                    commissionPercentage: String(ids?.commissionPercentage),
                })),
                //

                metaTitle: item?.metaTitle,
                metaDescription: item?.metaDescription,
                canonicalUrl: item?.canonicalUrl,
                priorityScore: String(item?.priorityScore),
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            updateState({ loading: true });

            const code = await __getHsnSetList(true);
            const attra = await __getAttributeSetList(true);
            const compli = await __getAllComplianceDocumentList();
            const shipin = await __getShippingList();
            updateState({
                hsnCodeList: code,
                attributeList: attra,
                complianceDocumentList: compli,
                shippingList: shipin,
                loading: false,
            });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <>
            <Loader isShow={loading} />

            <View
                style={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    gap: 12,
                }}
            >
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Hierarchy & Basic Information</Text>

                    <View style={{}}>
                        <TextAreaBox
                            title="Category Name"
                            placeholder="e.g., Electronics, Fashion"
                            required
                            value={categoryName}
                            valuekey="categoryName"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                        <TextAreaBox
                            title="Category Code"
                            placeholder=""
                            required
                            value={code}
                            valuekey="code"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />

                        <TextAreaBox
                            title="Display Order"
                            placeholder=""
                            value={displayOrder}
                            valuekey="displayOrder"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                            keyboardType="numeric"
                        />
                    </View>
                    <DropDownTextAreaBox
                        type="select"
                        title={"Status"}
                        required
                        placeholder={"Select Status"}
                        list={[
                            { id: "DRAFT", name: "DRAFT" },
                            { id: "SUBMIT", name: "SUBMIT" },
                            { id: "APPROVED", name: "APPROVED" },
                            { id: "REJECTED", name: "REJECTED" },
                        ]}
                        value={statusId}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                statusId: value,
                            });
                        }}
                        editable={!isEdit}
                    />
                    {/* Active Status */}
                    <View style={styles.statusBox}>
                        <View>
                            <Text style={Fonts.blackColor15Medium}>Active</Text>
                        </View>
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
                    <View style={styles.statusBox}>
                        <View>
                            <Text style={Fonts.blackColor15Medium}>
                                Enabled
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.grayColor14Medium,
                                    fontSize: 10,
                                }}
                            >
                                Category is visible to customers
                            </Text>
                        </View>
                        <Switch
                            value={visibleForConsumer}
                            onValueChange={(value) =>
                                updateState({ visibleForConsumer: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Attribute Set Configuration</Text>
                    <DropDownTextAreaBox
                        type="select"
                        title={"Attribute Set"}
                        placeholder={"Select Attribute Set"}
                        required
                        list={attributeList}
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
                                variantAttributes: [],
                            });
                        }}
                    />
                    {attributeSetId && (
                        <VariationRuleCard
                            attributes={attributeSetId?.attributes}
                            onSelected={(value) =>
                                updateState({
                                    variantAttributes: value,
                                })
                            }
                        />
                    )}
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Compliance Configuration</Text>

                    <DropDownTextAreaBox
                        type="select_multi"
                        title={"Document types (from Compliance manager)"}
                        required
                        list={complianceDocumentList}
                        value={complianceDocuments}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                complianceDocuments: value,
                            });
                        }}
                        editable={!isEdit}
                    />
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Tax Rules</Text>
                    <DropDownTextAreaBox
                        type="select"
                        title={"HSN Set"}
                        placeholder={"Select HSN Set"}
                        required
                        list={hsnCodeList}
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
                        // editable={!isEdit}
                    />
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Commission & Pricing Control</Text>
                    <CommissionConfigCard
                        data={{
                            commissionPercentage,
                            closingFees,
                            sellerTierOverrides,
                        }}
                        onChange={(value) => {
                            console.log(value);
                            updateState({ ...value });
                            // {"closingFee": "9", "commissionPercentage": "5", "sellerTierOverrides": [{"commissionPercentage": "5", "id": "1771823235473", "sellerTier": "F"}]}
                        }}
                    />
                </View>
                {/* <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Shipping & Logistics Rules</Text>
                    <DropDownTextAreaBox
                        type="select"
                        title={"Shipping Template"}
                        placeholder={"Select Shipping Template"}
                        required
                        list={shippingList}
                        value={shippingRuleId}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                shippingRuleId: value,
                            });
                        }}
                        // editable={!isEdit}
                    />
                </View> */}
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>SEO Settings</Text>

                    <TextAreaBox
                        title="Meta Title"
                        placeholder="SEO title for search engines"
                        value={metaTitle}
                        valuekey="metaTitle"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                    <TextAreaBox
                        title="Meta Description"
                        placeholder="Brief summary for search results"
                        value={metaDescription}
                        valuekey="metaDescription"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                    <TextAreaBox
                        title="Canonical URL"
                        placeholder=""
                        value={canonicalUrl}
                        valuekey="canonicalUrl"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                    <TextAreaBox
                        title="Priority Score (0–100)"
                        placeholder=""
                        value={priorityScore}
                        valuekey="priorityScore"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                        keyboardType="number-pad"
                    />
                </View>

                {/* Action Buttons */}
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

export default CreateCategoryManagment;
const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const labelStyle = {
    ...Fonts.blackColor14Medium,
};

const hintText = {
    ...Fonts.grayColor11Regular,
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
};
