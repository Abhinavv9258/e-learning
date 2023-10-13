import React from "react";
import "./loading.css";
import "./loadingSkeleton.css";
const LoadingComponent = () => {
    return (
        <div className="d-flex"
            direction={"column"}
            boxShadow="xl"
            p={4}
            m={2}
            _hover={{ boxShadow: "2xl", cursor: "pointer" }}
        >
            <span className="loaderSkeleton"></span>

            <div className="box">
                <span className="loader">L &nbsp; ading</span>
            </div>
        </div>
    );
};

export default LoadingComponent;