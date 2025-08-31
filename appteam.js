// Team Radar Data Loading
const xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://datamb.football/database/TEAM/teamradars.csv', false);
xhr2.send(null);

const inputLines = xhr2.responseText;
const outputLines = [];

// Split input into lines
const lines = inputLines.trim().split('\n');

// Process each line
for (const line of lines) {
    // Split the line by comma
    const parts = line.split(',');
    
    // Extract the desired fields
    const name = parts[1];
    const age = parts[3];
    const club = parts[2];
    
    // Create the formatted string
    const outputLine = `${name},${age},${club}`;
    
    // Add the formatted string to the output array
    outputLines.push(outputLine);
}

const names = outputLines;
const searchInput = document.getElementById('searchInput1');
      searchInput.setAttribute("autocomplete", "off");
 const matchingNamesContainer = document.getElementById("matchingNames");
const searchButton = document.getElementById("searchButton1");


function updateMatchingNames() {
    if (searchInput.value.trim() === "") {
        matchingNamesContainer.style.display = "none";
        return;
    }
    const searchQuery = removeSpecialChars(searchInput.value.toLowerCase());
    const matchingNames = names.filter(function(name) {
        const [fullName] = name.split(",");
        const normalizedName = removeSpecialChars(fullName.toLowerCase());
        return normalizedName.includes(searchQuery);
    });

    matchingNamesContainer.innerHTML = "";

    matchingNames.forEach(function(name) {
        const [fullName, team, age] = name.split(",");

        const nameElement = document.createElement("div");
        nameElement.classList.add("name");

        const fullNameElement = document.createElement("span");
        fullNameElement.textContent = fullName;
        fullNameElement.classList.add("fullName");
        nameElement.appendChild(fullNameElement);

        const ageElement = document.createElement("span");
        ageElement.textContent = " (" + team + ",";
        ageElement.classList.add("age");
        nameElement.appendChild(ageElement);

        const teamElement = document.createElement("span");
        teamElement.textContent = " " + age + ")";
        teamElement.classList.add("team");
        nameElement.appendChild(teamElement);

        nameElement.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const clickedElement = event.target.closest(".name");
            if (clickedElement) {
                const fullName = clickedElement.querySelector(".fullName").textContent;
                const age = clickedElement.querySelector(".age").textContent.trim();
                const team = clickedElement.querySelector(".team").textContent.trim().replace(/[^a-zA-Z\s]/g, '');
                const searchQuery = fullName + "," + age.substring(1, age.length - 1) + "," + team;
                
                searchInput.value = searchQuery;
                searchButton1.click();
            }
        });

        nameElement.addEventListener("touchstart", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const clickedElement = event.target.closest(".name");
            if (clickedElement) {
                const fullName = clickedElement.querySelector(".fullName").textContent;
                const age = clickedElement.querySelector(".age").textContent.trim();
                const team = clickedElement.querySelector(".team").textContent.trim().replace(/[^a-zA-Z\s]/g, '');
                const searchQuery = fullName + "," + age.substring(1, age.length - 1) + "," + team;
                
                searchInput.value = searchQuery;
                searchButton1.click();
            }
        }, {passive: false});

        matchingNamesContainer.appendChild(nameElement);
    });

    if (searchQuery === "" && matchingNames.length === 0) {
        matchingNamesContainer.style.display = "none";
    } else {
        matchingNamesContainer.style.display = "block";
        matchingNamesContainer.style.padding = "8px";
        matchingNamesContainer.style.position = "relative";
        matchingNamesContainer.style.left = "13.3px";
        matchingNamesContainer.style.zIndex = "9999";
        matchingNamesContainer.style.width = "377px";
        matchingNamesContainer.style.maxHeight = "267px";
        matchingNamesContainer.style.overflowY = "auto";
        matchingNamesContainer.style.border = "1px solid #e0e0e0";
    }

}

searchInput.addEventListener("input", updateMatchingNames);
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchButton1.click();
    } else if (event.key === "Backspace") {
        updateMatchingNames();
    }
});

// Team data processing
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://datamb.football/database/TEAM/teamradars.csv', false);
xhr.send(null);

const csvData = xhr.responseText;
let dataArray = csvData.trim().split('\n').map(line => line.split(','));

// Utility functions
function calculateEuclideanDifference(data1, data2) {
    let difference = 0;
    for (let i = 4; i <= 10; i++) {
        const metric1 = parseFloat(data1[i]);
        const metric2 = parseFloat(data2[i]);
        difference += Math.pow(metric1 - metric2, 2);
    }
    return Math.sqrt(difference);
}

