function QMediaPlayer(optimizer) {
  // Create player container
  this.playerContainer = document.createElement("div");
  this.playerContainer.className = "quantum-media-player";
  this.playerContainer.innerHTML = `
      <div class="qmedia-controls">
        <button id="playPauseBtn" disabled>Play</button>
        <div class="qmedia-status">
          <div class="quantum-indicator">Quantum State: <span id="quantumState">Uninitialized</span></div>
          <div class="entropy-indicator">Entropy: <span id="entropyLevel">0.000</span></div>
        </div>
      </div>
      <div class="qmedia-visualization">
        <canvas id="quantumVisualization" width="400" height="200" style="background:rgba(0,0,0,0.3);"></canvas>
      </div>
      <audio id="quantumAudio" style="display:none;"></audio>
      <video id="quantumVideo" style="display:none;"></video>
    `;
  document.body.appendChild(this.playerContainer);

  // UI Elements
  this.playPauseBtn = this.playerContainer.querySelector("#playPauseBtn");
  this.quantumStateDisplay =
    this.playerContainer.querySelector("#quantumState");
  this.entropyDisplay = this.playerContainer.querySelector("#entropyLevel");
  this.audioElement = this.playerContainer.querySelector("#quantumAudio");
  this.videoElement = this.playerContainer.querySelector("#quantumVideo");
  this.canvasElement = this.playerContainer.querySelector(
    "#quantumVisualization"
  );

  // Player state
  this.state = {
    isLoaded: false,
    isPlaying: false,
    quantumEntropy: 0,
    fileType: null,
  };

  // Bind events
  this.bindEvents();

  // Extend optimizer's processFile method
  if (optimizer && optimizer.processFile) {
    const originalProcessFile = optimizer.processFile.bind(optimizer);

    optimizer.processFile = async (file) => {
      // Call original method first
      await originalProcessFile(file);

      // Then load file in QMediaPlayer
      this.loadFile(file);
    };
  }
}

QMediaPlayer.prototype.bindEvents = function () {
  this.playPauseBtn.addEventListener("click", () => this.togglePlayback());
};

QMediaPlayer.prototype.detectFileType = function (file) {
  const extension = file.name.split(".").pop().toLowerCase();
  const typeMap = {
    mp3: "qmp3",
    wav: "qmp3",
    mp4: "qmp4",
    mov: "qmp4",
    avi: "qmp4",
    webm: "qmp4",
    exe: "qgame",
    zip: "qgame",
  };
  return typeMap[extension] || "unknown";
};

QMediaPlayer.prototype.loadFile = function (file) {
  this.state.fileType = this.detectFileType(file);
  this.state.isLoaded = false;
  this.updateQuantumState("Initializing Quantum Decoding");

  // Simulate quantum decoding
  this.quantumDecode(file)
    .then(() => this.prepareMediaPlayback(file))
    .catch(this.handleDecodingError.bind(this));
};

QMediaPlayer.prototype.quantumDecode = function (file) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const decodingInterval = setInterval(() => {
      progress += 0.1;
      this.state.quantumEntropy = Math.random();

      this.updateQuantumState(
        `Quantum Decoding: ${Math.round(progress * 100)}%`
      );
      this.updateEntropyVisualization();

      if (progress >= 1) {
        clearInterval(decodingInterval);
        this.state.isLoaded = true;
        resolve();
      }
    }, 100);
  });
};

QMediaPlayer.prototype.prepareMediaPlayback = function (file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;

    switch (this.state.fileType) {
      case "qmp3":
        this.audioElement.src = dataUrl;
        this.playPauseBtn.disabled = false;
        break;
      case "qmp4":
        this.videoElement.src = dataUrl;
        this.playPauseBtn.disabled = false;
        break;
      case "qgame":
        this.handleGameFile(file);
        break;
      default:
        this.handleUnsupportedFileType(file);
    }
  };
  reader.readAsDataURL(file);
};

QMediaPlayer.prototype.togglePlayback = function () {
  if (this.state.isPlaying) {
    this.pause();
  } else {
    this.play();
  }
};

QMediaPlayer.prototype.play = function () {
  switch (this.state.fileType) {
    case "qmp3":
      this.audioElement.play();
      break;
    case "qmp4":
      this.videoElement.play();
      break;
  }
  this.state.isPlaying = true;
  this.playPauseBtn.textContent = "Pause";
  this.updateQuantumState("Quantum Playback Active");
};

QMediaPlayer.prototype.pause = function () {
  switch (this.state.fileType) {
    case "qmp3":
      this.audioElement.pause();
      break;
    case "qmp4":
      this.videoElement.pause();
      break;
  }
  this.state.isPlaying = false;
  this.playPauseBtn.textContent = "Play";
  this.updateQuantumState("Quantum Playback Suspended");
};

QMediaPlayer.prototype.updateQuantumState = function (message) {
  this.quantumStateDisplay.textContent = message;
};

QMediaPlayer.prototype.updateEntropyVisualization = function () {
  const ctx = this.canvasElement.getContext("2d");
  ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

  // Quantum entropy visualization
  ctx.fillStyle = `rgba(0, 255, 255, ${this.state.quantumEntropy})`;
  ctx.beginPath();
  ctx.arc(
    this.canvasElement.width / 2,
    this.canvasElement.height / 2,
    100 * this.state.quantumEntropy,
    0,
    2 * Math.PI
  );
  ctx.fill();

  this.entropyDisplay.textContent = this.state.quantumEntropy.toFixed(3);
};

QMediaPlayer.prototype.handleGameFile = function (file) {
  // Placeholder for game file handling
  console.warn("Game file handling not fully implemented");
  alert("Game file detected. Advanced quantum decoding required.");
};

