// Importer les dépendances
const express = require('express');
const app = express();
const torrentStream = require('torrent-stream');

// Définir une route pour télécharger un nouveau fichier torrent
app.post('/upload-torrent', (req, res) => {
  // Récupérer le fichier torrent envoyé par l'utilisateur
  const torrentFile = req.body;

  // Créer un nouveau flux à partir du fichier torrent
  const stream = torrentStream(torrentFile);

const castApp = Chromecast.Application({
  appId: 'XXXXXXXX',
  appType: ['web']
});


  // Attendre que le flux soit prêt et récupérer les informations sur la première vidéo
  stream.on('ready', () => {
    const file = stream.files[0];
    const fileName = file.name;
    const fileLength = file.length;

    // Envoyer les informations sur la vidéo au client
    res.send({ fileName, fileLength });
  });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('
