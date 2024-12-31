import React, { useState, useEffect } from 'react';
import { Card, Select, Table, Spin } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const TrackOrder = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [interactionData, setInteractionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plotData, setPlotData] = useState(null);

  // Fetch restaurants with orders > 0
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/getleads`, { credentials: 'include' });
        const data = await response.json();
        const uniqueRestaurants = data
          .filter(lead => lead.order && lead.order > 0)
          .map(lead => ({
            id: lead._id,
            name: lead.restaurantName,
          }));
        setRestaurants(uniqueRestaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch interaction data for a selected restaurant
  const handleRestaurantChange = async (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    if (restaurantId) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/getinteractions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId }),
          credentials: 'include',
        });
        let data = await response.json();
        data = data.map((item)=>{
          item.interactionDate = new Date(item.interactionDate).toISOString().split('T')[0];
          return item;
        })
        
        setInteractionData(data);

        // Prepare data for plotting
        const dates = data.map(entry => new Date(entry.interactionDate).toISOString().split('T')[0]);
        const orders = data.map(entry => entry.order);
        setPlotData({
          labels: dates,
          datasets: [
            {
              label: 'Orders Over Time',
              data: orders,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch interaction data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setInteractionData([]);
      setPlotData(null);
    }
  };

  return (
    <div>
      <Card style={{ margin: '20px' }}>
        <h2>Track Orders</h2>
        <Spin spinning={loading}>
          <Select
            placeholder="Select a restaurant"
            style={{ width: 300, marginBottom: '20px' }}
            onChange={handleRestaurantChange}
            allowClear
          >
            {restaurants.map(restaurant => (
              <Select.Option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </Select.Option>
            ))}
          </Select>

          {/* Render the interaction table if data is available */}
          {interactionData.length > 0 && (
            <Table
              dataSource={interactionData}
              columns={[
                { title: 'Date', dataIndex: 'interactionDate', key: 'date' },
                { title: 'Order Number', dataIndex: 'order', key: 'order' },
              ]}
              rowKey="_id"
              pagination={false}
              style={{ marginBottom: '20px' }}
            />
          )}

          {/* Render the chart if plot data is available */}
          {plotData && (
            <div>
              <h3>Date vs. Order Plot</h3>
              <Line data={plotData} />
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default TrackOrder;
