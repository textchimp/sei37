console.log('connected!');

const traverseDOM = (node) => {
  console.log( node.nodeName );
  for(let i = 0; i < node.children.length; i++ ){
    const currentNode = node.children[i];
    console.log( currentNode.nodeName );
    // ?????? NO RECURSION! Probably need to add children to an array
  }
};


const traverseDOMRecursive = (node) => {
  console.log( node.nodeName );
  for(let i = 0; i < node.children.length; i++ ){
    const currentNode = node.children[i];
    console.log( currentNode.nodeName );
    // Recursion!
  }
};

traverseDOM( document.body );
//traverseDOMRecursive( document.body );
