// import React, { useEffectEvent, useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     FlatList,
//     StyleSheet,
// } from "react-native";
// import InfoBox from "./InfoBox";
// import CommonBox from "./CommonBox";

// const AttributeForm = ({ value, updateFinal }) => {
//     const [state, setState] = useState({
//         attributes: value?.regularAttributes || [],
//         inputValues: {},
//     });

//     const updateState = (newState) => {
//         setState((prev) => ({ ...prev, ...newState }));
//     };

//     const handleInputChange = (text, index) => {
//         const updated = { ...state.inputValues, [index]: text };
//         updateState({ inputValues: updated });
//     };

//     const addValue = (index) => {
//         const text = state.inputValues[index];
//         if (!text) return;

//         const updated = [...state.attributes];
//         const existing = updated[index].newvalues || [];

//         if (!existing.includes(text)) {
//             updated[index].newvalues = [...existing, text];
//         }

//         const inputs = { ...state.inputValues, [index]: "" };

//         updateState({ attributes: updated, inputValues: inputs });
//     };

//     const removeValue = (index, value) => {
//         const updated = [...state.attributes];
//         updated[index].newvalues = updated[index].newvalues.filter(
//             (v) => v !== value,
//         );
//         updateState({ attributes: updated });
//     };

//     const buildFinalOutput = () => {
//         updateFinal({
//             regularAttributes: state.attributes.map((attr) => ({
//                 attributeId: attr.attributeId,
//                 name: attr.name,
//                 values: attr.newvalues || [],
//                 type: attr.type,
//                 isMandatory: attr.isMandatory,
//                 isVariant: attr.isVariant,
//             })),
//         });
//     };

//     const renderChips = (values, index) =>
//         values?.length > 0 && (
//             <View style={styles.chipContainer}>
//                 {values.map((val, i) => (
//                     <View key={i} style={styles.chip}>
//                         <Text style={styles.chipText}>{val}</Text>
//                         <TouchableOpacity
//                             onPress={() => removeValue(index, val)}
//                         >
//                             <Text style={styles.remove}>×</Text>
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </View>
//         );

//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={styles.card}>
//                 <View style={styles.headerRow}>
//                     <Text style={styles.title}>{item.name}</Text>
//                     {!!item.newvalues?.length && (
//                         <View style={styles.countBadge}>
//                             <Text style={styles.countText}>
//                                 {item.newvalues.length}
//                             </Text>
//                         </View>
//                     )}
//                 </View>

//                 {renderChips(item.newvalues || [], index)}

//                 <View style={styles.inputRow}>
//                     <TextInput
//                         placeholder="Type and press Add"
//                         value={state.inputValues[index] || ""}
//                         onChangeText={(text) => handleInputChange(text, index)}
//                         style={styles.input}
//                     />
//                     <TouchableOpacity
//                         style={styles.addBtn}
//                         onPress={() => addValue(index)}
//                     >
//                         <Text style={styles.addText}>Add</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {!!item.attribute?.values?.length && (
//                     <View style={styles.suggestionWrap}>
//                         {item.attribute.values.map((val, i) => (
//                             <TouchableOpacity
//                                 key={i}
//                                 style={styles.suggestionChip}
//                                 onPress={() =>
//                                     addValueFromSuggestion(index, val)
//                                 }
//                             >
//                                 <Text style={styles.suggestionText}>{val}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}
//             </View>
//         );
//     };

//     const addValueFromSuggestion = (index, val) => {
//         const updated = [...state.attributes];
//         const existing = updated[index].newvalues || [];

//         if (!existing.includes(val)) {
//             updated[index].newvalues = [...existing, val];
//         }

//         updateState({ attributes: updated });
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <InfoBox
//                 title="Attribute Mapping"
//                 subtitle="Map category-driven attributes for your product"
//             />
//             <CommonBox
//                 title="Walkie Talkie Specifications"
//                 body={
//                     <>
//                         <FlatList
//                             data={state.attributes}
//                             keyExtractor={(item) => item._id}
//                             renderItem={renderItem}
//                         />
//                     </>
//                 }
//             />
//         </View>
//     );
// };

