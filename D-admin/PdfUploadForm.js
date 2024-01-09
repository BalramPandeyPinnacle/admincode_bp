//PDFUpload form

import React, { useState } from 'react';

const PdfUploadForm = ({ onUploadPdf }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (pdfFile) {
      try {
        const formData = new FormData();
        formData.append('pdf', pdfFile); // Use 'pdf' as the key

        const response = await fetch('http://localhost:3001/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('PDF uploaded successfully!');
          // You can handle additional logic after a successful upload, if needed
          onUploadPdf();
        } else {
          console.error('Failed to upload PDF');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
      }
    
      // Clear the form after upload
      setPdfFile(null);
    } else {
      console.error('Please select a PDF file.');
    }
  };

  return (
    <div>
      <h4>Upload PDF</h4>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};

export default PdfUploadForm;
