import React, { useState } from 'react';
import { Card, Form, Input, Button, InputNumber, Alert } from "antd";
const API_URL = "http://localhost:3000";

const AddLeads = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [callFrequency, setCallFrequency] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [form] = Form.useForm();

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/addleads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantName,
          phoneNumber,
          address,
          callFrequency,
          email
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertType('error');
        setAlertMessage(data.message || 'Failed to add lead.');
      } else {
        setAlertType('success');
        setAlertMessage('Lead added successfully!');
        form.resetFields(); // Clear the form fields after successful submission
      }
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error adding lead:', error);
      setAlertType('error');
      setAlertMessage('An error occurred. Please try again later.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
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
          title="Add Leads"
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          styles={{
            header: { textAlign: "center", fontSize: "24px", fontWeight: "bold" },
          }}
        >
          <Form
            form={form}
            name="addLeads"
            initialValues={{ remember: true }}
            layout="vertical"
            onSubmit={handlesubmit}
          >
            <Form.Item
              label="Restaurant Name"
              name="restaurantName"
              rules={[{ required: true, message: "Please input the restaurant name!" }]}
            >
              <Input
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input the phone number!"
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number!"
                }
              ]}
            >
              <Input
                value={phoneNumber}
                addonBefore="+91"
                style={{ width: '100%' }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email address!" },
                { type: "email", message: "Please enter a valid email!" }
              ]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Call Frequency"
              name="callFrequency"
              rules={[{ required: true, message: "Please input the call frequency!" }]}
            >
              <InputNumber
                value={callFrequency}
                min={1}
                max={365}
                onChange={(value) => setCallFrequency(value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handlesubmit}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Add Lead
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddLeads;
