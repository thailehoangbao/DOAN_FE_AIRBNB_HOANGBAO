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
import { actFetchViTriTimKiem } from 'Pages/HomeTemplates/HomePage/ListViTri/duckViTri/actViTri';
import { actFetchInfoRoom } from '../infoRoom/duckInfoRoom/actInfoRoom';
import { actFetchEditRoom } from './duckEditRoom/actEditRoom';
import ButtonUploadImagePhong from './ButtonUploadImagePhong';


export default function EditRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [imgSrc, setImgSrc] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const { data } = useSelector(state => state.layInfoRoomReducer);
  const room = {
    ...data
  }
  const listViTri = useSelector(state => state.viTriTimKiemReducer);
  // console.log(room);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      room_id: room.room_id,
      ten_phong: room.ten_phong,
      khach: room.khach,
      phong_ngu: room.phong_ngu,
      giuong: room.giuong,
      phong_tam: room.phong_tam,
      mo_ta: room.mo_ta,
      gia_tien: room.gia_tien,
      may_giat: room.may_giat,
      ban_la: room.ban_la,
      tivi: room.tivi,
      dieu_hoa: room.dieu_hoa,
      wifi: room.wifi,
      bep: room.bep,
      do_xe: room.do_xe,
      ho_boi: room.ho_boi,
      ban_ui: room.ban_ui,
      vitri_id: room.vitri_id,
      hinh_anh: room.hinh_anh,
    },
    onSubmit: values => {
      // console.log("value", values);
      const form = {
        ...values,
        hinh_anh:""
      }
      console.log(form)
      dispatch(actFetchEditRoom(values.room_id, form, navigate))
    },
  });

  useEffect(() => {
    dispatch(actFetchInfoRoom(params.id));
    dispatch(actFetchViTriTimKiem());
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
    formik.setFieldValue('vitri_id', Number(value))
  }

  const handleChangeImg = (e) => {
    setImgSrc(e.target.value);
    formik.setFieldValue('hinh_anh', e.target.value);
  }

  const renderOptionVitri = () => {
    return listViTri?.data?.map((item, index) => {
      return <Option value={`${item.vitri_id}`} key={index}>{item.ten_vi_tri}</Option>
    })
  }

  return (
    <div>
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
              <Input name="ten_phong" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.ten_phong} />
            </Form.Item>
            <Form.Item label="Khách" style={{ fontSize: "1.2rem" }} >
              <Input name="khach" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.khach} />
            </Form.Item>
            <Form.Item label="Phòng Ngủ" style={{ fontSize: "1.2rem" }} >
              <Input name="phong_ngu" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.phong_ngu} />
            </Form.Item>
            <Form.Item label="Giường" style={{ fontSize: "1.2rem" }} >
              <Input name="giuong" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.giuong} />
            </Form.Item>
            <Form.Item label="Phòng Tắm" style={{ fontSize: "1.2rem" }} >
              <Input name="phong_tam" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.phong_tam} />
            </Form.Item>
            <Form.Item label="Mô Tả" style={{ fontSize: "1.2rem" }} >
              <Input name="mo_ta" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.mo_ta} />
            </Form.Item>
            <Form.Item label="Mã Vị Trí">
              <Select name="vitri_id" onChange={onChangeSelect} style={{ width: "100%" }} value={formik.values.vitri_id}>
                {renderOptionVitri()}
              </Select>
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
              <Input name="gia_tien" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.gia_tien} />
            </Form.Item>
            <Form.Item label="Máy Giặt" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="may_giat" onChange={onChangeRadio} value={formik.values.may_giat}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Bàn Là" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="ban_la" onChange={onChangeRadio} value={formik.values.ban_la}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Tivi" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="tivi" onChange={onChangeRadio} value={formik.values.tivi}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Bàn ủi" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="ban_ui" onChange={onChangeRadio} value={formik.values.ban_ui}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Điều Hòa" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="dieu_hoa" onChange={onChangeRadio} value={formik.values.dieu_hoa}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Wifi" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="wifi" onChange={onChangeRadio} value={formik.values.wifi}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Bếp" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="bep" onChange={onChangeRadio} value={formik.values.bep}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Đỗ Xe" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="do_xe" onChange={onChangeRadio} value={formik.values.do_xe}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Hồ bơi" style={{ fontSize: "1.2rem" }} >
              <Radio.Group name="ho_boi" onChange={onChangeRadio} value={formik.values.ho_boi}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <button className='text-white bg-slate-500 ml-60 rounded-md p-2 hover:text-black transition-all duration-500 hover:bg-pink-500' style={{ width: "150px", height: "36px" }} type='submit' onClick={formik.handleSubmit}>Thêm Phòng</button>
          </div>
        </div>
      </Form>
      <div className='pl-10'>
        <p className='text-sm text-yellow-500 text-left underline cursor-pointer' onClick={() => {
          setIsUpload(!isUpload);
        }}>Cập nhật ảnh</p>
        {isUpload ?
          <ButtonUploadImagePhong room_id={data?.room_id} />
          :
          ''
        }
      </div>
    </div>
  )
}
