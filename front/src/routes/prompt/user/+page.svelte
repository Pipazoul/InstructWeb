<script lang="ts">
    import Title from "$lib/components/misc/Title.svelte";
  import WritePrompt from "$lib/components/WritePrompt.svelte";
    import { currentConversationTree, currentPrompts } from "$lib/store";
    import type {ConversationsTreeRecord} from "$lib/types/pocketbase-types";
    import { onMount } from "svelte";

    let currentConversation = [];
    let availableTrees = [];
    let treeNumber = -1;
    let treeBuffer = [];
    let locked = false;

      // for eaach conversationTree, if one of tree_1 / tree_2 / tree_3 is null, then add it to availableTrees
      $: {
        if ($currentConversationTree) {
          for (let conversationTree of $currentConversationTree) {
            let push = false;
            if (conversationTree.tree_1[0]) {
              push = true;
            }
            if (conversationTree.tree_2[0]) {
              push = true;
            }
            if (conversationTree.tree_3[0]) {
              push = true;
            }
            if (conversationTree.tree_4[0]) {
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
                // get for each tree array number to be a pair number
                
                availableTrees.forEach(item => {
                    let push = false;
                    console.log("item", item);
                   // check if tree_1 length is pair or equals 1
                    if (item.tree_1.length % 2 === 0 || item.tree_1.length === 1) {
                        console.log("tree_1 is pair or equals 1");
                        push = true;
                        currentConversation = item;
                        treeNumber = 1;
                    } else {
                        console.log("tree_1 is not pair or equals 1");
                    }
                    // check if tree_2 length is pair or equals 1
                    if (item.tree_2.length % 2 === 0 || item.tree_2.length === 1) {
                        console.log("tree_2 is pair or equals 1");
                        push = true;
                        currentConversation = item;
                        treeNumber = 2;

                    } else {
                        console.log("tree_2 is not pair or equals 1");
                    }
                    // check if tree_3 length is pair or equals 1
                    if (item.tree_3.length % 2 === 0 || item.tree_3.length === 1) {
                        console.log("tree_3 is pair or equals 1");
                        push = true;
                        currentConversation = item;
                        treeNumber = 3;

                    } else {
                        console.log("tree_3 is not pair or equals 1");
                    }
                    // check if tree_4 length is pair or equals 1
                    if (item.tree_4.length % 2 === 0 || item.tree_4.length === 1) {
                        console.log("tree_4 is pair or equals 1");
                        push = true;
                        currentConversation = item;
                        treeNumber = 4;

                    } else {
                        console.log("tree_4 is not pair or equals 1");
                    }

                    if (push) {
                        console.log("pushed", item);
                        // replace the existing conversationTree with the new one
                        
                        
                        locked = true;

                    }
                   
                });

                console.log("currentConversation", currentConversation);


                
                $currentPrompts.forEach(item => {
                    if (currentConversation.initPrompt === item.id) {
                        currentConversation.initPrompt = item.prompt;
                        currentConversation.initPromptType = item.type;
                    }
                });

               if(treeNumber === 1) {
                     currentConversation.tree_1.forEach((item, i) => {
                        console.log("for", item);
                        $currentPrompts.forEach(prompt => {
                            console.log("if item === prompt.id", item === prompt.id);
                            if (item === prompt.id) {
                                currentConversation.tree_1[i] = prompt.prompt;
                                treeBuffer = [...treeBuffer, prompt.prompt];
                                console.log("LOOOL", item);
                            }
                        });
                    });
                }
                if(treeNumber === 2) {
                     currentConversation.tree_2.forEach((item, i) => {
                        console.log("for", item);
                        $currentPrompts.forEach(prompt => {
                            console.log("if item === prompt.id", item === prompt.id);
                            if (item === prompt.id) {
                                currentConversation.tree_2[i] = prompt.prompt;
                                treeBuffer = [...treeBuffer, prompt.prompt];
                                console.log("LOOOL", item);
                            }
                        });
                    });
                }
                if(treeNumber === 3) {
                     currentConversation.tree_3.forEach((item, i) => {
                        console.log("for", item);
                        $currentPrompts.forEach(prompt => {
                            console.log("if item === prompt.id", item === prompt.id);
                            if (item === prompt.id) {
                                currentConversation.tree_3[i] = prompt.prompt;
                                treeBuffer = [...treeBuffer, prompt.prompt];
                                console.log("LOOOL", item);
                            }
                        });
                    });
                }
                if(treeNumber === 4) {
                     currentConversation.tree_4.forEach((item, i) => {
                        console.log("for", item);
                        $currentPrompts.forEach(prompt => {
                            console.log("if item === prompt.id", item === prompt.id);
                            if (item === prompt.id) {
                                currentConversation.tree_4[i] = prompt.prompt;
                                treeBuffer = [...treeBuffer, prompt.prompt];
                                
                                console.log("LOOOL", item);
                            }
                        });
                    });
                }

                console.log("treeBuffer", treeBuffer);

                locked = true;
            }
        }
      }

    
    

    $: console.log("currentConversationTree", $currentConversationTree);
    $: console.log("availableTrees", availableTrees);
    $: console.log("currentConversation", currentConversation);


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
        {#each treeBuffer as prompt}
        <div class="chat chat-end">
            <div class="chat-header">
                assistant
            </div>
            <div class="chat-bubble chat-bubble-primary"> {prompt}</div>
        </div>
        {/each}
    
    <WritePrompt promptType="user" writeToTree={true} treeNumber={treeNumber} conversationTreeId={currentConversation.id} />
    {:else}
        Plus de conversation à répondre
    {/if}
</section>