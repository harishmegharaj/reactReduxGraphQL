export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const POST_CREATE_NUTRITION_START = "POST_CREATE_NUTRITION_START";
export const POST_CREATE_NUTRITION_ERROR = "POST_CREATE_NUTRITION_ERROR";
export const POST_CREATE_NUTRITION_SUCCESS = "POST_CREATE_NUTRITION_SUCCESS";

export const DELETE_NUTRITION_START = "DELETE_NUTRITION_START";
export const DELETE_NUTRITION_ERROR = "DELETE_NUTRITION_ERROR";
export const DELETE_NUTRITION_SUCCESS = "DELETE_NUTRITION_SUCCESS";

export function fetchData() {
    return {
        type: FETCH_DATA_START,
    };
}

export function setFetchData(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data
    };
}

export function setFetchError(err) {
    return {
        type: FETCH_DATA_ERROR,
        err
    };
}


export function createDessertnut(payLoad) {
    return {
        type: POST_CREATE_NUTRITION_START,
        payLoad
    };
}

export function setCreateNutData(data) {
    return {
        type: POST_CREATE_NUTRITION_SUCCESS,
        data
    };
}

export function setCreateNutError(err) {
    return {
        type: POST_CREATE_NUTRITION_ERROR,
        err
    };
}

export function deleteNutritions(payLoad) {
    return {
        type: DELETE_NUTRITION_START,
        payLoad
    };
}

export function setDelNutData(data) {
    return {
        type: DELETE_NUTRITION_SUCCESS,
        data
    };
}

export function setDelNutError(err) {
    return {
        type: DELETE_NUTRITION_ERROR,
        err
    };
}