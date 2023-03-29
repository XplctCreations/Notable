// SELECTORS
const newNoteButton = document.querySelector('#newNoteBTN');
const cautionPage = document.querySelector('#cautionOverlay');
const thirdColumn = document.querySelector('.col-three');
const thirdColumnBackBtn = document.getElementById('colThreeBackBtn');
const textArea = document.getElementById('thirdColumnTextarea');
const titleInput = document.getElementById('titleInput');
const edit = document.getElementById('editBtn');
const editedDate = document.getElementById('dateDone');
const noteListContainer = document.querySelector('.col-two-main');
const saveButton = document.getElementById('saveBtn');
const dropDownTagBtn = document.getElementById('dropDownTag');
const favouriteBtn = document.querySelector('.fa-star');
const thrashNote = document.getElementById('deleteNote');
const noteBadge = document.querySelector('.note-badge');
const searchInput = document.querySelector('#searchInp');
// const divHoldingAllNote = document.querySelector('.col-two-main');

/// ARRAY HOLDING NOTE,TITLE & TITLE
let noteArray = [];
let thrashArray = [];

//Local Storage Function
let render = () => {
  for (let i = 0; i < noteArray.length; i++) {
    const aNote = document.createElement('div');
    aNote.classList.add('col-two-body');
    noteListContainer.appendChild(aNote);

    let delOnHover = document.createElement('i');
    aNote.appendChild(delOnHover);
    delOnHover.className = 'fa-solid fa-trash';
    delOnHover.classList.add('del-on-hover');

    delOnHover.onclick = e => {
      titleInput.value = '';
      textArea.value = '';
      cautionPage.style.display = 'flex';
      // console.log(noteObj);
      e.target.parentElement.remove();
      noteArray.splice(e.target.parentElement, 1);
      localStorage.setItem('storedNote', JSON.stringify(noteArray));

      noteCounting();
    };

    aNote.onclick = e => {
      favouriteBtn.classList.remove('deep-yellow-toggle');
      if (e.target !== delOnHover) {
        cautionPage.style.display = 'none';
        textArea.value = aNoteText.innerText;
        titleInput.value = aNoteTitle.innerText;
        dropDownTagBtn.value = noteArray[i].tag;

        editedDate.classList.remove('hidden');
        textArea.setAttribute('readonly', true);
        titleInput.setAttribute('readonly', true);
        edit.innerText = 'EDIT';
        //  console.log('Current Note Selected');

        if (noteArray[i].favorite == true) {
          favouriteBtn.classList.add('deep-yellow-toggle');
        }
      }

      saveButton.onclick = () => {
        if (edit.innerText == 'EDIT') {
          e.target.parentElement.remove();
          noteArray.splice(e.target.parentElement, 1);
          localStorage.setItem('storedNote', JSON.stringify(noteArray));

          noteCounting();
        }
      };
    };

    let aNoteDiv = document.createElement('div');
    aNoteDiv.classList.add('col-two-body-top');
    aNote.appendChild(aNoteDiv);

    let aNoteTitle = document.createElement('h3');
    aNoteTitle.classList.add('note-title');
    aNoteDiv.appendChild(aNoteTitle);
    aNoteTitle.innerText = noteArray[i].title;

    let aNoteText = document.createElement('p');
    aNoteText.classList.add('note-text');
    aNote.appendChild(aNoteText);
    aNoteText.innerText = noteArray[i].text;

    removeReadonlyAndShowDate();

    let aNoteIcons = document.createElement('div');
    aNoteIcons.classList.add('icons');
    aNote.appendChild(aNoteIcons);

    if (noteArray[i].favorite) {
      let starredIcon = document.createElement('img');
      starredIcon.setAttribute('src', './inv/star.png');
      starredIcon.classList.add('star-icon');
      aNoteIcons.appendChild(starredIcon);
    }

    let inputTag = document.createElement('h6');
    inputTag.classList.add('h6');
    inputTag.innerText = noteArray[i].tag;
    aNoteIcons.appendChild(inputTag);
    // console.log(noteArray);
  }

  noteCounting();
};

let save = () => {
  localStorage.setItem('storedNote', JSON.stringify(noteArray));
};

let getItem = () => {
  if (!localStorage.getItem('storedNote')) {
    return;
  }
  noteArray = JSON.parse(localStorage.getItem('storedNote'));
  render();
};

document.addEventListener('DOMContentLoaded', getItem);
document.addEventListener('DOMContentLoaded', () => {
  noteCounting();
});

