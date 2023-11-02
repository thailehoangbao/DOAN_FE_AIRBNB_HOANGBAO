import React, { useEffect, Fragment } from 'react';
import { Button, Table } from 'antd';
import './bookRoomCss/DashboardBookRoom.css';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { actFetchDanhSachBookRoom } from './duckBookRoom/actBookRoom';
import { formatDateToDDMMYYYY } from 'Utils/_constantsUtils';
import { actFetchDeleteBookRoom } from '../deleteBookRoom/duckDeleteBookRoom/actDeleteBookRoom';
import {actSearchBookRoomDashboard} from './duckBookRoom/actBookRoom';


const { Search } = Input;
const suffix = (
  <AudioOutlined style={{ fontSize: 16, color: '#1677ff', }} />
);

export default function DashboardBookRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchData } = useSelector(state => state.layDanhSachBookRoomReducer);
  let dataHasKey = [];
  if (searchData) {
    dataHasKey = [...searchData];
    for (let i = 0; i < dataHasKey.length; i++) {
      dataHasKey[i] = { ...dataHasKey[i], key: i };
    }
  }
  useEffect(() => {
    dispatch(actFetchDanhSachBookRoom());
  }, [])


  const onSearch = (value) => {
    // gọi api edit 
    // console.log(value);
    dispatch(actSearchBookRoomDashboard(value));
  };


  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      width: '5%'
    },
    {
      title: 'Mã Người Dùng',
      dataIndex: 'user_id',
      filterSearch: true,
      onFilter: (value, record) => record.user_id.startsWith(value),
      width: '5%',
      sorter: (a, b) => a.user_id - b.user_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: 'Mã Phòng',
      dataIndex: 'room_id',
      sorter: (a, b) => a.room_id - b.room_id,
      onFilter: (value, record) => record.room_id.startsWith(value),
      sortDirections: ["descend", "ascend"],
      width: '5%',
    },
    {
      title: 'Ngày Đến',
      dataIndex: 'ngay_den',
      render: (value) => {
        return formatDateToDDMMYYYY(value);
      },
      sortDirections: ["descend", "ascend"],
      width: '5%',
    },
    {
      title: 'Ngày Đi',
      dataIndex: 'ngay_di',
      render: (value) => {
        return formatDateToDDMMYYYY(value);
      },
      sortDirections: ["descend", "ascend"],
      width: '5%',
    },
    {
      title: 'Số Lượng Khách',
      dataIndex: 'so_luong_khach',
      sorter: (a, b) => a.so_luong_khach - b.so_luong_khach,
      width: '5%',
    },
    {
      title: 'Action',
      dataIndex: 'hanhDong',
      render: (words, room) => {
        return <Fragment>
          <NavLink key={1} to={`/admin/quanlydatphong/edit-bookroom/${room.order_id}`}>
            <EditOutlined className='p-2 text-green-600 text-lg text-right' />
          </NavLink>
          <span className='cursor-pointer' key={6} onClick={() => {
            //gọi action xóa
            if (window.confirm(`Bạn chắc chắn xóa phòng có ${room.order_id} này!?`)) {
              //gọi action Xóa phim
              dispatch(actFetchDeleteBookRoom(room.order_id,navigate))
            }
          }}>
            <DeleteOutlined className='p-2 text-red-700 text-lg text-right' />
          </span>
          <NavLink key={2} to={`/admin/quanlydatphong/info-bookroom/${room.order_id}`} className='navLinkDSND'>
            <CalendarOutlined />
            <p className='navLinkDSND__child'>Xem Chi Tiết</p>
          </NavLink>
        </Fragment>
      },
      width: '15%'
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h3 className='text-left mb-1 text-2xl font-bold'>Quản lý Đặt Phòng</h3>
      <Button className='mb-2' onClick={() => {
        navigate('/admin/quanlydatphong/add-bookroom')
      }}>Thêm Phòng</Button>
      <Search
        style={{ backgroundColor: "black", borderRadius: "5px" }}
        placeholder="Nhập vào id phòng cần tìm kiếm"
        allowClear
        enterButton={<SearchOutlined className='pb-2' />}
        size="large"
        onSearch={onSearch}
        className='mt-2 mb-4'
      />
      <Table columns={columns} dataSource={dataHasKey} onChange={onChange} rowKey='key' />
    </div>
  )
}
