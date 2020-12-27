import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguages } from "../../redux/reducers/languageSlice";

function LanguagePage(props) {
    const router = useRouter();
    const { lang } = router.query;

    const languages = useSelector(selectLanguages);

    const item = languages.find((e) => e.name.toLowerCase() == lang);

    // const lang = props.languages[id];

    return (
            <div>
                <h1>{item.paradigms}</h1>
            </div>
    );
}

export default LanguagePage;
