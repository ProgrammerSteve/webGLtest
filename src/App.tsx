import Navbar from './components/navbav';
import './App.css'
import { useState} from 'react';
import PageSelector from './components/PageSelector';
import Sidebar from './components/sidebar';

export const demoList=[
  "Triangle Demo",
  "Glphy Atlas",
  "2D Texture Demo",
  "3D Texture Demo",
  "Motion Demo",
  "Image Filter Demo",
]

export default function App() {
  const [page,setPage]=useState<string>(demoList[0])
  const [isOpen,setIsOpen]=useState<boolean>(false)
  const toggleSidebar=()=>{
    setIsOpen(!isOpen)
  }
  const handleSelection=(page:string)=>{
      setPage(page)
  }
  return (
    <>
    <div>
      <Navbar page={page} handleSelection={handleSelection} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      <PageSelector page={page}/>
    </div>
    {isOpen && <Sidebar page={page} handleSelection={handleSelection} toggleSidebar={toggleSidebar} isOpen={isOpen}/>}
    </>
  );
}