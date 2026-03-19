// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const AttributionBox = ({
//     icon,
//     title,
//     subtitle,
//     count,
//     percentage,
//     colors,
//     bgColor,
// }) => (
//     <View style={[styles.attributionBox, { backgroundColor: bgColor }]}>
//         <View style={styles.boxHeader}>
//             <LinearGradient colors={colors} style={styles.smallIconBox}>
//                 <MaterialCommunityIcons name={icon} size={16} color="white" />
//             </LinearGradient>
//             <View>
//                 <Text style={styles.boxTitle}>{title}</Text>
//                 <Text style={styles.boxSubtitle}>{subtitle}</Text>
//             </View>
//         </View>

//         <View style={styles.boxStats}>
//             <Text style={[styles.boxCount, { color: colors[0] }]}>{count}</Text>
//             <Text style={styles.conversionsLabel}>conversions</Text>
//         </View>

//         <View style={styles.progressRow}>
//             <View style={styles.progressTrack}>
//                 <LinearGradient
//                     colors={colors}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={[styles.progressFill, { width: `${percentage}%` }]}
//                 />
//             </View>
//             <Text style={[styles.percentageText, { color: colors[0] }]}>
//                 {percentage}%
//             </Text>
//         </View>
//     </View>
// );

// const AttributionConfiguration = () => {
//     return (
//         <View style={styles.card}>
//             {/* Main Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerLeft}>
//                     <LinearGradient
//                         colors={["#4F46E5", "#3B82F6"]}
//                         style={styles.headerIcon}
//                     >
//                         <MaterialCommunityIcons
//                             name="cog"
//                             size={20}
//                             color="white"
//                         />
//                     </LinearGradient>
//                     <View>
//                         <Text style={styles.headerTitle}>
//                             Attribution configuration
//                         </Text>
//                         <Text style={styles.headerSubtitle}>
//                             Reporting attribution windows (demo: 7d click, 1d
//                             view).
//                         </Text>
//                     </View>
//                 </View>
//                 <TouchableOpacity style={styles.configureBtn}>
//                     <MaterialCommunityIcons
//                         name="cog-outline"
//                         size={14}
//                         color="#64748B"
//                     />
//                     <Text style={styles.configureText}>Configure</Text>
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.infoText}>
//                 Stored per report for reproducible results.
//             </Text>

//             {/* Grid of Attribution Boxes */}
//             <View style={styles.grid}>
//                 <AttributionBox
//                     icon="cursor-default-click"
//                     title="7d click"
//                     subtitle="Click attribution"
//                     count="892"
//                     percentage={72}
//                     colors={["#0EA5E9", "#22D3EE"]}
//                     bgColor="#F0F9FF"
//                 />
//                 <AttributionBox
//                     icon="eye"
//                     title="1d view"
//                     subtitle="View attribution"
//                     count="355"
//                     percentage={28}
//                     colors={["#D946EF", "#F43F5E"]}
//                     bgColor="#FDF2F8"
//                 />
//             </View>

//             {/* Footer Banner */}
//             <LinearGradient
//                 colors={["#6366F1", "#D946EF", "#F43F5E"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.footer}
//             >
//                 <View style={styles.footerLeft}>
//                     <View style={styles.footerIconBg}>
//                         <MaterialCommunityIcons
//                             name="chart-bar"
//                             size={18}
//                             color="#6366F1"
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.footerLabel}>
//                             Total Attributed Conversions
//                         </Text>
//                         <Text style={styles.footerValue}>1,247</Text>
//                     </View>
//                 </View>

//                 <View style={styles.footerRight}>
//                     <Text style={styles.qualityLabel}>Attribution Quality</Text>
//                     <View style={styles.qualityRow}>
//                         <MaterialCommunityIcons
//                             name="trending-up"
//                             size={16}
//                             color="white"
//                         />
//                         <Text style={styles.qualityValue}>Excellent</Text>
//                     </View>
//                 </View>
//             </LinearGradient>
//         </View>
//     );
// };

// export default AttributionConfiguration;

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: "white",
//         borderRadius: 16,
//         padding: 16,
//         margin: 16,
//         borderWidth: 1,
//         borderColor: "#F1F5F9",
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         marginBottom: 12,
//     },
//     headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
//     headerIcon: {
//         width: 36,
//         height: 36,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 12,
//     },
//     headerTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
//     headerSubtitle: { fontSize: 12, color: "#64748B" },
//     configureBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 6,
//         paddingHorizontal: 12,
//         borderWidth: 1,
//         borderColor: "#E2E8F0",
//         borderRadius: 8,
//     },
//     configureText: { fontSize: 12, color: "#64748B", marginLeft: 4 },

//     infoText: { fontSize: 12, color: "#94A3B8", marginBottom: 20 },

//     grid: { flexDirection: "row", gap: 12, marginBottom: 16 },
//     attributionBox: { flex: 1, padding: 16, borderRadius: 16 },
//     boxHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
//     smallIconBox: {
//         width: 28,
//         height: 28,
//         borderRadius: 8,
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 8,
//     },
//     boxTitle: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },
//     boxSubtitle: { fontSize: 11, color: "#64748B" },
//     boxStats: {
//         flexDirection: "row",
//         alignItems: "baseline",
//         marginBottom: 12,
//     },
//     boxCount: { fontSize: 24, fontWeight: "bold", marginRight: 6 },
//     conversionsLabel: { fontSize: 12, color: "#64748B" },

//     progressRow: { flexDirection: "row", alignItems: "center", gap: 8 },
//     progressTrack: {
//         flex: 1,
//         height: 6,
//         backgroundColor: "white",
//         borderRadius: 10,
//         overflow: "hidden",
//     },
//     progressFill: { height: "100%", borderRadius: 10 },
//     percentageText: { fontSize: 11, fontWeight: "bold", width: 25 },

