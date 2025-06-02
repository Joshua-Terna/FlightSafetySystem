document.getElementById('incidentForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;
    const location = document.getElementById('location').value;
    const reported_at = document.getElementById('reported_at')
  
    fetch('http://localhost:5000/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, description, severity, location })
    })
    .then(response => response.json())
    .then(data => {
      alert('Incident reported successfully');
      loadIncidents();  // Reload incidents list
    })
    .catch(error => console.error('Error:', error));
  });
  
  // Function to load all incidents
  function loadIncidents() {
    fetch('http://localhost:5000/api/incidents')
      .then(response => response.json())
      .then(incidents => {
        const incidentList = document.getElementById('incidentList');
        incidentList.innerHTML = '';  // Clear current list
        incidents.forEach(incident => {
          const li = document.createElement('li');
          li.textContent = `Type: ${incident.type}, Severity: ${incident.severity}, Location: ${incident.location}`;
          incidentList.appendChild(li);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Load incidents when the page loads
  window.onload = loadIncidents;
  