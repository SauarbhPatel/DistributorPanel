import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";

const CreateProductAttribute = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        loading: false,
        //
        attributeName: "",
        attributeType: "SELECT",
        code: "",
        abbreviation: "",
        characterLimit: null,
        description: "",
        minRangeValue: null,
        maxRangeValue: null,
        unit: "",
        status: "DRAFT",
        scope: "GLOBAL",

        //
        isFilterable: false,
        isVariant: false,
        isActive: true,
        isSearchable: false,
        isSortable: false,
        isComparable: false,
        isVisibleOnFrontend: true,
        isEditableAfterApproval: false,
        //
        pills: false,
        radioButton: false,
        select: false,
        color: false,
        multiCheckbox: false,
        thumbnail: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        loading,
        attributeName,
        attributeType,
        code,
        abbreviation,
        characterLimit,
        description,
        minRangeValue,
        maxRangeValue,
        unit,
        status,
        scope,
        //
        isActive,
        isFilterable,
        isVariant,
        isSearchable,
        isSortable,
        isComparable,
        isVisibleOnFrontend,
        isEditableAfterApproval,
        //
        pills,
        radioButton,
        select,
        color,
        multiCheckbox,
        thumbnail,
    } = state;

    const validateForm = () => {
        if (!attributeName?.trim()) {
            Alert.alert("Validation Error", "Attribute name is required");
            return false;
        }

        if (attributeName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Attribute name must be at least 2 characters",
            );
            return false;
        }
        if (!code?.trim()) {
            Alert.alert("Validation Error", "Attribute code is required");
            return false;
        }
        if (
            minRangeValue &&
            maxRangeValue &&
            Number(minRangeValue) >= Number(maxRangeValue)
        ) {
            Alert.alert(
                "Validation Error",
                `Min value must be less than Max value`,
            );
            return false;
        }
        // if (!characterLimit && attributeType === "TEXT") {
        //     Alert.alert(
        //         "Validation Error",
        //         "Character limit is required for TEXT attributes",
        //     );
        //     return false;
        // }

        return true;
    };
    // const addValue = () => {
    //     if (valueInput?.trim()) {
    //         updateState({
    //             values: [...values, ...valueInput?.split(",")],
    //             valueInput: "",
    //         });
    //     }
    // };
    // const removeValue = (index) => {
    //     // const updatedValues = values.filter((_, i) => i !== index);
    //     // updateState({ values: updatedValues });
    //     Alert.alert(
    //         "Remove Value",
    //         "Are you sure you want to remove this value?",
    //         [
    //             { text: "Cancel", style: "cancel" },
    //             {
    //                 text: "Remove",
    //                 style: "destructive",
    //                 onPress: () => {
    //                     const updatedValues = values.filter(
    //                         (_, i) => i !== index,
    //                     );
    //                     updateState({ values: updatedValues });
    //                 },
    //             },
    //         ],
    //     );
    // };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __postApiData("/productAttributes/createAttribute", {
            name: attributeName,
            code: code,
            abbreviation: abbreviation,
            description: description,
            type: attributeType,
            status: status,
            scope: scope,
            ...(attributeType === "TEXT" &&
                characterLimit != null &&
                characterLimit != "" && {
                    characterLimit: Number(characterLimit),
                }),

            ...(["NUMBER", "UNIT_RANGE"].includes(attributeType) &&
                minRangeValue != null &&
                minRangeValue != "" && {
                    minRangeValue: Number(minRangeValue),
                }),
            ...(["NUMBER", "UNIT_RANGE"].includes(attributeType) &&
                maxRangeValue != null &&
                maxRangeValue != "" && {
                    maxRangeValue: Number(maxRangeValue),
                }),
            ...(attributeType === "UNIT_RANGE" &&
                unit != null &&
                unit != "" && { unit: unit }),
            //
            isFilterable: isFilterable,
            isVariant: isVariant,
            isSearchable: isSearchable,
            isSortable: isSortable,
            isComparable: isComparable,
            isVisibleOnFrontend: isVisibleOnFrontend,
            isEditableAfterApproval: isEditableAfterApproval,
            isActive: isActive,
            displayType: {
                pills,
                radioButton,
                select,
                color,
                multiCheckbox,
                thumbnail,
            },
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
        updateState({ loading: true });

        __patchApiData("/productAttributes/updateAttibuteBy/" + item?._id, {
            ...(attributeName != item?.name && { name: attributeName }),
            ...(code != item?.code && { code: code }),
            ...(abbreviation != item?.abbreviation && {
                abbreviation: abbreviation,
            }),
            ...(description != item?.description && {
                description: description,
            }),
            type: attributeType,

            status: status,
            scope: scope,
            ...(attributeType === "TEXT" &&
                characterLimit != null &&
                characterLimit != "" && {
                    characterLimit: Number(characterLimit),
                }),

            ...(["NUMBER", "UNIT_RANGE"].includes(attributeType) &&
                minRangeValue != null &&
                minRangeValue != "" && {
                    minRangeValue: Number(minRangeValue),
                }),
            ...(["NUMBER", "UNIT_RANGE"].includes(attributeType) &&
                maxRangeValue != null &&
                maxRangeValue != "" && {
                    maxRangeValue: Number(maxRangeValue),
                }),
            ...(attributeType === "UNIT_RANGE" &&
                unit != null &&
                unit != "" && { unit: unit }),
            //
            isFilterable: isFilterable,
            isVariant: isVariant,
            isSearchable: isSearchable,
            isSortable: isSortable,
            isComparable: isComparable,
            isVisibleOnFrontend: isVisibleOnFrontend,
            isEditableAfterApproval: isEditableAfterApproval,
            isActive: isActive,
            displayType: {
                pills,
                radioButton,
                select,
                color,
                multiCheckbox,
                thumbnail,
            },
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

    useEffect(() => {
        if (isEdit) {
            updateState({
                attributeName: item?.name,
                code: item?.code,
                abbreviation: item?.abbreviation,
                description: item?.description,
                attributeType: item?.type,
                status: item?.status,
                scope: item?.scope,
                characterLimit: item?.characterLimit || null,
                minRangeValue: item?.minRangeValue || null,
                maxRangeValue: item?.maxRangeValue || null,
                unit: item?.unit,
                isFilterable: item?.isFilterable || false,
                isVariant: item?.isVariant || false,
                isSearchable: item?.isSearchable || false,
                isSortable: item?.isSortable || false,
                isComparable: item?.isComparable || false,
                isVisibleOnFrontend: item?.isVisibleOnFrontend || false,
                isEditableAfterApproval: item?.isEditableAfterApproval || false,
                isActive: item?.isActive || false,

                pills: item?.displayType?.pills || false,
                radioButton: item?.displayType?.radioButton || false,
                select: item?.displayType?.select || false,
                color: item?.displayType?.color || false,
                multiCheckbox: item?.displayType?.multiCheckbox || false,
                thumbnail: item?.displayType?.thumbnail || false,
            });
        }
    }, [isEdit, item]);

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
                <View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextAreaBox
                            title="Attribute Name"
                            placeholder="e.g., Color, Battery Capacity"
                            required
                            value={attributeName}
                            valuekey="attributeName"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1.5 }}
                        />

                        <DropDownTextAreaBox
                            type="select"
                            title={"Data type"}
                            placeholder={"Select Data type"}
                            list={[
                                "TEXT",
                                // "SELECT",
                                "NUMBER",
                                // "CHECKBOX",
                                "BOOLEAN",
                                "FILE",
                                "DATE",
                                "UNITRANGE",
                            ].map((type) => ({
                                id: type == "UNITRANGE" ? "UNIT_RANGE" : type,
                                name: type,
                            }))}
                            value={
                                attributeType
                                    ? {
                                          name:
                                              attributeType == "UNIT_RANGE"
                                                  ? "UNITRANGE"
                                                  : attributeType,
                                          id: attributeType,
                                      }
                                    : null
                            }
                            isSearchable
                            required
                            titleCustomStyle={{
                                marginHorizontal: 0,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    attributeType: value.id,
                                    isVariant:
                                        value.id === "SELECT"
                                            ? isVariant
                                            : false,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                        />
                    </View>
                    <TextAreaBox
                        title="Attribute code (system key)"
                        placeholder="e.g. colour, battery_capacity"
                        required
                        value={code}
                        valuekey="code"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Attribute Abbreviation"
                        placeholder="e.g. CLR, BATT"
                        value={abbreviation}
                        valuekey="abbreviation"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                    />

                    {/* {attributeType === "SELECT" && (
                        <TextAreaBox
                            title="Allowed Values"
                            placeholder="Type and press Enter (e.g., Red, Blue)"
                            value={valueInput}
                            onSubmitEditing={addValue}
                            // inputCustomStyle={inputStyle}
                            valuekey="valueInput"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                    )}*/}
                </View>

                {/* {attributeType === "SELECT" && (
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        {values.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => removeValue(index)}
                                key={index}
                                style={styles.chip}
                            >
                                <Text style={styles.chipText}>{item}</Text>

                                <View style={{ marginLeft: 6 }}>
                                    <FontAwesome
                                        name="close"
                                        size={12}
                                        color="#555"
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )} */}

                {/* {attributeType === "SELECT" && (
                    <Text style={hintText}>* Press Enter to save a value.</Text>
                )} */}
                {["TEXT", "NUMBER", "UNIT_RANGE"].includes(attributeType) && (
                    <View
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: Colors.borderColor,
                            borderRadius: 10,
                            backgroundColor: Colors.bodyColor,
                        }}
                    >
                        <Text style={{ ...hintText, fontSize: 12 }}>
                            Validation
                        </Text>
                        {attributeType === "TEXT" && (
                            <TextAreaBox
                                title="Character limit"
                                placeholder=""
                                value={characterLimit?.toString() || ""}
                                valuekey="characterLimit"
                                onChangeText={(value) =>
                                    updateState({
                                        characterLimit: value?.characterLimit
                                            ? parseInt(value.characterLimit)
                                            : null,
                                    })
                                }
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                inputCustomStyle={inputStyle}
                                keyboardType="number-pad"
                                customInputProps={{ maxLength: 6 }}
                            />
                        )}
                        {["NUMBER", "UNIT_RANGE"].includes(attributeType) && (
                            <>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <TextAreaBox
                                        title="Min value"
                                        placeholder=""
                                        value={minRangeValue?.toString() || ""}
                                        valuekey="minRangeValue"
                                        onChangeText={(value) =>
                                            updateState({
                                                minRangeValue:
                                                    value?.minRangeValue
                                                        ? parseInt(
                                                              value.minRangeValue,
                                                          )
                                                        : null,
                                            })
                                        }
                                        titleCustomStyle={{
                                            marginHorizontal: 0,
                                            marginTop: 10,
                                        }}
                                        inputCustomStyle={inputStyle}
                                        customStyle={{ flex: 1 }}
                                        keyboardType="number-pad"
                                        // customInputProps={{ maxLength: 6 }}
                                    />
                                    <TextAreaBox
                                        title="Max value"
                                        placeholder=""
                                        value={maxRangeValue?.toString() || ""}
                                        valuekey="maxRangeValue"
                                        onChangeText={(value) =>
                                            updateState({
                                                maxRangeValue:
                                                    value?.maxRangeValue
                                                        ? parseInt(
                                                              value.maxRangeValue,
                                                          )
                                                        : null,
                                            })
                                        }
                                        titleCustomStyle={{
                                            marginHorizontal: 0,
                                            marginTop: 10,
                                        }}
                                        inputCustomStyle={inputStyle}
                                        customStyle={{ flex: 1 }}
                                        keyboardType="number-pad"
                                        // customInputProps={{ maxLength: 10 }}
                                    />
                                </View>
                                {attributeType === "UNIT_RANGE" && (
                                    <TextAreaBox
                                        title="Unit"
                                        placeholder="e.g. mAh, Kg, MHz, cm"
                                        value={unit}
                                        valuekey="unit"
                                        onChangeText={updateState}
                                        titleCustomStyle={{
                                            marginHorizontal: 0,
                                            marginTop: 10,
                                        }}
                                        inputCustomStyle={inputStyle}
                                    />
                                )}
                            </>
                        )}
                    </View>
                )}
                <TextAreaBox
                    title="Description"
                    placeholder=""
                    value={description}
                    valuekey="description"
                    onChangeText={updateState}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 0,
                    }}
                    inputCustomStyle={{
                        ...inputStyle,
                    }}
                    customInputProps={{
                        multiline: true,
                        numberOfLines: 4,
                        textAlignVertical: "top",
                    }}
                />
                <DropDownTextAreaBox
                    type="select"
                    title={"Status"}
                    placeholder={"Select Status"}
                    list={["DRAFT", "SUBMIT", "APPROVED", "REJECTED"].map(
                        (type) => ({
                            id: type,
                            name: type,
                        }),
                    )}
                    value={
                        status
                            ? {
                                  name: status,
                                  id: status,
                              }
                            : null
                    }
                    isSearchable
                    required
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 0,
                    }}
                    inputCustomStyle={inputStyle}
                    onSelected={(value) => {
                        updateState({
                            status: value.id,
                        });
                    }}
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
                <DropDownTextAreaBox
                    type="select"
                    title={"Scope "}
                    placeholder={"Select Scope"}
                    list={["GLOBAL", "CATEGORY", "BRAND"].map((type) => ({
                        id: type,
                        name: type,
                    }))}
                    value={
                        scope
                            ? {
                                  name: scope,
                                  id: scope,
                              }
                            : null
                    }
                    isSearchable
                    required
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 0,
                    }}
                    inputCustomStyle={inputStyle}
                    onSelected={(value) => {
                        updateState({
                            scope: value.id,
                        });
                    }}
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
                <View
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                        borderRadius: 10,
                        backgroundColor: Colors.bodyColor,
                        gap: 10,
                    }}
                >
                    <Text style={{ ...hintText, fontSize: 12 }}>
                        Display type
                    </Text>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Pills</Text>
                        <Switch
                            value={pills}
                            onValueChange={(value) =>
                                updateState({ pills: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>
                            Radio button
                        </Text>
                        <Switch
                            value={radioButton}
                            onValueChange={(value) =>
                                updateState({ radioButton: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Select</Text>
                        <Switch
                            value={select}
                            onValueChange={(value) =>
                                updateState({ select: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Color</Text>
                        <Switch
                            value={color}
                            onValueChange={(value) =>
                                updateState({ color: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>
                            Multi checkbox
                        </Text>
                        <Switch
                            value={multiCheckbox}
                            onValueChange={(value) =>
                                updateState({ multiCheckbox: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Thumbnail</Text>
                        <Switch
                            value={thumbnail}
                            onValueChange={(value) =>
                                updateState({ thumbnail: value })
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
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                        borderRadius: 10,
                        backgroundColor: Colors.bodyColor,
                        gap: 10,
                    }}
                >
                    <Text style={{ ...hintText, fontSize: 12 }}>
                        Behavior flags
                    </Text>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Filterable</Text>
                        <Switch
                            value={isFilterable}
                            onValueChange={(value) =>
                                updateState({ isFilterable: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Searchable</Text>
                        <Switch
                            value={isSearchable}
                            onValueChange={(value) =>
                                updateState({ isSearchable: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Sortable</Text>
                        <Switch
                            value={isSortable}
                            onValueChange={(value) =>
                                updateState({ isSortable: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View
                        style={[
                            styles.statusBox,
                            // attributeType !== "SELECT" && { opacity: 0.9 },
                        ]}
                    >
                        <Text
                            style={[
                                Fonts.blackColor15Medium,
                                attributeType !== "SELECT" && { opacity: 0.5 },
                            ]}
                        >
                            Variant
                        </Text>
                        <Switch
                            value={isVariant}
                            onValueChange={(value) =>
                                updateState({ isVariant: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                            disabled={attributeType !== "SELECT"}
                        />
                    </View>
                    <View style={[styles.statusBox]}>
                        <Text style={Fonts.blackColor15Medium}>Comparable</Text>
                        <Switch
                            value={isComparable}
                            onValueChange={(value) =>
                                updateState({ isComparable: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={[styles.statusBox]}>
                        <Text style={Fonts.blackColor15Medium}>
                            Visible on frontend
                        </Text>
                        <Switch
                            value={isVisibleOnFrontend}
                            onValueChange={(value) =>
                                updateState({ isVisibleOnFrontend: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={[styles.statusBox]}>
                        <Text style={Fonts.blackColor15Medium}>
                            Editable after approval
                        </Text>
                        <Switch
                            value={isEditableAfterApproval}
                            onValueChange={(value) =>
                                updateState({ isEditableAfterApproval: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={Fonts.blackColor15Medium}>Active</Text>
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

export default CreateProductAttribute;
const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const hintText = {
    ...Fonts.blackColor11Medium,
    marginTop: -5,
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
        // marginTop: 10,
        backgroundColor: Colors.whiteColor,
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
