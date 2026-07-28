/**
 * ==============================================================================
 * Problem Statement: Online Bookstore Array Management
 * ==============================================================================
 * Real-Time Step-by-Step Console Log Output & Array State Visualizer
 * ==============================================================================
 */

// Initial array of books as specified in Requirement 1
let books = ['Math', 'Science', 'English'];

// ==============================================================================
// 1 Start with an array of books: ['Math', 'Science', 'English'].
// ==============================================================================
function startWithArrayOfBooks() {
  books = ['Math', 'Science', 'English'];
  return books;
}

// ==============================================================================
// 2 Add new books using push() and unshift().
// ==============================================================================
function addNewBooksUsingPushAndUnshift(arr = books) {
  let list = [...arr];
  list.push('History');    // Adds 'History' to end
  list.unshift('Art');     // Adds 'Art' to start
  return list;
}

// ==============================================================================
// 3 Remove books using pop() and shift().
// ==============================================================================
function removeBooksUsingPopAndShift(arr = books) {
  let list = [...arr];
  const popped = list.pop();    // Removes last book
  const shifted = list.shift(); // Removes first book
  return { updatedList: list, popped, shifted };
}

// ==============================================================================
// 4 Delete a specific book using splice().
// ==============================================================================
function deleteSpecificBookUsingSplice(arr = books, indexToDelete = 1) {
  let list = [...arr];
  if (indexToDelete >= 0 && indexToDelete < list.length) {
    const deletedBook = list[indexToDelete];
    const removedArray = list.splice(indexToDelete, 1);
    return {
      updatedList: list,
      deletedBook: deletedBook,
      deletedIndex: indexToDelete,
      removedArray: removedArray
    };
  }
  return { updatedList: list, deletedBook: null, deletedIndex: indexToDelete, removedArray: [] };
}

// ==============================================================================
// 5 Merge arrays of new arrivals using concat().
// ==============================================================================
function mergeArraysOfNewArrivalsUsingConcat(arr = books, newArrivals = ['Physics', 'Chemistry']) {
  const mergedBooks = arr.concat(newArrivals);
  return mergedBooks;
}

// ==============================================================================
// 6 Copy a part of the book list inside the same array using copyWithin().
// ==============================================================================
function copyPartofBookListUsingCopyWithin(arr = books) {
  let list = [...arr];
  if (list.length >= 2) {
    list.copyWithin(0, 1, 2);
  }
  return list;
}

// ==============================================================================
// 7 Flatten a nested array of categories using flat().
// ==============================================================================
function flattenNestedArrayOfCategoriesUsingFlat(nestedCategories = [['Math', 'Science'], ['History', ['Art', 'Music']]]) {
  const flattenedList = nestedCategories.flat(2);
  return flattenedList;
}

// ==============================================================================
// 8 Use slice() to create a small section of books for display.
// ==============================================================================
function useSliceToCreateSmallSectionOfBooksForDisplay(arr = books, start = 0, end = 2) {
  const displaySection = arr.slice(start, end);
  return displaySection;
}

// ==============================================================================
// 9 Use toString() and join() to show the book list as a string with different separators.
// ==============================================================================
function useToStringAndJoinToShowBookListAsString(arr = books) {
  const stringComma = arr.toString();
  const stringPipe = arr.join(' | ');
  const stringDash = arr.join(' - ');
  return {
    toStringVal: stringComma,
    joinPipeVal: stringPipe,
    joinDashVal: stringDash
  };
}

// ==============================================================================
// 10 Find the total number of books using length.
// ==============================================================================
function findTotalNumberOfBooksUsingLength(arr = books) {
  const totalNumber = arr.length;
  return totalNumber;
}

// ==============================================================================
// 11 Replace/update a book in the list by directly changing its index.
// ==============================================================================
function replaceUpdateBookInListByDirectlyChangingIndex(arr = books, index = 1, newBook = 'Computer Science') {
  let list = [...arr];
  if (index >= 0 && index < list.length) {
    list[index] = newBook;
  } else if (list.length > 0) {
    list[0] = newBook;
  }
  return list;
}

