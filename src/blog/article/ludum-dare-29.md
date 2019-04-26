---
collection: [Article, Gaming]
title: Ludum Dare 29
summary: |
  Last week I joined in with a few thousand people making video games.
tags: 
  - ludum dare
  - ld29
publish_date: 2014-05-03T13:00
image:
  source: media/img/blog/the-drowning-man.jpg
  type: image/jpeg
  text: The Drowning Man Game
  width: 604
  height: 773
layout: blog/article.hbs
---

[Ludum Dare][ld] is two contests rolled into one big game development challenge. The compo is a 48 hour contest where a single game developer attempts to build a game --- including all code, graphics and audio --- within 48 hours. The jam is the same thing with slightly more relaxed rules. Teams are allowed and you get an extra day.

The theme was announced at 2am <abbr title="British Summer Time">BST</abbr>, which I stayed up for. This time it was *Beneath the Surface* which immediately made me think of someone trapped beneath ice. I figured that ice and underwater themes would be quite popular so I spent an hour brainstorming. My *next* thought was [Spelunky][spelunk], which perfectly fits the theme! Of course, I wouldn't want to try and recreate Spelunky in 48 hours and I certainly wouldn't want to copy a game for the competition.

After some [brain storming][bs] I started working on a tunnelling game which was going to involve stopping moles from chewing through water pipes, electrical cables and brick foundations. After a few hours getting to grips with [Phaser][ph] and getting a basic platformer in place I decided I'd taken on too much. There were too many moving parts which would require a lot of graphics, each with a lot of animation.

So I scrapped that and started with my original idea.

[The Drowning Man][drown] is an endless swimmer where you are trapped in a fast flowing river under ice. You must swim as far as you can, using holes in the ice to catch your breath, while avoiding floating logs and psychotic fish.

I completed the game with an hour to spare. Completed may be a bit of a strong term as there's no polish to it at all --- destroyed enemies just disappear, no destroyed animations or sound effects. But it's good enough for Ludum Dare and I've had a lot of positive comments.

Since the competition I've spent the past week playing games. The sheer number and quality of the other entries has been astounding! Obviously, the jam entries, with their extra day and team approach, are amazing, polished finished games. For me it's the compo games that really stand out. While some don't have the polish of the jam entries some of the games and, especially, the ideas are amazing.

One pet peeve I have, being a web developer and a Linux user, is the number of games which are marked as web games when they're actually built in [Unity][unity]. Unity is a fantastic technology and a big help in game development, especially now there's a free version. But it's not a web technology. A web technology is some combinations of HTML, JavaScript and CSS, probably with some HTML5 canvas or WebGL added. Unity is a browser plugin, similar to [Adobe's Flash Player][flash]. The other problem with this is there isn't a Unity browser plugin for Linux but there is a Unity player. All anyone has to do to fix the issue is export their game for Linux and upload that.

Pet peeves aside, I had a lot of fun doing Ludum Dare and have plans to improve [The Drowning Man][drown] and, especially, to do more with the music.

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/146732515&color=ff5500&auto_play=false&hide_related=false&show_artwork=true"></iframe>

[ld]: http://www.ludumdare.com/
[spelunk]: http://www.spelunkyworld.com/
[ph]: http://phaser.io/
[drown]: http://www.stoogoff.com/games/ld29/
[unity]: http://unity3d.com/
[flash]: https://get.adobe.com/flashplayer/
[bs]: /notes/view/no-ludum-idea
