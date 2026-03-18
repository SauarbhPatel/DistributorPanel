import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CreativeCard = ({ title, type, products, image, badgeColors }) => (
    <View style={styles.creativeCard}>
        <View style={styles.cardMainRow}>
            <Image source={{ uri: image }} style={styles.productImage} />

            <View style={styles.cardDetails}>
                <Text style={styles.creativeTitle}>{title}</Text>
                <View
                    style={[
                        styles.typeBadge,
                        { backgroundColor: badgeColors.bg },
                    ]}
                >
                    <Text
                        style={[
                            styles.typeBadgeText,
                            { color: badgeColors.text },
                        ]}
                    >
                        {type}
                    </Text>
                </View>
                <Text style={styles.productCount}>{products} Products</Text>
            </View>

            <View style={styles.actionColumn}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Feather name="edit-2" size={14} color="#64748B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                    <Feather name="trash-2" size={14} color="#64748B" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const CreativesLibrary = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#4D7CFF", "#A066FF"]}
                    style={styles.headerIcon}
                >
                    <MaterialCommunityIcons
                        name="layers-outline"
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>Creatives Library</Text>
                    <Text style={styles.headerSubtitle}>
                        Carousel, collection, and single-image creatives.
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <CreativeCard
                    title="Earphones Carousel"
                    type="carousel"
                    products="3"
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                    badgeColors={{ bg: "#E1F8F1", text: "#059669" }}
                />

                <CreativeCard
                    title="Single - Wireless Speaker"
                    type="single image"
                    products="3"
                    image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
                    badgeColors={{ bg: "#F3E8FF", text: "#7E22CE" }}
                />

                <CreativeCard
                    title="Single - Wireless Speaker"
                    type="carousel"
                    products="3"
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                    badgeColors={{ bg: "#E0F2FE", text: "#0369A1" }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 5,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
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
    content: { padding: 16 },

    creativeCard: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    cardMainRow: { flexDirection: "row", alignItems: "center" },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
        // alignSelf:""
        marginBottom: "auto",
    },
    cardDetails: { flex: 1, marginLeft: 15, justifyContent: "center" },
    creativeTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 6,
    },
    typeBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: 6,
    },
    typeBadgeText: { fontSize: 11, fontWeight: "700" },
    productCount: { fontSize: 12, color: "#94A3B8" },

    actionColumn: { alignItems: "center", gap: 8 },
    iconBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
});

export default CreativesLibrary;
