import Wrapper from "../../components/Wrapper/Wrapper";
import Create from "../../components/Form/Create/Create";
import Join from "../../components/Form/Join/Join";
import "./Home.scss"

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