function PopupWithImage(props) {
  return (
    <div id="picture-popup" className={ `popup ${props.card && "popup_opened"}` }>
      <figure className="popup__figure">
        <button className="popup__cross popup__cross_picture" onClick={ props.onClose }></button>
        <img id="picture-popup__image" className="popup__image" src={ props.card }/>
        <figcaption id="picture-popup__caption" className="popup__caption"></figcaption>
      </figure>
    </div>
  )
}

export default PopupWithImage