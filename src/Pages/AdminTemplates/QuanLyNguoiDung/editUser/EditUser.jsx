import React, { useEffect } from 'react';
import {
  Select,
  Form,
  Input,
  DatePicker,
} from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { actFetchEditUser } from './duckEditUser/actEditUser';
import { actFetchInfoUser } from '../infoUser/duckInfoUser/actInfoUser';
import { formatDateToDDMMYYYY, formatDateToYYYYMMDD } from 'Utils/_constantsUtils';

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const { data } = useSelector(state => state.layInfoUserReducer);
  const userEdit = {
    ...data
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_id: userEdit?.user_id,
      name: userEdit?.name,
      pass_word: userEdit?.pass_word,
      email: userEdit?.email,
      phone: userEdit?.phone,
      gender: userEdit?.gender,
      role: userEdit?.role,
      avatar: userEdit?.avatar,
      birth_day: userEdit?.birth_day,
    },
    onSubmit: values => {
      // console.log("value", values);
      const date = new Date().getTime();
      dispatch(actFetchEditUser(values.user_id, {...values,timecreated: formatDateToYYYYMMDD(date),birth_day: formatDateToYYYYMMDD(userEdit?.birth_day)}, navigate))
    },
  });

  useEffect(() => {
    dispatch(actFetchInfoUser(params.id));
  }, [])


  const handleRoleChange = value => {
    formik.setFieldValue('role', value); // Cập nhật giá trị 'role' trong formik state
  };
  const handleGenderChange = value => {
    formik.setFieldValue('gender', value); // Cập nhật giá trị 'role' trong formik state
  };
  const handleDateChange = (date, dateString) => {
    formik.setFieldValue('birth_day', dateString);
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
          <Form.Item label="Email" style={{ fontSize: "1.2rem" }} >
            <Input name="email" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.email} />
          </Form.Item>
          <Form.Item label="Họ tên" style={{ fontSize: "1.2rem" }} >
            <Input name="name" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.name} />
          </Form.Item>
          <Form.Item label="Số DT" style={{ fontSize: "1.2rem" }} >
            <Input name="phone" className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.phone} />
          </Form.Item>
          <Form.Item label="Gender" style={{ fontSize: "1.2rem" }} >
            <Select
              defaultValue='NAM'
              name="gender"
              style={{
                width: 280,
              }}
              className='rounded-md'
              onChange={value => {
                // formik.handleChange('gender')(value); // Gọi handleChange để cập nhật giá trị trong formik state
                handleGenderChange(value); // Gọi hàm để cập nhật giá trị role
              }}
              options={[
                {
                  value: "Nam",
                  label: 'NAM',
                },
                {
                  value: "Nữ",
                  label: 'NỮ',
                },
              ]}
            />
          </Form.Item>
          <Form.Item onClick={() => {
            navigate(-1)
          }}>
            <RollbackOutlined style={{ fontSize: "24px", marginLeft: "60px" }} />
            <button type='button' className='text-md bg-blue-500 text-white transition-all duration-500 rounded-md px-4 py-2 hover:text-black hover:bg-pink-500'>GoBack</button>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Mật Khẩu" style={{ fontSize: "1.2rem" }} >
            <Input name="pass_word" type='password' className='rounded-md p-1' style={{ height: "30px" }} onChange={formik.handleChange} value={formik.values.pass_word} />
          </Form.Item>
          <Form.Item label="birth_day" style={{ fontSize: "1.2rem" }} >
            <DatePicker name='birth_day' format="DD/MM/YYYY" onChange={handleDateChange} />
            <br />
            <span className='text-gray-600 text-sm'>Birth Day Prev: {userEdit?.birth_day ? formatDateToDDMMYYYY(userEdit?.birth_day) : ''}</span>
          </Form.Item>
          <Form.Item label="Role" style={{ fontSize: "1.2rem" }} >
            <Select
              defaultValue="USER"
              style={{
                width: 280,
              }}
              name="role"
              className='rounded-md'
              onChange={value => {
                formik.handleChange('role')(value); // Gọi handleChange để cập nhật giá trị trong formik state
                handleRoleChange(value); // Gọi hàm để cập nhật giá trị role
              }}
              options={[
                {
                  value: 'USER',
                  label: 'USER',
                },
                {
                  value: 'ADMIN',
                  label: 'ADMIN',
                },
              ]}
            />
          </Form.Item>
          <button className='text-white bg-slate-500 ml-60 rounded-md p-2 hover:text-black transition-all duration-500 hover:bg-pink-500' style={{ width: "150px", height: "36px" }} type='submit' onClick={formik.handleSubmit}>Cập Nhật Thông Tin</button>
        </div>
      </div>
    </Form>
  )
}
