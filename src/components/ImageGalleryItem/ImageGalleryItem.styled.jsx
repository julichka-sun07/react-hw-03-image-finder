import styled from 'styled-components';

export const ImageGalleryCard = styled.li`
  border-radius: 2px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const GalleryCardImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    transform: scale(1.08);
    cursor: zoom-in;
  }
`;
