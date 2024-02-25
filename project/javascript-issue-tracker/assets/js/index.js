const ISSUES = 'issues';


// const divTest = document.createElement('div'); // create element
// // add content
// divTest.innerHTML = `tony`
// // set attribute
// divTest.setAttribute('class', 'text-2xl text-center text-blue-500');
// divTest.style = 'color: red;';

// document.body.appendChild(divTest);

// mock data
let dataIssues = [];

// components
const issuesList = document.getElementById("issuesList");
const btnAdd = document.getElementById("btnAdd");
const btnSearch = document.getElementById("btnSearch");
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");

// call api fetch data

function initialData() {
  const access_token = window.sessionStorage.getItem('token');
  if(!access_token) {
    window.location.href = "./login.html";
    return;
  }

  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      getData(data.data);
    })
}

initialData();


function getData(dataSource) {
  const data = window.localStorage.getItem(ISSUES);
  if (data) {
    dataIssues = JSON.parse(data);
    renderIssue(dataIssues);
  } else {
    dataIssues = dataSource;
    saveDataToLocalStorage(dataIssues);
    renderIssue(dataIssues);
  }
}

function renderIssue(dataSource = []) {
  issuesList.innerHTML = "";

  // <div class="rounded overflow-hidden shadow-lg mb-4">
  //       <div class="px-6 py-4">
  //         <div class="font-bold text-xl mb-2 flex items-center bg-slate-400	">
  //           <div class="mr-2">Todo 670</div>
  //           <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
  //           </span> 
  //         </div>
  //         <p class="text-gray-700 text-base">
  //           Description 707
  //         </p>
  //       </div>
  //       <div class="px-6 pt-4 pb-2">
  //         <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            
  //         </span>
  //       </div>
  
  //       <div class="text-right px-6 py-4">
  //         <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200" onclick="closeIssue('6581918f5e145bf4862d7ead')">
  //           Close
  //         </button>
  //         <button class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-ripple-light="true" onclick="console.log('Issue ID:', '6581918f5e145bf4862d7ead'); deleteIssue('6581918f5e145bf4862d7ead')">
  //           Delete
  //         </button>
  //       </div>
  //     </div>


  dataSource.forEach((issue) => {
    const divIssue = document.createElement('div');
    divIssue.setAttribute('class', 'rounded overflow-hidden shadow-lg mb-4');

    // create header
    const divHeader = document.createElement('div');
    divHeader.setAttribute('class', 'px-6 py-4');

    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'font-bold text-xl mb-2 flex items-center bg-slate-400	');

    const divTitleText = document.createElement('div');
    divTitleText.setAttribute('class', 'mr-2');
    divTitleText.innerHTML = issue.title

    const spanStatus = document.createElement('span');
    spanStatus.setAttribute('class', 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700');
    spanStatus.innerHTML = issue.status === "closed" ? "Closed" : "Open"

    divTitle.appendChild(divTitleText);
    divTitle.appendChild(spanStatus);

    const pDescription = document.createElement('p');
    pDescription.setAttribute('class', 'text-gray-700 text-base');
    pDescription.innerHTML = issue.description

    // create button
    const divButton = document.createElement('div');
    divButton.setAttribute('class', 'text-right px-6 py-4');

    const btnClose = document.createElement('button');
    btnClose.setAttribute('type', 'button');
    btnClose.setAttribute('class', `${issue.status === "closed" ? 'bg-gray-200 opacity-70 cursor-not-allowed' : 'bg-white'} py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`)
    // btnClose.setAttribute('disabled', issue.status === "closed" ? true : false)
    btnClose.innerHTML = issue.status === "closed" ? "Closed" : "Open";
    btnClose.addEventListener('click', () => issue.status === "closed" ? () => {} : closeIssue(issue._id))

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('class', 'select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none');
    btnDelete.innerHTML = 'Delete';
    btnDelete.addEventListener('click', () => deleteIssue(issue._id));

    divButton.appendChild(btnClose);
    divButton.appendChild(btnDelete);

    // create content for title
    divHeader.appendChild(divTitle);
    divHeader.appendChild(pDescription);

    // append header to issue
    divIssue.appendChild(divHeader);
    divIssue.appendChild(divButton);

    // append content to issuesList
    issuesList.appendChild(divIssue);
    // issuesList.innerHTML += `
    //   <div class="rounded overflow-hidden shadow-lg mb-4">
    //     <div class="px-6 py-4">
    //       <div class="font-bold text-xl mb-2 flex items-center bg-slate-400	">
    //         <div class="mr-2">${issue.title}</div>
    //         <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
    //           ${issue.status === "closed" ? "Closed" : "Open"}
    //         </span> 
    //       </div>
    //       <p class="text-gray-700 text-base">
    //         ${issue.description}
    //       </p>
    //     </div>
    //     <div class="px-6 pt-4 pb-2">
    //       <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //         ${issue.author}
    //       </span>
    //     </div>
  
    //     <div class="text-right px-6 py-4">
    //       <button 
    //         type="button" 
    //         class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
    //         onclick="closeIssue('${issue._id}')"
    //       >
    //         Close
    //       </button>
    //       <button
    //         class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    //         type="button"
    //         data-ripple-light="true"
    //         onclick="console.log('Issue ID:', '${issue._id}'); deleteIssue('${issue._id}')"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    // `;
  });
  saveDataToLocalStorage(dataSource);
}

