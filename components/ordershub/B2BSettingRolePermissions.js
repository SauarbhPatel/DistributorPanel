import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    LayoutAnimation,
} from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const B2BSettingRolePermissions = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [permissions, setPermissions] = useState([
        {
            id: "1",
            name: "Create or edit order statuses",
            roles: ["Admin"],
            color: "#0070ba",
        },
        {
            id: "2",
            name: "Change order status (transition orders)",
            roles: ["Admin", "Warehouse"],
            color: "#14b8a6",
        },
    ]);

    const [newName, setNewName] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);

    const rolesList = ["Admin", "Seller", "Warehouse", "Buyer"];

    const toggleAddMode = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsAdding(!isAdding);
    };

    const handleAdd = () => {
        if (newName.trim()) {
            const newPerm = {
                id: Date.now().toString(),
                name: newName,
                roles: selectedRoles,
                color: "#6366f1", // Default new color
            };
            setPermissions([newPerm, ...permissions]);
            setNewName("");
            setSelectedRoles([]);
            toggleAddMode();
        }
    };

    const toggleRole = (role) => {
        setSelectedRoles((prev) =>
            prev.includes(role)
                ? prev.filter((r) => r !== role)
                : [...prev, role],
        );
    };

    const renderPermissionCard = ({ item }) => (
        <View style={styles.card}>
            <View style={[styles.indicator, { backgroundColor: item.color }]} />
            <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.permissionName}>{item.name}</Text>
                    <View style={styles.actionIcons}>
                        <TouchableOpacity>
                            <Feather name="edit-2" size={16} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="trash-2" size={16} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rolesGrid}>
                    {rolesList.map((role) => (
                        <View
                            key={role}
                            style={[
                                styles.roleBadge,
                                item.roles.includes(role)
                                    ? styles.roleActive
                                    : styles.roleInactive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.roleBadgeText,
                                    item.roles.includes(role)
                                        ? styles.roleActiveText
                                        : styles.roleInactiveText,
                                ]}
                            >
                                {role}:{" "}
                                {item.roles.includes(role) ? "Yes" : "No"}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {isAdding ? (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Permission name"
                        value={newName}
                        onChangeText={setNewName}
                    />
                    <Text style={styles.label}>Select Roles:</Text>
                    <View style={styles.rolesSelectionRow}>
                        {rolesList.map((role) => (
                            <TouchableOpacity
                                key={role}
                                onPress={() => toggleRole(role)}
                                style={[
                                    styles.chip,
                                    selectedRoles.includes(role) &&
                                        styles.chipActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selectedRoles.includes(role) &&
                                            styles.chipTextActive,
                                    ]}
                                >
                                    {role}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.formActions}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={toggleAddMode}
                        >
                            <AntDesign
                                name="closecircleo"
                                size={14}
                                color="#64748b"
                            />
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleAdd}
                        >
                            <Text style={styles.saveBtnText}>Save</Text>
                            <AntDesign
                                name="pluscircle"
                                size={14}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.addTriggerBtn}
                    onPress={toggleAddMode}
                >
                    <Text style={styles.addTriggerText}>Add permission</Text>
                    <AntDesign name="pluscircleo" size={18} color="#fff" />
                </TouchableOpacity>
            )}

            <FlatList
                data={permissions}
                keyExtractor={(item) => item.id}
                renderItem={renderPermissionCard}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc", padding: 10 },
    addTriggerBtn: {
        flexDirection: "row",
        backgroundColor: "#0070ba",
        padding: 14,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    addTriggerText: { color: "#fff", fontWeight: "700", fontSize: 15 },

    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        marginBottom: 16,
        color: "#1e293b",
    },
    label: {
        fontSize: 12,
        fontWeight: "700",
        color: "#64748b",
        marginBottom: 10,
    },
    rolesSelectionRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    chipActive: { backgroundColor: "#0070ba", borderColor: "#0070ba" },
    chipText: { fontSize: 13, color: "#64748b" },
    chipTextActive: { color: "#fff", fontWeight: "600" },
    formActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0070ba",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700" },
    cancelBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    cancelBtnText: { color: "#64748b", fontWeight: "600" },

    // List Styling
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    indicator: { width: 5, height: "100%" },
    cardContent: { flex: 1, padding: 16 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    permissionName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1e293b",
        flex: 1,
        marginRight: 10,
    },
    actionIcons: { flexDirection: "row", gap: 12 },
    rolesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    roleBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
    },
    roleActive: { backgroundColor: "#f0f9ff", borderColor: "#0070ba30" },
    roleInactive: { backgroundColor: "#f8fafc", borderColor: "#e2e8f0" },
    roleActiveText: { color: "#0070ba", fontSize: 11, fontWeight: "700" },
    roleInactiveText: { color: "#94a3b8", fontSize: 11 },
});

export default B2BSettingRolePermissions;
