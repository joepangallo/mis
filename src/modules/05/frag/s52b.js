/* ===== s52b ===== */
PROSE.s52b = `
<span class="eyebrow">Section 5&ndash;2b</span>
<h2>Communicating and cooperating in public</h2>
<p class="lede">The chapter sorts social media by the job it does: communicate, cooperate, collaborate, connect. This section takes the first two. Communication is a firm putting something out and hearing back. Cooperation is the arrangement where one person's contribution improves everybody else's outcome, including the contributor's.</p>

<h3>Three ways a firm talks in public</h3>
<p>Three tools carry almost all of it, and they differ in length, in audience and in how long the exchange stays open.</p>
<ul class="keys">
<li><b>A blog</b> is an online diary of dated entries, long enough to explain something, published on a site the author controls; firms use one because it reads as more approachable than a press release.</li>
<li><b>Microblogging</b> broadcasts short status updates in near real time to anyone who chooses to follow, with topics marked by a <b>hashtag</b> and a topic tagged faster than others said to be <b>trending</b>.</li>
<li><b>Instant messaging</b> is real-time written conversation, and it has absorbed internal team channels, customer-facing live chat, and automated assistants that gather details before passing somebody to a human.</li>
</ul>
<p>The chapter takes one criticism of blogging seriously: publishing without editorial process brings news out fast and produces what one critic calls the amateurization of journalism, with unverified sources and visible bias. Answering customers on a microblog has the mirror-image cost, since the channel that signals attentiveness hands critics the same megaphone.</p>

<div class="activity" data-activity="cooExplore"></div>

<h3>Cooperation, and why it is not collaboration</h3>
<p>Cooperation creates a win-win: one participant's success improves the chances of the others. Nobody has to work on the same thing at the same time, which is what distinguishes it from collaboration.</p>
<p>Media sharing is the clearest instance of it working.</p>
<ul class="keys">
<li><b>An embedded video</b> hosted on a sharing site makes somebody else's article better and brings the video an audience, and neither party had to negotiate anything at all.</li>
<li><b>Webcasts</b> extend the same logic to on-demand audio and video, which organizations use for shareholder meetings, training, road shows and recorded lectures.</li>
<li><b>Subscription feeds</b>, such as <b>RSS</b>, close the loop by notifying readers of new content, so nobody has to remember to check forty sources by hand.</li>
</ul>

<p>Live video is the newest form and the hardest to govern. Broadcasting as it happens lets a firm answer questions in the moment, and it also removes every check between something occurring and an audience seeing it.</p>
<p>The chapter is blunt that continuously monitoring live broadcasts is close to impossible for the platforms themselves, and it cites a murder streamed live in 2016 to make the point. A firm going live is accepting the same asymmetry at a smaller scale.</p>

<h3>Metadata is the quiet part</h3>
<p><b>Metadata</b> is data about data: who, where, when, why. Some is captured automatically &mdash; a document's author and save time, a photograph's date, shutter speed and coordinates &mdash; and some has to be added by a person.</p>
<p>The added kind is a <b>tag</b>, and tags are what make user-generated content findable at all, because photographs and videos categorise themselves no better than they title themselves. A <b>tag cloud</b> displays them with size standing in for frequency, so the shape of a collection is visible at a glance.</p>
<p>Geospatial metadata is called a <b>geotag</b>, and it is where this gets serious. Coordinates attached to a photograph put it on a map, which is how a mapping service can show pictures, reviews and landmarks it never produced.</p>
<p>It is also how a photograph of a man in hiding, posted by a journalist who forgot to strip the location, led police to the place it was taken.</p>

<div class="activity" data-activity="cooCase"></div>

<h3>Sharing what you found, and what you own</h3>
<p>Two more cooperative forms round out the section, and both work on the same principle: individually useful, collectively far more useful.</p>
<ul class="keys">
<li><b>Social bookmarking</b> lets people share the pages they found worth keeping, and the categories they build together are called a folksonomy, so each additional participant makes the shared set more complete for everybody.</li>
<li><b>Social cataloging</b> does the same for collections rather than links &mdash; books, music, academic citations &mdash; which is why researchers use shared citation tools to assemble reference lists they would otherwise each build alone.</li>
</ul>
<p>Both have a use inside a firm that the chapter is specific about. Bookmarking maps the islands of knowledge in an organization, which makes it possible to find the person who already knows something. Cataloging structures the volume of information a firm holds about suppliers, complaints and products so it can be reached later.</p>

<div class="activity" data-activity="cooMatch"></div>

<p class="takeaway">Communication tools change what a firm can say and who can answer. Cooperation tools change what a firm gets for free. Metadata is the connective tissue under both, and it is the part that leaks, because most of it is attached without anybody deciding to attach it.</p>

<div class="activity" data-activity="cooQuiz"></div>
`;

