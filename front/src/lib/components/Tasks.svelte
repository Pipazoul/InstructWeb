<script lang="ts">
 let tasks = [
    {
        name: "Créer des prompts initiaux",
        description: "Créer des prompts initiaux pour les utilisateurs",
        url: "/prompt/init",
    },
    {
        name: "Répondre en tant qu'assistant",
        description: "Répondre en tant qu'assistant",
        url: "/prompt/assistant",
    },
    {
        name: "Répondre en tant qu'utilisateur",
        description: "Répondre en tant qu'utilisateur",
        url: "/prompt/user",
    }

 ]
</script>
<section class="flex space-x-5">
    {#each tasks as task}
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
            <h2 class="card-title">{task.name}</h2>
            <p>{task.description}</p>
            <div class="card-actions justify-end">
                <a href={task.url} class="btn btn-primary">Commencer</a>
            </div>
            </div>
        </div>
    {/each}
    
</section>