import * as React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState({ link: null });
  const [ currentUser, setCurrentUser ] = React.useState({name: '', about: ''});
  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then(userInfo => {
      setCurrentUser(userInfo);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });

    api.getInitialCards()
    .then(cardsInfo => {
      setCards(cardsInfo);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });
  }, [])

  // Обработка клика по кнопке изменения профиля(Main)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // Обработка клика по кнопке добавления новой карточки(Main)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Обработка клика по аватару пользователя(Main)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  // Обработка клика по картинке на карточке(Main/Card)
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ link: null });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки

    // Удаление карточки
    if(isLiked) {
      api.decreaseLikesQuantity(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
      });
    };

    // Добавление карточки
    api.increaseLikesQuantity(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });
  };

  function handleUpdateUser({name, activity}) {
    api.saveNewUserInfo({name, activity})
    .then(newUserInfo => setCurrentUser(newUserInfo))
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });

    closeAllPopups();
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => {
        return state.filter(c => !(c._id === card._id))
      });
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });
  };

  function handleUpdateAvatar(link) {
    api.updateProfileImage(link)
    .then(newUserInfo => setCurrentUser(newUserInfo))
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });

    closeAllPopups();
  };

  function handleAddPlaceSubmit(data) {
    api.saveNewCardInfo(data)
    .then(newCard => setCards([newCard, ...cards]))
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });

    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onAddPlace={ handleAddPlaceSubmit }/>
          <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar={ handleUpdateAvatar } />
          <ImagePopup card={ selectedCard } onClose={ closeAllPopups } />
          <Header />
          <Main cards={ cards } onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick } onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick } onCardLike={ handleCardLike } onCardDelete={ handleCardDelete } />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
