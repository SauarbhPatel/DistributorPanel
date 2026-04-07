import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";
import CommonBox from "./CommonBox";
import InfoBox from "./InfoBox";

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
        <View style={{}}>
            <InfoBox
                title="Package & Manufacturing"
                subtitle="Product and shipping dimensions. Unit selectors for cm/inch, kg/lb."
                infoTitle="Select a category in Step 1 to load category-specific attributes."
                infoSub="(For this demo, generic description fields are shown)"
            />
            <CommonBox
                title="Product Dimensions"
                subtitle="Physical dimensions of the product itself"
                body={
                    <>
                        <View style={{ ...rowStyle, marginTop: -10 }}>
                            <TextAreaBox
                                title="Length"
                                value={value.productDimension.length}
                                valuekey="text"
                                onChangeText={(val) =>
                                    updateDimension(
                                        "productDimension",
                                        "length",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "productDimension",
                                        "width",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "productDimension",
                                        "height",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "productDimension",
                                        "weight",
                                        val?.text,
                                    )
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
                    </>
                }
            />
            <CommonBox
                title="Shipping Package"
                subtitle="Outer packaging dimensions for shipping calculations"
                footerNote={
                    "Shipping dimensions should include all packaging materials (box, bubble wrap, etc.)"
                }
                body={
                    <>
                        <View style={{ ...rowStyle, marginTop: -10 }}>
                            <TextAreaBox
                                title="Length"
                                value={value?.packageDimension.length}
                                valuekey="text"
                                onChangeText={(val) =>
                                    updateDimension(
                                        "packageDimension",
                                        "length",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "packageDimension",
                                        "width",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "packageDimension",
                                        "height",
                                        val?.text,
                                    )
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
                                    updateDimension(
                                        "packageDimension",
                                        "weight",
                                        val?.text,
                                    )
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
                    </>
                }
            />
            <CommonBox
                title="Manufacturing Details"
                subtitle="Origin and manufacturer information for compliance"
                footerNote="Enter a clear, user-friendly name for the category."
                body={
                    <>
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
                                value.country
                                    ? { id: value.country, name: value.country }
                                    : null
                            }
                            onSelected={(val) =>
                                updateState({ country: val?.id })
                            }
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={titleStyle}
                        />

                        <TextAreaBox
                            title="Manufacturer Name"
                            placeholder="Enter manufacturer name"
                            value={value.manufacturer}
                            valuekey="text"
                            onChangeText={(val) =>
                                updateState({ manufacturer: val })
                            }
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={titleStyle}
                        />

                        <TextAreaBox
                            title="Packer Details"
                            placeholder="Enter packer name and address"
                            value={value.packer}
                            valuekey="text"
                            onChangeText={(val) => updateState({ packer: val })}
                            multiline
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={titleStyle}
                        />

                        <TextAreaBox
                            title="Importer Details"
                            placeholder="Enter importer name and address"
                            value={value.importer}
                            valuekey="text"
                            onChangeText={(val) =>
                                updateState({ importer: val })
                            }
                            multiline
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={titleStyle}
                        />
                    </>
                }
            />
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
