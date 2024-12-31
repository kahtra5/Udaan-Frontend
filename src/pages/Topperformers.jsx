import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar.jsx";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
import { Table } from 'antd';



  
const TopPerformers = () => {
    
    const [topPerformers, setTopPerformers] = useState([]);

    useEffect(() => {
        const fetchpage = async () => {
            try {
                const response = await fetch(`${API_URL}/leads/top`, {credentials: 'include'});
                const data = await response.json();
                setTopPerformers(data);
                console.log(data);

                // console.log(response.json());
            } catch (error) {
                console.log(error);
            }
        };
        fetchpage();
    }, []);


    const columns = [
        {
          title: 'Name',
          dataIndex: 'RestaurantName',
          key: 'name',
        },
        {
          title: 'Orders',
          dataIndex: 'TotalOrderValue',
          key: 'status',
        },
      ];




  
  return <div>
    <Table dataSource={topPerformers} columns={columns} rowKey="RestaurantId" />
  </div>;
};


export default TopPerformers;

