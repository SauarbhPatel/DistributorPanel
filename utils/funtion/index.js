import AsyncStorage from "@react-native-async-storage/async-storage";
import { __getLocalStorageData, __setLocalStorageData } from "../localStorage";

export function __generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
export const __formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
};

export function __hasAnyValue(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== "") {
            return true;
        }
    }
    return false;
}

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function __formatDate(date) {
    let inputDate = new Date(date);
    if (!(inputDate instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    const day = inputDate.getDate().toString().padStart(2, "0");

    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    const ampm = inputDate.getHours() >= 12 ? "PM" : "AM";

    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;

    return formattedDate;
}
export function __formatDate2(date) {
    let inputDate = new Date(date);
    if (!(inputDate instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    const day = inputDate.getDate().toString().padStart(2, "0");

    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours() % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}

export const checkLanguage = async () => {
    try {
        const data = await AsyncStorage.getItem("token");
        //console.log("data", data);
        if (data) {
            // Token was found in AsyncStorage
            return "checked";
        } else {
            // Token was not found
            return "not found";
        }
    } catch (error) {
        console.error("Error while getting data from AsyncStorage:", error);
        return "error";
    }
};

// async function getFCMToken() {
//     let token = AsyncStorage.getItem('fcmtoken');
//     if (token) {
//       try {
//         let fcmtoken = await messaging().getToken();
//         //console.log(' fcmtoken:', fcmtoken);
//         fcmtoken && (await AsyncStorage.setItem('fcmtoken', fcmtoken));
//       } catch (error) {}
//     } else {
//       //console.log('token fcmtoken:', token);
//     }

export function __getRendomColor(mode) {
    const lightColors = [
        "#FFEDF3",
        "#FFF2EB",
        //
        "#eafffa",
        "#f4f5fa",
        "#f8f7f5",
        "#fff3f5",
        "#f2f2f2",
        "#f3fffd",
        "#fefbf2",
        "#f6f7fc",
        "#f0fbfd",
    ];
    const darkColors = [
        "#EFF9E8",
        "#F9F0C2",
        "#C3D4FA",
        "#FAF9EE",
        "#FFEDF3",
        "#FFF2EB",
    ];
    const colors = mode === "dark" ? darkColors : lightColors;
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export function __splitProductAndVarianat(list) {
    const products = [];

    list.forEach((element) => {
        element.variations.forEach((variant) => {
            products.push({
                ...element,
                variations: [variant],
            });
        });
    });

    return products;
    return list;
}

export async function __setNewRecentlyViewed(item) {
    const getOldList = await __getLocalStorageData("recently_view");
    console.log("getOldList", getOldList);
    const convertInObject = getOldList ? JSON.parse(getOldList) : [];
    const newList = [
        item,
        ...convertInObject?.filter(
            (old) =>
                // old?.uid != item?.uid &&
                old?.variations[0]?.uid != item?.variations[0]?.uid,
        ),
    ];
    __setLocalStorageData("recently_view", newList);
    return;
}

export function isValidPAN(pan) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
}
export function isValidAadhaar(aadhaar) {
    // Must be exactly 12 digits
    if (!/^\d{12}$/.test(aadhaar)) {
        return false;
    }

    // Verhoeff tables
    const d = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    const p = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    let c = 0;
    const digits = aadhaar.split("").reverse().map(Number);

    for (let i = 0; i < digits.length; i++) {
        c = d[c][p[i % 8][digits[i]]];
    }

    return c === 0;
}

export function createCategoryList(categories) {
    const result = [];

    function traverse(nodes, parentPath = "") {
        nodes.forEach((node) => {
            const currentPath = parentPath
                ? `${parentPath} > ${node.name}`
                : node.name;

            result.push({
                id: node._id,
                name: currentPath,
                slug: node.slug,
                isActive: node.isActive,
                attributeSetId: node.attributeSetId,
                attributeSetName: node.attributeSetName,
            });

            if (node.children && node.children.length > 0) {
                traverse(node.children, currentPath);
            }
        });
    }

    traverse(categories);
    return result;
}
