import React, { useState } from 'react'
import './Category.scss'

const Category = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onSelectCategory(category)
  }

  return (
    <div className="container">
      <div className="col-md-4 text-center category">
        <label className="category__label" htmlFor="categorySelect">
          Category:
        </label>
        <select
          id="categorySelect"
          name="category"
          className="category__select"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Shooter">Shooter</option>
          <option value="Racing">Racing</option>
          <option value="Sports">Sports</option>
          <option value="RPG">RPG</option>
          <option value="Fighting">Fighting</option>
          <option value="Strategy">Strategy</option>
          <option value="Horror">Horror</option>
          <option value="Platformer">Platformer</option>
          <option value="Educational">Educational</option>
          <option value="Simulation">Simulation</option>
          <option value="Role-Playing">Role-Playing</option>
        </select>
      </div>
    </div>
  )
}

export default Category
