import React, { useState } from 'react';
import Search from './components/Search/Search'
import Header from './components/Header/Header'
import { NotificationContainer } from 'react-notifications'
import AlphaPlot from './components/AlphaPlot'
import 'react-notifications/lib/notifications.css'

const App = () => {
  const [alphaData, setAlphaData] = useState([])

  return (
    <>
      <Header/>
      <Search setAlphaData={setAlphaData}/>
      <AlphaPlot data={alphaData}/>
      <NotificationContainer/>
    </>
  );
}

export default App;
