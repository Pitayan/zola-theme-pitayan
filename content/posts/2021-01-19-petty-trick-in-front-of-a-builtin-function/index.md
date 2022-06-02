---
title: "A petty trick in front of a builtin function"
slug: petty-trick-in-front-of-a-builtin-function
description: "Lately, I was working on a project that’ll heavily concentrating on the server-side. Although those server-side stuffs aren’t really my expertise. The lucky part is that this project is about process the HTTP header and return a proper json as response."
date: 2021-01-19
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Algorithm
extra:
  keywords: gethostbyname, get domain name, substring domain name
  image: ./images/cover_image.png
---

Lately, I was working on a project that’ll heavily concentrating on the server-side. Although those server-side stuffs aren’t really my expertise. The lucky part is that this project is about process the HTTP header and return a proper json as response.

After most of my challenges are completed, there’s one last problem for me to solve:

> “How do I get only the domain name and extension name out of a host name?”

For instance, you’ve got some string domains as input:

```sh
www.google.com
www.google.co.jp
mail.google.com.hk
```

The expected output should be:

```sh
google.com
google.co.jp
google.com.hk
```

After some research, I came to know that there’s a builtin function `gethostbyname` from a native C library `netdb` which can be directly adopted into my program. The function is well explained in the [https://www.gnu.org/software/libc/manual/html_node/Host-Names.html](https://www.gnu.org/software/libc/manual/html_node/Host-Names.html).

Just take a look at the solution out there, it’s easily parsing the hostname into a easy-to-use data structure which completely is the final answer to look for.

Actually, before I investigated this builtin function, I’ve got myself another solution. And here is what I thought.

## My own approach

Just by taking look at the input and output. It’s obviously an easy problem of processing strings. The first idea I came up with was cutting the first group of strings and return the rest of them.

My idea was obviously naive after running a couple of tests. Because some scenarios like multiple sub-domains weren’t taken into consideration.

For instance, a host name like this one:

```sh
one.two.abc.com
```

Expected result:

```sh
abc.com
```

If I only cut the first group of strings. The result is:

```sh
two.abc.com
```

It’s still far from the correct answer. Then I realized that such “obviously easy” algorithm problem shouldn’t be solved by a brute force. There must be a certain pattern  in it.

My ration told me to list all of the elements from the hostnames and then find out some aspects to brainstorm with later.

Alright. What does a hostname consist of?

> Domain name + Delimiter + Extension name

For `google.com`

- google as domain name
- `.` as delimiter
- com as extension name

Okay. I think I’ve found something here...

There’s actually a simple formula to balance the numbers of delimiters and sectors

```txt
delimiters = sectors - 1
```

Usually the extension is either 1 sector (.com) or 2 sectors (co.cc). So if I could enumerate all of the 2-sector extensions, then the domain name is apparently an easy catch.

Why?

It is quite common to say that species of the 2-sector extensions aren’t many. Most of such extensions starts with either “co” or “com”. For instance, co.jp & com.hk.

So in all, the solution would be doing the following things:

1. Split the hostname by delimiter of “.”

   ```sh
   e.g. www.google.com.hk -> [“www”, “google”, “com”, “hk"]
   ```

2. Check if the second to last element is “co” or “com”
3. if `yes`, then take the third to last element as domain name.
4. if `no`, then take the second to last element as domain name.

## Implementation

Here is my implementation in C:

```cpp
function getdomainbyhost(char *http_host)
{
  char *res = calloc(128, sizeof(char));

  // return directly if Dev env
  if (!strcmp(http_host, "localhost") ||
      !strcmp(http_host, "127.0.0.1") ||
      !strcmp(http_host, "0.0.0.0"))
  {
    sprintf(res, "%s", http_host);

    return res;
  }
  // Get "." occurrence frequency in host
  // e.g. a.b.google.com.hk => 4
  // e.g. b.google.com.hk => 3
  // e.g. google.co.jp => 2
  // e.g. google.com.hk => 2
  // e.g. google.com => 1
  int occur = 0;
  for (int i = 0; http_host[i] != '\0'; ++i)
  {
    if (http_host[i] == '.')
    {
      ++occur;
    }
  }

  if (occur == 1)
  {
    sprintf(res, "%s", http_host);

    return res;
  }

  char *arr[32];
  int i = 0;
  char domain_name[128];
  memcpy(domain_name, http_host, strlen(http_host));
  domain_name[strlen(http_host)] = '\0';
  char *token = strtok(domain_name, ".");

  while (NULL != token)
  {
    arr[i++] = token;
    token = strtok(NULL, ".");
  }

  // If it's 2-worded domain extension, check the second to last word
  // e.g. google.com.hk => check "com" => google.com
  // e.g. some-service.google.com => => check "google" => google.com
  regex_t regex_domain_ext;
  regcomp(&regex_domain_ext, REGEX_DOMAIN_EXT, REG_EXTENDED | REG_NOSUB);
  int match_result = regexec(&regex_domain_ext, arr[occur - 1], 0, NULL, 0);
  regfree(&regex_domain_ext);

  if (match_result != REG_NOMATCH)
  {
    sprintf(res, "%s.%s.%s", arr[occur - 2], arr[occur - 1], arr[occur]);
  }
  else
  {
    sprintf(res, "%s.%s", arr[occur - 1], arr[occur]);
  }

  return res;
}
```

It’s perhaps never a good solution. And it may look a bit buggy and will not pass some of the QA tests. Just as you know, I'll have to use the builtin function `gethostbyname`.

But I believe it's a good practice of solving problems in an unique way. Maybe in the feature days when I take a look back on what I’ve done here, I’ll think myself a super idiot coming out with such dumb solution.
