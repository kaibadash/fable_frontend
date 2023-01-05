import { Cancel } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";
import { createPosts } from "../../../urls";

export default function PostForm({ handleGetPosts }) {
  const [images, setImages] = useState([]);
  const inputId = Math.random().toString(32).substring(2);

  const uploadImage = (e) => {
    setImages([...images, e.target.files]);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[image]", images ? images : "");
    return formData;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const data = createFormData();

    // await createPosts(data).then(() => {
    //   setImages("undefined");
    //   handleGetPosts();
    // });
  };

  const handleOnRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <form noValidate onSubmit={handleCreatePost}>
        <div>
          <label htmlFor={inputId}>
            <IconButton color="success" variant="outlined" component="span">
              アップロード
              <input
                accept="image/*"
                id={inputId}
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
            </IconButton>
          </label>
        </div>
        <div>
          <Button type="submit" color="success" variant="contained">
            Post
          </Button>
        </div>
      </form>

      {/* preview */}
      {images.map((image, i) => (
        <div key={i} style={{ position: "relative", width: "40%" }}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              borderColor: "grey.400",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="delete image"
              style={{ position: "absolute", top: 10, left: 10, color: "#aaa" }}
              onClick={() => handleOnRemoveImage(i)}
            >
              <Cancel />
            </IconButton>
            <img src={image} alt="preview img" />
          </Box>
        </div>
      ))}
    </>
  );
}
