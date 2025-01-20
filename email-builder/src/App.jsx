import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";
import Preview from "./Preview";

const App = () => {
  const [emailLayout, setEmailLayout] = useState("");
  const [emailData, setEmailData] = useState({
    title: "",
    content: "",
    footer: "",
    imageUrls: []
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/layout/getEmailLayout")
      .then((response) => {
        setEmailLayout(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFieldChange = (field, value) => {
    setEmailData({ ...emailData, [field]: value });
  };



  return (
    <div className="App">
      <label className="text-3xl font-bold text-center mb-5">Email Builder</label>
      <Editor emailLayout={emailLayout} onFieldChange={handleFieldChange} />
    </div>
  );
};

export default App;
