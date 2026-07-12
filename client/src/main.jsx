import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/global.css";

import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <ThemeProvider>

        <React.StrictMode>

            <AuthProvider>

                <BrowserRouter>

                    <Toaster position="top-right" />

                    <App />

                </BrowserRouter>

            </AuthProvider>

        </React.StrictMode>
        
    </ThemeProvider>
);