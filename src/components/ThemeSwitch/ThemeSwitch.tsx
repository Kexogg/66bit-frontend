import styles from './ThemeSwitch.module.css'

enum Theme {
    Light = 'light',
    Dark = 'dark',
}

const ThemeSwitch = () => {
    const selectedTheme = localStorage.getItem('theme') ?? Theme.Light
    return (
        <label className={styles.themeSwitch__container}>
            <input
                defaultChecked={selectedTheme === Theme.Light}
                onChange={(e) => {
                    if (e.target.checked) {
                        document.documentElement.setAttribute(
                            'data-theme',
                            Theme.Light,
                        )
                        localStorage.setItem('theme', Theme.Light)
                    } else {
                        document.documentElement.setAttribute(
                            'data-theme',
                            Theme.Dark,
                        )
                        localStorage.setItem('theme', Theme.Dark)
                    }
                }}
                type={'checkbox'}
                className={styles.themeSwitch__input}></input>
            <span className={styles.themeSwitch__slider}></span>
        </label>
    )
}

export default ThemeSwitch
