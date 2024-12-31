import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, PlusOutlined, PhoneFilled, ContactsFilled, BellFilled, StarFilled, CaretDownFilled} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';



const items = [

  {
    label: 'Get All Leads',
    key: 'getall',
    icon: <CaretDownFilled />,
  },
  {
    label: 'Add Lead',
    key: 'addlead',
    icon: <PlusOutlined />,
  },
  {
    label: 'Add POC',
    key: 'addpoc',
    icon: <ContactsFilled />,
  },
  {
    label: 'Add Interaction',
    key: 'addinteraction',
    icon: <PhoneFilled />,
  },
  {
    label: 'Pending Calls',
    key: 'pending',
    icon: < BellFilled/>,
  },
  {
    label: 'Top Performers',
    key: 'topperformers',
    icon: <StarFilled />,
  },
  {
    label: 'Track Orders',
    key: 'trackorders',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Logout',
    key: 'login',
    icon: <SettingOutlined />,
  }


  
 
];
const Navbar = () => {
  const navigate=useNavigate();
  const [current, setCurrent] = useState(localStorage.getItem('navstatus') || 'getall');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    localStorage.setItem('navstatus', e.key);
    if(e.key==='login'){
      localStorage.setItem('status', 'loggedout');
      localStorage.removeItem('navstatus');
    }
    navigate('/'+e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Navbar;