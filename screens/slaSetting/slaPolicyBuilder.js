import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import CommonHeader from "../../components/common/CommonHeader";

const policies = [
    {
        id: 1,
        title: "Standard B2C SLA India",
        status: "ACTIVE",
        applies: "Applies to: B2C · Effective 2025-01-01 – 2026-12-31",
        desc: "Default marketplace SLA for B2C orders.",
        milestones: 5,
        rules: 2,
        color: "#4C6EF5",
        bg: "#EEF2FF",
    },
    {
        id: 2,
        title: "B2B SLA India",
        status: "ACTIVE",
        applies: "Applies to: B2B · Effective 2025-01-01 – 2026-12-31",
        desc: "B2B orders with PO approval milestone.",
        milestones: 2,
        rules: 0,
        color: "#AE3EC9",
        bg: "#F8EEFF",
    },
    {
        id: 3,
        title: "Express SLA",
        status: "DRAFT",
        applies: "Applies to: B2C · Effective 2025-03-01 – 2026-12-31",
        desc: "Stricter SLA for express shipping.",
        milestones: 0,
        rules: 0,
        color: "#868E96",
        bg: "#F1F3F5",
    },
];

const SlaPolicyBuilder = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"SLA Policy Builder"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="SLA Policy Builder"
                        subTitle="Create and manage SLA policies. Define milestones, triggers, duration, and severity."
                        buttonName="New policy"
                    />

                    <Text style={styles.sectionTitle}>Policies</Text>

                    {policies.map((item) => (
                        <PolicyCard key={item.id} item={item} navigation={navigation} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaPolicyBuilder;

const PolicyCard = ({ item ,navigation}) => {
    return (
        <View style={[styles.card, { borderColor: item.color }]}>
            <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
                <Feather name="file-text" size={20} color={item.color} />
            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                    <View
                        style={[
                            styles.statusTag,
                            {
                                backgroundColor:
                                    item.status === "ACTIVE"
                                        ? "#D3F9D8"
                                        : "#E9ECEF",
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "600",
                                color:
                                    item.status === "ACTIVE"
                                        ? "#2B8A3E"
                                        : "#495057",
                            }}
                        >
                            {item.status}
                        </Text>
                    </View>
                </View>

                <Text style={styles.applies}>{item.applies}</Text>

                <Text style={styles.desc}>{item.desc}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>
                        • {item.milestones} milestones
                    </Text>

                    <Text style={styles.metaText}>• {item.rules} rules</Text>
                </View>

                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[
                            styles.editBtn,
                            { backgroundColor: item.color },
                        ]}
                    >
                        <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewBtn} onPress={()=>navigation.push("SlaPolicyBuilderDetails",item)}>
                        <Text style={styles.viewText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },

    sectionTitle: {
        ...Fonts.blackColor16Bold,
        marginVertical: Sizes.fixPadding,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 4,
        marginBottom: Sizes.fixPadding,
        borderWidth: 1,
    },

    iconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    cardTitle: {
        ...Fonts.blackColor15Bold,
        flex: 1,
    },

    statusTag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginLeft: 6,
    },

    applies: {
        fontSize: 12,
        color: "#6c757d",
        marginTop: 2,
    },

    desc: {
        fontSize: 12,
        color: "#868e96",
        marginTop: 4,
    },

    metaRow: {
        flexDirection: "row",
        marginTop: 6,
    },

    metaText: {
        fontSize: 12,
        marginRight: 10,
        color: "#4c6ef5",
    },

    actionsRow: {
        flexDirection: "row",
        marginTop: 10,
    },

    editBtn: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
    },

    btnText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    viewBtn: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ced4da",
    },

    viewText: {
        fontSize: 13,
        color: "#495057",
        fontWeight: "600",
    },
});
