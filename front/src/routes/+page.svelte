<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Tasks from "$lib/components/Tasks.svelte";
import { currentUser } from "$lib/store";


</script>
<section>
    {#if $currentUser}
        <Tasks />
    {/if}
</section>