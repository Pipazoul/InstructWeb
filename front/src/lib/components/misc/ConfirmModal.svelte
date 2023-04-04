<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let openModal: boolean = false;
    // dispatch confirm value to parent component
    const dispatch = createEventDispatcher();
   
        
</script>
<section>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="confirm-modal" class="modal-toggle" bind:checked={openModal} />
    <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Etes vous sur d'envoyer ce message ?</h3>
        <p class="py-4">Avez vous bien respecté les guidelines</p>
        <div class="modal-action">
            <label for="confirm-modal" class="btn btn-ghost" on:click={() => dispatch("cancel")}>Non</label>
            <label for="confirm-modal" class="btn" on:click={() => dispatch("confirm")}>Oui</label>
        </div>
    </div>
    </div>
</section>