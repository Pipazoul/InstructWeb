<script lang="ts">
    import Title from "$lib/components/misc/Title.svelte";
  import WritePrompt from "$lib/components/WritePrompt.svelte";
    import { currentConversationTree, currentPrompts } from "$lib/store";
    import type {ConversationTree} from "$lib/types/conversationTree";
    import type {Prompt} from "$lib/types/prompt";
    import { onMount } from "svelte";
    import { getFilledTrees, pairTrees, chooseImpairTrees } from "$lib/utils/trees";

    let currentConversation: ConversationTree = {
        id: "",
        initPrompt: "",
        initPromptType: "",
        tree_1: [],
        tree_2: [],
        tree_3: [],
        tree_4: [],
    }
    let availableTrees: Array<ConversationTree> = [];
    let treeNumber: Number;
    let treeBuffer: Array = [];
    let locked = false;

      //
      $: {
        if ($currentConversationTree) {
            availableTrees = getFilledTrees($currentConversationTree);
            availableTrees = pairTrees(availableTrees);
            
            // currentConversation = availableTrees[randomNumber];
            let selectConversation = availableTrees[ Math.floor(Math.random() * availableTrees.length) ];

            if(selectConversation) {

                // get initPrompt text from id
                $currentPrompts.forEach(prompt => {
                    if (selectConversation.initPrompt === prompt.id) {
                        selectConversation.initPrompt = prompt.prompt;
                        selectConversation.initPromptType = prompt.type;
                    }
                });

                let selectTree = chooseImpairTrees(selectConversation);
                // get prompt from id
                treeBuffer = [];
                //choose random tree
                selectTree = selectTree[Math.floor(Math.random() * selectTree.length)];
                console.log("selectTree", selectTree);
                treeNumber = selectTree.treeNumber;

                selectTree.tree.forEach(id => {
                    $currentPrompts.forEach(prompt => {
                        if (id === prompt.id) {
                            treeBuffer = [...treeBuffer, {id: id, prompt: prompt.prompt, type: prompt.type}];
                        }
                    });
                });

                // add prompt to currentConversation
                currentConversation = {
                    id: selectConversation.id,
                    initPrompt: selectConversation.initPrompt,
                    initPromptType: selectConversation.initPromptType,
                    currentTree: treeBuffer
                   
                }

                
            }
        }
      }

    $: console.log("currentConversationTree", $currentConversationTree);
    $: console.log("availableTrees", availableTrees);
    $: console.log("currentConversation", currentConversation);
    $: console.log("treeNumber", treeNumber);


</script>
<section>
    <Title title="Répondre en tant q'utilisateur" />
    {#if currentConversation.initPrompt}
    <div class="chat chat-start">
        <div class="chat-header">
            {currentConversation.initPromptType}
        </div>
        <div class="chat-bubble chat-bubble-primary"> {currentConversation.initPrompt}</div>
    </div>
        {#each currentConversation.currentTree as item}
        <div class="chat chat-{item.type === "assistant" ? "end" : "start"}">
            <div class="chat-header">
                {item.type}
            </div>
            <div class="chat-bubble chat-bubble-primary"> {item.prompt}</div>
        </div>
        {/each}
    
    <WritePrompt promptType="user" writeToTree={true} treeNumber={treeNumber} conversationTreeId={currentConversation.id} />
    {:else}
        <div class="alert alert-info shadow-lg">
            Plus de conversation à répondre pour le moment <br>
            Mais vous pouvez toujours en créer une nouvelle prompt 
            <a class="btn bg-primary" href="/prompt/init">Commencer</a>
        </div>
    {/if}
</section>