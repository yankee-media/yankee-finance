import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom';

const CategoryPage = props => {
  useEffect(() => {
    const category = props.match.params.category;
    console.log(category);
  }, [props.match.params.category]);
  return (
    <div>category</div>
  )
}

export default withRouter(CategoryPage);