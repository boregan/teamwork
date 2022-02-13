import "./App.scss";
import { useEffect, useState } from "react";

import People from "./components/People";
import Header from "./components/Header";

function App() {
  const [people, setPeople] = useState([]);
  const [homeworld, setHomeworld] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let pages = [];

      // Get all pages of people from swapi.dev
      for (let i = 1; i <= 7; i++) {
        const response = await fetch(`https://swapi.dev/api/people/?page=${i}`);
        const data = await response.json();
        pages.push(data);
      }

      // Get all people from all pages
      const people = [].concat(...pages.map((page) => page.results));

      // Get all homeworlds from all people
      const homeworlds = people.map(async (person) => {
        const response = await fetch(person.homeworld);
        const data = await response.json();
        return data.name;
      });

      // Wait until all homeworlds are fetched
      Promise.all(homeworlds).then((homeworlds) => {
        setHomeworld(homeworlds);
      });

      // Convert all dates to readable format
      people.forEach((person) => {
        person.created = new Date(person.created).toDateString();
        person.edited = new Date(person.edited).toDateString();
      });

      // Some people's mass is unknown, so we set it to 0
      people.forEach((person) => {
        if (person.mass === "unknown") {
          person.mass = 0;
        }
      });

      setPeople(people);
      setLoading(false);
    };

    fetchData();
  }, [people]);

  // Filter people by name
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filterPeople = (people, filter) => {
    return people.filter((person) => {
      return person.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div className="App">
      <Header filter={filter} handleFilter={handleFilter} />

      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <People people={filterPeople(people, filter)} homeworld={homeworld} />
        </>
      )}
    </div>
  );
}

export default App;
