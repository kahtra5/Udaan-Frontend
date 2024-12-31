import { Form, Input, Button, Card, Alert } from "antd";
import { useNavigate } from "react-router";
import { useState } from "react"; 
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';



function Signup() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const onFinish = async (values) => {
    try {
      console.log(values);
      let res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include"
      });
      const data = await res.json();
      if(res.ok){
        setAlertMessage('User registered successfully');
        setShowAlert(true);
        setAlertType('success');
        setTimeout(() => navigate('/login'), 2000);

      }else{
        setAlertMessage(data.message);
        setShowAlert(true);
        setAlertType('error');  
      }

    } catch (error) {
      console.log(error);
      // show notification with the error message
    }
    finally {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {showAlert && (
              <Alert
                message={alertMessage}
                type={alertType}
                closable
                style={{ marginBottom: '20px', textAlign: 'center' }}
              />
            )}
    <div


      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        title="KAM Lead Manager | Sign Up"
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { pattern: /^\d{10}$/, message: "Please enter a valid 10-digit phone number!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </div>
  );
}

export default Signup;
