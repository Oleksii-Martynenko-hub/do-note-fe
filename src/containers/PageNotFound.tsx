import React from 'react';
import styled from 'styled-components';

const PageNotFound: React.FC = () => (
  <PageNotFoundStyled>
    404
  </PageNotFoundStyled>
);

const PageNotFoundStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export default PageNotFound;
