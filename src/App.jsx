import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);  
  const [numbersRequire, setNumbersRequire] = useState(false);
  const [charactersRequire, setCharactersRequire] = useState(false);
  const [password, setPassword] = useState("");

  // using useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => { 
    let createPass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numbersRequire) {
      str += "0123456789";
    }

    if (charactersRequire) {
      str += "!@#$%^&*()_{}[]~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      createPass += str.charAt(char);
    }

    setPassword(createPass);

  }, [length, numbersRequire, charactersRequire, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setselectionRange(50);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersRequire, charactersRequire, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-md px-4 py-3 my-8 bg-gray-600 text-red-400'>
        <h1 className='text-white text-center my-3'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className='outline-none bg-blue-600 text-white px-3 py-1 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>
              Length: {length}
            </label>
            <div className='flex items-center gap-x-1 mx-4'>
              <input
                type="checkbox"
                defaultChecked={numbersRequire}
                id='inputNumber'
                onChange={() => {
                  setNumbersRequire((prev) => !prev);
                }}
              />
              <label htmlFor="inputNumbers">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1 mx-1'>
              <input
                type="checkbox"
                defaultChecked={charactersRequire}
                id='inputCharacters'
                onChange={() => {
                  setCharactersRequire((prev) => !prev);
                }}
              />
              <label htmlFor="inputCharacters">Characters</label>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
