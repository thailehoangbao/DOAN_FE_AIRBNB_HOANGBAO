import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN, convertDateFormat } from 'Utils/_constantsUtils';
import { actFetchAddBookRoom } from './duckAddBookRoom/actAddBookRoom';



export default function AddBookRoom() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data } = useSelector(state => state.layDanhSachBookRoomReducer);
  const listRoomTheoroom_id = data?.filter((obj, index, self) => {
    const ids = self.map(item => item.room_id);
    return ids.indexOf(obj.room_id) === index;
  });
  const user = JSON.parse(localStorage.getItem(USER_LOGIN));
  const formik = useFormik({
    initialValues: {
      room_id: 0,
      ngay_den: "",
      ngay_di: "",
      so_luong_khach: 0,
      user_id: user?.user_id
    },
    onSubmit: values => {
      console.log("value", values);
      dispatch(actFetchAddBookRoom(values));
    },
  });

  const onChangeNumber = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(`${[name]}`, Number(value));
  };
  const onChangeSelect = (value) => {
    formik.setFieldValue('room_id', Number(value))
  }

  const renderOptionVitri = () => {
    return data?.map((item, index) => {
      return <Option value={`${item.room_id}`} key={index}>{item.ten_vi_tri}</Option>
    })
  }

  const handleDatengay_den = (date, dateString) => {
    if (dateString) {
      const newDate = convertDateFormat(dateString);
      console.log(newDate);
      formik.setFieldValue('ngay_den', newDate);
      return;
    } 
    formik.setFieldValue('ngay_den', '');
  };

  const handleDatengay_di = (date, dateString) => {
    if (dateString) {
      const newDate = convertDateFormat(dateString);
      formik.setFieldValue('ngay_di', newDate);
      return;
    }
    formik.setFieldValue('ngay_di', '');
  };

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
          <Form.Item label="SL Khách" style={{ fontSize: "1.2rem" }} >
            <Input name="soLuongKhach" className='rounded-md p-1' style={{ height: "30px" }} onChange={onChangeNumber} value={formik.values.soLuongKhach} />
          </Form.Item>
          <Form.Item label="Mã ND" style={{ fontSize: "1.2rem" }} >
            <Input disabled name="user_id" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.user_id} />
          </Form.Item>
          <Form.Item onClick={() => {
            navigate(-1)
          }}>
            <RollbackOutlined style={{ fontSize: "24px", marginLeft: "60px" }} />
            <button type='button' className='text-md bg-blue-500 text-white transition-all duration-500 rounded-md px-4 py-2 hover:text-black hover:bg-pink-500'>GoBack</button>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Mã Phòng">
            <Select name="room_id" onChange={onChangeSelect} style={{ width: "100%" }} value={formik.values.room_id}>
              {renderOptionVitri()}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày Đến" style={{ fontSize: "1.2rem" }} >
            <DatePicker name='ngay_den' format="DD/MM/YYYY" onChange={handleDatengay_den} />
          </Form.Item>
          <Form.Item label="Ngày Đi" style={{ fontSize: "1.2rem" }} >
            <DatePicker name='ngay_di' format="DD/MM/YYYY" onChange={handleDatengay_di} />
          </Form.Item>
          <button className='text-white bg-slate-500 ml-60 rounded-md p-2 hover:text-black transition-all duration-500 hover:bg-pink-500' style={{ width: "150px", height: "36px" }} type='submit' onClick={formik.handleSubmit}>Đặt Phòng</button>
        </div>
      </div>
    </Form>
  )
}
