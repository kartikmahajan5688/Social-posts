import React from "react";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Tooltip } from "@mui/material";
import "./index.css";

import { useState, useEffect } from "react";

export default function Posts() {
  const url = "https://dummyjson.com/posts";
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("---posts---", posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <header>My Posts</header>
      <section className="cardList">
        {posts.map((post) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.25)",
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: "20px",
              margin: "1rem 0",
              transition: "transform 1s",
              "&:hover": {
                opacity: 1,
                background: "rgba(0,0,0,1)",
                color: "rgba(255,255,255,1)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Tooltip title="Title">
              <CardHeader
                title={post.title}
                color="text.primary"
                sx={{ fontWeight: 800 }}
              />
            </Tooltip>

            <Divider
              variant="middle"
              sx={{
                borderColor: "rgba(194, 194, 192, 0.7)",
              }}
            />

            <CardContent>
              <Typography variant="body2" sx={{fontSize:"0.9rem"}}>{post.body}</Typography>
            </CardContent>

            <Tooltip title="Tags">
              <ul className="tagsList">
                <li>{post.tags[0]}</li>
                <li>{post.tags[1]}</li>
                <li>{post.tags[2]}</li>
              </ul>
            </Tooltip>

            <Tooltip title="Like">
              <CardActions>
                <IconButton
                  aria-label="add to favorites"
                  sx={{
                    color: "rgb(212, 95, 95);",
                    "&:hover": {
                      background: "rgba(0,0,0,1)",
                      color: "red",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <FavoriteIcon /> {post.reactions}
                </IconButton>
              </CardActions>
            </Tooltip>
          </Card>
        ))}
      </section>
    </main>
  );
}
