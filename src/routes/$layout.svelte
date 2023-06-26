<script lang="ts">
    import { error } from '$app/stores';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
</script>

<svelte:head>
	<title>Scriptone - Error</title>
</svelte:head>

<main>
    <Header />
    <svelte:body>
        <slot />
    </svelte:body>
    {#if $error}
        <div>
            <h1>Error - {$error.status}</h1>
            <p>{$error.message}</p>
        </div>
    {/if}
    <Footer />
</main>