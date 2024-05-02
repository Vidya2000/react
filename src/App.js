import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Switch, Dropdown, Menu } from 'antd';
import { HeartOutlined, NotificationOutlined, CommentOutlined, AppstoreOutlined, UserOutlined, QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import darkBackground from './Dark.jpg';
import lightBackground from './rainbow.jpg';
import styled from 'styled-components';

const { Search } = Input;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 52%;
  left: 44%;
  transform: translateX(-50%);
  padding: 1.5px;
  width: 50%;
  z-index: 999;
  transition: display 0.3s;
  margin-top: 10px;

`;

const SearchResultItem = styled.div`
  p {
    line-height: 1; 
  }
`;

const NoResultsMessage = styled.div`
  top: 52%;
  left: 44%;
  font-size: 1.2rem;
  color: #666;
  margin-top: 20px;
`;

const SearchResults = ({ results, hasSearched }) => {
  return (
    <SearchResultsContainer>
      {hasSearched && results.length === 0 ? (
        <NoResultsMessage>No results found</NoResultsMessage>
      ) : results.length > 0 ? (
        results.map((result, index) => (
          <SearchResultItem key={index}>
            <p>{result.result}</p>
          </SearchResultItem>
        ))
      ) : null}
    </SearchResultsContainer>
  );
};

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    console.log('Search Results:', searchResults);
  }, [searchResults]);

  const handleSearch = async () => {
    try {
      setHasSearched(false); // Set hasSearched to false before performing the search(to avoid displaying no results found)
      const response = await axios.get(`http://127.0.0.1:5000/perform_search?search_input=${searchValue}`);
      const data = response.data;
      setSearchResults(data);
      setHasSearched(true); // Set hasSearched to true after receiving search results(to dispaly results)
      console.log('Fetched Data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleToggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleSave = () => {
    console.log('Saved!');
  };

  const handleReset = async () => {
    try {
      // Clears input fields
      setSearchValue('');
      // Reset state variables
      setShowButtons(false);
      setDarkMode(false);
      setSearchResults([]);
      setHasSearched(false);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error resetting website:', error);
    }
  };

  const handleRemove = () => {
    console.log('Remove!');
  };

  const handleModeChange = (checked) => {
    setDarkMode(checked);
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '20px',
        backgroundImage: darkMode ? `url(${darkBackground})` : `url(${lightBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: darkMode ? '#fff' : '#333',
      }}
    >
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: '999', backgroundColor: 'blue', padding: '5px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', color: 'white' }}>Dark Mode</span>
          <Switch checked={darkMode} onChange={handleModeChange} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '999', display: 'flex', alignItems: 'center' }}>
        <img src={require('./logo.png')} alt="SearchTool Logo" style={{ width: '50px', marginRight: '5px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '5px' }}>SearchTool</span>
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <Button type="primary" style={{ marginRight: '10px' }}>
            <DownOutlined />
          </Button>
        </Dropdown>
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
          style={{ marginLeft: '250px', flex: '1', maxWidth: '1200px' }}
        />
        <Button type="primary" onClick={handleToggleButtons} style={{ marginLeft: '5px', marginTop: '1px' }}>
          {showButtons ? '-' : '+'}
        </Button>
        {showButtons && (
          <div style={{ marginLeft: '10px', marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
            <Button type="default" onClick={handleSave}>
              Save
            </Button>
            <Button type="default" onClick={handleReset}>
              Reset
            </Button>
            <Button type="default" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        )}
      </div>
      <SearchResults results={searchResults} hasSearched={hasSearched} />
    </div>
  );
}

export default App;