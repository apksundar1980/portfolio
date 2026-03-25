import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="app">
      <Hero activeTab={activeTab} onTabChange={setActiveTab} />
      <Footer />
    </div>
  )
}

export default App
