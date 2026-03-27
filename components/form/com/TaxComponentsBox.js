import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/styles";
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
    const updateComponents = (list) => {
        onChange(list);
    };

    const addRow = () => {
        updateComponents([...value, { ...DEFAULT_ROW }]);
    };

    const removeRow = (index) => {
        const list = value.filter((_, i) => i !== index);
        updateComponents(list.length ? list : [{ ...DEFAULT_ROW }]);
    };

    const updateRow = (index, data) => {
        const list = [...value];
        list[index] = { ...list[index], ...data };
        updateComponents(list);
    };

    return (
        <View style={styles.container}>
            {value.map((item, index) => (
                <View key={index} style={styles.row}>
                    <View style={{ flex: 1 }}>
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
                                customStyle={{ flex: 2 }}
                                isSearchable
                            />

                            <TextAreaBox
                                placeholder="0"
                                value={item?.rate}
                                valuekey="rate"
                                onChangeText={(text) =>
                                    updateRow(index, { rate: text?.rate })
                                }
                                customStyle={{ flex: 1 }}
                                rightIcon={<Text>%</Text>}
                                keyboardType="number-pad"
                            />
                        </View>

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
                            customStyle={{ flex: 1 }}
                            isSearchable
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => removeRow(index)}
                        style={styles.removeBtn}
                    >
                        <FontAwesome6
                            name="xmark"
                            size={16}
                            color={Colors.redColor}
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
        marginTop: 10,
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
        fontSize: 13,
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
    },

    removeBtn: {
        paddingHorizontal: 6,
    },
};
