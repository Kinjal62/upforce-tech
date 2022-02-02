import React, { useState } from "react";
import FanSignUp from "./FanSignUp";
import TalentSignUp from "./TalentSignUp";

const SignUp = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    return (
        <div className="card">
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>FAN SIGNUP</li>
                <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>TALENT SIGNUP</li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FanSignUp /> : <TalentSignUp />}
            </div>
        </div>
    );
};
export default SignUp;