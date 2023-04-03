import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, UserOutlined, StarOutlined} from '@ant-design/icons';
import DefaultPic from '../../../assets/images/defaultPic.png'
import ImageUpload from '../../ImageUpload';
import axios from 'axios';

const { TextArea } = Input;

const AddProject = () => {

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
        const image = await uploadImg()

        await uploadImg();
        const token = localStorage.getItem('token');
        const url = "https://admin.uiss.patrickmamsery.works";

        await axios.post( `${url}/api/projects`, {
            title: values.title,
            description: values.description,
            category: values.category,
            owner: values.owner,
            image: image
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            console.log(response);
            if(response.statusText === 'Created'){
                navigate("/dashboard/projects");
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
                                    <li className="breadcrumb-item"><a href="/dashboard/projects">Projects</a></li>
                                    <li className="breadcrumb-item"><a href="/dashboard/addProject">Add Projects</a></li>
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
                                    <h1 className="m-0">Project</h1>
                                    <h7>Create UISS Project</h7>
                                </div>
                            </div>
                        </div>
                        <>
                            <Row gutter={[8, 8]}>
                                <Col xs={24} sm={24} lg={24}>
                                    <Card  bordered={true}>
                                        <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
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
                                                                        onClick={() => navigate("/dashboard/projects")}

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
}

export default AddProject;

/**
 *
 * @todo
 * - Adding a feature to notify when an image is uploaded successfuly
 */