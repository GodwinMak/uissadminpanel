import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, LockFilled } from '@ant-design/icons';
import axios from 'axios';
import '../../assets/css/styles.css';

const RegisterComponent = () => {

    const navigate = useNavigate();
    

    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...values, [input.name]: input.value });
    }

    // console.log(values.name);

    const onFinish =(vals) => {
        const url = 'https://admin.uiss.patrickmamsery.works/api/register'
        try {
         axios.post(url, vals).then(response => {
                localStorage.setItem('token', response.data.token);
                navigate("/dashboard");
            })
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
        <LockFilled className="login-lock-icon" />
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        // eslint-disable-next-line no-restricted-globals
        onFinish={onFinish}
        >
        <Form.Item
            name="name"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                type='text'
                placeholder="Username" 
                style={{"borderColor":"#F5F583"}}
                value={values.name}
                onChange={handleChange}
            />
        </Form.Item>
        <Form.Item
            name="email"
            rules={[
            {
                required: true,
                message: 'Please input email!',
            },
            ]}
        >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                type='email'
                placeholder="Your email" 
                style={{"borderColor":"#F5F583"}}
                value={values.email}
                onChange={handleChange}
            />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{"borderColor":"#F5F583"}}
                value={values.password}
                onChange={handleChange}
            />
        </Form.Item>
        <Form.Item
            name="password_confirmation"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{"borderColor":"#F5F583"}}
                value={values.password_confirmation}
                onChange={handleChange}
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
        </Form.Item>

        <Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                style={{"backgroundColor":"#F7AB00", "borderColor":"#946802"}}
            >
            Register 
            </Button>
            Or <Link to="/">Login now!</Link>
        </Form.Item>
        </Form>
    </>
  );
};


export default RegisterComponent;