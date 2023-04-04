<script lang="ts">
    import Title from "$lib/components/misc/Title.svelte";
  import WritePrompt from "$lib/components/WritePrompt.svelte";
    import { currentConversationTree, currentPrompts } from "$lib/store";
    import type {ConversationsTreeRecord} from "$lib/types/pocketbase-types";
    import { onMount } from "svelte";

    let currentConversation = {};
    let availableTrees = [];
    let treeNumber = 0;
    let locked = false;

      // for eaach conversationTree, if one of tree_1 / tree_2 / tree_3 is null, then add it to availableTrees
      $: {
        if ($currentConversationTree) {
          for (let conversationTree of $currentConversationTree) {
            let push = false;
            if (!conversationTree.tree_1[0]) {
              push = true;
            }
            if (!conversationTree.tree_2[0]) {
              push = true;
            }
            if (!conversationTree.tree_3[0]) {
              push = true;
            }
            if (!conversationTree.tree_4[0]) {
              push = true;
            }
            if (push) {
              availableTrees = [...availableTrees, conversationTree];
              console.log("pushed", conversationTree);
            }
          }
        }
      }

      $: {
        if(!locked) {
            if (availableTrees.length > 0) {
                // get random conversationTree
                let conv = availableTrees[Math.floor(Math.random() * availableTrees.length)];

                // check if tree_1 is null or not
                if (!conv.tree_1[0]) {
                    treeNumber = 1;
                } else if (!conv.tree_2[0]) {
                    treeNumber = 2;
                } else if (!conv.tree_3[0]) {
                    treeNumber = 3;
                } else if (!conv.tree_4[0]) {
                    treeNumber = 4;
                }
                $currentPrompts.forEach(item => {
                    if (conv.initPrompt === item.id) {
                            conv.initPrompt = item.prompt;
                            conv.initPromptType = item.type;

                    }
                });
                currentConversation = conv;
                locked = true;
            }
        }
      }
    

    $: console.log("currentConversationTree", $currentConversationTree);
    $: console.log("availableTrees", availableTrees);
    $: console.log("currentConversation", currentConversation);


</script>
<section>
    <Title title="Répondre en tant qu'assistant" />
    {#if currentConversation.initPrompt}
    <div class="chat chat-start">
        <div class="chat-header">
            {currentConversation.initPromptType}
        </div>
        <div class="chat-bubble chat-bubble-primary"> {currentConversation.initPrompt}</div>
    </div>
    <WritePrompt promptType="assistant" writeToTree={true} treeNumber={treeNumber} conversationTreeId={currentConversation.id} />
    {:else}
        Plus de conversation à répondre
    {/if}
</section>