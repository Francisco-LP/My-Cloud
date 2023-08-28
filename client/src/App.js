import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetch('/files')
      .then((res) => res.json())
      .then((data) => setUploadedFiles(data.files));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const headers = new Headers();
    headers.append('enctype', 'multipart/form-data');

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      if (response.ok) {
        console.log('Archivo cargado exitosamente');
        setSelectedFile(null); // Reinicia el estado del archivo seleccionado
        document.getElementById('fileInput').value = null; // Reinicia el input de tipo "file"

        // Llama a la solicitud GET para obtener la lista actualizada de archivos subidos
        fetch('/files')
          .then((res) => res.json())
          .then((data) => setUploadedFiles(data.files));
      }
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={`/cloud.png`} alt="cloud" />
          <span className='nube'>NuBe</span>
        </div>
      </header>
      <div className='container'>
        <h3 className='title'>Subir Archivo</h3>
        <input
          type="file"
          id="fileInput"
          name="file"
          className='custom-file-input'
          onChange={handleFileChange}
        />
        <button className='btnFile' onClick={handleUpload}>Subir</button>
      </div>
      <h3>Archivos Subidos:</h3>
      <div className='file-list-container'>
        <div className='file-list'>
          {uploadedFiles.map((file, index) => (
            <div key={index} className='file-item'>
              <img src={`/filephoto.png`} alt="Icono de archivo" />
              <p>{file}</p> {/* Nombre del archivo */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
