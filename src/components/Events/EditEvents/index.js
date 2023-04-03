import React, {useState, useEffect} from 'react'
import {Row, Col, Card, Form, Input, Button} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ImageUpload from '../../ImageUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultPic from '../../../assets/images/defaultPic.png'

const { TextArea } = Input;

const EditEvent = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [img, setImg] = useState();
    const [preview, setPreview] = useState();
    const [imageDBUrl, setImageDBUrl] = useState("")
    const [imgLogic, setImgLogic] = useState(false);

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
                setImgLogic(true)
            }
            reader.readAsDataURL(img)
        }
        else {
            setPreview(null)
        }
    }, [img]);
    
    const [id, setId]= useState();
    const [initialValue, setInitialValue] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFormDirty, setIsFormDirty] = useState(false);

    const url = "https://admin.uiss.patrickmamsery.works"
    useEffect(()=>{
        const fetchData = async()=>{
            setId(await JSON.parse(localStorage.getItem('userEditEvent')))
        }
        fetchData()
    },[])
    useEffect(()=>{
        if(id){
            axios.get(`${url}/api/events/${id}`).then(response =>{
                console.log(response.data.data)
                setInitialValue(
                    {
                        name: response.data.data.name,
                        hosts: response.data.data.hosts,
                        venue: response.data.data.venue,
                        startDate: response.data.data.startDate.slice(0, 10),
                        endDate: response.data.data.endDate.slice(0, 10),
                        description: response.data.data.description
                    }
                )
                setImageDBUrl(response.data.data.image);
                setLoading(false)
            })
        }
    }, [id]);
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
            return  data.url 
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

    const onFinish = async (values)=>{
        const hosts = values.hosts
         const image = await uploadImg();
        const token =  localStorage.getItem('token');
        const data = {
            name: values.name,
            image: image,
            hosts: hosts,
            venue: values.venue,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description,
        }
        
        await axios.put( `${url}/api/events/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if(response.data.statusCode === 200){
                navigate("/dashboard/events");
            }
        })
    }
  return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-12'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/events">Events</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/editEvent">Edit Event</a></li>
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
                                <h1 className="m-0">Events</h1>
                                <h7>Edit UISS Event</h7>
                            </div>
                        </div>
                    </div>
                    <>
                       <Row gutter={[8, 8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card title="Edit Event" bordered={true}>
                                    {!loading ? 
                                        <>
                                            <Form 
                                                form={form} 
                                                onFinish={onFinish} 
                                                style={{ "width": "100%" }}
                                                initialValues={initialValue}
                                                onValuesChange={handleValuesChange}
                                            >
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
                                                            name="startDate"
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
                                                            name="endDate"
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
                                                                            disabled={!isFormDirty}
                                                                        >
                                                                            SAVE
                                                                        </Button>
                                                                    )}
                                                                </Form.Item>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Item>
                                                                    <Button
                                                                        type="danger"
                                                                        style={{ "width": "100%" }}
                                                                        onClick={handleCancel}

                                                                    >
                                                                        CANCEL
                                                                    </Button>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <ImageUpload
                                                            image={img ? preview :  imageDBUrl === null ? DefaultPic: imageDBUrl}
                                                            style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                            handler={(event) => {
                                                                setImg(event.target.files[0])
                                                                setIsFormDirty(true)
                                                            }}

                                                        />
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </>
                                        : null
                                    }
                                    <Row gutter={[8, 8]}>
                                        <Col lg={12}>
                                            <Button type='primary' onClick={() => navigate("/dashboard/events")}>Back</Button>            
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row> 
                    </>
                </div>
            </section>
        </div>    
  )
}

export default EditEvent