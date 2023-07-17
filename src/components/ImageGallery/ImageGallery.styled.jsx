import styled from 'styled-components';

export const ImageGalleryWrapper = styled.ul`
  display: grid;
  max-width: calc(100vw - 80px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
