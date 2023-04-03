import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageUpload';
import DefaultPic from '../../../assets/images/defaultPic.png'
import axios from 'axios';
const { TextArea } = Input;


const AddEvent = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [img, setImg] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(img)
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
            return  data.secure_url 
        }
        catch (error) {
            console.log(error)
        }
        }
        else{
            return null
        }
        
    }

    const onFinish = async (values) => {
        const image = await uploadImg();
         const token = localStorage.getItem('token');
        const url = "https://admin.uiss.patrickmamsery.works";
        const data = {
            name: values.name,
            description: values.description,
            venue: values.venue,
            image: image,
            startDate: values.start_date,
            endDate: values.end_date,
            hosts: values.hosts
        }
        await axios.post(`${url}/api/events`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data.statusCode === 200){
                navigate("/dashboard/events");
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
                                <li className="breadcrumb-item"><a href="/dashboard/events">Events</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/addEvent">Add Events</a></li>
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
                                <h1 className="m-0">Event</h1>
                                <h7>Create UISS Event</h7>
                            </div>
                        </div>
                    </div>
                    <>
                       <Row gutter={[8, 8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card title="Add Event" bordered={true}>
                                    <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
                                        <Row gutter={[8, 8]}>
                                            <Col lg={12}>
                                                <Form.Item
                                                    name="name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event Name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="Event Name" required
                                                        type='text' 
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="hosts"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event Hosts can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="Event Hosts" required
                                                        type='text' 
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="venue"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event Venue can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="Event Venue" required
                                                        type='text' 
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="start_date"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event Start date Name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="Start Date (YYYY-MM-DD)" required
                                                        type='date' 
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="end_date"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event End date Name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} 
                                                        placeholder="End Date (YYYY-MM-DD)" required 
                                                        type='date'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="description"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Event Description can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <TextArea
                                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                                        placeholder="Event Description"
                                                    />
                                                </Form.Item>
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
                                                        <Form.Item>
                                                            <Button
                                                                className='bg-danger'
                                                                style={{ "width": "100%" }}
                                                                onClick={() => navigate("/dashboard/events")}
                                                            >
                                                                CANCEL
                                                            </Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={12}>
                                                <ImageUpload
                                                    image={img ? preview : DefaultPic}
                                                    style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                    handler={(event) => {
                                                        setImg(event.target.files[0])
                                                    }}

                                                />
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

export default AddEvent;