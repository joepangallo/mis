/* ===== s53b ===== */
PROSE.s53b = `
<span class="eyebrow">Section 5&ndash;3b</span>
<h2>When it goes wrong, and how fast</h2>
<p class="lede">Every capability in this chapter has an inverse. The reach that carries a campaign carries a complaint at the same speed, the reviews that help buyers choose can be manufactured, and the anonymity that protects a whistleblower protects somebody else entirely. This section is the inverse, and the response playbook that follows from it.</p>

<h3>Two rules the chapter states outright</h3>
<p>The first is that the internet never forgets: material that embarrassed a firm stays retrievable years later, and deleting the original rarely removes the copies. The second is that a firm has to watch continuously and react fast, because the alternative is finding out from a journalist.</p>
<p>Those two rules generate everything else in this section, including the parts that look like separate problems.</p>

<h3>Reviews, posts, pages, and video</h3>
<p>The chapter works through four failure points, and each one fails differently.</p>
<ul class="keys">
<li><b>Reviews</b> are consulted before buying and are not always what they seem: firms hire people to post favourable reviews or unfavourable ones about competitors, and analysis tools have found products where the large majority appear fabricated.</li>
<li><b>Microblogging</b> fails in public and at speed. A police department invited photographs with its own hashtag and received pictures of alleged brutality instead.</li>
<li><b>Company pages</b> are free to host and not free to run: somebody has to watch what appears, and decide where the line sits between content the firm dislikes and content it removes.</li>
<li><b>Video</b> is where it becomes uncontrollable, because a complaint that is filmed rather than written travels to an audience no press office was built to answer.</li>
</ul>
<p>Two of the chapter's examples set the scale. A tenant with a couple of dozen followers was sued over a post about mould, and the coverage of the lawsuit reached a national audience the post never would have.</p>
<p>Two employees posted a prank video from a restaurant kitchen that reached over a million people within days. The company decided not to respond, changed course after two days, opened a public channel and put its president on video, and a later survey found the response had largely restored trust.</p>
<p>The same visibility runs the other way through employment: employers check these networks before hiring, and people have been dismissed over posts they assumed a manager could not see.</p>

<div class="activity" data-activity="crsCase"></div>

<h3>Two more inversions, further from the marketing department</h3>
<p>The chapter carries two cases that are not about a brand's reputation at all, and both run on capabilities earlier sections presented as benefits.</p>
<ul class="keys">
<li><b>Cheap production and free distribution serve any message.</b> The chapter's account of extremist propaganda turns on that and nothing else: portable cameras and simple editing software make high-quality video cheap, and social platforms distribute it globally at no cost, including to recruit teenagers.</li>
<li><b>A contribution buys a promise, not a product.</b> Crowdfunding raises small amounts from many people for projects conventional finance would refuse, and the chapter's examples include campaigns that raised millions and shipped to a fraction of their backers, one that never produced a prototype, and one under investigation.</li>
</ul>
<p>Neither is a failure of the technology. Both are the reach and the low cost this chapter has been recommending, pointed somewhere nobody intended.</p>

<h3>The playbook</h3>
<p>The chapter gives four preparations, and their value is that all of them are done before anything happens.</p>
<ul class="keys">
<li><b>Assemble a crisis team in advance</b>, drawn from inside the firm and outside it, so that nobody is deciding who has authority to speak while the clock is running.</li>
<li><b>Name your worst social media nightmare</b>, and work out what its early signals look like, including the search terms an opponent would use.</li>
<li><b>Monitor the environment continuously</b> and stay connected and responsive, because a complaint you have not seen is one you are not answering.</li>
<li><b>Act fast, because the first day decides the shape of it</b>, and a response arriving after the story has settled is answering a version of events somebody else wrote.</li>
</ul>
<p>Put the whole sequence in order, preparation and response together, and notice how much of it happens before there is anything to respond to.</p>

<div class="activity" data-activity="crsOrder"></div>

<p>Firms do this in practice through social media monitoring. The chapter's example is a manufacturer that opened a listening centre tracking mentions of itself in about a dozen languages, which lets it answer a customer before a problem spreads and doubles as business intelligence.</p>

<div class="activity" data-activity="crsSim"></div>

<h3>What anonymity does, and what algorithms do</h3>
<p>Anonymity online has legitimate uses and a well-documented cost. People who cannot be identified are more likely to enter <b>deindividuation</b>, a loss of self-awareness associated with antisocial behaviour.</p>
<p>An <b>internet troll</b> posts inflammatory content deliberately to provoke, and much of that behaviour is <b>cyberharassment</b>: false accusation, defamation, threats, identity theft and doxing, which is publishing somebody's private details. The chapter's account of one coordinated campaign against several women in the video game industry established a template that is still followed.</p>
<p>The other societal shift is quieter. Editorial judgement about what a public sees has largely been replaced by algorithms predicting what will hold attention, which filters out material that conflicts with a user's existing views. The chapter's balance is worth keeping: the same democratisation lowered the cost of being heard for candidates and causes that could not previously afford it.</p>
<p class="takeaway">A firm cannot prevent any of this. It can decide in advance who speaks, what it is watching for, and how fast it will answer &mdash; and those three decisions, made on an ordinary day, are the whole of what separates a bad week from a lasting one.</p>

<div class="activity" data-activity="crsQuiz"></div>
`;

