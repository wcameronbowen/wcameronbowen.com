<post-metadata>
  <post-title>Using Soupault</post-title>
  <post-date>2024-08-14</post-date>
  <post-tags>soupault</post-tags>
</post-metadata>

AKA "How I Setup This Site v2"

## Problem
I love static sites (not the problem). They are simple and take little space or bandwidth. Static sites load quickly (even without caching), and can be hosted for free or almost free (goodbye subscriptions). Most importantly, they are the antithesis of WordPress. 

There's a catch though. I could write HTML and CSS, but I'm aiming for spending time thinking/writing, not tweaking HTML tags or CSS rules. I need to lower the friction to putting words on a screen or I will end up attempting to optimize what has not even been built. Optimization will crowd out the main purpose of the site. The goal is a thinking tool. However, I do need **some** modern features. 

I need to:
1. Generate HTML from markdown
1. Generate CSS for a reasonably responsive site 
1. Parse the given files to create a list of posts and feed
1. Get out of my way when I want to write

Cue the long list of static site generators with which I have fallen in and out of love. A good portion of them killed by the 1) abstractions getting in the way or 2) dependency hell when installing the tool itself (or a related theme). I tried no theme with Hugo to avoid all that and it worked decently enough, but it felt like I was fighting the tool. It also didn't have nearly the user base/community as some of the older SSGs. My experiences with Jekyll and Github Pages were frustrating to say the least. Of course you could point out, "well if you don't know Go or Ruby, don't use Hugo or Jekyll". Fair, when I used Hugo, I didn't yet know Go. When I used Ruby, I expected to be using it more, but a job change shifted that. This still leaves me with a problem. I need a tool that gives a few common abstractions without forcing me into endless themes and too many abstractions. Bonus points for a tool that gives me the ability to strip away those abstractions when needed/desired.

My first attempt for this site was with Jekyll, it's tried and true. Jekyll has been around for years and seems a popular option. It is very well supported with some exceptions (*cough* looking at you Github Pages *cough*). Have you installed Ruby recently? Have you installed Ruby on Fedora and tried to install dependencies with `gem` and `bundler`? You can see my first attempt with Jekyll at [How I Setup This Site](/blog/setting-up-this-site/), due to some unique ways in which Fedora handles Ruby Gems you have to be very careful at initial setup. I ran into multiple issues install gems and using bundler. I am by no means a regular Ruby user and after stumbling around I found someone who shared my pain and [cared to write](https://tartansandal.github.io/fedora/ruby/2020/02/05/installing-ruby-gems-on-fedora.html) about it!

## Solution

One day I stumbled across [Soupault](https://soupault.app/). In its own words:

> _Soupault (soup-oh) is a static website generator/framework that works with HTML element trees and can automatically manipulate them._

I love that soupault is centered around HTML. I do want my tools to (slowly) force me to fundamentals. However, I need that at a pace that doesn't distract from the goal, developing a writing habit. Soupault does that for me. I can use a markdown pre-processor to generate raw HTML, but if one day I decide I want to start writing my own HTML I can easily switch by creating `.html` files instead of `.md` files and changing a couple lines in the `config.toml`. 

The soupault install is a single binary. That's it. No crazy dependencies or themes. If development stops, I can use it for years to come. Aside from the creepy logo (really, a hobby horse?) I am in love once again.

### How I Use It
Grab the binary and run it from the root of my site.

```bash
soupault
```

To preview before pushing a changes, spin up a quick web server.

```bash
python3 -m http.server --directory build
```

I even made a handy alias in my `.bashrc`.
```bash
alias write='soupault && python3 -m http.server --directory build'
```

On commit to [main](https://github.com/wcameronbowen/wcameronbowen.com), Netlify grabs my files, downloads `soupault`, and runs it! That's it, my local development is as simple as having the following:

1. Pandoc (for converting markdown to html)
1. Soupault binary

Since Python and Git are the default on most Linux or BSD installs I work with I did not include them above.

