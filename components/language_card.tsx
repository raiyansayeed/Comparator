function LanguageCard(props) {
    let l = props.jsonData;
    return (
        <div>
            <h1>{l.name}</h1>
            <p>{l.paradigms}</p>
            <p>{l.types}</p>
            <p>{l.authors}</p>
            <p>{l.website}</p>
        </div>
    )
}

export default LanguageCard;