ACT.crsCase = {
  kind: "case",
  label: "Mini case",
  title: "Four hundred reviews the firm did not know it bought",
  how: "Read the brief and the exhibit, then take the three decisions in order; the firm and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.3",
  brief: "A kitchen appliance brand sells through a large online marketplace. A journalist has emailed asking about a report that flags most of the reviews on its best-selling blender as fabricated. Nobody at the brand commissioned reviews; the marketing agency it hired six months ago appears to have done so, under a contract clause promising rating improvement. The journalist wants a response by tomorrow. The firm is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The firm", v: "A kitchen appliance brand selling through a large online marketplace"},
    {k: "What is alleged", v: "That most reviews on its best-selling product are fabricated"},
    {k: "Who commissioned them", v: "An agency the brand hired, under a clause promising rating improvement"},
    {k: "What the brand knew", v: "Nobody inside the firm asked for reviews or approved any"},
    {k: "The clock", v: "A journalist has asked for a response by tomorrow"}
  ],
  exhibit: {
    name: "Exhibit A &middot; Reviews on the blender, month by month",
    caption: "Reviews received before and after the agency was engaged, with the analysis tool's assessment. Every figure here is invented for practice.",
    headers: ["Period", "Reviews received", "Average rating", "Flagged as likely fabricated"],
    rows: [
      ["Six months before the agency", "94", "3.8", "3"],
      ["First month with the agency", "61", "4.6", "44"],
      ["Second month", "138", "4.7", "119"],
      ["Third month", "151", "4.8", "134"],
      ["Fourth to sixth month", "212", "4.7", "181"],
      ["Sales change over the same six months", "Up 31 percent", "-", "-"]
    ]
  },
  questions: [
    {
      q: "The chief executive wants to say the firm did nothing wrong, since it never commissioned a review. Why is that a poor response?",
      opts: [
        "It is inaccurate, since paying an agency for a rating improvement is commissioning reviews",
        "It answers a question about blame while the public question is about the ratings",
        "It will not be believed, so a firmer denial would serve the firm better",
        "It concedes the agency acted alone, which weakens any later claim against it"
      ],
      a: 1,
      why: [
        "The contractual point is arguable and would be argued somewhere else. Leading with it puts the firm's culpability at the centre of a story that was about whether the ratings can be trusted.",
        "Correct. Buyers want to know whether the rating means anything now. A statement about who is to blame leaves that unanswered, and the chapter's point about trust is that damage lands on the review system and the brand together.",
        "Escalating a denial makes matters worse, and the exhibit is a public artefact that any journalist can reproduce. Firmness is not the variable in play.",
        "Preserving a claim against the agency is a real commercial interest, and it is a reason to word the statement carefully rather than a reason the response fails."
      ]
    },
    {
      q: "Sales rose thirty-one percent over the same period. What should the firm conclude from that line?",
      opts: [
        "The reviews worked, so the commercial damage of removing them will be significant",
        "The rise is unrelated, since a rating change cannot move sales by that much",
        "The rise is now a liability, because it is evidence the firm benefited from this",
        "Nothing yet, because the exhibit does not separate the rating effect from other causes"
      ],
      a: 3,
      why: [
        "The reviews may well have worked and the exhibit does not establish it. Six months also covered whatever else the agency did, along with any pricing, seasonal or promotional change.",
        "A rating rise of nearly a full point on a marketplace listing plausibly moves sales substantially, so dismissing the connection is as unsupported as asserting it.",
        "It will certainly be read that way by others, and treating the firm's own inference as settled because an opponent would draw it is the wrong way round.",
        "Correct. One line showing two things moving together, over a period when several things changed, supports no causal claim. Saying so is the analytically honest position and the one that survives being questioned."
      ]
    },
    {
      q: "What should the firm actually do in the next twenty-four hours?",
      opts: [
        "Respond publicly, say what it found and what it is doing, and fix the contract",
        "Say nothing until the review analysis has been independently verified",
        "Ask the marketplace to remove the flagged reviews before responding publicly",
        "Publish the agency's name and the contract clause, and let the record speak"
      ],
      a: 0,
      why: [
        "Correct. The chapter's playbook says the first day counts and that the response must be fast and appropriate. Acknowledging, stating what was found and naming the corrective action is the shape that a later survey found restored trust in its own example.",
        "Verification is prudent and takes longer than the story does. The chapter's case of a firm that waited two days before responding is the cautionary version of exactly this instinct.",
        "Removing the evidence before commenting reads as concealment whatever the intent, and the flagged reviews are already documented in a report the journalist has.",
        "Naming the agency first makes the story about a contractual dispute between two companies, which is the least interesting version to everyone except the two companies."
      ]
    }
  ],
  debrief: "Two things are happening at once and they need separating. There is a commercial and legal matter with the agency, and there is a public question about whether the ratings mean anything, and only the second is urgent. The exhibit is deliberately seductive: a sales line placed beside a rating line invites a causal claim neither supports, and resisting that is the same discipline the analysis supplement asks for. What survives is the chapter's own playbook. Answer on the first day, say what you found, say what you are changing, and accept that the sentence about who is to blame is the one nobody outside the firm is waiting for."
};

