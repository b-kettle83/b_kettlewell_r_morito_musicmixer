console.log("JS file connected");

const resetButton = document.querySelector('#audios button');

let audios = document.querySelectorAll('#audios img'),
    dropZones = document.querySelectorAll('.drop_zone'),
    originalContainer = document.querySelector('#audios'),
    originalZone,
    zoneTaken,
    draggedPiece;

    dropZones.forEach(zone => zone.zoneTaken = false);

function resetAudios() {
    audios.forEach(audio => originalContainer.appendChild(audio));

    dropZones.forEach(zone => zone.zoneTaken = false);
}

function startDrag () {
    console.log ('Started dragging ', this.id);

    draggedPiece = this;

    originalZone = this.parentElement;
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
}

resetButton.addEventListener('click', resetAudios);

audios.forEach(audio => audio.addEventListener('dragstart', startDrag));

dropZones.forEach(zone => zone.addEventListener('dragover', handleDragOver));

dropZones.forEach(zone => zone.addEventListener('drop', handleDrop));