// ==============================================================================
// 12 Use forEach() to display all books with their positions.
// ==============================================================================
function useForEachToDisplayAllBooksWithPositions(arr = books) {
  const formattedPositions = [];
  arr.forEach((book, index) => {
    const positionMessage = `Position #${index + 1}: ${book}`;
    formattedPositions.push(positionMessage);
  });
  return formattedPositions;
}


// ==============================================================================
// DOM RENDERING & SIDE-BY-SIDE REAL-TIME CONSOLE CONTROLLER
// ==============================================================================

const bookshelfDisplay = document.getElementById('bookshelf-display');
const currentArrayCode = document.getElementById('current-array-code');
const statTotalBooks = document.getElementById('stat-total-books');
const stepsContainer = document.getElementById('steps-container');
const playgroundOutputContent = document.getElementById('playground-output-content');
const outputLogBox = document.getElementById('output-log-box');

function logConsole(message) {
  if (!outputLogBox) return;
  const time = new Date().toLocaleTimeString();
  const line = document.createElement('div');
  line.className = 'log-line';
  line.textContent = `[${time}] ${message}`;
  outputLogBox.appendChild(line);
  outputLogBox.scrollTop = outputLogBox.scrollHeight;
}

function renderBookshelf() {
  if (!bookshelfDisplay) return;
  bookshelfDisplay.innerHTML = '';

  if (books.length === 0) {
    bookshelfDisplay.innerHTML = `<span style="color: var(--text-muted); font-family: var(--font-mono);">books = [] (Array is empty)</span>`;
  } else {
    books.forEach((book, idx) => {
      const item = document.createElement('div');
      item.className = 'book-item';
      item.innerHTML = `
        <span class="book-index">Index ${idx}</span>
        <span class="book-name">${book}</span>
      `;
      bookshelfDisplay.appendChild(item);
    });
  }

  if (statTotalBooks) statTotalBooks.textContent = books.length;
  if (currentArrayCode) currentArrayCode.textContent = `books = ${JSON.stringify(books)};`;

  updateStep4SpliceDetails();
}

function updateStep4SpliceDetails() {
  const mapContainer = document.getElementById('step4-index-map');
  const selectElem = document.getElementById('step4-splice-select');
  if (!mapContainer || !selectElem) return;

  mapContainer.innerHTML = '';
  selectElem.innerHTML = '';

  if (books.length === 0) {
    mapContainer.innerHTML = '<span style="color: var(--text-muted);">No elements available to delete.</span>';
    const opt = document.createElement('option');
    opt.textContent = 'None';
    opt.value = '-1';
    selectElem.appendChild(opt);
    return;
  }

  books.forEach((book, idx) => {
    const pill = document.createElement('div');
    pill.className = 'index-pill';
    pill.innerHTML = `Index <strong>${idx}</strong>: "${book}"`;
    mapContainer.appendChild(pill);

    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `Index ${idx}: "${book}"`;
    selectElem.appendChild(opt);
  });
}

/**
 * Main Function: Render all 12 Step Cards with Side-by-Side Code vs Console Log Output
 */
