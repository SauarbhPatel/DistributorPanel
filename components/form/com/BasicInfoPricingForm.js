import React from "react";
import { View, Text, Switch } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";
import { calculateDiscountPercent } from "../functions";

const BasicInfoPricingForm = ({ value = {}, onChange = () => {} }) => {
    const updateState = (data) => {
        const updated = { ...data };
        onChange(updated);
    };

    return (
        <View style={containerStyle}>
            {/* ================= BASIC INFO ================= */}
            <Text style={Fonts.blackColor16Bold}>BASIC INFO</Text>

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

            <View style={switchRow}>
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
            </View>
            {!value?.isVariableProduct && (
                <View>
                    <View style={rowStyle}>
                        <TextAreaBox
                            title="EAN"
                            value={value.ean}
                            valuekey="ean"
                            onChangeText={updateState}
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            customStyle={{ flex: 1 }}
                        />
                        <TextAreaBox
                            title="GTIN"
                            // value={state.gtin}
                            valuekey="gtin"
                            onChangeText={updateState}
                            inputCustomStyle={inputStyle}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            editable={false}
                            customStyle={{ flex: 1, opacity: 0.6 }}
                        />
                    </View>

                    {/* ================= PRICING & INVENTORY ================= */}
                    <Text style={{ ...Fonts.blackColor16Bold, marginTop: 10 }}>
                        PRICING & INVENTORY
                    </Text>
                    <Text style={Fonts.lightGrayColor12Medium}>
                        MRP and Selling Price are Box prices. Unit prices are
                        calculated per item in the box.
                    </Text>

                    <TextAreaBox
                        title="Quantity in the Box"
                        required
                        value={value?.quantityPerBox}
                        valuekey="quantityPerBox"
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            // 1. Remove non-numeric characters
                            let newvalue = text?.quantityPerBox?.replace(
                                /[^0-9]/g,
                                "",
                            );

                            // 2. Remove leading zeros
                            newvalue = newvalue.replace(/^0+(?=\d)/, "");

                            // 3. Allow empty while typing, but block zero
                            if (newvalue === "0") return;

                            updateState({ quantityPerBox: newvalue });
                        }}
                        inputCustomStyle={inputStyle}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
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
                                let val = text?.boxMrp?.replace(/[^0-9.]/g, "");

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
                                    val = parts[0] + "." + parts[1].slice(0, 2);
                                }
                                updateState({
                                    boxMrp: val,
                                    discountValue: calculateDiscountPercent(
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
                            customStyle={{ flex: 1.3 }}
                        />
                        <TextAreaBox
                            title={"Unit MRP (auto)"}
                            value={
                                value?.quantityPerBox && value?.boxMrp
                                    ? String(
                                          (Number(value?.boxMrp) || 0) /
                                              (Number(value?.quantityPerBox) ||
                                                  0),
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
                                let val = text?.boxSellingPrice?.replace(
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
                                    val = parts[0] + "." + parts[1].slice(0, 2);
                                }
                                updateState({
                                    boxSellingPrice: val,
                                    discountValue: calculateDiscountPercent(
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
                            customStyle={{ flex: 1.3 }}
                        />
                        <TextAreaBox
                            title="Unit Selling Price (auto)"
                            value={
                                value?.quantityPerBox && value?.boxSellingPrice
                                    ? String(
                                          (Number(value?.boxSellingPrice) ||
                                              0) /
                                              (Number(value?.quantityPerBox) ||
                                                  0),
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
                            let newvalue = text?.minOrderQuantity?.replace(
                                /[^0-9]/g,
                                "",
                            );

                            // 2. Remove leading zeros
                            newvalue = newvalue.replace(/^0+(?=\d)/, "");

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
                            { id: "DRAFT", name: "DRAFT" },
                            { id: "ACTIVE", name: "ACTIVE" },
                            { id: "INACTIVE", name: "INACTIVE" },
                            { id: "BLOCKED", name: "BLOCKED" },
                            { id: "OUT_OF_STOCK", name: "OUT_OF_STOCK" },
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

                    <TextAreaBox
                        title="Stock Quantity"
                        required
                        value={value.stock}
                        valuekey="stock"
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            // 1. Remove non-numeric characters
                            let newvalue = text?.stock?.replace(/[^0-9]/g, "");

                            // 2. Remove leading zeros
                            newvalue = newvalue.replace(/^0+(?=\d)/, "");

                            updateState({ stock: newvalue });
                        }}
                        inputCustomStyle={inputStyle}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                    />

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

                    <DropDownTextAreaBox
                        type="select"
                        title="Shipping Service Provider"
                        list={[
                            { id: "BAOFENG", name: "Baofeng" },
                            { id: "DELHIVERY", name: "Delhivery" },
                        ]}
                        // value={
                        //     state.shippingProvider
                        //         ? {
                        //               id: state.shippingProvider,
                        //               name: state.shippingProvider,
                        //           }
                        //         : null
                        // }
                        onSelected={(val) =>
                            updateState({ shippingProvider: val?.id })
                        }
                        inputCustomStyle={inputStyle}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        editable={false}
                        customStyle={{ flex: 1, opacity: 0.6 }}
                    />

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
