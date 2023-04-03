import React, {useState, useEffect} from 'react'
import {Row, Col, Card, Form, Input, Button} from 'antd';
import { EditOutlined, UserOutlined, StarOutlined} from '@ant-design/icons';
import DefaultPic from '../../../assets/images/defaultPic.png'
import ImageUpload from '../../ImageUpload';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const {TextArea} = Input;


const EditProject = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [img, setImg] = useState();
     const [preview, setPreview] = useState();
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
            setId(await JSON.parse(localStorage.getItem('userEditData')))
        }
        fetchData()
    },[])

    const [intialImage, setIntialImage] = useState(null)
    useEffect(()=>{
        if(id){
            axios.get(`${url}/api/projects/${id}`).then(response =>{
                console.log(response.data.data)
                setInitialValue(
                    {
                        title: response.data.data.title,
                        description: response.data.data.description,
                        category: response.data.data.category,
                        owner: response.data.data.people
                    }
                )
                setIntialImage(response.data.data.image)
                setLoading(false)
            })
        }
    }, [id])
    
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
             return intialImage
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
        const image = await uploadImg()
        const token = localStorage.getItem('token');
        console.log(values)
        const data = {
            title: values.title,
            description: values.description,
            category: values.category,
            owner: values.owner,
            image: image
        }

        await axios.put( `${url}/api/projects/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if(response.statusText === 'OK'){
                navigate("/dashboard/projects");
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
                                <li className="breadcrumb-item"><a href="/dashboard/projects">Projects</a></li>
                                <li className="breadcrumb-item"><a href="/dashboard/editProject">Edit Project</a></li>
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
                                <h1 className="m-0">Projects</h1>
                                <h7>Edit UISS Projects</h7>
                            </div>
                        </div>
                    </div>
                    <>
                        <Row gutter={[8,8]}>
                            <Col xs={24} sm={24} lg={24}>
                                <Card title="Add User" bordered={true}>
                                    {
                                        !loading ? 
                                            <>
                                                <Form 
                                                    form={form} onFinish={onFinish} style={{ "width": "100%" }} 
                                                    initialValues={initialValue} 
                                                    onValuesChange={handleValuesChange}
                                                >
                                                    <Row gutter={[8, 8]}>
                                                        <Col lg={12}>
                                                            <Form.Item
                                                                name="title"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Title can not be empty!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Enter Title" />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="owner"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'A project must have a responsible person!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Responsible Person" />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="category"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Project category can not be empty!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input prefix={<StarOutlined className="site-form-item-icon" />} placeholder="Project Category" />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="description"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Project description can not be empty!',
                                                                    },
                                                                ]}
                                                            >
                                                                <TextArea placeholder="Write a project description" showCount maxLength={100} />
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
                                                        </Col>
                                                        <Col lg={12}>
                                                        <ImageUpload
                                                            image={img ? preview : intialImage === null ? DefaultPic: intialImage}
                                                            style={{ width: "175px", height: "175px", marginTop: "-16px", cursor: "pointer", objectFit: "cover", backgroundSize: "cover", borderRadius: "50%" }}
                                                            handler={(event) => {
                                                                setImg(event.target.files[0])
                                                            }}
                                                        />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </>: null
                                    }
                                    
                                    <Row gutter={[8, 8]}>
                                        <Col lg={12}>
                                            <Button type='primary' onClick={() => navigate("/dashboard/projects")}>Back</Button>            
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

export default EditProject