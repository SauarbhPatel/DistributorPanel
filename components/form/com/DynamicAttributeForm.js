import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Switch,
} from "react-native";

const TYPES = {
    TEXT: "TEXT",
    NUMBER: "NUMBER",
    SELECT: "SELECT",
    CHECKBOX: "CHECKBOX",
    BOOLEAN: "BOOLEAN",
};

const DynamicAttributeForm = ({ data = [], onChange }) => {
    const [attributes, setAttributes] = useState(
        data.map((item) => ({
            ...item,
            values: Array.isArray(item.values) ? item.values : [],
        })),
    );

    const updateValue = (attrIndex, valueIndex, newValue) => {
        setAttributes((prev) => {
            const updated = [...prev];
            const values = [...updated[attrIndex].values];
            values[valueIndex] = newValue;
            updated[attrIndex].values = values;
            onChange && onChange(updated);
            return updated;
        });
    };

    const addValue = (attrIndex) => {
        setAttributes((prev) => {
            const updated = [...prev];
            updated[attrIndex].values = [...updated[attrIndex].values, ""];
            return updated;
        });
    };

    const removeValue = (attrIndex, valueIndex) => {
        setAttributes((prev) => {
            const updated = [...prev];
            updated[attrIndex].values = updated[attrIndex].values.filter(
                (_, i) => i !== valueIndex,
            );
            return updated;
        });
    };

    const renderInputs = (item, attrIndex) => {
        const values =
            item.values.length === 0 &&
            (item.type === TYPES.TEXT || item.type === TYPES.NUMBER)
                ? [""]
                : item.values;

        return values.map((val, valueIndex) => {
            // BOOLEAN
            // if (item.type === TYPES.BOOLEAN) {
            //     return (
            //         <View
            //             key={valueIndex}
            //             style={{
            //                 flexDirection: "row",
            //                 alignItems: "center",
            //                 marginTop: 8,
            //             }}
            //         >
            //             <Switch
            //                 value={!!val}
            //                 onValueChange={(v) =>
            //                     updateValue(attrIndex, valueIndex, v)
            //                 }
            //             />
            //             <Text style={{ marginLeft: 8 }}>
            //                 {val ? "True" : "False"}
            //             </Text>

            //             {values.length > 1 && (
            //                 <TouchableOpacity
            //                     onPress={() =>
            //                         removeValue(attrIndex, valueIndex)
            //                     }
            //                     style={{ marginLeft: 10 }}
            //                 >
            //                     <Text style={{ color: "red" }}>Remove</Text>
            //                 </TouchableOpacity>
            //             )}
            //         </View>
            //     );
            // }

            // TEXT / NUMBER / SELECT / CHECKBOX
            return (
                <View key={valueIndex} style={{ marginTop: 8 }}>
                    <TextInput
                        value={String(val)}
                        placeholder={`Enter ${item.name}`}
                        keyboardType={
                            item.type === TYPES.NUMBER ? "numeric" : "default"
                        }
                        onChangeText={(text) =>
                            updateValue(attrIndex, valueIndex, text)
                        }
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            padding: 10,
                            borderRadius: 6,
                        }}
                    />

                    {[TYPES.SELECT, TYPES.CHECKBOX, TYPES.BOOLEAN].includes(
                        item.type,
                    ) &&
                        values.length > 1 && (
                            <TouchableOpacity
                                onPress={() =>
                                    removeValue(attrIndex, valueIndex)
                                }
                                style={{ marginTop: 4 }}
                            >
                                <Text style={{ color: "red", fontSize: 12 }}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        )}
                </View>
            );
        });
    };

    const renderItem = ({ item, index }) => (
        <View
            style={{
                padding: 12,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: 8,
                marginBottom: 14,
            }}
        >
            <Text style={{ fontWeight: "600", fontSize: 14 }}>
                {item.name}
                {item.isMandatory && <Text style={{ color: "red" }}> *</Text>}
            </Text>

            {renderInputs(item, index)}

            {[TYPES.SELECT, TYPES.CHECKBOX, TYPES.BOOLEAN].includes(
                item.type,
            ) && (
                <TouchableOpacity
                    onPress={() => addValue(index)}
                    style={{ marginTop: 10 }}
                >
                    <Text style={{ color: "#007AFF", fontSize: 13 }}>
                        + Add More
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <FlatList
            data={attributes}
            keyExtractor={(_, index) => `attr-${index}`}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
        />
    );
};

export default DynamicAttributeForm;
