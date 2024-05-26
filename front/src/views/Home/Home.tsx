import Wrapper from "../../components/Wrapper/Wrapper";
import Create from "../../components/Form/Create/Create";

import "./Home.scss"
import Join from "../../components/Form/Join/Join";

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src="/assets/logo.svg" alt="" />
                </div>
                <Wrapper />
                <Create />
                <Join />
            </div>
        </>
    );
}