import React from 'react';

import './index.css';

export default function Home(props) {
  // useEffect(() => {
  // })

  // const initialState = {
  // };

  // const [ state, setState ] = useState(initialState);

  return (
    <div class={'HomePlaceholder'}>
      <h1 style={{color: 'white'}}>TESTZ</h1>
      <img 
        src={require('./panda1.jpg')}
        className='MainPicture'
      />
    </div>
  )
}