ACT.cooExplore = {
  kind: "explore",
  label: "Explore",
  title: "Six public tools, four questions each",
  how: "Open each card and read all four panels; the same four questions are asked of every tool, which is what makes them comparable, and no real company is named.",
  objective: "5.2",
  labels: ["What it does", "What a firm gets from it", "What it does not solve", "Where it goes wrong"],
  items: [
    {
      icon: "LOG",
      name: "Blogs",
      sub: "Long-form, chronological, owned",
      what: "Publishes dated entries at whatever length the subject needs, on a site the author controls, usually with comments or a linked discussion.",
      real: "A voice that reads as a person rather than as a communications department, and a place to explain a decision at length before anybody else frames it.",
      absent: "It does not reach anybody by itself. A blog with no audience is a filing cabinet, and building the audience is a separate and much harder job.",
      why: "Speed at the expense of verification. The chapter's charge of amateurization is that corners get cut to publish first, and a company blog carries the firm's name when they are."
    },
    {
      icon: "SHRT",
      name: "Microblogging",
      sub: "Short updates, public by default",
      what: "Broadcasts brief status updates in near real time to anyone who has chosen to follow, with topics marked by hashtags and repostable by recipients.",
      real: "A public channel for answering customers where other customers can see it happening, which is a signal about the firm as much as an answer to one person.",
      absent: "It cannot hold an explanation. Anything requiring context has to live somewhere else, with the post serving only as a pointer to it.",
      why: "The channel belongs to everybody. A hashtag a firm creates can be taken over by its critics within hours, and the chapter's example of exactly that involved a police department."
    },
    {
      icon: "CHAT",
      name: "Instant messaging",
      sub: "Real-time written conversation",
      what: "Carries synchronous written exchanges between two people or a group, now including team platforms organised into channels and customer-facing live chat.",
      real: "Immediate feedback without booking anybody's time, and a customer service channel that costs far less per conversation than a telephone line.",
      absent: "It produces no durable record anybody will find later. Decisions made in a channel are lost to the next person unless somebody writes them somewhere else.",
      why: "Everything becomes urgent. A medium built for immediate answers tends to be used for questions that did not need one, which is the interruption cost distributed teams complain about."
    },
    {
      icon: "PLAY",
      name: "Media sharing and webcasting",
      sub: "Host once, consumed anywhere",
      what: "Publishes images, video, audio or presentations on a hosting service, where others can view them in place or embed them in their own pages.",
      real: "Reach the firm did not pay for. An embedded video improves somebody else's page and gains an audience in the same movement, which is cooperation working as advertised.",
      absent: "It does not give the firm control of the surrounding context. Content is consumed next to whatever the embedding site put there, including a competitor.",
      why: "Live video in particular. Content appears faster than anyone can review it, and the chapter is clear that continuously monitoring a live broadcast is close to impossible."
    },
    {
      icon: "TAG",
      name: "Tagging and geotagging",
      sub: "Metadata added by hand and by machine",
      what: "Attaches descriptive keywords, and sometimes coordinates, to content so it can be categorised, searched and placed on a map.",
      real: "Findability. Photographs, videos and documents are almost unsearchable without it, and a tag cloud shows the shape of a collection without anyone reading it.",
      absent: "It does not make tags consistent. Ten people tag the same thing ten ways, which is why an untended tag set degrades rather than improves.",
      why: "Location metadata attached without anybody deciding to attach it. The chapter's case is a photograph that revealed where a man in hiding was, because nobody thought to strip it."
    },
    {
      icon: "MARK",
      name: "Social bookmarking and cataloging",
      sub: "Shared collections, shared categories",
      what: "Lets people save and categorise links or items publicly, building shared categorisation systems that grow more useful as more people contribute.",
      real: "Inside a firm, a map of who knows what. The chapter's point is that shared bookmarks expose the islands of expertise an organization chart does not show.",
      absent: "It does not evaluate anything. A heavily bookmarked page is popular rather than correct, and the two are easy to confuse when you are in a hurry.",
      why: "It depends entirely on participation. Below a certain number of contributors a shared collection is worse than one person's own bookmarks, and nobody returns to it."
    }
  ]
};

