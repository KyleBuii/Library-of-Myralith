import { useEffect, useRef, useState } from 'react';
import './styles.scss';

const colorsBase = {
    red         : '#e63946',
    darkRed     : '#9d0208',
    orange      : '#f77f00',
    yellow      : '#ffd60a',
    gold        : '#d4af37',
    pink        : '#ff8fab',
    softPink    : '#ffc2d1',
    purple      : '#6a4c93',
    darkPurple  : '#3c096c',
    indigo      : '#3a0ca3',
    blue        : '#3a86ff',
    deepBlue    : '#1d3557',
    aqua        : '#4cc9f0',
    teal        : '#2a9d8f',
    green       : '#2ecc71',
    forestGreen : '#1b4332',
    olive       : '#6b8e23',
    brown       : '#8b5e34',
    lightGold   : '#f1c27d',
    white       : '#ffffff',
    silver      : '#c0c0c0',
    gray        : '#6c757d',
    black       : '#000000',
};

const colorsGradient = {
    purpleBlue         : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.blue})`,
    softPinkGreen      : `linear-gradient(135deg, ${colorsBase.softPink}, ${colorsBase.green})`,
    brownGreen         : `linear-gradient(135deg, ${colorsBase.brown}, ${colorsBase.green})`,
    goldWhite          : `linear-gradient(135deg, ${colorsBase.gold}, ${colorsBase.white})`,
    darkRedBlack       : `linear-gradient(135deg, ${colorsBase.darkRed}, ${colorsBase.black})`,
    lightGreenYellow   : `linear-gradient(135deg, ${colorsBase.green}, ${colorsBase.yellow})`,
    tealPurple         : `linear-gradient(135deg, ${colorsBase.teal}, ${colorsBase.purple})`,
    deepBlueSeaGreen   : `linear-gradient(135deg, ${colorsBase.deepBlue}, ${colorsBase.teal})`,
    oliveBrown         : `linear-gradient(135deg, ${colorsBase.olive}, ${colorsBase.brown})`,
    royalPurpleGold    : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.gold})`,
    greenBlue          : `linear-gradient(135deg, ${colorsBase.green}, ${colorsBase.blue})`,
    deepRedBrown       : `linear-gradient(135deg, ${colorsBase.darkRed}, ${colorsBase.brown})`,
    goldRed            : `linear-gradient(135deg, ${colorsBase.gold}, ${colorsBase.red})`,
    blackWhite         : `linear-gradient(135deg, ${colorsBase.black}, ${colorsBase.white})`,
    silverBlue         : `linear-gradient(135deg, ${colorsBase.silver}, ${colorsBase.blue})`,
    darkPurpleBlack    : `linear-gradient(135deg, ${colorsBase.darkPurple}, ${colorsBase.black})`,
    indigoWhite        : `linear-gradient(135deg, ${colorsBase.indigo}, ${colorsBase.white})`,
    electricYellowBlue : `linear-gradient(135deg, ${colorsBase.yellow}, ${colorsBase.blue})`,
    greenGold          : `linear-gradient(135deg, ${colorsBase.green}, ${colorsBase.gold})`,
    brownRed           : `linear-gradient(135deg, ${colorsBase.brown}, ${colorsBase.red})`,
    whiteGold          : `linear-gradient(135deg, ${colorsBase.white}, ${colorsBase.gold})`,
    greenWhite         : `linear-gradient(135deg, ${colorsBase.green}, ${colorsBase.white})`,
    darkBlueGray       : `linear-gradient(135deg, ${colorsBase.deepBlue}, ${colorsBase.gray})`,
    purpleGold         : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.gold})`,
    rainbow            : `linear-gradient(135deg, ${colorsBase.red}, ${colorsBase.orange}, ${colorsBase.yellow}, ${colorsBase.green}, ${colorsBase.blue}, ${colorsBase.indigo}, violet)`,
    forestGreenBrown   : `linear-gradient(135deg, ${colorsBase.forestGreen}, ${colorsBase.brown})`,
    purpleGray         : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.gray})`,
    darkPurpleRed      : `linear-gradient(135deg, ${colorsBase.darkPurple}, ${colorsBase.red})`,
    softPinkWhite      : `linear-gradient(135deg, ${colorsBase.softPink}, ${colorsBase.white})`,
    deepBlueGold       : `linear-gradient(135deg, ${colorsBase.deepBlue}, ${colorsBase.gold})`,
    goldYellow         : `linear-gradient(135deg, ${colorsBase.gold}, ${colorsBase.yellow})`,
    darkRedPurple      : `linear-gradient(135deg, ${colorsBase.darkRed}, ${colorsBase.purple})`,
    blueWhite          : `linear-gradient(135deg, ${colorsBase.blue}, ${colorsBase.white})`,
    skyBlueGreen       : `linear-gradient(135deg, #87ceeb, ${colorsBase.green})`,
    darkBluePurple     : `linear-gradient(135deg, ${colorsBase.deepBlue}, ${colorsBase.purple})`,
    silverWhite        : `linear-gradient(135deg, ${colorsBase.silver}, ${colorsBase.white})`,
    lightGoldWhite     : `linear-gradient(135deg, ${colorsBase.lightGold}, ${colorsBase.white})`,
    softBlueWhite      : `linear-gradient(135deg, #bde0fe, ${colorsBase.white})`,
    grayBlue           : `linear-gradient(135deg, ${colorsBase.gray}, ${colorsBase.blue})`,
    redBrown           : `linear-gradient(135deg, ${colorsBase.red}, ${colorsBase.brown})`,
    purpleBrown        : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.brown})`,
    blueSilver         : `linear-gradient(135deg, ${colorsBase.blue}, ${colorsBase.silver})`,
    darkPurpleBrown    : `linear-gradient(135deg, ${colorsBase.darkPurple}, ${colorsBase.brown})`,
    goldLightBlue      : `linear-gradient(135deg, ${colorsBase.gold}, #a2d2ff)`,
    blueGold           : `linear-gradient(135deg, ${colorsBase.blue}, ${colorsBase.gold})`,
    brightYellowPink   : `linear-gradient(135deg, ${colorsBase.yellow}, ${colorsBase.pink})`,
    pinkWhite          : `linear-gradient(135deg, ${colorsBase.pink}, ${colorsBase.white})`,
    pinkGold           : `linear-gradient(135deg, ${colorsBase.pink}, ${colorsBase.gold})`,
    blackPurple        : `linear-gradient(135deg, ${colorsBase.black}, ${colorsBase.darkPurple})`,
    rainbowWhite       : `linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet, white)`,
    yellowWhite        : `linear-gradient(135deg, ${colorsBase.yellow}, ${colorsBase.white})`,
    deepBlueGray       : `linear-gradient(135deg, ${colorsBase.deepBlue}, ${colorsBase.gray})`,
    aquaBlue           : `linear-gradient(135deg, ${colorsBase.aqua}, ${colorsBase.blue})`,
    purplePink         : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.pink})`,
    grayGold           : `linear-gradient(135deg, ${colorsBase.gray}, ${colorsBase.gold})`,
    blackWhitePurple   : `linear-gradient(135deg, ${colorsBase.black}, ${colorsBase.white}, ${colorsBase.purple})`,
    fireRedOrange      : `linear-gradient(135deg, ${colorsBase.red}, ${colorsBase.orange})`,
};

const Homepage = () => {
    const [deities, setDeities] = useState({});
    const [currentDeity, setCurrentDeity] = useState('');
    const [isShowLibrary, setIsShowLibrary] = useState(true);
    
    const refPage = useRef(null);

    const deity = deities[currentDeity];

    useEffect(() => {
        fetch('/deities.json')
            .then((response) => response.json())
            .then((json) => setDeities(json))
            .catch((error) => console.error(error));
    }, []);

    const clickBook = (deity) => {
        setCurrentDeity(deity);
        setIsShowLibrary(false);
        refPage.current.classList.toggle('show');
    };

    const clickPage = () => {
        setIsShowLibrary(true);
        refPage.current.classList.toggle('show');
    };

    return (
        <section className='app'>
            <section className='title'>
                <span>Library of Myralith</span>
            </section>
            <section ref={refPage}
                className='page'
                style={{ background: colorsGradient[deity?.color.replace(/\s+(.)/g, (_, character) => character.toUpperCase()).replace(/^./, c => c.toLowerCase())] }}>
                <div className='page-header'>
                    <span className='page-title'
                        onClick={clickPage}>{currentDeity}</span>
                    <span>{deity?.culture}</span>
                </div>
                <div className='page-domain'>
                    {deity?.domain.map((text) => {
                        return <span>{text}</span>
                    })}
                </div>
                <div>
                    <span>{deity?.description}</span>
                </div>
                <div>
                    {deity?.fact.map((text, textIndex) => {
                        return <span key={`fact ${textIndex}`}>
                            {text}
                        </span>
                    })}
                </div>
            </section>
            {isShowLibrary
                && <section className='library'>
                    {Object.entries(deities).map(([deity, deityData]) => {
                        return <div className='book'
                            style={{ background: colorsGradient[deityData.color.replace(/\s+(.)/g, (_, character) => character.toUpperCase()).replace(/^./, c => c.toLowerCase())] }}
                            onClick={() => clickBook(deity)}
                            key={deity}>
                            <span>{deity}</span>
                            <span>{deityData.culture}</span>
                        </div>
                    })}
                </section>
            }
        </section>
    );
};

export default Homepage;