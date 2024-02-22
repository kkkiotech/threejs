
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, } from 'react'
import Experience from './Components/Experience'

function App() {

  const [enter, setEnter] = useState(false)
  return (
    <>
      <Canvas style={{ height: "100%" }} shadows camera={{ position: [0, 3, 8], fov: 45,far:40 }}>
        <Suspense >

          <Experience enter={enter} />


        </Suspense>

      </Canvas>
      <div style={{ width: "100%", position: "fixed", bottom: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p
          onClick={() => setEnter(!enter)}
          style={{
            opacity: 1,
            transition: "opacity 1s", // Specify the property and duration
            color: "white",
            background: "orange",
            padding: "10px 20px",
            borderRadius: 10,
            border: 1,
            cursor: "pointer"
          }}
        >
          {enter ? "Exit" : "Enter"}
        </p>
      </div>

    </>
  )
}

export default App
