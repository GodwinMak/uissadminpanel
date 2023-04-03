import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Space, Button, Input} from 'antd';
import {
    EyeFilled, DeleteFilled, EditFilled, SearchOutlined
} from '@ant-design/icons';
import {AiOutlineUserAdd} from "react-icons/ai"
import axios from 'axios';
import DefaultPic from "../../assets/images/defaultPic.png"

const Leaders = () => {

const navigate = useNavigate();
  const [userData , setUserData] = useState([]);
  
  const[ind, setIndex ] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(ind)
  useEffect(() => {
    fetchRecords(1);
  }, []);
  const url = "https://admin.uiss.patrickmamsery.works";

  const fetchRecords = async (page) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    await axios
      .get(`${url}/api/users/role/leader?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        console.log(res.data)
        setUserData(res.data.data);
        if(res.data.meta){
          setTotalPages(res.data.meta.total);
          setIndex(res.data.meta.from);
        }
        setLoading(false);
      });
  };
    
  const handelDeleteRow= React.useCallback(
  (row)=>{
    console.log(row.key)
    if (
      // eslint-disable-next-line no-restricted-globals
      !confirm(`Are you sure you want to delete ${row.name}`)
      ) {return}
      axios.delete(`${url}/api/users/${row.key}`).then(response =>{
        // console.log(response.data.status, response.data.message)
        if(response.data.status === 'success'){
          if(
            // eslint-disable-next-line no-restricted-globals, no-unused-expressions
            !confirm(`${response.data.message}`)
          ){return}
            window.location.reload(false);
          
        }
      })
  },[])
  const handleEditRow = React.useCallback(
    (row)=>{
      // setRowData(row);
      localStorage.setItem('userEditData', JSON.stringify(row.key));
      navigate("/dashboardx/editleader")
  },[])
  const handleViewRow = React.useCallback(
        (row)=>{
            localStorage.setItem('rowId', JSON.stringify(row.key));
            navigate("/dasboard/viewLeader");
    },[])
  const columns = [
    {
        dataIndex: 'image',
        key: 'image',
        render: (imageUrl) => <img src={imageUrl === null ? DefaultPic: imageUrl} style={{width: "30px", height: "30px", borderRadius: "50%"}} alt="pic"/>,
    },
    {
        title: "Name",
        dataIndex: "name",
        filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input style={{}}
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button style={{float: "right"}}
              onClick={() => {
                clearFilters();
              }}
            //   type="danger"
            className='bg-danger' 
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link><EyeFilled style={{ "color": "green", "fontSize": "16px" }} onClick={()=> handleViewRow(record)}/></Link>
                <Link><DeleteFilled style={{ "color": "red", "fontSize": "16px" }} onClick={()=> handelDeleteRow(record)} /></Link>
                <Link><EditFilled style={{ "color": "blue", "fontSize": "16px" }} onClick={()=> handleEditRow(record)} /></Link>
            </Space>
        ),
    },
];

const data = userData.map((item, index) =>{
    return{
      key: item.id,
      image: item.image,
      name: item.name,
      phone: item.phone,
      email: item.email,
      tags: [item.role]
    }
  });
    return (
        <>
            <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/leaders">Leaders</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                        <div className='card'>
                            <div className="row mb-2" style={{padding: "10px"}}>
                                <div className="col-sm-6">
                                    <h1 className="m-0">Leaders</h1>
                                    <h7>List of all UISS Leaders</h7>
                                </div>
                                <div className="col-sm-6" style={{position: "relative", top: "20px"}}>
                                    <ol className='breadcrumb float-sm-right'>
                                        <Link to="/dashboard/addLeader">
                                        <AiOutlineUserAdd/>
                                        <span>Add Leaders</span>
                                        </Link>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <section className="col-lg-12 connectedSortable">
                                <div className="card">
                                    <Table
                                        loading={loading}
                                        columns={columns}
                                        scroll={{x: true, y: 400, scrollToFirstRowOnChange: true}}
                                        dataSource={data}
                                        pagination={{
                                        pageSize: 15,
                                        total: totalPages,
                                        onChange: (page) => {
                                            fetchRecords(page);
                                        },
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
            </section>
            </div>
        </>
    );
}

export default Leaders;

/**
 * @todo
 * - Adding the SearchUserComponent
 */