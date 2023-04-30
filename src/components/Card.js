function Card(props) {
  function handleClick() {
    props.onCardClick( props.data );
  } 

  return (
    <div className="photo-grid__card">
      <button className="photo-grid__trash"></button>
      <img
        className="photo-grid__image"
        src={ props.data.link }
        alt={ props.data.name }
        onClick={ handleClick }
      />
      <div className="photo-grid__card-caption">
        <h2 className="photo-grid__card-title">{ props.data.name }</h2>
        <div className="photo-grid__likes">
          <button type="button" className="photo-grid__heart"></button>
          <p className="photo-grid__hearts-quantity">{ props.data.likes.length }</p>
        </div>
      </div>
    </div>
  )
}

export default Card;