// EVENT LISTENER
newNoteButton.addEventListener('click', makeNewNote);
thirdColumnBackBtn.addEventListener('click', backToCautionPage);
edit.addEventListener('click', doneWithNote);
saveButton.addEventListener('click', saveNote);
favouriteBtn.addEventListener('click', starNote);
thrashNote.addEventListener('click', thrashingNote);

//Quick Event Listeners
textArea.addEventListener('keyup', () => {
  if (textArea.value !== '') {
    edit.innerText = 'DONE';
  } else {
    edit.innerText = 'EDIT';
  }
});

titleInput.addEventListener('keyup', () => {
  if (titleInput.value !== '') {
    edit.innerText = 'DONE';
  }
});

//FUNCTIONS

searchInput.addEventListener('input', e => {
  const allNote = document.querySelector('.col-two-main');
  const eachNote = 2;

  searchValue = e.target.value.toLowerCase();
  noteArray.forEach(noteObj => {
    const searchSimilar =
      noteObj.title.toLowerCase().includes(searchValue) ||
      noteObj.text.toLowerCase().includes(searchValue);

    console.log(e.target.value.toLowerCase());
    console.log(searchSimilar);

    eachNote.classList.toggle('hidden', !searchSimilar);
  });
});

searchInput.addEventListener('blur', () => {
  searchInput.value = '';
});

function noteCounting() {
  noteBadge.innerText = noteArray.length;
  noteBadge.classList.add('note-badge');
}

function removeReadonlyAndShowDate() {
  textArea.removeAttribute('readonly');
  titleInput.removeAttribute('readonly');
  editedDate.classList.add('hidden');
}

function makeNewNote() {
  if (textArea.value !== null) {
    cautionPage.style.display = 'none';
    textArea.value = '';
    titleInput.value = '';
    favouriteBtn.classList.remove('deep-yellow-toggle');
    removeReadonlyAndShowDate();
  } else if (edit.innerText == 'DONE') {
    edit.innerText = 'EDIT';
  }

  noteCounting();
}

function backToCautionPage() {
  cautionPage.style.display = 'flex';
}

function removeAnote() {
  // console.log(noteObj);
  e.target.parentElement.remove();
  noteArray.splice(e.target.parentElement, 1);
  localStorage.setItem('storedNote', JSON.stringify(noteArray));
  titleInput.value = '';
  textArea.value = '';
  cautionPage.style.display = 'flex';

  noteCounting();
}

function starNote() {
  favouriteBtn.classList.toggle('deep-yellow-toggle');
}

function editPage() {
  editedDate.classList.remove('hidden');
  textArea.setAttribute('readonly', true);
  titleInput.setAttribute('readonly', true);
  edit.innerText = 'EDIT';

  dropDownTagBtn.setAttribute('disabled', true);
}

function thrashingNote() {
  makeNewNote();
}

function doneWithNote(e) {
  e.preventDefault();

  if (
    edit.innerText === 'EDIT' &&
    (textArea.value !== '' || titleInput !== '')
  ) {
    removeReadonlyAndShowDate();
    edit.innerText = 'DONE';
    dropDownTagBtn.style.display = 'flex';
    favouriteBtn.style.display = 'flex';
    dropDownTagBtn.removeAttribute('disabled');
  } else if (edit.innerText === 'DONE') {
    editPage();
  }
}

