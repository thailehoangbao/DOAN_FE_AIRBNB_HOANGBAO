import api from 'Utils/apiUtils';
import {FETCH_DELETE_USER_FAIL,FETCH_DELETE_USER_REQUEST,FETCH_DELETE_USER_SUCCESS} from './_constantDeleteUser';
import { actFetchDanhSachNguoiDung } from '../dashboardUser/duckDashboardUser/actDashboadUser';



const actDeleteUserSuccess = (data) => {
    return {
        type:FETCH_DELETE_USER_SUCCESS,
        payload: data
    }
}

const actDeleteUserFail = (error) => {
    return {
        type: FETCH_DELETE_USER_FAIL,
        payload: error
    }
}

const actDeleteUserRequest = () => {
    return {
        type: FETCH_DELETE_USER_REQUEST,
    }
}


export const actFetchDeleteUser = (id) => {
    return (dispatch) => {
        dispatch(actDeleteUserRequest());
        console.log(id)
        api
            .delete(`user/delete/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    alert('User deleted successfully');
                    dispatch(actDeleteUserSuccess(result.data));
                    dispatch(actFetchDanhSachNguoiDung());
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
                dispatch(actDeleteUserFail(error));
            })
    }
}
