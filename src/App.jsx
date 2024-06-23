import { useState , useCallback ,useEffect , useRef} from 'react'
import './index.css'

function App() {
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [length , setLength] = useState(8);
  const [password , setPassword] = useState("");
  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numberAllowed,setPassword])
  
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = (e)=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }
  const passwordGenerator = ()=> {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(charAllowed) str+="!@#$%^&*()-+<>?[]{}";
    if(numberAllowed) str+="0123456789";

    for(let i=0; i<length ; i++){
      pass = pass+ str.charAt(Math.floor(Math.random()*(str.length)+1));
    }
    setPassword(pass);
  };
  return (
    <>
    <div className="mx-auto max-w-lg bg-gray-600 rounded-lg my-8 px-4 py-6">
      <h1 className='text-center text-xl text-white my-2'>Password Generator</h1>
      <div className='flex flex-wrap justify-between overflow-hidden w-full bg-white text-black rounded-xl py-0 my-4'>
        <input 
        type='text' 
        readOnly
        ref={passwordRef}
        value={password} 
        className='px-3  rounded-lg outline-none'
        placeholder='Password'></input>
        <button 
        className='bg-blue-700 outline-none px-4 py-2 shrink-0 text-white'
        onClick={copyPasswordToClipboard} >Copy</button>
      </div>
      <div className='flex  text-white gap-x-4 py-4' >
        <div className='flex flex-wrap items-center gap-x-1'>
          <input type="range" 
          min={8}
          max={20}
          color="white"
          value={length} 
          onChange={(e)=>{setLength(e.target.value)}}
          className=''
          id="slider">
          </input>
          <label htmlFor="slider">Length : {length}</label>
        </div>
        <div className='flex flex-wrap items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={false}
          onChange={()=>{setCharAllowed((prev)=> (!prev))}}
          className=''
          id="char"
          ></input>
          <label htmlFor="char">Characters</label>
        </div>
        <div className='flex flex-wrap items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={false}
          onChange={()=> {setNumberAllowed((prev)=>(!prev))}}
          className=''
          id="num"
          ></input>
          <label htmlFor="num">Number</label>
        </div>
      </div>
    </div>
  </>
  );
}

export default App
