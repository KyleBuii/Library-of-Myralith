import { useEffect, useRef, useState } from 'react';
import './styles.scss';

const bookColors = ['red', 'purple', 'blue', 'green', 'pink'];

const Homepage = () => {
    const [books, setBooks] = useState(() => {
        const localStorageData = JSON.parse(localStorage.getItem('books'));
        return localStorageData
            ?? [{ name: 'The Story of Dranksfe', author: 'Kyle Bui', color: 'red', }]
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowLibrary, setIsShowLibrary] = useState(true);

    const refPage = useRef(null);

    useEffect(() => {
        return () => {
            if (books.length === 0) return;
            localStorage.setItem('books', JSON.stringify(books));
        };
    }, []);

    const addBook = (name, author, color = '') => {
        setBooks((books) => {
            const bookName = (name === '') ? '[   ]' : name;
            const bookAuthor = (author === '') ? '[   ]' : author;
            const randomColor = bookColors[Math.floor(Math.random() * bookColors.length)];
            const bookColor = (color === '') ? randomColor : color;

            return [
                ...books,
                { bookName, bookAuthor, bookColor }
            ]
        });
    };

    const clickBook = (bookIndex) => {
        setCurrentIndex(bookIndex);
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
                className={`page ${books[currentIndex].color}`}
                onClick={clickPage}>
                <span className='page-title'>{books[currentIndex].name}</span>
                <span>{books[currentIndex].author}</span>
            </section>
            {isShowLibrary
                && <section className='library'>
                    {books.map((book, bookIndex) => {
                        return <div className={`book ${book.color}`}
                            onClick={() => clickBook(bookIndex)}
                            key={book.name}>
                            <span>{book.name}</span>
                            <span>{book.author}</span>
                        </div>
                    })}
                </section>
            }
        </section>
    );
};

export default Homepage;