const colorClasses = ['result-color-1', 'result-color-2', 'result-color-3', 'result-color-4', 'result-color-5', 'result-color-6', 'result-color-7', 'result-color-8', 'result-color-9', 'result-color-10', 'result-color-11', 'result-color-12', 'result-color-13', 'result-color-14', 'result-color-15', 'result-color-16', 'result-color-17', 'result-color-18', 'result-color-19', 'result-color-20', 'result-color-21', 'result-color-22', 'result-color-23', 'result-color-24', 'result-color-25', 'result-color-26', 'result-color-27', 'result-color-28', 'result-color-29', 'result-color-30', 'result-color-31', 'result-color-32', 'result-color-33', 'result-color-34', 'result-color-35', 'result-color-36', 'result-color-37'];

let searchResults = [];
function removeSpecialChars(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f\s]/g, '')  // This already removes spaces with \s
        .replace(/Ø/g, 'O')
        .replace(/ø/g, 'o')
        .replace(/ı/g, 'i')
        .replace(/ł/g, 'l')              // Added support for ł -> l
        .replace(/Ł/g, 'L')              // Added support for Ł -> L
        .replace(/[^\w]/g, '');          // Remove punctuation (no \s needed since spaces already removed)
}

function search(query) {
  const queryParts = query.split(',').map(part => part.trim()); // Split the query by commas and trim whitespace
  const name = queryParts[0]; // Extract the name part
  let age, team;

  // Extract age and team if they exist
  if (queryParts.length > 1) {
    age = queryParts[1].trim(); // Trim any leading or trailing spaces
    if (queryParts.length > 2) {
      team = queryParts[2].trim(); // Trim any leading or trailing spaces
    }
  }

  // First, look for an exact match with all provided criteria
  if (name && age && team) {
    const exactMatch = dataArray.find(data => 
      data[1].toLowerCase() === name.toLowerCase() && 
      data[3].toLowerCase() === age.toLowerCase() &&
      data[2].toLowerCase() === team.toLowerCase()
    );
    
    if (exactMatch) {
      return [exactMatch];
    }
  }
  
  // If no exact match with all criteria, try name and age
  if (name && age) {
    const nameAgeMatch = dataArray.find(data => 
      data[1].toLowerCase() === name.toLowerCase() && 
      data[3].toLowerCase() === age.toLowerCase()
    );
    
    if (nameAgeMatch) {
      return [nameAgeMatch];
    }
  }

  // Fall back to the previous filtering logic
  const results = dataArray.filter(data => {
    const normalizedName = removeSpecialChars(data[1].toLowerCase());
    const normalizedAge = data[3].trim().toLowerCase(); // Trim any leading or trailing spaces

    // Prioritize exact match first, fall back to includes for partial match
    const nameMatches = 
      removeSpecialChars(name.toLowerCase()) === normalizedName;  // Exact match only

    const ageMatches = !age || normalizedAge === removeSpecialChars(age.toLowerCase());

    return nameMatches && ageMatches;
  });

  // If no exact match was found, you can optionally search for partial matches as fallback
  if (results.length === 0) {
    const fallbackResults = dataArray.filter(data => {
      const normalizedName = removeSpecialChars(data[1].toLowerCase());
      const normalizedAge = data[3].trim().toLowerCase();
  
      const nameMatches = normalizedName.includes(removeSpecialChars(name.toLowerCase()));
      const ageMatches = !age || normalizedAge === removeSpecialChars(age.toLowerCase());

      return nameMatches && ageMatches;
    });
    return fallbackResults;
  }

  return results;
}

