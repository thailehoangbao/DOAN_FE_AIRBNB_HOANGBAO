import { TOKEN, USER_LOGIN } from 'Utils/_constantsUtils';
import {FETCH_UPLOAD_IMG_VITRI_FAIL,FETCH_UPLOAD_IMG_VITRI_REQUEST,FETCH_UPLOAD_IMG_VITRI_SUCCESS} from './_constantsUploadImgViTri';
import api from 'Utils/apiUtils';

const actUploadImgViTriSuccess = (data) => {
    return {
        type:FETCH_UPLOAD_IMG_VITRI_SUCCESS,
        payload: data
    }
}

const actUploadImgViTriFail = (error) => {
    return {
        type: FETCH_UPLOAD_IMG_VITRI_FAIL,
        payload: error
    }
}

const actUploadImgViTriRequest = () => {
    return {
        type: FETCH_UPLOAD_IMG_VITRI_REQUEST,
    }
}


export const actFetchUploadImgViTri = (vitri_id,form,navigate) => {
    return (dispatch) => {
        dispatch(actUploadImgViTriRequest());
        api
            .put(`vi-tri/upload-image-vitri/${vitri_id}`,form)
            .then((result) => {
                if (result.status === 200) {
                    // console.log("Thành Công",result.data.content);
                    dispatch(actUploadImgViTriSuccess(result.data));
                    alert('Bạn đã cập nhật ảnh thành công!');
                    // localStorage.removeItem(USER_LOGIN);
                    // localStorage.removeItem(TOKEN);
                    // navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(actUploadImgViTriFail(error));
            })
    }
}