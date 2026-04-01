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
    Switch,
    Alert,
} from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DropDownTextAreaBox, Loader } from "../../modules";
import { __formatDate2 } from "../../utils/funtion";
import TaxComponentsBox from "../form/com/TaxComponentsBox";
import {
    __getTaxJurisdictionsList,
    __getTaxTypeList,
} from "../../utils/api/commonApi";
import { Colors } from "../../constants/styles";
import { __patchApiData, __postApiData } from "../../utils/api";
const validateTaxComponents = (list = []) => {
    if (!Array.isArray(list) || list.length === 0) return false;

    for (let i = 0; i < list.length; i++) {
        const { taxComponent, rate, jurisdiction } = list[i];

        if (!taxComponent) {
            return false;
        }

        if (rate === "" || rate === null || isNaN(rate) || Number(rate) <= -1) {
            return false;
        }

        if (!jurisdiction) {
            return false;
        }
    }

    return true;
};

const TaxSlabModal = ({ visible, onClose, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        code: "",
        rate: "",
        effectiveFrom: null,
        effectiveUpTo: null,
        taxTypeId: null,
        taxJurId: null,
        description: "",
        isActive: true,
        taxComponents: [{ taxComponent: null, rate: "", jurisdiction: null }],
        //
        taxTypeList: [],
        taxJurisdictionsList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const validateForm = () => {
        if (!state?.name?.trim()) {
            Alert.alert("Validation Error", "Tax name is required");
            return false;
        }

        if (state?.name.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Tax name must be at least 2 characters",
            );
            return false;
        }

        if (!state?.rate?.trim()) {
            Alert.alert("Validation Error", "Rate(%) is required");
            return false;
        }

        if (!state?.effectiveFrom) {
            Alert.alert("Validation Error", "Please select Effective From");
            return false;
        }
        if (!state?.effectiveUpTo) {
            Alert.alert("Validation Error", "Please select Effective UpTo");
            return false;
        }

        if (!state?.taxTypeId) {
            Alert.alert("Validation Error", "Please select tax type");
            return false;
        }
        if (!state?.taxJurId) {
            Alert.alert("Validation Error", "Please select tax Jurisdiction");
            return false;
        }
        if (!state?.description?.trim()) {
            Alert.alert("Validation Error", "description should not be empty");
            return false;
        }
        if (!validateTaxComponents(state.taxComponents)) {
            Alert.alert(
                "Validation Error",
                "Please complete all tax component fields",
            );
            return false;
        }
        return true;
    };
    const __handleSave = () => {
        console.log("first");
        if (!validateForm()) return;
        try {
            updateState({ isLoading: true });

            const payload = {
                name: state?.name.trim(),
                code: state?.code.trim(),
                description: state?.description,
                rate: Number(state?.rate.trim()),
                taxTypeId: state?.taxTypeId?.id,
                taxTypeName: state?.taxTypeId?.name,
                jurisdictionId: state?.taxJurId?.id,
                jurisdictionName: state?.taxJurId?.name,
                effectiveFrom: new Date(state?.effectiveFrom),
                ...(state?.effectiveUpTo && {
                    effectiveUpTo: new Date(state?.effectiveUpTo),
                }),
                isActive: state?.isActive,
                components: state?.taxComponents.map((taxC) => ({
                    type: taxC?.taxComponent?.id,
                    typeName: taxC?.taxComponent?.name,
                    rate: Number(taxC?.rate.trim()),
                    applicableWhen: taxC?.jurisdiction?.id,
                })),
            };

            __postApiData("/taxSlabs/createTaxSlab", payload)
                .then((res) => {
                    updateState({ isLoading: false });

                    if (res?.success) {
                        Alert.alert("Success", res.message);
                        onClose();
                    } else {
                        Alert.alert("Error", res?.message || "Failed");
                        updateState({ isLoading: false });
                    }
                })
                .catch(() => {
                    Alert.alert("Error", "Something went wrong");
                    updateState({ isLoading: false });
                });
        } catch (error) {
            updateState({ isLoading: false });
        }
    };
    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ isLoading: true });
        const payload = {
            name: state?.name.trim(),
            code: state?.code.trim(),
            description: state?.description,
            rate: Number(state?.rate.trim()),
            taxTypeId: state?.taxTypeId?.id,
            taxTypeName: state?.taxTypeId?.name,
            jurisdictionId: state?.taxJurId?.id,
            jurisdictionName: state?.taxJurId?.name,
            effectiveFrom: new Date(state?.effectiveFrom),
            ...(state?.effectiveUpTo && {
                effectiveUpTo: new Date(state?.effectiveUpTo),
            }),
            isActive: state?.isActive,
            components: state?.taxComponents.map((taxC) => ({
                type: taxC?.taxComponent?.id,
                typeName: taxC?.taxComponent?.name,
                rate: Number(taxC?.rate.trim()),
                applicableWhen: taxC?.jurisdiction?.id,
            })),
        };
        console.log(JSON.stringify(payload));

        __patchApiData("/taxSlabs/updateTaxSlabById/" + item?._id, payload)
            .then((res) => {
                console.log(JSON.stringify(res));
                updateState({ isLoading: false });

                if (res?.success) {
                    Alert.alert("", res.message);
                    onClose();
                } else {
                    Alert.alert("", res.message);
                }
            })
            .catch((error) => {
                Alert.alert("", "Failed");
                updateState({ isLoading: false });
            });
    };

    const __handleGetData = async () => {
        try {
            const taxType = await __getTaxTypeList();
            const taxJur = await __getTaxJurisdictionsList();
            updateState({
                taxTypeList: taxType,
                taxJurisdictionsList: taxJur,
            });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    useEffect(() => {
        if (isEdit && item && visible) {
            updateState({
                // name: item?.name,
                // code: item?.code,
                // rate: String(item?.rate),
                // effectiveFrom: item?.effectiveFrom,
                // effectiveUpTo: item?.effectiveUpTo || null,
                // taxTypeId: item?.taxTypeId
                //     ? {
                //           ...item?.taxTypeId,
                //           id: item?.taxTypeId?._id,
                //       }
                //     : null,
                // description: item?.description,
                // isActive: item?.isActive,
                // taxComponents: item?.components?.map((taxC) => ({
                //     taxComponent: {
                //         id: taxC?.type?._id,
                //         name: taxC?.type?.name,
                //     },
                //     rate: String(taxC?.rate),
                //     jurisdiction: {
                //         id: taxC?.applicableWhen,
                //         name: taxC?.applicableWhen?.split("_").join(" "),
                //     },
                // })),
                // taxJurId: item?.jurisdictionId
                //     ? {
                //           ...item?.jurisdictionId,
                //           id: item?.jurisdictionId?._id,
                //       }
                //     : null,
            });
        }
    }, [isEdit, item, visible]);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={state.isLoading} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Add Tax Type</Text>
                    <Text style={styles.headerSub}>
                        Set up the tax rate and conditions for this slab before
                        saving.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        <View
                            style={{
                                backgroundColor: "#F8FAFC",

                                padding: 16,
                                marginHorizontal: -16,
                                marginTop: -16,
                                borderBottomWidth: 1,
                                borderColor: "#e9ecef",
                                marginBottom: 10,
                            }}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>
                                    Slab Details
                                </Text>
                                <Feather
                                    name="info"
                                    size={18}
                                    color="#0070ba"
                                />
                            </View>
                            <Text style={styles.cardSub}>
                                Enter and manage configuration details for this
                                tax slab.
                            </Text>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tax Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., GST 18%, UAE VAT"
                                value={state.name}
                                onChangeText={(val) =>
                                    updateState({ name: val })
                                }
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Code *</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        isEdit && styles.disabledInput,
                                    ]}
                                    placeholder="Enter Code"
                                    value={state.code}
                                    editable={!isEdit}
                                    onChangeText={(val) =>
                                        updateState({ code: val })
                                    }
                                />
                            </View>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Rate (%)</Text>
                                <View style={styles.inputWithIcon}>
                                    <TextInput
                                        style={styles.flex1}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        value={state.rate}
                                        onChangeText={(val) =>
                                            updateState({ rate: val })
                                        }
                                    />
                                    <Text style={styles.unitText}>%</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Tax Type *</Text>
                                <DropDownTextAreaBox
                                    type="select"
                                    placeholder={"Select Type"}
                                    list={state?.taxTypeList}
                                    value={state.taxTypeId}
                                    isSearchable
                                    inputCustomStyle={{}}
                                    onSelected={(value) => {
                                        updateState({
                                            taxTypeId: value,
                                        });
                                    }}
                                    customStyle={{ marginBottom: 5, flex: 1 }}
                                />
                            </View>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Jurisdiction *</Text>
                                <DropDownTextAreaBox
                                    type="select"
                                    placeholder={"Select Jurisdiction"}
                                    list={state?.taxJurisdictionsList}
                                    value={state.taxJurId}
                                    isSearchable
                                    inputCustomStyle={{}}
                                    onSelected={(value) => {
                                        updateState({
                                            taxJurId: value,
                                        });
                                    }}
                                    customStyle={{ marginBottom: 5, flex: 1 }}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>
                                    Effective From *
                                </Text>
                                <DropDownTextAreaBox
                                    type="date"
                                    placeholder={"Pick Date"}
                                    list={state?.taxTypeList}
                                    value={
                                        state.effectiveFrom
                                            ? __formatDate2(state.effectiveFrom)
                                            : null
                                    }
                                    onSelected={(value) => {
                                        updateState({
                                            effectiveFrom: value,
                                        });
                                    }}
                                />
                            </View>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Effective UpTo</Text>
                                <DropDownTextAreaBox
                                    type="date"
                                    placeholder={"Pick Date"}
                                    value={
                                        state.effectiveUpTo
                                            ? __formatDate2(state.effectiveUpTo)
                                            : null
                                    }
                                    onSelected={(value) => {
                                        updateState({
                                            effectiveUpTo: value,
                                        });
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{}}>
                            <Text style={styles.label}>Description *</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="e.g. Standard rate (electronics)"
                                multiline
                                numberOfLines={4}
                                value={state.description}
                                onChangeText={(val) =>
                                    updateState({ description: val })
                                }
                            />
                        </View>
                    </View>

                    {/* 6. Tax Components Section */}
                    <View style={styles.mainCard}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.cardHeaderText}>
                                Tax Components
                            </Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 6,
                                        backgroundColor: Colors.primaryColor,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 6,
                                    }}
                                    onPress={() => {
                                        updateState({
                                            taxComponents: [
                                                ...state.taxComponents,
                                                {
                                                    taxComponent: null,
                                                    rate: "",
                                                    jurisdiction: null,
                                                },
                                            ],
                                        });
                                    }}
                                >
                                    <FontAwesome6
                                        name="plus"
                                        size={14}
                                        color={Colors.whiteColor}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: Colors.whiteColor,
                                        }}
                                    >
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TaxComponentsBox
                            value={state.taxComponents}
                            taxTypeList={state.taxTypeList}
                            onChange={(list) =>
                                updateState({ taxComponents: list })
                            }
                        />
                    </View>

                    {/* 7. Active Toggle */}
                    <View style={styles.statusRow}>
                        <Text style={styles.statusTitle}>Active</Text>
                        <Switch
                            value={state.isActive}
                            onValueChange={(val) =>
                                updateState({ isActive: val })
                            }
                            trackColor={{ false: "#cbd5e1", true: "#0070ba" }}
                        />
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                    >
                        <Feather
                            name="chevron-left"
                            size={20}
                            color="#868e96"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            isEdit ? __handleEditSave() : __handleSave()
                        }
                    >
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>
                                {isEdit ? "Update" : "Save"}
                            </Text>
                            <Feather
                                name="chevron-right"
                                size={20}
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
    content: { flex: 1, padding: 16 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e9ecef",
        overflow: "hidden",
        marginBottom: 16,
        overflow: "hidden",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: { fontSize: 16, fontWeight: "700", color: "#1a1b1e" },
    cardSub: { fontSize: 12, color: "#868e96", marginTop: 4 },
    cardHeaderText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#1e293b",
        textTransform: "uppercase",
    },
    inputGroup: { marginBottom: 16 },
    row: { flexDirection: "row", gap: 12, marginBottom: 15 },
    flex1: { flex: 1 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    disabledInput: { backgroundColor: "#f8fafc", color: "#94a3b8" },
    textArea: { height: 80, textAlignVertical: "top" },
    inputWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    unitText: { color: "#64748b", fontWeight: "700" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        padding: 12,
        height: 48,
    },
    dropdownText: { fontSize: 14, color: "#1e293b", flex: 1 },
    datePicker: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        padding: 12,
        height: 48,
    },
    dateText: { fontSize: 14, color: "#1e293b" },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    statusTitle: { fontSize: 15, fontWeight: "700", color: "#1e293b" },
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

export default TaxSlabModal;
