import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
    if (
        value === "" ||
        value === null ||
        value === undefined ||
        (value !== null && typeof value === "object" && !Object.keys(value).length)
    ) {
        return true;
    } else {
        return false;
    }
};

export const getItemFromAsync = (storageName) => {
    if (isEmpty(storageName)) {
        throw Error("Storage Name is empty");
    }

    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(storageName, (err, result) => {
            if (err) {
                reject(err);
            }

            if (result === null) {
                resolve(null);
            }

            resolve(JSON.parse(result));
        });
    });
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
    if (isEmpty(storageName)) {
        throw Error("Storage Name is empty");
    }

    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
            if (error) {
                reject(error);
            }

            resolve("입력 성공");
        });
    });
};
