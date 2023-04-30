function PopupWithForm(props) {
  return (
    <div id={`${props.name}-popup`} className={`popup ${props.isOpen && "popup_opened"}`}>
      <button id="popup__cross" type="button" className="popup__cross" onClick={ props.onClose }></button>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form id={`${props.name}-popup-form`} name={`${props.name}-popup__form`} className="popup__form" noValidate>
          {props.children}
          <button id={`${props.name}-popup__button`} type="submit" className="popup__button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;