ACT.crsOrder = {
  kind: "order",
  label: "Sequence",
  title: "The crisis playbook, preparation and response",
  intro: "The chapter's four preparations and the response that follows them. Put the whole sequence in the order it has to happen.",
  how: "Drag the steps into order; each one explains why it sits where it does, and most of this sequence happens before there is anything to respond to.",
  objective: "5.3",
  steps: [
    {t: "Assemble a crisis team, from inside the firm and outside it", why: "First, and on an ordinary day. Deciding who has authority to speak, and which lawyer is on the call, is not something to work out while a story is spreading."},
    {t: "Name the worst thing that could plausibly be said about you", why: "Second, because you cannot watch for signals until you know what you are watching for. The chapter asks firms to identify their own nightmare explicitly rather than generally."},
    {t: "Work out the search terms an opponent would use, and watch them", why: "Third, and it follows directly from the previous step. Your own brand name is the term you would think of; the useful ones are the terms somebody attacking you would choose."},
    {t: "Monitor continuously, and stay connected and responsive", why: "Fourth, and it is a standing activity rather than an event. A complaint nobody has seen is a complaint nobody is answering, and monitoring doubles as ordinary business intelligence."},
    {t: "When something emerges, act inside the first day", why: "Fifth. The chapter is specific that the first twenty-four hours count, because a story left unanswered settles into the version somebody else wrote."},
    {t: "Answer on the channel where it happened, not only on your own", why: "Sixth. A statement on a corporate site reaches people already looking for the firm; the audience that matters is the one on the platform the material spread across."},
    {t: "Fix the underlying cause, and say specifically what you fixed", why: "Last, and it is what the chapter's most successful example actually did: found those responsible, closed and cleaned the site, and described the change rather than promising to do better."}
  ]
};

