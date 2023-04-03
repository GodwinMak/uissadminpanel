import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, StarOutlined, MailOutlined, PhoneOutlined, BorderOutlined, HeartOutlined } from '@ant-design/icons';
import DefaultPic from '../../../assets/images/defaultPic.png'
import ImageUpload from '../../ImageComponent'
import axios from 'axios';

const AddMember = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [preview, setPreview] = useState();
    const [img, setImg] = useState();

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
    }, [img])

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
            return data.secure_url ;
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
        const data ={
            "name": values.name,
            "email": values.email,
            "image": image,
            "phone": values.phone,
            "role": normalInputValue,
            "additionalInfo": {
                "regNo": values.regno,
                "areaOfInterest": values.areaofinterest,
                "university": values.university,
                "college": values.college,
                "department": values.department,
                "degreeProgramme": values.programe
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
                navigate("/dashboard/members");
            }

        })
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/members">Members</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/addMember">Add Member</a></li>
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
                                <h1 className="m-0">Members</h1>
                                <h7>Create UISS Member</h7>
                            </div>
                        </div>
                    </div>
                    <>
                    <Row gutter={[8, 8]}>
                        <Col xs={24} sm={24} lg={24}>
                            <Card bordered={true}>
                                <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
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
                                                <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="Fullname" required />
                                            </Form.Item>
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Email can not be empty!',
                                                    },
                                                ]}
                                            >
                                                <Input prefix={<MailOutlined className="site-form-item-icon" style={{ "color": "#DC06BB" }} />} placeholder="Email" type="email" />
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
                                                
                                            >
                                                <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />} readOnly defaultValue="Member" disabled={true} />
                                            </Form.Item>
                                                <input  id="my-input" type="hidden" name="role" value="member"/>
                                            <Form.Item
                                                name="areaofinterest"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Area of interest can not be empty!',
                                                    },
                                                ]}
                                            >
                                                <Input prefix={<HeartOutlined className="site-form-item-icon" style={{ "color": "#B90707" }} />} placeholder="Area of Interest" required />
                                            </Form.Item>
                                            <Form.Item
                                                name="university"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'University can not be empty!',
                                                    },
                                                ]}
                                            >
                                                <Input prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} placeholder="University" required />
                                            </Form.Item>
                                            <Form.Item
                                                name="department"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Department can not be empty!',
                                                    },
                                                ]}
                                            >
                                                <Input prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} placeholder="Department" required />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12}>
                                            <Row gutter={[8, 8]}>
                                                <Col lg={24}>
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
                                                <Col lg={24}>
                                                    <Form.Item
                                                        name="regno"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Registration number can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<StarOutlined className="site-form-item-icon" style={{ "color": "#DC9806" }} />} placeholder="Registration number" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="college"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'College can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} placeholder="College" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="programe"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Programe can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} placeholder="Programe" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
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
                                                        className='bg-danger'
                                                        style={{ "width": "100%" }}
                                                        onClick={() => navigate("/dashboard/members")}

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

export default AddMember;