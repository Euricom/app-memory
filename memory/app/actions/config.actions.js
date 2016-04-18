import * as types from './actionTypes';

export function updateConfigAction(question, tiles, imagesAndPrices) {
    return {
        type: types.UPDATE_CONFIG,
        payload: {
            question,
            tiles,
            imagesAndPrices,
        },
    };
}

export function updateConfigImageAction(imagesAndPrices) {
    return {
        type: types.UPDATE_CONFIG_IMAGE,
        payload: {
            imagesAndPrices,
        },
    };
}

export function saveStorageAction() {
    return {
        type: types.SAVE_STORAGE,
    };
}
export function uploadStorageAction() {
    return {
        type: types.UPLOAD_STORAGE,
    };
}
export function updateConfigWinnerAction(winner) {
    return {
        type: types.UPDATE_CONFIG_WINNER,
        payload: {
            winner,
        },
    };
}
export function saveShuffledImagesAction(images) {
    return {
        type: types.SAVE_SHUFFLEDIMAGES,
        payload: {
            images,
        },
    };
}
export function saveNewShuffledImagesAction(images, shuffledImages) {
    return {
        type: types.SAVE_NEWSHUFFLEDIMAGES,
        payload: {
            images,
            shuffledImages,
        },
    };
}

export function savePasswordAction(password) {
    return {
        type: types.SAVE_PASSWORD,
        payload: {
            password,
        },
    };
}
