import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguages } from "../../redux/reducers/languageSlice";
import SearchArea from "../../components/SearchArea"
import QueryHits from "../../components/QueryHits"
import styles from "../../styles/Home.module.css";


function LanguagePage(props) {
    const router = useRouter();
    const { lang } = router.query;

    const languages = useSelector(selectLanguages);

    var item = languages.find((e) => e.name.toLowerCase() == lang);

    return (
        <div className={"bg-yellow-500 ".concat(styles.container)}>
            <SearchArea />
            <h1>Page info</h1>
            {typeof item !== "undefined" ? <h1>{item.paradigms}</h1> : <h1>404 Error</h1>}
        </div>
    );
}

export default LanguagePage;
