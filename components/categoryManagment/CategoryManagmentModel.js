import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Loader } from "../../modules";
import {
    __getAllComplianceDocumentList,
    __getAttributeSetList,
    __getHsnSetList,
    __getProductCategoryList,
    __getShippingZoneList,
} from "../../utils/api/commonApi";

import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import Form6 from "./Form6";
import Form7 from "./Form7";
import Form8 from "./Form8";
import Form9 from "./Form9";
import Final from "./Final";

import HorizontalStepper from "./HorizontalStepper";
import { ValidateForm } from "./FieldValidation";
import { Colors } from "../../constants/styles";

const initialState = {
    categoryName: "",
    parentCategory: { id: "", name: "None" },
    categoryCode: "",
    slug: "",
    status: "Active",

    selectedSets: [],
    variantAttributes: [],
    selectedDocs: [],
    hsnSetIds: [],
    commissionPercentage: "",
    closingFees: "",
    sellerTierOverrides: [{ sellerTier: "", commissionPercentage: "0" }],
    shippingZoneIds: [],
    icon: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    priorityScore: "0",
    displayOrder: "0",
    visibleForConsumer: true,
    isActive: true,
};
const CategoryManagmentModel = ({
    visible,
    onClose,
    isEdit = false,
    item = null,
}) => {
    const [activeStep, setActiveStep] = useState(0);

    const [state, setState] = useState({
        isLoading: false,
        ...initialState,
        categoryList: [],
        attributeSetList: [],
        documentList: [],
        hsnSetList: [],
        shippingZoneList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));
    const __handleGetData = async () => {
        try {
            const [cList, attra, docList, hsnList, shippingList] =
                await Promise.all([
                    __getProductCategoryList(),
                    __getAttributeSetList(true),
                    __getAllComplianceDocumentList(),
                    __getHsnSetList(),
                    __getShippingZoneList(),
                ]);

            updateState({
                categoryList: cList,
                attributeSetList: attra,
                documentList: docList,
                hsnSetList: hsnList,
                shippingZoneList: shippingList,
            });
        } catch (error) {
            console.log("Error loading data", error);
        }
    };

    useEffect(() => {
        visible && __handleGetData();
    }, [visible]);

    const steps = useMemo(() => {
        const common = [Form1, Form2, Form3, Form4];

        if (state?.parentCategory?.id) {
            return [...common, Form6, Form7, Form8, Form9, Final];
        }

        return [...common, Form5, Form6, Form7, Form8, Form9, Final];
    }, [state?.parentCategory?.id]);

    const CurrentComponent = steps[activeStep];

    const isLastStep = activeStep === steps.length - 1;

    const handleReset = () => {
        setActiveStep(0);
        setState({ ...initialState });
        onClose(true);
    };

    useEffect(() => {
        if (isEdit && item && state?.attributeSetList?.length) {
            const selectedSets = state.attributeSetList.filter((s) =>
                item?.attributeSets
                    ?.map((a) => a.attributeSetId)
                    ?.includes(s.id),
            );

            console.log("selectedSets", selectedSets);
            updateState({ selectedSets });
        }
    }, [item, state?.attributeSetList]);
    useEffect(() => {
        if (isEdit && item && state?.shippingZoneList?.length) {
            const shippingZoneIds = state.shippingZoneList.filter((s) =>
                item?.shippingZoneIds?.includes(s.id),
            );

            updateState({ shippingZoneIds });
        }
    }, [item, state?.shippingZoneList]);

    useEffect(() => {
        if (!isEdit || !item) return;

        updateState({
            categoryName: item?.name || "",

            parentCategory: item?.parentCategory
                ? {
                      id: item.parentCategory.id || "",
                      name: item.parentCategory.name || "None",
                  }
                : { id: "", name: "None" },

            categoryCode: item?.code || "",
            slug: item?.slug || "",
            status: item?.status || "Active",

            variantAttributes:
                item?.variantAttributes?.map((s) => ({
                    name: s.name,
                    attributeId: s.attributeId,
                    type: s.type,
                    isVariant: s.isVariant,
                })) || [],

            selectedDocs:
                item?.complianceDocuments?.map((s) => ({
                    name: s.documentName,
                    id: s.complianceId,
                    isMandatory: s.isMandatory,
                    applicableOn: s.applicableOn,
                })) || [],

            hsnSetIds:
                item?.hsnSets?.map((s) => ({
                    name: s.hsnSetName,
                    id: s.hsnSetId,
                })) || [],

            commissionPercentage:
                item?.commissionPercentage != null
                    ? String(item.commissionPercentage)
                    : "",

            closingFees:
                item?.closingFees != null ? String(item.closingFees) : "",

            sellerTierOverrides:
                item?.sellerTierOverrides?.length > 0
                    ? item.sellerTierOverrides.map((s) => ({
                          sellerTier: s.sellerTier,
                          commissionPercentage:
                              s.commissionPercentage != null
                                  ? String(s.commissionPercentage)
                                  : "0",
                      }))
                    : [{ sellerTier: "", commissionPercentage: "0" }],

            icon: item?.icon || "",
            image: item?.image || "",

            metaTitle: item?.metaTitle || "",
            metaDescription: item?.metaDescription || "",
            canonicalUrl: item?.canonicalUrl || "",

            priorityScore:
                item?.priorityScore != null ? String(item.priorityScore) : "0",

            displayOrder:
                item?.displayOrder != null ? String(item.displayOrder) : "0",

            visibleForConsumer: item?.visibleForConsumer ?? true,
            isActive: item?.isActive ?? true,
        });
    }, [item, isEdit]);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={state.isLoading} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {isEdit ? "Edit Category" : "Create Category"}
                    </Text>
                    <Text style={styles.headerSub}>
                        Multi-step category creation — define hierarchy,
                        attributes, compliance, tax, and more.
                    </Text>
                </View>
                <HorizontalStepper
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    hideTax={state?.parentCategory?.id ? true : null}
                />
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {CurrentComponent && (
                        <CurrentComponent
                            state={state}
                            updateState={updateState}
                            onClose={handleReset}
                            isEdit={isEdit}
                            item={item}
                        />
                    )}
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                    >
                        <Feather
                            name="chevron-left"
                            size={18}
                            color="#64748b"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            activeStep > 0 && setActiveStep((prev) => prev - 1)
                        }
                        style={{
                            ...styles.cancelBtn,
                            padding: 7,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                        }}
                    >
                        <Feather
                            name="chevron-left"
                            size={18}
                            color="#64748b"
                        />
                        <Text style={styles.cancelText}>Previous</Text>
                    </TouchableOpacity>
                    {!isLastStep && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (!ValidateForm(activeStep, state)) return;
                                setActiveStep((prev) => prev + 1);
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
                            <Text style={styles.saveBtnText}>Next Step</Text>
                            <Feather
                                name="chevron-right"
                                size={18}
                                color={Colors.whiteColor}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    header: { padding: 20, backgroundColor: "#f8f9fa" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1a1b1e" },
    headerSub: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15 },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
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
});

export default CategoryManagmentModel;
