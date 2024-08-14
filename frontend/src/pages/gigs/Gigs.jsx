import React, { useRef, useState, useEffect } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigs, setGigs] = useState([]); // All gigs fetched from the backend
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [category, setCategory] = useState("All"); // State for category filter
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(() => {
    // Fetch all services from the backend
    const fetchGigs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/services/all");
        setGigs(response.data);
        setFilteredGigs(response.data); // Initially display all gigs
      } catch (error) {
        console.error("Failed to fetch gigs", error);
      }
    };

    fetchGigs();
  }, []);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    const min = minRef.current.value ? parseInt(minRef.current.value) : 0;
    const max = maxRef.current.value ? parseInt(maxRef.current.value) : Infinity;
    let filtered = gigs.filter(
      (gig) =>
        gig.price >= min &&
        gig.price <= max &&
        (category === "All" || gig.category === category) // Filter by category
    );

    sortGigs(filtered);
  };

  const sortGigs = (gigsToSort) => {
    const sortedGigs = [...gigsToSort].sort((a, b) => {
      if (sort === "sales") {
        return b.sales - a.sales;
      } else if (sort === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return 0;
      }
    });
    setFilteredGigs(sortedGigs);
  };

  useEffect(() => {
    apply(); // Re-apply filtering and sorting when category or sort changes
  }, [sort, category]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">All Services</span>
        <h1>Explore</h1>
        <p> the boundaries of freelancing.</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Category</span>
            <span className="sortType">{category}</span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span
                  onClick={() => {
                    setCategory("All");
                    setSort("sales"); // Reset sort when "All" is selected
                  }}
                >
                  All
                </span>
                <span onClick={() => setCategory("Technical")}>Technical</span>
                <span onClick={() => setCategory("Non-Technical")}>
                  Non-Technical
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
