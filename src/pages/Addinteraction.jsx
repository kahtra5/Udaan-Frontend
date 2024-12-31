import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, Alert } from "antd";
import { CloseSquareFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddInteraction = () => {
  const [restaurants, setRestaurants] = useState([]); // State to store restaurant data
  const [POCs, setPOCs] = useState([]); // State to store contacted POC ID data
  const [loadingRestaurants, setLoadingRestaurants] = useState(true); // State to show loading state for restaurants
  const [loadingPOCs, setLoadingPOCs] = useState(false); // State to show loading state for POCs
  const [form] = Form.useForm(); // Create a form instance
  const API_URL = import.meta.env.VITE_API_KEY || 'http://localhost:3000';

  const [showAlert, setShowAlert] = useState(false);

  // Fetch restaurant names from the backend
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
          console.log(data);
          setRestaurants(data); // Assuming 'data' is an array of restaurants
        } else {
          alert("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoadingRestaurants(false); // Set loading to false regardless of success or failure
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once

  // Fetch contacted POC IDs based on selected restaurant
  const fetchContactedPOCId = async (restaurantId) => {
    setLoadingPOCs(true); // Set loading state for POCs
    try {
      const response = await fetch(`${API_URL}/getpocs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setPOCs(data); // Assuming 'data' is an array of POCs
      } else {
        alert("Failed to fetch contacted POCs");
      }
    } catch (error) {
      console.error("Error fetching contacted POCs:", error);
    } finally {
      setLoadingPOCs(false); // Set loading to false regardless of success or failure
    }
  };

  const handlesubmit = async (values) => {
    try {
      const response = await fetch(`${API_URL}/addinteraction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
      } else {
        setShowAlert(true);
        form.resetFields(); // Clear the form fields after successful submission
        setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert
          message="Interaction Added"
          type="success"
          closable
          closeIcon={<CloseSquareFilled />}
          onClose={() => {
            setShowAlert(false);
          }}
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
          title="Add Interaction"
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            form={form} // Bind the form instance to the Form component
            name="addInteraction"
            initialValues={{
              remember: true,
              order: 0 // Setting default value for the order field
            }}
            onFinish={handlesubmit}
            layout="vertical"
          >
            <Form.Item
              label="Restaurant"
              name="restaurantId"
              rules={[{ required: true, message: "Please select a restaurant!" }]}
            >
              <Select
                placeholder="Select a restaurant"
                loading={loadingRestaurants}
                allowClear
                onChange={(value) => fetchContactedPOCId(value)} // Trigger fetchContactedPOCId on restaurant selection
              >
                {restaurants.map((restaurant) => (
                  <Option key={restaurant._id} value={restaurant._id}>
                    {restaurant.restaurantName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Contacted POC ID"
              name="contactedPOCId"
              rules={[{ required: true, message: "Please select the contacted POC ID!" }]}
            >
              <Select
                placeholder="Select a contacted POC"
                loading={loadingPOCs}
                allowClear
              >
                {POCs.map((poc) => (
                  <Option key={poc._id} value={poc._id}>
                    {poc.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Interaction Type"
              name="interactionType"
              rules={[{ required: true, message: "Please select the interaction type!" }]}
            >
              <Select placeholder="Select an interaction type">
                <Option value="call">Call</Option>
                <Option value="visit">Visit</Option>
                <Option value="email">Email</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Please input the interaction details!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Interaction Date"
              name="interactionDate"
              rules={[{ required: true, message: "Please select the interaction date!" }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Orders"
              name="order"
              rules={[{ required: true, message: "Please input the order value!" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddInteraction;
