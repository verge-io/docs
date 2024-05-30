## 1. Overview

In this guide, you will learn how to write content for vergeOS and reach a wide audience of both beginner and advanced users such as developers and system administrators.

We will start by looking at general guidelines, the structure of a guide and go through the publication and review process.

### What you’ll learn

- How to create and structure a guide from a single Markdown file
- How to use the additional Markdown features specific to the engine
- How to render it locally to see what your readers will see
- How to get it ready for review by the Ubuntu Docs team

Depending on the topic and your level of experience, writing a guide can be a very easy task, but following these guidelines is important to keep the whole set of published guides consistent. Let’s get started!

## 2. General guidelines

### Mission of Verge guides

These are step by step guides aimed at a very diverse audience. To provide a good learning experience, a consistent and didactic approach is key.

A good guide should:

- be focused on one topic or a very small group of related topics. Keep it simple and on point as people who want to learn multiple subjects will take multiple guides.
- produce a tangible result. The topic is demonstrated with a _small practical project_ and not only a theoretical or “hello world” example. The reader will come out of it with a working example on their environment.
- be short. An estimated 60 minutes for a guide is an absolute maximum. Most guides should be in the range of 15 - 30 minutes.
- be divided in short steps. Each step is practical and results in user-visible progress.
- be entertaining! Try to have a fun project to work on, even if it’s something impractical!

### Tone

The tone of your guide should be friendly. Try to make the reader feel that they’re building and learning something together with you.

All guides should have the same tone, regardless of the topic. This is why you should complete one or two of the existing guides before writing your first one.

In short, this isn’t a teacher/student paradigm, but rather friends sharing some time together. Thus, “**we**” should be used as much as possible, like “**we have just seen**”, “**we now understand that…**”. However, “**you**” can be used for demonstrating things in the user’s context, like: “**edit your file**”, “**your directory should look like this**”, “**on your system**”, etc.

And now, let’s see the first required step!


## 3. Metadata and structure

Each guide is built using a single topic and written in markdown

### Title of the topic

The title should be kept short (3 to 8 words as a guide) to not break the design. Try to make concise titles but also specific when possible, e.g. “Create a bootable USB stick on Windows 10”

### Steps

Each step is delimited by a second level title, for example:

```

## Step title

```

A step **Duration** in the `MM:SS` format should immediately follow the step title. The total time will then be computed automatically. A third level heading or empty line will break into the step content.

```

## Step title

Duration: 2:00

Step content starts here.

```

### Basic example

If we put these pieces together here is what a very simple guide looks like:

```

## This is the first step

Duration: 2:00

This is the content of the first step.

## This is the second and final step

Duration: 1:00

Congrats, you made it!

```

Once these structural pieces are out of the way, we can start getting into the most interesting part: the content.

## 4. Introducing your content

First impressions matter and the first page of your guide should be welcoming and informative. An “Overview” page should be the first step of every guide.

The overview contains at least three small parts:

- a summary
- a “What you’ll learn” section
- a “What you’ll need” section.

### The summary

The first paragraph or paragraphs of the overview is a summary of the guide’s objectives, its purpose and why the reader should go through it. An image can be included, as well as external links.

#### Example

```

## Overview

Duration: 1:00

Turning your website into a desktop integrated app is a relatively simple thing to do,

but distributing it as such and making it noticeable in app stores is another story.

This guide will show you how to leverage Electron and snaps to create a website-based

desktop app from scratch and publish it on a multi-million user store shared between

many Linux distributions.

For this guide, the website we are going to package is

an HTML5 game called [Castle Arena](http://castlearena.io).

![[attachments/a361b386f978bbc29a6924da0277460a_MD5.png]]

```

### The “What you’ll learn” section

This section includes the list of topics covered by your guide. It’s a way to align readers expectations with the content they are going to read. Topics are presented as bullet points.

#### Example

```

### What you'll learn

- How to create a website-based desktop app using Electron
- How to turn it into a snap package
- How to test it and share it with the world

```

### The “What you’ll need” section

