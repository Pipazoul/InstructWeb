<script lang="ts">
    import { login } from "$lib/utils/auth";
  import Title from "./misc/Title.svelte";
    let username: string;
    let password: string;
</script>
<section class="flex flex-col">
    <Title title="Login" />
    <input type="text" placeholder="Login" class="input input-bordered input-primary w-full max-w-xs" bind:value={username} />
    <input type="password" placeholder="Password" class="input input-bordered input-primary w-full max-w-xs" bind:value={password} />
    <button class="btn btn-primary" on:click={login(username, password)} >Login</button>
</section>