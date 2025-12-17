import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const checkLanguage = async () => {
    try {
        const data = await AsyncStorage.getItem("token");
        console.log("data", data);
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
//         console.log(' fcmtoken:', fcmtoken);
//         fcmtoken && (await AsyncStorage.setItem('fcmtoken', fcmtoken));
//       } catch (error) {}
//     } else {
//       console.log('token fcmtoken:', token);
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
}
