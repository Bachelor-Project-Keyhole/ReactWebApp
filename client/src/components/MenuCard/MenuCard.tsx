import * as React from 'react'
import { useState } from 'react'

export interface MenuCardProps {
  title: string
  lastModified?: string
  description?: string
  imagePath?: string // Add imagePath prop
  nextPageUrl?: string
  onClick?: () => void
}

const MenuCard: React.FC<MenuCardProps> = ({ title, lastModified, description, imagePath, nextPageUrl, onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const handleCardClick = () => {
    if (onClick != null) {
      onClick()
    }
  }

  const titleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px'
  }

  const descriptionStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#777'
  }

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    height: '300px', // Adjust the height as per your requirement
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ccc', // Replace with desired grey-ish color
    margin: '10px',
    transition: 'transform 0.3s',
    cursor: 'pointer',
    transform: hovered ? 'scale(1.1)' : 'scale(1)'
  }

  return (
    <a href={nextPageUrl} style={{ textDecoration: 'none' }}>
      <div style={cardStyles} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} onClick={handleCardClick}>
        {imagePath && <img src={imagePath} alt={title} style={{ marginBottom: '16px', width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />}
        <h3 style={titleStyles}>{title}</h3>
        <p style={descriptionStyles}>{lastModified}</p>
        <p style={descriptionStyles}>{description}</p>
      </div>
    </a>
  )
}

export default MenuCard
