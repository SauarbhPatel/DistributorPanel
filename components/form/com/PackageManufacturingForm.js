import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";

const PackageManufacturingForm = ({ value = {}, onChange = () => {} }) => {
    const [state, setState] = useState({
        productLength: "",
        productWidth: "",
        productHeight: "",
        productWeight: "",
        productLengthUnit: "cm",
        productWeightUnit: "kg",

        shippingLength: "",
        shippingWidth: "",
        shippingHeight: "",
        shippingWeight: "",
        shippingLengthUnit: "cm",
        shippingWeightUnit: "kg",

        country: "",
        manufacturer: "",
        packer: "",
        importer: "",
        ...value,
    });

    const updateState = (data) => {
        const updated = { ...state, ...data };
        setState(updated);
        onChange(updated);
    };

    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                padding: Sizes.fixPadding,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                gap: 15,
            }}
        >
            {/* ================= PACKAGE DETAILS ================= */}
            <Text style={Fonts.blackColor16Bold}>PACKAGE DETAILS</Text>

            {/* Product Dimensions */}
            <Text style={Fonts.blackColor14Bold}>Product Dimensions</Text>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Length"
                    value={state.productLength}
                    valuekey="productLength"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <TextAreaBox
                    title="Width"
                    value={state.productWidth}
                    valuekey="productWidth"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Height"
                    value={state.productHeight}
                    valuekey="productHeight"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <TextAreaBox
                    title="Weight"
                    value={state.productWeight}
                    valuekey="productWeight"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            <View style={rowStyle}>
                <DropDownTextAreaBox
                    type="select"
                    title="Length Unit"
                    list={[
                        { id: "cm", name: "cm" },
                        { id: "inch", name: "inch" },
                    ]}
                    value={
                        state.productLengthUnit
                            ? {
                                  id: state.productLengthUnit,
                                  name: state.productLengthUnit,
                              }
                            : null
                    }
                    onSelected={(val) =>
                        updateState({ productLengthUnit: val?.id })
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <DropDownTextAreaBox
                    type="select"
                    title="Weight Unit"
                    list={[
                        { id: "kg", name: "kg" },
                        { id: "lb", name: "lb" },
                    ]}
                    value={
                        state.productWeightUnit
                            ? {
                                  id: state.productWeightUnit,
                                  name: state.productWeightUnit,
                              }
                            : null
                    }
                    onSelected={(val) =>
                        updateState({ productWeightUnit: val?.id })
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            {/* Shipping Dimensions */}
            <Text style={Fonts.blackColor14Bold}>
                Shipping Package Dimensions
            </Text>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Length"
                    value={state.shippingLength}
                    valuekey="shippingLength"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <TextAreaBox
                    title="Width"
                    value={state.shippingWidth}
                    valuekey="shippingWidth"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Height"
                    value={state.shippingHeight}
                    valuekey="shippingHeight"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <TextAreaBox
                    title="Weight"
                    value={state.shippingWeight}
                    valuekey="shippingWeight"
                    onChangeText={updateState}
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            <View style={rowStyle}>
                <DropDownTextAreaBox
                    type="select"
                    title="Length Unit"
                    list={[
                        { id: "cm", name: "cm" },
                        { id: "inch", name: "inch" },
                    ]}
                    value={
                        state.shippingLengthUnit
                            ? {
                                  id: state.shippingLengthUnit,
                                  name: state.shippingLengthUnit,
                              }
                            : null
                    }
                    onSelected={(val) =>
                        updateState({ shippingLengthUnit: val?.id })
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
                <DropDownTextAreaBox
                    type="select"
                    title="Weight Unit"
                    list={[
                        { id: "kg", name: "kg" },
                        { id: "lb", name: "lb" },
                    ]}
                    value={
                        state.shippingWeightUnit
                            ? {
                                  id: state.shippingWeightUnit,
                                  name: state.shippingWeightUnit,
                              }
                            : null
                    }
                    onSelected={(val) =>
                        updateState({ shippingWeightUnit: val?.id })
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                />
            </View>

            {/* ================= MANUFACTURING ================= */}
            <Text style={Fonts.blackColor16Bold}>MANUFACTURING DETAILS</Text>

            <DropDownTextAreaBox
                type="select"
                title="Country of Origin"
                list={[
                    { id: "India", name: "India" },
                    { id: "USA", name: "USA" },
                    { id: "China", name: "China" },
                    { id: "UK", name: "UK" },
                ]}
                value={
                    state.country
                        ? { id: state.country, name: state.country }
                        : null
                }
                onSelected={(val) => updateState({ country: val?.id })}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Manufacturer Name"
                value={state.manufacturer}
                valuekey="manufacturer"
                onChangeText={updateState}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Packer Details"
                value={state.packer}
                valuekey="packer"
                onChangeText={updateState}
                multiline
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Importer Details"
                value={state.importer}
                valuekey="importer"
                onChangeText={updateState}
                multiline
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />
        </View>
    );
};

export default PackageManufacturingForm;

/* ================= Styles ================= */

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const rowStyle = {
    flexDirection: "row",
    gap: 10,
};
