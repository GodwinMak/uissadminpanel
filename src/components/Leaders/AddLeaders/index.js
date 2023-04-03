import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, BorderOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageUpload';
import DefaultPic from '../../../assets/images/defaultPic.png'

import axios from 'axios';

const AddLeader = () => {

    const [img, setImg] = useState();
    const [preview, setPreview] = useState();

    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(img)

            console.log(preview)
        }
        else {
            setPreview(null)
        }
    }, [img, preview])


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

    const onFinish = async (values) => {
        const normalInputValue = document.getElementById('my-input').value;
        const image = await uploadImg();
        const token = localStorage.getItem('token');
        const url = "https://admin.uiss.patrickmamsery.works";
        const data = {
            "name": values.name,
            "email": values.email,
            "phone": values.phone,
            "role": normalInputValue,
            "image": image,
            "additionalInfo": {
                "position": values.position
            }
        }
        await axios.post(`${url}/api/users`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.data.statusCode === 200){
                navigate("/dashboard/leaders");
            }

        })
    };

    const [formCompleted, setFormCompleted] = useState(false);

    return (
        
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/leaders">Leader</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/addLeader">Add Leader</a></li>
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
                                <h1 className="m-0">Leader</h1>
                                <h7>Create UISS Leader</h7>
                            </div>
                        </div>
                    </div>
                    <>
                        <Row gutter={[8, 8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card  bordered={true}>
                                    <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
                                        <Row gutter={[8, 8]}>
                                            <Col lg={24}>
                                                <Form.Item>
                                                    <ImageUpload
                                                        image={img ? preview : DefaultPic}
                                                        style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                        handler={(event) => {
                                                            setImg(event.target.files[0])
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[8, 8]}>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Fullname can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="Fullname" 
                                                        onChange={() => {
                                                            const fieldsValue = form.getFieldsValue();
                                                            const completed = Object.keys(fieldsValue).every((fieldName) => {
                                                                return fieldName !== "role" && Boolean(fieldsValue[fieldName]);
                                                            });
                                                            setFormCompleted(completed);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Email can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<MailOutlined className="site-form-item-icon" style={{ "color": "#DC06BB" }} />} 
                                                        placeholder="Email" type="email" 
                                                        onChange={() => {
                                                            const fieldsValue = form.getFieldsValue();
                                                            const completed = Object.keys(fieldsValue).every((fieldName) => {
                                                                return fieldName !== "role" && Boolean(fieldsValue[fieldName]);
                                                            });
                                                            setFormCompleted(completed);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="phone"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Phone can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<PhoneOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />} 
                                                        placeholder="Mobile Phone" required 
                                                        onChange={() => {
                                                            const fieldsValue = form.getFieldsValue();
                                                            const completed = Object.keys(fieldsValue).every((fieldName) => {
                                                                return fieldName !== "role" && Boolean(fieldsValue[fieldName]);
                                                            });
                                                            setFormCompleted(completed);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item
                                                    
                                                >
                                                    <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />} readOnly defaultValue="Leader" disabled={true} />
                                                </Form.Item>
                                                    <input  id="my-input" type="hidden" name="role" value="leader"/>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="position"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Position can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} 
                                                        placeholder="Position" required
                                                        onChange={() => {
                                                            const fieldsValue = form.getFieldsValue();
                                                            const completed = Object.keys(fieldsValue).every((fieldName) => {
                                                                return fieldName !== "role" && Boolean(fieldsValue[fieldName]);
                                                            });
                                                            setFormCompleted(completed);
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
                                                            disabled={!formCompleted}
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
                                                            onClick={() => navigate("/dashboard/leaders")}

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

export default AddLeader;