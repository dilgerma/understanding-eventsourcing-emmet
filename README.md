## Understanding Eventsourcing - Typescript Edition

This is the sample project for the Book "Understanding Eventsourcing" using Node, ExpressJS, Typescript and Emmet

[Buy the book on Leanpub](https://leanpub.com/eventmodeling-and-eventsourcing)

The first book to combine Eventmodeling, Eventsourcing to plan and build Software Systems of any size and complexity.

The Eventmodel is here:

[Eventmodel in Miro](https://miro.com/app/board/uXjVKvTN_NQ=/)

If you want to quickly learn about Eventmodeling, here is the original article:

[The original Eventmodeling Article](https://eventmodeling.org/posts/what-is-event-modeling/)

By subscribing to the newsletter you´ll get access to the "little" Eventmodeling Handbook, which can serve as a quick reference in addition to the book.

[The Little Eventmodeling Book](https://newsletter.nebulit.de/)

### Book

The book is available on Leanpub [here](https://eventmodelers.de/das-eventsourcing-buch)

The original Github Repository ( Spring + Kotlin + Axon ) including all source code can be found here:
[Github](https://github.com/dilgerma/eventsourcing-book)

### Sample Application

The sample application is written in ExpressJS, Node, NextJS and Emmet and Supabase

[NextJS](https://nextjs.org/)
[ExpressJS](https://expressjs.com/)
[Supabase](https://supabase.com/)
[Emmet](https://event-driven-io.github.io/emmett/getting-started.html)

You need to have Docker installed.

[Docker](https://www.docker.com/)

## Run the app

This repository contains a generated Node App using ExpressJS, Emmet and NextJS.

99% of the Code is generated

### Get started

First start supabase ( which is the backend used for persistence and authentication / authorization )

```
npx supabase start 
```

Copy the ANON Key from the output and put it into .env.local in the root of the project.

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
```

Start the app

```
npm run dev
```

It will listen on port 3000

Access the app at http://localhost:3000/

All pages except "/" require authentication.


### Code Generation

The source code in the book was mostly generated directly from the Event Model. If you want to see this process in action, I can highly
recommend this E-Mail Course that spans 8 days currently and guides you through the process of creating your own custom Code Generator.

[E-Mail Course](https://newsletter.nebulit.de/generator)

The Tool used for Code Generation is the [Miro Event Modeling Toolkit](https://nebulit.de/eventmodeling-tooling)
