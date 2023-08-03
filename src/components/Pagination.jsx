import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles';
import { Link } from 'react-router-dom';

const Paginate = ({ page, pages, handlePageChange }) => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
