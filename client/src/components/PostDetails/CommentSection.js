
/*logic for commentSection  */
import React, { useState, useRef } from 'react'; 
import { Typography, TextField, Button } from '@material-ui/core/'; 
import { useDispatch } from 'react-redux'; 

import { commentPost } from '../../actions/posts'; /* import from Actions Posts.js*/
import useStyles from './styles';


const CommentSection = ({ post }) => {
    //console.log(post)
  const user = JSON.parse(localStorage.getItem('profile'));
 
  const [comment, setComment] = useState(''); 
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments); /* HERE WE GET REDUX DATA FROM BACKEND*/
  
  const classes = useStyles(); 
  const commentsRef = useRef(); /* for scrolldown automatic*/
  
  //console.log(user);
  const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`;
      const  newComments = await dispatch(commentPost(finalComment, post._id)); /* here dispatch action*/
      
       setComments(newComments); 
       setComment('');

      commentsRef.current.scrollIntoView({ behavior: 'smooth' });  /*scroll down comments*/
  }; 

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography> 
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c?.split(': ')[0]}</strong> 
              {c.split(':')[1]} 
                
            </Typography>
          ))} 
          <div ref={commentsRef} /> 
        </div> 
        
        {user?.result?.name && (  
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} /> 
            <br /> 
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} variant="contained" color="primary" onClick={handleClick}>
              Comment
            </Button> 
          </div>
        )} 
      </div>
    </div>
  );
};

export default CommentSection;

/*Here my frontend part of the comment section is finished, and now I need to connect to Redux and send data to backend. Now I have to finally create a commentSection backend database and connection each others mean frontend-backend connections.*/
