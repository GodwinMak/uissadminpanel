import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const AddProgram = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const url = "https://admin.uiss.patrickmamsery.works";
        await axios.post( `${url}/api/programs`, values, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            console.log(response);
            if(response.statusText === 'Created'){
                navigate("/dashboard/programs");
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
                                    <li className="breadcrumb-item"><a href="/dashboard/programs">Programs</a></li>
                                    <li className="breadcrumb-item"><a href="/dashboard/addProgram">Add Program</a></li>
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
                                    <h1 className="m-0">Program</h1>
                                    <h7>Create UISS Program</h7>
                                </div>
                            </div>
                        </div>
                        <>
                            <Row gutter={[8, 8]}>
                                <Col xs={24} sm={24} lg={24}>
                                    <Card title="Add Program" bordered={true}>
                                        <Form form={form} onFinish={onFinish} style={{ "width": "100%" }}>
                                            <Row gutter={[8, 8]}>
                                                <Col lg={12}>
                                                    <Form.Item
                                                        name="name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Program Name can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="Program Name" required />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="category"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Program category can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<EditOutlined className="site-form-item-icon" style={{ "color": "#878101" }} />} placeholder="Program Category" required />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="description"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Program Description can not be empty!',
                                                            },
                                                        ]}
                                                    >
                                                        <TextArea
                                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                                            placeholder="Program Description"
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
                                                                    onClick={() => navigate("/dashboard/programs")}

                                                                >
                                                                    CANCEL
                                                                </Button>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
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

export default AddProgram;