---
title: "Post 3 with its UNIQUE title" # Quotation marks allow colons, semicolons, etc.
description: "The UNIQUE description for Post 3." # Quotation marks allow colons, semicolons, etc.
date: 2019-01-19T03:25:00-06:00
updated: 2019-10-06T14:00:00-05:00 # Comment-out this line with a # if content is unchanged
draft: false # Make it "true" if you don't want Zola to "publish" yet
extra:
  subtitle: "The UNIQUE Post 3 subtitle" # Quotation marks allow colons, semicolons, etc.
  author: Your name goes here
---

Your opening text goes here.

## In-article heading --- it's an H2 because your title is the H1

And after another paragraph or two or three, you may want to add a subheading, which would be an H3, so it would be like the following.

### Subheading (H3)

Text here.

And here is an example of how to use the `imgc` shortcode in `/templates/shortcodes`:

{{ imgc(path="posts/2019/01/post-3/screen-cap-from-Pippin-Williamson-s-page-builders-review.png", alt="Screen capture showing shortcodes from a WordPress page builder", width=986, height=482) }}

Closing text. That ends Post 3!