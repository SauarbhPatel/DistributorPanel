import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const DashboardCard = ({ title, count, color, circleColor }) => {
    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <View style={[styles.circle, { backgroundColor: circleColor }]} />

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{count}</Text>

            {/* {title === "Assigned to Team" && (
                <Text style={styles.link}>Open Team Dashboard</Text>
            )} */}
        </View>
    );
};

export default function DashboardCards() {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
                <>
                    <View style={styles.container}>
                        <DashboardCard
                            title="New Abandoned"
                            count={2}
                            color="#EAD9C4"
                            circleColor="#E3B982"
                        />

                        <DashboardCard
                            title="Assigned to Team"
                            count={1}
                            color="#C9D4E8"
                            circleColor="#9FB3DB"
                        />

                        <DashboardCard
                            title="Recovered"
                            count={1}
                            color="#CFE8DF"
                            circleColor="#8AC7A7"
                        />

                        <DashboardCard
                            title="Not Interested"
                            count={1}
                            color="#D7DADF"
                            circleColor="#B1B6BE"
                        />
                    </View>
                </>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        // padding: 10,
        paddingHorizontal: 5,
    },

    card: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 12,
        padding: 16,
        height: 90,
        overflow: "hidden",
        minWidth: 150,
    },

    title: {
        fontSize: 14,
        color: "#444",
    },

    count: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 4,
    },

    link: {
        marginTop: 4,
        fontSize: 12,
        color: "#5A6EA5",
    },

    circle: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 50,
        top: -20,
        right: -20,
        opacity: 0.6,
    },
});
