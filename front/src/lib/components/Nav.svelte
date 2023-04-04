<script lang="ts">
    import { currentUser } from "$lib/store";
    import {PUBLIC_POCKETBASE_URL} from '$env/static/public'
    import { onMount } from "svelte";
    import { logout } from "$lib/utils/auth";

    const userAvatar = PUBLIC_POCKETBASE_URL + "/api/files/_pb_users_auth_" 

</script>
<section>
        <div class="navbar bg-base-100">
        <div class="flex-1">
          <a href="/" class="btn btn-ghost normal-case text-xl">InstrucWeb</a>
        </div>
        <div class="flex-none">
            {#if $currentUser}
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src={userAvatar + "/" + $currentUser.id + "/" + $currentUser.avatar} />
                    </div>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                        Profile
                        <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a on:click={logout}>Logout</a></li>
                    </ul>
                </div>
                {:else}
                    <a href="/login" class="btn btn-ghost normal-case bg-primary">Login</a>
                {/if}
        </div>
      </div>                    
     
    
    
</section>