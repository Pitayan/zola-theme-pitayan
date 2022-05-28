---
title: "Post 1 with its UNIQUE title" # Quotation marks allow colons, semicolons, etc.
description: "The UNIQUE description for Post 1." # Quotation marks allow colons, semicolons, etc.
date: 2018-10-17T14:40:00-05:00
updated: 2019-04-11T20:33:00-05:00 # Comment-out this line with a # if content is unchanged
draft: false # Make it "true" if you don't want Zola to "publish" yet
extra:
  subtitle: "The UNIQUE Post 1 subtitle" # Quotation marks allow colons, semicolons, etc.
  author: Your name goes here
---

Your opening text goes here.

## In-article heading --- it's an H2 because your title is the H1

And after another paragraph or two or three, you may want to add a subheading, which would be an H3, so it would be like the following.

### Subheading (H3)

Text here.

And here are some examples of how to use the `imgc` shortcode in `/templates/shortcodes`:

{{ imgc(path="posts/2018/10/post-1/Typography-scr-cap-2-2018-10-16.jpg", alt="Thin and dim text that is hard to read", width=1344, height=200) }}

{{ imgc(path="posts/2018/10/post-1/Typography-scr-cap-3-2018-10-16.jpg", alt="More thin and dim text that is hard to read", width=1398, height=252) }}

{{ imgc(path="posts/2018/10/post-1/Typography-scr-cap-4-2018-10-16.jpg", alt="Still more thin and dim text that is hard to read", width=1398, height=164) }}

Closing text. That ends Post 1!