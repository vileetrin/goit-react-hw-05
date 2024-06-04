import style from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
    return (
        <form onSubmit={onSubmit} className={style.form}>
            <input type="text" name='movieName' placeholder='Enter the title to search' autoComplete="off" autoFocus className={style.input}/>
            <button type='submit' className={style.btn}>Search</button>
        </form>
    )
}
