import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DropDownTextAreaBox } from "../../../modules";
import CommonBox from "./CommonBox";
import InfoBox from "./InfoBox";

const CategoryAndBrand = ({ state, updateState }) => {
    return (
        <View style={{}}>
            <InfoBox
                title="Category & Brand"
                subtitle="Configure tax rates and upload necessary compliance documents for your products."
            />
            <CommonBox
                title="Hierarchy & Basic Information"
                subtitle="Define where this category sits in the tree and set foundational metadata."
                footerNote="Enter a clear, user-friendly name for the category."
                body={
                    <>
                        <View style={styles.inputGroup}>
                            <DropDownTextAreaBox
                                title="Category"
                                required
                                type="select"
                                placeholder={"Select Category"}
                                list={state?.categoryList}
                                value={state.categoryId}
                                isSearchable
                                inputCustomStyle={{}}
                                onSelected={(value) => {
                                    console.log(value);
                                    updateState({
                                        categoryId: value,
                                    });
                                }}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 0,
                                }}
                                customStyle={{ marginBottom: 5, flex: 1 }}
                                rightIcon={
                                    state?.categoryLoading ? (
                                        <ActivityIndicator
                                            size={"small"}
                                            color="#9ca3af"
                                        />
                                    ) : null
                                }
                            />

                            {state?.categoryList?.length ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 5,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {state?.categoryList
                                        ?.slice(0, 5)
                                        ?.map((category) => (
                                            <Text
                                                key={
                                                    category.id +
                                                    "_" +
                                                    category._id
                                                }
                                                onPress={() =>
                                                    updateState({
                                                        categoryId: category,
                                                    })
                                                }
                                                style={{
                                                    fontSize: 12,
                                                    color:
                                                        state.categoryId?.id ===
                                                        category.id
                                                            ? "#3b82f6"
                                                            : "#9ca3af",
                                                    backgroundColor:
                                                        state.categoryId?.id ===
                                                        category.id
                                                            ? "#3b82f630"
                                                            : "#f3f4f6",
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 2,
                                                    borderRadius: 6,
                                                    borderWidth: 0.5,
                                                    borderColor:
                                                        state.categoryId?.id ===
                                                        category.id
                                                            ? "#3b82f6"
                                                            : "#d1d5db",
                                                }}
                                            >
                                                {category.name}
                                            </Text>
                                        ))}
                                </View>
                            ) : null}
                        </View>
                        <View style={styles.inputGroup}>
                            {/* <Text style={styles.label}> *</Text> */}
                            <DropDownTextAreaBox
                                title="Brand"
                                required
                                type="select"
                                placeholder={"Select Brand"}
                                list={state?.brandList}
                                value={state.brandId}
                                isSearchable
                                inputCustomStyle={{}}
                                onSelected={(value) => {
                                    console.log(value);
                                    updateState({
                                        brandId: value,
                                    });
                                }}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 0,
                                }}
                                customStyle={{ marginBottom: 0, flex: 1 }}
                                rightIcon={
                                    state?.brandLoading ? (
                                        <ActivityIndicator
                                            size={"small"}
                                            color="#9ca3af"
                                        />
                                    ) : null
                                }
                            />
                        </View>

                        <View>
                            <Text style={{ fontSize: 12 }}>
                                ➕ Create "Generic" brand if not found
                            </Text>
                        </View>
                    </>
                }
            />
        </View>
    );
};

export default CategoryAndBrand;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    body: {
        padding: 16,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    required: {
        color: "#ef4444",
    },

    optional: {
        color: "#9ca3af",
        fontSize: 11,
    },

    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        backgroundColor: "#fff",
    },

    disabledInput: {
        backgroundColor: "#f3f4f6",
        color: "#9ca3af",
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
    },

    dropdownText: {
        fontSize: 14,
        color: "#374151",
    },

    helper: {
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 5,
    },

    footerNote: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 6,
    },

    footerText: {
        fontSize: 11,
        color: "#6b7280",
        flex: 1,
    },
});
