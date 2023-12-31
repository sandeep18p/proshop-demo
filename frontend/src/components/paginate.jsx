import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && ( 
        //if pages is not more more than 1 then we don't want to show the pagination
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            //x+1 one becaise it is index based to usko 1 kar re
            to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
