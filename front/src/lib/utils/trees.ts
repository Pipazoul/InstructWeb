import type { ConversationTree } from "../types/conversationTree";
// If tree_x is null the append to array of available conversations
export function getEmptyTrees(conversations: Array<ConversationTree>): Array<ConversationTree> {
    // get conversation["tree_" + index]
    let buffer: Array<ConversationTree> = [];
    conversations.forEach((item:ConversationTree) => {
        let push = false;
        for (let i = 1; i < 4; i++) {
            if (!item["tree_" + i][0]) {
                push = true;
            }
        }
        if (push) {
            buffer = [...buffer, item];
        }
    });
    return buffer;
}

export function getFilledTrees(conversations: Array<ConversationTree>): Array<ConversationTree> {
    // get conversation["tree_" + index]
    let buffer: Array<ConversationTree> = [];
    conversations.forEach((item:ConversationTree) => {
        let push = false;
        for (let i = 1; i < 4; i++) {
            if (item["tree_" + i][0]) {
                push = true;
            }
        }
        if (push) {
            buffer = [...buffer, item];
        }
    });
    return buffer;
}

export function pairTrees(trees: Array<ConversationTree>): Array<ConversationTree> {
    let push = false;
    let buffer: Array<ConversationTree> = [];
    trees.forEach((item: ConversationTree) => {
        for (let i = 1; i < 4; i++) {
          // if tree_x is not null or has pair number
            console.log(item["tree_" + i].length > 1 && item["tree_" + i][0])
            if (item["tree_" + i].length % 2 === 0 || item["tree_" + i][0]) {
                push = true;
            }
        }
        if (push) {
            buffer = [...buffer, item];
        }
    });
    return buffer;
}

export function choosePairTrees(conversation: ConversationTree): ConversationTree {
    console.log("HELLO", conversation)
  // filter out trees that are empty or have an odd number of elements
  let tree: Array<Object> = [];
  for (let i = 1; i < 4; i++) {
    if(conversation["tree_" + i].length > 1){
        if (conversation["tree_" + i][0] || conversation["tree_" + i].length % 2 !== 0) {
            tree.push({ tree: conversation["tree_" + i], treeNumber: i });
          }
    }
  }

    return tree;

}


interface Tree {
    tree: Array<Object>;
    treeNumber: number;
}

export function chooseImpairTrees(conversation: ConversationTree): Array<Tree> {
  // filter out trees that are empty or have an odd number of elements
  let tree: Array<Object> = [];
  for (let i = 1; i < 4; i++) {
    if (conversation["tree_" + i][0] && conversation["tree_" + i].length % 2 !== 0) {
      tree.push({ tree: conversation["tree_" + i], treeNumber: i });
    }
  }

  return tree;
}
