import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import AbandonedOrderItem from "./AbandonedOrderItem";

const AbandonedOrderList = () => {
    const [orders, setOrders] = useState([
        {
            id: "ABN-2024-001",
            buyer: "Raj Kumar",
            sessionId: "sess_2kL121",
            travelStatus: "Contact entered",
            lastActivityDate: "07 Mar 2026",
            lastActivityTime: "04:02 pm",
            cartValue: "12,499",
            itemCount: 3,
            email: "raj.kumar@email.com",
            phone: "+91 98765 4321",
            attempts: 0,
            status: "New Abandoned",
            isAssigned: false,
        },
        {
            id: "ABN-2024-002",
            buyer: "Guest User",
            sessionId: "guest_sess_Or1",
            travelStatus: "Payment failed",
            lastActivityDate: "07 Mar 2026",
            lastActivityTime: "02:47 pm",
            cartValue: "4,599",
            itemCount: 1,
            email: "guest@example.co",
            phone: "+91 91234 5678",
            attempts: 2,
            status: "Assigned to Team",
            isAssigned: true,
        },
        {
            id: "ABN-2024-003",
            buyer: "Priya Sharma",
            sessionId: "sess_8f4Y1n",
            travelStatus: "Address entered",
            lastActivityDate: "06 Mar 2026",
            lastActivityTime: "04:47 pm",
            cartValue: "29,900",
            itemCount: 5,
            email: "priya.v@outlook.cz",
            phone: "+91 91234 5678",
            attempts: 1,
            status: "New Abandoned",
            isAssigned: false,
        },
        {
            id: "ABN-2024-004",
            buyer: "Amit Verma",
            sessionId: "sess_9pL22x",
            travelStatus: "Contact entered",
            lastActivityDate: "07 Mar 2026",
            lastActivityTime: "05:15 pm",
            cartValue: "8,250",
            itemCount: 2,
            email: "amit.v@gmail.com",
            phone: "+91 77665 54433",
            attempts: 0,
            status: "Recovered",
            isAssigned: false,
        },
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AbandonedOrderItem item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        marginTop: 16,
    },

    listContent: {
        paddingBottom: 32,
    },
});

export default AbandonedOrderList;
