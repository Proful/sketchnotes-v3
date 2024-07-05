import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react"

// Define the context type
interface GridOverlayContextType {
  showGrid: boolean
  toggleGrid: () => void
}

// Create a context with a default value
const GridOverlayContext = createContext<GridOverlayContextType | undefined>(
  undefined
)

// Define the provider props type
interface GridOverlayProviderProps {
  children: ReactNode
}

// Create a provider component
export const GridOverlayProvider: FC<GridOverlayProviderProps> = ({
  children,
}) => {
  const [showGrid, setShowGrid] = useState(false)

  const toggleGrid = () => {
    setShowGrid((prevShowGrid) => !prevShowGrid)
  }

  return (
    <GridOverlayContext.Provider value={{ showGrid, toggleGrid }}>
      {children}
      {showGrid && <GridOverlay />}
    </GridOverlayContext.Provider>
  )
}

// Custom hook to use the grid overlay context
export const useGridOverlay = (): GridOverlayContextType => {
  const context = useContext(GridOverlayContext)
  if (!context) {
    throw new Error("useGridOverlay must be used within a GridOverlayProvider")
  }
  return context
}

const GridOverlay: React.FC = () => {
  const numberOfColumns = 24
  const numberOfRows = 24

  // Calculate the grid styles
  const gridStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Ensure the grid doesn't block interaction with content
    zIndex: 9999, // Adjust the z-index to be on top of other content
  }

  // Calculate the column and row styles
  const columnStyle: React.CSSProperties = {
    height: "100%",
    width: `${100 / numberOfColumns}%`,
    borderRight: "1px solid rgba(0, 0, 0, 0.1)", // Adjust border styles as needed
  }

  const rowStyle: React.CSSProperties = {
    width: "100%",
    height: `${100 / numberOfRows}%`,
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Adjust border styles as needed
    display: "flex",
  }

  return (
    <div style={gridStyle}>
      {/* Render grid lines */}
      {[...Array(numberOfRows)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={rowStyle}>
          {[...Array(numberOfColumns)].map((_, colIndex) => (
            <div key={`col-${colIndex}`} style={columnStyle} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GridOverlay