This is the list of prerequisites the reader needs to meet before starting the guide. If there is a need for specific hardware, software or user accounts, this is the right place to talk about it. If there is a need for specific technical knowledge to go through your guide, use this section as an opportunity to link to documentation and other guides.

Prerequisites are presented as bullet points.

#### Example

```

### What you'll need

- Ubuntu Desktop 16.04 or above
- Some basic command-line knowledge

```

### All the pieces together

When we put all of these pieces together, here’s what an Overview step looks like:

```

## Overview

Duration: 1:00

Turning your website into a desktop integrated app is a relatively simple thing to do,

but distributing it as such and making it noticeable in app stores is another story.

This guide will show you how to leverage Electron and snaps to create a website-based

desktop app from scratch and publish it on a multi-million user store shared between

many Linux distributions.

For this guide, the website we are going to package is

an HTML5 game called [Castle Arena](http://castlearena.io).

![[attachments/a361b386f978bbc29a6924da0277460a_MD5.png]]

### What you'll learn

- How to create a website-based desktop app using Electron
- How to turn it into a snap package
- How to test it and share it with the world

### What you'll need

- Ubuntu Desktop 16.04 or above
- Some basic command-line knowledge

```

When you are done with your friendly and informative introduction, you can start adding more steps (remember, second level titles are used to declare the start of a step) and build your guide story.

To do so, we will now go through some content recommendations.

## 5. Dos and Don’ts

In addition to the previous advice on what a guide should be and what is mandatory, you should pay special attention to the following points:

### Each step should be concise, but not too short

Be wary of a step’s length. On average, 5 to 10 minutes is more than enough for a single step to complete. Don’t make them too short either. Naturally, some steps will be shorter than others (such as the first and last steps).

### If too long, prefer dividing the guide

Tutorials are self-sufficient, but they can nonetheless build upon each other (you can link from the requirements section of the first step, for example). One guide could require another guide to be completed first. And if you are reusing the same code, ensure you provide a repository as a starting point.

If a guide is too long, consider breaking it up into several pieces. However, ensure all guides present a distinct objective.

### Don’t have too many steps

Steps should be concise and guides should be rather short. Consequently, you shouldn’t have too many steps in your guide. We don’t want to make the reader desperate by glancing at the number of remaining steps before guide completion.

### Each step should be rewarding

As a writer, you should try to keep the reader entertained at each step and this is achieved by careful story building. Each step should end on concrete progress towards the end goal. It should be, if possible, tangible and interactive, so that the reader can be familiarised with notions introduced by the step.

To earn bonus reader commitment points, finish a step on a “cliffhanger”!

### Make intentional mistakes

This could seem counterintuitive at first. However, learning by fire (or rather, by error here) is a key way of learning new things. Executing, erroring, analyzing and fixing has multiple benefits:

- Users will be familiar with a particular error, and even if they don’t remember explicitly how to fix it the next time they encounter it, they will have some clue and some deja-vu feeling which will guide them towards its resolution.
    
- Providing the perfect answer from the start hides complexity and a lot of non-formally written subtleties. Forcing readers to face them will ensure that the guide written doesn’t take these subtleties as a given and will greatly help newcomers.
    

A concrete example of this is, in the “Create your first snap” guide, how we introduce building a snap. After creating the parts, we immediately build the snap and install it. Then, we try to execute one of the snap binaries, but no such command is found! That way, we can introduce the fact (in the following step) that binaries are not exposed by default as part of the snap. We can use this “mistake” to introduce further concepts.

### External links in guides

Links to external websites are forbidden during a guide. We don’t want people’s attention diverted from the task they are going through (which emphasizes the fact that each step should have enough knowledge to be self-sufficient). In particular, do not link the reader to the reference documentation. We want to keep the user’s attention on the current task only. Download links are allowed though.

As previously written, only the first and last steps can (and probably should) link to external documentation for prerequisites or learning more on a particular topic. The same rule applies to external websites for libraries or frameworks.

### Do not separate exercises and answers

In general, try to avoid leaving the user hanging for the right answer. Tutorials aren’t a class/lesson or a test to pass with some exercises.

