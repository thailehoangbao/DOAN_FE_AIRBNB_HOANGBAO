import React, { useState } from 'react';
import {
    Form,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import { actFetchUploadImgPhong } from './duckUploadImgPhong/actUploadImgPhong';


export default function ButtonUploadImagePhong({room_id}) {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            file: null
        },
        onSubmit: (value) => {
            console.log(value);
            //tạo đối tượng formData
            let formData = new FormData();
            for (let key in value) {
                console.log(key, " ", value);
                if (key !== 'file') {
                    formData.append(key, value[key]);
                } else {
                    formData.append('file', value.file);
                }
            }
            // goi API đưa form data
            dispatch(actFetchUploadImgPhong(room_id,formData, navigate));
        }
    });

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
            // tạo đối tượng đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);// đọc file 
            reader.onload = (e) => {
                // console.log(e.target.result);// trả ra link
                setImgSrc(e.target.result);
            }
            // console.log("file", file);
            formik.setFieldValue('file', file);
        }
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            className='text-left'
        >
            <Form.Item>
                <input type="file" onChange={handleChangeFile} />
                <img src={imgSrc} style={{ width: "50px", height: "50px" }} alt="..." className='mt-2' />
            </Form.Item>
            <button className='bg-blue-600 rounded-md text-white text-sm px-1 py-2 mt-1 hover:bg-orange-500 transition-all duration-500' type="submit">Cập Nhật Hình Ảnh</button>
        </Form>
    )
}
