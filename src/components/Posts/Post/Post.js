import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  let userId = null;

  if (typeof user?.result === 'string') {
    userId = decode(user?.token).sub;
  } else {
    userId = user?.result._id;
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(userId === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(userId === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card >
  );
}

export default Post;
