function LanguageCard(props) {
    let l = props.jsonData;
    return (
        <div>
            <h1>{l.name}</h1>
            <p>{l.website}</p>
        </div>
    )
}

export default LanguageCard;