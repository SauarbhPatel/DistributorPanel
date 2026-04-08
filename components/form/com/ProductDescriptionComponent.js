import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextAreaBox } from "../../../modules";
import { Colors } from "../../../constants/styles";
import CommonBox from "./CommonBox";
import InfoBox from "./InfoBox";

const MAX_CHAR = 1500;

const ProductDescriptionComponent = React.memo(
    ({ value, onChange = () => {} }) => {
        const [bullets, setBullets] = useState({
            bullet1: "",
            bullet2: "",
            bullet3: "",
            bullet4: "",
            bullet5: "",
        });

        useEffect(() => {
            if (value?.description) {
                const data = value?.description.split("• ");
                console.log("****", data);

                setBullets({
                    bullet1: data[1]?.trim() || "",
                    bullet2: data[2]?.trim() || "",
                    bullet3: data[3]?.trim() || "",
                    bullet4: data[4]?.trim() || "",
                    bullet5: data[5]?.trim() || "",
                });
            }
        }, []);

        // const updateBullet = (key, value) => {
        //     if (value.length <= MAX_CHAR) {
        //         setBullets((prev) => ({ ...prev, [key]: value }));
        //     }
        // };
        const updateBullet = (key, value) => {
            if (value.length > MAX_CHAR) return;

            setBullets((prev) => {
                const updated = {
                    ...prev,
                    [key]: value,
                };
                // Build bullet description
                const description = Object.values(updated)
                    .filter((text) => text && text?.trim()?.length > 0)
                    .map((text) => `• ${text?.trim()}`)
                    .join("\n");

                onChange({
                    description,
                });

                return updated;
            });
        };

        const addSection = () => {
            onChange({
                dynamicSection: [
                    ...value?.dynamicSection,
                    { sectionTitle: "", content: "" },
                ],
            });
        };

        const updateSection = (index, key, text) => {
            onChange({
                dynamicSection: value?.dynamicSection?.map((item, i) =>
                    i === index ? { ...item, [key]: text } : item,
                ),
            });
        };

        const removeSection = (index) => {
            onChange({
                dynamicSection: value?.dynamicSection?.filter(
                    (_, i) => i !== index,
                ),
            });
        };

        return (
            <View style={{}}>
                <InfoBox
                    title="Item Description"
                    subtitle="Craft compelling product descriptions that convert browsers into buyers."
                    infoTitle="Select a category in Step 1 to load category-specific attributes."
                    infoSub="(For this demo, generic description fields are shown)"
                />

                <CommonBox
                    title="Key Features"
                    subtitle="5 bullet points highlighting your product's best features (~200 words each)"
                    body={
                        <>
                            {Object.keys(bullets).map((key, index) => (
                                <View key={key} style={{ marginBottom: 14 }}>
                                    <TextAreaBox
                                        placeholder={`Bullet ${index + 1}`}
                                        value={bullets[key]}
                                        valuekey="text"
                                        onChangeText={(value) =>
                                            updateBullet(key, value?.text)
                                        }
                                        inputCustomStyle={inputStyle}
                                        multiline
                                        // editable={false}
                                        // customStyle={{ flex: 1, opacity: 0.6 }}
                                    />
                                    <Text style={counterText}>
                                        {bullets[key].length} / {MAX_CHAR}
                                    </Text>
                                </View>
                            ))}
                        </>
                    }
                />
                <CommonBox
                    title="Full Description"
                    subtitle="Detailed HTML description with formatting support"
                    body={
                        <>
                            <TextAreaBox
                                placeholder="Describe your product in detail..."
                                value={value?.fullDescriptionHtmlContent}
                                valuekey="fullDescriptionHtmlContent"
                                onChangeText={onChange}
                                multiline
                                inputCustomStyle={inputStyle}
                            />
                        </>
                    }
                />
                <CommonBox
                    title="Dynamic Sections (optional)"
                    subtitle="Add custom sections like Warranty, Technical Details, or Legal."
                    body={
                        <>
                            <TouchableOpacity
                                onPress={addSection}
                                style={addSectionBtn}
                            >
                                <Text style={addSectionText}>
                                    + Add Section
                                </Text>
                            </TouchableOpacity>
                            {value?.dynamicSection?.map((section, index) => (
                                <View
                                    key={index + "dynamicSection"}
                                    style={sectionCard}
                                >
                                    <TextAreaBox
                                        placeholder="Section title (e.g. Warranty)"
                                        value={section.sectionTitle}
                                        valuekey="text"
                                        onChangeText={(value) =>
                                            updateSection(
                                                index,
                                                "sectionTitle",
                                                value?.text,
                                            )
                                        }
                                        inputCustomStyle={inputStyle}
                                    />

                                    <TextAreaBox
                                        placeholder="Section content"
                                        value={section.content}
                                        valuekey="text"
                                        onChangeText={(value) =>
                                            updateSection(
                                                index,
                                                "content",
                                                value?.text,
                                            )
                                        }
                                        multiline
                                        inputCustomStyle={inputStyle}
                                    />

                                    <TouchableOpacity
                                        onPress={() => removeSection(index)}
                                    >
                                        <Text
                                            style={{ color: Colors.redColor }}
                                        >
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </>
                    }
                />
            </View>
        );
    },
);

export default ProductDescriptionComponent;

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
    textAlign: "center",
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

// const [bullets, setBullets] = useState({
//         bullet1: "",
//         bullet2: "",
//         bullet3: "",
//         bullet4: "",
//         bullet5: "",
//     });

//     const updateBullet = (key, value) => {
//         if (value.length <= MAX_CHAR) {
//             setBullets((prev) => ({ ...prev, [key]: value }));
//         }
//     };

//     this is i have to take bullet discription , i want that you update this  funtion where

//         const updateBullet = (key, value) => {
//         if (value.length <= MAX_CHAR) {
//             setBullets((prev) => ({ ...prev, [key]: value }));
//             onChange({
//             description:`•${bullet1}\n•${bullet2}` , //like this
//         });
//         }
//     };

//     this is just a example make it proper

//     i want that my data looks llike this

//     • Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.
//     • Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.
//     • Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.
//     • Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.
//     • Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.
