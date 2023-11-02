import {FETCH_INFO_BOOK_ROOM_FAIL,
FETCH_INFO_BOOK_ROOM_REQUEST,
FETCH_INFO_BOOK_ROOM_SUCCESS} from './_constantsInfoBookRoom';

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const layInfoBookRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INFO_BOOK_ROOM_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }

        case FETCH_INFO_BOOK_ROOM_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }

        case FETCH_INFO_BOOK_ROOM_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }


        default:
            return { ...state };
    }
}


export default layInfoBookRoomReducer;