function saveNote() {
  if (edit.innerText === 'EDIT') {
    let title = titleInput.value,
      id = Math.trunc(Math.random() * 999),
      text = textArea.value,
      tag = dropDownTagBtn.value,
      element = 'Default',
      favorite = favouriteBtn.classList.contains('deep-yellow-toggle');

    const noteObj = { title, text, id, tag, favorite, element };
    noteArray.push(noteObj);

    const aNote = document.createElement('div');
    aNote.classList.add('col-two-body');
    noteListContainer.appendChild(aNote);

    let delOnHover = document.createElement('i');
    aNote.appendChild(delOnHover);
    delOnHover.className = 'fa-solid fa-trash';
    delOnHover.classList.add('del-on-hover');

    delOnHover.onclick = e => {
      e.target.parentElement.remove();
      noteArray.splice(e.target.parentElement, 1);
      localStorage.setItem('storedNote', JSON.stringify(noteArray));
      titleInput.value = '';
      textArea.value = '';
      cautionPage.style.display = 'flex';

      noteCounting();
    };

    aNote.onclick = e => {
      if (e.target !== delOnHover) {
        cautionPage.style.display = 'none';
        textArea.value = aNoteText.innerText;
        titleInput.value = aNoteTitle.innerText;
        inputTag.innerText = dropDownTagBtn.value;
        // console.log(noteObj.title.toLowerCase());
        // console.log(noteObj.favorite);
        console.log(e.target.parentElement);

        editedDate.classList.remove('hidden');
        textArea.setAttribute('readonly', true);
        titleInput.setAttribute('readonly', true);
        edit.innerText = 'EDIT';

        if (noteObj.favorite == true) {
          favouriteBtn.classList.add('deep-yellow-toggle');
        }

        for (let s = 0; s < noteArray.length; s++) {
          console.log(noteArray[s]);
        }
      }

      // if (aNoteIcons.querySelector(img)) {
      //   console.log('Starred');
      // }

      saveButton.onclick = () => {
        if (edit.innerText == 'EDIT') {
          // I am trying to check by looping through the array if there is no similar id so that it wont overwrite an initially created note

          // for (let x = 0; x < noteArray.length; x++) {
          //   if (noteArray[x].id === )
          // }
          // console.log('Remove Current');

          e.target.parentElement.remove();
          noteArray.splice(e.target.parentElement, 1);
          localStorage.setItem('storedNote', JSON.stringify(noteArray));
          // console.log(noteArray);
        }
      };

      //   dropDownTagBtn.style.display = 'none';
      //   favouriteBtn.style.display = 'none';
    };

    let aNoteDiv = document.createElement('div');
    aNoteDiv.classList.add('col-two-body-top');
    aNote.appendChild(aNoteDiv);

    let aNoteTitle = document.createElement('h3');
    aNoteTitle.classList.add('note-title');
    aNoteDiv.appendChild(aNoteTitle);
    aNoteTitle.innerText = title;

    let aNoteText = document.createElement('p');
    aNoteText.classList.add('note-text');
    aNote.appendChild(aNoteText);
    aNoteText.innerText = text;

    removeReadonlyAndShowDate();

    // console.log(noteArray);

    titleInput.value = '';
    textArea.value = '';
    // cautionPage.style.display = 'flex';

    let aNoteIcons = document.createElement('div');
    aNoteIcons.classList.add('icons');
    aNote.appendChild(aNoteIcons);

    if (favouriteBtn.classList.contains('deep-yellow-toggle')) {
      let starredIcon = document.createElement('img');
      aNoteIcons.appendChild(starredIcon);
      starredIcon.setAttribute('src', './inv/star.png');
      starredIcon.classList.add('star-icon');
      favouriteBtn.classList.remove('deep-yellow-toggle');
    }

    let inputTag = document.createElement('h6');
    inputTag.classList.add('h6');
    inputTag.innerText = tag;
    aNoteIcons.appendChild(inputTag);
    // console.log(noteArray);

    dropDownTagBtn.style.display = 'flex';
    favouriteBtn.style.display = 'flex';
    dropDownTagBtn.removeAttribute('disabled');
    cautionPage.style.display = 'flex';

    // favouriteBtn.classList.add('button');
    // favouriteBtn.style.color = 'rgb(153, 144, 144)';
  }

  noteCounting();
  save();
}

const tabNote = document.querySelector('.notes');
const tabStar = document.querySelector('.starr');
const columnThree = document.querySelector('.col-three');
const columnTwo = document.querySelector('.col-two');
const aNoteMobile = document.querySelector('.col-two-body');
const noteMain = document.querySelector('.col-two-main');

if (window.matchMedia('(max-width: 320px)').matches) {
  console.log('Size is 320px');
  tabNote.innerHTML = '<i class="fa-solid fa-clipboard"></i>';
  tabStar.innerHTML = '<i class="fa-solid fa-star"></i>';

  cautionPage.style.display = 'flex';

  tabNote.onclick = () => {
    cautionPage.style.display = 'none';
    columnThree.classList.toggle('hidden');
    columnTwo.style.display = 'grid';
    columnTwo.style.zIndex = 2;
    columnThree.style.zIndex = 1;
  };

  saveButton.onclick = () => {
    cautionPage.style.display = 'none';
    columnThree.classList.toggle('hidden');
    columnTwo.style.display = 'grid';
    columnTwo.style.zIndex = 2;
    columnThree.style.zIndex = 1;

    for (let x = 0; x < noteMain.length; x++) {
      if (e.target == noteMain[e]) {
        console.log('lovee');
      }
    }
  };

  newNoteButton.addEventListener('click', () => {
    columnThree.style.display = 'grid';
    cautionPage.style.display = 'none';
    columnThree.style.zIndex = 2;
    columnTwo.style.zIndex = 1;
  });
}
