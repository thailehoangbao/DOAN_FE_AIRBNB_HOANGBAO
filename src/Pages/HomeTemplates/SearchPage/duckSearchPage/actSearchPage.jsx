import api from 'Utils/apiUtils';
import {FETCH_PHONGTHUE_THEO_MAVITRI_FAIL,FETCH_PHONGTHUE_THEO_MAVITRI_REQUEST,FETCH_PHONGTHUE_THEO_MAVITRI_SUCCESS} from './_constantsSearchPage';



const actPhongThueTheoMaViTriSuccess = (data) => {
    return {
        type:FETCH_PHONGTHUE_THEO_MAVITRI_SUCCESS,
        payload: data
    }
}

const actPhongThueTheoMaViTriFail = (error) => {
    return {
        type: FETCH_PHONGTHUE_THEO_MAVITRI_FAIL,
        payload: error
    }
}

const actPhongThueTheoMaViTriRequest = () => {
    return {
        type: FETCH_PHONGTHUE_THEO_MAVITRI_REQUEST,
    }
}


export const actFetchPhongThueTheoMaViTri = (id) => {
    return (dispatch) => {
        dispatch(actPhongThueTheoMaViTriRequest());
        api
            .get(`phong/lay-phong-theo-vi-tri/${id}`)
            .then((result) => {
                console.log(result);
                if (result.status === 200) {
                    // console.log(result.data.content);
                    dispatch(actPhongThueTheoMaViTriSuccess(result.data));
                }
            })
            .catch((error) => {
                // console.log("error",error);
                dispatch(actPhongThueTheoMaViTriFail(error));
            })
    }
}