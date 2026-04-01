import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const ProductListingCard = ({
    item,
    onDelete = () => {},
    onEdit = () => {},
    onView = () => {},
}) => {
    const listing = item?.listing;
    const listings = item?.listings;
    const product = listing?.product;
    const globalProduct = item?.globalProduct;
    const [state, setState] = useState({
        isShowVariants: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));
    const { isShowVariants } = state;

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <View style={styles.imageBox}>
                        <Image
                            source={{
                                uri:
                                    product?.mainImageUrl ||
                                    listings[0]?.product?.mainImageUrl,
                            }}
                            style={styles.image}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{globalProduct?.title}</Text>
                        <Text style={styles.subText}>
                            SKU: {listing?.sku || listings[0]?.sku}
                        </Text>
                        <Text style={styles.subText}>
                            PSN: {globalProduct?.globalProductId}
                        </Text>
                        <Text style={styles.subText}>
                            LID: {listing?.listingId || listings[0]?.listingId}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={onDelete}>
                    <Feather name="trash-2" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>

            {/* Status + Price */}
            {listing ? (
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>STATUS</Text>
                        <View style={styles.statusBox}>
                            <View
                                style={[
                                    styles.statusDot,
                                    {
                                        backgroundColor:
                                            listing?.status === "ACTIVE"
                                                ? "#10B981"
                                                : "#EF4444",
                                    },
                                ]}
                            />
                            <Text style={styles.statusText}>
                                {listing?.status}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>PRICE</Text>
                        <Text style={styles.mrp}>₹{listing?.boxMrp}/Box</Text>
                        <Text style={styles.price}>
                            ₹{listing?.boxsellingPrice}
                        </Text>
                    </View>
                </View>
            ) : null}

            {/* Stock */}
            <View style={styles.stockRow}>
                <Text style={styles.label}>TOTAL STOCK</Text>
                <Text style={styles.stockValue}>
                    {item?.totalStock || 0} units
                </Text>
            </View>

            {/* Inventory */}
            {listing ? (
                <View style={styles.inventoryContainer}>
                    <Text style={styles.label}>INVENTORY BY LOCATION</Text>

                    <View style={styles.inventoryRow}>
                        {listing?.inventoryByPickup?.map((inv, index) => (
                            <View key={index} style={styles.inventoryCard}>
                                <Text style={styles.invName}>
                                    {inv?.pickupPointName}
                                </Text>
                                <Text style={styles.invQty}>
                                    {inv?.quantity}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : (
                <View style={styles.inventoryContainer}>
                    <Text style={styles.label}>VARIANTS - </Text>
                    <Text style={styles.stockValue}>
                        {listings?.length || 0} total {"  "}
                        <Text
                            style={{
                                ...styles.stockValue,
                                color: Colors.primaryColor,
                                fontSize: 10,
                                textDecorationLine: "underline",
                            }}
                            onPress={() => {
                                updateState({
                                    isShowVariants: !isShowVariants,
                                });
                            }}
                        >
                            {isShowVariants ? "Hide" : "Show"} VARIANTS
                        </Text>
                    </Text>
                    {isShowVariants ? (
                        <View style={{ marginTop: 10 }}>
                            {listings?.map((subItem, index) => (
                                <ProductListingCard
                                    key={index + "sub"}
                                    item={{
                                        ...item,
                                        listing: subItem,
                                        listings: [],
                                    }}
                                    onDelete={() => {}}
                                    onEdit={() => {}}
                                    onView={() => {}}
                                />
                            ))}
                        </View>
                    ) : null}
                </View>
            )}

            {/* Actions */}
            <View style={styles.actionRow}>
                <TouchableOpacity onPress={onView}>
                    <Feather name="eye" size={18} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onEdit}>
                    <Feather name="edit" size={18} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Feather name="trash" size={18} />
                </TouchableOpacity>
            </View>

            {/* Accent */}
            <View style={styles.accentBorder} />
        </View>
    );
};

export default ProductListingCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 16,
        position: "relative",
        overflow: "hidden",
    },

    accentBorder: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        backgroundColor: "#0071BC",
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    headerLeft: {
        flexDirection: "row",
        flex: 1,
    },

    imageBox: {
        width: 45,
        height: 45,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
        backgroundColor: "#F1F5F9",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },

    subText: {
        fontSize: 11,
        color: "#64748B",
    },

    infoRow: {
        flexDirection: "row",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 10,
    },

    infoItem: {
        flex: 1,
    },

    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 5,
    },

    statusBox: {
        flexDirection: "row",
        alignItems: "center",
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        marginRight: 6,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },

    mrp: {
        textDecorationLine: "line-through",
        color: "#94A3B8",
        fontSize: 12,
    },

    price: {
        color: "#EF4444",
        fontWeight: "700",
    },

    stockRow: {
        marginTop: 10,
    },

    stockValue: {
        fontSize: 14,
        fontWeight: "700",
    },

    inventoryContainer: {
        marginTop: 12,
    },

    inventoryRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    inventoryCard: {
        backgroundColor: "#F1F5F9",
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
        marginTop: 6,
        minWidth: "45%",
    },

    invName: {
        fontSize: 11,
        color: "#64748B",
    },

    invQty: {
        fontSize: 14,
        fontWeight: "700",
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 10,
    },
});