function saveDataToLocalStorage(data) {
  window.localStorage.setItem(ISSUES, JSON.stringify(data));
}

btnAdd.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;

  const issueItem = {
    data: {
      title,
      description,
      author: [author],
      severity: "open",
    }
  };

  fetch('https://tony-auth-express.vercel.app/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issueItem)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Added Issue ID:', data.data._id);
      const items = [...dataIssues, data.data];
      dataIssues = items;
      renderIssue(dataIssues)
    })
});

function deleteIssue(issueId) {
  const clonedIssues = [...dataIssues];
  fetch(`https://tony-auth-express.vercel.app/api/todo/${issueId}`, {
    method: 'DELETE'
  })
    .then(() => {
      const issuesFiltered = clonedIssues.filter(issue => issue._id !== issueId);
      dataIssues = issuesFiltered;
      renderIssue(dataIssues);
    })
}

btnSearch.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  const searchResults = searchByDescription(searchInput);
  renderIssue(searchResults);
});

function searchByDescription(description) {
  const searchTerm = description.toLowerCase();

  if (!searchTerm) {
    return dataIssues;
  }

  const searchResults = dataIssues.filter((issue) =>
    issue.description.toLowerCase().includes(searchTerm)
  );

  return searchResults;
}

async function closeIssue(issueId) {
  console.log("Issue ID:", issueId);
  // const clonedIssues = [...dataIssues];
  // const issueItem = clonedIssues.find((issue) => issue._id === issueId);

  // if(!issueItem) return;

  // const bodyData = {
  //   data: {
  //     ...issueItem,
  //     status: 'closed'
  //   }
  // }

  // const response = await fetch(`https://tony-auth-express.vercel.app/api/todo/${issueId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(bodyData)
  // })
  // const data = await response.json();
  // if(!data.isSucess) return;

  // const issuseStorage = JSON.parse(window.localStorage.getItem(ISSUES));
  // const issueIndex = issuseStorage.findIndex(issue => issue._id === issueId);
  // issuseStorage[issueIndex].status = 'closed';

  // // assign localstorage
  // window.localStorage.setItem(ISSUES, JSON.stringify(issuseStorage));

  // dataIssues = issuseStorage;
  // renderIssue(dataIssues);
}

btnAll.addEventListener("click", () => {
  renderFilteredIssues("all");
});

btnOpen.addEventListener("click", () => {
  renderFilteredIssues("open");
});

btnClose.addEventListener("click", () => {
  renderFilteredIssues("closed");
});

function renderFilteredIssues(severity) {
  const clonedIssues = [...dataIssues];

  const filteredIssues = severity === "all"
    ? clonedIssues
    : clonedIssues.filter(issue => issue.severity === severity);

  renderIssue(filteredIssues);
}

document.getElementById("orderBy").addEventListener("change", () => {
  const orderBy = document.getElementById("orderBy").value;
  sortIssuesByTitle(orderBy);
});

function sortIssuesByTitle(orderBy) {
  const clonedIssues = [...dataIssues];

  clonedIssues.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (orderBy === "asc") {
      return titleA.localeCompare(titleB);
    } else if (orderBy === "desc") {
      return titleB.localeCompare(titleA);
    }

    return 0;
  });

  renderIssue(clonedIssues);
}

function logOut() {
  window.location.href = "./login.html";
}
