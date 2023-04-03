import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, BorderOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageUpload';
import axios from 'axios';
import DefaultPic from '../../../assets/images/defaultPic.png'

const EditLeader = () => {

    const navigate = useNavigate();

    const [leaderImage, setLeaderImage] = useState();
    const [preview, setPreview] = useState()
    const [imgLogic, setImgLogic] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        if (leaderImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
                setImgLogic(true)
            }
            reader.readAsDataURL(leaderImage)

            console.log(preview)
        }
        else {
            setPreview(null)
        }
    }, [leaderImage, preview])

    const [id, setId]= useState();
    const [initialValue, setInitialValue] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFormDirty, setIsFormDirty] = useState(false);
    const url = "https://admin.uiss.patrickmamsery.works"
    useEffect(()=>{
        const fetchData = async()=>{
            setId(await JSON.parse(localStorage.getItem('userEditData')))
        }
        fetchData()
    },[])
    const [imageDBUrl, setImageDBUrl]= useState("")
    useEffect(()=>{
        if(id){
            axios.get(`${url}/api/users/${id}`).then(response =>{
                console.log(response.data.data)
                setInitialValue(
                    {
                        name: response.data.data.name,
                        email: response.data.data.email,
                        phone: response.data.data.phone,
                        position: response.data.data.position
                    }
                )
                setImageDBUrl(response.data.data.image)
                setLoading(false)
            })
        }
    }, [id])

    const uploadImg = async () => {
        if(leaderImage){
            try {
            const formData = new FormData();
            formData.append('file', leaderImage);
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
             return imageDBUrl
        }
    }
    
    const handleCancel = () => {
        form.resetFields();
        form.setFieldsValue(initialValue);
    };

    const handleValuesChange = (changedValues, allValues) => {
        if (isFormDirty === false) {
            setIsFormDirty(true);
        }
         if (Object.keys(changedValues).some(key => changedValues[key] !== initialValue[key])) {
            setIsFormDirty(true);
        } else if (Object.keys(allValues).every(key => allValues[key] === initialValue[key])) {
            setIsFormDirty(false);
        }
    };

    useEffect(()=> {
        if(imgLogic){
        setIsFormDirty(true)
    }
    },[imgLogic])

    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const image = await uploadImg();
        const data = {
            "name": values.name,
            "phone": values.phone,
            "email": values.email,
            "image": image,
            "role": "leader",
            "additionalInfo": {
                "position": values.position
            }
        }
        await axios.put(`${url}/api/users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if(response.statusText === 'OK'){
                navigate("/dashboard/leaders");
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
                                <li className="breadcrumb-item"><a href="/dashboard/leaders">Leaders</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/editLeader">Edit Leader</a></li>
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
                                <h7>Edit UISS Leader</h7>
                            </div>
                        </div>
                    </div>
                    <>
                        <Row gutter={[8, 8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card title="Leader's Name" bordered={true}>
                                    {
                                        !loading ? 
                                        <>
                                        <Form 
                                            form={form} onFinish={onFinish} 
                                            style={{ "width": "100%" }} initialValues={initialValue}
                                            onValuesChange={handleValuesChange}
                                        >
                                        <Row gutter={[8, 8]}>
                                            <Col lg={24}>
                                                <Form.Item>
                                                    <ImageUpload
                                                        image={leaderImage ?  preview : imageDBUrl === null ? DefaultPic :imageDBUrl}
                                                        style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                        handler={(event) => {
                                                            setLeaderImage(event.target.files[0])
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
                                                            message: 'name can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        addonBefore={<b>Fullname</b>}
                                                        prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />}
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
                                                        addonBefore={<b>Email</b>}
                                                        prefix={<MailOutlined className="site-form-item-icon" style={{ "color": "#DC06BB" }} />}
                                                        type="Email"
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
                                                        addonBefore={<b>Phone</b>}
                                                        prefix={<PhoneOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />}
                                                    />
                                                </Form.Item>
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
                                                        addonBefore={<b>Position</b>}
                                                        prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />}
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
                                                            disabled={!isFormDirty}

                                                        >
                                                            SAVE CHANGES
                                                        </Button>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Form.Item shouldUpdate>
                                                    {() => (
                                                        <Button
                                                            type="danger"
                                                            style={{ "width": "100%" }}
                                                            onClick={handleCancel}
                                                        >
                                                            CANCEL
                                                        </Button>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                        </>: null
                                    }
                                    <Row gutter={[8, 8]}>
                                        <Col lg={12}>
                                            <Button type='primary' onClick={() => navigate("/dashboard/leaders")}>Back</Button>            
                                        </Col>
                                    </Row>
                                    
                                </Card>
                            </Col>
                        </Row>
                    </>
                </div>
            </section>
        </div>
    );
};

export default EditLeader;