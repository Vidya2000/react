import React, { useState } from 'react';
import { Input, Button, Switch, Dropdown, Menu } from 'antd';
import { HeartOutlined, NotificationOutlined, CommentOutlined, AppstoreOutlined, UserOutlined, QuestionCircleOutlined, DownOutlined } from '@ant-design/icons'; // Importing icons from Ant Design
import darkBackground from './Dark.jpg'; 
import lightBackground from './rainbow.jpg';

const { Search } = Input;

function App({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = () => {
    // Perform search action here
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleToggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleSave = () => {
    // Logic for saving
    console.log('Saved!');
  };

  const handleReset = () => {
    // Logic for resetting
    console.log('Reset!');
  };

  const handleRemove = () => {
    // Logic for removing
    console.log('Remove!');
  };

  const handleModeChange = checked => {
    setDarkMode(checked);
    // You can add logic here to switch between dark mode and light mode
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<AppstoreOutlined />}>
        Prod
      </Menu.Item>
      <Menu.Item key="2" icon={<NotificationOutlined />}>
        Notifications
      </Menu.Item>
      <Menu.Item key="3" icon={<HeartOutlined />}>
        Like
      </Menu.Item>
      <Menu.Item key="4" icon={<CommentOutlined />}>
        Feedback
      </Menu.Item>
      <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
        Help
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '20px',
      backgroundImage: darkMode ? `url(${darkBackground})`: `url(${lightBackground})`, // Conditional background image based on dark mode
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: darkMode ? '#fff' : '#333' // Conditional text color based on dark mode
    }}>
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: '999', backgroundColor: 'blue', padding: '5px', borderRadius: '5px' }}>
        {/* Dark Mode Switch */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', color: 'white' }}>Dark Mode</span>
          <Switch checked={darkMode} onChange={handleModeChange} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '999', display: 'flex', alignItems: 'center' }}>
        {/* Logo and App Name */}
        <img src={require('./logo.png')} alt="SearchTool Logo" style={{ width: '50px', marginRight: '5px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '5px' }}>SearchTool</span>
        {/* Dropdown for Sidebar */}
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <Button type="primary" style={{ marginRight: '10px' }}>
            <DownOutlined />
          </Button>
        </Dropdown>
        {/* Login Button */}
        <Button type="primary" icon={<UserOutlined />} style={{ marginLeft: '1170px' }}>
          Login
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
        <Search
          placeholder="Search"
          allowClear
          enterButton="Search"
          value={searchValue}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ marginLeft: '250px', flex: '1', maxWidth: '1200px'}}
        />
        <Button
          type="primary"
          onClick={handleToggleButtons}
          style={{ marginLeft: '5px', marginTop: '1px' }}
        >
          {showButtons ? '-' : '+'}
        </Button>
        {showButtons && (
          <div style={{ marginLeft: '10px', marginTop: '50px',display: 'flex', flexDirection: 'column' }}>
            <Button type="default" onClick={handleSave}>Save</Button>
            <Button type="default" onClick={handleReset}>Reset</Button>
            <Button type="default" onClick={handleRemove}>Remove</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
