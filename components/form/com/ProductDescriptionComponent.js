import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextAreaBox } from "../../../modules";
import { Colors } from "../../../constants/styles";

const MAX_CHAR = 1500;

const ProductDescriptionComponent = React.memo(() => {
    const [bullets, setBullets] = useState({
        bullet1: "",
        bullet2: "",
        bullet3: "",
        bullet4: "",
        bullet5: "",
    });

    const [fullDescription, setFullDescription] = useState("");
    const [sections, setSections] = useState([]);

    const updateBullet = (key, value) => {
        if (value.length <= MAX_CHAR) {
            setBullets((prev) => ({ ...prev, [key]: value }));
        }
    };

    const addSection = () => {
        setSections((prev) => [
            ...prev,
            { id: Date.now(), title: "", content: "" },
        ]);
    };

    const updateSection = (id, key, value) => {
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
        );
    };

    const removeSection = (id) => {
        setSections((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <View style={containerStyle}>
            <Text style={sectionTitle}>Description</Text>

            {/* INFO BOX */}
            <View style={infoBox}>
                <Text style={infoText}>
                    Select Mobile Phones or Electronics in Step 1 to load
                    attribute mapping.
                </Text>
            </View>

            {/* ================= SHORT DESCRIPTION ================= */}
            <Text style={subTitle}>DESCRIPTION</Text>

            <Text style={helperText}>
                Short description bullets (~200 words each), full HTML
                description with formatting, and optional custom sections (e.g.,
                Warranty, Technical Details).
            </Text>

            <Text style={label}>
                Short Description (5 bullet points){" "}
                <Text style={{ color: "red" }}>*</Text>
            </Text>

            {Object.keys(bullets).map((key, index) => (
                <View key={key} style={{ marginBottom: 14 }}>
                    <TextAreaBox
                        placeholder={`Bullet ${index + 1}`}
                        value={bullets[key]}
                        onChangeText={(value) => updateBullet(key, value)}
                        inputCustomStyle={inputStyle}
                    />
                    <Text style={counterText}>
                        {bullets[key].length} / {MAX_CHAR}
                    </Text>
                </View>
            ))}

            {/* ================= FULL DESCRIPTION ================= */}
            <Text style={[label, { marginTop: 10 }]}>
                Full Description (HTML)
            </Text>

            <TextAreaBox
                placeholder="Enter HTML content. Use the toolbar above for bold, italic, lists, and links."
                value={fullDescription}
                onChangeText={setFullDescription}
                multiline
                inputCustomStyle={inputStyle}
            />

            {/* ================= DYNAMIC SECTIONS ================= */}
            <View style={{ marginTop: 20 }}>
                <View style={dynamicHeader}>
                    <Text style={label}>Dynamic Sections (optional)</Text>

                    <TouchableOpacity
                        onPress={addSection}
                        style={addSectionBtn}
                    >
                        <Text style={addSectionText}>+ Add Section</Text>
                    </TouchableOpacity>
                </View>

                <Text style={helperText}>
                    Add custom sections like Warranty, Technical Details, or
                    Legal.
                </Text>

                {sections.map((section) => (
                    <View key={section.id} style={sectionCard}>
                        <TextAreaBox
                            placeholder="Section title (e.g. Warranty)"
                            value={section.title}
                            onChangeText={(value) =>
                                updateSection(section.id, "title", value)
                            }
                            inputCustomStyle={inputStyle}
                        />

                        <TextAreaBox
                            placeholder="Section content"
                            value={section.content}
                            onChangeText={(value) =>
                                updateSection(section.id, "content", value)
                            }
                            multiline
                            inputCustomStyle={inputStyle}
                        />

                        <TouchableOpacity
                            onPress={() => removeSection(section.id)}
                        >
                            <Text style={{ color: Colors.redColor }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
});

export default ProductDescriptionComponent;

/* ================= STYLES ================= */

const containerStyle = {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
};

const sectionTitle = {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
};

const subTitle = {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
};

const helperText = {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
};

const label = {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
};

const counterText = {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "right",
    marginTop: 4,
};

const infoBox = {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#F9FAFB",
};

const infoText = {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
};

const toolbar = {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
};

const toolbarBtn = {
    marginRight: 16,
    fontWeight: "600",
    color: "#374151",
};

const dynamicHeader = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
};

const addSectionBtn = {
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
};

const addSectionText = {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 12,
};

const sectionCard = {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    gap: 15,
};

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};
