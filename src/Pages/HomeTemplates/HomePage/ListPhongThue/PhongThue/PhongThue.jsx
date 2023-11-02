import React, { useState } from 'react';
import './PhongThue.css';
import { useNavigate } from 'react-router-dom';
import { API_IMG_URL } from 'Utils/_constantsUtils';
export default function PhongThue({ phongthue }) {
    const [isLike, setIsLike] = useState(true);
    const [isLikeStar, setLikeStar] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="max-w-lg p-4 shadow-lg dark:bg-gray-900 dark:text-gray-100 phongthue" style={{ border: "0.5px solid #999", borderRadius: "12px" }} onClick={() => { 
            navigate(`/detail/${phongthue?.room_id}`)
        }}>
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center">

                </div>
                <div onClick={() => {
                    setIsLike(!isLike);
                }}>
                    {isLike ? <i className={`fa-solid fa-heart text-red-600 cursor-pointer`}></i> : <i className={`fa-solid fa-heart cursor-pointer`}></i>}
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className='flex justify-center items-center flex-col' >
                        <img className='flex ' style={{ width: "100%", height: "200px" }} src={API_IMG_URL + phongthue?.hinh_anh} />
                    </div>
                    <div className="flex items-center text-xs">
                        <span>6 min ago</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className='grid grid-cols-6'>
                        <div className='col-span-4'>
                            <a rel="noopener noreferrer" href="#" className="mb-0 capitalize text-sm font-semibold">{phongthue.ten_phong}</a>
                        </div>
                        <div className='col-span-2'>
                            <i className="fa-solid fa-star text-yellow-500 text-xs cursor-pointer "></i>
                            <i className="fa-solid fa-star text-yellow-500 text-xs cursor-pointer "></i>
                            <i className="fa-solid fa-star text-yellow-500 text-xs cursor-pointer "></i>
                            <i className="fa-solid fa-star text-yellow-500 text-xs cursor-pointer "></i>
                            <span onClick={() => {
                                setLikeStar(!isLikeStar);
                            }}>
                            {isLikeStar ? <i className="fa-solid fa-star text-yellow-500 text-xs cursor-pointer "></i> : <i className="fa-solid fa-star-half text-yellow-500 text-xs cursor-pointer"></i>}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>8 km</p>
                        <p className='text-sm text-gray-500'>{phongthue.phong_ngu} phòng ngủ, {phongthue.phong_tam} phòng tắm</p>
                        <p className='text-sm text-black '><span className='font-semibold mr-2'>{phongthue.gia_tien}$</span>đêm</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