function createTable(teamName, teamIndex, color) {
    const resultsTable = document.getElementById('resultsTable');
    
    const headerNames = [
    ];
    
    // Check if table headers exist
    const headersExist = resultsTable.querySelector('th') !== null;
    
    const table = headersExist ? resultsTable.querySelector('table') : document.createElement('table');
    table.classList.add('metrics-table');
    
    if (!headersExist) {
    // Create the table header
    const headerRow = document.createElement('tr');
    for (let i = 1; i < headerNames.length; i++) {
    const th = document.createElement('th');
    th.textContent = headerNames[i];
    headerRow.appendChild(th);
    }
    // We don't need a separate header for the x button anymore
    table.appendChild(headerRow);
    }
    
    
    
    
         const teamData = dataArray[teamIndex];
     const dataRow = document.createElement('tr');
     dataRow.style.display = 'flex';
     dataRow.style.alignItems = 'center';
     dataRow.style.position = 'relative';
     // Store the team index directly in the row as a data attribute
     dataRow.setAttribute('data-team-index', teamIndex);
    
    // Create a container for player data
    const playerDataContainer = document.createElement('div');
    playerDataContainer.style.display = 'flex';
    playerDataContainer.style.alignItems = 'center';
    playerDataContainer.style.flexGrow = '1';
    
    for (let i = 1; i <= 11; i++) {
    if (i === 1 || i === 2 || i === 3) {
    const td = document.createElement('td');
    if (i === 3) {
    td.textContent = teamData[i];
    } else {
    td.textContent = teamData[i] + ',';
    }
    td.classList.add(color);
    playerDataContainer.appendChild(td);
    }
    }
    
    dataRow.appendChild(playerDataContainer);
    
    // Add a separate table cell for the "x" column
    const xCell = document.createElement('td');
    const xButton = document.createElement('button');
    xButton.textContent = 'x';
    xButton.classList.add('x-button');
    xCell.classList.add('x-cell');
    xButton.addEventListener('click', function () {
      dataRow.remove(); // Remove the corresponding row from the table
      const radarPolygons = document.querySelectorAll(`.radarPolygon.${color}`);
      const radarLines = document.querySelectorAll(`.radarLines.${color}`);
      const radarCircles = document.querySelectorAll(`.radarCircle.${color}`);
    
      radarPolygons.forEach((polygon) => polygon.remove());
      radarLines.forEach((line) => line.remove());
      radarCircles.forEach((circle) => circle.remove());
    
    
      const remainingDataRows = table.querySelectorAll('tr:not(:first-child)'); 
      if (remainingDataRows.length === 0) {
        table.remove(); 
      }
    
      const remainingRows = resultsTable.querySelectorAll('.metrics-table tr:not(:first-child)');
      
                    if (remainingRows.length > 0) {
           // Get the last team's index from the last row
           const lastRow = remainingRows[remainingRows.length - 1];
           const lastTeamIndex = lastRow.getAttribute('data-team-index');
           if (lastTeamIndex !== null) {
               const lastTeamData = dataArray[parseInt(lastTeamIndex)];
               if (lastTeamData) {
                   updateSimilarPlayers(lastTeamData);
               }
           }
       } else {
           // If no teams left, clear the similar players container
           const similarPlayersContainer = document.getElementById('similarPlayersContainer');
           if (similarPlayersContainer) {
               similarPlayersContainer.innerHTML = '';
           }
       }
    });
    
    xCell.appendChild(xButton);
    dataRow.appendChild(xCell);
    
    table.appendChild(dataRow);
    
    if (!headersExist) {
    resultsTable.appendChild(table);
    }
    
    const combResults = dataArray[teamIndex].join(', ');
    
    
    
    const outerRadius = 130;
    const center = [0, 0];
    const angles = [0, 2 * Math.PI / 7, 4 * Math.PI / 7, 6 * Math.PI / 7, 8 * Math.PI / 7, 10 * Math.PI / 7, 12 * Math.PI / 7];
    
    function axisValueToCartesian(axis, value) {
    let angle = angles[axis - 1];
    angle += (2 * Math.PI / 7) * 0.2;
    const x = 165 * value * Math.cos(angle);
    const y = 165 * value * Math.sin(angle);
    return { x, y };
    }
    
    const svg = document.querySelector('.radar');
    const radarWrapper = svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
    radarWrapper.setAttribute('transform', 'translate(0,0)');
    radarWrapper.innerHTML = '';
    
    const data = [];
    const rowCols = combResults.split(',');
    for (let i = 4; i < 11; i++) {
    data.push({ axis: i - 3, value: parseFloat(rowCols[i]) });
    }
    
    const points = data.map(({ axis, value }) => {
    const { x, y } = axisValueToCartesian(axis, value);
    return `${x},${y}`;
    }).join(' ');
    
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('class', `radarLines ${color}`); // Add the color class to the polyline
    polyline.setAttribute('points', `${points} ${points.split(' ')[0]}`);
    polyline.setAttribute('stroke-width', '3');
    polyline.setAttribute('fill', 'none');
    radarWrapper.appendChild(polyline);
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('class', `radarPolygon ${color}`); // Add the color class to the polygon
    polygon.setAttribute('points', points);
    polygon.style.fillOpacity = '0.2';
    radarWrapper.appendChild(polygon);
    
         data.forEach(({ axis, value }) => {
     const { x, y } = axisValueToCartesian(axis, value);
     const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
     circle.setAttribute('class', `radarCircle ${color}`); // Add the color class to the circle
     circle.style.fillOpacity = '0.86'; // Set the opacity to 1 (fully opaque)
     circle.setAttribute('r', '6');
     circle.setAttribute('cx', x);
     circle.setAttribute('cy', y);
     radarWrapper.appendChild(circle);
     });
     
     }
    
    
    function createTableForTeam1() {
    const searchInput = document.getElementById('searchInput1');
    const searchButton = document.getElementById('searchButton1');
    const resultsTable = document.getElementById('resultsTable');
    
    
    const teamNames = new Set(); // Keep track of unique team names
    
    const teamNamesList = document.createElement('ul');
    teamNamesList.style.fontFamily = 'Arial, sans-serif'; 
    teamNamesList.style.listStyleType = 'none'; // Remove the bullet points
    teamNamesList.style.paddingLeft = '9px'; // Adjust the padding to move it further left
    resultsTable.appendChild(teamNamesList);
    
    
    let searchCounter = 0; // Initialize search counter
    
    searchButton.addEventListener('click', function () {
    const searchQuery = searchInput.value;
    const results = search(searchQuery);
    
    if (results) {
    const teamId = parseInt(results[0]); // Parse the team ID from the results
    
    const teamName = results[1] + ' (' + results[2] + ', ' + results[3] + ')';
    const color = colorClasses[searchCounter % colorClasses.length]; // Get the color class based on the search counter
    
    if (!teamNames.has(teamName)) {
    
    const teamNameItem = document.createElement('li');
    teamNameItem.textContent = teamName;
    teamNameItem.classList.add(color); // Apply the color class to the team name
    
    
    createTable(teamName, teamId - 1, color); // Pass the team ID and color to createTable
    searchCounter++;
    
    }
    } 
    
    });
    
    
    }
    
    
    
    createTableForTeam1();
    
    
    
    let colorIndex = 0; // Initialize color index
    
    searchButton1.addEventListener("click", function() {
      const searchQuery = searchInput.value;
      const searchedPlayer = search(searchQuery);
    
      if (searchedPlayer.length > 0) {
          const searchedPlayerData = searchedPlayer[0];
          updateSimilarPlayers(searchedPlayerData);
          colorIndex++;
      }
    
      searchInput.value = '';
      updateMatchingNames();
    });

