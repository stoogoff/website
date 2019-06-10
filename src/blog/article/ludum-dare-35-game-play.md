---
collection: [Article, Gaming]
title: Ludum Dare 35 Game Play
summary: |
  I've got no idea what I'm calling this but the idea of the game is to merge different coloured blocks to create a shape based off of a tetrimino. Merging two blocks the same colour creates a shape and changes the colour. Merge all of the blocks until you have the shape.
tags: 
  - ludum dare
  - ld35
  - game play
publish_date: 2016-04-16T08:00
layout: blog/article.hbs
---

1. Several different colour blocks are displayed in a grid,
2. Tap two adjacent blocks of the same colour,
3. The blocks merge together and change colour,
4. Repeat until you have the final shape.

![Stage One]($media/img/ld35-gameplay-1.png)
![Stage Two]($media/img/ld35-gameplay-2.png)
![Stage Three]($media/img/ld35-gameplay-3.png)
![Stage Four]($media/img/ld35-gameplay-4.png)

There's a colour chain of e.g. red -> green -> blue, which informs how the blocks change colour.

There's an indicator showing what shape you need to create.

The game gets harder by:

1. Introducing more blocks
2. Introducing more colours
3. Removing the colour from the target indicator
