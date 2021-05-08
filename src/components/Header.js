const Header = ({quotes, quoteIndex}) => {
    return (
        <header>
            <h1 id='title'>The <span className='theme'>Prioritizer</span></h1>
            <p className='subtitle'>{quotes[quoteIndex]}</p>
        </header>
    )
}

export default Header
