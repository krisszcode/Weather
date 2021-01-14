import React,{useContext, useEffect} from 'react'

import {ThemeContext} from './ThemeProvider'
import {useTranslation} from 'react-i18next'

export const Header = () => {
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


const hour = today.getHours();
const greeting = `${t(`Good.1`)} ${(hour < 12 && t('Morning.1')) || (hour < 18 && t('Afternoon.1')) || t('Evening.1')}! `;



  return (
    <div>
      <div className="row">
      <h3>{greeting}</h3>
      </div>
      <div className="row offset-5">
        <div className="col-2">
          <button className="btn btn-secondary" onClick={()=>changeLanguage("en")}>{t('English.1')}</button>
        </div>
        <div className="col-2">
          <button className="btn btn-secondary" onClick={()=>changeLanguage("hu")}>{t('Hungarian.1')}</button>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={(event) =>handleSubmit(event)}>
        {t('Switch to.1')} {theme === ("light") ? t("dark.1") : t("light.1")} {t("mode.1")}
      </button>
      </div>
  )
}

export default Header