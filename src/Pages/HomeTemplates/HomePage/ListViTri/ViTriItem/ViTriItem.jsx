import { API_IMG_URL } from 'Utils/_constantsUtils'
import React from 'react'

export default function ViTriItem({vitri}) {
    return (
        <div className='cardViTri'>
            <div className='grid grid-cols-5'>
                <div className='col-span-1'>
                    <img src={ vitri?.hinh_anh ? API_IMG_URL + vitri?.hinh_anh : "https://icdn.dantri.com.vn/2021/04/28/ubnd-tp-1619582754877.jpg"} alt='' style={{width:"50px" ,height:"50px",borderRadius:"4px"}}/>
                </div>
                <div className='col-span-4'>
                    <p className='text-gray-700 font-semibold text-sm pt-1'>{vitri?.ten_vi_tri}</p>
                    <p className='text-gray-500 font-thin text-sm pt-1'>{vitri?.tinh_thanh}</p>
                </div>
            </div>
        </div>
    )
}