QMediaPlayer.prototype.handleUnsupportedFileType = function (file) {
  console.error("Unsupported file type:", file.name);
  this.updateQuantumState("Unsupported File Type");
  alert(`The file "${file.name}" is not a supported format.`);
};

QMediaPlayer.prototype.handleDecodingError = function (error) {
  console.error("Quantum Decoding Error:", error);
  this.updateQuantumState("Decoding Failed");
  alert("Unable to process file through quantum decoder");
};

// UI Elements
this.playPauseBtn = this.playerContainer.querySelector("#playPauseBtn");
this.quantumStateDisplay = this.playerContainer.querySelector("#quantumState");
this.entropyDisplay = this.playerContainer.querySelector("#entropyLevel");
this.audioElement = this.playerContainer.querySelector("#quantumAudio");
this.videoElement = this.playerContainer.querySelector("#quantumVideo");
this.canvasElement = this.playerContainer.querySelector(
  "#quantumVisualization"
);

// Player state
this.state = {
  isLoaded: false,
  isPlaying: false,
  quantumEntropy: 0,
  fileType: null,
};

// Bind events
this.bindEvents();

// Extend optimizer's processFile method
if (optimizer && optimizer.processFile) {
  const originalProcessFile = optimizer.processFile.bind(optimizer);

  optimizer.processFile = async (file) => {
    // Call original method first
    await originalProcessFile(file);

    // Then load file in QMediaPlayer
    this.loadFile(file);
  };
}

QMediaPlayer.prototype.bindEvents = function () {
  this.playPauseBtn.addEventListener("click", () => this.togglePlayback());
};

QMediaPlayer.prototype.detectFileType = function (file) {
  const extension = file.name.split(".").pop().toLowerCase();
  const typeMap = {
    mp3: "qmp3",
    wav: "qmp3",
    mp4: "qmp4",
    avi: "qmp4",
    webm: "qmp4",
    exe: "qgame",
    zip: "qgame",
  };
  return typeMap[extension] || "unknown";
};

QMediaPlayer.prototype.loadFile = function (file) {
  this.state.fileType = this.detectFileType(file);
  this.state.isLoaded = false;
  this.updateQuantumState("Initializing Quantum Decoding");

  // Simulate quantum decoding
  this.quantumDecode(file)
    .then(() => this.prepareMediaPlayback(file))
    .catch(this.handleDecodingError.bind(this));
};

QMediaPlayer.prototype.quantumDecode = function (file) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const decodingInterval = setInterval(() => {
      progress += 0.1;
      this.state.quantumEntropy = Math.random();

      this.updateQuantumState(
        `Quantum Decoding: ${Math.round(progress * 100)}%`
      );
      this.updateEntropyVisualization();

      if (progress >= 1) {
        clearInterval(decodingInterval);
        this.state.isLoaded = true;
        resolve();
      }
    }, 100);
  });
};

QMediaPlayer.prototype.prepareMediaPlayback = function (file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;

    switch (this.state.fileType) {
      case "qmp3":
        this.audioElement.src = dataUrl;
        this.playPauseBtn.disabled = false;
        break;
      case "qmp4":
        this.videoElement.src = dataUrl;
        this.playPauseBtn.disabled = false;
        break;
      case "qgame":
        this.handleGameFile(file);
        break;
      default:
        this.handleUnsupportedFileType(file);
    }
  };
  reader.readAsDataURL(file);
};

QMediaPlayer.prototype.togglePlayback = function () {
  if (this.state.isPlaying) {
    this.pause();
  } else {
    this.play();
  }
};

QMediaPlayer.prototype.play = function () {
  switch (this.state.fileType) {
    case "qmp3":
      this.audioElement.play();
      break;
    case "qmp4":
      this.videoElement.play();
      break;
  }
  this.state.isPlaying = true;
  this.playPauseBtn.textContent = "Pause";
  this.updateQuantumState("Quantum Playback Active");
};

QMediaPlayer.prototype.pause = function () {
  switch (this.state.fileType) {
    case "qmp3":
      this.audioElement.pause();
      break;
    case "qmp4":
      this.videoElement.pause();
      break;
  }
  this.state.isPlaying = false;
  this.playPauseBtn.textContent = "Play";
  this.updateQuantumState("Quantum Playback Suspended");
};

QMediaPlayer.prototype.updateQuantumState = function (message) {
  this.quantumStateDisplay.textContent = message;
};

QMediaPlayer.prototype.updateEntropyVisualization = function () {
  const ctx = this.canvasElement.getContext("2d");
  ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

  // Quantum entropy visualization
  ctx.fillStyle = `rgba(0, 255, 255, ${this.state.quantumEntropy})`;
  ctx.beginPath();
  ctx.arc(
    this.canvasElement.width / 2,
    this.canvasElement.height / 2,
    100 * this.state.quantumEntropy,
    0,
    2 * Math.PI
  );
  ctx.fill();

  this.entropyDisplay.textContent = this.state.quantumEntropy.toFixed(3);
};

QMediaPlayer.prototype.handleGameFile = function (file) {
  // Placeholder for game file handling
  console.warn("Game file handling not fully implemented");
  alert("Game file detected. Advanced quantum decoding required.");
};

QMediaPlayer.prototype.handleUnsupportedFileType = function (file) {
  console.error("Unsupported file type:", file.name);
  this.updateQuantumState("Unsupported File Type");
  alert(`The file "${file.name}" is not a supported format.`);
};

QMediaPlayer.prototype.handleDecodingError = function (error) {
  console.error("Quantum Decoding Error:", error);
  this.updateQuantumState("Decoding Failed");
  alert("Unable to process file through quantum decoder");
};
