import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Radio,
    Select
} from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { actFetchInfoRoom } from './duckInfoRoom/actInfoRoom';
import TextArea from 'antd/es/input/TextArea';
import { API_IMG_URL } from 'Utils/_constantsUtils';


export default function AddRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [form] = Form.useForm();
    const { data } = useSelector(state => state.layInfoRoomReducer);
    // console.log(data);
    const info = {
        ...data
    }
    const formik = useFormik({
        initialValues: {
            room_id: info?.room_id,
            ten_phong: info?.ten_phong,
            khach: info?.khach,
            phong_ngu: info?.phong_ngu,
            giuong: info?.giuong,
            phong_tam: info?.phong_tam,
            mo_ta: info?.mo_ta,
            gia_tien: info?.gia_tien,
            may_giat: info?.may_giat,
            ban_la: info?.ban_la,
            tivi: info?.tivi,
            dieu_hoa: info?.dieu_hoa,
            wifi: info?.wifi,
            bep: info?.bep,
            do_xe: info?.do_xe,
            ho_boi: info?.ho_boi,
            ban_ui: info?.ban_ui,
            vitri_id: info?.vitri_id,
            hinh_anh: info?.hinh_anh
        },
        onSubmit: values => {
            // console.log("value", values);

        },
    });

    useEffect(() => {
        dispatch(actFetchInfoRoom(params.id));
    }, [])

    const onChangeRadio = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(`${[name]}`, value);
    };

    const onChangeNumber = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(`${[name]}`, Number(value));
    };

    const onChangeSelect = (value) => {
        formik.setFieldValue('ma_vi_tri', Number(value))
    }


    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            form={form}
            style={{
                maxWidth: "100%",
                padding: "24px"
            }}
        >
            <div className='grid grid-cols-2 w-full'>
                <div>
                    <Form.Item label="Tên Phòng" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="ten_phong" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={info?.ten_phong} />
                    </Form.Item>
                    <Form.Item label="Khách" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="khach" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={info?.khach} />
                    </Form.Item>
                    <Form.Item label="Phòng Ngủ" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="phong_ngu" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={info?.phong_ngu} />
                    </Form.Item>
                    <Form.Item label="Giường" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="giuong" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={info?.giuong} />
                    </Form.Item>
                    <Form.Item label="Phòng Tắm" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="phong_tam" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={info?.phong_tam} />
                    </Form.Item>
                    <Form.Item label="Mô Tả" style={{ fontSize: "1.2rem" }} >
                        <TextArea disabled style={{ height: "120px", }} onChange={formik.handleChange} value={info?.mo_ta}/>
                    </Form.Item>
                    <Form.Item label="Mã Vị Trí">
                        <Select disabled name="vitri_id" onChange={onChangeSelect} style={{ width: "100%" }} value={info?.vitri_id}>
                            
                        </Select>
                    </Form.Item>
                    <Form.Item disabled label="Hình Ảnh" style={{ fontSize: "1.2rem" }}>
                        <input  type="image" src={info?.hinh_anh ? API_IMG_URL + info?.hinh_anh : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} onChange={formik.handleChange} name="hinh_anh" className='rounded-md p-1 w-full hover:border-blue-700 cursor-pointer' style={{ height: "120px", border: "0.5px solid #dadada" }} />
                    </Form.Item>
                    <Form.Item onClick={() => {
                        navigate(-1)
                    }}>
                        <RollbackOutlined style={{ fontSize: "24px", marginLeft: "60px" }} />
                        <button type='button' className='text-md bg-blue-500 text-white transition-all duration-500 rounded-md px-4 py-2 hover:text-black hover:bg-pink-500'>GoBack</button>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="Giá Tiền" style={{ fontSize: "1.2rem" }} >
                        <Input disabled name="gia_tien" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={info?.gia_tien} />
                    </Form.Item>
                    <Form.Item label="Máy Giặt" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="may_giat" onChange={onChangeRadio} value={info?.may_giat}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Bàn Là" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="ban_la" onChange={onChangeRadio} value={info?.ban_la}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Tivi" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="tivi" onChange={onChangeRadio} value={info?.tivi}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Bàn ủi" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="ban_ui" onChange={onChangeRadio} value={info?.ban_ui}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Điều Hòa" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="dieu_hoa" onChange={onChangeRadio} value={info?.dieu_hoa}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Wifi" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="wifi" onChange={onChangeRadio} value={info?.wifi}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Bếp" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="bep" onChange={onChangeRadio} value={info?.bep}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item  label="Đỗ Xe" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="do_xe" onChange={onChangeRadio} value={info?.do_xe}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item  label="Hồ bơi" style={{ fontSize: "1.2rem" }} >
                        <Radio.Group disabled name="ho_boi" onChange={onChangeRadio} value={info?.ho_boi}>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <button className='text-white bg-slate-500 ml-60 rounded-md p-2 hover:text-black transition-all duration-500 hover:bg-pink-500' style={{ width: "150px", height: "36px" }} type='submit' onClick={() => {
                        navigate(`../edit-room/${params.id}`)
                    }}>Edit Room</button>
                </div>
            </div>
        </Form>
    )
}
