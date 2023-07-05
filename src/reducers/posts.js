export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return posts; // posts is an array of posts. This is the state posts.
    case 'CREATE':
      return posts;
    default:
      return posts;
  }
}
