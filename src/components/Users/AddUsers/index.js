import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Card, Form, Input, Button} from 'antd';
import { EditOutlined, PhoneOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageComponent';
import axios from 'axios';
import DefaultPic from "../../../assets/images/defaultPic.png"
const AddUser = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
     const [img, setImg] = useState();
     const [preview, setPreview] = useState();

     useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(img)
        }
        else {
            setPreview(null)
        }
    }, [img]);

    const uploadImg = async () => {
        if(img){
            try {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('upload_preset', 'gmakyao');
            const response = await fetch('https://api.cloudinary.com/v1_1/gmak/image/upload', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            return data.url ;
        }
        catch (error) {
            console.log(error)
        }
        }else{
             return null
        }
    }

    const onFinish= async(values)=>{
        await uploadImg();
        const token = localStorage.getItem('token');
        const url = "https://admin.uiss.patrickmamsery.works";

        await axios.post( `${url}/api/users`, values, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            console.log(response);
            if(response.statusText === 'Created'){
                navigate("/dashboard/users");
            }
        })
    }
    return(
            
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/users">User</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/addUser">Add User</a></li>
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
                                <h1 className="m-0">User</h1>
                                <h7>Create UISS User</h7>
                            </div>
                        </div>
                    </div>
                    <>
                        <Row gutter={[8,8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card  bordered={true}>
                                    <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
                                        <Row gutter={[8, 8]}>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'User name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="User name" required />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Email name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="Your email" required />
                                                </Form.Item>
                                                <Form.Item
                                                    name="phone"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Phone can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<PhoneOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />} placeholder="Mobile Phone" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="role"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Role can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="Your role" required />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item>
                                                            <ImageUpload
                                                                src={img ? preview : DefaultPic}
                                                                style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                                handler={(event) => {
                                                                    setImg(event.target.files[0])
                                                                    console.log(img)
                                                                }}

                                                            />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[8, 8]}>
                                            <Col lg={12}>
                                                <Form.Item shouldUpdate>
                                                    {() => (
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            style={{ "width": "100%" }}
                                                            disabled={
                                                                !form.isFieldsTouched(true) ||
                                                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                                            }

                                                        >
                                                            SAVE
                                                        </Button>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item shouldUpdate>
                                                    {() => (
                                                        <Button
                                                            // type="danger"
                                                            className='bg-danger'
                                                            style={{ "width": "100%" }}
                                                            onClick={() => navigate("/dashboard/users")}
                                                        >
                                                            CANCEL
                                                        </Button>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                            </Col>
                        </Row> 
                    </>
                </div>
            </section>
        </div>    
    );
};

export default AddUser;