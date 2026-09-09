/* ===== final ===== */
FINAL = {
  title: "Final challenge",
  how: "Thirty hypothetical situations drawn from the chapter and its two application supplements: every company, practice and public body described here is invented for practice, and none of them is a real organization. Work out what is actually happening before you answer, then read every explanation, including the ones for options you did not choose.",
  questions: [

    {q: "At a hypothetical instrument maker, Larchfield Controls, a calibration question needs a metallurgist in one country, a production lead in a second and a compliance officer in a third. Handled by email it takes eight days and about two hours of actual work. The operations director proposes a rule that internal email must be answered within four hours. What is wrong with that proposal?",
     opts: [
       "It treats a turnaround problem as an effort problem rather than removing the delay",
       "It applies to all email rather than only to the messages that belong to a project",
       "It cannot be enforced, because nobody can be required to read email at a particular time",
       "It will slow other work, because staff will interrupt what they are doing to answer messages"],
     a: 0, obj: "5.1",
     why: [
       "Correct. Two hours of work spread across eight days is a mode problem: each round of clarification costs a full turnaround. A faster reply shortens each wait and leaves the number of rounds untouched.",
       "Scoping the rule more narrowly would make it more palatable and would not change what is producing the delay, which is the number of exchanges rather than which messages they are.",
       "Enforceability is a fair practical objection and a secondary one. Even a perfectly obeyed rule would leave a question needing four exchanges taking most of a day.",
       "Interruption cost is real and is an argument about the price of the rule rather than about whether it addresses the cause of the delay."]},

    {q: "A hypothetical logistics firm, Pellworth Freight, buys videoconferencing systems for all five of its depots and reports a year later that collaboration has not improved. Most of the work its planners do involves handing over partly finished schedules between shifts and time zones. What best explains the disappointment?",
     opts: [
       "The equipment was too expensive to be used casually, so staff booked it only for formal meetings",
       "Five depots are too few for a network effect, so the systems went largely unused",
       "The purchase serves scheduled same-time meetings, and most of that work is different-time work",
       "Videoconferencing is a conferencing tool, and planning needs collaboration management tools"],
     a: 2, obj: "5.1",
     why: [
       "Formality does discourage casual use, and that would still leave the systems well matched to the meetings that were held. It does not explain why the work itself did not improve.",
       "Network effects govern tools whose value rises with participation. A meeting between two depots works perfectly well with two depots taking part.",
       "Correct. Handing partly finished work between shifts is the different-times mode. Equipment built for a same-time meeting between fixed locations does not touch it, however good the equipment is.",
       "The three families are not ranked, and a planning function draws on all of them. Naming the family is closer to the problem than the others and still misses the time dimension that explains it."]},

    {q: "A hypothetical hospital group is told by its ward managers that clinical staff will not use the proposed employee portal, because there is no machine available to them mid-shift. The project manager records this as resistance to change and proceeds. What has been misread?",
     opts: [
       "The objection is about access rather than attitude, and it is the best information available",
       "The objection is about training, which the project should budget for before proceeding",
       "The objection is about seniority, since ward managers speak for a group they do not represent",
       "The objection is about timing, and the portal should launch after the next roster change"],
     a: 0, obj: "5.1",
     why: [
       "Correct. The managers are reporting a physical condition of the work. Filing that under resistance discards a solvable design constraint and converts a fixable problem into a grievance later.",
       "Training answers a capability gap. Nobody here has said staff cannot use a browser; they have said there is nothing to use one on.",
       "Whether managers speak for their staff is worth checking and does not change the content of what they said, which is a claim about equipment rather than about feelings.",
       "A launch date does not create a machine on a ward. Delay postpones the same failure to a later month."]},

    {q: "A hypothetical manufacturer's intranet has grown to about ninety thousand documents. Employees increasingly stop searching it and ask a colleague instead. What does the chapter identify as the underlying difficulty?",
     opts: [
       "Employees prefer human answers, so any search tool will be underused whatever its quality",
       "Internal content sits in systems with no linking signal for a search engine to rank by",
       "Ninety thousand documents is beyond what an internal search index can practically hold",
       "The documents were never tagged, so a search engine has nothing to match a query against"],
     a: 1, obj: "5.1",
     why: [
       "There is a genuine preference for asking somebody, and the chapter treats the search failure as the cause rather than as an unavoidable human trait.",
       "Correct. The chapter contrasts enterprise search with web search precisely here: internal content lives in documents, databases and applications rather than in pages that link to one another, so the signal a web engine ranks by does not exist.",
       "Index size is not a limit at this scale. Public engines index vastly more, and the difficulty the chapter names is about ranking rather than capacity.",
       "Full-text search matches untagged documents perfectly well. Tags help, and their absence is not what makes the enterprise problem different in kind."]},

    {q: "A hypothetical charity wants its four regional offices to stop keeping separate copies of its safeguarding procedure, which currently exists in three versions. Which capability addresses the actual cause?",
     opts: [
       "Enterprise search, so staff can find whichever version is nearest to hand",
       "A virtual private network, so every office reaches the same server",
       "Real-time access to one authoritative document held in a single place",
       "A social intranet, so any member of staff can correct the procedure directly"],
     a: 2, obj: "5.1",
     why: [
       "Finding a version faster is not the same as there being one version. Search over three copies returns three copies, which is the problem restated.",
       "A private network governs who can reach the network and from where. Four offices already connected can still keep four separate documents.",
       "Correct. The chapter's first intranet benefit exists for this: a paper or filed document has to be updated, reprinted and redistributed, so older copies keep circulating, and a single updated page has no older copies.",
       "Open editing raises how much knowledge reaches the intranet and would let four people edit four copies just as easily. It does not by itself establish a single source."]},

    {q: "A hypothetical engineering consultancy assembles a project team from three offices. The project manager schedules a daily meeting at an hour that suits two of the three. Six weeks in, attendance from the third office has quietly stopped. What does this illustrate?",
     opts: [
       "Technological inertia, since the third office prefers the tools it was already using",
       "A generation gap, since the third office has a longer-serving workforce",
       "A critical mass problem, since three offices are too few to sustain a daily meeting",
       "The uneven cost of synchronous work across time zones"],
     a: 3, obj: "5.1",
     why: [
       "Inertia describes refusing to move to a new tool. Nobody here has refused anything; they attended for six weeks and then stopped.",
       "Length of service might correlate with anything and nothing here measures it. Attributing the drop-off to age is an assumption rather than a reading of the situation.",
       "Critical mass governs tools whose value depends on how many people take part. A scheduled meeting between three offices does not need a threshold to be useful.",
       "Correct. A same-time meeting across time zones has no hour convenient everywhere, so the cost falls on one group. Attendance decaying rather than being refused is exactly how that cost shows up."]},

    {q: "A hypothetical retailer, Ashmere Home Supply, adds customer reviews to its product pages and its returns fall by a fifth. Its chief executive describes this as a technology improvement. What is a more accurate description?",
     opts: [
       "A shift in who creates the content, which supplied information the firm could not write",
       "An improvement to product descriptions, achieved at lower cost than hiring more writers",
       "A marketing improvement, since reviews increase the persuasiveness of a product page",
       "A service improvement, since reviews answer questions that would have reached support"],
     a: 0, obj: "5.2",
     why: [
       "Correct. This is the Web 2.0 shift stated exactly: the audience became the authors, and owners know things about fit, bulk and suitability that no staff writer working from supplier data can supply.",
       "The cost comparison is real and describes the saving rather than the mechanism. Ten more writers with the same source material would not have produced the same information.",
       "Persuasion is one effect, and a returns fall is evidence that buyers chose more accurately rather than more enthusiastically, which is a different thing.",
       "Deflecting support contacts is a genuine secondary benefit. The returns figure measures decisions made before purchase, not questions answered after it."]},

    {q: "A hypothetical trade publisher argues that it adopted Web 2.0 when it launched a daily news feed written by its own editors. What is wrong with the claim?",
     opts: [
       "A feed is a communication tool, and the later web is defined by conferencing tools",
       "The strict line between content creator and content consumer is exactly where it was",
       "Daily publication is not frequent enough to count as a dynamic web application",
       "The publisher would need a social network presence before it could make the claim"],
     a: 1, obj: "5.2",
     why: [
       "The three families of collaboration tools classify tools, not eras, and a conferencing tool used one-way would be just as one-way.",
       "Correct. The change the chapter describes is in who creates content. A feed written by editors and read by everybody else preserves precisely the arrangement the later web dissolved.",
       "Frequency was never the distinction. A daily bulletin and a monthly one are both the organization talking while the audience listens.",
       "Presence on a particular platform is not the test. A publisher could run reviews, a forum and a wiki entirely on its own site and have changed the relationship completely."]},

    {q: "A hypothetical outdoor brand posts progress photographs from a client site. Nobody types a location, yet a reader identifies the site within hours. Which distinction explains this?",
     opts: [
       "Between public and private posting, since the account's privacy settings were never adjusted",
       "Between a tag and a hashtag, since hashtags make content findable to people outside the audience",
       "Between metadata a person adds and metadata a device attaches without being asked",
       "Between synchronous and asynchronous publishing, since immediate posting leaves no time to review"],
     a: 2, obj: "5.2",
     why: [
       "Privacy settings govern who can see a post. Everyone who could see this one could also read what was inside the files, whatever the setting.",
       "Hashtags do widen reach and they are typed deliberately, so they are visible to anybody reviewing the post before it goes out.",
       "Correct. Coordinates, timestamps and device identifiers are attached automatically, which is why reviewing what somebody wrote catches nothing. The chapter's own example is a photograph that revealed where a man in hiding was.",
       "Timing affects how much review is possible and changes nothing about what is inside the file, which would be there a week later too."]},

    {q: "A hypothetical software firm embeds a video it hosted on a sharing service into a partner's blog post. Both parties benefit and neither negotiated anything. What is this an instance of?",
     opts: [
       "Collaboration, since two organizations produced a single piece of content together",
       "Cooperation, where one participant's success improves the chances of the other",
       "Viral marketing, since the arrangement spreads the content through a network",
       "Open innovation, since an external party contributed to the firm's own output"],
     a: 1, obj: "5.2",
     why: [
       "Collaboration requires working the same problem together. Here two parties each did their own thing and both gained, which the chapter treats as a separate category.",
       "Correct. The chapter's definition is exactly this: a win-win where one participant's success improves the chances of the other, and the embedded video is its own example of it.",
       "Viral marketing depends on people choosing to pass content on. One deliberate embed between two known parties is not that mechanism.",
       "Open innovation brings outside parties into a firm's research and development. Nothing was invented here; existing content was placed somewhere useful."]},

    {q: "A hypothetical news site's editor argues that because a complainant has only twenty-eight followers, a hostile post about the site can be ignored. What does the chapter's evidence suggest?",
     opts: [
       "Follower counts predict reach poorly, and the response to a post often outgrows the post",
       "Ignoring it is correct, since responding would draw attention the post had not earned",
       "The post should be reported to the platform, since a small account is easier to have removed",
       "Follower counts matter, but only on microblogging services rather than on other platforms"],
     a: 0, obj: "5.2",
     why: [
       "Correct. The chapter's case is a tenant with a couple of dozen followers whose landlord sued her, at which point the dispute itself reached a national audience the original post never would have.",
       "Proportionate response is a real consideration and it has to be decided on the merits rather than on the poster's following, which is the reasoning error the chapter illustrates.",
       "Attempting removal is what converted the chapter's example from a small complaint into national coverage, so this is closer to the cause than to the cure.",
       "Nothing in the chapter limits the effect to one kind of platform. The mechanism is that other people amplify, and that works everywhere."]},

    {q: "A hypothetical museum wants tags added to forty thousand digitised photographs so they can be found. Its curator proposes a crowdsourcing marketplace. Under what condition is that a good fit?",
     opts: [
       "When the budget is limited, since marketplace tasks cost a fraction of staff time",
       "When speed matters, since a marketplace completes in weeks what staff take months over",
       "When the tags describe what is visible rather than what a local would know",
       "When accuracy is not critical, since a marketplace trades quality for cost and speed"],
     a: 2, obj: "5.2",
     why: [
       "Cost is why people reach for it and not what makes it work. A cheap answer that is wrong is not cheaper than a correct one.",
       "Speed is a genuine advantage of the arrangement, and it is available regardless of whether the task is one a stranger can actually do.",
       "Correct. The chapter's rule is that these tasks must be easy for any person and hard for a computer. Naming a street from 1974 is easy only for somebody who was there, which no fee can supply.",
       "Accepting poor quality is not a condition for using crowdsourcing; it is what happens when the task was a bad fit. Well-matched tasks return accurate work."]},

    {q: "A hypothetical utility adopts a cloud collaboration suite. Eight months later a feature its field teams depended on is changed by the provider without notice, and the workflow around it breaks. Which of the chapter's four domains does this belong to?",
     opts: [
       "Information technology, since control of the tooling has moved to the provider",
       "Organization, since staff had no documentation or support when the change landed",
       "Competition, since the disruption slowed the utility relative to its rivals",
       "Upgrade cycles, since the provider now decides when and how the software changes"],
     a: 3, obj: "5.2",
     why: [
       "Loss of control over data and service quality is the chapter's technology risk, and it is about where things live rather than about when they change.",
       "Thin documentation and support is the organizational risk and it is a consequence here rather than the cause. The change happened first.",
       "The competitive risk in the chapter's table concerns security and compliance enforcement. Being slowed down is an effect rather than the category.",
       "Correct. The chapter's upgrade-cycle risk is stated in these terms: tools and features can change without notice, causing problems for users and for the firm's technology strategy."]},

    {q: "A hypothetical trade association runs a members' wiki. In a year it accumulates four hundred pages, of which nineteen have ever been edited by anybody other than their original author. What does that figure indicate?",
     opts: [
       "The pages are accurate, since incorrect content attracts correction quickly",
       "Members are reading rather than writing, which is normal and needs no response",
       "Peer production is not occurring, so the wiki is functioning as a document store",
       "The version history is not being used, which suggests the wiki is misconfigured"],
     a: 2, obj: "5.2",
     why: [
       "Nothing establishes accuracy. Unedited could mean correct, unread by anybody who knew better, or not worth the trouble, and the figure cannot distinguish them.",
       "The reading-to-writing ratio is indeed skewed everywhere, and this figure measures something narrower: whether the people who do write ever build on each other.",
       "Correct. What makes a wiki more than a shared folder is that contributions improve on one another. Pages nobody touches after publication are documents in a different container.",
       "Retained history makes editing safe rather than making it happen. The mechanism is available and the behaviour is not occurring."]},

    {q: "A hypothetical bank's internal social network is described by staff as clumsy compared with the apps they use outside work. What does the chapter call this pressure?",
     opts: [
       "Consumerization, where consumer products set the usability benchmark for internal tools",
       "Technological inertia, since people will not adopt a tool without a tangible benefit",
       "A generation gap, since younger staff hold higher expectations than older colleagues",
       "Technological integration, since the tool has not been joined to existing systems"],
     a: 0, obj: "5.2",
     why: [
       "Correct. The chapter names this directly: applications designed for the consumer market make their way into organizations, and users judge an internal tool against what they already use.",
       "Inertia is refusing to move at all. These staff have moved and are reporting that the destination compares badly, which is a different complaint.",
       "A gap describes differing comfort across a workforce. Here the staff agree with each other, which is the opposite of a gap.",
       "Integration governs whether a tool connects to other systems. A perfectly integrated tool can still be unpleasant to use."]},

    {q: "A hypothetical food producer runs a campaign whose video can only be watched after registering an email address. Sharing is minimal. Which of the chapter's viral marketing principles was broken?",
     opts: [
       "Do something unexpected, since a registration form is a familiar and tiresome device",
       "Make sequels, since a single video gives an audience nothing to come back for",
       "Make people feel something, since a form interrupts whatever the video established",
       "Never restrict access, since a gate stops the sharing the whole mechanism depends on"],
     a: 3, obj: "5.2",
     why: [
       "Familiarity is a weakness of the campaign and not the mechanism that stopped it. An unexpected video behind a form would also fail to spread.",
       "Sequels sustain a campaign over time. This campaign failed at the first hand-off rather than at the second piece of content.",
       "Emotional content travels further and the form sits before the video rather than inside it, so it prevents the feeling rather than diluting it.",
       "Correct. The mechanism is that each viewer passes the content to the next one. A gate breaks that at the first hand-off, whatever the content is like."]},

    {q: "A hypothetical firm asks why a review platform it does not own can influence which restaurants near it succeed, given that the platform writes no reviews and takes no photographs. What is the answer?",
     opts: [
       "It holds the reviews, and each new participant makes the collection more useful to everyone",
       "It advertises heavily, which is why consumers consult it rather than a competitor",
       "It is preinstalled on most devices, so consumers reach it before any alternative",
       "It is more accurate than the alternatives, having invested heavily in verifying that its reviews come from real customers"],
     a: 0, obj: "5.2",
     why: [
       "Correct. This is the network effect doing the work. The platform's asset is participation it did not create, and each contribution makes the whole more valuable to every user, which is what a competitor cannot buy.",
       "Advertising follows the position rather than producing it, and a well-advertised platform with no reviews would have nothing to consult.",
       "Integration with device software is real and downstream. It happened because the data was already worth reaching, not the other way round.",
       "Nothing establishes superior accuracy, and the chapter records criticism about how reviews are handled, so this claim is unsupported."]},

    {q: "A hypothetical charity introduces an internal discussion platform. Every post is approved by a manager before it appears, and after four months there is almost no discussion. Which factor is this?",
     opts: [
       "Critical mass, since too few people joined for the platform to feel worth using",
       "Technological integration, since the approval step was not built into the workflow",
       "Culture, since open communication collides with a structure built on control",
       "Technological inertia, since staff continue to use the tools they already know"],
     a: 2, obj: "5.3",
     why: [
       "Thin participation is the symptom being observed. The question is what produced it, and an approval queue is a cause rather than a count.",
       "The approval step is working as designed. Building it more smoothly into the workflow would make a discouraging arrangement more efficient.",
       "Correct. The chapter says social applications do not do well within traditional top-down structures based on rigid hierarchies and control, and pre-approval is that structure applied to conversation.",
       "Inertia would show as people staying with email. Here they came to the platform and found their posts held, which is a different failure."]},

    {q: "A hypothetical insurer's pilot of an enterprise social network in one department is judged a success. The organization-wide rollout stalls at low participation. What did the pilot fail to test?",
     opts: [
       "The software's ability to handle the whole organization's load rather than one department's",
       "Whether the wider organization has the culture and processes a department volunteered",
       "Whether the tool integrates with the systems used outside the pilot department",
       "Whether the training approach would scale to every location the insurer operates in"],
     a: 1, obj: "5.3",
     why: [
       "Capacity is testable and rarely the issue for this class of tool. Nothing described points at performance.",
       "Correct. The chapter warns that department-led pilots often work while organization-wide implementation needs changes in culture and processes and often the flattening of hierarchies. The pilot measured a self-selected department.",
       "Integration gaps are a real risk and would show as friction rather than as absence. People would complain about the tool rather than not appearing.",
       "Training scale matters when capability is the constraint, and the pilot showed that people are capable. What is missing is a reason to participate."]},

    {q: "A hypothetical distributor discovers that most useful discussion has moved to a messaging tool one team installed itself, connected to nothing. What is the strongest response?",
     opts: [
       "Block it, since an unapproved tool creates exposure the firm has not assessed",
       "Ignore it, since the official platform is the one the firm is measuring",
       "Migrate the team onto the official platform and close the unapproved tool",
       "Treat it as evidence of what the work needs, and integrate rather than prohibit"],
     a: 3, obj: "5.3",
     why: [
       "The exposure is genuine, and blocking moves the conversation somewhere the firm cannot see rather than back onto the official platform.",
       "Ignoring it makes the firm's own measurement misleading and leaves two disconnected records of how decisions were made.",
       "Moving a working conversation onto a platform that has already failed to attract one changes the location and nothing about why.",
       "Correct. It is the clearest signal available about what people actually need, and the chapter's integration point applies: a tool joined to nothing becomes another place to look, which is what the official platform has become."]},

    {q: "A hypothetical brand discovers its agency bought favourable reviews for its product. A journalist has asked for comment by tomorrow. Which response best matches the chapter's playbook?",
     opts: [
       "State that the firm commissioned no reviews, since that is the accurate position",
       "Respond publicly today, say what was found and what is being changed",
       "Wait until an independent analysis has verified the review flagging",
       "Ask the marketplace to remove the flagged reviews before commenting"],
     a: 1, obj: "5.3",
     why: [
       "The blame point is arguable and answers a question the public is not asking, which is whether the ratings mean anything now.",
       "Correct. The chapter's playbook says the first day counts and asks for a response that is fast and appropriate, and its most successful example named what was found and what was being changed.",
       "Verification is prudent and slower than the story. The chapter's cautionary case is a company that waited two days and had to recover from its own silence.",
       "Removing the evidence before commenting reads as concealment whatever the intent, and the flagged reviews already appear in a report the journalist holds."]},

    {q: "A hypothetical airline monitors social media for mentions of its own brand name and nothing else. What does the chapter say it will miss?",
     opts: [
       "Complaints where the brand name is misspelled or abbreviated by the poster",
       "Coverage in traditional media, which social monitoring tools do not index",
       "Discussion using the terms an opponent would choose rather than the airline's own",
       "Anything posted on platforms where the airline does not itself hold an account or a published page"],
     a: 2, obj: "5.3",
     why: [
       "Misspellings are a genuine gap and a technical one that fuzzy matching handles routinely. It is not the gap the chapter identifies.",
       "Traditional coverage is generally indexed and is downstream in any case. By the time a story is in the press the early signal was already missed.",
       "Correct. The chapter asks firms to identify their worst nightmare and know the signs to look for, including the search terms their opposition could use, which are rarely the firm's own vocabulary.",
       "Monitoring tools read public content regardless of whether the firm has an account. Absence limits where a firm can reply rather than what it can see."]},

    {q: "A hypothetical restaurant group's board asks why it should assemble a crisis team now, when nothing has happened. What is the strongest answer?",
     opts: [
       "Because deciding who may speak, and with which adviser, cannot be done while a story is running",
       "Because the team will identify risks in the business that nobody has yet noticed",
       "Because insurers and regulators increasingly expect a documented crisis process to be in place before an incident",
       "Because the team can monitor social media more cheaply than an external service"],
     a: 0, obj: "5.3",
     why: [
       "Correct. The chapter puts the crisis team first among its preparations precisely because the first day decides the shape of a story, and authority questions settled in advance take minutes rather than a morning.",
       "Risk identification is the second preparation, naming your worst nightmare, and it is a different activity from establishing who speaks.",
       "Insurance and governance expectations may well exist and are external reasons rather than the operational one the chapter gives.",
       "Monitoring is the third preparation and is usually a tool or a service rather than something a crisis team does by hand."]},

    {q: "A hypothetical council debates whether anonymous accounts should be permitted on its public consultation forum. Which framing matches the chapter's treatment?",
     opts: [
       "Anonymity should be removed, since it is the main cause of abusive behaviour online",
       "Anonymity should be preserved, since the harms are outweighed by convenience for users",
       "It is a dilemma: anonymity protects privacy and dissent while enabling harassment",
       "It is a technical question, since anonymity cannot be removed on this network anyway"],
     a: 2, obj: "5.3",
     why: [
       "The chapter documents deindividuation and the harassment that follows it and opens by naming legitimate needs for anonymity, so a one-sided removal misstates its position.",
       "Convenience is not the value the chapter identifies. It names privacy protection and freedom from oppression, which is a much stronger claim than convenience.",
       "Correct. The chapter presents both sides: legitimate need for privacy and freedom from oppression on one, and deindividuation, trolling and cyberharassment on the other, which is what makes it a dilemma rather than a decision.",
       "The chapter does note that the design makes anonymity hard to remove, and difficulty is a practical constraint rather than a reason the question is finely balanced."]},

    {q: "A hypothetical software vendor is deciding what to say after resolving a widely shared complaint. Which closing action does the chapter's most successful example support?",
     opts: [
       "Publish an apology from the chief executive and treat the matter as closed",
       "Increase advertising for a period so that attention moves to other messages",
       "Introduce a review process so no employee can post about the firm publicly",
       "Fix the cause and describe specifically what changed and how it was verified"],
     a: 3, obj: "5.3",
     why: [
       "An apology without a described change invites the same complaint again, and a second occurrence is worse because the record of the first is permanent.",
       "Buying attention against an unresolved complaint is expensive and reads as exactly what it is, and the material stays retrievable regardless.",
       "That answers a problem the firm did not have when the complaint came from outside, and it imposes a control people route around.",
       "Correct. The chapter's example named what had been found, said the site had been closed and cleaned, and described what would change, and a survey afterwards found the response had largely restored trust."]},

    {q: "A hypothetical consultancy writes: our clients are very active on review sites, therefore buyer power is high. What does the claim lack?",
     opts: [
       "Evidence that clients can act on the firm, such as switching, price pressure, or changed behaviour",
       "A comparison against the industry average level of buyer power in professional services",
       "An acknowledgement that review activity is a substitutes question rather than a buyer-power one",
       "A distinction between clients who post reviews and clients who only read them"],
     a: 0, obj: "5.4",
     why: [
       "Correct. Buyer power is leverage. Activity is not leverage, and the sentence would be equally true of clients who cannot switch, which is where the reasoning fails.",
       "Benchmarking adds useful context and does not repair an unsupported claim. A claim with no evidence is unsupported at any benchmark.",
       "The observation concerns the firm's own clients, so filing it under substitutes would replace one unsupported claim with a misclassified one.",
       "That distinction would sharpen the evidence and is a refinement of a claim that currently has none rather than the missing element itself."]},

    {q: "A hypothetical kit maker's nine-year user forum absorbs most of its support questions and is cited by four in ten new buyers. A larger competitor launches a similar product with no community. Which force does the forum principally act on?",
     opts: [
       "Rivalry, since it is how the firm differentiates against this particular competitor",
       "The threat of new entrants, since it is a barrier money cannot buy",
       "Bargaining power of buyers, since forum members are less sensitive to price",
       "The threat of substitutes, since the forum substitutes for the firm's paid support"],
     a: 1, obj: "5.4",
     why: [
       "Differentiation is what the forum does today and misses why it works. A rival can copy a feature and cannot copy nine years of accumulated answers.",
       "Correct. A network-effect asset that grows with participation and cannot be purchased quickly is a barrier to entry, which is what explains a larger, cheaper competitor not automatically winning.",
       "Nothing establishes a relationship between posting and price sensitivity, and inventing one to reach a force is the unsupported move the supplement warns against.",
       "The forum does absorb support work, and a substitute is something a customer uses instead of buying from the industry at all rather than a part of what they bought."]},

    {q: "A hypothetical wholesaler wants to place an internal engineering wiki in the value chain. Where does it belong, and why?",
     opts: [
       "Firm infrastructure, since it is a shared capability every part of the business draws on",
       "Operations, since it makes the production of each order more efficient",
       "Human resource management, since it captures what employees know before they leave",
       "Technology development, since it changes how fast and how well the next thing is produced"],
     a: 3, obj: "5.4",
     why: [
       "Infrastructure covers capabilities like the intranet, governance and finance. A wiki holding engineering decisions serves one function rather than all of them.",
       "Operations transforms inputs into outputs. A wiki changes the design that operations then executes, which is a step earlier.",
       "Retention of knowledge sounds like a people question and is about employment terms and staffing rather than about how the firm designs its products.",
       "Correct. What an engineering wiki changes is the firm's ability to produce the next design well and quickly, which is what the technology development activity covers."]},

    {q: "A hypothetical publisher takes forty percent of its orders through one marketplace, which has raised its commission twice. Which force is this, and what follows?",
     opts: [
       "Supplier power: the channel is an input, and the answer is to build a relationship it does not intermediate",
       "Rivalry: other publishers on the same marketplace are competing the margin away",
       "Buyer power: the marketplace's customers are extracting better terms from the publisher",
       "New entrants: the marketplace has lowered the cost of entry for competing publishers that hold no distribution of their own"],
     a: 0, obj: "5.4",
     why: [
       "Correct. The platform supplies access to customers, which makes it an input, and its power grows with the share of revenue it carries. The response is to own a customer relationship the platform does not sit inside.",
       "Rivalry on the platform may well be intense and would show as price pressure rather than as the platform itself taking more.",
       "The marketplace's shoppers are not negotiating anything. It is the intermediary rather than the buyer that changed its terms.",
       "The marketplace does lower entry costs for competitors, which is a separate and real force. It does not explain a commission increase on this publisher's own orders."]},

    {q: "A hypothetical analyst is asked why a recommendation must name a specific value-chain activity rather than saying the firm needs a better digital strategy. What is the substantive reason?",
     opts: [
       "The framework requires every recommendation to reference one of its nine activities",
       "It turns a diagnosis into work that can be assigned, costed and measured afterwards",
       "Support activities are cheaper to change than primary activities, so the choice matters",
       "Forces describe the industry while activities describe the individual firm being advised"],
     a: 1, obj: "5.5",
     why: [
       "Satisfying a framework is ceremony. If naming the activity added nothing, the requirement would be worth dropping.",
       "Correct. A force says what is pressing on the firm; an activity says who can be given the work, what it will cost and what to watch afterwards, without which nothing can be acted on or judged.",
       "Cost varies enormously within both categories, and this chapter contains cheap primary-activity changes and expensive infrastructure ones.",
       "The distinction between industry-level and firm-level analysis is accurate as a description of the two frameworks and is not why a recommendation needs a location."]},

    {q: "A hypothetical practice has four candidate initiatives and is asked for one. Its analyst submits all four, ranked, so the partners can choose by budget. What is the analytical objection?",
     opts: [
       "Four is too many to cost properly in the time available for the analysis",
       "Ranking implies a scoring method the analyst has not made explicit",
       "It hands the decision back and hides which pressure was being answered",
       "The partners will choose the cheapest, which is rarely the strongest option"],
     a: 2, obj: "5.5",
     why: [
       "Time is a practical constraint and would be solved by working longer. The objection stands even with unlimited time.",
       "An unexplained ranking is a fair criticism and a fixable one. Making the method explicit would not repair the deeper problem.",
       "Correct. A single recommendation can be costed, argued and later judged. A ranked list looks generous, hands the decision back, and leaves no option properly costed or tied to a diagnosed force.",
       "Budget-driven selection is a plausible outcome and describes what the partners might do rather than what is wrong with the submission."]},

    {q: "A hypothetical analyst's comparison summary spends most of its two hundred words describing the history and scale of the company chosen for comparison. What has gone wrong?",
     opts: [
       "The comparison company is too large, so the parallel with the advised firm is weak",
       "The summary is descriptive where it should end in advice to the firm being advised",
       "Two hundred words is insufficient to profile a company and draw a lesson from it",
       "The company should have been a direct competitor rather than one from another sector"],
     a: 1, obj: "5.5",
     why: [
       "Size mismatch can weaken a comparison and a well-drawn lesson can survive it. A small firm can learn something specific from a very large one.",
       "Correct. The comparison exists to produce a lesson for the firm in front of you, and every sentence should be recoverable as advice to it. A profile answers a question nobody asked.",
       "The length is a constraint that forces the choice rather than causing the error, and a summary of this length is ample for a lesson if the profile is left out.",
       "A contrast from another sector is often the more useful comparison. What matters is the lesson, not the sector."]},

    {q: "A hypothetical practice measures a median of four and a half days to answer a cross-office technical question and sixty-two design decisions re-derived in a year because nobody found the earlier one. How should the analysis treat these two figures?",
     opts: [
       "As one operations problem, since both describe project delivery running slower than it should",
       "As one technology development problem measured at two different scales",
       "As two distinct problems: a coordination cost in delivery, and knowledge the firm cannot reach",
       "As one human resource problem, since both describe how staff work with one another"],
     a: 2, obj: "5.5",
     why: [
       "Calling both operations captures the delay and loses the second figure. Re-deriving a decision is not slow delivery; it is work being done that had already been done once.",
       "Both touch how well the firm produces the next thing, and merging them hides that they need different remedies: reaching a person, and reaching a record.",
       "Correct. They are genuinely different activities with different fixes, and the written analysis asks for at least two value-creating areas, which these two supply honestly rather than by describing one twice.",
       "Human resource management covers recruiting, developing and administering people. Neither figure concerns employment terms, and filing them here puts the recommendation where nobody could act on it."]},

    {q: "A hypothetical manufacturer, Denmoor Castings, tells its board that its internal engineering wiki gives it competitive advantage because none of its rivals has one. What does that claim still need?",
     opts: [
       "A count of how many rivals have something comparable, gathered from their published material",
       "A statement of which pressure the wiki relieves, and the evidence that it does",
       "A costing of the wiki, so the advantage can be set against what it was built for",
       "A comparison of the wiki against the commercial products the firm could have bought"],
     a: 1, obj: "5.4",
     why: [
       "Counting rivals establishes that the firm has something unusual. Unusual and advantageous are different claims, and plenty of things no competitor has are worth nothing.",
       "Correct. An asset becomes an advantage only when it answers a pressure. Naming the force, and the evidence that the wiki moves it, is what turns a possession into an argument somebody can test.",
       "A cost belongs in the recommendation and says nothing about whether an advantage exists. A cheap thing that relieves no pressure is still worth nothing.",
       "Product comparisons decide what to build. They are a procurement question, and they arrive after somebody has established that the capability is worth having."]},

    {q: "A hypothetical recruiter-heavy consultancy runs a professional-network campaign that halves its cost of hiring an experienced engineer. Where does that land in the value chain, and does it matter which activity you name?",
     opts: [
       "Marketing and sales, and naming the activity matters mainly for presentation",
       "Operations, because a shorter hiring cycle means projects start sooner",
       "Human resource management, and naming it decides who owns the work and what is measured",
       "Firm infrastructure, because recruiting is a shared capability the whole firm draws on"],
     a: 2, obj: "5.4",
     why: [
       "Marketing and sales acts on somebody deciding whether to buy. A candidate is not buying anything, and treating the naming as cosmetic gives up the reason for doing it.",
       "Projects do start sooner, which is a downstream effect. Operations is where inputs are turned into outputs, and hiring sits before that rather than inside it.",
       "Correct. Recruiting is human resource management, and naming it puts the work with the people who do it and fixes what gets measured, which is what makes a recommendation actionable rather than decorative.",
       "Infrastructure covers planning, finance, legal and the systems everything draws on. Recruiting is a distinct support activity with its own name in the framework."]},

    {q: "A hypothetical analyst rates four of the five forces on a firm and skips supplier power, on the grounds that a professional services firm has no real suppliers. What is wrong with that?",
     opts: [
       "Nothing, provided the omission is stated; a force that does not apply need not be rated",
       "The firm does have suppliers, since it buys software, premises and professional insurance",
       "All five are asked for, and the platforms and labour markets it depends on are suppliers",
       "Supplier power should be inferred from buyer power, which the analyst has already rated"],
     a: 2, obj: "5.5",
     why: [
       "Declaring an omission is better than hiding one and still leaves the analysis incomplete. A force rated low with evidence is a finding; a force skipped is a gap.",
       "Those purchases are genuine supplier relationships and they are the least interesting ones, because none of them has leverage over the firm worth writing about.",
       "Correct. The deliverable asks for all five, and in a services firm the powerful inputs are the directory or platform that brings enquiries and the labour market for scarce specialists, both of which can dictate terms.",
       "The two forces are independent. Strong buyers tell you nothing about whether your inputs are concentrated, and inferring one from the other invents a finding."]},

    {q: "A hypothetical analyst offers marketing and sales as the two value-chain areas where technology could create an advantage, describing an advertising change for one and a lead-handling change for the other. What is the objection?",
     opts: [
       "The two changes are too similar in cost, so the comparison between them is uninformative",
       "Marketing and sales is a single activity, so only one area has actually been identified",
       "Neither change is technological, so the areas do not answer what was asked",
       "Advertising belongs to marketing and lead handling belongs to service, so both are misfiled"],
     a: 1, obj: "5.5",
     why: [
       "Similar costs would make the choice between them harder and would not affect whether two distinct areas had been found, which is the requirement in question.",
       "Correct. Marketing and sales is one primary activity in the framework, so describing two changes inside it identifies one area twice. The deliverable asks for at least two genuinely different activities.",
       "Both changes could be delivered by technology, and whether they are is a separate question from whether they sit in two different places in the value chain.",
       "Lead handling belongs with marketing and sales rather than with service, which acts on somebody who has already bought. Misfiling is not the problem here."]}

  ]
};
