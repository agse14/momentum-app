import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Config pública del proyecto (mismas claves que usa el cliente en el navegador).
export const firebaseConfig = {
	apiKey: 'AIzaSyD7x_fdlGGohwSntmt0y7ldtRH7ZgP-Zuk',
	authDomain: 'momentum-reposteria.firebaseapp.com',
	projectId: 'momentum-reposteria',
	storageBucket: 'momentum-reposteria-media',
	messagingSenderId: '204474922833',
	appId: '1:204474922833:web:48fcbd5d7382ba62858570'
};

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app, firebaseConfig.storageBucket);
