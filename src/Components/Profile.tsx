import { useContext, useEffect, useState } from 'react'
import { ChallengeContext } from '../Contexts/ChallengeContext'
import Cookies from 'js-cookie';
import styles from '../styles/components/Profile.module.css'

interface ProfileProviderProps{
    username: String;
}

export function Profile({...rest}:ProfileProviderProps){
    const { level } = useContext(ChallengeContext);

    const [username, setUsername] = useState(rest.username ?? '');

    if(username === "undefined" || username === "%20"){
        setUsername('');
    }

    const [inputText, setInputText] = useState('');

    const handleInput = event => {
        setInputText(event.target.value);
    };

    function getUsername(){
        setUsername(String(inputText));
    }

    useEffect(() => {
        Cookies.set('username', String(username)); 
    }, [username])

    return(
        <div className={styles.profileContainer}>
            <img src="perfil.jpg" alt="Diego fernandes" />
            <div>
                <>
                {username ? (
                   <strong>{username}</strong>
                ) :(
                    <div className={styles.InputContainer}>
                        <input type="text" onChange={handleInput} placeholder="Insira seu nome" name="UserInput"/>
                        <button type="button" onClick={getUsername}>Confirmar</button>
                    </div>
                )}
                </>
                <p>
                   <img src="icons/level.svg" alt="Level"/> 
                   Level {level}
                </p>
            </div>

        </div>
    )
}