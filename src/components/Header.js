// Putting quotes outside the function so the random only gets reloaded once, and the quote doesnt switch unless we reload.
const quotes = [
    "Most of us spend too much time on what is urgent and not enough time on what is important.",
    "A dream written down with a date becomes a goal. A goal broken down into steps becomes a plan. A plan backed by action makes your dreams come true.",
    "How you spend your time is who you become. - Aly Juma",
    "Discipline is choosing between what's painful right now vs what's the most painful.",
    "Amateurs show up whenever they feel like it. But being a professional means showing up when you don't want to.",
    "Procrastination is the inability to deal with emotional discomfort.",
    "Distractions are not caused by social media or by any outside factor. Distractions are caused by a desire from the inside to escape negative emotions — boredom, anxiety, stress, you name it. ",
    "Time management is pain management.",
    "Things which matter most must never be at the mercy of things which matter least.",
    "No one cares about what you're bad at and neither should you.  - Derek Sivers"
  ]
  
const quoteIndex = Math.floor(Math.random() * quotes.length - 1) + 1 // Random quote

const Header = () => {
    return (
        <header>
            <h1 id='title'>The <span className='theme'>Prioritizer</span></h1>
            <p className='subtitle'>{quotes[quoteIndex]}</p>
        </header>
    )
}

export default Header
