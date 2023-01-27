import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import { deletePosts } from "../../urls";

export const PostItem = ({ post, handleGetPosts }) => {
  const handleDeletePost = async (id) => {
    await deletePosts(id).then(() => {
      handleGetPosts();
    });
  };

  const CustomBox = styled(Box)({
    "&:hover": { opacity: 0.7 },
  });

  return (
    <>
      <Card>
        {post.image?.url ? (
          <CustomBox sx={{ position: "relative" }}>
            <CardMedia component="img" src={post.image.url} alt="post img" />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                color: "white",
                padding: "10px",
              }}
            >
              <Typography variant="body2">昆虫名</Typography>
              <Typography variant="body2">公園名</Typography>
            </Box>
          </CustomBox>
        ) : null}
      </Card>
    </>
  );
};
