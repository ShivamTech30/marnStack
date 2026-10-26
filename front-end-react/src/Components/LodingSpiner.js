import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Popup from "reactjs-popup";

const LodingSpiner = ({ loadspiner }) => {
    return (
        <Popup open={Boolean(loadspiner)} modal className="sign_up_loader">
            <div className="d-flex justify-content-center align-items-center p-4 bg-white rounded-4 shadow-lg mx-auto" style={{ width: "fit-content" }}>
                <RotatingLines
                    strokeColor="#4f46e5"
                    strokeWidth="4"
                    animationDuration="0.75"
                    width="56"
                    visible={true}
                />
            </div>
        </Popup>
    );
};

export default LodingSpiner;