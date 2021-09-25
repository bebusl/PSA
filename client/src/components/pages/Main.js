import SearchBox from "../shared/SearchBox";
import { useInput } from "../../hooks";
import { useState, useCallback, useEffect } from "react";
import Loading from "../shared/Loading";
import "./Main.css";
import { connect } from "react-redux";
import { setSearchItem } from "../../redux/action";

const mapDispatchToProps = (dispatch) => ({
    setSearchItem: (searchItem) => dispatch(setSearchItem(searchItem)),
});

function Home({ history, socket, setSearchItem }) {
    const { values, onChange } = useInput({ searchItem: "" });
    const [isLoading, setLoading] = useState(false);

    const setSocket = useCallback(() => {
        socket.on("keywords", (keyword) => {
            setLoading(false);
            window.localStorage.setItem("keywords", JSON.stringify(keyword));
            history.push({
                pathname: "/likekeyword",
                socket: socket,
            });
        });
    }, [socket]);

    useEffect(() => {
        setSocket();
        return function cleanup() {
            socket.off("keywords");
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault(); //새로고침 안함.
        setLoading(true);
        setSearchItem(values.searchItem);
        socket.emit("send message", { searchItem: values.searchItem });
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="contents-wrapper">
                <SearchBox searchItem={values.searchItem} onSubmit={onSubmit} onChange={onChange}></SearchBox>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(Home);
