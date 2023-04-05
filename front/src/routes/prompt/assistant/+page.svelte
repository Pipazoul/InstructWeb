<script lang="ts">
    import Title from "$lib/components/misc/Title.svelte";
  import WritePrompt from "$lib/components/WritePrompt.svelte";
    import { currentConversationTree, currentPrompts } from "$lib/store";
    import type {ConversationTree} from "$lib/types/conversationTree";
    import type {Prompt} from "$lib/types/prompt";
    import { onMount } from "svelte";
    import { getEmptyTrees, getFilledTrees, choosePairTrees} from "$lib/utils/trees";
    

    let currentConversation: ConversationTree = {
        id: "",
        initPrompt: "",
        initPromptType: "",
        tree_1: [],
        tree_2: [],
        tree_3: [],
        tree_4: [],
    }
    let availableTre
    let availableTrees: Array<Object> = [];
    let treeNumber: number = 0;
    let locked: boolean = false;

      // for eaach conversationTree, if one of tree_1 / tree_2 / tree_3 is null, then add it to availableTrees
      $: {
        if ($currentConversationTree) {
          let availableEmptyTrees = getEmptyTrees($currentConversationTree);
          let availableFilledTrees = getFilledTrees($currentConversationTree);
          let filteredAvailableFilledTrees = [];

          availableFilledTrees.forEach(item => {
            let pairTree = choosePairTrees(item);
            item.currentTree = pairTree;
            filteredAvailableFilledTrees = [...filteredAvailableFilledTrees, item];
            
          });

          availableTrees = [...availableEmptyTrees, ...filteredAvailableFilledTrees];

          //currentConversation = availableTrees[randomNumber];
          let selectConversation = availableTrees[ Math.floor(Math.random() * availableTrees.length) ];

          console.log("selectConversation", selectConversation);
          // set currentTree for selected conversation
          if(selectConversation) {
            // get initPrompt text from id
            $currentPrompts.forEach(prompt => {
              if (selectConversation.initPrompt === prompt.id) {
                selectConversation.initPrompt = prompt.prompt;
                selectConversation.initPromptType = prompt.type;
              }
            });
        
            if (selectConversation.currentTree) {
              // get prompt from id
              let treeBuffer = [];
              selectConversation.currentTree.forEach((items,i )=> {
                console.log("il y a des items", items);
                items.tree.forEach(item => {
                $currentPrompts.forEach(prompt => {
                  if (item === prompt.id) {
                    console.log("item", prompt.prompt);
                    let newItem = {id: item, prompt: prompt.prompt, type: prompt.type};
                    
                    treeBuffer = [...treeBuffer, newItem];
                  }
                });
                selectConversation.currentTree = treeBuffer;
                  
                });
              });
              currentConversation = selectConversation;
              treeNumber = selectConversation.currentTree.treeNumber;

            } else {
              // if you are here, it means that the conversationTree is not pair or empty
              console.log("HOHo tien")
              // choose random tree only if empty and add it to currentConversation.currentTree
              for (let i = 1; i < 4; i++) {
                if (!selectConversation["tree_" + i][0]) {
                  treeNumber = i;
                }
              }
              selectConversation.currentTree = selectConversation["tree_" + treeNumber];
              currentConversation = selectConversation;

            }
          }

        }
      }


    $: console.log("treeNumber", treeNumber);


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
        {#each currentConversation?.currentTree as item}
        <div class="chat chat-{item.type === "assistant" ? "end" : "start"}">
            <div class="chat-header">
                {item.type}
            </div>
            <div class="chat-bubble chat-bubble-primary"> {item.prompt}</div>
        </div>
        {/each}
    
    <WritePrompt promptType="assistant" writeToTree={true} treeNumber={treeNumber} conversationTreeId={currentConversation.id} />
    {:else}
        <div class="alert alert-info shadow-lg">
            Plus de conversation à répondre pour le moment <br>
            Mais vous pouvez toujours en créer une nouvelle prompt 
            <a class="btn bg-primary" href="/prompt/init">Commencer</a>
        </div>
    {/if}
</section>