ACT.crsSim = {
  kind: "sim",
  label: "Walkthrough",
  title: "The first day of a viral complaint",
  intro: "A customer's video about your product is spreading on a video platform. It is accurate. Four decisions across the first day, at a hypothetical firm.",
  how: "Choose at each step; every option shows what it would lead to, including the ones you did not take.",
  objective: "5.3",
  steps: [
    {
      situation: "The video has around forty thousand views and is climbing. Your monitoring caught it about an hour ago. What is the first move?",
      opts: [
        {t: "Post a holding statement immediately, since the first day counts", ok: false, out: "Speed matters and a statement that says nothing spends the firm's one chance at a first impression. The chapter asks for a fast and appropriate response, and appropriate requires knowing what happened."},
        {t: "Convene the crisis team and establish what actually happened", ok: true, out: "Right. The team exists so this takes minutes rather than a morning, and a response issued before anybody has established the facts is the one that has to be retracted, which starts a second story."},
        {t: "Contact the platform and request the video be taken down", ok: false, out: "A takedown of accurate criticism is itself the story, and copies exist within hours. This is the move that converts a complaint about a product into a complaint about the company."},
        {t: "Wait for the view count to plateau before deciding anything", ok: false, out: "This is the decision the chapter's restaurant example actually made, and it cost two days. By the time the count plateaus the account has been written by other people."}
      ]
    },
    {
      situation: "The facts hold up: the customer is right, and the fault is yours. Where do you respond?",
      opts: [
        {t: "In a press release, which is the firm's formal channel for statements", ok: false, out: "A press release reaches journalists and reaches almost nobody watching the video. It also reads as a firm addressing a different audience about them rather than to them."},
        {t: "On the firm's own site, so the wording stays under the firm's control", ok: false, out: "Control of wording is real and control of audience is not. People who saw the video have no reason to visit your site, so the response is published where the problem is not."},
        {t: "Privately to the customer, offering to resolve it if the video comes down", ok: false, out: "A resolution conditional on silence is exactly the arrangement that becomes the next video. The private fix is worth doing, and attaching a condition to it is not."},
        {t: "On the platform the video is on, and to the customer directly", ok: true, out: "Right. Answering where the audience already is, and reaching the person themselves, is the pattern the chapter's successful example follows. Both parts matter, and neither substitutes for the other."}
      ]
    },
    {
      situation: "A colleague notices the customer has a small following, and suggests the firm can wait it out.",
      opts: [
        {t: "Point out that the audience is whoever shares it, not who follows them", ok: true, out: "Right, and the chapter has the case for it: a tenant with a couple of dozen followers reached a national audience once the dispute itself became the story. Follower counts predict very little about reach."},
        {t: "Agree, and reduce the response to a single reply on the video", ok: false, out: "A minimal response is defensible on its merits and not for this reason. Sizing the reply to the poster's following is the reasoning error, whatever reply you end up with."},
        {t: "Agree, but ask monitoring to re-check the numbers every hour", ok: false, out: "Watching more closely while doing nothing is still doing nothing, and it hands the initiative to whoever picks the story up next."},
        {t: "Disagree, and escalate the response because the firm cannot risk it", ok: false, out: "Over-responding has its own costs: it draws attention the story had not yet earned, and it signals that pressure works, which shapes what arrives next."}
      ]
    },
    {
      situation: "The immediate response has gone out and the coverage is easing. What closes this properly?",
      opts: [
        {t: "Publish an apology from the chief executive and consider the matter closed", ok: false, out: "An apology without a described change invites the same complaint again, and the second occurrence is materially worse because the record of the first is permanent."},
        {t: "Increase advertising for a period to move attention onto other messages", ok: false, out: "Buying attention against an unresolved complaint is expensive and reads as exactly what it is. The chapter's rule that the internet never forgets means the material stays retrievable regardless."},
        {t: "Fix the cause, then say specifically what changed and how it was checked", ok: true, out: "Right. The chapter's example named what had been found, what was closed and cleaned, and what would change in hiring. Specificity is what a survey later found had restored trust, not the apology."},
        {t: "Add a review process so no employee can post about the firm publicly", ok: false, out: "This answers a problem the firm did not have, since the video came from a customer. It also imposes a control that people route around, which the chapter warns about directly."}
      ]
    }
  ]
};

