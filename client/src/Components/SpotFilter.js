import React, { useState } from 'react'
import '../Styles/spotfilter.min.css'

function SpotFilter({filterRating, handleFilterRating, terrainsChecked, handleTerrainsChecked}) {
  const [filterOpen, setFilterOpen] = useState(true)
  const terrains = ["flat_bar", "handrail", "manual_pad", "gap", "ledge", "transition", "bank", "stairs"]

  return (
    <div className="spot_filter_container">
      <button className="spot_filter_switch" onClick={() => setFilterOpen(!filterOpen)}>{filterOpen? "-" : "+" }</button>
      <h3 className="spot_filter_title">Filter spots</h3>
      {filterOpen &&
      <div className="spot_filters">
        <div className="rating_filter_container">
          <label htmlFor="rating_filter" className="rating_title">Rating:</label>
          <select id="rating_filter" value={filterRating} onChange={handleFilterRating}>
            <option value="0">All</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
        </div>
        <div className="terrain_filter_container">
          <label className="terrain_title">Terrain:</label>
            {terrains.map((terrain) => {
              const label = terrain.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
              return (
                <label key={label}>
                  <input
                    type="checkbox"
                    checked={terrainsChecked.includes(terrain)}
                    onChange={handleTerrainsChecked}
                    value={terrain}
                    className="terrain_checkbox"
                  />{label}
                </label>
              )
            })}
        </div>
      </div>
      }
    </div>
  )
}

export default SpotFilter