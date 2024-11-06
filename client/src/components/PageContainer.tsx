import React from "react";
import { useState } from "react";
import LoginPage from "../pages/LoginPage";

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState('LoginPage');

    const renderPage = () => {
        if (currentPage === 'LoginPage') {
            return <LoginPage />
        }
    }
    return(
<>
</>
    );
}