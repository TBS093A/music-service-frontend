import React, { useEffect } from 'react'

import '../../../styles/general.scss'

const ConsoleLoad = () => {

    useEffect( () => { loadingDivs() } )

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const displayNone = {
        display: 'none'
    }

    let iterationDivs = 0
    const loadingDivs = async() => {
        if (window.innerWidth < 900) {
            document.body.style.fontSize = '8px'
            document.getElementById('Poland').style.width = '180px'
            document.getElementById('Russia').style.width = '310px'
            document.getElementById('connect').style.width = '390px'
            document.getElementById('connect').style.marginTop = '170px'
            document.getElementById('connect').style.marginLeft = '-100px'
        }
        if (iterationDivs === 0)
            while (iterationDivs < 7) {
                document.getElementById(iterationDivs).style = 'display: block'
                if (iterationDivs === 2) 
                    await loadingLocation()
                if (iterationDivs === 3)
                    await loadingConnect()
                if (iterationDivs === 6)
                    await loadingBar()
                iterationDivs++
                await sleep(300)
            }
    }

    const loadingLocation = async () => {
        const response = await fetch('https://ipapi.co/json/')
        let json = await response.json()
        document.getElementById('2').innerHTML = json.ip
            + ' ( '
            + json.city
            + ' ) >> Петропавловск-Камчатский'
    }

    let connectASCII = '$--a-sd--К-=;-/.=--=.-=а-=-=-;м-==-.=ч-=--' 
    + ';=-а-=-;=т-=;=-;=-с-=;-к-=-=-=и-=-=,.,/.//,/;--=-й-=-=;-=,.'
    + ',..v,||=-;;=--__+-=-=-='
    let iterationASCII= 0
    const loadingConnect = async() => {
        let popChars = ''
        while (iterationASCII < connectASCII.length) {
            popChars = connectASCII.substring(0, iterationASCII)
            document.getElementById('connect').innerHTML = popChars
            await sleep(3)
            iterationASCII++
        }
    }
    
    let procentage = 0
    const loadingBar = async() => {
        let loadingBar = document.getElementById('6').innerHTML
        let lastProcentage = procentage
        for (let i = 0; i < loadingBar.length; i++) {
            loadingBar = document.getElementById('6').innerHTML
            lastProcentage = procentage
            if (loadingBar[i] === '_') {
                procentage += 4
                document.getElementById('6').innerHTML = loadingBar
                    .replace('_','#')
                    .replace(lastProcentage, procentage)
                await sleep(30)
            }
        }
    }    

    return (
        <div id='consoleDiv'>
            <div id='0' style={displayNone}>
                загрузка контента с функциональностью сайта
            </div>
            <div id='1' style={displayNone}>
                подключение к серверу
            </div>
            <div id='2' style={displayNone}>
                 >> >> Петропавловск-Камчатский
            </div>
            <br />
            <div className='ASCIIview' id='3' style={displayNone}>
                <div className='ASCIIchars' id='Poland'>
            =-¬¬   TF▄                              <br />
           .⌐          ,   ..,                      <br />
  ▌φ^'`                          `'  ¬---┬  ,       <br />
  Φ¬¬                                        '      <br />
  ▄                                           W     <br />
 ,`                                           ▐     <br />
',                                             ⌐    <br />
  #                                            ▀    <br />
  ▀                                            ,¬   <br />
  ,                                          ¬¬     <br />
                                             ¬      <br />
  ⁿ                                           |     <br />
   É                                          ┤     <br />
  ╢ ⌐                                         ▐     <br />
       ¬-                                      ⁿ    <br />
        .f                                      Æ   <br />
         T  É` I                                J   <br />
               └.¬.                           ¬     <br />
                    ╡                 *     ⌐       <br />
                     É , ┐                ⌐         <br />
                      `     ∩ ─.-^ -,    ▐          <br />
                           `         `'¬.[¬         <br />
                                          `         <br />
                </div>
                <div className='ASCIIchars' id='connect'>

                </div>
                <div className='ASCIIchars' id='Russia'>
                                                                ╓ⁿ`1                            <br />
                                                               ╒Σ, "*Y▄                         <br />
                                                  £"       ,═^ `"    >╙                         <br />
                                                  ╙╝     ¿^       ]``                           <br />
                                                      ¿"        ▀J⌠                             <br />
                                                     ╛             Y                            <br />
                                                   ,╙             ▄Ñ⌐"*^`╗                      <br />
              .                                    M¬w                  ╬                       <br />
              »``                                 ╟╙^`                  c                       <br />
                                                 ,╛                      ╥                      <br />
                           ,═^║                 /                        ╙                      <br />
                      ,╔X▌║ `             r   ""                          ╟                     <br />
                     ▐µ  ╓╨              Å                               ╓ⁿ╨                    <br />
                     ╙ "^ j╦^ⁿ  ,¡╔ ╙*╙                           ╓      H                      <br />
                       -╕   └╓─`'`▀                              ╙╙v    6N                      <br />
                             Φ≥                                    ▀ V  ╜                       <br />
                   ,          @"                                 W ║ ½  *,╫           ≈         <br />
                ▐┘"` ¥╓  ╓ç,Ω                                  ╒  `"  ¼  ╙,,%       ª╨          <br />
      ,5╠ «─^%╓.*`    ╙w  ╕                                    └       ╕     `"J⌐               <br />
      ╚▌ ╙                `                                     $      |       ╙w               <br />
        %                                                       ╙⌐╓    ,          ╜             <br />
         ╙w                                                      ╓╙     1         ╕             <br />
         æ└                                                   «"▓M       *,       *║`           <br />
        ]Γ                                                  ,Ω             "«,,    ╙%           <br />
      ╓╜                                                   φ`                  "¬.   ╙          <br />
       E                                                .*                         `*─H         <br />
        M                                              ╔                              ▌         <br />
       ▄└                                              ║                              ╙         <br />
        ▌                                              ╘                               `        <br />
         N                                             ║                                        <br />
         ▄,╓┌                                          ╠        ╓,                              <br />
            ▀═                                         ▐         ╠M═                     ╗      <br />
              ╧┐                                       Å ΦM ╗"`"jÜ%  %,                         <br />
               ▀       ,.,                             w═"╬╗A     `▌─w  *w               Φ      <br />
                ║     j   ╙╜7,                                     ╙  "w  ╓╜             `      <br />
                ║   w,H     æ═M                                      \  "╕╙             ▄       <br />
                "═╛  "      ╡,                                        ╙   "╬w,          ╛       <br />
                          xΦw╜                                          M   " Å*^      Φ ╕      <br />
                   ,,m═══*                                               |    ╙                 <br />
                  Ω`                   ,-^`"``"w                        V                       <br />
                  ║                   Γ         `\,            /`\       \                      <br />
                                      "╕           "w,═¬─══   ║  ╙       M                      <br />
                   Å                   M                   "ⁿ     ╙      /                      <br />
                  ,M                  ▐                            Ω    ▐                       <br />
      ¿╕         A                    ╓┴                         /"     \                       <br />
     ▀  `*≈╥   ¿╨              «═«^*ⁿ"                          ╙w      A                       <br />
     `^*══w "Y*              ╓⌐                                   'µ╗═ⁿ^                        <br />
           ╙w,.═"``"^%,,,..^                                       ╢                            <br />
                </div>
            </div>
            <br />
            <div id='4' style={displayNone}>
                Подключен!
            </div>
            <div id='5' style={displayNone}>
                загрузка ресурсов
            </div>
            <div id='6' style={displayNone}>
                [_________________________] 0%
            </div>
        </div>

    )

}

export default ConsoleLoad