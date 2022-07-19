import React, { useEffect, useState, useRef } from 'react';

import './index.css';

const isEmoji = word => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(word);
const calcHighlightPoint = word => isEmoji(word) ? -1 : Math.floor(word.replace(/[\W]/g, '').length / 2);
const textToWords = text => text.split(/\s+/);
const ONE_MINUTE = 60 * 1000;

const charTimeout = (text, wpm) => {
    if (!text || typeof text !== 'string') throw new Error('Text must be a string');
  
    const words = textToWords(text);
    const totalTime = Math.trunc(words.length / wpm * ONE_MINUTE);
  
    return totalTime / words.join('').length;
};

export default function ReactSpritz(props) {
  const initialState = {
    charTempo: charTimeout(props.text, props.wpm),
    currentWordIndex: 0,
    playing: false,
    standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
    startTimeout: props.startTimeout ? props.startTimeout : 800,
    text: props.text,
    //timeout: null,
    words: textToWords(props.text),
    wpm: props.wpm,
  };

  const [ state, setState ] = useState(initialState);
  const [ timeout, setTimeoutFunction ] = useState(null);
  //const [ playing, setPlaying ] = useState(false);

  console.log('state: ', state)
  console.log('timeout: ', timeout)
  useEffect(() => {
    handleChangeText();
  }, [props.text])

  useEffect(() => {
    if (props.playing) {
      start()
    }

    if (!props.playing) handleStop();

  }, [props.playing]);

  useEffect(() => {
    handleChangeText();
  }, [props.text]);

  useEffect(() => {
    // if (state.wpm !== props.wpm) {
    //   clearTimeout(state.timeout);
    //   setState({
    //     ...state,
    //     wpm: props.wpm,
    //   })
    // }
    handleUpdateWPM();
  }, [props.wpm])

console.log('should use standard effect: ', (state.playing
  && props.playing
  && state.text === props.text
  && state.wpm === props.wpm
  && !timeout))

  useEffect(() => {
    if (
      state.playing
      && props.playing
      && state.text === props.text
      && state.wpm === props.wpm
      && state.currentWordIndex < state.words.length
      //&& !timeout
    ) {
      console.log('STANDARD CONTINUE PLAY EFFECT: ')
      console.log('state.timeout: ', state.timeout)
      //TIMEOUT = setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout());
      // setState({
      //   ...state,
      //   timeout: setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout()),
      // })
      
      // setTimeoutFunction(setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout()))
      setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout())
    }
  });

  function start() {
    console.log('START: ')
    
    // setTimeoutFunction(setTimeout(displayNextWord, 1000))
    setState({
      ...state,
      //currentWordIndex: state.currentWordIndex + 1,
      playing: true,
      //timeout: setTimeout(displayNextWord, 1000),
    });
    //setTimeoutFunction(setTimeout(displayNextWord, 1000))
    // setPlaying(true);
  }

  function displayNextWord() {
    console.log('DISPLAY NEXT WORD: ')
    console.log('state in display next word: ', state)
      setState({
          ...state,
          currentWordIndex: state.currentWordIndex + 1,
      });
  }

  function getNextWordTimeout() {
      const word = state.words[state.currentWordIndex];
      const { normalized } = props;
  
      let wordTimeout = normalized ? word.length * state.charTempo : state.standardTempo;
  
      const delay = /^\(|[,.)]$/.test(word) || isEmoji(word);
      if (delay) wordTimeout += state.standardTempo;
  
      // ensure, the timeout between words is not less than a wpm
      return Math.max(wordTimeout, state.standardTempo);
  }

  function handleStop() {
      //setPlaying(false);
      console.log('HANDLE STOP')
      clearTimeout(state.timeout)
      setState({
        ...state,
        playing: false,
      })
  }

  function handleChangeText() {
      console.log('HANDLE CHANGE TEXT')
      setState({
          ...state,
          text: props.text,
          charTempo: charTimeout(props.text, state.wpm),
          words: textToWords(props.text),
          currentWordIndex: 0,
      });
  }

  function handleUpdateWPM() {
      setState({
          ...state,
          wpm: props.wpm,
          charTempo: charTimeout(props.text, props.wpm),
          standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
      })
  }

  const { currentWordIndex } = state;
  const word = currentWordIndex !== -1 && state.words[currentWordIndex];
  const highlightIndex = word && calcHighlightPoint(word);

  return (
      <div className="container">
        {
          word &&
          <div className="spritz">
            <div className="leftSide">
              {highlightIndex !== -1 && word.slice(0, highlightIndex)}
            </div>
            <div className="highlight">
              {highlightIndex === -1 ? word : word[highlightIndex]}
            </div>
            <div className="rightSide">
              {highlightIndex !== -1 && word.slice(highlightIndex + 1)}
            </div>
          </div>
        }
        {
          word && state.startTimeout &&
          <div
            style={{transition: `transform linear ${state.startTimeout}ms`}}
            className={props.playing ? 'timeoutBlockHidden' : 'timeoutBlock'}
          ></div>
        }
      </div>
    );
}