ACT.cooCase = {
  kind: "case",
  label: "Mini case",
  title: "The photographs that gave away a site",
  how: "Read the brief and the exhibit, then take the three decisions in order; the firm and every detail attached to it are hypothetical and were invented for this exercise.",
  objective: "5.2",
  brief: "A civil engineering consultancy posts progress photographs from its projects on a public media-sharing account, which its marketing team says has been the single most effective thing it does. A client's security officer has just called to say the photographs reveal the location and layout of a site the client had asked to keep unpublicised. Nobody at the consultancy typed a location anywhere. The consultancy is hypothetical and every detail here is invented.",
  facts: [
    {k: "The firm", v: "A civil engineering consultancy of about ninety staff"},
    {k: "What it posts", v: "Progress photographs taken on site with ordinary smartphones"},
    {k: "Why it posts them", v: "The account is its main source of enquiries from new clients"},
    {k: "What the client says", v: "The photographs disclose the location and layout of a site meant to stay unpublicised"},
    {k: "What nobody did", v: "Nobody typed a location, a client name, or an address into any post"}
  ],
  exhibit: {
    name: "Exhibit A &middot; What was in the files, and where it came from",
    caption: "The information the client's officer was able to recover, and how each piece got there. Every detail here is invented for practice.",
    headers: ["What was recoverable", "How it got into the file", "Did anyone choose to publish it"],
    rows: [
      ["Latitude and longitude of each photograph", "Attached by the phone when the picture was taken", "No"],
      ["Date and time of each visit", "Attached by the phone when the picture was taken", "No"],
      ["Phone model, and therefore which employee", "Attached by the phone when the picture was taken", "No"],
      ["Site layout and equipment on the ground", "Visible in the photographs themselves", "Yes, by choosing the shot"],
      ["Sequence of construction across four months", "Reconstructed from the dates across the set", "No"],
      ["A hashtag naming the type of structure", "Typed by the marketing team", "Yes"]
    ]
  },
  questions: [
    {
      q: "Four of the six lines were published by nobody. What is the general lesson the chapter draws from that?",
      opts: [
        "Photographs should not be published from any site a client has asked to keep private",
        "Some metadata is captured automatically, so publishing content publishes more than the content",
        "Smartphones are unsuitable for professional photography and a camera should be used instead",
        "Hashtags are the real risk, since they are the part a person deliberately typed"
      ],
      a: 1,
      why: [
        "That would resolve this case and states a policy rather than a lesson. It also gives up the firm's best source of enquiries to avoid a problem that has a narrower fix.",
        "Correct. The chapter distinguishes metadata captured automatically from metadata a person adds, and geotags are its example of the former becoming a disclosure nobody intended.",
        "A dedicated camera records the same categories of metadata, and many record coordinates too. The device is not what produced the exposure.",
        "The hashtag was chosen deliberately and is the one line the firm can already see. The difficulty is with the five it could not."
      ]
    },
    {
      q: "The marketing team proposes deleting the account. What is the strongest objection?",
      opts: [
        "Deletion does not remove copies already downloaded, so the exposure persists regardless",
        "It removes the firm's main source of enquiries to solve a problem with a narrower fix",
        "The client asked for the site to be unpublicised, not for the whole account to be closed",
        "The photographs are the firm's own intellectual property and deleting them wastes an asset"
      ],
      a: 1,
      why: [
        "This is true and it is an argument about what deletion achieves rather than about whether to delete. The exposure has to be handled either way.",
        "Correct. The facts say the account is the firm's main source of enquiries. Closing it converts a fixable metadata problem into a permanent loss of the channel, which is the cooperation benefit the chapter describes being thrown away.",
        "The client's request does define the scope of the harm, and staying inside a client's request is not by itself a reason to reject a firm's own precaution.",
        "The photographs are indeed the firm's, and no asset argument outweighs a client disclosure. This reason would not survive the meeting."
      ]
    },
    {
      q: "What should the consultancy change so that this cannot happen again?",
      opts: [
        "Ask each client at the start whether photographs may be published from their site",
        "Have a second person review every photograph before it is posted publicly",
        "Strip location metadata before publication, and confirm publication rules per client",
        "Post photographs only after a project has finished and the site has been handed over"
      ],
      a: 2,
      why: [
        "Asking permission is necessary and covers only the part somebody chose to publish. It does nothing about coordinates a phone attached without anybody knowing.",
        "A second reviewer looking at the picture sees what the first reviewer saw. The disclosure was in the file rather than in the image, so another pair of eyes on the image catches nothing.",
        "Correct. One change removes the automatic metadata, and the other governs the deliberate content. The case needs both, because the two lines of the exhibit have entirely different causes.",
        "Delaying publication reduces the operational risk during construction and leaves the location, the dates and the sequence just as recoverable afterwards."
      ]
    }
  ],
  debrief: "This is the chapter's geotag example with a firm attached to it. The important distinction is the one the exhibit is built around: metadata a person typed against metadata a device attached. The firm can review the first by reading its own posts, and it cannot see the second at all without going looking. Notice too what the case refuses to do. Closing the account would solve the disclosure and destroy the cooperation benefit that made the account worth having, which is nearly always the wrong trade, and the fix that survives is narrow, mechanical and applied before publication rather than after."
};

