import { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/Inscription.module.css';
import sgMail from '@sendgrid/mail';

// Configure SendGrid avec API key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.error('SendGrid API key is not defined in environment variables');
}

const Inscription = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Effectuer une action d'inscription avec les données
        console.log('Inscription soumise : ', { username, email, password });
        
        // Envoyer un e-mail de confirmation
        try {
            setRegistrationStatus('loading'); // Set registration status to loading
            if (process.env.SENDGRID_API_KEY) {
                await sgMail.send({ // Sending email using sgMail
                    to: email,
                    from: 'bastienpasset02@gmail.com',
                    subject: 'Confirmation d\'inscription',
                    text: `Bonjour ${username}, votre compte a été créé avec succès.`
                });
                console.log('E-mail de confirmation envoyé avec succès');
                setRegistrationStatus('success'); // Set registration status to success
            } else {
                console.error('SendGrid API key is not defined in environment variables');
                setRegistrationStatus('error'); // Set registration status to error
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation : ', error);
            setRegistrationStatus('error'); // Set registration status to error
        }
    };

    // Gestion des changements de valeurs des champs
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h1>Inscription</h1>
            {registrationStatus === 'success' && (
                <p className={styles.successMessage}>Inscription réussie! Vérifiez votre e-mail pour la confirmation.</p>
            )}
            {registrationStatus === 'error' && (
                <p className={styles.errorMessage}>Une erreur s'est produite lors de l'inscription. Veuillez réessayer.</p>
            )}
            {registrationStatus === 'idle' && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={handleUsernameChange}
                        className={styles['input-field']}
                    />
                    <input
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles['input-field']}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                        className={styles['input-field']}
                    />
                    <button type="submit" className={styles['register-button']}>S'inscrire</button>
                </form>
            )}
        </div>
    );
};

export default Inscription;
