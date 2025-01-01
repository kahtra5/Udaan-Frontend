import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, Alert } from "antd";

const { Option } = Select;

const AddPOC = () => {
  const [restaurants, setRestaurants] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [form] = Form.useForm(); 
  const API_URL = import.meta.env.VITE_API_KEY || 'http://localhost:3000';
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/getleads`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          setRestaurants(data); 
        } else {
          setAlertType('error');
          setAlertMessage('Failed to fetch restaurants');
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setAlertType('error');
        setAlertMessage('An error occurred while fetching restaurants.');
        setShowAlert(true);
      } finally {
        setLoading(false); 
      }
    };

    fetchRestaurants();
  }, []);

  const handlesubmit = async (values) => {
    try {
      const response = await fetch(`${API_URL}/addpoc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setAlertType('error');
        setAlertMessage(data.message || 'Failed to add POC.');
      } else {
        setAlertType('success');
        setAlertMessage('POC added successfully!');
        form.resetFields(); 

      }
    } catch (error) {
      console.error('Error adding POC:', error);
      setAlertType('error');
      setAlertMessage('An error occurred. Please try again later.');
    } finally {
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
          title="Add Point of Contact"
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            form={form}
            name="AddPOC"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={handlesubmit}
          >
            <Form.Item
              label="Restaurant"
              name="restaurantId"
              rules={[{ required: true, message: "Please select a restaurant!" }]}
            >
              <Select
                placeholder="Select a restaurant"
                loading={loading}
                allowClear
              >
                {restaurants.map((restaurant) => (
                  <Option key={restaurant._id} value={restaurant._id}>
                    {restaurant.restaurantName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
                { pattern: /^\d{10}$/, message: "Please enter a valid 10-digit phone number!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email address!" },
                { type: "email", message: "Please enter a valid email!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Add POC
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddPOC;
