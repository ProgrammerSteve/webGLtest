import Navbar from './components/navbav';
import './App.css'
import { useState} from 'react';
import PageSelector from './components/PageSelector';
import Sidebar from './components/sidebar';

export const demoList=[
  "3D Texture Demo",
  "2D Texture Demo",
  "Triangle Demo",
  "Glphy Atlas",
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
    <div className='bg-slate-300'>
      <Navbar page={page} handleSelection={handleSelection} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
      <PageSelector page={page}/>
    </div>
    {<Sidebar page={page} handleSelection={handleSelection} toggleSidebar={toggleSidebar} isOpen={isOpen}/>}
    </>
  );
}