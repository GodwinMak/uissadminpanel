import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { EditOutlined, StarOutlined} from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const EditProgram = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
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

    useEffect(()=>{
        if(id){
            axios.get(`${url}/api/programs/${id}`).then(response =>{
                setInitialValue(
                    {
                        name: response.data.data.name,
                        description: response.data.data.description,
                        category: response.data.data.category,
                    }
                )
                setLoading(false)
            })
        }
    }, [id])
    
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
    

    const onFinish = async (values) => {
        const token = localStorage.getItem('token');

        await axios.put( `${url}/api/programs/${id}`, values, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if(response.statusText === 'OK'){
                navigate("/dashboard/programs");
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
                                    <li className="breadcrumb-item"><a href="/dashboard/rpgrams">Programs</a></li>
                                    <li className="breadcrumb-item"><a href="/dashboard/editProgram">Edit Program</a></li>
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
                                    <h1 className="m-0">Programs</h1>
                                    <h7>Edit UISS Program</h7>
                                </div>
                            </div>
                        </div>
                        <>
                            <Row gutter={[8,8]}>
                                <Col xs={24} sm={24} lg={24}>
                                    <Card  bordered={true}>
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
                                                                    name="name"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Name can not be empty!',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Enter Name" />
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
                                                        </Row>
                                                    </Form>
                                                </>: null
                                        }
                                        <Row gutter={[8, 8]}>
                                            <Col lg={12}>
                                                <Button type='primary' onClick={() => navigate("/dashboard/programs")}>Back</Button>            
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

export default EditProgram;