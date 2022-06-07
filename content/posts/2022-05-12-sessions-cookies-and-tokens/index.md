---
title: "Interview Officer: \"Tell me about Cookies Session and Tokens\". Me: \"Emm...\""
slug: sessions-cookies-and-tokens
description: I confidently joined an interview with a big IT company but his question about cookies sessions and tokens made me out of words...
date: 2022-05-12
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Network
    - Interview
extra:
  keywords: engineer interview, session cookie, token
  image: ./images/cover_image.jpg
---

In late 2021, I took an interview with a hotshot IT company for a front end engineer position. 
During the interview process, the interview officer’s question of "Tell me about cookie session and token" got me into my knowledge blind spot. 

I will be explaining some details around "cookies" "sessions" and "tokens".  
Meanwhile, hope this article will remind everyone to strengthen related knowledge points so that it could come to help any day in the future when necessary.

## The interview briefing

It was an online interview with only interview officer and me in that meeting. The officer was a bit late but he was still very nice and polite. He introduced himself and the interview flow.

1. Self introduction
2. Recent projects
3. Fundamental knowledge quiz
4. Algorithm quiz

There’re quite few casual talks among the interview and the whole process took about 50 min (should be 1 hour but he was late, so 10 min was gone…). I did my best to answer each questions as I could. 

However, I got stuck when it came to the question below.

*Interview officer: "How much do you know about ‘Sessions’ ‘Cookies’ and ‘Tokens’? Could you explain by giving some examples?"*

*Me: Emm… Sure. Well, cookie is emm… Sorry, I think I can answer it. But could I have 1 minute to prepare the answer?*

(Actually even with 5 minutes, I think I still can’t get through it. 
My brain was simply all blank… Frankly speaking, even I could answer it I think I was only fighting for my ego.)

Then after 1 minute, I began my speech with some stuttering: "Cookie stores on the client side. Session is kept on server side. Token is authorization / authentication credential that helps querying resources. And uh…" (paused for several seconds)

*Interview Officer: Okay, sounds good. Anything else to add? What about the differences between sessions and tokens?*

*Me: Emm… (paused for another several seconds)*

As a result the interview turned into a failed attempt. And after that day of the interview, I’ve set up my mind to study those fundamental knowledge about "Session" "Cookies" and "Tokens".

## The evolutionary history of session

From long ago, our Internet was just a place full of documents for simple browsering purpose. 
The server doesn’t need to remember "who" and "what". Every single HTTP request was just a pure request towards document contents.

Later when users are looking for more interactive functions for example shopping cart and credit card payments, websites started facing a problem which is to memorize and manage the user related information. 
Like "who" put "what" product into "which" shopping cart. 

This means website needs the ability to distinguish every single user. 
It’s a challenging task to the servers since HTTP doesn’t really fit in such "stateful" scenario.

Servers could simply add a "mark" (session id) to each of those who visited / logged-in / purchased. 
In another word, this "mark" is a random and unique string that is created and remains in memory of the web server and can be attached to the HTTP request. 
This "mark" is also stored on the user’s browser as so-called "Cookies". When user started a new request, server will then understand who is requesting.

Such solution brought convenience to the users, however the servers were under a huge burden of remembering each user’s session id. 
As a result, hundreds and thousands of session ids were kept on the servers. A web service’s backend be a cluster (or several clusters) containing tons of server nodes and each of them has to store user’s session id.

Well, this sounds like a "fair" solution by far, isn’t it? 

But what if a user login from "server A" the first time and redirects to another page via "server B" the second time? "server B" doesn’t have the user session id yet… How could "server B" handle such case?

