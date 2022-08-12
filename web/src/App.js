import React from "react";
import "./App.css";
import Edit from './components/Edit.js'
import Home from "./components/Home.js";
import Admin from "./components/Admin.js"
import ViewPost from "./components/ViewPost.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports.js'

Amplify.configure(awsExports)

function App() {
  console.log(Auth.currentSession())
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/posts/:postId" element={<ViewPost />} />
            <Route path="/posts/:postId/edit" element={<Edit />} />
            <Route path="/posts/new" element={<Edit isNew={true}/>} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