In particular, to avoid a teacher/student relationship, do not separate questions and answers (apart from cliffhangers as previously stated, but the questions you are asking your audience are more rhetorical in that case!).

### Do not repeat the setup/install phase for each guide

Avoid repetitive setups or installation phases, particularly if the guide isn’t a beginner one. Beginner guides should contain a setup phase while more advanced guides should reference other beginner guides as prerequisites.

### Command line snippets

Inline commands are styled with single backticks :

For example:

```
`foo/something --bar`
```

Which renders as `foo/something --bar`.

For longer example code we expect people to type in, we do not use the command prompt at the beginning of each line, and we separate the command from the output. This makes the command and outputs clearer and also easier to copy and paste.

#### Example

‘’

` Run the following command:

```

cat my_file

```

This will display the content of the file:

```

Awesome my_file content

on multiple lines

```


Finally, the code blocks (commands and code to write) of the guide should be self-sufficient. It means that we don’t expect people to write code or run commands outside of what we expose in code blocks, and only typing and executing their content should lead them to the desired state.

## 6. Rewarding your readers

On the last page of a guide, the project is finished and you remind readers they have reached their goal and have grown some new skills.

Take one or two paragraphs to remind them of what they went through and what they have achieved. That way, readers can reflect upon the various steps and their newly acquired knowledge. Ensure you use a friendly title for this final step.

For example, as a reader of this guide, you should have understood what’s needed to create a successful learning experience, what the recommendations are, and how the Markdown syntax works. You now know how to deploy the website locally and how to propose your content for review!

On the last page, make sure you also include at least one of the following sections:

- Next steps
- Further reading

### “Next steps”

With a list of bullet points, offer some guidance on the next steps a reader may want to take. This could be other guides being the “next logical ones”, communication channels and places where to get support from.

#### Example

```

### Next steps

* If you need support, the [snapcraft forum](https://forum.snapcraft.io) is the best place to get
all your questions answered and get in touch with the community.

```

### “Further reading”

With another list of bullet points, provide a list of external resources to get more information on the topic. You can link to documentation, related source code, or blog posts that will provide more insights.

#### Example

```

### Further readings

* The snapcraft documentation has everything you need if you want to look more

into [hooks](https://docs.snapcraft.io/build-snaps/hooks)

and [scriptlets](https://docs.snapcraft.io/build-snaps/scriptlers).

```

To use everything the system has to offer, let’s look at some syntax tips.

## 7. Syntax tips

The syntax used is by and large regular markdown, but there are some specificities as we use mkdocs-material:

### Line breaks and empty lines

- Paragraphs are delimited by empty lines
- Line breaks will create a new line

In the context of an admonition or a survey widget, using an empty line will close it and go back to text.

### Images

Images can be hosted locally (relatively linked to the markdown source) or remotely. The system will fetch remote images and cache them locally.

In Markdown the syntax for an image is the following:

```

![image title](image-path-or-link)

```

### Admonitions

Admonitions follow a simple syntax: a block starts with `!!!`, followed by a single keyword used as a The content of the block follows on the next line, indented by four spaces:

!!! note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Changing the title
By default, the title will equal the type qualifier in titlecase. However, it can be changed by adding a quoted string containing valid Markdown (including links, formatting, ...) after the type qualifier:

!!! note "Phasellus posuere in sem ut cursus"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Removing the title

Similar to changing the title, the icon and title can be omitted entirely by adding an empty string directly after the type qualifier. Note that this will not work for collapsible blocks:

!!! note ""

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Collapsible blocks

When Details is enabled and an admonition block is started with `???` instead of `!!!`, the admonition is rendered as a collapsible block with a small toggle on the right side:

??? note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

Adding a `+` after the `???` token renders the block expanded:

???+ note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
### Supported types

Following is a list of type qualifiers provided by Material for MkDocs, whereas the default type, and thus fallback for unknown type qualifiers, is `note`:
- note
- abstract
- info
- tip
- success
- question
- warning
- failure
- danger
- example
- bug
- quote
