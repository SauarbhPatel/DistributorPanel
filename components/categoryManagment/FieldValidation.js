import { Alert } from "react-native";

export const ValidateForm = (tab = 1, state) => {
    console.log(tab);
    const { parentCategory } = state;
    if (tab === 0) {
        const { categoryName, categoryCode, slug, parentCategory } = state;

        if (!categoryName || categoryName.trim().length === 0) {
            Alert.alert("Validation Error", "Category Name is required");
            return false;
        }

        if (!categoryCode || categoryCode.trim().length === 0) {
            Alert.alert("Validation Error", "Category Code is required");
            return false;
        }
        if (!slug || slug.trim().length === 0) {
            Alert.alert("Validation Error", "Slug is required");
            return false;
        }
    }
    if (tab === 1) {
        const { selectedSets } = state;
        console.log("selectedSets", selectedSets.length);
        if (selectedSets.length === 0) {
            Alert.alert("Validation Error", "Attribute Set is required");
            return false;
        }
    }
    if (parentCategory?.id) {
        if (tab === 5) {
            const { shippingZoneIds } = state;
            if (shippingZoneIds.length === 0) {
                Alert.alert("Validation Error", "Shipping Zone is required");
                return false;
            }
        }
        if (tab === 6) {
            const { image, icon } = state;
            if (!image) {
                Alert.alert("Validation Error", "Image is required");
                return false;
            }
            if (!icon) {
                Alert.alert("Validation Error", "Icon is required");
                return false;
            }
        }
        if (tab === 7) {
            const { canonicalUrl } = state;
            if (!canonicalUrl) {
                Alert.alert("Validation Error", "Canonical Url is required");
                return false;
            }
        }
    }
    if (!parentCategory?.id) {
        if (tab === 4) {
            const { hsnSetIds } = state;
            if (hsnSetIds.length === 0) {
                Alert.alert("Validation Error", "HSN Set is required");
                return false;
            }
        }
        if (tab === 6) {
            const { shippingZoneIds } = state;
            if (shippingZoneIds.length === 0) {
                Alert.alert("Validation Error", "Shipping Zone is required");
                return false;
            }
        }
        if (tab === 7) {
            const { image, icon } = state;
            if (!image) {
                Alert.alert("Validation Error", "Image is required");
                return false;
            }
            if (!icon) {
                Alert.alert("Validation Error", "Icon is required");
                return false;
            }
        }
        if (tab === 8) {
            const { canonicalUrl } = state;
            if (!canonicalUrl) {
                Alert.alert("Validation Error", "Canonical Url is required");
                return false;
            }
        }
    }

    console.log("Validation Passed ✅");
    return true;
};
