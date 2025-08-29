import QuizLogo from '../assets/quiz-logo.png'

export default function Header(){
    return <header>
        <img scr={QuizLogo} alt="Quiz logo" />
        <h1>ReactQuiz</h1>
    </header>
}