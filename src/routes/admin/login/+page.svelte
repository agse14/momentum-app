<script lang="ts">
	import { login } from '$lib/stores/auth';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		loading = true;
		try {
			await login(email, password);
		} catch (err) {
			error = (err as Error).message || 'No se pudo iniciar sesión.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Acceso · Administrador</title></svelte:head>

<div class="login-wrap">
	<form class="login-card" onsubmit={submit}>
		<div class="eyebrow">Momentum Repostería</div>
		<h1>Panel de administración</h1>
		<p class="muted" style="margin-top:-6px">Ingresa con tu cuenta de administrador.</p>

		{#if error}<div class="alert alert--error">{error}</div>{/if}

		<div class="field">
			<label for="email">Correo</label>
			<input id="email" type="email" bind:value={email} required autocomplete="username" />
		</div>
		<div class="field">
			<label for="password">Contraseña</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				required
				autocomplete="current-password"
			/>
		</div>
		<button class="btn" type="submit" disabled={loading} style="width:100%">
			{loading ? 'Ingresando…' : 'Ingresar'}
		</button>
	</form>
</div>