ACT.crsQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Reach, reviews, and response",
  how: "Three questions on how this goes wrong and what to do about it; every option explains itself, including the ones you did not pick.",
  objective: "5.3",
  questions: [
    {
      q: "What is the durable damage from fabricated product reviews, in the chapter's account?",
      opts: [
        "Trust in review systems erodes, so buyers make worse decisions everywhere",
        "The sellers who buy them gain an unfair advantage over honest competitors",
        "Marketplaces face legal exposure for hosting reviews they know to be false",
        "Genuine reviewers stop writing once they realise their reviews are outnumbered"
      ],
      a: 0,
      why: [
        "Correct. The chapter's conclusion is that the practice undermines trust in review systems and leads customers to make suboptimal purchasing decisions, which is a cost borne by everybody rather than by the parties involved.",
        "The advantage to the buyer of fake reviews is real, and it is the local effect. Enforcement action exists precisely because that part is visible and addressable.",
        "Marketplaces have pursued sellers and brokers, which shows exposure running the other way. Platform liability is not the harm the chapter identifies.",
        "Plausible and not what the chapter argues. Its concern is with the reader's ability to rely on what is there, rather than with the supply of honest reviews drying up."
      ]
    },
    {
      q: "A firm's monitoring watches only for mentions of its own brand name. What does the chapter suggest it will miss?",
      opts: [
        "Complaints about a product where the brand name is not spelled correctly",
        "Discussion using the terms an opponent would choose rather than the firm's own",
        "Anything posted on platforms the firm does not itself have an account on",
        "Coverage in traditional media, which social monitoring tools do not index"
      ],
      a: 1,
      why: [
        "Misspellings are a genuine gap and a technical one that most monitoring tools handle with fuzzy matching. It is not the gap the chapter is pointing at.",
        "Correct. The chapter asks firms to identify their worst nightmare and to know the signs to look for, including the search terms their opposition could use, which are rarely the firm's own vocabulary.",
        "Monitoring tools index public content regardless of whether the firm has an account. Absence from a platform limits where a firm can reply, not what it can see.",
        "Traditional coverage is usually indexed and is downstream anyway. By the time a story is in the press the early signal has already been missed."
      ]
    },
    {
      q: "Why does the chapter treat online anonymity as a genuine dilemma rather than a problem to remove?",
      opts: [
        "Because removing it is technically impossible on a network designed as this one was",
        "Because most harassment is committed by identifiable people rather than anonymous ones",
        "Because platforms have a commercial incentive to keep anonymous accounts active",
        "Because it protects privacy and dissent as well as enabling harassment"
      ],
      a: 3,
      why: [
        "The chapter does say the design makes anonymity hard to remove, and difficulty of removal makes it a practical problem. A dilemma requires that removing it would also cost something worth having.",
        "The chapter's account runs the other way: most trolls operate anonymously, which is part of why prosecuting the behaviour is so difficult.",
        "Platform incentives are worth examining and are not the chapter's argument here, which is about the value anonymity has for the people using it.",
        "Correct. The chapter opens by noting the legitimate need for anonymity, naming privacy protection and freedom from oppression, before describing deindividuation and the harassment that follows from it. Both sides are real, which is what makes it a dilemma."
      ]
    }
  ]
};
