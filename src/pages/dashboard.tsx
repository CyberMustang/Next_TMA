// pages/dashboard.tsx (page privée)
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Vérifiez l'état de connexion de l'utilisateur ici
    const userLoggedIn = true; // Par exemple, vous pouvez vérifier si l'utilisateur est connecté

    if (!userLoggedIn) {
      router.push('/login'); // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Tableau de bord</h1>
      <h2>Bienvenue sur votre tableau de bord</h2>
      <div>
        <ul>
          <li><a href="#">Cours</a></li>
          <li><a href="#">Devoirs</a></li>
          <li><a href="#">Notes</a></li>
          <li><a href="#">Calendrier</a></li>
          <li><a href="#">Messages</a></li>
        </ul>
      </div>
      <div>
        <p>Ici, vous pouvez accéder à vos cours, consulter vos devoirs à faire, voir vos notes, gérer votre calendrier et communiquer avec vos enseignants et collègues.</p>
      </div>
    </div>
  );
};

export default DashboardPage;