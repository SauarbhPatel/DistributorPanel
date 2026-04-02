import { Alert } from "react-native";

export const ValidateForm = (tab = 1, state) => {
    if (tab === 1) {
        const { categoryName, categoryCode } = state;

        if (!categoryName || categoryName.trim().length === 0) {
            Alert.alert("Validation Error", "Category Name is required");
            return false;
        }

        if (!categoryCode || categoryCode.trim().length === 0) {
            Alert.alert("Validation Error", "Category Code is required");
            return false;
        }
    }

    console.log("Validation Passed ✅");
    return true;
};
