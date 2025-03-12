import "./App.css";
import fruitData from './fruitData.json';
import {useState, useEffect} from 'react';

const App = () => {

    const [imgIndex,setIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState([]);
    const [isClassApplied, setClassApplied] = useState(false);
    const [clickCard, setClickCard] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [TotalFlashcards, setTotalFlashcards] = useState(fruitData.length);
    const test = fruitData[imgIndex];

    const [input, setInput] = useState('');
    const [CorrectAnswer, setCorrectAnswer] = useState('');
    const handleChange = (e) => setInput(e.target.value);

    const CheckAnswer = () => 
    {
        setCorrectAnswer(((test.answer == input)? "true" : "false"));
    }

   /*  useEffect(() => {
        if(CorrectAnswer == "true")
            {
                displayAndRandom();
            }
    }, [CorrectAnswer]); */

    const randomFlashcards = () => 
    {
        setClickCard(false);
        const randomIndex = Math.floor(Math.random() * fruitData.length);
        if(previousIndex.includes(randomIndex))
        {
            randomFlashcards();
        }
        else
        {
            setIndex(randomIndex);
            setPreviousIndex(previousIndex => [...previousIndex, randomIndex]);
        }
    }

    const displayAndRandom = () =>
    {
        setInput('');
        setCorrectAnswer('');
        setShowButton(true);
        setClassApplied(true);
        randomFlashcards();
        setTotalFlashcards(prev => {
            if ((prev > 0)) {
              return prev - 1; 
            }
          });
    }


    const changeIndexDown = () =>
    {
        setTotalFlashcards(prev => {
            if(prev < fruitData.length-1)
            {
                return prev + 1;
            }
            return prev;
        }
        );
        setPreviousIndex(prev => prev.slice(0, -1));
    }

    useEffect(() => {
        if (previousIndex.length > 0) {
            setIndex(previousIndex[previousIndex.length - 1]); 
        }
    }, [previousIndex]);

    return (
        <div>
            <div className="title">
                <h1>Vegetable or Fruit?&#128557; &#128557;</h1>
                <h4>Can you guess whether this is a vegetable or fruit?</h4>
                <h5 className={isClassApplied ? "Display" : "noShow"}>Flashcards Left: {TotalFlashcards}</h5>
            </div>
            <div className={`${clickCard ? "container cardClicked" : "container"}`} id={CorrectAnswer}
                 onClick = {() => setClickCard(prev => !prev)}>
                <div className={isClassApplied ? "flipCard" : ""}>
                    <div className="flipCardInner">
                        <div className="frontSide">
                            <img className={isClassApplied ? "Display" : ""} src={test.img} alt={test.alt}/>
                        </div>
                        
                        <div className={isClassApplied ? "backSide" : "noShow"}>
                            {test.display}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${isClassApplied ? "Display" : "noShow"} textContainer`}>
                <input type="text" name="answer" value={input} placeholder="Type Vegetable or Fruit" onChange={handleChange} id={CorrectAnswer}/>
                <button onClick={CheckAnswer}>Submit Answer</button>
            </div>
            <div className="navButtons">
            <button onClick={changeIndexDown}>&larr;</button>
            <button onClick={displayAndRandom}>{!showButton ? "Start" : "\u2192"}</button>
            </div>
        </div>

    )
}

export default App