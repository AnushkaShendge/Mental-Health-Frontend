import React, { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage } from 'react-chat-engine';

const MessageForm = ({ chatId, creds }) => {
  const [value, setValue] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length === 0) {
      return; // Ignore empty messages
    }

    try {
      await sendMessage(creds, chatId, { text });
      setValue(''); // Clear input field after sending message
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, handle error (e.g., display error message to user)
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      await sendMessage(creds, chatId, { files: [file], text: '' });
    } catch (error) {
      console.error('Error uploading file:', error);
      // Optionally, handle error (e.g., display error message to user)
    }

    setUploading(false);
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="upload-button" className="image-button">
        <PictureOutlined className="picture-icon" />
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
      {uploading && <span>Uploading...</span>}
    </form>
  );
};

export default MessageForm;
