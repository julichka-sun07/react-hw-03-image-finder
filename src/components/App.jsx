import { React, Component } from 'react';
import { fetchImage } from 'services/gallery-appi';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Container } from './Searchbar/Searchbar.styled';
import GlobalStyle from 'globalStyles';

export class App extends Component {
  state = {
    pictures: [],
    status: 'idle',
    showModal: false,
    showError: '',
    largeImageUrl: '',
    page: 1,
    query: '',
    totalImage: 0,
  };

  getLargeImgUrl = imgUrl => {
    this.setState({ largeImageUrl: imgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  searchResult = value => {
    this.setState({ query: value, page: 1, pictures: [], totalImage: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'loading' });

      fetchImage(query, page)
        .then(event => {
          if (!event.totalHits) {
            this.setState({
              status: 'rejected',
              showError: 'Sorry, no pictures were found for your request!',
            });
            return;
          }
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...event.hits],
            status: 'resolved',
            totalImage: event.totalHits,
          }));
        })
        .catch(error => {
          this.setState({
            status: 'rejected',
            showError: 'Something went wrong',
          });
        });
    }
  }

  render() {
    const {
      pictures,
      status,
      showModal,
      largeImageUrl,
      totalImage,
      showError,
    } = this.state;

    const showButton = status === 'resolved' && totalImage !== pictures.length;

    return (
      <Container>
        <Searchbar onSubmit={this.searchResult} />
        {showModal && (
          <Modal imgUrl={largeImageUrl} onClose={this.toggleModal} />
        )}
        <ImageGallery pictures={pictures} onClick={this.getLargeImgUrl} />
        {status === 'loading' && <Loader />}
        {status === 'rejected' && <p className="errortext">{showError}</p>}
        {showButton && <Button onClick={this.handleLoadMore} />}
        <GlobalStyle />
      </Container>
    );
  }
}
