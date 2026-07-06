import {useState, useEffect} from 'react';
import { splitSequences } from './utils/splitSequences';
import Header from './components/Header';
import { downloadZip } from './utils/downloadZip';
import Core_and_instructions from './components/Core_and_instructions';

const App = () => {
  const [chunkSize, setChunkSize] = useState(0);
  
 
  return ( 
    <div>
      <Header />

      <Core_and_instructions /> 
      
      

      
    </div>
   );
}
 
export default App;
 
