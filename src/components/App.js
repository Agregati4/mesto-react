import * as React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <div className="page__content">
        <PopupWithForm isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } name="profile" title="Редактировать профиль" buttonText="Сохранить" children={
          <>
            <input
              name="name"
              className="popup__input"
              id="popup__input_type_name"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error name-error"></span>
            <input
              name="activity"
              className="popup__input"
              id="popup__input_type_activity"
              type="text"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error activity-error"></span></>
          } />
        <PopupWithForm isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } title="Новое место" name="card" buttonText="Создать" children={
          <><input
              name="title"
              className="popup__input"
              id="card-popup__input_type_title"
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error title-error"></span>
            <input
              name="picture"
              className="popup__input"
              id="card-popup__input_type_picture"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error picture-error"></span></>
          } />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
        <PopupWithForm isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } title="Обновить аватар" name="profile-image" buttonText="Сохранить" children={
          <><input
              name="link"
              className="popup__input"
              id="profile-image-popup__input_type_title"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error link-error"></span></>
          }/>
        <ImagePopup card={ selectedCard } onClose={ closeAllPopups } />
        <Header />
        <Main onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick } onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick }/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
