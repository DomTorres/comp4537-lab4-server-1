const API_BASE_URL = 'https://lab-4-server-2-ckc9d9fgdggcbhc8.canadaeast-01.azurewebsites.net';

document.getElementById('insertBtn').addEventListener('click', async () => {
    const responseDiv = document.getElementById('insertResponse')

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/v1/sql/patients`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
            responseDiv.textContent = `Success: ${response.response}`;
        } else {
            responseDiv.textContent = `Error: ${response.error}`;
        }
    }

    xhr.onerror = function() {
        responseDiv.textContent = 'Network error';
    }

    xhr.send();
});

document.getElementById('queryBtn').addEventListener('click', async () => {
    const sqlQuery = document.getElementById('sqlQuery').value.trim(); 
    const responseDiv = document.getElementById('queryResponse')
    
    const xhr = new XMLHttpRequest();
    const encodedSQLQuery = encodeURIComponent(sqlQuery);
    xhr.open('GET', `${API_BASE_URL}/api/v1/sql/patients/${encodedSQLQuery}`, true);

    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
            let html = '<table>';
            
            // Table headers (get keys from first row)
            html += '<tr>';
            for (const key in response.data[0]) {
                html += `<th>${key}</th>`;
            }
            html += '</tr>';
            
            // Table rows
            for (const row of response.data) {
                html += '<tr>';
                for (const key in row) {
                    html += `<td>${row[key]}</td>`;
                }
                html += '</tr>';
            }
            
            html += '</table>';

            responseDiv.innerHTML = html;
        } else {
            responseDiv.textContent = `Error: ${response.error}`;
        }
    }

    xhr.onerror = function() {
        responseDiv.textContent = 'Network error';
    }
    
    xhr.send();
});