import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {
    Feather,
    MaterialIcons,
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const { width } = Dimensions.get("window");

const cards = [
    {
        title: "My SLA Dashboard",
        desc: "Orders to accept today, to pack within SLA, ready to ship pending, breaches today/week/month, average processing times.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#FA5252"
            />
        ),
        color: "#FA5252",
        count: 3,
    },
    {
        title: "At-Risk Orders",
        desc: "Orders nearing SLA deadline. Sort by due time, bulk accept/pack, generate labels, request pickup. Clear due-in warnings.",

        icon: (
            <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={20}
                color="#059669"
            />
        ),
        color: "#059669",
        count: 2,
    },

    {
        title: "Breached Orders",
        desc: "Breached orders with reason and next action. Option to request waiver.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#BE4BDB"
            />
        ),
        color: "#BE4BDB",
        count: 3,
    },
];

const SlaSellerPanelCards = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Seller panel — SLA visibility & actions
            </Text>
            <Text style={styles.subHeading}>
                One-click routes to the correct setup section.
            </Text>

            <View style={styles.grid}>
                {cards.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            { borderColor: item.color + "50" },
                        ]}
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: item.color + "20" },
                            ]}
                        >
                            {item.icon}
                        </View>

                        <Text style={styles.title}>{item.title}</Text>

                        <Text style={styles.desc}>{item.desc}</Text>

                        <View style={styles.bottomRow}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={[
                                        styles.openNow,
                                        { color: item.color },
                                    ]}
                                >
                                    Open Now
                                </Text>
                                <AntDesign
                                    name="right"
                                    size={13}
                                    color={item.color}
                                    style={{ marginLeft: 4, marginTop: 2 }}
                                />
                            </TouchableOpacity>

                            <View style={styles.countBox}>
                                <Text style={styles.count}>{item.count}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SlaSellerPanelCards;

const styles = StyleSheet.create({
    container: {
        marginTop: Sizes.fixPadding * 2,
    },

    heading: {
        ...Fonts.blackColor18Bold,
    },

    subHeading: {
        ...Fonts.greenColor12Medium,
        marginTop: 4,
        marginBottom: Sizes.fixPadding * 2,
        color: "#64748B",
    },

    grid: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // justifyContent: "space-between",
    },

    card: {
        width: width - 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 4,
        marginBottom: Sizes.fixPadding,
        borderWidth: 1,
        borderLeftWidth: 4.5,
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    title: {
        ...Fonts.blackColor15Bold,
    },

    desc: {
        ...Fonts.greenColor12Medium,
        color: "#64748B",
        marginTop: 4,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    openNow: {
        fontSize: 13,
        fontWeight: "600",
    },

    countBox: {
        backgroundColor: "#f1f3f5",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },

    count: {
        fontSize: 12,
        fontWeight: "600",
    },
});