function renderStepByStepWalkthrough() {
  if (!stepsContainer) return;
  stepsContainer.innerHTML = '';

  let trackingArray = startWithArrayOfBooks();

  const requirementsList = [
    {
      reqId: 1,
      title: "1 Start with an array of books: ['Math', 'Science', 'English'].",
      desc: "Requirement 1: Initialize starting array.",
      code: "let books = ['Math', 'Science', 'English'];\nconsole.log('Initial books:', books);",
      action: () => {
        const res = startWithArrayOfBooks();
        return {
          consoleLog: `Initial books: ["Math", "Science", "English"]`,
          resultState: JSON.stringify(res),
          nextArray: res
        };
      }
    },
    {
      reqId: 2,
      title: "2 Add new books using push() and unshift().",
      desc: "Requirement 2: Add 'History' to end using push() and 'Art' to start using unshift().",
      code: "books.push('History');\nconsole.log('After push:', books);\nbooks.unshift('Art');\nconsole.log('After unshift:', books);",
      action: (arr) => {
        const res = addNewBooksUsingPushAndUnshift(arr);
        return {
          consoleLog: `After push('History'): ["Math", "Science", "English", "History"]\nAfter unshift('Art'): ["Art", "Math", "Science", "English", "History"]`,
          resultState: JSON.stringify(res),
          nextArray: res
        };
      }
    },
    {
      reqId: 3,
      title: "3 Remove books using pop() and shift().",
      desc: "Requirement 3: Remove last book using pop() and first book using shift().",
      code: "console.log('Popped:', books.pop());\nconsole.log('Shifted:', books.shift());\nconsole.log('Remaining:', books);",
      action: (arr) => {
        const res = removeBooksUsingPopAndShift(arr);
        return {
          consoleLog: `Popped: "History"\nShifted: "Art"\nRemaining: ${JSON.stringify(res.updatedList)}`,
          resultState: JSON.stringify(res.updatedList),
          nextArray: res.updatedList
        };
      }
    },
    {
      reqId: 4,
      title: "4 Delete a specific book using splice().",
      desc: "Requirement 4: Delete a specific book by specifying its index using splice().",
      code: "console.log('Current:', books);\nconst removed = books.splice(1, 1);\nconsole.log('Deleted:', removed);\nconsole.log('Updated:', books);",
      action: (arr) => {
        const res = deleteSpecificBookUsingSplice(arr, 1);
        return {
          consoleLog: `Current: ${JSON.stringify(arr)}\nDeleted item at index 1: "${res.deletedBook}"\nReturned array: ${JSON.stringify(res.removedArray)}\nUpdated: ${JSON.stringify(res.updatedList)}`,
          resultState: JSON.stringify(res.updatedList),
          nextArray: res.updatedList
        };
      },
      isSpliceCard: true
    },
    {
      reqId: 5,
      title: "5 Merge arrays of new arrivals using concat().",
      desc: "Requirement 5: Merge new arrivals ['Physics', 'Chemistry'] with current array using concat().",
      code: "const arrivals = ['Physics', 'Chemistry'];\nconst merged = books.concat(arrivals);\nconsole.log('Merged Array:', merged);",
      action: (arr) => {
        const res = mergeArraysOfNewArrivalsUsingConcat(arr);
        return {
          consoleLog: `Merged Array: ${JSON.stringify(res)}\n(Original array remains: ${JSON.stringify(arr)})`,
          resultState: JSON.stringify(res),
          nextArray: arr
        };
      }
    },
    {
      reqId: 6,
      title: "6 Copy a part of the book list inside the same array using copyWithin().",
      desc: "Requirement 6: Copy element at index 1 to index 0 using copyWithin(0, 1, 2).",
      code: "books.copyWithin(0, 1, 2);\nconsole.log('After copyWithin:', books);",
      action: (arr) => {
        const res = copyPartofBookListUsingCopyWithin(arr);
        return {
          consoleLog: `After copyWithin(0, 1, 2): ${JSON.stringify(res)}`,
          resultState: JSON.stringify(res),
          nextArray: res
        };
      }
    },
    {
      reqId: 7,
      title: "7 Flatten a nested array of categories using flat().",
      desc: "Requirement 7: Flatten nested categories array [['Math', 'Science'], ['History', ['Art', 'Music']]] using flat(2).",
      code: "const categories = [['Math', 'Science'], ['History', ['Art', 'Music']]];\nconsole.log('Flat(2):', categories.flat(2));",
      action: (arr) => {
        const res = flattenNestedArrayOfCategoriesUsingFlat();
        return {
          consoleLog: `Flat(2) Categories: ${JSON.stringify(res)}`,
          resultState: JSON.stringify(res),
          nextArray: arr
        };
      }
    },
    {
      reqId: 8,
      title: "8 Use slice() to create a small section of books for display.",
      desc: "Requirement 8: Extract a section (first 2 books) using slice(0, 2) without mutating array.",
      code: "const displaySection = books.slice(0, 2);\nconsole.log('Display Section:', displaySection);",
      action: (arr) => {
        const res = useSliceToCreateSmallSectionOfBooksForDisplay(arr, 0, 2);
        return {
          consoleLog: `Display Section (slice 0..2): ${JSON.stringify(res)}`,
          resultState: JSON.stringify(res),
          nextArray: arr
        };
      }
    },
    {
      reqId: 9,
      title: "9 Use toString() and join() to show the book list as a string with different separators.",
      desc: "Requirement 9: Convert array using toString() and join() with separators.",
      code: "console.log('toString():', books.toString());\nconsole.log('join(\" | \"):', books.join(' | '));\nconsole.log('join(\" - \"):', books.join(' - '));",
      action: (arr) => {
        const res = useToStringAndJoinToShowBookListAsString(arr);
        return {
          consoleLog: `toString(): "${res.toStringVal}"\njoin(' | '): "${res.joinPipeVal}"\njoin(' - '): "${res.joinDashVal}"`,
          resultState: `toString(): "${res.toStringVal}"\njoin(' | '): "${res.joinPipeVal}"`,
          nextArray: arr
        };
      }
    },
    {
      reqId: 10,
      title: "10 Find the total number of books using length.",
      desc: "Requirement 10: Find total book count using length property.",
      code: "console.log('Total books length:', books.length);",
      action: (arr) => {
        const res = findTotalNumberOfBooksUsingLength(arr);
        return {
          consoleLog: `Total books length: ${res}`,
          resultState: `books.length = ${res}`,
          nextArray: arr
        };
      }
    },
    {
      reqId: 11,
      title: "11 Replace/update a book in the list by directly changing its index.",
      desc: "Requirement 11: Directly update book by changing index: books[1] = 'Computer Science'.",
      code: "books[1] = 'Computer Science';\nconsole.log('Updated books:', books);",
      action: (arr) => {
        const res = replaceUpdateBookInListByDirectlyChangingIndex(arr, 1, 'Computer Science');
        return {
          consoleLog: `Updated index 1 to 'Computer Science'\nbooks = ${JSON.stringify(res)}`,
          resultState: JSON.stringify(res),
          nextArray: res
        };
      }
    },
    {
      reqId: 12,
      title: "12 Use forEach() to display all books with their positions.",
      desc: "Requirement 12: Iterate through books using forEach() to display positions.",
      code: "books.forEach((book, index) => {\n  console.log(`Position #${index + 1}: ${book}`);\n});",
      action: (arr) => {
        const res = useForEachToDisplayAllBooksWithPositions(arr);
        return {
          consoleLog: res.join('\n'),
          resultState: JSON.stringify(res),
          nextArray: arr
        };
      }
    }
  ];

  requirementsList.forEach((req) => {
    const card = document.createElement('div');
    card.className = 'step-card';

    const stepData = req.action(trackingArray);
    trackingArray = [...stepData.nextArray];

    if (req.isSpliceCard) {
      card.innerHTML = `
        <div class="step-header">
          <div class="step-title">${req.title}</div>
          <span class="step-tag">Requirement ${req.reqId}</span>
        </div>
        <div class="step-desc">${req.desc}</div>
        
        <div class="step-card-grid">
          <!-- Left Column: Code & Interactive Splice Controls -->
          <div class="step-left-col">
            <div class="code-box">${req.code}</div>
            
            <div class="splice-inspection-box">
              <div class="inspection-header">Current Array Elements & Index Map:</div>
              <div id="step4-index-map" class="index-list"></div>
              
              <div class="splice-interactive-controls mt-2">
                <div class="control-field">
                  <label for="step4-splice-select">Select Index:</label>
                  <select id="step4-splice-select"></select>
                </div>
                <button id="btn-step4-splice" class="btn btn-small">splice(index, 1)</button>
              </div>
            </div>
          </div>

          <!-- Right Column: Real-Time Console Log Box & Result State -->
          <div class="step-right-col">
            <div class="step-console-box">
              <div class="console-box-label">▶ Real-Time console.log Output:</div>
              <div id="step4-console-text" class="console-output-text">${stepData.consoleLog}</div>
            </div>

            <div class="result-box">
              <span class="result-label">Updated Array State:</span>
              <div id="step4-result-text" class="result-value">${stepData.resultState}</div>
            </div>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="step-header">
          <div class="step-title">${req.title}</div>
          <span class="step-tag">Requirement ${req.reqId}</span>
        </div>
        <div class="step-desc">${req.desc}</div>

        <div class="step-card-grid">
          <!-- Left Column: Code Snippet -->
          <div class="step-left-col">
            <div class="code-box">${req.code}</div>
          </div>

          <!-- Right Column: Side-by-Side Console Output & Result State -->
          <div class="step-right-col">
            <div class="step-console-box">
              <div class="console-box-label">▶ Real-Time console.log Output:</div>
              <div class="console-output-text">${stepData.consoleLog}</div>
            </div>

            <div class="result-box">
              <span class="result-label">Updated Array State:</span>
              <div class="result-value">${stepData.resultState}</div>
            </div>
          </div>
        </div>
      `;
    }

    stepsContainer.appendChild(card);
    logConsole(`Requirement ${req.reqId}: ${stepData.consoleLog.replace(/\n/g, ' | ')}`);
  });

  books = [...trackingArray];
  renderBookshelf();

  // Attach Step 4 interactive splice handler
  const btnSplice4 = document.getElementById('btn-step4-splice');
  if (btnSplice4) {
    btnSplice4.addEventListener('click', () => {
      const selectElem = document.getElementById('step4-splice-select');
      const idx = parseInt(selectElem.value);
      if (!isNaN(idx) && idx >= 0 && idx < books.length) {
        const targetBook = books[idx];
        const res = deleteSpecificBookUsingSplice(books, idx);
        books = res.updatedList;
        renderBookshelf();

        const consoleText = document.getElementById('step4-console-text');
        const resText = document.getElementById('step4-result-text');

        if (consoleText) {
          consoleText.textContent = `Deleted item at index ${idx}: "${targetBook}"\nReturned array: ${JSON.stringify(res.removedArray)}\nUpdated Array: ${JSON.stringify(books)}`;
        }
        if (resText) {
          resText.textContent = JSON.stringify(books);
        }
        logConsole(`Requirement 4: Deleted "${targetBook}" at index ${idx}`);
      }
    });
  }
}

