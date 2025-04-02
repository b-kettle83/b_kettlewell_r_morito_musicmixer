console.log("JS file connected");

const resetButton = document.querySelector('#reset_button'),
    playButton = document.querySelector('#play_button'),
    volumeSlider = document.querySelector('#volume_slider'),
    audioBox = document.querySelector('#audio_container');

let audios = document.querySelectorAll('#audios img'),
    loops = document.querySelectorAll('#audio_container audio'),
    dropZones = document.querySelectorAll('.drop_zone'),
    originalContainer = document.querySelector('#audios'),
    originalZone,
    zoneTaken,
    removedAudio,
    draggedPiece;

    dropZones.forEach(zone => zone.zoneTaken = false);


    function removeSvgFilter() {
        let filterElements = document.querySelectorAll('.svg-filter');
        filterElements.forEach(element => {
            element.classList.remove('svg-filter');
        });

        
    }

    document.addEventListener('DOMContentLoaded', () => {
        removeSvgFilter();
    });
    

function resetAudios() {
    audios.forEach(audio => originalContainer.appendChild(audio));

    dropZones.forEach(zone => zone.zoneTaken = false);

    audioBox.innerHTML = '';

    loops = document.querySelectorAll('#audio_container audio');




}

function startDrag () {
    console.log ('Started dragging ', this.id);

    draggedPiece = this;

    originalZone = this.parentElement;

    removedAudio = document.querySelector(`#audio_container audio[src = "audios/${this.dataset.audioName}.wav"]`);
    
    loops = document.querySelectorAll('#audio_container audio');
}

function handleDragOver (e) {
    e.preventDefault();
    console.log('Dragged Over');
}

function handleDrop (e) {
    e.preventDefault();

    if (this.zoneTaken === true) {
        console.log('Zone Taken');
        return;
    }

    this.appendChild(draggedPiece);
    console.log('Audio Dropped');
    this.zoneTaken = true;

    originalZone.zoneTaken = false;

    if (removedAudio) {
        audioBox.removeChild(removedAudio);
    }

    loadNewAudio(draggedPiece.dataset.audioName);

    loops = document.querySelectorAll('#audio_container audio');


    this.classList.add('svg-filter');

}

function loadNewAudio (audioId) {
    let newAudio = document.createElement('audio');
    newAudio.src = `audios/${audioId}.wav`;
    audioBox.appendChild(newAudio);
    newAudio.loop = true;
    newAudio.load();

    loops = document.querySelectorAll('#audio_container audio');
}

function playAudios () {

    loops.forEach(loop => {

        loop.pause();
        loop.currentTime = 0;
        loop.play();

    });

}

function volumeLevel () {
    loops.forEach(loop => loop.volume = (this.value / 100));
}


resetButton.addEventListener('click', function() {
    resetAudios();
    removeSvgFilter();
});

playButton.addEventListener('click', playAudios);

volumeSlider.addEventListener('change', volumeLevel);

audios.forEach(audio => audio.addEventListener('dragstart', startDrag));

dropZones.forEach(zone => zone.addEventListener('dragover', handleDragOver));

dropZones.forEach(zone => zone.addEventListener('drop', handleDrop));

