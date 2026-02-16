const STEPS = [
    { key: "1", label: "Basic Info" },
    { key: "2", label: "Category & Brand" },
    { key: "3", label: "Product Type" },
];
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { Colors } from "../../../constants/styles";

const MobileTabs = ({ activeStep, onChange }) => {
    const activeIndex = STEPS.findIndex((s) => s.key === activeStep);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stepContainer}
        >
            {STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const isDone = index < activeIndex;

                return (
                    <TouchableOpacity
                        key={step.key}
                        // onPress={() => onChange(step.key)}
                        activeOpacity={0.85}
                        style={[
                            styles.stepCard,
                            isActive && styles.stepActive,
                            isDone && styles.stepDone,
                        ]}
                    >
                        <View
                            style={[
                                styles.stepCircle,
                                isActive && styles.circleActive,
                                isDone && styles.circleDone,
                            ]}
                        >
                            <Text style={styles.stepNumber}>{index + 1}</Text>
                        </View>

                        <Text
                            numberOfLines={1}
                            style={[
                                styles.stepText,
                                isActive && styles.textActive,
                                isDone && styles.textDone,
                            ]}
                        >
                            {step.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default MobileTabs;

const styles = StyleSheet.create({
    stepContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
    },

    stepCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        gap: 8,
    },

    stepActive: {
        backgroundColor: "#EEF2FF",
    },

    stepDone: {
        backgroundColor: "#ECFDF5",
    },

    stepCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#D1D5DB",
        justifyContent: "center",
        alignItems: "center",
    },

    circleActive: {
        backgroundColor: Colors.primaryColor,
    },

    circleDone: {
        backgroundColor: "#10B981",
    },

    stepNumber: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },

    stepText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },

    textActive: {
        color: Colors.primaryColor,
    },

    textDone: {
        color: "#047857",
    },
});