function initPlayground() {
  document.getElementById('pg-push').addEventListener('click', () => {
    const val = document.getElementById('input-add-book').value.trim() || 'New Book';
    books.push(val);
    renderBookshelf();
    playgroundOutputContent.textContent = `console.log(books.push('${val}'));\nconsole.log(books);\nOutput: ${JSON.stringify(books)}`;
    logConsole(`Playground Req 2: push('${val}')`);
  });

  document.getElementById('pg-unshift').addEventListener('click', () => {
    const val = document.getElementById('input-add-book').value.trim() || 'First Book';
    books.unshift(val);
    renderBookshelf();
    playgroundOutputContent.textContent = `console.log(books.unshift('${val}'));\nconsole.log(books);\nOutput: ${JSON.stringify(books)}`;
    logConsole(`Playground Req 2: unshift('${val}')`);
  });

  document.getElementById('pg-pop').addEventListener('click', () => {
    if (books.length === 0) return;
    const popped = books.pop();
    renderBookshelf();
    playgroundOutputContent.textContent = `console.log('Popped:', '${popped}');\nconsole.log('Remaining:', ${JSON.stringify(books)});`;
    logConsole(`Playground Req 3: pop() removed "${popped}"`);
  });

  document.getElementById('pg-shift').addEventListener('click', () => {
    if (books.length === 0) return;
    const shifted = books.shift();
    renderBookshelf();
    playgroundOutputContent.textContent = `console.log('Shifted:', '${shifted}');\nconsole.log('Remaining:', ${JSON.stringify(books)});`;
    logConsole(`Playground Req 3: shift() removed "${shifted}"`);
  });

  document.getElementById('pg-splice').addEventListener('click', () => {
    const idx = parseInt(document.getElementById('input-splice-idx').value) || 0;
    const count = parseInt(document.getElementById('input-splice-count').value) || 1;
    if (idx >= 0 && idx < books.length) {
      const targetTitle = books[idx];
      const res = deleteSpecificBookUsingSplice(books, idx);
      books = res.updatedList;
      renderBookshelf();
      playgroundOutputContent.textContent = `console.log('Deleted:', '${targetTitle}');\nconsole.log('Updated books:', ${JSON.stringify(books)});`;
      logConsole(`Playground Req 4: splice(${idx}, ${count}) deleted "${targetTitle}"`);
    } else {
      playgroundOutputContent.textContent = `splice(${idx}, ${count}) -> Index out of bounds`;
    }
  });

  document.getElementById('pg-concat').addEventListener('click', () => {
    const merged = mergeArraysOfNewArrivalsUsingConcat(books, ['Physics', 'Chemistry']);
    playgroundOutputContent.textContent = `console.log('Merged:', ${JSON.stringify(merged)});`;
    logConsole(`Playground Req 5: concat()`);
  });

  document.getElementById('pg-copywithin').addEventListener('click', () => {
    if (books.length >= 2) {
      books = copyPartofBookListUsingCopyWithin(books);
      renderBookshelf();
      playgroundOutputContent.textContent = `console.log('After copyWithin:', ${JSON.stringify(books)});`;
      logConsole(`Playground Req 6: copyWithin(0, 1, 2)`);
    }
  });

  document.getElementById('pg-flat').addEventListener('click', () => {
    const nested = [['Math', 'Science'], ['History', ['Art', 'Music']]];
    const res = flattenNestedArrayOfCategoriesUsingFlat(nested);
    playgroundOutputContent.textContent = `console.log('Flat Categories:', ${JSON.stringify(res)});`;
    logConsole(`Playground Req 7: flat(2)`);
  });

  document.getElementById('pg-slice').addEventListener('click', () => {
    const sliced = useSliceToCreateSmallSectionOfBooksForDisplay(books, 0, 2);
    playgroundOutputContent.textContent = `console.log('Slice(0, 2):', ${JSON.stringify(sliced)});`;
    logConsole(`Playground Req 8: slice(0, 2)`);
  });

  document.getElementById('pg-join').addEventListener('click', () => {
    const sep = document.getElementById('input-join-sep').value || ', ';
    const res = books.join(sep);
    playgroundOutputContent.textContent = `console.log('join("${sep}"):', "${res}");`;
    logConsole(`Playground Req 9: join('${sep}')`);
  });

  document.getElementById('pg-tostring').addEventListener('click', () => {
    const res = useToStringAndJoinToShowBookListAsString(books);
    playgroundOutputContent.textContent = `console.log('toString():', "${res.toStringVal}");`;
    logConsole(`Playground Req 9: toString()`);
  });

  document.getElementById('pg-length').addEventListener('click', () => {
    const count = findTotalNumberOfBooksUsingLength(books);
    playgroundOutputContent.textContent = `console.log('books.length:', ${count});`;
    logConsole(`Playground Req 10: length = ${count}`);
  });

  document.getElementById('pg-index-update').addEventListener('click', () => {
    const idx = parseInt(document.getElementById('input-update-idx').value) || 0;
    const val = document.getElementById('input-update-val').value.trim() || 'Updated Book';
    const oldTitle = books[idx];
    books = replaceUpdateBookInListByDirectlyChangingIndex(books, idx, val);
    renderBookshelf();
    playgroundOutputContent.textContent = `console.log('books[${idx}] = "${val}"');\nconsole.log('Updated Array:', ${JSON.stringify(books)});`;
    logConsole(`Playground Req 11: books[${idx}] = '${val}'`);
  });

  document.getElementById('pg-foreach').addEventListener('click', () => {
    const positionList = useForEachToDisplayAllBooksWithPositions(books);
    playgroundOutputContent.textContent = positionList.map(p => `console.log('${p}');`).join('\n');
    logConsole(`Playground Req 12: forEach() output ${positionList.length} items`);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    books = startWithArrayOfBooks();
    renderBookshelf();
    playgroundOutputContent.textContent = 'books = ["Math", "Science", "English"];';
    logConsole('Reset array to initial state: ["Math", "Science", "English"]');
  });

  document.getElementById('btn-run-all').addEventListener('click', () => {
    renderStepByStepWalkthrough();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStepByStepWalkthrough();
  initPlayground();
  logConsole('Online Bookstore Array Management Engine Initialized (Side-by-Side Real-Time Console Output)');
});
