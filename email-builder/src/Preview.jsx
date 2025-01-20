import React from "react";

const Preview = ({ emailData }) => {
  console.log(emailData)
  const renderTemplate = () => {
    let layout = `
      <html>
        <head><title>${emailData.title}</title></head>
        <body>
            
          <h1>${emailData.title}</h1>
          <div>${emailData.content}</div>
           <div><img src="${emailData.imageUrls[0]}" alt="Image" /></div>
          <footer>${emailData.footer}</footer>
        </body>
      </html>
    `;
    return layout;
  };

  return (
    <div className="preview-container">
      <h2>Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: renderTemplate() }} />
    </div>
  );
};

export default Preview;
