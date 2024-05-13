import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Switch, Dropdown, Menu, Modal } from 'antd';
import { HeartOutlined, NotificationOutlined, CommentOutlined, AppstoreOutlined, UserOutlined, QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import darkBackground from './Dark.jpg';
import lightBackground from './rainbow.jpg';
import styled from 'styled-components';
import { message } from 'antd';

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

const SearchResults = ({ results, hasSearched, handleResultCheckbox }) => {
  return (
    <SearchResultsContainer>
      {hasSearched && results.length === 0 ? (
        <NoResultsMessage>No results found</NoResultsMessage>
      ) : results.length > 0 ? (
        results.map((result, index) => (
          <SearchResultItem key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                onChange={() => handleResultCheckbox(result)}
              />
              <p>{result.result}</p>
            </div>
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
  const [selectedResults, setSelectedResults] = useState([]);
  const [isInsertModalVisible, setIsInsertModalVisible] = useState(false);
  const [insertQuery, setInsertQuery] = useState('');
  const [insertResult, setInsertResult] = useState('');
  const [selectedResultForEdit, setSelectedResultForEdit] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editQuery, setEditQuery] = useState('');
  const [editResult, setEditResult] = useState('');
  const [oldQuery, setOldQuery] = useState('');
  const [resultToUpdate, setResultToUpdate] = useState('');

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

  const showEditModal = () => {
    if (selectedResultForEdit) {
      setOldQuery(selectedResultForEdit.query);
      setEditQuery(selectedResultForEdit.query);
      setResultToUpdate(selectedResultForEdit.result);
      setEditResult(selectedResultForEdit.result);
      setIsEditModalVisible(true);
    } else {
      message.warning('Please select a result to edit');
    }
  };

  const handleEditOk = async () => {
    try {
      const formData = new FormData();
      formData.append('old_query', oldQuery);
      formData.append('new_query', editQuery);
      formData.append('result_to_update', resultToUpdate);
      formData.append('new_result', editResult);
  
      const response = await axios.post('/edit_single_row', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = response.data;
      console.log('Response data:', data);
      if (data.task === 'successful') {
        message.success('Row updated successfully');
        setOldQuery('');
        setEditQuery('');
        setResultToUpdate('');
        setEditResult('');
        setIsEditModalVisible(false);
        window.location.reload();
      } else {
        message.error('Failed to update row');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while updating the row');
    }
  };

  const handleEditCancel = () => {
    setEditQuery('');
    setEditResult('');
    setIsEditModalVisible(false);
  };

  const handleSave = () => {
    showEditModal();
  };

  const handleReset = async () => {
    try {
      setSearchValue('');
      setShowButtons(false);
      setDarkMode(false);
      setSearchResults([]);
      setHasSearched(false);
      window.location.reload();
    } catch (error) {
      console.error('Error resetting website:', error);
    }
  };

  const handleResultCheckbox = (result) => {
    setSelectedResults((prevSelectedResults) => {
      if (prevSelectedResults.includes(result)) {
        return prevSelectedResults.filter((r) => r !== result);
      } else {
        setSelectedResultForEdit(result);
        return [...prevSelectedResults, result];
      }
    });
  };

  const handleRemove = async () => {
    try {
      for (const result of selectedResults) {
        const response = await axios.post('http://127.0.0.1:5000/remove_search', { id: result.id });
        const data = response.data;
        if (data.success) {
          message.success(data.message);
        } else {
          message.error(data.message || 'An error occurred while removing the search');
        }
      }
      handleReset();
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while removing the search');
    }
  };
  

  const handleModeChange = (checked) => {
    setDarkMode(checked);
  };

  const showInsertModal = () => {
    setIsInsertModalVisible(true);
  };

  const handleInsertOk = async () => {
    try {
      const response = await axios.post('/insert_single_row', {
        single_row_insert_question: insertQuery,
        single_row_insert_result: insertResult,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (data.task === 'successful') {
        message.success('Row inserted successfully');
        setInsertQuery('');
        setInsertResult('');
        setIsInsertModalVisible(false);
        // Reload the website
        window.location.reload();
      } else {
        message.error('Failed to insert row');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while inserting the row');
    }
  };

  const handleInsertCancel = () => {
    setInsertQuery('');
    setInsertResult('');
    setIsInsertModalVisible(false);
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
            <Button type="default" onClick={showInsertModal}>
              Insert
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
      <SearchResults
      results={searchResults}
      hasSearched={hasSearched}
      handleResultCheckbox={handleResultCheckbox}
    />

      <Modal
        title="Add Query and Result"
        visible={isInsertModalVisible}
        onOk={handleInsertOk}
        onCancel={handleInsertCancel}
      >
        <Input
          placeholder="Enter query"
          value={insertQuery}
          onChange={(e) => setInsertQuery(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Enter result"
          value={insertResult}
          onChange={(e) => setInsertResult(e.target.value)}
        />
      </Modal>
      <Modal
        title="Edit Query and Result"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <p>Query: {oldQuery}</p>
        <p>Result: {resultToUpdate}</p>
        <Input
          placeholder="Enter new query"
          value={editQuery}
          onChange={(e) => setEditQuery(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Enter new result"
          value={editResult}
          onChange={(e) => setEditResult(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default App;