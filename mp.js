
const songs = [
    {
    title: "Pal Pal",
    genre: "Pakistani",
    url: "songs/Pal Pal Afusic (pagalall.com).mp3",
    image: "albumart/pal pal.jfif"
  },
  {
    title: "Khuda Jaane",
    genre: "Bollywood",
    url: "songs/Khuda Jaane Bachna Ae Haseeno 128 Kbps (1).mp3",
    image: "albumart/khuda janay.jfif"
  },
  
  {
    title: "Titli",
    genre: "Punjabi",
    url: "songs/Titli - Satinder Sartaaj.mp3",
    image: "albumart/titli.jfif"
  },
  
];

let currentIndex = 0;
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("now-playing");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const playlistEl = document.getElementById("playlist");

// Render the filtered playlist
function renderSongs() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedGenre = categorySelect.value;

  playlistEl.innerHTML = "";

  const filteredSongs = songs.filter(song => {
    return (
      song.title.toLowerCase().includes(searchTerm) &&
      (selectedGenre === "" || song.genre === selectedGenre)
    );
  });

  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => playSong(index));
    playlistEl.appendChild(li);
  });
}

// Play a specific song
function playSong(index) {
  currentIndex = index;
  const song = songs[currentIndex];
  audio.src = song.url;
  nowPlaying.textContent = `🎵 Playing: ${song.title}`;
  document.getElementById("album-art").src = song.image;
  audio.play();
}


// Toggle play/pause
document.getElementById("play").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Skip to next song
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
});

// Go to previous song
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
});

// Volume control
document.getElementById("volume").addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Filter triggers
searchInput.addEventListener("input", renderSongs);
categorySelect.addEventListener("change", renderSongs);

// Initialize on page load
window.onload = renderSongs;
