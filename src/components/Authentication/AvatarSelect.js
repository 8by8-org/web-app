import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { auth } from "./../../firebase";
import "./Signin.scss";

export default class AvatarSelect extends React.Component {
    constructor(props) {
        super(props);
    } 
    render(){
        return (
            <>
                <input type="radio" id={this.props.id} name="avatar" value={this.props.id} ref={this.props.ref} onClick={this.props.onClick}/>
                <label htmlFor={this.props.id}>
                    <div className='avatar'>
                        <img className="avatar-img" src={this.props.src} alt="" />
                    </div>
                </label>
            </>
        )   
    }
}