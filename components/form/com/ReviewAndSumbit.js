import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../constants/styles";
import CommonBox from "./CommonBox";
import InfoBox from "./InfoBox";
import CompletionChecklist from "./CompletionChecklist";
import ErrorBox from "./ErrorBox";
import SubmitBox from "./SubmitBox";

const ReviewAndSumbit = ({ value, onSubmit = () => {} }) => {
    const {
        categoryId,
        brandId,
        //
        title,
        modelName,
        sku,
        slug,
        ean,
        gtin,
        quantityPerBox,
        boxMrp,
        discountValue,
        boxSellingPrice,
        minOrderQuantity,
        listingStatus,
        stock,
        fulfilledBy,
        pickupPointsList,
        //
        regularAttributes,
        //
        description, //bullets
        fullDescriptionHtmlContent,
        dynamicSection,
        //
        mainImageUrl,
        galleryImageUrls,
        shortVideoUrl,
        //
        hsn,
        complianceDocuments,
        //
        productDimension,
        packageDimension,
        country,
        manufacturer,
        packer,
        importer,
    } = value;
    // console.log(
    //     "Details,",
    //     JSON.stringify({
    //         categoryId,
    //         brandId,
    //         //
    //         title,
    //         modelName,
    //         sku,
    //         slug,
    //         ean,
    //         gtin,
    //         quantityPerBox,
    //         boxMrp,
    //         discountValue,
    //         boxSellingPrice,
    //         minOrderQuantity,
    //         listingStatus,
    //         stock,
    //         fulfilledBy,
    //         pickupPointsList,
    //         //
    //         regularAttributes,
    //         //
    //         description, //bullets
    //         fullDescriptionHtmlContent,
    //         dynamicSection,
    //         //
    //         mainImageUrl,
    //         galleryImageUrls,
    //         shortVideoUrl,
    //         //
    //         hsn,
    //         complianceDocuments,
    //         //
    //         productDimension,
    //         packageDimension,
    //         country,
    //         manufacturer,
    //         packer,
    //         importer,
    //     }),
    // );
    return (
        <View style={{}}>
            <InfoBox
                title="Review & Submit"
                subtitle="Review your product details before submitting for approval."
                infoTitle="Select a category in Step 1 to load category-specific attributes."
                infoSub="(For this demo, generic description fields are shown)"
            />
            <CommonBox
                title="Main Image "
                subtitle="Primary product photo displayed in search results and listings"
                body={
                    <View>
                        <View style={styles.card}>
                            {/* Left Image */}
                            <View style={styles.imageBox}>
                                {/* <View style={styles.brandTag}>
                                    <Text style={styles.brandText}>Sony</Text>
                                </View>

                                <View style={styles.imagePlaceholder}>
                                    <Ionicons
                                        name="image-outline"
                                        size={28}
                                        color="#9ca3af"
                                    />
                                </View>

                                <View style={styles.uploadedTag}>
                                    <Text style={styles.uploadedText}>
                                        UPLOADED
                                    </Text>
                                </View> */}
                                <Image
                                    source={{
                                        uri: value?.mainImageUrl,
                                    }}
                                    style={{
                                        flex: 1,
                                    }}
                                />
                            </View>

                            {/* Right Content */}
                            <View style={styles.content}>
                                {/* Breadcrumb */}
                                <Text style={styles.breadcrumb}>
                                    {value?.categoryId?.label} {"  "}
                                    {value?.brandId?.name}
                                </Text>

                                {/* Title */}
                                <Text style={styles.title}>{value?.title}</Text>

                                {/* Price */}
                                <Text style={styles.price}>
                                    ₹{value?.boxSellingPrice}
                                </Text>

                                {/* Status Row */}
                                <View style={styles.statusRow}>
                                    <View style={styles.activeTag}>
                                        <Text style={styles.activeText}>
                                            Active
                                        </Text>
                                    </View>
                                    <Text style={styles.galleryText}>
                                        {value?.galleryImageUrls?.length || 0}{" "}
                                        gallery images
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* Info Grid */}
                        <View style={styles.infoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.label}>SKU</Text>
                                <Text style={styles.value}>{value?.sku}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.label}>HSN Code</Text>
                                <Text style={styles.value}>
                                    {value?.hsn?.name}
                                </Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.label}>
                                    Country of Origin
                                </Text>
                                <Text style={styles.value}>
                                    {value?.country}
                                </Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.label}>Manufacturer</Text>
                                <Text style={styles.value}>
                                    {value?.manufacturer}
                                </Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.label}>Key Features</Text>
                                <Text style={styles.value}>5 bullets</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.label}>Video</Text>
                                <Text style={styles.value}>
                                    {value?.videoUrl ? "Uploaded" : "-"}
                                </Text>
                            </View>
                        </View>
                    </View>
                }
            />
            <CompletionChecklist />
            {/* <ErrorBox /> */}
            <SubmitBox onPress={onSubmit} />
        </View>
    );
};

export default ReviewAndSumbit;
const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        gap: 14,
    },

    imageBox: {
        width: 110,
        height: 120,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
        justifyContent: "space-between",
        overflow: "hidden",
    },

    brandTag: {
        backgroundColor: "#f3f4f6",
        alignSelf: "flex-start",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },

    brandText: {
        fontSize: 10,
        color: "#6b7280",
    },

    imagePlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    uploadedTag: {
        backgroundColor: "#10b981",
        paddingVertical: 3,
        borderRadius: 6,
        alignItems: "center",
    },

    uploadedText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "600",
    },

    content: {
        flex: 1,
    },

    breadcrumb: {
        fontSize: 11,
        color: "#9ca3af",
        marginBottom: 4,
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },

    price: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 6,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    activeTag: {
        backgroundColor: "#dcfce7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    activeText: {
        color: "#16a34a",
        fontSize: 11,
        fontWeight: "600",
    },

    galleryText: {
        fontSize: 11,
        color: "#6b7280",
    },

    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 8,
    },

    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 10,
    },

    infoItem: {
        width: "48%",
    },

    label: {
        fontSize: 10,
        color: "#9ca3af",
    },

    value: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111827",
        marginTop: 2,
    },
});
