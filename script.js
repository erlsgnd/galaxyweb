function showPlanet(planetId) {
    const planets = document.querySelectorAll('.planet-card');
    planets.forEach(p => p.style.display = 'none');

    const selected = document.getElementById(planetId);
    if(selected) selected.style.display = 'block';
}

// Tampilkan planet pertama saat load
showPlanet('mercury');