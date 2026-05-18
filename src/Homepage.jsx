import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import './styles.scss';

const colorsBase = {
    black       : '#000000',
    blue        : '#3a86ff',
    brown       : '#8b5e34',
    gray        : '#6c757d',
    green       : '#2ecc71',
    orange      : '#f77f00',
    pink        : '#ff8fab',
    purple      : '#6a4c93',
    red         : '#e63946',
    white       : '#ffffff',
    yellow      : '#ffd60a',
};
const colorsGradient = {
    brownGreen : `linear-gradient(135deg, ${colorsBase.brown}, ${colorsBase.green})`,
    pinkGreen  : `linear-gradient(135deg, ${colorsBase.pink}, ${colorsBase.green})`,
    purpleBlue : `linear-gradient(135deg, ${colorsBase.purple}, ${colorsBase.blue})`,
};

const Homepage = () => {
    const [deities, setDeities] = useState({});
    const [currentDeity, setCurrentDeity] = useState('');
    const [isShowLibrary, setIsShowLibrary] = useState(true);
    const [activeDeities, setActiveDeities] = useState([]);
    const [particleEngine, setParticleEngine] = useState(false);

    const refPage = useRef(null);

    const deity = deities[currentDeity];

    const particleOption = useMemo(() => ({
        particles: {
            rotate: {
                value: 0,
                random: true,
                direction: 'clockwise',
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false
                },
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: 'bounce',
                speed: 2,
            },
            number: {
                density: { enable: true },
                value: activeDeities.length,
            },
            random: { enable: false },
            opacity: { value: 0.5 },
            shape: {
                type: 'image',
                options: {
                    image: activeDeities.map((name) => ({
                        name,
                        src: `/deities/${name}.webp`,
                        width: 32,
                        height: 32,
                    })),
                },
            },
            size: {
                value: { min: 16, max: 32 }
            },
            preload: activeDeities.map((name) => ({
                name,
                src: `/deities/${name}.webp`,
                width: 32,
                height: 32,
            })),
        },
    }), [activeDeities]);

    useEffect(() => {
        fetch('/deities.json')
            .then((response) => response.json())
            .then((json) => setDeities(json))
            .catch((error) => console.error(error));

        if (particleEngine) return;

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setParticleEngine(true);
        });
    }, []);

    const clickBook = async (deity) => {
        setCurrentDeity(deity);
        setIsShowLibrary(false);

        const reformatName = deity.toLowerCase().replace(/\s+/g, '-');
        const doesImageExist = await imageExists(`/deities/${reformatName}.webp`);

        if (doesImageExist) setActiveDeities((prev) => prev.includes(name) ? prev : [...prev, reformatName]);

        refPage.current.classList.toggle('show');
    };

    const clickPage = () => {
        setIsShowLibrary(true);
        refPage.current.classList.toggle('show');
    };

    const imageExists = (image) => {
        return new Promise((resolve) => {
            const checkImage = new Image();

            checkImage.onload = () => resolve(true);
            checkImage.onerror = () => resolve(false);
            checkImage.src = image;
        });
    };

    return (
        <section className='app'>
            {particleEngine && (activeDeities.length > 0) && <Particles options={particleOption}/>}
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
                    {deity?.domain.map((text, textIndex) => {
                        return <span key={`text ${textIndex}`}>{text}</span>
                    })}
                </div>
                {deity?.weapon !== undefined || deity?.artifacts !== undefined || deity?.animals !== undefined &&
                    <div className='page-equipment'>
                        <span>{deity?.weapon}</span>
                        <span>{deity?.artifacts}</span>
                        <span>{deity?.animals}</span>
                    </div>
                }
                {deity?.abilities !== undefined &&
                    <div className='page-abilities'>
                        {deity?.abilities.map((text, textIndex) => {
                            return <span key={`abilities ${textIndex}`}>
                                {text}
                            </span>
                        })}
                    </div>
                }
                <div>
                    <span>{deity?.description}</span>
                </div>
                <div className='page-fact'>
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
                </section>}
        </section>
    );
};

export default memo(Homepage);