---
collection: [Article, Writing]
title: Storytel.la
summary: |
  In my day-to-day life I'm a software developer and Technical Director of [Nomad Co-operative](http://nomad.coop). One of the things we've released recently is [Storytel.la](http://storytel.la), which is *a writing tool with a programmer's mindset.*
tags: 
  - storytella
publish_date: 2013-09-23T12:00
image:
  source: media/img/blog/storytella.jpg
  type: image/jpeg
  text: Pen and Paper
  width: 2121
  height: 990
layout: blog/article.hbs
---

## What Does That Mean?

One of the more important talents of a programmer is to spot patterns. If a piece of software does two (or more) things which are kind of the same it's best to smooth out any differences and have one piece of code responsible for all of the things which are similar. This is a good practice as it means any [bug fixes][bug] or improvements happen in one place.

One of my (probably many!) failings as a writer is I can never decide on character or place names. When I was using Word or [Libre Office][libre] I would end up with things like `<PERSON1>` or `<PLACE3>` littered through the document. These would eventually be replaced when I thought of the name.  Which was fine, until I decided the name should be changed *again*. Then there's the problem of short and long forms of names. If I had a character called **Rebecca Smith**, who is sometimes referred to as just **Rebecca** or even **Becky** or sometimes **Becca** and may have a middle name which gets mentioned then changing that name becomes a long-winded, error-prone, manual process.

I'm of the opinion that any long-winded or error-prone processes should be handled by a computer, rather than by me.

## Solution 1

My first solution was to make up a name immediately and stick to it. This slowed my writing to a crawl. If a new (and sometimes unexpected) character appeared in a scene, even if they were unlikely to appear in any other scene, then my writing would stop while I figured out a name. Sometimes it wouldn't stop for long, occasionally it would completely break my flow.

Sticking with a name was equally difficult. I write a lot of fantasy and names are intrinsically linked with culture. If a culture changes for some reason (it happens!) then it's possible all of the names of people belonging to that culture will need to change as well. If you're writing contemporary fiction this probably doesn't happen as often, but as a fantasy writer this kind of naming consistency is vital to establishing the setting.

## Solution 2

My second solution was [Storytel.la][storytella], which allows markers (we call them entities) to be placed in the text and their values to be set or modified in one place. The concept is identical to variables in a programming language. To insert an entity into the text you surround it with braces, like this: `{{ person.name }}`. Entities can contain more than one piece of information, so if, for example, the person has a short form of their name you could do `{{ person.short_name }}`. How you name entities and what information you keep with them is entirely up to you. I often keep brief descriptions of characters with the entity. I'm never going to insert it into my writing but it makes for a convenient reference.

## You Can't Decide on Character Names?

Another author once asked me this with a look of horror on their face. They were mortified that I couldn't decide on a character name and were sure that there must be something wrong with my writing or the character(s) in question wasn't important to the story. Personally I think a [character's name][names] is only important because you have to write it so much and the reader has to read it. It needs to be concise and memorable, but it doesn't *really* say that much about the character. The story you're telling is what says a lot about the character. Sometimes a character only appears in one scene. It still may be easier to user their name to refer to them. That character may develop and become more important to the story, requiring a change in name or an evolution of their name.

Character names are important but they're not cast in stone during the writing / editing / re-writing process.

[Storytel.la][storytella] is currently free so give it a try! We're also interested in any feedback anyone has so don't be afraid to [send us a message][email] about it or ask us questions.

[storytella]: http://storytel.la
[bug]: https://en.wikipedia.org/wiki/Software_bug
[libre]: https://www.libreoffice.org/
[names]: https://www.youtube.com/watch?v=Xblh12XgQ4o
[email]: mailto:info@nomad.coop
