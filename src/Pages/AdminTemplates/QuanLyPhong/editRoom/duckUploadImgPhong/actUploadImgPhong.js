import { TOKEN, USER_LOGIN } from 'Utils/_constantsUtils';
import {FETCH_UPLOAD_IMG_ROOM_FAIL,FETCH_UPLOAD_IMG_ROOM_REQUEST,FETCH_UPLOAD_IMG_ROOM_SUCCESS} from './_constantsUploadImgPhong';
import api from 'Utils/apiUtils';

const actUploadImgPhongSuccess = (data) => {
    return {
        type:FETCH_UPLOAD_IMG_ROOM_SUCCESS,
        payload: data
    }
}

const actUploadImgPhongFail = (error) => {
    return {
        type: FETCH_UPLOAD_IMG_ROOM_FAIL,
        payload: error
    }
}

const actUploadImgPhongRequest = () => {
    return {
        type: FETCH_UPLOAD_IMG_ROOM_REQUEST,
    }
}


export const actFetchUploadImgPhong= (room_id,form,navigate) => {
    return (dispatch) => {
        dispatch(actUploadImgPhongRequest());
        api
            .put(`phong/upload-image-phong/${room_id}`,form)
            .then((result) => {
                if (result.status === 200) {
                    // console.log("Thành Công",result.data);
                    dispatch(actUploadImgPhongSuccess(result.data));
                    alert('Bạn đã cập nhật ảnh thành công!');
                    // localStorage.removeItem(USER_LOGIN);
                    // localStorage.removeItem(TOKEN);
                    // navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(actUploadImgPhongFail(error));
            })
    }
}