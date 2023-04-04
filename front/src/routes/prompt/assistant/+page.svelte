<script lang="ts">
    import Title from "$lib/components/misc/Title.svelte";
    import { currentConversationTree } from "$lib/store";
    import type {ConversationsTreeRecord} from "$lib/types/pocketbase-types";
    import { onMount } from "svelte";

    let currentConversation = {};
    let availableTrees = [];


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

    $: console.log("currentConversationTree", $currentConversationTree);
    $: console.log("availableTrees", availableTrees);


</script>
<section>
    <Title title="Répondre en tant qu'assistant" />
</section>