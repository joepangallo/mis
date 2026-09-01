/* ===== final ===== */
FINAL = {
  title:"Final challenge",
  how:"Thirty hypothetical situations built from the chapter and its two application supplements: every company described is invented. Work out what is actually happening before you answer, then read every explanation, including the ones for options you did not choose.",
  questions:[

    {q:"At a hypothetical parts distributor, three decisions are made on the same morning. A shift supervisor confirms a reorder the inventory system proposed when a bin fell below its set level. A marketing manager allocates next quarter&rsquo;s advertising budget across four product lines. The executive committee debates discontinuing a product line altogether. Which decision does the chapter call <b>structured</b>, and what follows from that?",
     opts:[
       "The supervisor&rsquo;s, because the procedure for this situation can be specified in advance, so it can be programmed straight into an operational system",
       "The manager&rsquo;s, because a quarterly budget allocation follows an established annual procedure even though the amounts change every time",
       "The executive committee&rsquo;s, because discontinuing a line follows the formal governance rules the company has already written down",
       "None of the three, because any decision that commits money needs human judgment and so cannot be fully specified beforehand"],
     a:0, obj:"2.1",
     why:[
       "Correct. Structured decisions are those in which the procedures to follow for a given situation can be specified in advance, and because they are relatively straightforward they can be programmed directly into operational information systems and made with little or no human intervention. The chapter&rsquo;s own example is an inventory system that issues an order when levels drop below a set point and the manager simply confirms it.",
       "That is a semistructured decision at the managerial level, where some procedures can be specified in advance but not to the extent that a specific recommendation can be made. The chapter uses a marketing manager allocating a quarter&rsquo;s advertising budget as its illustration of exactly this level.",
       "That is an unstructured decision at the executive level, where few or no procedures for the situation can be specified in advance, and the chapter&rsquo;s example is top managers deciding to develop a new product or discontinue an existing one. Governance rules settle who decides, not what the decision should be.",
       "Money is committed at all three levels, so spending cannot be what separates them. The chapter&rsquo;s dividing line is whether the procedure can be written down beforehand, and an automatic reorder shows that some decisions involving money can be."]},

    {q:"The chief executive of a hypothetical hospital group asks for a system that will show her how the group is trending, where it stands against comparable groups, and what the next two years look like under different assumptions. A vendor proposes a screen showing yesterday&rsquo;s ward-by-ward patient throughput hour by hour. What is the accurate objection?",
     opts:[
       "There is no objection to make, because operational detail is the raw material every level works from, so a system that reports it serves an executive as well as a supervisor",
       "The proposal belongs at the managerial level, since monitoring and controlling operational activity is what midlevel managers do, so the executive should receive the same screen weekly rather than daily",
       "The proposal fails because executive systems work from unstructured external data such as economic conditions and changing customer tastes, so anything built from the group&rsquo;s own records cannot serve that level",
       "The proposal serves the operational level, where systems automate routine activity to improve efficiency, while the executive level needs aggregate summaries, projections of the future, and benchmarks against competitors"],
     a:3, obj:"2.1",
     why:[
       "Operational data does feed the higher levels, and the chapter says so: systems at the operational level help automate repetitive activities but also gather valuable data for higher decision-making levels. Passing that detail upward unaggregated is not the same as summarizing it, and the chief executive asked for trends, projections, and comparisons.",
       "Monitoring and controlling operational activities is indeed the managerial level&rsquo;s work, and this screen would be a reasonable managerial tool. Changing how often an executive receives operational detail does not turn it into the aggregate summaries and projections the chapter says executive decisions require.",
       "Executives do need unstructured data such as global economic factors, demographic changes, and shifting customer tastes, which is why this option sounds right. The chapter also has executive systems providing key performance indicators that balance performance across the organization and benchmark it against competitors, and those come from the organization&rsquo;s own records.",
       "Correct. Information systems at the operational level automate routine and repetitive activities to improve efficiency, while at the executive level they provide aggregate summaries of past data, projections of the future, and indicators that benchmark the organization against its competitors. The vendor has answered a supervisor&rsquo;s question with an executive&rsquo;s budget."]},

    {q:"A hypothetical lender&rsquo;s approval criteria let weak applications through: reviewers handled about four applications a day and accepted roughly two poor ones a week. The lender then automated the same criteria, reviewers now handle about twelve a day, and poor approvals have climbed. Nothing in the software is malfunctioning. Which reading matches the chapter?",
     opts:[
       "The system was implemented badly, because a correctly built approval system would have identified the weak applications as it processed them",
       "Volume is the whole story: more applications processed produces proportionally more mistakes, and the rate of bad approvals per application is unchanged",
       "Automating a flawed process magnifies the existing business problem and can mask it, which is why the chapter pairs automating with learning from the data the system creates",
       "The criteria were sound and the reviewers stopped attending to them once the work sped up, so the remedy is retraining people rather than changing the process"],
     a:2, obj:"2.1",
     why:[
       "A system that screened applications on better criteria would indeed catch them, and that is the point: the criteria are the thing that is wrong. Blaming the build implies the specification was right, when the chapter&rsquo;s example is a specification that approves a borrower carrying heavy debt merely because no payment was recently late.",
       "More decisions do produce more errors, and this reading stops one step early. Figure 2.9 shows cumulative errors rising at an accelerating rate as automation increases, and treating the increase as arithmetic leaves the faulty acceptance criteria untouched and unnoticed.",
       "Correct. The chapter&rsquo;s worked example moves from four applications a day with about two bad approvals a week to twelve a day with up to six, and says the technology would serve only to magnify the existing business problems. Without learning it is more difficult to uncover the bad business process underlying the system, which is why an automating use can mask the problem rather than reveal it.",
       "Attention does fall when work speeds up, and retraining is a common first response. Nothing here suggests reviewers are departing from the criteria; they are applying criteria that were producing bad approvals before the system arrived."]},

    {q:"Three proposals sit on the table at a hypothetical building-supply firm. <b>A</b>: scan delivery tickets at the dock so nobody retypes them into the system. <b>B</b>: analyze two years of delivery exceptions by route, season, and crew, and change how routes are planned as a result. <b>C</b>: build reordering from each customer&rsquo;s own consumption history, which no competitor offers. Which proposal is the clearest example of an information system used for <b>organizational learning</b>?",
     opts:[
       "A, because capturing the ticket at the dock removes handling time and errors, and the chapter treats faster and more accurate work as the first form of value a system adds",
       "B, because organizational learning is using past behavior and data to improve business processes, and this proposal changes how the work is done on the strength of what the data showed",
       "C, because the system that produces a competitive advantage is the one the organization has learned the most from building and running",
       "None of them, because learning happens only when a system adjusts its own rules without a person intervening"],
     a:1, obj:"2.1",
     why:[
       "A is an automating use: it helps complete a task faster, more cheaply, and with greater accuracy. That is genuine value and it is the base of the chapter&rsquo;s ladder, which is why this would be the right answer to a question about improving efficiency at the operational level.",
       "Correct. Organizational learning is the ability of an organization to use past behavior and data to improve its business processes, and the chapter&rsquo;s illustration is a loan system whose accumulated records let a manager see patterns and change how the work is planned. Analyzing two years of exceptions and rewriting the routing rules is the same move.",
       "C is a strategizing use, the top of the chapter&rsquo;s ladder, because it looks for competitive advantage rather than for understanding of the process. It would be the answer to a question about which proposal serves the organization&rsquo;s strategy.",
       "Learning in this chapter is something the organization does, not something the software does unattended. The manager who reads the trend and changes the criteria is where the learning happens, and the chapter&rsquo;s loan example works exactly that way."]},

    {q:"A hypothetical commercial printing firm is in trouble. Its two long-standing competitors match every price cut within days, and margins at all three are thin. Its own market study shows something else as well: total pages printed by all three firms together has fallen by about a third over three years, as clients moved documents into shared online workspaces. Which force is the strongest here?",
     opts:[
       "Traditional rivals, because the competitors matching every price cut are the visible cause of the lost margin, so the answer is to compete on service rather than on price",
       "Threat of new entrants, because the workspace providers have entered a market the printing firms used to hold and found the barriers low enough to walk through",
       "Customers&rsquo; bargaining power, because clients are refusing to pay printing prices and are holding up the online alternative as leverage in every negotiation",
       "Threat of substitute products or services, because the same need is being met from outside the industry and the whole category is shrinking rather than one firm&rsquo;s share of it"],
     a:3, obj:"2.1",
     why:[
       "Rivalry is genuinely present and it explains why nobody in the industry earns much on the pages still being printed. It cannot explain why a third of the pages disappeared, because a rival taking work would move share between the three firms rather than shrink the total.",
       "A new entrant is a firm that starts selling what you sell. A shared online workspace prints nothing and sells no pages, and that difference is exactly what separates an entrant from another industry&rsquo;s answer to the same need.",
       "Buyer power is customers forcing better terms while still buying from your industry, which shows up as pressure on price, quality, and service. These clients are not negotiating over a page rate; they have stopped needing the pages.",
       "Correct. A substitute meets the same underlying need by a different route, so the customer never enters your industry, and the chapter&rsquo;s implications for this force are product returns, decreased market share, and losing customers for life. The tell is the category-level decline, which nothing happening inside the industry could produce."]},

    {q:"A hypothetical chain of fourteen bakeries buys its flour blend from one of only two mills that make it. Both raised prices this year and lengthened lead times, and the chain has switched to a coarser blend that customers have noticed and mentioned. Each shop still phones its own order in, so nobody at head office can state what the chain buys in total. Which force is at work, and what does the chapter say it implies?",
     opts:[
       "Suppliers&rsquo; bargaining power, whose implications the chapter gives as increased costs and reduced quality, both of which have already reached the customer here",
       "Traditional rivals, because competing bakeries buying from the same two mills face the same increase, and none of them can undercut the others while it lasts",
       "Customers&rsquo; bargaining power, because the customers who noticed the coarser product are the ones who will now press for a lower price or leave",
       "Threat of new entrants, because two mills serving a whole region shows the barriers to entry in that market are low enough to attract others"],
     a:0, obj:"2.1",
     why:[
       "Correct. Suppliers&rsquo; bargaining power is the ability of the firms you buy from to set terms because you have few alternatives, and Table 2.3 gives its implications as increased costs and reduced quality. Both landed in the product the customer eats, and a chain that cannot state its own total volume has nothing to negotiate with even when an alternative exists.",
       "Shared exposure is a real and useful observation, since a rival facing the same cost will not undercut you easily. It still does not name where the pressure originates, which is upstream of the bakeries rather than between them.",
       "Buyer power is customers forcing your price down or your quality up because leaving costs them little. Customers here are reacting to a change that was made to them; the terms were set two steps earlier, by the mills.",
       "The threat of new entrants concerns firms beginning to compete in your industry, which for this chain would mean a new bakery. Two mills supplying a whole region is evidence of high barriers in milling rather than low ones."]},

    {q:"A hypothetical furniture manufacturer builds a system that lets its designers assemble and stress a chair frame virtually before any tooling is cut, so weak joints are found in the model rather than on the production line. Where does this initiative sit on the value chain?",
     opts:[
       "Operations, because the chair is what the customer buys and this system exists so that it is built correctly",
       "Inbound logistics, because the timber and fittings the model specifies determine what must be received before production can begin",
       "Product research and development, technology, and systems development, a support activity, because it improves the product and the systems the whole chain runs on",
       "Procurement, because deciding which joint and which fitting to use is a buying decision taken before anything is manufactured"],
     a:2, obj:"2.1",
     why:[
       "Operations integrates supplies into the products and services the customer buys, and a better frame certainly reaches operations eventually. Naming the activity a system actually changes is what keeps the analysis usable, and no one is cutting or assembling anything at the point this system is used.",
       "Inbound logistics is receiving what has been purchased and getting it inside before any of it is sellable. A design decision changes what will later be ordered and received, which puts it upstream of this activity rather than inside it.",
       "Correct. The support band covering product research and development, technology, and systems development is where the product and the processes themselves are improved, and Figure 2.15 places computer-aided design systems among the systems feeding that supporting layer. The payoff is spread across the whole chain, which is the signature of a support activity.",
       "Procurement is the decision about whom to buy from and on what terms, and it is a support activity in its own right. Specifying a joint is a design choice; choosing the supplier who will provide the fitting is the procurement decision that follows it."]},

    {q:"A hypothetical regional insurer competes on the speed and care of its claims handling. Its industry then adopts a shared electronic claims exchange: connecting confers no distinction because every carrier will be on it, but brokers will have no way to submit claims to a carrier that is not. The investment committee is split. What does the chapter&rsquo;s framework support?",
     opts:[
       "Decline it, because organizations try to maximize business/IT alignment and a system that offers no differentiation fails that test",
       "Fund it as a strategic necessity, which the chapter describes as an investment an organization must make to survive and which may or may not coincide with its overall strategy",
       "Fund it and present it to the board as a competitive advantage, since being connected to the exchange is something the insurer will be able to offer its brokers",
       "Defer it until the exchange has proved itself, because a system every rival will also hold cannot repay what it costs to build"],
     a:1, obj:"2.1",
     why:[
       "Alignment is the general rule and the chapter states it plainly: in most cases organizations do not want systems that fail to match the strategy. This is the recognized exception to that rule, and applying the rule without the exception would disconnect the insurer from the brokers who bring it work.",
       "Correct. The chapter says organizations sometimes have no choice about investments that may or may not coincide with their overall strategy, and calls such an investment a strategic necessity, something the organization must do to survive. Survival, not differentiation, is the test being applied.",
       "Every carrier will be connected, so this buys parity rather than advantage, and the chapter reserves competitive advantage for what rivals have not matched. Calling a necessity an advantage also hides the real reason for spending, which makes the next proposal harder to judge.",
       "Waiting is a reasonable posture toward an optional system whose value is unproven, and it would be the right instinct if the only question were payback. Here brokers cannot submit claims to a carrier that is not connected, so deferring is a decision to lose the work in the meantime."]},

    {q:"A hypothetical home-repair booking company employs nobody who holds a wrench. Repairs are carried out by independent tradespeople it recruits, rates, and pays per job, and its own scheduling and dispatch software is the thing rivals have not been able to reproduce. Using the chapter&rsquo;s business model components, how should those two be classified?",
     opts:[
       "The tradespeople are key resources and the software is a key activity, because the people are what customers actually pay for and dispatching is what the company spends its day doing",
       "Both are channels, because between them they are how the service reaches the customer who booked it",
       "The tradespeople are a customer segment, because the company recruits them, rates them, and has to keep them satisfied to stay in business",
       "The tradespeople are key partners and the software is a key resource, because partners are the network needed to make the model work and resources are its most important assets"],
     a:3, obj:"2.2",
     why:[
       "This reverses both definitions. Key resources are the most important assets needed to make the business model work, which fits the software rather than the tradespeople, and key activities are the most important things the company does rather than a piece of software it owns.",
       "Channels are the ways the product or service offering reaches the target customers, such as an app or a counter. The people and the software are how the service is produced and coordinated, which the model files under partners and resources instead.",
       "Producers on a two-sided market do have to be attracted and kept, which is why this reading is tempting. Customer segments names the customers targeted with the offering, and the component for the outside people and firms the model depends on is key partners.",
       "Correct. Key partners are the network of partners and suppliers needed to make the business model work, which is what independent tradespeople are here, and key resources are the most important assets needed to make it work, which is what proprietary scheduling and dispatch software is."]},

    {q:"A hypothetical language-learning app has three sources of income. Anyone can use it free with advertisements. Learners who want the advertisements removed and extra practice sets pay a monthly fee. When a learner books a session with an independent tutor through the app, the app keeps a commission. How should its revenue model be described?",
     opts:[
       "It runs three at once: advertising on the free tier, a freemium subscription for the paid tier, and a transaction fee on tutor bookings, because the revenue streams component can hold more than one",
       "Freemium, because the entire design is a limited free version alongside a paid version with the restrictions removed",
       "Advertising, because the free tier is what brings in the users that everything else depends on",
       "Transaction fees, because the commission is the only income tied to something the app actually arranges for the learner"],
     a:0, obj:"2.2",
     why:[
       "Correct. A revenue model describes how the firm will earn revenue, and the business model component is revenue streams, plural: the chapter&rsquo;s own examples show firms combining approaches, with Dropbox freemium and subscription, Amazon selling and running an affiliate program. Naming only one here would leave two thirds of the income unexplained.",
       "Freemium is accurately described in this option, and it does cover the free tier and the paid tier: limited versions given away to build a base, with a premium charged for the unrestricted version. It says nothing about the advertisements or the commission on bookings.",
       "Advertising is free services provided to customers and paid for by a third party, which is exactly what the free tier does. It is one of the three streams rather than the whole answer, and it would be the right answer if the paid tier and the tutor commission did not exist.",
       "Transaction fees or brokerage is a commission paid to the business for aiding in a transaction, which the tutor booking fits precisely. Being the income most visibly attached to a service does not make it the only income the model earns."]},

    {q:"A hypothetical kitchenware manufacturer has always made its own pans and sold them through its website. It now adds two things: reviews written by owners, and a marketplace where independent restorers list refurbished pans and pay the manufacturer a commission on each sale. Which description is accurate?",
     opts:[
       "It is now a platform business rather than a manufacturer, because a platform coordinates others instead of producing anything itself",
       "It is still purely a pipe, because it produces goods and pushes them to customers, and reviews and third-party listings are marketing features rather than parts of a business model",
       "It has added platform elements to a pipe: the marketplace coordinates others to co-create value, creating a two-sided market whose success depends on network effects",
       "It has entered the sharing economy, because assets that already exist are being passed between private individuals rather than newly manufactured"],
     a:2, obj:"2.2",
     why:[
       "A platform-based business model does coordinate others rather than providing the product itself, which is why this sounds right. The manufacturer has not stopped making pans, and the chapter&rsquo;s point is that the two can sit in one business rather than that one replaces the other.",
       "The pipe description is accurate as far as it goes, since products are still produced and pushed to customers. The chapter says explicitly that many pipeline-based businesses now include platform elements such as reviews created by users, and a commissioned third-party marketplace is a good deal more than a marketing feature.",
       "Correct. A platform-based business model coordinates others, both businesses and users, to co-create value, and the chapter notes that many pipeline businesses include platform elements and that every business must consider how far its model will include them. The restorers produce value that buyers consume, which is the two-sided market the chapter describes.",
       "The sharing economy is an economic system in which assets or services are shared between private individuals, free or for a fee, typically over the internet. A refurbished pan sold outright through a commissioned listing is a sale, not shared access to an asset somebody keeps."]},

    {q:"On a hypothetical marketplace for freelance editors, two things are observed over the same quarter. First, as more editors join, each editor faces more competition for the same jobs. Second, as more editors join, the publishers who hire them find the site more useful because more specialists are available. Which classification is correct?",
     opts:[
       "The first is a cross-side effect and the second a same-side effect, because the harm lands on the editors themselves while the benefit crosses over to the publishers",
       "The first is a same-side effect and the second a cross-side effect, because value falls for users on the same side in one case and rises for users on the other side in the other",
       "Both are same-side effects, because in each case the change was caused by editors joining rather than by publishers joining",
       "Neither is a network effect: the first is ordinary competition between sellers and the second is simply a bigger catalogue for buyers to choose from"],
     a:1, obj:"2.2",
     why:[
       "This has the two labels the wrong way round. A same-side effect is the change in value as additional users join on the same side, and editors crowding other editors is that; a cross-side effect is the change in value for a user when users join on the other side, which is what the publishers experience.",
       "Correct. Same-side network effects relate to the increase or decrease in value as additional users join on the same side, and the chapter&rsquo;s own negative example is riders competing for available rides. Cross-side network effects relate to the change in value for a user when users join on the other side, as when an app store becomes more useful to users as more apps are added.",
       "The cause is the same in both observations, which is what makes this reading tempting. Effects are classified by whose value changes rather than by who joined, so the same arrival of editors produces a same-side effect for editors and a cross-side effect for publishers.",
       "Competition among sellers and a larger catalogue are exactly what these effects look like from inside; the terms name the mechanism rather than replace the description. A platform only has value if users participate on both sides, which is why the chapter asks platform businesses to evaluate these effects deliberately."]},

    {q:"On a hypothetical grocery-delivery platform, couriers accept jobs one at a time, are not employed by the company, have no protection against discrimination, no social security contributions, and little job security. The company answers criticism by saying it merely removes friction from transactions people were already free to make. How does the chapter frame this?",
     opts:[
       "This is the gig economy, where workers are hired only for short-term temporary jobs, and the chapter names precisely these losses to workers as a criticism of such business models",
       "This is disintermediation, because the platform has removed the traditional middleman standing between the shopper and the courier",
       "This is a same-side network effect, because couriers competing with each other for the same jobs is what determines what the work pays",
       "This is unfair competition, which the chapter defines as operating with no employees while established rivals carry the cost of a workforce"],
     a:0, obj:"2.2",
     why:[
       "Correct. In the gig economy workers are not employed by the company but are hired for short-term, temporary jobs, and the chapter lists the consequences directly: rights fought for since the Industrial Revolution neglected, no protection against discrimination, no social security, little job security, and limited income opportunities and social contact.",
       "Disintermediation is real here, since many platforms match providers and customers without traditional middlemen, and that is roughly the argument the company is making. It names what happened to the intermediary rather than what happened to the people doing the work.",
       "A same-side effect is a genuine feature of this market, and more couriers competing for the same jobs is one. It describes how value shifts among users of a platform, not the employment arrangement the criticism is about.",
       "The chapter does raise unfair competition, and it defines it as gaining advantage over traditional businesses by breaking or at least bypassing existing laws and regulations. Employing nobody is a feature of the gig arrangement rather than the definition of unfair competition."]},

    {q:"A hypothetical maker of commercial laundry machines is considering a change: instead of selling machines to hotels and then selling spare parts and repairs, it would keep ownership and charge per completed wash cycle. Which consequence does the chapter say follows from a move like this?",
     opts:[
       "Revenue becomes more predictable and little else changes, because the same machines go to the same hotels under a different payment schedule",
       "The maker should now press harder on minimizing manufacturing cost, since it keeps every machine it builds and margin per unit matters more than it did",
       "The change is essentially a financing arrangement, so the important new work is assessing each hotel&rsquo;s credit rather than altering the product or the processes",
       "The hotel&rsquo;s fixed costs become variable and the maker earns only while machines run, so its incentive moves to life span and preventive maintenance, which requires connected sensors and analytics"],
     a:3, obj:"2.2",
     why:[
       "Smoother revenue is a fair expectation and one reason firms find these models attractive. The chapter is explicit that a great deal else changes, including pricing models, business processes, service level agreements, capacity management, and the customer segment being sold to.",
       "Minimizing manufacturing cost is the instinct a pipe-based manufacturer brings with it, which is exactly why the chapter calls it out. Under a service-based model the manufacturer has to focus instead on life span and ease of maintenance and repair, because it now pays for every failure.",
       "Money does move differently and credit exposure is real, so this concern belongs somewhere on the list. Treating the change as financing misses the operational half: the maker only earns while the equipment runs, which rewrites what it should design for and monitor.",
       "Correct. The chapter&rsquo;s jet-engine example has the customer paying for hours of usage rather than buying the engine, transforming fixed costs into variable costs, while the manufacturer earns only for operating equipment and therefore has an incentive to improve design and perform preventive maintenance. It adds that such models are possible only through sensors connected to the internet and advanced analytics that predict failure and schedule maintenance."]},

    {q:"A hypothetical veterinary group made two changes last year. <b>A</b>: it upgraded its booking software to a version that sends automatic reminders, and missed appointments fell. <b>B</b>: it began remote video consultations, which brought in rural clients who had never used any practice regularly, and which are steadily taking over routine follow-up visits. Which change is a <b>radical innovation</b> as the chapter defines it?",
     opts:[
       "A, because the software version is new to this practice and the change produced a measurable business result",
       "Neither, because both run on software the practice bought rather than technology it developed itself",
       "B, because a markedly different technology has reached a customer segment the practice never served and is marginalizing an existing service",
       "Both, because the chapter treats any innovation that returns value to the organization as radical"],
     a:2, obj:"2.3",
     why:[
       "A is an incremental innovation, which the chapter calls the most common form: enhancing or upgrading existing products, services, or processes. Being new to the adopter is not the test, otherwise every purchase a firm had not made before would count as radical.",
       "The chapter&rsquo;s own table of radical innovations lists online retailing, distance education, and online stock brokerage, none of which required the adopting organization to invent the technology. Who built it is a separate question from what it displaced.",
       "Correct. Radical innovations use a markedly new or different technology to access new customer segments and/or provide significantly greater benefits to existing customers, and eventually marginalize or replace existing products or services. Both halves are present here: a segment that was never served, and routine visits being displaced.",
       "Returning value to the organization is what separates innovation from mere invention, so both changes qualify as innovations. That test does not distinguish the two sizes, and treating every valuable change as radical empties the word of the meaning the chapter gives it."]},

    {q:"A hypothetical grocery chain stops charging a fee for each home delivery and offers a flat monthly delivery pass instead. The products, the stores, the vans, and the delivery routes are unchanged; what changed is how the customer pays. Which of the ten types of innovation is that?",
     opts:[
       "Service innovation, because the customer experiences delivery differently now and their experience of the offering is what changed",
       "Profit model innovation, because it is a novel way of generating revenue from an offering that is otherwise the same",
       "Channel innovation, because delivery is how the offering reaches the customer and delivery is what the change is about",
       "Process innovation, because the way the chain plans and staffs its delivery rounds will have to change to serve pass holders"],
     a:1, obj:"2.3",
     why:[
       "Service innovations support and enhance the value of an offering, and the chapter&rsquo;s examples are a retailer&rsquo;s philosophy of delivering excellent customer service and a clothier offering free lifetime pressing. Nothing about the standard of service changed here, only the basis on which it is billed.",
       "Correct. Profit model innovation is finding novel ways of generating revenues from offerings, and the chapter&rsquo;s examples are a storage firm using a freemium approach, a software firm offering its suite on subscription, and an engine maker selling thrust as a service. A pass replacing per-delivery fees is the same kind of change.",
       "Channel innovations use innovative ways to connect offerings with customers, such as an immersive flagship store or a coffee brand partnering with hotels and airlines. The van reaching the same doorstep is the same channel; what moved is the money.",
       "Process innovations change the primary processes used to produce products or services, such as pioneering lean production or moving fashion from design to store in three weeks. Scheduling may well adapt, but adapting to a pricing change is not the same as changing how the work is produced."]},

    {q:"A hypothetical team building scheduling software for salons ships a minimum viable product with six features. Testing shows that owners use only the waitlist feature, will not pay for the other five, and say they would happily pay for a waitlist tool on its own. What does the lean startup methodology say the team should do?",
     opts:[
       "Persevere and add more features, because a single-feature product cannot support a business and the other five need longer to be understood",
       "Abandon the venture, because a hypothesis that failed in customer validation shows there is no market for the product",
       "Move into the execution phase, because customers have said they would pay and willingness to pay is what the search phase exists to settle",
       "Pivot: change direction while staying grounded in what was learned, which is what the build-measure-learn cycle exists to produce"],
     a:3, obj:"2.3",
     why:[
       "Adding features is the inside-out instinct the chapter warns against, and it is what the evidence contradicts. The chapter&rsquo;s example runs the other way: an app combining check-ins, gaming, and photo sharing was stripped down to the features users valued and became successful afterwards.",
       "Abandoning is the response to learning nothing, and this test taught the team a great deal. When a hypothesis does not hold the methodology asks for a pivot, a change of direction grounded in what was learned, rather than the end of the venture.",
       "Willingness to pay is indeed what customer validation tests, which makes this tempting. What customers said they would pay for is not the product that was built, so the search phase has not yet produced a product/market fit to execute on.",
       "Correct. If at any stage of the search process a hypothesis does not hold, it is time to pivot, changing direction while remaining grounded in what was learned, and teams typically go through several iterations and pivots before finding product/market fit. The measure step here has produced exactly the learning a pivot is made from."]},

    {q:"A hypothetical equipment-rental firm surveys its regular customers about which emerging technology it should adopt. The customers name one they already encounter elsewhere, and the firm decides to build its differentiation on it. What does the chapter&rsquo;s account of innovation say about this reasoning?",
     opts:[
       "It is weak, because customers understand their own problems very well but are not experts in solutions, and a technology they already know is one competitors know as well",
       "It is sound, because the customers are the people who will use it, and outside-in thinking means building what customers ask for",
       "It is sound, because a technology customers already recognise carries less adoption risk than one they have never seen in use",
       "It is weak, because customer surveys are inside-out thinking, and outside-in thinking means starting from the firm&rsquo;s own capabilities and finding a market for them"],
     a:0, obj:"2.3",
     why:[
       "Correct. The chapter says customers are likely to understand their problems very well but are not experts in solutions and are not likely to know about new technologies, and adds that if they do know about a technology then competitors probably do too, which makes it the wrong one to rest a competitive advantage on.",
       "Outside-in thinking is the chapter&rsquo;s recommendation, so the label is right and the application is not. Outside-in means starting from the customer&rsquo;s job-to-be-done and the friction points blocking it, which is a question about problems rather than a shopping list of technologies.",
       "Familiarity does lower adoption risk, and that is a real benefit worth weighing. The chapter&rsquo;s objection is about advantage rather than adoption: a technology already visible to everyone will not distinguish this firm from the rivals who can see it too.",
       "This reverses the two terms. Inside-out thinking is developing a solution and then trying to find a market for it, while outside-in thinking starts from the customer&rsquo;s need, so a survey of customers is not itself inside-out."]},

    {q:"A hypothetical logistics firm must choose between two incompatible shipment-tracking standards. One is clearly better engineered; the other is already used by more of the firms it trades with. A manager argues that the choice is obvious, because the better technology will win in the end. What does the chapter&rsquo;s treatment of innovation support?",
     opts:[
       "Agree, because the superior technology is the safer investment and markets correct toward quality given enough time",
       "Agree, because a technically superior system is proprietary technology, which is the kind of resource rivals cannot copy",
       "Disagree: choosing among innovative investments always entails risk, and the technically superior option can still lose the market, as Betamax did to VHS",
       "Disagree, and wait until one standard has plainly won, because a firm that never commits early cannot make an expensive mistake"],
     a:2, obj:"2.3",
     why:[
       "Quality does matter and it often wins, which is why this is the intuitive answer. The chapter&rsquo;s videocassette example exists precisely to show that most experts agreed one format recorded and played back better and that the other format won the marketplace anyway.",
       "This misapplies the word proprietary. The chapter says an organization typically cannot patent its use of an information system, particularly one purchased from a vendor: the data in the system may be proprietary, but the system usually is not.",
       "Correct. Choosing among innovative investments always entails risk, and the chapter&rsquo;s classic example is the videocassette format contest in which the technically superior choice turned out to be the unfortunate one. It adds that for organizations the risk is greater still, given the size and often mission-critical nature of the investment.",
       "Waiting removes one risk and creates another, and the chapter&rsquo;s account of innovation is that it has to be continuous, with organizations constantly on the lookout and never resting. It also leaves the manager&rsquo;s reasoning untouched, since the eventual winner is exactly what nobody can read off engineering quality."]},

    {q:"A hypothetical insurer announces it will adopt the lean startup approach for new services. Its funding is approved once a year for a whole project, individual bonuses depend on delivering the plan as written, and a cancelled experiment counts against the person who proposed it. What stands in the way?",
     opts:[
       "Nothing serious, provided the teams are made cross-functional, because the methodology&rsquo;s requirements concern how teams are composed rather than how work is funded and rewarded",
       "A resource requirement, because what the firm needs is enough people with the knowledge, skills, and time to build a minimum viable product quickly",
       "Nothing, because the methodology was developed for startups, so an established insurer adopting it needs no change to how it funds and rewards work",
       "Process and risk-tolerance requirements: accountability and incentives need to sit at the team level, funding must be released in stages and be cuttable, and failure has to be tolerable"],
     a:3, obj:"2.3",
     why:[
       "Cross-functional teams are one of the requirements the chapter names, so this is half right. It stops there, and the chapter also calls for incentives at the team level rather than the individual level and for a startup-like budgeting model, both of which this firm currently contradicts.",
       "Having enough people with the relevant knowledge, skills, and time is a genuine resource requirement the chapter lists, and it may well bind here too. Nothing in the situation says the insurer lacks people; what it describes is how money is released and how behavior is rewarded.",
       "The chapter answers the first half directly, saying the approach does not only work for startups and naming established companies that have used it successfully. The second half is where this fails: the chapter treats process, resource and risk-tolerance requirements as conditions the organization has to meet, not as things a team can work around while funding and rewards stay unchanged.",
       "Correct. The chapter&rsquo;s process requirements call for cross-functional collaboration, incentives and accountability at the team level rather than the individual level, and a startup-like budgeting model where funds are approved as the project moves through stages or cut quickly. Its risk-tolerance requirement adds that members must be willing to test products that may not meet requirements and to fail fast."]},

    {q:"An analyst at a hypothetical distributor asks an AI assistant which competitive force is pressing hardest on the firm. It returns a fluent paragraph naming customers&rsquo; bargaining power, citing an industry switching-cost figure and a named competitor&rsquo;s loyalty program. Neither the figure nor the program can be found anywhere. What is the right next move?",
     opts:[
       "Keep the diagnosis and drop the two citations, because the force it named is the part the analysis actually needs",
       "Treat the paragraph as a hypothesis and go and collect the firm&rsquo;s own evidence, because a confident output can be invented and a recommendation has to rest on something observable",
       "Ask the assistant to rate its own confidence in each claim and keep only the claims it rates highly",
       "Stop using the assistant for work of this kind, because a tool that can invent a citation cannot contribute to a strategy discussion"],
     a:1, obj:"2.4",
     why:[
       "This is the tempting shortcut, and it treats the conclusion as separable from the support that came with it. The same process produced both, and the module&rsquo;s own test for a recommendation is a named force together with the observable evidence that it is the strong one.",
       "Correct. A confident, fluent output that turns out to be untrue is the failure this module has been guarding against, and the remedy is a person between the output and the decision. Naming a force is a hypothesis worth testing against renewal history, account concentration, and win-loss records, which are things only this firm holds.",
       "A self-assessment is produced the same way as the rest of the passage, and the paragraph in question already read as confident while being wrong. Asking a text generator to judge its own text adds a second output to verify rather than a check on the first.",
       "Refusing the tool entirely is the over-correction, and it gives up real assistance in framing a question and listing candidates. The lesson the module draws is to keep the person in control of the decision, which is a role for the tool inside the work rather than a reason to bar it."]},

    {q:"The strategy team at a hypothetical manufacturer wants a summary of its unreleased pricing model and its supplier contract terms. Someone proposes pasting both documents into a public AI assistant the firm holds no agreement with, whose provider states that submitted content may be retained and used to improve the service. What should be raised first?",
     opts:[
       "That submitting the documents moves the firm&rsquo;s own proprietary material outside its control to a provider that says it may keep it, and that material is the resource the firm&rsquo;s position rests on",
       "That the summary may contain an invented figure, so every number in it will have to be checked against the source documents before anyone relies on it",
       "That an assistant trained largely on freely available public content is unlikely to read commercial supplier contracts well enough to summarize them accurately",
       "That summarizing these documents is work the strategy team is there to do, so handing it over makes the team less valuable to the firm"],
     a:0, obj:"2.4",
     why:[
       "Correct. The chapter treats resources such as proprietary technology and accumulated commercial knowledge as the assets an advantage is built from, and unreleased pricing and negotiated supplier terms are exactly that. Once the file is submitted it has left the firm&rsquo;s control, and the provider has said it may retain the content.",
       "Checking figures against the source is right and would be the first concern if the documents held nothing sensitive. It is a concern about what comes back rather than about what goes out, and the damage in this case is done at the moment of submission.",
       "How well an assistant reads an unfamiliar commercial document does affect the quality of the summary, so this is a fair question about output. It is a separate question from whether the document should be sent to an outside service at all.",
       "Drafting help is not the same as surrendering the decision, and a summary the team then reads and argues with is assistance of the kind this module endorses. What is wrong here is what the assistant is being handed, not that it is being asked."]},

    {q:"A hypothetical retailer trains a model on eight years of its own promotion results to propose next season&rsquo;s promotions. The chain now wants to win a customer group it has never served. The model keeps proposing variations of what has worked for the customers it already has and proposes nothing for the new group. Nothing is malfunctioning. What explains the result?",
     opts:[
       "The output is a hallucination, because the proposals do not correspond to what the chain intends to do next season",
       "The result shows the new customer group is not worth pursuing, since eight years of the chain&rsquo;s own data turned up nothing that would reach them",
       "The model reflects the data it was given: the record holds the chain&rsquo;s history rather than its strategy, so the remedy lies in the inputs and in human judgment rather than in better prompting",
       "The problem is how the request was phrased, and a prompt naming the new customer group explicitly would produce a proposal the chain could act on"],
     a:2, obj:"2.4",
     why:[
       "A hallucination is a confident statement that is not true, such as a fabricated figure or a citation to something that does not exist. These proposals invent nothing; they repeat faithfully what the chain actually did, which is a different fault needing a different fix.",
       "This reads silence as evidence, which is the reasoning error the situation is built to expose. Records of customers the chain never sold to do not exist, so the data cannot speak for or against that group and the absence of a proposal says nothing about its value.",
       "Correct. Output quality rests on input quality, and a dataset of eight years of one chain&rsquo;s own promotions describes the customers it had rather than the customers it wants. No amount of phrasing will produce evidence about a group the record never contained, so the work belongs with the analyst and with new data collection.",
       "Sharper requests do produce better responses, and naming the group would certainly change the wording of the answer. It would not change what the model has to draw on, so the reply would be assembled from patterns belonging to the existing customers and presented as though it were about the new ones."]},

    {q:"Four uses of an AI assistant are proposed during a strategy review at a hypothetical wholesaler. Which one fits the discipline this module has been teaching?",
     opts:[
       "Let it choose which of the three competing proposals to fund, because it can weigh them without the internal politics that distort the room",
       "Let it write the final recommendation, complete with the measure and the review date, and take that draft to the executive committee as written, since the analyst supplied the evidence it was built from",
       "Let it generate the evidence for the force we have already agreed is strongest, so that the recommendation reads convincingly when it reaches the committee",
       "Let it list candidate substitutes and possible cost drivers for the analyst to test against the firm&rsquo;s own sales and purchasing records"],
     a:3, obj:"2.4",
     why:[
       "Hard judgment is where analysis feels most valuable, and the wish to take politics out of a funding decision is a real one. Handing over the decision itself is what the companion rule refuses; having it compare the three proposals against stated criteria while the committee decides would fit.",
       "Supplying the evidence is a real safeguard, and drafting is genuinely the kind of help this module endorses, which is what makes this the hardest of the four to refuse. The verification step belongs after the drafting rather than before it, because a figure, a date or a term can still be restated wrongly in the draft, and whoever carries it into the room is the person who will be asked to defend it.",
       "This inverts the whole sequence the module teaches, which runs from evidence to a named force to an initiative. Assembling support for a conclusion already reached is the opposite of a diagnosis, and it would survive the meeting only until somebody checked the numbers.",
       "Correct. Candidates and cost drivers are the kind of breadth an assistant supplies well, and every one of them is then checked against records only this firm holds. The analyst keeps control of what the evidence supports, which is the arrangement that makes the person more valuable rather than less."]},

    {q:"For several months a hypothetical wholesaler&rsquo;s team has received a weekly competitive-scan summary drafted by an AI assistant from public news and vendor sites. Nobody now opens the underlying sources. A manager proposes making the summary the firm&rsquo;s main strategic input, since it covers more ground than the analysts ever did and arrives days sooner. How should that proposal be judged?",
     opts:[
       "Sound, because the summary reaches more sources than the analysts could read and speed is what makes a diagnosis useful while a decision is still open",
       "Weak, because the summary rests on content any rival&rsquo;s assistant can read too, so it can support parity at best, while the firm&rsquo;s own records are the input rivals do not have",
       "Sound as long as the assistant is required to cite each source, because a summary with citations attached is evidence in the sense this module has been using the word",
       "Weak, because the real loss is that nobody on the team reads a source before repeating what the summary says about it"],
     a:1, obj:"2.4",
     why:[
       "Coverage and speed are genuine gains, and the module does argue that the analyst who closes the gap fastest is the one whose recommendation arrives while the decision is open. Speed does not settle where an advantage comes from, which is the claim this proposal is actually making.",
       "Correct. The chapter&rsquo;s account of advantage turns on resources and capabilities superior to those of competitors, and on the observation that rivals can copy what they can also obtain. Public sources are available to every competitor, while this firm&rsquo;s own purchasing, renewal, and margin records are not, which is why the summary belongs alongside the internal evidence rather than in place of it.",
       "Citations do make verification possible and they are worth insisting on. A cited public article is still a statement about the industry rather than observable evidence about this firm&rsquo;s buyers, suppliers, or costs, which is what a named force has to rest on.",
       "This names a real cost, since a team repeating an unchecked summary cannot say where a claim came from. It is an argument for keeping the reading habit rather than an answer to whether a public-source summary can carry the firm&rsquo;s strategy."]},

    {q:"An analyst at a hypothetical wholesaler wants a list of departments whose total spending for the year exceeded fifty thousand. Working from a single spending table, she groups the rows by department and totals the amounts, but places the condition on the total in the clause that filters rows before any grouping happens. The query will not give her what she wants. Why?",
     opts:[
       "The row filter runs before the rows are grouped, so the totals it is being asked to test do not exist yet; a condition on a total belongs in the clause that filters groups",
       "The total was never named among the columns the query returns, and a condition can only test a column that appears in the returned result",
       "The result was never sorted, and a condition on a total is applied as the rows are put in order, so nothing is compared until a sort is added",
       "The department names and the amounts have not been brought together, so a join is needed before either column can be used in a condition"],
     a:0, obj:"2.5",
     why:[
       "Correct. The row filter keeps only the rows that satisfy a condition and it runs before anything is totalled, which is why it quietly determines every number that follows. Filtering on a total requires the clause that filters grouped rows, and that clause exists precisely because the row filter has finished its work by the time totals exist.",
       "This is a common belief and it is worth testing: conditions and returned columns are separate decisions, and a query can perfectly well filter on something it does not display. The trouble here is not visibility but timing, since the total has not been calculated at the moment the row filter runs.",
       "Sorting arranges the rows that survive; it neither creates nor removes any of them. Adding a sort here would order a result that is still wrong, which is why an ordering clause never repairs a filtering mistake.",
       "Everything the analyst needs sits in one table, so nothing has to be joined before the condition can be written. A join brings related rows from two tables together on a matching column, which would matter if the department names lived somewhere else."]},

    {q:"A hypothetical service desk holds six tickets: <b>A</b> north, 5 days; <b>B</b> north, 2 days; <b>C</b> south, 9 days; <b>D</b> north, 4 days; <b>E</b> east, 3 days; <b>F</b> north, 3 days. An analyst keeps only the tickets from the north region that took more than three days, counts what survives, and reports that the north region resolves most of its tickets slowly. What is wrong with the report?",
     opts:[
       "Nothing: two of the four northern tickets took more than three days, which is a fair basis for calling the region slow",
       "The condition should have been three days or more rather than more than three, which would have kept ticket F and changed the count",
       "The filter removed every other region as well as the fast northern tickets, so the result can neither compare north with anywhere else nor say what share of northern tickets is slow",
       "The count is right but the rows should have been grouped by region first, because a count means nothing until the rows are grouped"],
     a:2, obj:"2.5",
     why:[
       "The arithmetic is nearly right and the conclusion is not: two of four is half rather than most. Even that comparison is unavailable from this result, because the surviving rows no longer include the fast northern tickets the share would be measured against.",
       "Boundary conditions genuinely matter, and ticket F at exactly three days is excluded by the wording as written. Moving the boundary changes the count by one and leaves the report&rsquo;s two real problems exactly where they were.",
       "Correct. A filter applied before anything is counted decides every number that follows, and this one discarded both halves of the comparison the claim depends on: the northern tickets resolved quickly, and every ticket from the south and east. The result supports only the statement that two northern tickets took more than three days.",
       "Grouping would produce a count for each region present in the surviving rows, and only one region survived the filter. The group would therefore be north on its own, which is the same number reported in a different shape."]},

    {q:"A hypothetical retailer is matching a loyalty file against a web-store file on the customer email address. Around forty per cent of the records fail to match even though staff recognise the same customers in both. A spot check shows differences of capitalisation, trailing spaces, and in a few rows an invisible character. What is the right first move?",
     opts:[
       "Correct the raw values in both files by hand until the two columns agree, since matching them is what the work is for",
       "Build standardised columns beside the raw ones in each file and match on those, leaving the original values in place so anyone can later check where a match came from",
       "Match on the part of each address after the marker instead, because the domain is stable and does not carry the stray spacing",
       "Ask for fresh exports from both systems, because data with invisible characters in it cannot support a customer analysis"],
     a:1, obj:"2.5",
     why:[
       "Editing in place does eventually produce values that agree, and it destroys the originals, so nobody can afterwards show where a matched record came from. It also has to be redone by hand every time either system exports again.",
       "Correct. A spreadsheet function takes a value and returns a new one without changing the original, which is why cleaning is done in new columns: the raw values stay available when someone asks where a number came from. Removing stray spaces, stripping non-printable characters, and standardising capitalisation is what makes two records for one customer match at all.",
       "Domains are stable, which is what makes this idea appealing. Matching on the domain merges every customer at the same organization into a single record, which replaces a matching problem with a larger counting problem.",
       "A fresh export is worth asking for when a file is genuinely corrupt, and here the inconsistency is in how the values were entered rather than in the transfer. The same untidy values would arrive again, and the cleaning step would still be waiting."]},

    {q:"An analyst at a hypothetical wholesaler pulls the username out of each email address by taking the first eight characters of the address. It looks right for a few rows and is wrong for many others. What has gone wrong, and what is the rule that fixes it?",
     opts:[
       "The addresses still carry stray spaces, and once those are removed a fixed count of eight characters will land in the right place",
       "The function being used is case sensitive, so the addresses containing capital letters were cut at the wrong point",
       "The values vary in length, so the split has to be done by looking each address up against a list of known usernames",
       "The marker sits in a different position in every address, so the rule has to locate the marker first and measure from it rather than count a fixed number of characters"],
     a:3, obj:"2.5",
     why:[
       "Trimming is a real first step and it does shift every character along by however many spaces came off. A fixed count of eight would still be wrong for every address whose username is not eight characters long, which is most of them.",
       "One of the position-finding functions is case sensitive and its companion is not, and that distinction matters when the marker itself is a letter. The marker here is the same character in every row, so capitalisation cannot be what moved it.",
       "Varying length is exactly the problem, and a lookup list is the wrong remedy for it: the list would need maintaining and would fail on the first customer nobody had entered yet. The point of a formula is to state a rule that works on rows nobody has seen.",
       "Correct. Neither the username nor the domain has a fixed length, so the position of the marker has to be found for each row and the length measured from it. That is why the pattern is find the marker, take everything up to one character before it, and take the remainder by subtracting the marker&rsquo;s position from the total length."]},

    {q:"A query against a hypothetical wholesaler&rsquo;s sales table returns revenue by account and shows that four accounts produced roughly two thirds of the year&rsquo;s revenue. Four sentences are written about it. Which one is the <b>finding</b> &mdash; what the numbers mean in the business &mdash; rather than the result itself or a recommendation?",
     opts:[
       "Four accounts produced about two thirds of revenue in the period the query covered",
       "We should build a purchase history for every account and make offers from it, judged by the share of revenue coming from accounts outside the top four at the next review",
       "A few buyers hold enough of our revenue to set terms at renewal, which is customers&rsquo; bargaining power pressing on us",
       "We should be spending more time with our largest accounts than we currently do"],
     a:2, obj:"2.5",
     why:[
       "This is the result restated, and it is true and it is where the work starts. It names no consequence for the business, which is why on its own it is a fact nobody has to act on.",
       "This is a recommendation, and a well-formed one: it states a concrete initiative and commits to a measure and a date. It is the step after the finding rather than the finding itself, and it only makes sense once the finding has explained why account concentration matters.",
       "Correct. A finding says what the result means in the business, and this one attaches the concentration of revenue to a named force: buyer power grows when a few accounts hold most of your revenue and can use that leverage at renewal. It is the link between the query result and any initiative anyone might propose.",
       "This is a preference. It offers no evidence, nothing anyone could be assigned to build, and no measure by which it could later be judged to have worked."]},
  {"q": "A scoring function for competitive forces returns the single highest-scoring force. Two forces tie at the top and it returns the first one it happened to see. What is the practical consequence?", "opts": ["None, since either force is equally worth addressing when they score the same", "Spending is aimed at whichever force the data happened to list first, and the report gives no sign that the evidence never separated them", "The score itself becomes unreliable and the analysis must be redone from the beginning", "The tie will resolve itself once more evidence is gathered, so the output is provisional"], "a": 1, "why": ["Equal scores do not make the responses interchangeable; relieving buyer power and relieving supplier power call for entirely different systems and budgets.", "Right. The ordering of the input decides the recommendation, and nothing in the output warns the reader of that. A confident answer resting on row order is worse than an admitted tie.", "A tie does not make the scores wrong. The scoring is fine; the reporting of what it found is what fails.", "It may well resolve later, but the report as issued presents a winner as settled, and decisions get taken from it now."], "obj": "2.6"},
  {"q": "A subscription business calculates that a customer costing 240 to acquire returns 30 a month, and reports a payback of eight months. Customers on that plan churn at 20 percent a month. What has the calculation missed?", "opts": ["Nothing; eight months is the correct payback period for those figures", "That the expected lifetime is about five months, so the customer leaves roughly three months before the acquisition cost is recovered", "That the monthly return should have been discounted for the time value of money", "That acquisition cost should be spread across the whole customer base rather than charged to one customer"], "a": 1, "why": ["The division is right and the conclusion is wrong, which is what makes this the common error. Eight months only matters if the customer is still there in month eight.", "Right. A churn rate of twenty percent a month implies an average life near five months, so the eight-month payback never arrives and each acquisition loses money.", "Discounting would refine the figure slightly and would not change the verdict. The horizon, not the discount rate, is what decides this case.", "Spreading the cost differently changes the presentation, not the fact that this customer leaves before repaying what winning them cost."], "obj": "2.6"},
  {"q": "An analyst needs total revenue per plan and writes a query that filters with WHERE on the summed revenue. The database rejects it. Why?", "opts": ["Sums cannot be filtered at all; they can only be sorted", "WHERE is evaluated before rows are grouped, so no total exists yet for it to test; a condition on an aggregate belongs in HAVING", "The query is missing an index on the column being summed", "SUM may only appear in the SELECT clause and nowhere else in a query"], "a": 1, "why": ["Sums are filtered routinely; the question is only where in the statement that filter is allowed to sit.", "Right. WHERE decides which rows enter the grouping and has finished before any total is computed. HAVING runs afterwards, which is why the condition belongs there.", "An index changes how quickly a query runs, never whether it is a legal statement.", "Aggregates appear in HAVING and ORDER BY as well, which is precisely the point this question turns on."], "obj": "2.6"},
  {"q": "A customer's name is stored once in a customer table and joined in wherever it is needed, rather than copied onto each of their subscriptions. Which reason best justifies that design?", "opts": ["Joining is faster than reading a column that is already on the row", "The name is a fact about the customer, so keeping one copy means a correction is made once and no two rows can disagree", "It reduces the total storage the database consumes to a meaningful degree", "It is required before a GROUP BY can be used on any of the joined tables"], "a": 1, "why": ["Joining generally costs more at query time than reading a local column. Speed is the argument against this design, not for it.", "Right. One fact in one place. Copying the name onto every subscription creates as many chances to disagree as there are rows, and reconciling them later is far more expensive than the join.", "The saving is real but trivial at this scale, and nobody would restructure a schema for it. Correctness is the reason that holds.", "Grouping works perfectly well on duplicated columns. Nothing about GROUP BY requires the data to be split across tables."], "obj": "2.6"}

  ]
};
