import React, { useState } from "react";
import "./App.css";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const searchCountry = async () => {
    if (!countryName.trim()) {
      setError("Please enter a country name.");
      setCountries([]);
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!response.ok) {
        throw new Error("Country not found!");
      }
      const data = await response.json();
      setCountries(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setCountries([]);
    }
  };

  return (
    <div className="App">
      <h1>Country Informations</h1>

      <div className="search-section">
        <input
          type="search"
          placeholder="Type a Country..."
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <button onClick={searchCountry}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="card-body">
        {countries.map((country, index) => (
          <div className="country-card" key={index}>
            <img src={country.flags.png} alt={country.name.common} className="flag-img" />
            <p><strong>Name:</strong> {country.name.common}</p>
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