Now, here comes the role of [sticky-session](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html) (also check out this [article](https://www.imperva.com/learn/availability/sticky-session-persistence-and-cookies/)). 
The simplest solution is to only allow user to stick with "server A" which maintains user’s session id. 
But what if "server A" crashed and cannot respond to user’s request? (the well-known ["single-point-of-failure"](https://en.wikipedia.org/wiki/Single_point_of_failure))

![Copy sessions from server A to server B](images/copy_session_id.png)

We can copy the session id from "server A" to "server B". When "server A" crashed, "server B" will still help handle requests.
But it’s not yet optimal because doing "copy-paste" between servers are clearly "cost-effective" especially when there are many many users.

How about we store session ids in another dedicated server as "session server", away from those "servers" that are providing page routing / rendering.
And such server will only maintain the user session ids. To avoid having "single-point-of-failuire", let’s group multiple "session servers" together as one cluster.

![Web server cluster and session server cluster](images/session_cluster.png)

Okay, we separated the website servers into "web server cluster" and "session server cluster". 
([Redis](https://redis.io) and [Memcached](https://memcached.org "") are those popular solutions to session management) 
Even though the sessions are reliable now, managing this little "session" is yet a big burden to the maintainers no matter what.

So, is there a simple and feasible way to manage those sessions only on the client side to make both users and maintainers happy? 
Which can be interpreted as: a user login to the website but the website doesn’t store the user session. 

We can let the server return a "Token" string (the most common example is [JWT](https://jwt.io)) to each logged-in users similarly to "Cookies". 
In order to prevent bad guys faking the "Tokens", we use a hash algorithm (for example HS256, RS256) and a secret key that only we know to generate a "signature". 
This "signature" together with the user id (can also use some other user related information) treated as "Token" is what’s finally stored in the user’s browser.

![Token generation](images/token.png)

When user sends a request together with this token, servers will take some parts ("header" and "payload") from the token and regenerate the "signature". If the signature of the given "token" is the same to the regenerated one, then the user can be considered as logged in. Server should fetch and return the user data. Otherwise, authentication should fail.

Note that,

>Signature is not encryption!

This means we can’t put any sensitive data into the "Token". Because people will still get what’s written in the "Token" easily. 
The below is an example of "JWT" which looks like already encrypted. But actually it’s just a [Base64](https://en.wikipedia.org/wiki/Base64) encoded string.

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNZSJ9.Ftkmp-5WXYuhgSya_Ah97SBQ1ffR5WlWl_1lLsK3DyM
```

With any "Token" decoding tool you could find on the Internet, this "Token" can be decoded into:

```json
{ alg: "HS256", typ: "JWT"}.{ userId: "Me" }.[Signature]
```

Wait… If this can be decoded and seen by anyone else, then it is never safe, isn’t it? 

Right, if someone stole your token and pretend he is you then server doesn’t know this "someone" is the real you or not. 

In another word, 

> One with a "valid" token is a "valid" user.

But this indeed removes the burden of servers managing sessions for user since servers just need to authenticate whether the "token" is valid without remembering any sessions. 
Engineers can now do scalings and maintanences without worrying much about sessions.

## More about "Cookies"

Cookies are small pieces of data (no more than 4kb) that websites store on your computer as records of your interactions with them. 
They’re used by websites to keep track of who you are and to remember things like your indentity information.

This is how websites are able to remember you as you move between pages and return to the same login screen or the same shopping cart. 
Nowadays, web apps also utilizes cookies to allow users to save their preferences for instance themes / local settings.

Some key points of "Cookies".
- Maximum 4kb of data stored on user’s computer
- Not able to cross origin but Top-level domain cookies can be shared to Second-level (and higher levels) domain
- Cookies can be expired
- Cookies’ number is limited for each domain

## More about "Sessions"

Session is a mechanism to save the clients’ information on the server with a certain data structure. 
It represents the process of a session between the server and the client.

For instance, a user session data may contain following information
- user profile
- user authority and authentication
- user group
- etc

In this way, information stored in the session object will not be lost when the user jumps between the application's web pages, and it will persist throughout the user's visiting period. 

However, session will probably be closed when user proactively closes the session, for example closing pages or logging out. To add more, session will also be closed when it expires.

The server’s session usually needs to collaborate with browser cookies to specify the user’s identity because the browser doesn’t know who this "John Doe" is. 

Thus, what’s most commonly seen inside a cookie value is "session_id" which is a unique identification to help server understand the vistor’s identity to proceed to some further actions (e.g. fetch user data).

![How browser and server handle session](images/browser_server_session.png)

Let’s take a look at a real world example.

A user login to a site, the server handles the login request and return the response with a cookie which contains "session_id" in it and gets stored in the user’s browser. 

Then the second time the user redirects himself to a page that requires a login. The request brings the cookie to server. 
And then the server finds that this user has already logged in, it redirects the user with the target page.

Some key points of "Sessions"
- "Session" and "Cookies" are under a cooperative relationship
- Able store any kinds of data structure as identification information
- Stores on server side. Safer than cookies
- "Session" can be expired


## More about "Tokens"

(The "Tokens" here we talk about is the "Web Tokens". The BlockChain related tokens are not in this topic)

"Token" is a series of strings generated by the servers as a token for the user’s request. 
When the user visits the server for the first time, the server will generate a "Token" using algorithms (for instance, [HS256 / RS256](RS256](https://auth0.com/blog/rs256-vs-hs256-whats-the-difference/))) and a secret key according to the unique identifier passed in. 
Then the "Token" is encoded with [Base64](https://en.wikipedia.org/wiki/Base64) and returned to the user side. 
The "Token" can be saved locally as a file or in browser’s memory. In the second time visit, the "Token" will get attached to the requests. 
And then server will validate the token via the same algorithms and the secret key.

Some key points of "Tokens"

- Should be attached to every "resource-fetching" HTTP request’s header when the request requires authentication / validation
- No server-side session required
- Supports mobile devices naturally
- "Tokens" can be expired
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is made available especially when we need to collaborate with other public services or applications or even devices
- Able to circumvent [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) because "Token" is authenticated on the server-side and can be expired

### Access token

An "Access token" is the "Token" mentioned before which is carried together with the requests and as a credential for fetching resources via API endpoints. It has a fixed expire to make user re-authenticate periodically which prevents security issues to a certain extent.

A simple "Access token" can be composed by 
- unique identifier
- timestamp
- signature (a generated string based on )

![How access token works](images/access_token_process_flow.png)

### Refresh token

A "Refresh token" is a good helper to ask server to regenerate a new "Access token". 
It’s considered as a convenient solution because generating the "Access token" requires user’s id and password everytime.

Same to "Access token", "Refresh token" also has an expiry date attached to it but "Refresh token" has a longer expiry. 
Once "Refresh token" expired, user has to redo the login to get a pair of new "Access token" and "Refresh token".

![How refresh token works](images/refresh_token_process_flow.png)

Usually, "Refresh token’s" expiry datetime is stored in the database, it’ll be authenticated and validated only when re-issuing the "Access token". 
Thus, it has a very minimal effect to the backend server performance.

### JSON Web Token (JWT)

A "JWT" string contains

- Header (hash algo for signature)
- Payload (a user data structure containing the unique indentifier)
- Signature (a generated string based on `Header` and `Payload`)

According to [jwt.io](https://jwt.io/introduction),

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. 
This information can be verified and trusted because it is digitally signed. 
JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

To make it short, JWT is a solution to provide authenticated info for crossing origins. 
The official document has done a very clear and in-depth explanation about JWT’s features. 
Allow me skip re-explaining.

"JWT" truly brought us engineers a lot of advatanges. However, its security issue is a nonnegligible topic. 
There's already a good alternative [PASETO](https://paseto.io) to replace "JWT".

For those who are interested in the "JTW" securities, here’re some good articles:

- [https://curity.io/resources/learn/jwt-best-practices/](https://curity.io/resources/learn/jwt-best-practices/)
- [https://paragonie.com/blog/2017/03/jwt-json-web-tokens-is-bad-standard-that-everyone-should-avoid](https://paragonie.com/blog/2017/03/jwt-json-web-tokens-is-bad-standard-that-everyone-should-avoid)
- [http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions)

## In the end

Even this article has already covered quite a few knowledge points of sessions cookies and tokens, but there're a lot more to investigate.

As for the interview I took that time, I think I was good at interactions and double-confirming questions which contributed to a smooth interview process.

## References
- [https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html)
- [https://www.imperva.com/learn/availability/sticky-session-persistence-and-cookies](https://www.imperva.com/learn/availability/sticky-session-persistence-and-cookies)
- [https://en.wikipedia.org/wiki/Single_point_of_failure](https://en.wikipedia.org/wiki/Single_point_of_failure)
