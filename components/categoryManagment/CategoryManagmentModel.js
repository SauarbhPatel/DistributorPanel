import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../../modules";
import { Alert } from "react-native";
import { __postApiData, __patchApiData } from "../../utils/api";
import Form1 from "./Form1";
import HorizontalStepper from "./HorizontalStepper";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import {
    __getAttributeSetList,
    __getProductCategoryList,
    __getTaxTypeList,
} from "../../utils/api/commonApi";
import { ValidateForm } from "./FieldValidation";

const CategoryManagmentModel = ({
    visible,
    onClose,
    isEdit = false,
    item = null,
}) => {
    const [activeStep, setActiveStep] = useState(0);

    const [state, setState] = useState({
        isLoading: false,
        //
        categoryName: "",
        parentCategory: { id: "", name: "None" },
        categoryCode: "",
        slug: "",
        status: "Active",

        //
        categoryList: [],
        attributeSetList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));
    const __handleGetData = async () => {
        try {
            const cList = await __getProductCategoryList();
            const attra = await __getAttributeSetList(true);
            updateState({
                categoryList: cList,
                attributeSetList: attra,
            });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);
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
                    hideTax={state?.parentCategory ? true : null}
                />
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{ display: activeStep == 0 ? "flex" : "none" }}
                    >
                        <Form1 state={state} updateState={updateState} />
                    </View>
                    <View
                        style={{ display: activeStep == 1 ? "flex" : "none" }}
                    >
                        <Form2 state={state} updateState={updateState} />
                    </View>
                    <View
                        style={{ display: activeStep == 2 ? "flex" : "none" }}
                    >
                        <Form3 />
                    </View>
                    <View
                        style={{ display: activeStep == 3 ? "flex" : "none" }}
                    >
                        <Form4 />
                    </View>
                    <View
                        style={{ display: activeStep == 4 ? "flex" : "none" }}
                    >
                        <Form5 />
                    </View>
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
                        activeOpacity={0.8}
                        onPress={() => {
                            if (!ValidateForm(Number(activeStep), state))
                                return;
                            setActiveStep(activeStep + 1);
                        }}
                    >
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>Next Step</Text>
                            <Feather
                                name="chevron-right"
                                size={18}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
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