function updateSimilarPlayers(teamData) {
    const similarTeamsContainer = document.getElementById('similarPlayersContainer');
    if (!similarTeamsContainer) return;

    const searchedTeamIndex = parseInt(teamData[0]) - 1;
    const similarTeams = [];

    // Find the color class of the LAST team from their row in the table
    const teamRows = document.querySelectorAll('.metrics-table tr:not(:first-child)');
    let teamColor = '';
    if (teamRows.length > 0) {
        const lastTeamRow = teamRows[teamRows.length - 1];
        const lastTeamCell = lastTeamRow.querySelector('td:first-child');
        // Get all color classes from the element
        const classes = Array.from(lastTeamCell.classList);
        // Find the color class (starts with 'result-color-')
        teamColor = classes.find(cls => cls.startsWith('result-color-'));
    }

    for (let i = 0; i < dataArray.length; i++) {
        if (i !== searchedTeamIndex) {
            const difference = calculateEuclideanDifference(teamData, dataArray[i]);
            similarTeams.push({ index: i, difference: difference });
        }
    }

    similarTeams.sort((a, b) => a.difference - b.difference);
    const mostSimilarTeams = similarTeams.slice(0, 3);

    similarTeamsContainer.innerHTML = ''; // Clear existing content

    const similarTeamTable = document.createElement("table");
    similarTeamTable.classList.add("similar-table");

    const headerRow = document.createElement("tr");
    const headerCell = document.createElement("th");
    headerCell.setAttribute("colspan", "5");
    // Use the last team's color class instead of the first one
    headerCell.classList.add(teamColor || 'result-color-1');
    headerRow.appendChild(headerCell);
    similarTeamTable.appendChild(headerRow);

    // Use the exact teamData from the search to ensure consistency
    const teamName = teamData[1];
    const teamSeason = teamData[3];
    headerCell.classList.add("similar-text");
    headerCell.innerHTML = `<span data-i18n="similar.to">Similar data to</span> ${teamName}, ${teamSeason}`;

    const similarTeamRow = document.createElement("tr");

    for (let i = 0; i < mostSimilarTeams.length; i++) {
        const teamIndex = mostSimilarTeams[i].index;
        const similarTeamName = dataArray[teamIndex][1];
        const similarTeamSeason = dataArray[teamIndex][3];
        const similarTeamLeague = dataArray[teamIndex][2];      
        const teamCell = document.createElement("td");
        teamCell.textContent = similarTeamName + ", " + similarTeamSeason;
        teamCell.style.fontSize = "10.8px";
        teamCell.style.textDecoration = "underline";
        teamCell.style.cursor = "pointer";

        teamCell.addEventListener("click", function() {
            const searchInput = document.getElementById('searchInput1');
            const searchButton = document.getElementById('searchButton1');
            // Include the season and league to ensure we get the correct team
            searchInput.value = `${similarTeamName},${similarTeamSeason},${similarTeamLeague}`;
            searchButton.click();
        });

        similarTeamRow.appendChild(teamCell);
    }

    similarTeamTable.appendChild(similarTeamRow);
    similarTeamsContainer.appendChild(similarTeamTable);
}
