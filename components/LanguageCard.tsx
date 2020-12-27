import Link from "next/link";

function LanguageCard(props) {
    let l = props.jsonData;

    function handleClick(e) {
        e.preventDefault();
    }

    var slug = "/lang/" + l.name;

    return (
        <div onClick={handleClick}>
            <h1>{l.name}</h1>
            <p>{l.paradigms}</p>
            <p>{l.types}</p>
            <p>{l.authors}</p>
            <p>{l.website}</p>
            <button>
                <Link href={slug}>More info!</Link>
            </button>
        </div>
    );
}

export default LanguageCard;
