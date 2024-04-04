import React, { useState } from 'react';
import { Input, Button } from 'antd';

const { Search } = Input;

function App({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [showButtons, setShowButtons] = useState(false);

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

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      backgroundColor: 'Linen', // Set light color as background
      minHeight: '100vh', // Ensure the background covers the entire viewport height
      padding: '20px' // Add padding for better layout
    }}>
      <Search
        placeholder="Enter your search query"
        allowClear
        enterButton="Search"
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ marginRight: '10px' }}
      />
      <Button
        type="primary"
        onClick={handleToggleButtons}
        style={{ marginLeft: '5px' }}
      >
        {showButtons ? '-' : '+'}
      </Button>
      {showButtons && (
        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <Button type="default" onClick={handleSave}>Save</Button>
          <Button type="default" onClick={handleReset}>Reset</Button>
          <Button type="default" onClick={handleRemove}>Remove</Button>
        </div>
      )}
    </div>
  );
}

export default App;
