import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";

const ProductAttribute = ({ list = [], onAdd }) => {
    const [search, setSearch] = useState("");

    const filteredList = useMemo(() => {
        if (!search.trim()) return list;

        return list.filter(
            (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.code.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search, list]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.meta}>Code: {item.code}</Text>
                    <Text style={styles.meta}>Type: {item.type}</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => onAdd(item)}
                >
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search by name or code"
                style={styles.searchInput}
            />

            {/* Attribute List */}
            <FlatList
                data={filteredList}
                keyExtractor={(item) => item.attributeId}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No attributes found</Text>
                }
            />
        </View>
    );
};

export default ProductAttribute;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingBottom: 150,
    },
    searchInput: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: "600",
    },
    meta: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    addButton: {
        backgroundColor: "#1E88E5",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    addText: {
        color: "#fff",
        fontWeight: "600",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
    },
});
