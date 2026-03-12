// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import {
//     ChartPathProvider,
//     ChartPath,
//     ChartYLabel,
// } from "react-native-wagmi-charts";
// import * as d3Shape from "d3-shape";

// // Use a distinct height to match your layout
// const CHART_HEIGHT = 200;

// // The static data from your screenshot
// const trendData = [
//     { timestamp: 1, value: 8, label: "02-11" },
//     { timestamp: 2, value: 5, label: "02-12" },
//     { timestamp: 3, value: 10, label: "02-13" },
//     { timestamp: 4, value: 7, label: "02-14" },
//     { timestamp: 5, value: 13, label: "02-15" },
//     { timestamp: 6, value: 9, label: "02-16" },
//     { timestamp: 7, value: 13, label: "02-17" },
// ];

// const TrendChart = () => {
//     // Find max value dynamically for scaling the grid
//     const maxValue = Math.max(...trendData.map((d) => d.value));

//     return (
//         <View style={styles.container}>
//             {/* 1. Y-Axis Grid Lines & Labels */}
//             <View style={styles.yAxisContainer}>
//                 {[12, 9, 6, 3, 0].map((val) => (
//                     <View key={val} style={styles.gridRow}>
//                         <Text style={styles.axisLabel}>{val}</Text>
//                         <View style={styles.gridLine} />
//                     </View>
//                 ))}
//             </View>

//             {/* 2. Chart Path Provider (Wagmi Charts) */}
//             <ChartPathProvider data={{ points: trendData, smooth: true }}>
//                 <View style={styles.chartWrapper}>
//                     <ChartPath
//                         height={CHART_HEIGHT - 30} // Account for X-axis space
//                         width="100%"
//                         stroke="#ff5a5a" // Red spline stroke
//                         strokeWidth={2}
//                         curve={d3Shape.curveMonotoneX} // Crucial for smooth spline
//                         selectedStrokeWidth={3}
//                         fill="#fff1f2" // Soft pink area fill
//                     />
//                 </View>
//             </ChartPathProvider>

//             {/* 3. X-Axis Labels */}
//             <View style={styles.xAxisContainer}>
//                 {trendData.map((d, index) => (
//                     <Text key={index} style={styles.xAxisLabel}>
//                         {d.label}
//                     </Text>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: CHART_HEIGHT,
//         backgroundColor: "#fff",
//         paddingLeft: 10,
//         paddingRight: 20,
//         paddingTop: 10,
//         position: "relative",
//     },
//     // Y-Axis and Grid
//     yAxisContainer: {
//         position: "absolute",
//         top: 10,
//         left: 10,
//         right: 20,
//         height: CHART_HEIGHT - 30, // Account for x-axis labels
//         justifyContent: "space-between",
//     },
//     gridRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: "100%",
//     },
//     axisLabel: {
//         width: 20,
//         fontSize: 10,
//         color: "#94a3b8",
//         textAlign: "right",
//         marginRight: 8,
//     },
//     gridLine: {
//         flex: 1,
//         height: 1,
//         backgroundColor: "#f1f5f9", // Very light grey grid lines
//     },
//     // Chart Area
//     chartWrapper: {
//         marginLeft: 28, // Offset past the y-axis labels
//         height: CHART_HEIGHT - 30,
//         justifyContent: "flex-end",
//     },
//     // X-Axis
//     xAxisContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginLeft: 32, // Offset past y-axis
//         height: 20,
//         marginTop: 5,
//     },
//     xAxisLabel: {
//         fontSize: 10,
//         color: "#94a3b8",
//         textAlign: "center",
//     },
// });

// export default TrendChart;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// Note the change to named imports here
import { LineChart } from "react-native-wagmi-charts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_HEIGHT = 200;

const trendData = [
    { timestamp: 1, value: 8 },
    { timestamp: 2, value: 5 },
    { timestamp: 3, value: 10 },
    { timestamp: 4, value: 7 },
    { timestamp: 5, value: 13 },
    { timestamp: 6, value: 9 },
    { timestamp: 7, value: 13 },
];

const TrendChart = () => {
    return (
        <View style={styles.container}>
            {/* Manual Grid Overlay */}
            <View style={styles.yAxisContainer}>
                {[12, 9, 6, 3, 0].map((val) => (
                    <View key={val} style={styles.gridRow}>
                        <Text style={styles.axisLabel}>{val}</Text>
                        <View style={styles.gridLine} />
                    </View>
                ))}
            </View>

            {/* Simplified Wagmi Chart using LineChart wrapper */}
            <View style={styles.chartWrapper}>
                <LineChart.Provider data={trendData}>
                    <LineChart
                        height={CHART_HEIGHT - 40}
                        width={SCREEN_WIDTH - 80}
                    >
                        <LineChart.Path color="#ff5a5a" width={2}>
                            <LineChart.Gradient color="#fff1f2" />
                        </LineChart.Path>
                    </LineChart>
                </LineChart.Provider>
            </View>

            {/* X-Axis Labels */}
            <View style={styles.xAxisContainer}>
                {[
                    "02-11",
                    "02-12",
                    "02-13",
                    "02-14",
                    "02-15",
                    "02-16",
                    "02-17",
                ].map((label, i) => (
                    <Text key={i} style={styles.xAxisLabel}>
                        {label}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: CHART_HEIGHT,
        backgroundColor: "#fff",
        paddingTop: 10,
    },
    yAxisContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 20,
        height: CHART_HEIGHT - 40,
        justifyContent: "space-between",
        zIndex: 0,
    },
    gridRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    axisLabel: {
        width: 25,
        fontSize: 10,
        color: "#94a3b8",
        textAlign: "right",
        marginRight: 8,
    },
    gridLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#f1f5f9",
    },
    chartWrapper: {
        marginLeft: 40,
        marginTop: 5,
        zIndex: 1,
    },
    xAxisContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 45,
        marginRight: 25,
        marginTop: 5,
    },
    xAxisLabel: {
        fontSize: 10,
        color: "#94a3b8",
    },
});

export default TrendChart;
