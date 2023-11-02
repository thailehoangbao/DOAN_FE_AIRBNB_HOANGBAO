import React, { useEffect, useState } from 'react'
import Person from './Person/Person'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { actFetchAddBinhLuanThue, actFetchBinhLuanThue, actMaPhong } from './duckBinhLuan/actBinhLuan';
import { USER_LOGIN, convertDateFormat, formatDateToDDMMYYYY, formatDateToYYYYMMDD } from 'Utils/_constantsUtils';

export default function BinhLuan() {
    const dispatch = useDispatch();
    const params = useParams();
    const { data, listBinhLuan } = useSelector(state => state.binhLuanThueReducer);
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Chuyển đổi thành chuỗi định dạng "dd/mm/yyyy"
    const formattedCurrentDate = formatDateToDDMMYYYY(currentDate);
    const user = JSON.parse(localStorage.getItem(USER_LOGIN));

    const [form, setForm] = useState({
        room_id: params.id,
        user_id: user?.user_id,
        ngay_binh_luan: convertDateFormat(formattedCurrentDate),
        noi_dung: "",
        sao_binh_luan: 0
    })

    useEffect(() => {
        dispatch(actFetchBinhLuanThue(params.id));
    }, [])

    const renderBinhLuan = () => {
        return data?.map((binhLuan, index) => {
            return <Person binhLuan={binhLuan} key={index} />
        })
    }
    const handleChonSao = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleNoiDungBinhLuan = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (form) {
            dispatch(actFetchAddBinhLuanThue(form, params.id));
        }
    }
    const renderNewBinhLuan = () => {
        return listBinhLuan?.map((binhLuan, index) => {
            return <Person binhLuan={binhLuan} key={index} />
        })
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-3 mb-2'>
                {listBinhLuan ? renderNewBinhLuan() : renderBinhLuan()}
            </div>
            {/* <span className='underline font-semibold cursor-pointer'>Hiển thị thêm</span>
            <div className='mt-2'>
                <form action="GET" onSubmit={handleSubmit}>
                    <textarea onChange={handleNoiDungBinhLuan} name="noi_dung" style={{ padding: "12px", width: "100%", height: "250px", border: "0.5px solid gray" }}></textarea>
                    <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all duration-500'>Add Comment</button>
                </form>
            </div> */}
            <div className="border border-gray-300 p-4 rounded-lg max-w-xl mx-auto mt-4">
                <div>
                    <h2 className="text-lg font-medium mb-2">Leave a comment</h2>
                    <form action="GET" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                Đánh giá số <i className="fa-regular fa-star text-yellow-500"></i>
                            </label>
                            <select name="sao_binh_luan" id="sao_binh_luan" className='w-full' placeholder='Chọn đánh giá' onChange={handleChonSao}>
                                <option value="0">Chọn đánh giá</option>
                                <option value="1" >1 Star</option>
                                <option value="2" >2 Star</option>
                                <option value="3" >3 Star</option>
                                <option value="4" >4 Star</option>
                                <option value="5" >5 Star</option>
                            </select>
                            {/* <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500" id="name" type="text" placeholder="Enter your name" /> */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
                                Comment
                            </label>
                            <textarea onChange={handleNoiDungBinhLuan} name="noi_dung" rows={4} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500" id="comment" placeholder="Enter your comment" defaultValue={""} />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
