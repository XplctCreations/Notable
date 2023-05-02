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
const starredBtn = document.querySelector('.starr');
const tagEmpty = document.getElementById('optEmpty');
const tagSch = document.getElementById('optSch');
const tagWork = document.getElementById('optWork');
const tagHome = document.getElementById('optHome');
const sortTag = document.querySelector('#sortTag');
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

    deleteTheNote = e => {
      titleInput.value = '';
      textArea.value = '';
      cautionPage.style.display = 'flex';
      e.target.parentElement.remove();
      noteArray.splice(e.target.parentElement, 1);
      localStorage.setItem('storedNote', JSON.stringify(noteArray));

      noteCounting();
    };

    delOnHover.onclick = e => {
      deleteTheNote(e);
    };

    if (window.matchMedia('(max-width: 425px)').matches) {
      aNote.onclick = () => {
        columnThree.style.display = 'grid';
        cautionPage.style.display = 'none';
        columnThree.style.zIndex = 2;
        columnTwo.style.display = 'none';
      };

      // Detect swipe gesture
      let startX = 0;
      let endX = 0;
      aNote.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
      });

      aNote.addEventListener('touchmove', function (event) {
        endX = event.touches[0].clientX;
      });

      aNote.addEventListener('touchend', function (e) {
        // Calculate swipe distance
        let swipeDistance = endX - startX;
        let swipeThreshold = window.innerWidth * 0.15; // Adjust this threshold to your preference

        // Swipe left
        // if (swipeDistance < -swipeThreshold) {
        //   console.log('swiped short');
        // }
        // Swipe right
        if (swipeDistance > swipeThreshold) {
          deleteTheNote(e);
        }
      });
    }

    aNote.onclick = e => {
      if (window.matchMedia('(max-width: 425px)').matches) {
        columnThree.style.display = 'grid';
        cautionPage.style.display = 'none';
        columnThree.style.zIndex = 2;
        columnTwo.style.display = 'none';
      }

      favouriteBtn.classList.remove('deep-yellow-toggle');
      if (e.target !== delOnHover) {
        cautionPage.style.display = 'none';
        textArea.value = aNoteText.innerText;
        titleInput.value = aNoteTitle.innerText;
        dropDownTagBtn.value = noteArray[i].tag;
        editedDate.innerText = `Last Edited ${noteArray[i].dated}`;

        editedDate.classList.remove('hidden');
        textArea.setAttribute('readonly', true);
        titleInput.setAttribute('readonly', true);
        edit.innerText = 'EDIT';

        if (noteArray[i].favorite == true) {
          favouriteBtn.classList.add('deep-yellow-toggle');
        }
      }

      saveButton.onclick = () => {
        if (edit.innerText == 'EDIT') {
          e.target.parentElement.remove();
          noteArray.splice(e.target.parentElement, 1);
          localStorage.setItem('storedNote', JSON.stringify(noteArray));
          w;

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
starredBtn.addEventListener('click', showStarredOnly);

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
  getItem();
  noteListContainer.innerHTML = null;
  searchValue = e.target.value.toLowerCase();

  noteArray = noteArray.filter(
    xo =>
      xo.title.toLowerCase().includes(searchValue) ||
      xo.text.toLowerCase().includes(searchValue)
  );

  render();
});

searchInput.addEventListener('blur', () => {
  searchInput.value = '';
});

function showStarredOnly(e) {
  e.preventDefault();
  getItem();
  noteListContainer.innerHTML = null;
  noteArray = noteArray.filter(st => st.favorite === true);
  render();
}

function selectedTag(sel) {
  // e.preventDefault();
  getItem();
  noteListContainer.innerHTML = null;
  noteArray = noteArray.filter(st => st.tag == sel);
  render();
}

sortTag.onblur = e => {
  if (sortTag.value !== 'all') {
    e.preventDefault();
    sortTag.value = 'all';
  }
};

function sortNote(e, tagOfNote) {
  e.preventDefault();
  getItem();
  noteListContainer.innerHTML = null;
  noteArray = noteArray.filter(st => st.tag === tagOfNote);
  render();
}

sortTag.onclick = e => {
  switch (e.target.value) {
    case 'all':
      noteListContainer.innerHTML = null;
      getItem();
      break;
    case 'home':
      sortNote(e, 'home');
      break;
    case 'school':
      sortNote(e, 'school');
      break;
    case 'work':
      sortNote(e, 'work');
      break;
    case '':
      sortNote(e, '');
      break;
  }
};

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

function editPage(e) {
  let curDate = moment(new Date()).format('LLL');
  editedDate.innerText = `Last Edited ${curDate}`;

  editedDate.classList.remove('hidden');
  textArea.setAttribute('readonly', true);
  titleInput.setAttribute('readonly', true);
  edit.innerText = 'EDIT';
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
  let curDate = new Date();

  if (edit.innerText === 'EDIT') {
    let title = titleInput.value,
      id = Math.trunc(Math.random() * 999),
      text = textArea.value,
      tag = dropDownTagBtn.value,
      element = 'Default',
      dated = moment(curDate).format('LLL'),
      favorite = favouriteBtn.classList.contains('deep-yellow-toggle');

    const noteObj = { title, text, id, tag, favorite, dated, element };
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
      if (window.matchMedia('(max-width: 425px)').matches) {
        columnThree.style.display = 'grid';
        cautionPage.style.display = 'none';
        columnThree.style.zIndex = 2;
        columnTwo.style.display = 'none';
      }

      if (e.target !== delOnHover) {
        cautionPage.style.display = 'none';
        textArea.value = aNoteText.innerText;
        titleInput.value = aNoteTitle.innerText;
        inputTag.innerText = dropDownTagBtn.value;

        editedDate.classList.remove('hidden');
        editedDate.innerText = `Last Edited ${dated}`;
        textArea.setAttribute('readonly', true);
        titleInput.setAttribute('readonly', true);
        edit.innerText = 'EDIT';

        if (noteObj.favorite == true) {
          favouriteBtn.classList.add('deep-yellow-toggle');
        }
      }

      //FIX
      edit.onclick = () => {
        newNoteButton.onclick = () => {
          saveButton.onclick = x => {
            saveNote();
          };
        };
      };

      saveButton.onclick = () => {
        if (edit.innerText == 'EDIT') {
          e.target.parentElement.remove();
          noteArray.splice(e.target.parentElement, 1);
          localStorage.setItem('storedNote', JSON.stringify(noteArray));
        }
      };
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

    titleInput.value = '';
    textArea.value = '';

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

    dropDownTagBtn.style.display = 'flex';
    favouriteBtn.style.display = 'flex';
    dropDownTagBtn.removeAttribute('disabled');
    cautionPage.style.display = 'flex';
  }

  noteCounting();
  save();
}

const tabNote = document.querySelector('.notes');
const tabStar = document.querySelector('.starr');
const columnThree = document.querySelector('.col-three');
const columnTwo = document.querySelector('.col-two');
const noteMain = document.querySelector('.col-two-main');
const aNoteMobile = document.querySelector('.col-two-body');

if (window.matchMedia('(max-width: 425px)').matches) {
  tabNote.innerHTML = '<i class="fa-solid fa-clipboard"></i>';
  tabStar.innerHTML = '<i class="fa-solid fa-star"></i>';

  cautionPage.style.display = 'flex';

  tabNote.onclick = () => {
    noteListContainer.innerHTML = null;
    getItem();
    cautionPage.style.display = 'none';
    columnThree.classList.toggle('hidden');
    columnTwo.style.display = 'grid';
    columnTwo.style.zIndex = 2;
    columnThree.style.display = 'none';
  };

  saveButton.onclick = () => {
    cautionPage.style.display = 'none';
    columnThree.classList.toggle('hidden');
    columnTwo.style.display = 'grid';
    columnTwo.style.zIndex = 2;
    columnThree.style.display = 'none';
  };

  newNoteButton.addEventListener('click', () => {
    columnThree.style.display = 'grid';
    cautionPage.style.display = 'none';
    columnThree.style.zIndex = 2;
    columnTwo.style.display = 'none';
  });

  thirdColumnBackBtn.onclick = () => {
    noteListContainer.innerHTML = null;
    getItem();
    cautionPage.style.display = 'none';
    columnThree.classList.toggle('hidden');
    columnTwo.style.display = 'grid';
    columnTwo.style.zIndex = 2;
    columnThree.style.display = 'none';
  };
}
