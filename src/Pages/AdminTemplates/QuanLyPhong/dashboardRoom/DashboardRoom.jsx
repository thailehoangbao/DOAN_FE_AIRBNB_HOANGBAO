import React, { useEffect, Fragment } from 'react';
import { Button, Table } from 'antd';
import './dashboardRoomCss/DashboardRoom.css';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { actFetchDanhSachRoom, actSearchRoomDashboard } from './duckDashboardRoom/actDashboardRoom';
import { actFetchDeleteRoom } from '../deleteRoom/actDeleteRoom';
import { API_IMG_URL } from 'Utils/_constantsUtils';



const { Search } = Input;
const suffix = (
    <AudioOutlined style={{ fontSize: 16, color: '#1677ff', }} />
);

export default function DashboardRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchData } = useSelector(state => state.layDanhSachRoomReducer);
    
    let dataHasKey = [];
    if (searchData) {
        dataHasKey = [...searchData];
        for (let i = 0; i < dataHasKey.length; i++) {
            dataHasKey[i] = { ...dataHasKey[i], key: i };
        }
    }
    useEffect(() => {
        dispatch(actFetchDanhSachRoom());
    }, [])


    const onSearch = (value) => {
        // gọi api edit 
        dispatch(actSearchRoomDashboard(value));
    };


    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            width: '5%'
        },
        {
            title: 'Tên Phòng',
            dataIndex: 'ten_phong',
            filterSearch: true,
            onFilter: (value, record) => record.phong.startsWith(value),
            width: '15%',
            sorter: (a, b) => {
                let phongA = a.phong.toLowerCase().trim();
                let phongB = b.phong.toLowerCase().trim();
                if (phongA < phongB) {
                    return 1
                }
                return -1
            },
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinh_anh',
            onFilter: (value, record) => record.hinh_anh.startsWith(value),
            filterSearch: true,
            render: (text, phong) => {
                return <Fragment>
                    <div className='grid grid-cols-2'>
                        <div>
                            <img src={API_IMG_URL+ phong.hinh_anh} alt={phong.ten_phong} key={phong.id} width={100} height={100} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTmtkuN3FWQ7y4Dz0O05FCDD2eh1JKm_Npu1_fnDkug&s";
                            }} />
                        </div>
                        <div>
                            <span className='underline cursor-pointer hover:text-pink-400 transition-all duration-500'>Chỉnh Sửa</span>
                        </div>
                    </div>
                </Fragment>
            },
            width: '25%',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            sorter: (a, b) => a.moTa - b.moTa,
            sortDirections: ["descend", "ascend"],
            width: '30%',
            render: (words, films) => {
                return <Fragment>
                    {films.mo_ta.length > 40 ? films.mo_ta.substr(0, 40) + '...' : films.mo_ta}
                </Fragment>
            }
        },
        {
            title: 'Guest Max',
            dataIndex: 'khach',
            sorter: (a, b) => a.khach - b.khach,
            sortDirections: ["descend", "ascend"],
            width: '5%',
        },
        {
            title: 'Action',
            dataIndex: 'hanhDong',
            render: (words, room) => {
                return <Fragment>
                    <NavLink key={1} to={`/admin/quanlyphong/edit-room/${room.room_id}`}>
                        <EditOutlined className='p-2 text-green-600 text-lg text-right' />
                    </NavLink>
                    <span className='cursor-pointer' key={6} onClick={() => {
                        //gọi action xóa
                        if (window.confirm(`Bạn chắc chắn xóa người dùng này ${room.ten_phong} này!?`)) {
                            //gọi action Xóa phim
                            dispatch(actFetchDeleteRoom(room.room_id,navigate))
                        }
                    }}>
                        <DeleteOutlined className='p-2 text-red-700 text-lg text-right' />
                    </span>
                    <NavLink key={2} to={`/admin/quanlyphong/info-room/${room.room_id}`} className='navLinkDSND'>
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
            <h3 className='text-left mb-1 text-2xl font-bold'>Quản lý Phòng</h3>
            <Button className='mb-2' onClick={() => {
                navigate('/admin/quanlyphong/add-room')
            }}>Thêm Phòng</Button>
            <Search
                style={{ backgroundColor: "black", borderRadius: "5px" }}
                placeholder="Nhập vào tên phòng"
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