//     footer: {
//         borderRadius: 16,
//         padding: 16,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     footerLeft: { flexDirection: "row", alignItems: "center" },
//     footerIconBg: {
//         width: 32,
//         height: 32,
//         backgroundColor: "rgba(255,255,255,0.2)",
//         borderRadius: 8,
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 12,
//     },
//     footerLabel: { color: "rgba(255,255,255,0.8)", fontSize: 11 },
//     footerValue: { color: "white", fontSize: 20, fontWeight: "bold" },
//     footerRight: { alignItems: "flex-end" },
//     qualityLabel: {
//         color: "rgba(255,255,255,0.8)",
//         fontSize: 11,
//         marginBottom: 4,
//     },
//     qualityRow: { flexDirection: "row", alignItems: "center" },
//     qualityValue: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "bold",
//         marginLeft: 4,
//     },
// });

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Detect if the screen is narrow (like an iPhone SE or small Android)
const { width } = Dimensions.get("window");
const isNarrow = width < 380;

const AttributionBox = ({
    icon,
    title,
    subtitle,
    count,
    percentage,
    colors,
    bgColor,
}) => (
    <View style={[styles.attributionBox, { backgroundColor: bgColor }]}>
        <View style={styles.boxHeader}>
            <LinearGradient colors={colors} style={styles.smallIconBox}>
                <MaterialCommunityIcons name={icon} size={16} color="white" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
                <Text style={styles.boxTitle} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.boxSubtitle} numberOfLines={1}>
                    {subtitle}
                </Text>
            </View>
        </View>

        <View style={styles.boxStats}>
            <Text style={[styles.boxCount, { color: colors[0] }]}>{count}</Text>
            <Text style={styles.conversionsLabel}>conversions</Text>
        </View>

        <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${percentage}%` }]}
                />
            </View>
            <Text style={[styles.percentageText, { color: colors[0] }]}>
                {percentage}%
            </Text>
        </View>
    </View>
);

const AttributionConfiguration = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <LinearGradient
                        colors={["#4F46E5", "#3B82F6"]}
                        style={styles.headerIcon}
                    >
                        <MaterialCommunityIcons
                            name="cog"
                            size={20}
                            color="white"
                        />
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>
                            Attribution configuration
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            7d click, 1d view
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.configureBtn}>
                    <Text style={styles.configureText}>Configure</Text>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 16 }}>
                <Text style={styles.infoText}>
                    Stored per report for reproducible results.
                </Text>
                <View style={styles.grid}>
                    <AttributionBox
                        icon="cursor-default-click"
                        title="7d click"
                        subtitle="Click attribution"
                        count="892"
                        percentage={72}
                        colors={["#0EA5E9", "#22D3EE"]}
                        bgColor="#F0F9FF"
                    />
                    <AttributionBox
                        icon="eye"
                        title="1d view"
                        subtitle="View attribution"
                        count="355"
                        percentage={28}
                        colors={["#AD46FF", "#F6339A"]}
                        bgColor="#FDF2F8"
                    />
                </View>

                <LinearGradient
                    colors={["#615FFF", "#AD46FF", "#F6339A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.footer, isNarrow && styles.footerStacked]}
                >
                    <View style={styles.footerLeft}>
                        <View style={styles.footerIconBg}>
                            <MaterialCommunityIcons
                                name="chart-bar"
                                size={18}
                                color="#ffffff"
                            />
                        </View>
                        <View>
                            <Text style={styles.footerLabel}>
                                Total Attributed Conversions
                            </Text>
                            <Text style={styles.footerValue}>1,247</Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.footerRight,
                            isNarrow && {
                                alignItems: "flex-start",
                                marginTop: 10,
                            },
                        ]}
                    >
                        <Text style={styles.qualityLabel}>
                            Attribution Quality
                        </Text>
                        <View style={styles.qualityRow}>
                            <MaterialCommunityIcons
                                name="trending-up"
                                size={16}
                                color="white"
                            />
                            <Text style={styles.qualityValue}>Excellent</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        padding: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        paddingRight: 8,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    configureBtn: {
        padding: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 6,
    },
    configureText: { fontSize: 11, color: "#64748B", fontWeight: "600" },

    infoText: { fontSize: 12, color: "#94A3B8", marginBottom: 15 },

    grid: {
        marginBottom: 16,
        gap: 16,
    },
    attributionBox: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
    },
    boxHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    smallIconBox: {
        width: 30,
        height: 30,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    boxTitle: { fontSize: 14, fontWeight: "bold", color: "#1E293B" },
    boxSubtitle: { fontSize: 12, color: "#64748B" },
    boxStats: { flexDirection: "row", alignItems: "baseline", marginBottom: 8 },
    boxCount: { fontSize: 25, fontWeight: "bold", marginRight: 4 },
    conversionsLabel: { fontSize: 12, color: "#64748B" },

    progressRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    progressTrack: {
        flex: 1,
        height: 8,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: { height: "100%", borderRadius: 10 },
    percentageText: { fontSize: 12, fontWeight: "bold", width: 28 },

    footer: {
        borderRadius: 14,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerStacked: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    footerLeft: { flexDirection: "row", alignItems: "center" },
    footerIconBg: {
        width: 35,
        height: 35,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    footerLabel: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
    footerValue: { color: "white", fontSize: 22, fontWeight: "bold" },
    footerRight: { alignItems: "flex-end" },
    qualityLabel: { color: "rgba(255,255,255,0.8)", fontSize: 10 },
    qualityRow: { flexDirection: "row", alignItems: "center" },
    qualityValue: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 4,
    },
});

export default AttributionConfiguration;
