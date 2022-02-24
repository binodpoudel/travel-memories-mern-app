import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);//Before we had arrya [] of posts, now we have an object where we have property inside there { posts: []} because we changed here, we have an isLodding proproty number of page so on.....

  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts'; // This means if we don't have any posts and we are not currently loading, that means we can't load them.

  return (
    
    //( in the below code if isLoading that case show our CircularProgress )
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
