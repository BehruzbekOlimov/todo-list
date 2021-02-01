import {useState} from "react";
import {NavLink} from "react-router-dom";

const Header = ({onClick}) => {

    const [text,setText]=useState('')

    return (
        <div className="Header">
            <form className="row" onSubmit={(e)=>{e.preventDefault();onClick('ADD',text);setText('')}}>
                <div className="col-8">
                    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className="form-control"/>
                </div>
                <div className="col-4">
                    <button className="btn btn-primary btn-block">Add</button>
                </div>
                <nav>
                    <ul className="navbar">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">all</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/completed-tasks" className="nav-link">completed</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/incomplete-tasks" className="nav-link">incomplete</NavLink>
                        </li>
                    </ul>
                </nav>
            </form>
        </div>
    );
};

export default Header;