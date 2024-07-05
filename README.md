** REDUCE COMPLEXITY **

## wishlist

- multi selection
- lex > select after create
- line spacing
- prismjs theme
- code > font
- rough rect, give some padding

## drawing to sketch

https://www.usetracy.com/

## style panel

Right hand side panel to modify all the style like figma.

## styling code snippets

1. ❌ making bold any word after code highlight
   this trying to change span to em
2. ❌ applying highlight color any word after code highlight
   applying inline css style
3. adding Klass?
   created custom node. still not able to interfer with code node

As per initial analysis, it seems that code styling is bit problematic. We can duplicate CodeNode and allow set inline styling but that feels hacky.
Better not to modify the framework code. It will be maintenance nightmare.

## svg cleanup

1. if svg generated by inkspace, delete <sodipodi:namedview /> and <defs />