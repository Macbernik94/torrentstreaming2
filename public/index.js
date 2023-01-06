import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import Player from 'react-player';
import Chromecast from 'react-chromecast';

class App extends React.Component {
state = {
files: [], // Liste des fichiers torrent chargés
currentFile: null, // Fichier torrent en cours de lecture
isCasting: false // Indicateur de lecture en cours sur Chromecast
};

// Fonction appelée lorsqu'un fichier est déposé dans la dropzone
onDrop = (acceptedFiles) => {
// Mettre à jour la liste des fichiers
this.setState({ files: [...this.state.files, ...acceptedFiles] });
};

// Fonction appelée lorsqu'un fichier de la liste est sélectionné
onSelectFile = (file) => {
this.setState({ currentFile: file });
};

// Fonction appelée lorsqu'un appareil Chromecast est détecté
onDeviceDetected = () => {
this.setState({ isCasting: true });
};

// Fonction appelée lorsque la lecture sur Chromecast est terminée
onDeviceStopped = () => {
this.setState({ isCasting: false });
};

render() {
return (
<div>
  {/* Afficher la dropzone */}
<Dropzone onDrop={this.onDrop}>
{({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              Déposez vos fichiers torrent ici ou cliquez pour sélectionner des fichiers
            </div>
          )}
</Dropzone>
{/* Afficher la liste des fichiers */}
<ul>
{this.state.files.map((file) => (
<li key={file.name} onClick={() => this.onSelectFile(file)}>
{file.name}
</li>
))}
</ul>

{/* Afficher le lecteur vidéo si un fichier est sélectionné */}
{this.state.currentFile && (
  <Chromecast
  Url={`http://localhost:3000/stream/${encodeURIComponent(this.state.currentFile.name)}`}
  onDeviceConnect={() => this.setState({ isCasting: true })}
  onDeviceDisconnect={() => this.setState({ isCasting: false })}
>
  {this.state.isCasting && <div>La vidéo est en train d'être diffusée sur un appareil Chromecast</div>}
</Chromecast>
/>
)}
</div>
);
}
}

ReactDOM.render(<App />, document.getElementById('root'));