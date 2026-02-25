import React, { useEffect, useState } from "react";
import { View, Text, Switch } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles";
import { TextAreaBox, DropDownTextAreaBox } from "../../../modules";

const BasicInfoPricingForm = ({ value = {}, onChange = () => {} }) => {
    const [state, setState] = useState({
        category: "",
        brand: "",

        productTitle: "",
        modelName: "",
        sku: "",
        isVariableProduct: false,

        ean: "",
        gtin: "",

        quantityInBox: "1",
        mrpBoxPrice: "",
        sellingBoxPrice: "",
        unitMrp: "0.00",
        unitSellingPrice: "0.00",
        discountPercent: "0",

        minOrderQty: "1",
        listingStatus: "ACTIVE",
        stockQty: "",
        fulfillmentType: "WAREHOUSE",
        shippingProvider: "",

        ...value,
    });

    const updateState = (data) => {
        const updated = { ...state, ...data };
        setState(updated);
        onChange(updated);
    };

    /* ---------------- Auto Calculations ---------------- */
    useEffect(() => {
        const qty = Number(state.quantityInBox || 1);
        const mrp = Number(state.mrpBoxPrice || 0);
        const sell = Number(state.sellingBoxPrice || 0);

        const unitMrp = qty ? (mrp / qty).toFixed(2) : "0.00";
        const unitSell = qty ? (sell / qty).toFixed(2) : "0.00";

        const discount =
            mrp > 0 ? (((mrp - sell) / mrp) * 100).toFixed(2) : "0";

        updateState({
            unitMrp,
            unitSellingPrice: unitSell,
            discountPercent: discount,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.quantityInBox, state.mrpBoxPrice, state.sellingBoxPrice]);

    return (
        <View style={containerStyle}>
            {/* ================= BASIC INFO ================= */}
            <Text style={Fonts.blackColor16Bold}>BASIC INFO</Text>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Category (read-only)"
                    value={state.category}
                    editable={false}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
                <TextAreaBox
                    title="Brand (read-only)"
                    value={state.brand}
                    editable={false}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
            </View>

            <TextAreaBox
                title="Product Title"
                required
                value={state.productTitle}
                valuekey="productTitle"
                onChangeText={updateState}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Model Name"
                value={state.modelName}
                valuekey="modelName"
                onChangeText={updateState}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="SKU"
                required
                value={state.sku}
                valuekey="sku"
                onChangeText={updateState}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <View style={switchRow}>
                <Text style={Fonts.blackColor14Medium}>
                    Is this a variable product?
                </Text>
                <Switch
                    value={state.isVariableProduct}
                    onValueChange={(val) =>
                        updateState({ isVariableProduct: val })
                    }
                    trackColor={{
                        false: "#ccc",
                        true: Colors.primaryColor,
                    }}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="EAN"
                    value={state.ean}
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
                    value={state.gtin}
                    valuekey="gtin"
                    onChangeText={updateState}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
            </View>

            {/* ================= PRICING & INVENTORY ================= */}
            <Text style={Fonts.blackColor16Bold}>PRICING & INVENTORY</Text>

            <TextAreaBox
                title="Quantity in the Box"
                required
                value={state.quantityInBox}
                valuekey="quantityInBox"
                keyboardType="number-pad"
                onChangeText={updateState}
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
                    value={state.mrpBoxPrice}
                    valuekey="mrpBoxPrice"
                    keyboardType="number-pad"
                    onChangeText={updateState}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
                <TextAreaBox
                    title="Unit MRP (auto)"
                    value={state.unitMrp}
                    editable={false}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
            </View>

            <View style={rowStyle}>
                <TextAreaBox
                    title="Selling Price(₹) – Box price"
                    required
                    value={state.sellingBoxPrice}
                    valuekey="sellingBoxPrice"
                    keyboardType="number-pad"
                    onChangeText={updateState}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
                <TextAreaBox
                    title="Unit Selling Price (auto)"
                    value={state.unitSellingPrice}
                    editable={false}
                    inputCustomStyle={inputStyle}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    customStyle={{ flex: 1 }}
                />
            </View>

            <TextAreaBox
                title="Discount % (auto)"
                value={state.discountPercent}
                editable={false}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Minimum Order Quantity"
                value={state.minOrderQty}
                valuekey="minOrderQty"
                keyboardType="number-pad"
                onChangeText={updateState}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <DropDownTextAreaBox
                type="select"
                title="Listing Status"
                list={[
                    { id: "ACTIVE", name: "Active" },
                    { id: "INACTIVE", name: "Inactive" },
                ]}
                value={
                    state.listingStatus
                        ? {
                              id: state.listingStatus,
                              name: state.listingStatus,
                          }
                        : null
                }
                onSelected={(val) => updateState({ listingStatus: val?.id })}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <TextAreaBox
                title="Stock Quantity"
                required
                value={state.stockQty}
                valuekey="stockQty"
                keyboardType="number-pad"
                onChangeText={updateState}
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
                    { id: "WAREHOUSE", name: "Warehouse" },
                    { id: "SELLER", name: "Seller" },
                ]}
                value={
                    state.fulfillmentType
                        ? {
                              id: state.fulfillmentType,
                              name: state.fulfillmentType,
                          }
                        : null
                }
                onSelected={(val) => updateState({ fulfillmentType: val?.id })}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />

            <DropDownTextAreaBox
                type="select"
                title="Shipping Service Provider"
                list={[
                    { id: "BAOFENG", name: "Baofeng" },
                    { id: "DELHIVERY", name: "Delhivery" },
                ]}
                value={
                    state.shippingProvider
                        ? {
                              id: state.shippingProvider,
                              name: state.shippingProvider,
                          }
                        : null
                }
                onSelected={(val) => updateState({ shippingProvider: val?.id })}
                inputCustomStyle={inputStyle}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 10,
                }}
            />
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
