import React, { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import './editor.css';
import axios from "axios";

const Editor = ({ emailLayout, onFieldChange, onImageUpload }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");
  const [currentElem, setCurrentElem] = useState(null);
  const [setselectedText, setSetselectedText] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const template = useRef();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onImageUpload(acceptedFiles[0]);
    }
  });

  const handleImageUpload = (event) => {
    console.log(event.target.files)
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    axios.post("https://emailbuilder.onrender.com/api/upload/uploadImage", formData)
      .then((response) => {
        setImageUrl("https://emailbuilder.onrender.com" + response.data.filePath);
        currentElem.src = "https://emailbuilder.onrender.com" + response.data.filePath;
      })
      .catch((error) => console.log(error));
    setImageUpload(false);
  };

  const handleElementClick = (event) => {
    event.stopPropagation();
    if (event.target.contentEditable === "true") {
      removeClassToElement("selected")
      setCurrentElem(event.target);
    }
    else if (event.target.id == "imageUpload") {
      removeClassToElement("selected")
      setCurrentElem(event.target)
      setImageUpload(true);
    } else {
      removeClassToElement("selected")
      setCurrentElem(null)
      setImageUpload(false);
    }
  };
  useEffect(() => {
    if (currentElem) {
      currentElem.classList.add("selected")
      setSetselectedText(currentElem.innerText);
      console.log(currentElem.innerText)
      const styles = window.getComputedStyle(currentElem);
    }
  }, [currentElem]);

  const removeClassToElement = (className) => {
    if (currentElem) {
      currentElem.classList.remove(className);
    }
  };

  const handleStyleChange = (style, value) => {
    if (currentElem) {
      const currentStyle = window.getComputedStyle(currentElem)[style];
      if (currentStyle === value) {
        currentElem.style[style] = '';
      }
      else if (currentElem.style.fontWeight != "normal" && style == "fontWeight") {
        currentElem.style.fontWeight = "normal";
      }
      else if (currentElem.style.textDecoration == "underline" || currentElem.style.textDecoration == "line-through" && style == "textDecoration") {
        currentElem.style[style] = "none";
      }
      else {
        currentElem.style[style] = value;
      }
    }
  };

  const onTextChange = (e) => {
    setSetselectedText(e.target.value);
    currentElem.innerText = e.target.value;
  }

  const handleValueChange = (e) => {
    setSetselectedText(e.target.innerText);
  }

  function removeContentEditable(element) {

    element.removeAttribute('contenteditable');


    Array.from(element.children).forEach(child => {
      removeContentEditable(child);
    });
  }

  const handleDownload = () => {
    const clonedDiv = template.current;

    console.log(template)
    removeContentEditable(clonedDiv);
    const newHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Saved Content</title>
        </head>
        <body>
          ${clonedDiv.outerHTML}
        </body>
        </html>
      `;

    const blob = new Blob([newHtml], { type: 'text/html' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved-content.html';
    link.click();
  }

  return (
    <div className="editor-container">
      <div>Editor</div>
      <div class="main-layout">
        <div className="email-layout" >
          <div ref={template} style={{ border: "1px solid black" }} dangerouslySetInnerHTML={{ __html: emailLayout }} onClick={handleElementClick} onInput={handleValueChange} />
        </div>
        <div class="sidebar">
          {imageUpload ? <input type="file" name="image" onChange={handleImageUpload} /> : null}
          <h3>Text</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('fontWeight', 'bold')}>B</button>
            <button onClick={() => handleStyleChange('fontStyle', 'italic')}>I</button>
            <button onClick={() => handleStyleChange('textDecoration', 'underline')}>U</button>
            <button onClick={() => handleStyleChange('textDecoration', 'line-through')}>S</button>
            <button>Link</button>
          </div>
          <textarea className="textbox" value={setselectedText} onChange={onTextChange}></textarea>
          <h3>Alignment</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('textAlign', 'left')}>Left</button>
            <button onClick={() => handleStyleChange('textAlign', 'center')}>Center</button>
            <button onClick={() => handleStyleChange('textAlign', 'right')}>Right</button>
            <button onClick={() => handleStyleChange('textAlign', 'justify')}>Justify</button>
          </div>
          <h3>Font</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('fontFamily', 'Body font')}>Body font</button>
            <button onClick={() => handleStyleChange('fontFamily', 'Segoe UI')}>Heading font</button>
          </div>
          <h3>Text color</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('color', 'black')} style={{ backgroundColor: 'black' }}></button>
            <button onClick={() => handleStyleChange('color', 'gray')} style={{ backgroundColor: 'gray' }}></button>
            <button onClick={() => handleStyleChange('color', 'blue')} style={{ backgroundColor: 'blue' }}></button>
          </div>
          <h3>Font size</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('fontSize', 'xx-small')}>Xxs</button>
            <button onClick={() => handleStyleChange('fontSize', 'x-small')}>Xs</button>
            <button onClick={() => handleStyleChange('fontSize', 'small')}>Sm</button>
            <button onClick={() => handleStyleChange('fontSize', 'medium')}>Md</button>
            <button onClick={() => handleStyleChange('fontSize', 'large')}>Lg</button>
            <button onClick={() => handleStyleChange('fontSize', 'x-large')}>Xl</button>
            <button onClick={() => handleStyleChange('fontSize', 'xx-large')}>Xxl</button>
          </div>
          <h3>Text transform</h3>
          <div className="toolbar">
            <button onClick={() => handleStyleChange('textTransform', 'none')}>Normal</button>
            <button onClick={() => handleStyleChange('textTransform', 'lowercase')}>aa</button>
            <button onClick={() => handleStyleChange('textTransform', 'uppercase')}>AA</button>
          </div>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
