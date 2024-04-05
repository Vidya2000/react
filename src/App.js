import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons'; // Importing the MenuOutlined icon from Ant Design

const { Search } = Input;

function App({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
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

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px' 
    }}>
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '999', display: 'flex', alignItems: 'center' }}>
        {/* Logo and App Name */}
        <img src={require('./logo.png')} alt="SearchTool Logo" style={{ width: '50px', marginRight: '10px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '10px' }}>SearchTool</span>
        {/* Arrow to toggle Sidebar */}
        <Button type="primary" onClick={handleToggleSidebar}>
          <MenuOutlined />
        </Button>
      </div>
      {showSidebar && (
        <div style={{ 
          width: '200px', 
          height: '100%', 
          backgroundColor: '#f0f0f0', 
          padding: '20px', 
          boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)', 
          position: 'fixed', 
          left: '0', 
          top: '0' 
        }}>
          <div style={{ marginTop: '40px' }}> {/* Added margin to move buttons down */}
            <Button type="default" style={{ marginBottom: '10px', width: '100%' }}>Prod</Button>
            <Button type="default" style={{ marginBottom: '10px', width: '100%' }}>Notifications</Button>
            <Button type="default" style={{ marginBottom: '10px', width: '100%' }}>Like</Button>
            <Button type="default" style={{ marginBottom: '10px', width: '100%' }}>Feedback</Button>
            <Button type="default" style={{ marginBottom: '10px', width: '100%' }}>Help</Button>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
        <Search
          placeholder="Search"
          allowClear
          enterButton="Search"
          value={searchValue}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ marginLeft: '250px', flex: '1', maxWidth: '800px'}}
        />
        <Button
          type="primary"
          onClick={handleToggleButtons}
          style={{ marginLeft: '5px', marginTop: '10px' }}
        >
          {showButtons ? '-' : '+'}
        </Button>
      </div>
      {showButtons && (
        <div style={{ marginLeft: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
          <Button type="default" onClick={handleSave}>Save</Button>
          <Button type="default" onClick={handleReset}>Reset</Button>
          <Button type="default" onClick={handleRemove}>Remove</Button>
        </div>
      )}
    </div>
  );
}

export default App;
