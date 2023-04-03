import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, LockFilled } from '@ant-design/icons';
import axios from 'axios';
import '../../assets/css/styles.css';

const LoginComponent = () => {

    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        email: "",
        password: "",
    })

    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...values, [input.name]: input.value });
    }


    const onFinish = async(vals) => {
        const url = 'https://admin.uiss.patrickmamsery.works/api/login'
        try {
           await axios.post(url, vals).then(response => {

                // console.log(response.data)

                localStorage.setItem('token', response.data.token);
                localStorage.setItem("uservalues", JSON.stringify(response.data.userData))
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
        onFinish={onFinish}
        >
        <Form.Item
            name="email"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
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
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/" className="login-form-forgot">
            Forgot password
            </Link>
        </Form.Item>

        <Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                style={{"backgroundColor":"#F7AB00", "borderColor":"#946802"}}
            >
            Log in
            </Button>
            Or <Link to="/register">register now!</Link>
        </Form.Item>
        </Form>
    </>
  );
};


export default LoginComponent;