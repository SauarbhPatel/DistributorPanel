import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import BottomPopup from "../../common/BottomPopup";
import VariantCard from "./VariantCard";
import InfoBox from "./InfoBox";
import CommonBox from "./CommonBox";
const generateSku = () =>
    "SKU-" + Math.random().toString(36).substring(2, 7).toUpperCase();

const VariationAttributesForm = ({
    attributes = [],
    variations = [],

    onChange = () => {},
}) => {
    const [state, setState] = useState({
        selected: {},
        values: {},
        input: {},
        sku: {},
    });

    const updateState = (obj) => setState((prev) => ({ ...prev, ...obj }));
    // const [variations, setVariations] = useState([]);

    const toggleAttribute = (id) => {
        updateState({
            selected: {
                ...state.selected,
                [id]: !state.selected[id],
            },
        });
    };

    // const addValue = (attr) => {
    //     const attrId = attr._id;
    //     const attrName = attr.name;
    //     const val = state.input[attrId];
    //     if (!val) return;

    //     const existingValues = state.values[attrId] || [];

    //     // Prevent duplicate values
    //     // if (existingValues.includes(val)) return;
    //     const allValues = [
    //         ...(attr.values || []),
    //         ...(state.values[attrId] || []),
    //     ];
    //     if (allValues.includes(val)) return;

    //     const updatedValues = [...existingValues, val];

    //     const variantAttr = attributes.map((oldAttr) => ({
    //         ...oldAttr,
    //         values:
    //             oldAttr?._id == attrId ? updatedValues : oldAttr?.values || [],
    //     }));
    //     // onChange({
    //     //     variantAttributes:variantAttr,
    //     // });

    //     // Update attribute values state
    //     updateState({
    //         values: {
    //             ...state.values,
    //             [attrId]: updatedValues,
    //         },

    //         input: {
    //             ...state.input,
    //             [attrId]: "",
    //         },
    //     });

    //     // 🔥 Variation Update Logic

    //     if (variations.length === 0) {
    //         return onChange({
    //             variants: updatedValues.map((value) => ({
    //                 [attrName]: value,
    //             })),
    //             variantAttributes: variantAttr,
    //         });
    //     }

    //     // Check if attribute already exists in variations
    //     const attributeAlreadyExists =
    //         variations.length > 0 &&
    //         Object.keys(variations[0]).includes(attrName);

    //     if (attributeAlreadyExists) {
    //         // Just add new rows for new value
    //         const newRows = variations
    //             .filter((v) => v[attrName] !== val)
    //             .map((v) => ({
    //                 ...v,
    //                 [attrName]: val,
    //             }));

    //         return onChange({
    //             variants: [...variations, ...newRows],
    //             variantAttributes: variantAttr,
    //         });
    //     } else {
    //         // New attribute selected → expand combinations
    //         let expanded = [];

    //         variations.forEach((variation) => {
    //             updatedValues.forEach((value) => {
    //                 expanded.push({
    //                     ...variation,
    //                     [attrName]: value,
    //                 });
    //             });
    //         });

    //         return onChange({
    //             variants: expanded,
    //             variantAttributes: variantAttr,
    //         });
    //     }
    // };
    const addValue = (attr) => {
        const attrId = attr._id;
        const attrName = attr.name;
        const val = state.input[attrId];
        if (!val) return;

        const existingValues = state.values[attrId] || [];

        // Prevent duplicate values
        if (existingValues.includes(val)) return;

        const updatedValues = [...existingValues, val];

        const variantAttr = attributes.map((oldAttr) => ({
            ...oldAttr,
            values:
                oldAttr?._id == attrId ? updatedValues : oldAttr?.values || [],
        }));

        // Update attribute values state
        updateState({
            values: {
                ...state.values,
                [attrId]: updatedValues,
            },
            input: {
                ...state.input,
                [attrId]: "",
            },
        });

        // ── CASE 1: No variations yet → create fresh rows ──────────────────────
        if (variations.length === 0) {
            return onChange({
                variants: updatedValues.map((value) => ({
                    [attrName]: value,
                })),
                variantAttributes: variantAttr,
            });
        }

        // ── CASE 2: This attribute already exists in variations ─────────────────
        const attributeAlreadyExists = Object.keys(variations[0]).includes(
            attrName,
        );

        if (attributeAlreadyExists) {
            // Find unique combos of all OTHER attributes (ignore current attrName)
            const seen = new Set();
            const uniqueOtherCombos = variations.reduce((acc, v) => {
                const others = Object.fromEntries(
                    Object.entries(v).filter(
                        ([k]) => k !== attrName && k !== "variationData",
                    ),
                );
                const key = JSON.stringify(others);
                if (!seen.has(key)) {
                    seen.add(key);
                    acc.push(others);
                }
                return acc;
            }, []);

            // Only add one new row per unique combo for the new value
            const newRows = uniqueOtherCombos.map((combo) => ({
                ...combo,
                [attrName]: val,
            }));

            return onChange({
                variants: [...variations, ...newRows],
                variantAttributes: variantAttr,
            });
        }

        // ── CASE 3: Brand new attribute → cross-product with existing rows ──────
        // Get unique existing combos (strip any previous partial state)
        const seen = new Set();
        const uniqueExisting = variations.reduce((acc, v) => {
            const clean = Object.fromEntries(
                Object.entries(v).filter(([k]) => k !== "variationData"),
            );
            const key = JSON.stringify(clean);
            if (!seen.has(key)) {
                seen.add(key);
                acc.push(clean);
            }
            return acc;
        }, []);

        // Cross every existing variation with every value of the new attribute
        const expanded = [];
        uniqueExisting.forEach((variation) => {
            updatedValues.forEach((value) => {
                expanded.push({
                    ...variation,
                    [attrName]: value,
                });
            });
        });

        return onChange({
            variants: expanded,
            variantAttributes: variantAttr,
        });
    };
    const removeValue = (id, val, key) => {
        updateState({
            values: {
                ...state.values,
                [id]: state.values[id].filter((v) => v !== val),
            },
        });
        onChange({
            variantAttributes: attributes.map((oldAttr) => ({
                ...oldAttr,
                values:
                    oldAttr?._id == id
                        ? oldAttr?.values.filter((valu) => valu != val)
                        : oldAttr?.values,
            })),
            variants: variations.filter((variat) => variat[key] != val),
        });
    };

    return (
        <View>
            <InfoBox
                title="Variation Attributes"
                subtitle="Check attributes to create variations. Add your values in the input below each attribute. Review generated variants and set SKU or open Basic info for each."
            />
            <CommonBox
                title="Variation Attributes"
                subtitle="Check attributes to create variations. Pick preset values from the category or add your own where shown."
                body={
                    <>
                        {/* ATTRIBUTE LIST */}
                        {attributes.map((attr) => {
                            if (!attr.isVariant) return null;

                            const active = state.selected[attr._id];

                            return (
                                <View
                                    key={attr._id}
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 10,
                                        padding: 16,
                                        marginBottom: 14,
                                        borderWidth: 1,
                                        borderColor: active
                                            ? "#2563eb"
                                            : "#e5e7eb",
                                    }}
                                >
                                    {/* Header */}
                                    <TouchableOpacity
                                        onPress={() =>
                                            toggleAttribute(attr._id)
                                        }
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: 6,
                                                borderWidth: 1.5,
                                                borderColor: active
                                                    ? "#2563eb"
                                                    : "#9ca3af",

                                                marginRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {active && (
                                                <Feather
                                                    name="check"
                                                    color={Colors.primaryColor}
                                                    size={16}
                                                />
                                            )}
                                        </View>

                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "600",
                                            }}
                                        >
                                            {attr.name}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* VALUE INPUT */}
                                    {active && (
                                        <>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginTop: 14,
                                                }}
                                            >
                                                <TextInput
                                                    placeholder={`Add ${attr.name}`}
                                                    value={
                                                        state.input[attr._id] ||
                                                        ""
                                                    }
                                                    onChangeText={(text) =>
                                                        updateState({
                                                            input: {
                                                                ...state.input,
                                                                [attr._id]:
                                                                    text,
                                                            },
                                                        })
                                                    }
                                                    style={{
                                                        flex: 1,
                                                        borderWidth: 1,
                                                        borderColor: "#e5e7eb",
                                                        borderRadius: 10,
                                                        paddingHorizontal: 14,
                                                        height: 44,
                                                        backgroundColor:
                                                            "#f9fafb",
                                                    }}
                                                />

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addValue(attr)
                                                    }
                                                    style={{
                                                        marginLeft: 10,
                                                        backgroundColor:
                                                            "#2563eb",
                                                        paddingHorizontal: 18,
                                                        borderRadius: 10,
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#fff",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Add
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            {/* CHIPS */}
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    marginTop: 12,
                                                }}
                                            >
                                                {(attr.values || []).map(
                                                    (val) => (
                                                        <TouchableOpacity
                                                            key={val}
                                                            onPress={() =>
                                                                removeValue(
                                                                    attr._id,
                                                                    val,
                                                                    attr.name,
                                                                )
                                                            }
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                                alignItems:
                                                                    "center",
                                                                backgroundColor:
                                                                    "#eef2ff",
                                                                paddingHorizontal: 12,
                                                                paddingVertical: 6,
                                                                borderRadius: 20,
                                                                marginRight: 8,
                                                                marginBottom: 8,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color: "#1e40af",
                                                                    fontWeight:
                                                                        "500",
                                                                }}
                                                            >
                                                                {val}
                                                            </Text>

                                                            <View>
                                                                <Text
                                                                    style={{
                                                                        marginLeft: 6,
                                                                        color: "#1e40af",
                                                                    }}
                                                                >
                                                                    ✕
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ),
                                                )}
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    marginTop: 12,
                                                }}
                                            >
                                                {(attr?.s_values || []).map(
                                                    (val) => (
                                                        <TouchableOpacity
                                                            key={val}
                                                            onPress={() => {
                                                                updateState({
                                                                    input: {
                                                                        ...state.input,
                                                                        [attr._id]:
                                                                            val,
                                                                    },
                                                                });
                                                            }}
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                                alignItems:
                                                                    "center",
                                                                backgroundColor:
                                                                    "#f1f1f1",
                                                                paddingHorizontal: 12,
                                                                paddingVertical: 6,
                                                                borderRadius: 20,
                                                                marginRight: 8,
                                                                marginBottom: 8,
                                                            }}
                                                        >
                                                            <View>
                                                                <Text
                                                                    style={{
                                                                        marginLeft: 6,
                                                                        color: "#7e7e7e",
                                                                    }}
                                                                >
                                                                    +
                                                                </Text>
                                                            </View>
                                                            <Text
                                                                style={{
                                                                    color: "#7e7e7e",
                                                                    fontWeight:
                                                                        "500",
                                                                    fontSize: 11,
                                                                }}
                                                            >
                                                                {val}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ),
                                                )}
                                            </View>
                                        </>
                                    )}
                                </View>
                            );
                        })}

                        {/* VARIATIONS */}
                        {variations.length > 0 && (
                            <>
                                <Text
                                    style={{
                                        color: "#000000",
                                        fontSize: 14,
                                        marginBottom: 10,
                                        fontWeight: "700",
                                    }}
                                >
                                    Variations to create ({variations.length})
                                </Text>

                                {variations.map((variation, index) => {
                                    const variantKey = Object.entries(variation)
                                        .filter(([k]) => k !== "variationData")
                                        .map(([k, v]) => `${k}:${v}`)
                                        .join("|");
                                    return (
                                        <VariationsCard
                                            key={variantKey}
                                            variation={variation}
                                            state={state}
                                            index={index}
                                            updateState={updateState}
                                            onDataCompleted={(data) => {
                                                const cloneData = JSON.parse(
                                                    JSON.stringify(variations),
                                                );

                                                cloneData[index] = data;
                                                console.log(cloneData);
                                                onChange({
                                                    variants: cloneData,
                                                });
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </>
                }
            />
        </View>
    );
};

export default VariationAttributesForm;

// const VariationsCard = ({
//     variation,
//     index,
//     state,
//     updateState,
//     onDataCompleted,
// }) => {
//     const key = JSON.stringify(variation);

//     const [isShowBasicInfo, setisShowBasicInfo] = useState(false);
//     console.log("hghj", JSON.stringify(variation));
//     return (
//         <View
//             key={index}
//             style={{
//                 backgroundColor: "#fff",
//                 borderRadius: 10,
//                 padding: 16,
//                 marginBottom: 12,
//                 borderWidth: variation?.variationData ? 2 : 1,
//                 borderColor: variation?.variationData
//                     ? Colors.greenColor
//                     : "#e5e7eb",
//             }}
//         >
//             <BottomPopup
//                 isShow={isShowBasicInfo}
//                 title={
//                     "Variant-" +
//                     Object.entries(variation)
//                         .filter(([key]) => key !== "variationData")
//                         .map(([k, v]) => `${k}: ${v}`)
//                         .join(" · ")
//                 }
//                 onClose={() => setisShowBasicInfo(false)}
//                 component={
//                     <>
//                         <VariantCard
//                             defaultSku={state.sku[key]}
//                             defaultData={variation?.variationData || null}
//                             onDone={(value) => {
//                                 setisShowBasicInfo(false);

//                                 const cloneObject = JSON.parse(
//                                     JSON.stringify(variation),
//                                 );
//                                 delete cloneObject?.variationData;
//                                 onDataCompleted({
//                                     ...cloneObject,
//                                     variationData: {
//                                         variantHash: {
//                                             ...cloneObject,
//                                         },
//                                         ...value,
//                                     },
//                                 });
//                             }}
//                         />
//                     </>
//                 }
//                 top="10%"
//             />
//             <Text
//                 style={{
//                     fontWeight: "600",
//                     marginBottom: 10,
//                 }}
//             >
//                 {Object.entries(variation)
//                     .filter(([key]) => key !== "variationData")
//                     .map(([k, v]) => `${k}: ${v}`)
//                     .join(" · ")}
//             </Text>

//             <View
//                 style={{
//                     flexDirection: "row",
//                     marginBottom: 10,
//                 }}
//             >
//                 <TextInput
//                     placeholder="SKU (manual or generate)"
//                     value={
//                         state.sku[key] || variation?.variationData?.sku || ""
//                     }
//                     onChangeText={(text) =>
//                         updateState({
//                             sku: {
//                                 ...state.sku,
//                                 [key]: text,
//                             },
//                         })
//                     }
//                     style={{
//                         flex: 1,
//                         borderWidth: 1,
//                         borderColor: "#e5e7eb",
//                         borderRadius: 10,
//                         paddingHorizontal: 14,
//                         height: 44,
//                         backgroundColor: "#f9fafb",
//                     }}
//                     editable={variation?.variationData?.sku ? false : true}
//                 />

//                 <TouchableOpacity
//                     disabled={variation?.variationData?.sku ? true : false}
//                     onPress={() =>
//                         updateState({
//                             sku: {
//                                 ...state.sku,
//                                 [key]: generateSku(),
//                             },
//                         })
//                     }
//                     style={{
//                         marginLeft: 10,
//                         backgroundColor: "#111827",
//                         paddingHorizontal: 14,
//                         borderRadius: 10,
//                         justifyContent: "center",
//                     }}
//                 >
//                     <Text
//                         style={{
//                             color: "#fff",
//                             fontWeight: "600",
//                         }}
//                     >
//                         Generate
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <View
//                 style={{
//                     flexDirection: "row",
//                 }}
//             >
//                 <TouchableOpacity
//                     activeOpacity={0.9}
//                     onPress={() => {
//                         if (state.sku[key] || variation?.variationData?.sku) {
//                             setisShowBasicInfo(true);
//                         } else {
//                             Alert.alert("", "please generate SKU ");
//                         }
//                     }}
//                     style={{
//                         backgroundColor: "#f3f4f6",
//                         paddingHorizontal: 14,
//                         paddingVertical: 8,
//                         borderRadius: 8,
//                         marginRight: 10,
//                     }}
//                 >
//                     <Text>Basic Info</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: "#f3f4f6",
//                         paddingHorizontal: 14,
//                         paddingVertical: 8,
//                         borderRadius: 8,
//                     }}
//                 >
//                     <Text>Other Info</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

const VariationsCard = ({
    variation,
    index,
    state,
    updateState,
    onDataCompleted,
}) => {
    const variantObject = Object.fromEntries(
        Object.entries(variation).filter(([k]) => k !== "variationData"),
    );

    const variantKey = Object.entries(variantObject)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v}`)
        .join("|");

    const variantLabel = Object.entries(variantObject)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ");

    const [isShowBasicInfo, setisShowBasicInfo] = useState(false);

    return (
        <View
            style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                borderWidth: variation?.variationData ? 2 : 1,
                borderColor: variation?.variationData
                    ? Colors.greenColor
                    : "#e5e7eb",
            }}
        >
            <BottomPopup
                isShow={isShowBasicInfo}
                title={"Variant-" + variantLabel}
                onClose={() => setisShowBasicInfo(false)}
                component={
                    <VariantCard
                        defaultSku={
                            state.sku[variantKey] ||
                            variation?.variationData?.sku ||
                            ""
                        }
                        defaultData={variation?.variationData || null}
                        onDone={(value) => {
                            setisShowBasicInfo(false);

                            onDataCompleted({
                                ...variantObject,
                                variationData: {
                                    variantHash: {
                                        ...variantObject,
                                    },
                                    sku:
                                        state.sku[variantKey] ||
                                        variation?.variationData?.sku ||
                                        "",
                                    ...value,
                                },
                            });
                        }}
                    />
                }
                top="10%"
            />

            <Text
                style={{
                    fontWeight: "600",
                    marginBottom: 10,
                }}
            >
                {variantLabel}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 10,
                }}
            >
                <TextInput
                    placeholder="SKU (manual or generate)"
                    value={
                        state.sku[variantKey] ||
                        variation?.variationData?.sku ||
                        ""
                    }
                    onChangeText={(text) =>
                        updateState({
                            sku: {
                                ...state.sku,
                                [variantKey]: text,
                            },
                        })
                    }
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                        borderRadius: 10,
                        paddingHorizontal: 14,
                        height: 44,
                        backgroundColor: "#f9fafb",
                    }}
                    editable={variation?.variationData?.sku ? false : true}
                />

                <TouchableOpacity
                    disabled={variation?.variationData?.sku ? true : false}
                    onPress={() =>
                        updateState({
                            sku: {
                                ...state.sku,
                                [variantKey]: generateSku(),
                            },
                        })
                    }
                    style={{
                        marginLeft: 10,
                        backgroundColor: "#111827",
                        paddingHorizontal: 14,
                        borderRadius: 10,
                        justifyContent: "center",
                        opacity: variation?.variationData?.sku ? 0.6 : 1,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "600",
                        }}
                    >
                        Generate
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (
                            state.sku[variantKey] ||
                            variation?.variationData?.sku
                        ) {
                            setisShowBasicInfo(true);
                        } else {
                            Alert.alert("", "Please generate SKU");
                        }
                    }}
                    style={{
                        backgroundColor: "#f3f4f6",
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: 8,
                        marginRight: 10,
                    }}
                >
                    <Text>Basic Info</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#f3f4f6",
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: 8,
                    }}
                >
                    <Text>Other Info</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
