# REDUCE COMPLEXITY

## wishlist

## MVP

- frame + lex content: combination is not smooth
- Lex
  - design shadow picker
  - use gradient picker for text
  - outline missing on hover
  - copy lex
  - after pasting, new line is coming at end
    - tried using paste plugin not working
  - glow border
  - reset style
  - outer padding
  - outer gradient
- code-hike
  - add outer padding and gradient
  - mark horizontal padding + container padding
  - font implemented but should fetch from google font or cdn
  - download grammars from net
  - selection of text by cursor dragging not working rather it drags the component
  - copy code hike
- add noise
- gradient picker
  - custom from, via, to
  - add more gradient
- img
  - copy image
  - add your image
  - try demo image (unsplash)
  - size slider of image
- frame
  - not able to drag or resize frame if content added inside
  - background
    - gradient
      - 32 pre-defined gradients
      - custom gradient colors
      - gradient direction
    - solid color
    - image
    - unsplash
  - pattern
    - circle (few set of options)
  - roundness
  - noise
  - size
    - auto, yt thumbnail, tweet, ig post, ig story, dribbble,
    - app store 6.5 in, app store 5.8 in
    - ph, pinterest,linkedin,chrome extension
    - adapt screenshot, open graph, square 1:1, wide 16:9
- container
  - card border styles
    - none
    - border (solid, dotted), border radius
    - 3 dot and other styles
    - shadow - slider
    - border style picker
- option
  - preserve selected value
- zoom
  - after zoom text is going away from screen
  - in zoom mode not able to create new element
- icon
  - arrow with right facing very less
  - alignment helper with grid or something. make it smooth
  - use left, right, up, down arrow to slightly move the same
- shape
  - rough rect, give some padding
  - rotating handle is not appearing for line
  - copy shape
  - line with two dot
    - resize, rotate handle needs to be implemented
  - arrow
    - SIGNIFICANT work needs to be done
- design
  - logo
  - hover to options
  - shadow panel
  - tooltip
  - gradient picker for text gradient

## After MVP

- save
- multi selection
- prismjs theme
- templates

## drawing to sketch

[ Context: https://www.usetracy.com/ ]

## style panel

Right hand side panel to modify all the style like figma.

## styling code snippets

1. ❌ making bold any word after code highlight
   this trying to change span to em
2. ❌ applying highlight color any word after code highlight
   applying inline css style
3. adding Klass?
   created custom node. still not able to interfer with code node

As per initial analysis, it seems that code styling is bit problematic.
We can duplicate CodeNode and allow set inline styling but that feels hacky.
Better not to modify the framework code. It will be maintenance nightmare.

## svg cleanup

1. if svg generated by inkspace, delete `<sodipodi:namedview />` and `<defs />`

## resources

- [https://www.mshr.app/] CSS Gradient
