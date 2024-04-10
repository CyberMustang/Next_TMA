import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // une action de connexion avec les données
        console.log('Connexion soumise : ', credentials);
        // Réinitialiser les champs après soumission
        setCredentials({ email: '', password: '' });

        // Redirection vers la page d'inscription après la connexion réussie
        router.push('/inscription');
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={styles.container}>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    value={credentials.email}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={credentials.password}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <button type="submit" className={styles.loginButton}>Se connecter</button>
            </form>
        </div>
    );
}
