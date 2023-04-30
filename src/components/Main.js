import * as React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [ userName, setUserName ] = React.useState(null);
  const [ userDescription, setUserDescription ] = React.useState(null);
  const [ userAvatar, setUserAvatar ] = React.useState(null);
  const [cards, setCard] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
    .then(userInfo => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })

    api.getInitialCards()
    .then(cardsInfo => {
      setCard(cardsInfo);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-link" onClick={ props.onEditAvatar }><img
          src={ userAvatar }
          alt="Изображение человека"
          className="profile__image"
        /></div>
        <div className="profile__info">
          <h1 className="profile__text profile__text_type_name">{ userName }</h1>
          <button type="button" className="profile__edit-button" onClick={ props.onEditProfile }></button>
          <p className="profile__text profile__text_type_activity">{ userDescription }</p>
        </div>
          <button type="button" className="profile__add-button" onClick={ props.onAddPlace }></button>
        </section>
      <section className="photo-grid">{
        cards.map(card => <Card data={ card } key={ card._id } onCardClick={ props.onCardClick }/>)
      }</section>
    </main>
  );
};

export default Main;