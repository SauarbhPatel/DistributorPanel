// import { Alert } from "react-native";

// export const productValidateForm = (tab = 1, { categoryId, brandId }) => {
//     if (tab == 1) {
//         if (!categoryId)
//             return Alert.alert("Validation Error", "Please select Category");
//         if (!brandId)
//             return Alert.alert("Validation Error", "Please select Brand");
//     }

//     return true;
// };

import { Alert } from "react-native";

export const productValidateForm = (
    tab = 1,
    {
        categoryId,
        brandId,

        // Tab 2 – Basic Info
        title,
        modelName,
        sku,
        ean,

        // Pricing & Inventory
        isVariableProduct = false,
        quantityPerBox,
        boxMrp,
        boxSellingPrice,
        discountType,
        discountValue,
        minOrderQuantity,
        stock,
        listingStatus,
        fulfilledBy,
        metaTitle,
        metaDescription,

        // TAB 3
        regularAttributes = [],
        dynamicSection = [],
        description,
        fullDescriptionHtmlContent,

        // TAB 4
        shortVideoUrl,
        mainImageUrl,
        galleryImageUrls = [],

        // TAB 5
        hsn,
        complianceDocuments = [],

        // TAB 6
        productDimension = {},
        packageDimension = {},
    },
) => {
    // if ([2].includes(tab)) return true;
    /* ---------------- TAB 1 ---------------- */
    if (tab === 1) {
        if (!categoryId)
            return Alert.alert("Validation Error", "Please select Category");

        if (!brandId)
            return Alert.alert("Validation Error", "Please select Brand");
    }

    /* ---------------- TAB 2 ---------------- */
    if (tab === 2) {
        /* ---------- Basic Info ---------- */
        if (!title?.trim())
            return Alert.alert("Validation Error", "Product title is required");

        if (!modelName?.trim())
            return Alert.alert("Validation Error", "Model name is required");

        if (!sku?.trim())
            return Alert.alert("Validation Error", "SKU is required");

        /* -------------------------------------------------
           Pricing & Inventory
           ONLY when product is NOT variable
        -------------------------------------------------- */
        if (!isVariableProduct) {
            if (!ean?.trim())
                return Alert.alert("Validation Error", "EAN is required");

            if (!quantityPerBox || Number(quantityPerBox) <= 0)
                return Alert.alert(
                    "Validation Error",
                    "Quantity per box must be greater than 0",
                );

            if (!boxMrp || Number(boxMrp) <= 0)
                return Alert.alert(
                    "Validation Error",
                    "MRP must be greater than 0",
                );

            if (!boxSellingPrice || Number(boxSellingPrice) <= 0)
                return Alert.alert(
                    "Validation Error",
                    "Selling price must be greater than 0",
                );

            if (Number(boxSellingPrice) > Number(boxMrp))
                return Alert.alert(
                    "Validation Error",
                    "Selling price cannot be greater than MRP",
                );

            /* ---------- Discount ---------- */
            if (discountType === "PERCENTAGE") {
                if (Number(discountValue) < 0 || Number(discountValue) > 100)
                    return Alert.alert(
                        "Validation Error",
                        "Discount percentage must be between 0 and 100",
                    );
            }

            if (discountType === "FLAT") {
                if (Number(discountValue) < 0)
                    return Alert.alert(
                        "Validation Error",
                        "Discount amount cannot be negative",
                    );

                if (Number(discountValue) > Number(boxMrp))
                    return Alert.alert(
                        "Validation Error",
                        "Discount cannot exceed MRP",
                    );
            }

            if (!minOrderQuantity || Number(minOrderQuantity) <= 0)
                return Alert.alert(
                    "Validation Error",
                    "Minimum order quantity must be greater than 0",
                );

            if (!stock || Number(stock) < 0)
                return Alert.alert(
                    "Validation Error",
                    "Stock cannot be negative",
                );
        }

        /* ---------- Listing Status ---------- */
        if (
            ![
                "DRAFT",
                "ACTIVE",
                "INACTIVE",
                "BLOCKED",
                "OUT_OF_STOCK",
            ].includes(listingStatus)
        )
            return Alert.alert("Validation Error", "Invalid listing status");
    }

    /* ---------------- TAB 3 ---------------- */
    if (tab === 3) {
        for (const attr of regularAttributes) {
            if (!Array.isArray(attr.values) || attr.values.length === 0) {
                return Alert.alert(
                    "Validation Error",
                    "Attribute values cannot be empty",
                );
            }
        }

        for (const section of dynamicSection) {
            if (!section.sectionTitle?.trim())
                return Alert.alert(
                    "Validation Error",
                    "Section title is required",
                );

            if (!section.content?.trim())
                return Alert.alert(
                    "Validation Error",
                    "Section content is required",
                );
        }
        if (!description?.trim())
            return Alert.alert(
                "Validation Error",
                "Product description is required",
            );

        if (!fullDescriptionHtmlContent?.trim())
            return Alert.alert(
                "Validation Error",
                "Full product description is required",
            );
    }
    /* ---------------- TAB 4 ---------------- */
    if (tab === 4) {
        if (!mainImageUrl?.trim())
            return Alert.alert(
                "Validation Error",
                "Main product image is required",
            );

        if (!Array.isArray(galleryImageUrls) || galleryImageUrls.length === 0)
            return Alert.alert(
                "Validation Error",
                "At least one gallery image is required",
            );
    }
    /* ---------------- TAB 5 ---------------- */
    if (tab === 5) {
        for (const doc of complianceDocuments) {
            if (doc.isMandatory) {
                if (!doc.url?.trim())
                    return Alert.alert(
                        "Validation Error",
                        `${doc.name} document is required(Upload document)`,
                    );

                if (!doc.expiryDate)
                    return Alert.alert(
                        "Validation Error",
                        `${doc.name} expiry date is required`,
                    );
            }
        }
    }
    /* ---------------- TAB 6 ---------------- */
    if (tab === 6) {
        const validateDimension = (dim, label) => {
            const { length, width, height, weight, lengthUnit, weightUnit } =
                dim;

            if (!length || !width || !height || !weight)
                return Alert.alert(
                    "Validation Error",
                    `${label} dimensions are required`,
                );

            if (!lengthUnit || !weightUnit)
                return Alert.alert(
                    "Validation Error",
                    `${label} units are required`,
                );
        };

        validateDimension(productDimension, "Product");
        validateDimension(packageDimension, "Package");
    }

    return true;
};
export const calculateDiscountPercent = (mrp, sellingPrice) => {
    const mrpVal = Number(mrp);
    const sellVal = Number(sellingPrice);

    if (!mrpVal || !sellVal || mrpVal <= 0) return "0.00";

    const discount = ((mrpVal - sellVal) / mrpVal) * 100;

    return discount > 0 ? discount.toFixed(2) : "0.00";
};
