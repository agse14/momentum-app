import { writable } from 'svelte/store';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User
} from 'firebase/auth';
import { auth } from '$lib/firebase';

export const user = writable<User | null>(null);
export const isAdmin = writable(false);
export const authReady = writable(false);

onAuthStateChanged(auth, async (u) => {
	user.set(u);
	if (u) {
		const token = await u.getIdTokenResult(true);
		isAdmin.set(token.claims.admin === true);
	} else {
		isAdmin.set(false);
	}
	authReady.set(true);
});

export async function login(email: string, password: string): Promise<User> {
	const cred = await signInWithEmailAndPassword(auth, email, password);
	const token = await cred.user.getIdTokenResult(true);
	if (token.claims.admin !== true) {
		await signOut(auth);
		throw new Error('Esta cuenta no tiene permisos de administrador.');
	}
	return cred.user;
}

export async function logout(): Promise<void> {
	await signOut(auth);
}
