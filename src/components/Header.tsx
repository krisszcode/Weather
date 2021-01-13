import React,{useContext, useEffect} from 'react'

import {ThemeContext} from './ThemeProvider'
import {useTranslation} from 'react-i18next'

export const Header = () => {
  const locale = 'en';
  const [today, setDate] = React.useState(new Date());
  const { theme, toggleTheme, toggleDarkTheme, toggleLightTheme } = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  const [isSwitched, setIsSwitched] = React.useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
    setDate(new Date());
    if(!isSwitched){
      if(hour>=18 || hour<=7){
        toggleDarkTheme()
        console.log(hour)
        console.log(isSwitched)
      }
      else{
        toggleLightTheme()
      }
    }
  }, 100);
  return () => {
    clearInterval(timer);
  }
}, [theme]);

  const handleSubmit = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSwitched(true)
    toggleTheme()
  }

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }


const day = today.toLocaleDateString(locale, { weekday: 'long' });
const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

const hour = today.getHours();
const wish = `Good ${(hour < 12 && 'Morning') || (hour < 18 && 'Afternoon') || 'Evening'}! `;

const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });


  return (
    <div>
      <h3>{wish}</h3>
      <h3>{date}</h3>
      <h3>{time}</h3>
      <button onClick={()=>changeLanguage("en")}>EN</button>
      <button onClick={()=>changeLanguage("hu")}>HU</button>
      <button onClick={(event) =>handleSubmit(event)}>
        {t('Switch to.1')} {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  )
}

export default Header