ACT.cooMatch = {
  kind: "match",
  label: "Match",
  title: "Which kind of metadata is this?",
  how: "Pair each example with the term the chapter gives it; every pair explains itself once matched.",
  objective: "5.2",
  pairs: [
    {
      l: "The author, creation time and last-saved time stored inside a document file",
      r: "Metadata captured automatically",
      why: "The chapter's own example of metadata a person never enters. It is written by the software as a by-product of ordinary use, which is why nobody remembers it is there."
    },
    {
      l: "A keyword a person types onto a photograph so it can be found later",
      r: "A tag",
      why: "The manually added kind. The chapter's point is that content which cannot describe itself needs somebody to describe it, and that this is what makes user-generated content searchable at all."
    },
    {
      l: "The latitude and longitude recorded when a picture was taken",
      r: "A geotag",
      why: "Geospatial metadata, which is what allows content to be placed on a map, and what allowed a mapping service to show photographs and reviews it never produced."
    },
    {
      l: "A display where a word's size shows how often it was used",
      r: "A tag cloud",
      why: "A way of visualising a set of tags so the important or frequent ones are immediately visible, without anybody reading the collection they came from."
    },
    {
      l: "The shared categorisation that emerges as many people bookmark and label pages",
      r: "A folksonomy",
      why: "Categories built by users rather than imposed by a librarian. Its value grows with participation, which is why the chapter treats social bookmarking as a network-effect application."
    },
    {
      l: "A shared catalogue of academic citations that researchers build and reuse",
      r: "Social cataloging",
      why: "The same idea applied to collections rather than links. Researchers assemble reference lists from a catalogue many people contributed to instead of each building one alone."
    }
  ]
};

ACT.cooQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Communication, cooperation, and metadata",
  how: "Three questions on the categories and their consequences; every option explains itself, including the ones you did not pick.",
  objective: "5.2",
  questions: [
    {
      q: "What makes an arrangement cooperative rather than collaborative, in the chapter's sense?",
      opts: [
        "The participants work on the same artefact, but at different times rather than together",
        "The participants are outside the firm rather than employed by it",
        "The work is unpaid, which is what distinguishes it from a commercial arrangement",
        "Each participant pursues their own aim, and one participant's success improves the others'"
      ],
      a: 3,
      why: [
        "Working on one artefact at different times is asynchronous collaboration, which the chapter treats separately. Cooperation does not require a shared artefact at all.",
        "Cooperation happens inside organizations as readily as outside them, and shared bookmarking among colleagues is one of the chapter's own internal examples.",
        "Payment is irrelevant to the distinction. Plenty of cooperative arrangements are commercial, and the mutual benefit is what defines them.",
        "Correct. The chapter defines cooperation as a win-win in which one participant's success improves the chances of the others, which is why an embedded video helps both the host page and the video."
      ]
    },
    {
      q: "A marketing team creates a hashtag and invites the public to post with it. What does the chapter say to expect?",
      opts: [
        "The topic will trend if enough of the firm's own followers post with it early",
        "Whoever posts with it decides what it means, and critics can take it over",
        "The firm can retire the hashtag if the campaign is not going the way it hoped",
        "Reach will be limited to followers, since a hashtag is visible only to them"
      ],
      a: 1,
      why: [
        "Trending happens when a topic is tagged faster than others, and a firm's own followers are a small input to that. The chapter's caution is about direction rather than volume.",
        "Correct. The chapter's example is a police department that invited photographs with its hashtag and received pictures of alleged brutality instead. The tag is a public channel, and nobody owns what enters it.",
        "A firm can stop using a tag and cannot stop anyone else from using it. That asymmetry is exactly the risk the example illustrates.",
        "Hashtags exist to make posts findable beyond a follower list. Limited visibility would remove both the benefit and the risk."
      ]
    },
    {
      q: "Which of these is a genuine reason a firm might run social bookmarking internally?",
      opts: [
        "It maps where expertise sits, so somebody can find who already knows a topic",
        "It replaces enterprise search, since bookmarks index everything employees have read",
        "It provides a permanent archive of external pages the firm relies on",
        "It reduces browsing, because employees stop looking for pages colleagues already found"
      ],
      a: 0,
      why: [
        "Correct. The chapter says enterprise-oriented bookmarking makes it easy to map islands of knowledge within an organization, which is a way of finding the expert rather than the document.",
        "Bookmarks cover the fraction of content somebody bothered to save. Enterprise search exists to reach documents, databases and applications nobody bookmarked at all.",
        "A bookmark is a pointer. If the page changes or disappears the bookmark records only that it once existed, which is the opposite of an archive.",
        "Reducing effort is a plausible side effect, and the value the chapter identifies is finding the person, not saving the minutes."
      ]
    }
  ]
};
