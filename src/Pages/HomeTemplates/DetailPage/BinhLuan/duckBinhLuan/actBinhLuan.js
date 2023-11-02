import api from 'Utils/apiUtils';
import {
    FETCH_ADD_BINHLUAN_FAIL,
    FETCH_ADD_BINHLUAN_REQUEST,
    FETCH_ADD_BINHLUAN_SUCCESS,
    FETCH_BINHLUAN_THEOPHONG_FAIL,
    FETCH_BINHLUAN_THEOPHONG_REQUEST,
    FETCH_BINHLUAN_THEOPHONG_SUCCESS,
    FETCH_BINHLUAN_FAIL,
    FETCH_BINHLUAN_REQUEST,
    FETCH_BINHLUAN_SUCCESS,
    MA_PHONG,
    FETCH_DELETE_BINHLUAN_FAIL,FETCH_DELETE_BINHLUAN_REQUEST,FETCH_DELETE_BINHLUAN_SUCCESS
} from './_constantsBL';


// Bình luận theo phòng  ------------------------

const actBinhLuanThueSuccess = (data) => {
    return {
        type:FETCH_BINHLUAN_THEOPHONG_SUCCESS,
        payload: data
    }
}

const actBinhLuanThueFail = (error) => {
    return {
        type: FETCH_BINHLUAN_THEOPHONG_FAIL,
        payload: error
    }
}

const actBinhLuanThueRequest = () => {
    return {
        type: FETCH_BINHLUAN_THEOPHONG_REQUEST,
    }
}




export const actFetchBinhLuanThue = (id) => {
    return (dispatch) => {
        dispatch(actBinhLuanThueRequest());
        api
            .get(`comments/binh-luan-theo-room/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    // console.log(result.data.content);
                    dispatch(actBinhLuanThueSuccess(result.data));
                }
            })
            .catch((error) => {
                // console.log("error",error);
                dispatch(actBinhLuanThueFail(error));
            })
    }
}


//---------- List Bình Luận -----------------------------

const actListBinhLuanThueSuccess = (data) => {
    return {
        type:FETCH_BINHLUAN_SUCCESS,
        payload: data
    }
}

const actListBinhLuanThueFail = (error) => {
    return {
        type: FETCH_BINHLUAN_FAIL,
        payload: error
    }
}

const actListBinhLuanThueRequest = () => {
    return {
        type: FETCH_BINHLUAN_REQUEST,
    }
}

export const actMaPhong = (maPhong) => {
    return {
        type: MA_PHONG,
        payload: maPhong
    }
}


export const actFetchListBinhLuanThue = () => {
    return (dispatch) => {
        dispatch(actListBinhLuanThueRequest());
        api
            .get(`/comments`)
            .then((result) => {
                if (result.status === 200) {
                    // console.log(result.data.content);
                    dispatch(actListBinhLuanThueSuccess(result.data));
                }
            })
            .catch((error) => {
                // console.log("error",error);
                dispatch(actListBinhLuanThueFail(error));
            })
    }
}



//---------- Add Bình Luận -----------------------------

const actAddBinhLuanThueSuccess = (data) => {
    return {
        type:FETCH_ADD_BINHLUAN_SUCCESS,
        payload: data
    }
}

const actAddBinhLuanThueFail = (error) => {
    return {
        type: FETCH_ADD_BINHLUAN_FAIL,
        payload: error
    }
}

const actAddBinhLuanThueRequest = () => {
    return {
        type: FETCH_ADD_BINHLUAN_REQUEST,
    }
}


export const actFetchAddBinhLuanThue = (form,id,navigate) => {
    return (dispatch) => {
        dispatch(actAddBinhLuanThueRequest());
        api
            .post(`/comments/binh-luan`,form)
            .then((result) => {
                // console.log(result);
                if (result.status === 201) {
                    // console.log(result.data.message);
                    dispatch(actAddBinhLuanThueSuccess(result.data));
                    dispatch(actMaPhong(id));
                    dispatch(actFetchBinhLuanThue(id));
                }
            })
            .catch((error) => {
                // console.log("error",error);
                dispatch(actAddBinhLuanThueFail(error));
            })
    }
}


//---------- Detele Bình Luận -----------------------------

const actDeleteBinhLuanThueSuccess = (data) => {
    return {
        type:FETCH_DELETE_BINHLUAN_SUCCESS,
        payload: data
    }
}

const actDeleteBinhLuanThueFail = (error) => {
    return {
        type: FETCH_DELETE_BINHLUAN_FAIL,
        payload: error
    }
}

const actDeleteBinhLuanThueRequest = () => {
    return {
        type: FETCH_DELETE_BINHLUAN_REQUEST,
    }
}


export const actFetchDeleteBinhLuanThue = (comment_id,room_id) => {
    return (dispatch) => {
        dispatch(actDeleteBinhLuanThueRequest());
        api
            .delete(`/comments/binh-luan/${comment_id}`)
            .then((result) => {
                console.log(result);
                if (result.status === 200) {
                    console.log('Xóa thành công!');
                    dispatch(actDeleteBinhLuanThueSuccess(result.data));
                    dispatch(actFetchBinhLuanThue(room_id))
                }
            })
            .catch((error) => {
                console.log("error",error);
                dispatch(actDeleteBinhLuanThueFail(error));
            })
    }
}