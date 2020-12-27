import LanguageCard from "../../components/LanguageCard";
import { useRouter } from "next/router";

function LanguagePage(props) {

    const router = useRouter();
    const { lang } = router.query;

    // const lang = props.languages[id];

    return (
        <h1>{lang}</h1>
    )
}

export default LanguagePage;