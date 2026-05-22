import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";

const MobileTabs = ({ activeStep, setActiveStep, STEPS = [] }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {STEPS.map((step, index) => {
                    const isActive = activeStep >= step.key;

                    return (
                        <TouchableOpacity
                            key={step.key}
                            style={styles.stepContainer}
                            onPress={() => isActive && setActiveStep(step.key)}
                        >
                            {/* Circle */}
                            <View
                                style={[
                                    styles.circle,
                                    isActive && styles.activeCircle,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.circleText,
                                        isActive && styles.activeCircleText,
                                    ]}
                                >
                                    {index + 1}
                                </Text>
                            </View>
                            {/* Text */}
                            <View style={styles.textContainer}>
                                <Text
                                    style={[
                                        styles.title,
                                        isActive && styles.activeTitle,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {step.label}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {step.subTitle}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default MobileTabs;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: "#fff",
    },

    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },

    circle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "#f2f2f2",
    },

    activeCircle: {
        backgroundColor: "#16a34a",
        borderColor: "#16a34a",
    },

    circleText: {
        fontSize: 14,
        color: "#555",
    },

    activeCircleText: {
        color: "#fff",
        fontWeight: "bold",
    },

    textContainer: {
        maxWidth: 140,
    },

    title: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
    },

    activeTitle: {
        color: "#16a34a",
    },

    subtitle: {
        fontSize: 11,
        color: "#777",
    },
});
