
console.log('Coding Dictionary');

const dictionary = {

  // This nested object stores our actual terms and their definitions
  // as nested key:value pairs
  definitions: {
    'method': 'a function which is defined inside an object (i.e. the value of a key)',
    'scope': 'the visibility or lifetime of a variable within a program',
    'variadic function': 'a function which accepts a variable number of arguments'
  },

  lookupTerm: function( term ){
    // console.log(`in lookupTerm('${term}')`);

    term = term.toLowerCase();  // ignore case

    // Check if the term is defined before printing it out
    if( term in this.definitions ){
      console.log(`${term}: ${ this.definitions[term] }`);
    } else {
      console.log(`%cSorry, "${ term }" is not in the dictionary.`, 'color: orange;');
    }

  }, // lookupTerm()

  printAllDefinitions: function(){

    let definitionCount = 0;

    for(const key in this.definitions){
      this.lookupTerm( key );  // instead of console.log(....)
      definitionCount++;
    } // for in

    console.log(`Total entries: ${ definitionCount }`);

  }, // printAllDefinitions()


  addDefinition: function( term, definition ){

    if( term in this.definitions ){
      console.log('This term is already defined:');
    } else {
      // Term not already in dictionary, so it's safe to add
      this.definitions[term] = definition;
      console.log('Term added.');
    }
    this.lookupTerm( term );

  }, // addDefinition


  removeDefinition: function( term ){
  },

  searchAllDefinitions: function( searchString ){
    // Look for the search string in the definition text of all of the terms
  }



}; // dictionary end
