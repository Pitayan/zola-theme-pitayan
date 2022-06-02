---
title: "A brief talk about technical debt"
slug: technical-debt
description: "From the mouth of Ward Cunningham, he first used the technical complexity ratio as a liability, referred to as technical debt (technical debt)."
date: 2020-07-16
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Management
extra:
  keywords: technical debts,team management,project management
  image: ./images/cover_image.jpg
---

## What is technical debt?
"Techinical Debt" comes from the mouth of [Ward Cunningham](https://en.wikipedia.org/wiki/Ward_Cunningham), he first used the technical complexity ratio as a liability, referred to as "technical debt".

Software development is a very complicated project, so many people consider "software development" as "software engineering". Software is aimed at serving various industries (finance, medical, shopping, etc.). Thus our programmers may not fully understand that certain field in order to control it under our expertise properly. In the end, software architecture will inevitably result in having lots of "technical debts".

Although technical debt is inevitable, but it is a problem of quantity as a matter of fact.

## How did technical debt arise?
I think technical debt has mainly three categories.

- Doucment Debts
    1. [Requirements Debts](#1-requirements-debts)
    2. [Development Document Debts](#2-development-document-debts)
    3. [Test Document Debts](#3-test-document-debts)
- Program Debts
    1. [Structural Debts](#1-structural-debts)
    2. [Coding Debts](#2-coding-debts)
    3. [Business Logic Debts](#3-business-logic-debts)
- Management Debts
    1. [Deadline Debts](#1-deadline-debts)
    2. [Turnover Debts](#2-turnover-debts)
    3. [Coordinated debts](#3-coordinated-debts)
    4. [Cost Debts](#4-cost-debts)

## Doucment Debts
#### 1. Requirements Debts
> A software developer who does not understand requirements analysis is not a good software developer.

In case of problems, a developer must provide prompt feedback and communication with superiors or customers. If Some requirements cannot be done then he/she must stay skeptical toward those requirements and deny them properly.

Other than just do complainings privately, it's always better to find the right way to feedback problems and know how to communicate effectively. So that we could let customers or leaders understand the technology difficulties.

In another way around, if the developer does not understand the project requirements but develops the project blindly. It will lead to a mismatch between the business spec and the development, and this will cost more time or even money due to the mistakes.

#### 2. Development Document Debts

This usually happends when the development documentation is incomplete, or the documented function is inconsistent with the source code under development.

There are two following reasons:

1. (***Rare***) The project has no development documents. There are no relevant technical documents such as coding regulation documents and interface documents. It's hard enough to just look at the code without looking at the documentation, even if the semantic variable names and function names are easy to understand quickly.
2. (***Common***) The project has not updated the development documentation. There were documents in the early stage, but later the documents haven't been updated ever since, because some requirements are almost newly added temporarily. This results in a large amount of redundant source code when the project is iterated later.

The development document is the most systematic and comprehensive reflection of the project. It is easier to understand the project's functional modules than to see the source code directly. Therefore, it's very very important to keep the development document being updated in order to stay helpful to other team members.

#### 3. Test Document Debts
It happens when the project has low test coverage and insufficient test cases.

In most companies, in order to control labor costs, software testing is done by software development engineers rather than professional test engineers. This often overlooks some software vulnerabilities and berried some technical debts ahead.

> Lookers-on see most of the game.

If a company does not attach importance to testing, then the result is definitely an unqualified product.

## Program Debts
#### 1. Structural Debts
Inadequate assessment of the project structure in the early stage resulted in irrational project organization and high coupling. This makes it difficult to expand and maintain in the later stage.

With business requirements constantly increasing, projects are difficult to move on. Bugs and leaks are prone to occur if things are not taken carefully. Later, it was found that the source was extremely difficult to change, and we will have to restart everything over.

#### 2. Coding Debts
The low coding quality makes it difficult for the development team to work together. When software product iterates, there will be a pile of technical debts. And software products are full of bugs and difficult to maintain.

Here are some common cases:

1. Naming Convention: No naming convention but loosely named.
2. Code complexity: too many conditional statements / too complicated flow control / too much code nesting (or callback hells)
3. Code coupling: The parameters, classes, and interfaces are highly coupled
4. Code lines: There are a lot of unused codes.

A Good, unified coding specification brings a lot of advantages to project iteration and maintenance. And also conducive to refactoring and reducing technical debts to a certain extent. Of course each team has its own standards. The above are only reference indicators, not the only indicators.

#### 3. Business Logic Debts
Such "debts" is likely to happen if we patch the bugs or leaks in an opportunistic method every time without in-depth thinking about our business logic or a thorough understanding of the cause of the vulnerability.

To make things easy, we fix the code vulnerability through simple excessive condition judgment, or force the modification of user data in the database.

This kind of unsuccessful one-time plan, is undesirable and meanwhile causes more technical debts.

## Management Debts
#### 1. Deadline Debts
The deadline of the project is also one of the reasons for technical debt. The current project is mostly aiming at taking the money quickly after the project is done.

In order to seize market share, companies want to produce products in the short term, so software developers must only use some old solutions to speed up the development.

The quality of the developed product is not much different from the previous one, so the software life cycle is as short as the previous one.

#### 2. Turnover Debts
A high-mobility team makes project development difficult or slow.
What's more, the different capabilities of the developers in the team have their own style. Even though the code style is standardized, but everyone programs in the way they are already used to.

Technical debt has to increase because of the team members' turnovers.

#### 3. Coordinated debts
We need to let the people on the development team know: "Who am I, where am I, and what am I doing."

There are 2 notable things:

1. The manager must fully understand his/her own position and do whatever he/she should do, not to interfere too much with the work of the team members, but to monitor the quality of the team members' work.
2. The manager must assign the development tasks of the team members seriously and divide tasks and duties clearly. Avoid task duplications.

Good cooperation can avoid some repetitive tasks and reduce software redundant code. In another aspect, it'll promote project development efficiency with less effort, and ensure that it is carried out on schedule.

#### 4. Cost Debts
The hardware and software environment determine the cost debts of the project. Only by controlling the costs can we get more benefits. Smart managers will never be greedy for small advantages. Looking at the immediate benefits will cause greater cost  issues later.

Spend the money when we need it, don't be mean at it.

## Do technical debts need to be repaid?
> Yes. Certainly.

We can't avoid technical debts. But the cost of not paying technical debt is higher.

By paying back the tenchnical debts, we can avoid software vulnerabilities and improve software functionalities. And what's more, we don't need to let our teammates work over time too much.

If we don't, we certainly cannot support large-scale project requirements. To refactor the source code based on the current business logics will have some techinical risks.

It's up to you whether to pay back the debts.

In short, an experienced and excellent software engineer will never easily bear excessive technical debts. Even if you encounter technical debts, no matter how much, you can still pay back technical debts. Only in this way will it become a veritable software engineer who will not be eliminated by companies or the era.

## References
- [https://www.cnblogs.com/Sroot/p/9110835.html](https://www.cnblogs.com/Sroot/p/9110835.html)
- [Business vector created by pikisuperstar - www.freepik.com](https://www.freepik.com/free-photos-vectors/business): cover image
