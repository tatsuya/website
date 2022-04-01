---
layout: post
title: Implementing Passwordless Login with Magic Links
date: 2020-06-24 00:52
image: /assets/images/2020-06-23-magic-links.png
author: Tatsuya Oiwa
tags: [English]
---

When creating a login feature on a website, a typical implementation is to have a form with a combination of a username and password, or to integrate with external platforms such as Google and Facebook using the [OAuth](https://oauth.net/) authentication mechanism.

There is also an alternative way called **Passwordless Login**. A passwordless login is, as the name suggests, a method allowing the user to login without entering a password. For example, instead of asking the user to enter a password, a website can send a short authentication code, such as a one-time password, via email or SMS to verify the user's identity.

**Magic Links** is another unique implementation that enables passwordless login. If you have ever used services like Slack or Medium, you may have seen those magic links. Instead of the authentication code as described above, a URL called a magic link is sent to the user. And clicking on the URL will automatically complete the login process. From the user's point of view, it works like **magic**.

I just recently implemented these magic links. Here's how it actually works 👇.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We recently created a passwordless login (aka magic link) on <a href="https://t.co/YJcixgGgra">https://t.co/YJcixgGgra</a>, so please give it a try! <a href="https://t.co/2NRULFw8jG">pic.twitter.com/2NRULFw8jG</a></p>&mdash; Tatsuya Oiwa (@hey_tatsuya) <a href="https://twitter.com/hey_tatsuya/status/1275667734454579201?ref_src=twsrc%5Etfw">June 24, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The overall communication flow between the user and the system is as follows.

1. *User*: Press the Send Magic Link button.
2. *System* : Generate an authentication token that is unique to that user and includes the generated token in the URL of the magic link and send it to the user by email.
3. *User* : Click on the magic link URL from the email inbox.
4. *System*: Extract and verify the token in the magic link and return the authenticated status to the user if the token is valid.

## Implementing the Magic Links

The core of the implementation of magic links is **#2 token generation** and **#4 token verification** parts. These implementations fall into two broad categories, **stateful implementations** and **stateless implementations**.

## Stateful Implementations

A summary of the stateful implementation is as follows:

1. Generate an authentication token as an arbitrary string (e.g., a random string).
1. Store the generated tokens in the server's data store with an associated user info and expiration date.
1. Send the generated token with the magic link.
1. Token verification is accomplished by matching the state of the token stored in the server's data store.

## Stateless Implementations

On the other hand, a stateless implementation would look like this:

1. Generate an authentication token with user information that is digitally signed.
1. Send the generated token with the magic link.
1. Token verification is accomplished through electronic signature verification.

The biggest difference between the two is that a stateful implementation requires a separate data store on the server side (with each token state on the server side), whereas a stateless implementation does not require that. An example of a token to achieve a stateless implementation is the [JSON Web Token (JWT)](https://jwt.io/).

(In addition to the above, there is also a way to use a third party service that provides passwordless login, including magic links. For example, [Auth0](https://auth0.com/docs/connections/passwordless/guides/email-magic-link) provides the ability to generate magic links, send emails, and validate tokens in one place.)

## Advantages and Disadvantages

### Stateful Implementations

- Advantages: Simple logic. Flexible token strings. Ability to revoke issued tokens as needed.
- Disadvantage: Increased complexity of the system due to the need for a data store. Scalability issues arise when handling a large number of requests at the same time.

### Stateless Implementations

- Advantages: No datastore is required. Fast token generation and verification.
- Disadvantage: The token implementation logic is more complex. Difficulty of revoking issued tokens.

## Magic Links at Quartz

At [Quartz](https://qz.com), where I currently work, we adopted JWT as the token for magic links and ECDSA as its signature algorithm. A variety of signature algorithms can be used for JWT, but compared to RSA, which is a typical asymmetric encryption algorithm (e.g., [all Auth0 tokens use RSA256 by default](https://community.auth0.com/t/jwt-signing-algorithms-rs256-vs-hs256/7720/5)), ECDSA can generate shorter tokens because [it reduces the key size instead of sacrificing processing speed](https://auth0.com/blog/json-web-token-signing-algorithms-overview/#RSA-and-ECDSA-algorithms).

*日本語版はこちら 👉 [マジックリンクでパスワードレスログインを実現する](/ja/magic-links/)*
