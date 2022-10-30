import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListStart } from "../redux/list.action";

import "./List.styles.scss";

const List = () => {
    const { listContent, counts } = useSelector((state) => state.list);
    const dispatch = useDispatch();
    let btnRef = useRef();
    const handleClick = () => {
        dispatch(fetchListStart());
        //to prevent user fetch data again
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
    };
    return (
        <div className="List-Container">
            <div className="list-button-container">
                <button className="list-button" ref={btnRef} onClick={handleClick}>
                    Get A Random Fact
                </button>
                <div className="number-container">Counts: {counts}</div>
                <button className="list-button" onClick={() => dispatch(fetchListStart())}>
                    Refresh
                </button>
            </div>
            {listContent ? (
                <h1 className="list-content" data-testId="content">
                    {listContent.fact}
                </h1>
            ) : null}
        </div>
    );
};

export default List;
