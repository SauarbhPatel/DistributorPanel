import React from "react";
import { View, Text, Switch } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";
import { calculateDiscountPercent } from "../functions";
import CommonBox from "./CommonBox";
import InfoBox from "./InfoBox";

const BasicInfoPricingForm = ({ value = {}, onChange = () => {} }) => {
    const updateState = (data) => {
        const updated = { ...data };
        onChange(updated);
    };

    return (
        <View style={{}}>
            <InfoBox
                title="Basic Info & Pricing"
                subtitle="Configure tax rates and upload necessary compliance documents for your products."
            />
            <CommonBox
                title="Basic Informatrion"
                subtitle="Fill basic information of your product"
                footerNote="Enter the essential details to identify and manage your product."
                body={
                    <View style={{ gap: 10 }}>
                        <TextAreaBox
                            title="Product Title (0/200)"
                            placeholder="e.g. Samsung Galaxy S21"
                            required
                            value={value?.title}
                            valuekey="title"
                            onChangeText={updateState}
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 0,
                            }}
                            customInputProps={{
                                maxLength: 200,
                            }}
                        />

                        <TextAreaBox
                            title="Model Name"
                            placeholder="e.g. SM-G991B"
                            value={value?.modelName}
                            valuekey="modelName"
                            onChangeText={updateState}
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 0,
                            }}
                        />

                        {!value?.isVariableProduct && (
                            <TextAreaBox
                                title="SKU"
                                placeholder="e.g. SAM-ELEC-S21"
                                required
                                value={value.sku}
                                valuekey="sku"
                                onChangeText={updateState}
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 0,
                                }}
                            />
                        )}
                        <TextAreaBox
                            title="Slug"
                            placeholder="e.g. SAM-ELEC-2026"
                            required
                            value={value.slug}
                            valuekey="slug"
                            onChangeText={updateState}
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 0,
                            }}
                        />
                        {/* <View style={switchRow}>
                            <Text style={Fonts.blackColor14Medium}>
                                Is this a variable product?
                            </Text>
                            <Switch
                                value={value?.isVariableProduct}
                                onValueChange={(val) =>
                                    updateState({ isVariableProduct: val })
                                }
                                trackColor={{
                                    false: "#ccc",
                                    true: Colors.primaryColor,
                                }}
                            />
                        </View> */}
                        {!value?.isVariableProduct && (
                            <View style={rowStyle}>
                                <TextAreaBox
                                    title="EAN"
                                    value={value.ean}
                                    valuekey="ean"
                                    onChangeText={updateState}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 0,
                                    }}
                                    customStyle={{ flex: 1 }}
                                    keyboardType="number-pad"
                                />
                                <TextAreaBox
                                    title="GTIN"
                                    // value={state.gtin}
                                    valuekey="gtin"
                                    onChangeText={updateState}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 0,
                                    }}
                                    editable={false}
                                    customStyle={{ flex: 1, opacity: 0.6 }}
                                />
                            </View>
                        )}
                    </View>
                }
            />
            {!value?.isVariableProduct && (
                <CommonBox
                    title="Pricing & Inventory"
                    subtitle="Add Pricing & Inventory of your product"
                    footerNote="Set the product price, stock availability, and fulfillment details."
                    body={
                        <View style={{ gap: 0 }}>
                            <TextAreaBox
                                title="Quantity in the Box"
                                required
                                value={value?.quantityPerBox}
                                valuekey="quantityPerBox"
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    // 1. Remove non-numeric characters
                                    let newvalue =
                                        text?.quantityPerBox?.replace(
                                            /[^0-9]/g,
                                            "",
                                        );

                                    // 2. Remove leading zeros
                                    newvalue = newvalue.replace(
                                        /^0+(?=\d)/,
                                        "",
                                    );

                                    // 3. Allow empty while typing, but block zero
                                    if (newvalue === "0") return;

                                    updateState({ quantityPerBox: newvalue });
                                }}
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 0,
                                }}
                            />

                            <View style={rowStyle}>
                                <TextAreaBox
                                    title="MRP (₹) – Box price"
                                    required
                                    value={value?.boxMrp}
                                    valuekey="boxMrp"
                                    keyboardType="decimal-pad"
                                    onChangeText={(text) => {
                                        let val = text?.boxMrp?.replace(
                                            /[^0-9.]/g,
                                            "",
                                        );

                                        // Allow only one decimal point
                                        const parts = val.split(".");
                                        if (parts.length > 2) {
                                            val =
                                                parts[0] +
                                                "." +
                                                parts.slice(1).join("");
                                        }

                                        // Limit to 2 decimal places
                                        if (parts[1]?.length > 2) {
                                            val =
                                                parts[0] +
                                                "." +
                                                parts[1].slice(0, 2);
                                        }
                                        updateState({
                                            boxMrp: val,
                                            discountValue:
                                                calculateDiscountPercent(
                                                    val,
                                                    value?.boxSellingPrice,
                                                ),
                                        });
                                    }}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 10,
                                    }}
                                    customStyle={{ flex: 1.5 }}
                                />
                                <TextAreaBox
                                    title={"Unit MRP (auto)"}
                                    value={
                                        value?.quantityPerBox && value?.boxMrp
                                            ? String(
                                                  (Number(value?.boxMrp) || 0) /
                                                      (Number(
                                                          value?.quantityPerBox,
                                                      ) || 0),
                                              )
                                            : "0.00"
                                    }
                                    editable={false}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 10,
                                    }}
                                    customStyle={{ flex: 1, opacity: 0.6 }}
                                />
                            </View>

                            <View style={rowStyle}>
                                <TextAreaBox
                                    title="Selling Price(₹) – Box price"
                                    required
                                    value={value?.boxSellingPrice}
                                    valuekey="boxSellingPrice"
                                    keyboardType="decimal-pad"
                                    onChangeText={(text) => {
                                        let val =
                                            text?.boxSellingPrice?.replace(
                                                /[^0-9.]/g,
                                                "",
                                            );

                                        // Allow only one decimal point
                                        const parts = val?.split(".");
                                        console.log(parts, val);
                                        if (parts && parts?.length > 2) {
                                            val =
                                                parts[0] +
                                                "." +
                                                parts.slice(1).join("");
                                        }

                                        // Limit to 2 decimal places
                                        if (parts && parts[1]?.length > 2) {
                                            val =
                                                parts[0] +
                                                "." +
                                                parts[1].slice(0, 2);
                                        }
                                        updateState({
                                            boxSellingPrice: val,
                                            discountValue:
                                                calculateDiscountPercent(
                                                    value?.boxMrp,
                                                    val,
                                                ),
                                        });
                                    }}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 10,
                                    }}
                                    customStyle={{ flex: 1.5 }}
                                />
                                <TextAreaBox
                                    title="Unit Price (auto)"
                                    value={
                                        value?.quantityPerBox &&
                                        value?.boxSellingPrice
                                            ? String(
                                                  (Number(
                                                      value?.boxSellingPrice,
                                                  ) || 0) /
                                                      (Number(
                                                          value?.quantityPerBox,
                                                      ) || 0),
                                              )
                                            : "0.00"
                                    }
                                    editable={false}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 10,
                                    }}
                                    customStyle={{ flex: 1, opacity: 0.6 }}
                                />
                            </View>

                            <TextAreaBox
                                title="Discount % (auto)"
                                value={value?.discountValue}
                                editable={false}
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                customStyle={{ flex: 1, opacity: 0.6 }}
                            />

                            <TextAreaBox
                                title="Minimum Order Quantity"
                                value={value.minOrderQuantity}
                                valuekey="minOrderQuantity"
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    // 1. Remove non-numeric characters
                                    let newvalue =
                                        text?.minOrderQuantity?.replace(
                                            /[^0-9]/g,
                                            "",
                                        );

                                    // 2. Remove leading zeros
                                    newvalue = newvalue.replace(
                                        /^0+(?=\d)/,
                                        "",
                                    );

                                    // 3. Allow empty while typing, but block zero
                                    if (newvalue === "0") return;

                                    updateState({ minOrderQuantity: newvalue });
                                }}
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                            />
                            {/* DRAFT, ACTIVE, INACTIVE, BLOCKED, OUT_OF_STOCK */}
                            <DropDownTextAreaBox
                                type="select"
                                title="Listing Status"
                                list={[
                                    { id: "ACTIVE", name: "ACTIVE" },
                                    { id: "INACTIVE", name: "INACTIVE" },
                                    { id: "BLOCKED", name: "BLOCKED" },
                                    {
                                        id: "ARCHIVED",
                                        name: "ARCHIVED",
                                    },
                                    {
                                        id: "READY_FOR_ACTIVATE",
                                        name: "READY_FOR_ACTIVATE",
                                    },
                                ]}
                                value={
                                    value.listingStatus
                                        ? {
                                              id: value.listingStatus,
                                              name: value.listingStatus,
                                          }
                                        : null
                                }
                                onSelected={(val) =>
                                    updateState({ listingStatus: val?.id })
                                }
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                isSearchable
                            />

                            {/* <TextAreaBox
                                title="Stock Quantity"
                                required
                                value={value.stock}
                                valuekey="stock"
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    // 1. Remove non-numeric characters
                                    let newvalue = text?.stock?.replace(
                                        /[^0-9]/g,
                                        "",
                                    );

                                    // 2. Remove leading zeros
                                    newvalue = newvalue.replace(
                                        /^0+(?=\d)/,
                                        "",
                                    );

                                    updateState({ stock: newvalue });
                                }}
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                            /> */}

                            <DropDownTextAreaBox
                                type="select"
                                title="Fulfillment Type"
                                list={[
                                    // { id: "WAREHOUSE", name: "Warehouse" },
                                    { id: "SELLER", name: "SELLER" },
                                ]}
                                value={
                                    value.fulfilledBy
                                        ? {
                                              id: value.fulfilledBy,
                                              name: value.fulfilledBy,
                                          }
                                        : null
                                }
                                onSelected={(val) =>
                                    updateState({ fulfilledBy: val?.id })
                                }
                                inputCustomStyle={inputStyle}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                isSearchable
                            />
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    marginTop: 10,
                                }}
                            >
                                Inventory by hub
                            </Text>
                            <Text style={{ fontSize: 12, color: "#555" }}>
                                Enter quantity available at each location
                                (inventory hub).
                            </Text>
                            {value?.pickupPointsList?.map((item, index) => (
                                <TextAreaBox
                                    key={item?._id}
                                    title={item?.label}
                                    required
                                    value={item?.quantity?.toString() || "0"}
                                    valuekey="stock"
                                    keyboardType="number-pad"
                                    onChangeText={(text) => {
                                        // 1. Remove non-numeric characters
                                        let newvalue = text?.stock?.replace(
                                            /[^0-9]/g,
                                            "",
                                        );

                                        // 2. Remove leading zeros
                                        newvalue = newvalue.replace(
                                            /^0+(?=\d)/,
                                            "",
                                        );

                                        // 3. Update specific index
                                        const updatedList = [
                                            ...value.pickupPointsList,
                                        ];
                                        updatedList[index] = {
                                            ...updatedList[index],
                                            quantity: newvalue,
                                        };

                                        updateState({
                                            pickupPointsList: updatedList,
                                        });
                                    }}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        marginHorizontal: 0,
                                        marginTop: 10,
                                    }}
                                />
                            ))}

                            <TextAreaBox
                                title="Meta Title"
                                value={value.metaTitle}
                                valuekey="metaTitle"
                                onChangeText={onChange}
                                inputCustomStyle={inputStyle}
                                customStyle={{ flex: 1 }}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                            />
                            <TextAreaBox
                                title="Meta Description"
                                value={value.metaDescription}
                                valuekey="metaDescription"
                                onChangeText={onChange}
                                inputCustomStyle={inputStyle}
                                customStyle={{ flex: 1 }}
                                titleCustomStyle={{
                                    marginHorizontal: 0,
                                    marginTop: 10,
                                }}
                                multiline
                            />
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default BasicInfoPricingForm;

/* ================= Styles ================= */

const containerStyle = {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 14,
};

const rowStyle = {
    flexDirection: "row",
    gap: 10,
};

const switchRow = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
};

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};
