import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

const AddModalContainer = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  outline: none;
  width: 300px;
`;

const AddModal = ({ open, handleAddPost, handleClose }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPost(title, body, userId);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <AddModalContainer>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            margin="normal"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </AddModalContainer>
    </Modal>
  );
};

export default AddModal;
