import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, StarOutlined, MailOutlined, PhoneOutlined, BorderOutlined, HeartOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageUpload';
import DefaultPic from '../../../assets/images/defaultPic.png'
import axios from 'axios';

const EditMember = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [preview, setPreview] = useState()
    const [memberImage, setMemberImage] = useState();
    const [imgLogic, setImgLogic] = useState(false);

    useEffect(() => {
        if (memberImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
                setImgLogic(true)
            }
            reader.readAsDataURL(memberImage)

        }
        else {
            setPreview(null)
        }
    }, [memberImage, preview])

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
    const [initialImg, setInitialImg] = useState("");
    useEffect(()=>{
        if(id){
            axios.get(`${url}/api/users/${id}`).then(response =>{
                console.log(response.data.data.image)
                setInitialValue(
                    {
                        name: response.data.data.name,
                        email: response.data.data.email,
                        phone: response.data.data.phone,
                        areaofinterest: response.data.data.areaOfInterest,
                        university: response.data.data.university,
                        department: response.data.data.department,
                        college: response.data.data.college,
                        programe: response.data.data.degreeProgramme,
                        regno: response.data.data.regNo,
                    }
                )
                setInitialImg(response.data.data.image);
                setLoading(false)
            })
        }
    }, [id])


    const uploadImg = async () => {
        if(memberImage){
            try {
            const formData = new FormData();
            formData.append('file', memberImage);
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
             return initialImg
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
        if(imgLogic){
            setIsFormDirty(true)
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
        const image = await uploadImg();
        const token = localStorage.getItem('token');
        const data ={
            "name": values.name,
            "email": values.email,
            "image": image,
            "phone": values.phone,
            "role": "member",
            "additionalInfo": {
                "regNo": values.regno,
                "areaOfInterest": values.areaofinterest,
                "university": values.university,
                "college": values.college,
                "department": values.department,
                "degreeProgramme": values.programe
            }
        }
        await axios.put(`${url}/api/users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if(response.statusText === 'OK'){
                navigate("/panel/members");
            }
        })        
    };

    return (
        <>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/members">Members</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/editMember">Edit Member</a></li>
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
                                <Card title="Edit Member" bordered={true}>
                                    {!loading ?
                                        <>
                                        <Form form={form} onFinish={onFinish} style={{ "width": "100%" }} initialValues={initialValue} onValuesChange={handleValuesChange}>
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
                                                    <Input addonBefore="Fullname" prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} />
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
                                                    <Input addonBefore="Email" prefix={<MailOutlined className="site-form-item-icon" style={{ "color": "#DC06BB" }} />} type="email" />
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
                                                    <Input addonBefore="Phone" prefix={<PhoneOutlined className="site-form-item-icon" style={{ "color": "#15B202" }} />} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="areaofinterest"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Area of interest can not be empty!',
                                                        },
                                                    ]}
                                                >
                                                    <Input addonBefore="Area of Interest" prefix={<HeartOutlined className="site-form-item-icon" style={{ "color": "#B90707" }} />} defaultValue="Area of Interest" required />
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
                                                    <Input addonBefore="University" prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />}  required />
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
                                                    <Input addonBefore="Department" prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} defaultValue="Department" required />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12}>
                                                <Row gutter={[8, 8]}>
                                                    <Col lg={24}>
                                                        <Form.Item>
                                                            <ImageUpload
                                                                image={memberImage ? preview : initialImg === null ? DefaultPic :initialImg }
                                                                style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                                handler={(event) => {
                                                                    setMemberImage(event.target.files[0])
                                                                    console.log(memberImage)
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
                                                            <Input addonBefore="Registration number" prefix={<StarOutlined className="site-form-item-icon" style={{ "color": "#DC9806" }} />} />
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
                                                            <Input addonBefore="College" prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} defaultValue="College" />
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
                                                            <Input addonBefore="Programe" prefix={<BorderOutlined className="site-form-item-icon" style={{ "color": "#0354B0" }} />} defaultValue="Programe" />
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
                                                            disabled={!isFormDirty}
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
                                            <Button type='primary' onClick={() => navigate("/dashboard/members")}>Back</Button>            
                                        </Col>
                                    </Row>
                                    
                                </Card>
                            </Col>
                        </Row>
                    </>
                </div>
            </section>
        </div>

        </>
    );
};

export default EditMember;