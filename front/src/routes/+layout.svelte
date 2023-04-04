<script>
  import Nav from "$lib/components/Nav.svelte";
  import Tasks from "$lib/components/Tasks.svelte";
  import { watchUserChange,watchConversationTreeChange, watchPromptsChange, currentUser } from "$lib/store";
  import { onMount } from "svelte";
    import "../app.css";

    onMount(() => {
      watchUserChange();
      watchPromptsChange();
      watchConversationTreeChange();
    });

  </script>
    <Nav />
    <div class="m-14">
      <slot/>
    </div>