// export default AttributeForm;

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import InfoBox from "./InfoBox";
import CommonBox from "./CommonBox";

const AttributeForm = ({ value, updateFinal }) => {
    const attributes = value?.regularAttributes || [];

    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (text, index) => {
        setInputValues((prev) => ({ ...prev, [index]: text }));
    };

    const updateAttributes = (updatedAttributes) => {
        updateFinal({
            regularAttributes: updatedAttributes,
        });
    };

    const addValue = (index) => {
        const text = inputValues[index];
        if (!text) return;

        const updated = [...attributes];
        const existing = updated[index].newvalues || [];

        if (!existing.includes(text)) {
            updated[index].newvalues = [...existing, text];
        }

        setInputValues((prev) => ({ ...prev, [index]: "" }));
        updateAttributes(updated);
    };

    const removeValue = (index, value) => {
        const updated = [...attributes];

        updated[index].newvalues = (updated[index].newvalues || []).filter(
            (v) => v !== value,
        );

        updateAttributes(updated);
    };

    const addValueFromSuggestion = (index, val) => {
        const updated = [...attributes];
        const existing = updated[index].newvalues || [];

        if (!existing.includes(val)) {
            updated[index].newvalues = [...existing, val];
        }

        updateAttributes(updated);
    };

    console.log(value?.regularAttributes);

    const renderChips = (values, index) =>
        values?.length > 0 && (
            <View style={styles.chipContainer}>
                {values.map((val, i) => (
                    <View key={i} style={styles.chip}>
                        <Text style={styles.chipText}>{val}</Text>
                        <TouchableOpacity
                            onPress={() => removeValue(index, val)}
                        >
                            <Text style={styles.remove}>×</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.name}</Text>

                    {!!item.newvalues?.length && (
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>
                                {item.newvalues.length}
                            </Text>
                        </View>
                    )}
                </View>

                {renderChips(item.newvalues || [], index)}

                <View style={styles.inputRow}>
                    <TextInput
                        placeholder="Type and press Add"
                        value={inputValues[index] || ""}
                        onChangeText={(text) => handleInputChange(text, index)}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => addValue(index)}
                    >
                        <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {!!item.attribute?.values?.length && (
                    <View style={styles.suggestionWrap}>
                        {item.attribute.values.map((val, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.suggestionChip}
                                onPress={() =>
                                    addValueFromSuggestion(index, val)
                                }
                            >
                                <Text style={styles.suggestionText}>{val}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <InfoBox
                title="Attribute Mapping"
                subtitle="Map category-driven attributes for your product"
            />

            <CommonBox
                title="Walkie Talkie Specifications"
                body={
                    <FlatList
                        data={attributes}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                    />
                }
            />
        </View>
    );
};

export default AttributeForm;
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginBottom: 14,
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderColor: "#eee",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
    },
    countBadge: {
        backgroundColor: "#0A66C2",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    countText: {
        color: "#fff",
        fontSize: 12,
    },
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0A66C2",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 6,
        marginBottom: 6,
    },
    chipText: {
        color: "#fff",
        marginRight: 6,
    },
    remove: {
        color: "#fff",
        fontWeight: "bold",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fafafa",
    },
    addBtn: {
        backgroundColor: "#e9eef6",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },
    addText: {
        fontWeight: "600",
    },
    suggestionWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    suggestionChip: {
        borderWidth: 1,
        borderColor: "#0A66C2",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 6,
        marginBottom: 6,
    },
    suggestionText: {
        color: "#0A66C2",
    },
    button: {
        backgroundColor: "#0A66C2",
        padding: 16,
        margin: 16,
        borderRadius: 14,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },
});
