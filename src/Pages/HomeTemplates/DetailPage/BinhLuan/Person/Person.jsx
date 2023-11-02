import { API_IMG_URL, USER_LOGIN, formatDateToYYYYMMDD } from 'Utils/_constantsUtils'
import React from 'react'
import { actFetchDeleteBinhLuanThue } from '../duckBinhLuan/actBinhLuan';
import { useDispatch } from 'react-redux';

export default function Person({ binhLuan }) {
    // const user = JSON.parse(localStorage.getItem(USER_LOGIN));
    const dispatch = useDispatch();
    const renderSaoBinhLuan = (x) => {
        const arr = [];
        for (let i = 0; i < x; i++) {
            arr.push(<i className="fa-solid fa-star text-yellow-400" key={i}></i>)
        }
        return arr;
    }
    console.log(binhLuan)
    return (
        <div className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-900 dark:text-gray-100">
            <article>
                <div className='grid grid-cols-4'>
                    <div className='col-span-2'>
                        <i className="fa-solid fa-trash text-red-500 cursor-pointer hover:opacity-70" onClick={() => {
                            dispatch(actFetchDeleteBinhLuanThue(binhLuan.comment_id,binhLuan.room_id))
                        }}></i>
                    </div>
                    <div className='col-span-2 text-right'>
                        {renderSaoBinhLuan(binhLuan.sao_binh_luan)}
                    </div>
                </div>
                <div className="flex items-center mt-8 space-x-4">
                    <img src={binhLuan.users.avatar ? API_IMG_URL + binhLuan.users.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU"} alt="" className="w-10 h-10 rounded-full dark:bg-gray-500" />
                    <div>
                        <h3 className="text-sm font-medium">{binhLuan.users.name}</h3>
                        <time dateTime="2021-02-18" className="text-sm text-gray-400">Ngày bình luận: {formatDateToYYYYMMDD(binhLuan.ngay_binh_luan)}</time>
                    </div>
                </div>
                <p className="mt-4 dark:text-gray-400">{binhLuan.noi_dung}</p>

            </article>
        </div>
    )
}
