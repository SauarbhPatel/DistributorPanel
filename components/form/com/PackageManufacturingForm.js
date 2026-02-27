import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";

const PackageManufacturingForm = ({ value = {}, onChange = () => {} }) => {
    // const [state, setState] = useState({
    //     country: "",
    //     manufacturer: "",
    //     packer: "",
    //     importer: "",
    // });

    const updateState = (data) => {
        const updated = {
            ...data,
        };
        onChange(updated);
    };

    const updateDimension = (type, key, val) => {
        updateState({
            [type]: {
                ...value[type],
                [key]: val,
            },
        });
    };

    console.log(value?.packageDimension);

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

            {/* PRODUCT DIMENSIONS */}
            <Text style={Fonts.blackColor14Bold}>Product Dimensions</Text>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Length"
                    value={value.productDimension.length}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("productDimension", "length", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <TextAreaBox
                    title="Width"
                    value={value.productDimension.width}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("productDimension", "width", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Height"
                    value={value.productDimension.height}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("productDimension", "height", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <TextAreaBox
                    title="Weight"
                    value={value.productDimension.weight}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("productDimension", "weight", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
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
                    value={{
                        id: value.productDimension.lengthUnit,
                        name: value.productDimension.lengthUnit,
                    }}
                    onSelected={(val) =>
                        updateDimension(
                            "productDimension",
                            "lengthUnit",
                            val?.id,
                        )
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <DropDownTextAreaBox
                    type="select"
                    title="Weight Unit"
                    list={[
                        { id: "kg", name: "kg" },
                        { id: "lb", name: "lb" },
                    ]}
                    value={{
                        id: value?.productDimension.weightUnit,
                        name: value?.productDimension.weightUnit,
                    }}
                    onSelected={(val) =>
                        updateDimension(
                            "productDimension",
                            "weightUnit",
                            val?.id,
                        )
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
            </View>

            {/* SHIPPING DIMENSIONS */}
            <Text style={Fonts.blackColor14Bold}>
                Shipping Package Dimensions
            </Text>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Length"
                    value={value?.packageDimension.length}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("packageDimension", "length", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <TextAreaBox
                    title="Width"
                    value={value?.packageDimension.width}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("packageDimension", "width", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Height"
                    value={value?.packageDimension.height}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("packageDimension", "height", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <TextAreaBox
                    title="Weight"
                    value={value?.packageDimension.weight}
                    valuekey="text"
                    onChangeText={(val) =>
                        updateDimension("packageDimension", "weight", val?.text)
                    }
                    keyboardType="number-pad"
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
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
                    value={{
                        id: value?.packageDimension.lengthUnit,
                        name: value?.packageDimension.lengthUnit,
                    }}
                    onSelected={(val) =>
                        updateDimension(
                            "packageDimension",
                            "lengthUnit",
                            val?.id,
                        )
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
                <DropDownTextAreaBox
                    type="select"
                    title="Weight Unit"
                    list={[
                        { id: "kg", name: "kg" },
                        { id: "lb", name: "lb" },
                    ]}
                    value={{
                        id: value?.packageDimension.weightUnit,
                        name: value?.packageDimension.weightUnit,
                    }}
                    onSelected={(val) =>
                        updateDimension(
                            "packageDimension",
                            "weightUnit",
                            val?.id,
                        )
                    }
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                    titleCustomStyle={titleStyle}
                />
            </View>

            {/* ================= MANUFACTURING ================= */}
            {/* <Text style={Fonts.blackColor16Bold}>MANUFACTURING DETAILS</Text>

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
                titleCustomStyle={titleStyle}
            />

            <TextAreaBox
                title="Manufacturer Name"
                value={state.manufacturer}
                valuekey="text"
                onChangeText={(val) => updateState({ manufacturer: val })}
                inputCustomStyle={inputStyle}
                titleCustomStyle={titleStyle}
            />

            <TextAreaBox
                title="Packer Details"
                value={state.packer}
                valuekey="text"
                onChangeText={(val) => updateState({ packer: val })}
                multiline
                inputCustomStyle={inputStyle}
                titleCustomStyle={titleStyle}
            />

            <TextAreaBox
                title="Importer Details"
                value={state.importer}
                valuekey="text"
                onChangeText={(val) => updateState({ importer: val })}
                multiline
                inputCustomStyle={inputStyle}
                titleCustomStyle={titleStyle}
            /> */}
        </View>
    );
};

export default PackageManufacturingForm;

/* ================= STYLES ================= */

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

const titleStyle = {
    marginHorizontal: 0,
    marginTop: 10,
};
