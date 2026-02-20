import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { DropDownTextAreaBox, TextAreaBox } from "../../../modules";
import { FontAwesome6 } from "@expo/vector-icons";

const DEFAULT_ROW = {
    taxComponent: null,
    rate: "",
    jurisdiction: null,
};

const TaxComponentsBox = ({
    value = [],
    onChange = () => {},
    taxTypeList = [],
}) => {
    const [components, setComponents] = useState(
        value.length ? value : [{ ...DEFAULT_ROW }],
    );

    const updateComponents = (list) => {
        // setComponents(list);
        onChange(list);
    };

    const addRow = () => {
        // updateComponents([...components, { ...DEFAULT_ROW }]);
        updateComponents([...value, { ...DEFAULT_ROW }]);
    };

    const removeRow = (index) => {
        // const list = components.filter((_, i) => i !== index);
        const list = value.filter((_, i) => i !== index);
        updateComponents(list.length ? list : [{ ...DEFAULT_ROW }]);
    };

    const updateRow = (index, data) => {
        // const list = [...components];
        const list = [...value];
        list[index] = { ...list[index], ...data };
        updateComponents(list);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={Fonts.blackColor16Medium}>Tax Components</Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                    {/* <TouchableOpacity style={styles.autoBtn}>
                        <Text style={Fonts.primaryColor13Medium}>
                            Auto-Suggest
                        </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.addBtn} onPress={addRow}>
                        <FontAwesome6
                            name="plus"
                            size={14}
                            color={Colors.whiteColor}
                        />
                        <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Rows */}
            {value.map((item, index) => (
                <View key={index} style={styles.row}>
                    <View style={{ flex: 1 }}>
                        {/* Tax Type */}
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                marginBottom: 10,
                            }}
                        >
                            <DropDownTextAreaBox
                                type="select"
                                placeholder="Type"
                                value={item.taxComponent}
                                list={taxTypeList}
                                onSelected={(value) =>
                                    updateRow(index, { taxComponent: value })
                                }
                                inputCustomStyle={styles.input}
                                customStyle={{ flex: 1 }}
                                isSearchable
                            />

                            <TextAreaBox
                                placeholder="0"
                                value={item?.rate}
                                valuekey="rate"
                                onChangeText={(text) =>
                                    updateRow(index, { rate: text?.rate })
                                }
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                inputCustomStyle={styles.input}
                                customStyle={{ flex: 1 }}
                                rightIcon={<Text>%</Text>}
                                keyboardType="number-pad"
                            />
                        </View>

                        {/* Jurisdiction */}
                        <DropDownTextAreaBox
                            type="select"
                            placeholder="Applicable When"
                            value={item.jurisdiction}
                            list={[
                                { id: "INTRA_STATE", name: "INTRASTATE" },
                                { id: "INTER_STATE", name: "INTER STATE" },
                                {
                                    id: "UNION_TERRITORY",
                                    name: "UNION TERRITORY",
                                },
                                { id: "ALWAYS", name: "ALWAYS" },
                            ]}
                            onSelected={(value) =>
                                updateRow(index, { jurisdiction: value })
                            }
                            inputCustomStyle={styles.input}
                            customStyle={{ flex: 1 }}
                            isSearchable
                        />
                    </View>
                    {/* Remove */}
                    <TouchableOpacity
                        onPress={() => removeRow(index)}
                        style={styles.removeBtn}
                    >
                        <FontAwesome6
                            name="xmark"
                            size={16}
                            color={Colors.errorColor}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default TaxComponentsBox;
const styles = {
    container: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginTop: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    autoBtn: {
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    addText: {
        ...Fonts.blackColor13Medium,
        color: Colors.whiteColor,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#e5e7eb",
        padding: 10,
        paddingRight: 0,
    },

    input: {
        marginHorizontal: 0,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: Colors.whiteColor,
        paddingVertical: 6,
    },

    rateBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 6,
        paddingHorizontal: 8,
        height: 42,
    },

    rateInput: {
        width: 40,
        textAlign: "center",
    },

    percent: {
        marginLeft: 4,
        ...Fonts.grayColor12Medium,
    },

    removeBtn: {
        paddingHorizontal: 6,
    },
};
