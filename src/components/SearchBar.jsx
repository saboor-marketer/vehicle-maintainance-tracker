import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <InputGroup className="search-bar">
      <InputGroup.Text>🔍</InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
