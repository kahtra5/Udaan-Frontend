import { Form, Input, Button, Card, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_KEY || 'http://localhost:3000';


function Login() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [form] = Form.useForm(); 

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json(); 

      if (res.ok) {
        
        localStorage.setItem("status", "loggedin");
        setAlertMessage("Login successful! Redirecting...");
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => navigate("/getall"), 2000);
      } else {
        
        setAlertMessage(data.message || "Invalid credentials. Please try again.");
        setAlertType("error");
        setShowAlert(true);
        form.resetFields(); 
        setTimeout(() => setShowAlert(false), 3000); 
      }
    } catch (error) {
      
      console.error("Error:", error);
      setAlertMessage("Something went wrong. Please try again later.");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const redirectSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          closable
          onClose={() => setShowAlert(false)}
          style={{ marginBottom: "20px", textAlign: "center" }}
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
          title="Login"
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            form={form} 
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
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
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={redirectSignup}
                style={{ width: "100%" }}
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
