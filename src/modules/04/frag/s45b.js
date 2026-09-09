/* ===== s45b ===== */
PROSE.s45b = `
<span class="eyebrow">Section 4&ndash;5b</span>
<h2>Cryptocurrency, blockchain, and trust without a middleman</h2>
<p class="lede">Every online payment you have ever made passed through somebody you were trusting to make it right. This section takes that arrangement apart: what a trusted middleman actually sells, what it charges for the service, and what a payment looks like when there is nobody in the middle at all.</p>

<h3>What the fee is buying</h3>
<p>When you give a card number to a familiar retailer, or pay a small seller through a payment service, you are relying on a company you have never met to stand behind the transaction. The chapter calls those companies trusted middlemen. The trust is the product.</p>
<p>Two things in particular are being bought, and it helps to separate them.</p>
<ul class="keys">
<li><b>A safety net</b> &mdash; confidence that the money you send will produce the good or service you were promised, and a route to a refund when it does not.</li>
<li><b>Confidentiality</b> &mdash; your financial information stays with the middleman rather than being handed to every seller you buy from, which is the whole reason payment services exist.</li>
</ul>
<p>Neither comes free. The chapter puts card processing at roughly one to three percent of every purchase, charged to the vendor and normally passed on to everybody in higher prices. Payment services charge as well, sometimes several percentage points of the total.</p>
<p>A charge like that disappears inside a large purchase and dominates a small one. The case below works out where that line falls for a hypothetical firm sending many small payments to many countries.</p>

<div class="activity" data-activity="cryCase"></div>

<h3>A payment with nobody in the middle</h3>
<p><b>Cryptocurrencies</b> are virtual currencies that no central bank issues, using cryptographic techniques to secure transactions and to generate new units of the currency. The chapter is even-handed about them: they are often described as serving mainly illicit trade, and they have various legitimate applications too.</p>
<p>The claim worth testing is a narrow one. The technology under the best-known cryptocurrency requires no trusted middleman, which cuts the cost of a transfer to a negligible amount and makes both <b>micropayments</b> &mdash; payments too small to survive a percentage fee &mdash; and international transfers practical.</p>
<p>It was launched around 2008 by a developer working under a pseudonym. Payment processing is handled by thousands of computers around the world, each running the same open source software, so there is no head office, no opening hours and no national holidays.</p>
<p>A transfer is announced to that network, and any computer that wants to verify it may. Two words are worth having in advance: a <b>digital signature</b> proves that the holder of a sending address authorised that particular transfer, and a <b>block</b> is the batch of verified transfers added to the record in one go.</p>
<p>Blocks are added only when a majority of the machines holding the record accept them. The sequence below is one payment, from request to permanent record.</p>

<div class="activity" data-activity="cryOrder"></div>

<h3>What indelible and public mean together</h3>
<p>The record those computers keep is a <b>blockchain</b>: an indelible public ledger held across a <b>decentralized peer-to-peer network</b>, to which transactions are added in blocks, standing as proof of every transaction ever made.</p>
<p>Two descriptions in common use are worth correcting here, because both hide what the design is actually doing.</p>
<ul class="keys">
<li><b>Pseudonymous, not anonymous</b> &mdash; no names appear on the ledger, only addresses, but every transaction sits there permanently for anyone to read, and an address can often be tied to a person by other means. A permanent public record cannot also be a private one.</li>
<li><b>Hashing and signatures, not secrecy</b> &mdash; a <b>cryptographic hash</b> links each block to the one before it, so the history cannot be quietly rewritten by anybody. Nothing is concealed, because a ledger has to be readable by everybody to be checkable by everybody.</li>
</ul>
<p>Entries once made cannot be deleted. That is the property that makes tampering hard, and it is the same property that makes a mistake permanent: there is no middleman left to reverse a payment sent to the wrong address.</p>

<div class="activity" data-activity="cryDiagram"></div>

<h3>Working and being adopted are different questions</h3>
<p>The mechanism works. The chapter then supplies the evidence against its own enthusiasm: in 2014 several major online companies announced that they would accept the currency, those trials were terminated, and use for ordinary purchase transactions has remained negligible.</p>
<p>That gap is worth carrying out of this chapter. A technology can do exactly what it claims and still not be taken up, for reasons that have little to do with whether it works.</p>
<p>Interest has moved instead towards the ledger itself. Organizations across banking and technology are exploring blockchain for other kinds of transaction, the chapter reports, wherever three properties are needed at once.</p>
<ul class="keys">
<li><b>Trust</b> &mdash; the parties need a record none of them can quietly edit, which is what a ledger held by many participants provides without anybody having to vouch for anybody.</li>
<li><b>Accountability</b> &mdash; every entry carries a signature, so who added what is settled by the record rather than argued over afterwards from two sets of private books.</li>
<li><b>Transparency</b> &mdash; the participants read one shared history instead of reconciling separate copies, which is where most of the saving in a business setting comes from.</li>
</ul>
<p class="takeaway">Remove the middleman and you remove the fee, the dispute process and the confidentiality in one motion. The question is never only whether the ledger works. It is which of those three you can afford to lose for the payment in front of you.</p>

<div class="activity" data-activity="cryQuiz"></div>
`;

ACT.cryCase = {
  kind: "case",
  label: "Mini case",
  title: "Four hundred small payments, thirty countries",
  how: "Read the brief and the exhibit, then make the three decisions; the agency, the translators and every figure in the exhibit are invented for practice.",
  objective: "4.5",
  brief: "A hypothetical translation agency pays about four hundred freelance translators once a month. They live in roughly thirty countries, and most invoices are small. The finance lead has been asked whether the middleman is worth what it costs, and what the agency would be giving up if it stopped paying one. Nothing here is drawn from a real company.",
  facts: [
    {k: "Payment run", v: "About 400 translators, once every month"},
    {k: "Countries reached", v: "Roughly 30"},
    {k: "Typical invoice", v: "About US$18, with a long tail under US$8"},
    {k: "Largest invoices", v: "A handful above US$600"},
    {k: "Disputes last year", v: "Nine, all settled by the payment service"}
  ],
  exhibit: {
    name: "Exhibit A &middot; the cost of one payment, four ways",
    caption: "The same US$18 payment costed by method, with the fixed part and the percentage part shown separately. Every figure is invented for practice and is not quoted from any provider.",
    headers: ["Method", "Fixed part", "Percentage part", "Cost on US$18", "What the payer gives up"],
    rows: [
      ["Card processing", "US$0.30", "2.5%", "US$0.75", "Little; the right to dispute survives"],
      ["Payment service", "US$0.35", "3.0%", "US$0.89", "Little; the service arbitrates disputes"],
      ["International bank transfer", "US$14.00", "none", "US$14.00", "Speed; several days before it lands"],
      ["Ledger-based transfer", "US$0.05", "none", "US$0.05", "Reversal and any dispute process"]
    ]
  },
  questions: [
    {
      q: "Set the four rows of the exhibit against the agency&rsquo;s invoice sizes. Where does the middleman&rsquo;s fee do real damage?",
      opts: [
        "On the smallest invoices, where a fixed charge plus a percentage takes a visible share",
        "On the largest invoices, because the percentage part rises with the amount being sent and the fixed part does not",
        "Evenly across the run, since the same percentage is applied to every invoice the agency pays",
        "Nowhere in this run; the international bank transfer is the single charge worth discussing"
      ],
      a: 0,
      why: [
        "Correct. A fixed charge does not shrink with the payment. On an US$18 invoice it is already two fifths of the card fee, and below about US$12 it costs more than the percentage part outright, which is where the tail under US$8 sits.",
        "The percentage does rise with the amount, but a percentage stays the same share of every payment. A large invoice absorbs it far more comfortably than a small one.",
        "The percentage part is even across the run. The fixed part is not, and that is the half of the fee that decides whether a small payment is worth sending at all.",
        "The bank transfer is the most expensive single line in the exhibit, yet the agency sends hundreds of small payments rather than one large one, so the small charges add up."
      ]
    },
    {
      q: "The finance lead proposes moving the whole monthly run to the ledger-based method. What does the agency give up along with the fee?",
      opts: [
        "The confidentiality of its own banking details, which the ledger would publish next to every payment it makes",
        "Dispute resolution and the ability to reverse a payment, because an entry on the ledger cannot be deleted",
        "The ability to pay translators in countries whose banking hours differ from its own",
        "Nothing of substance, since thousands of computers verify each transaction before it joins the ledger"
      ],
      a: 1,
      why: [
        "Banking details never reach the ledger. What appears there are addresses and amounts, so the privacy problem is real but it is about the permanent public record instead.",
        "Correct. The safety net is the thing the fee was buying. A ledger entry is indelible, so no middleman can reverse a transfer and nobody arbitrates when a payment goes to the wrong address.",
        "Reaching people in many countries is one of the things this method does easily, since the ledger is maintained around the clock and observes no national holidays.",
        "Verification confirms that the holder of the sending address authorised the transfer. It does not confirm that the sender meant to send that amount, or to that address."
      ]
    },
    {
      q: "A month into the new arrangement, one payment goes to a mistyped address. The finance lead asks the network to reverse it. What decides whether the money comes back?",
      opts: [
        "Whether a majority of the network votes to remove the mistaken entry from the ledger",
        "Whether the agency can show a payment service that the address was mistyped",
        "Whether whoever controls the receiving address chooses to send the amount back",
        "Whether the computers that verified the transfer can be asked to withdraw it"
      ],
      a: 2,
      why: [
        "Consensus governs which entries are added, not which are taken away. Entries once made cannot be deleted, so there is nothing here for the network to vote on.",
        "The agency gave up the payment service when it gave up the fee. No middleman is left to arbitrate, which is the other half of what the saving costs.",
        "Correct. Nothing in the mechanism retrieves a sent amount. Recovery depends on the goodwill of whoever holds that address, which is why an address is checked before the transfer is signed.",
        "Those computers checked a signature, and the signature was genuine. A correctly signed transfer to the wrong address is a valid entry the network has no reason to undo."
      ]
    }
  ],
  debrief: "The case was a trade running in two directions. The fee buys a safety net and confidentiality, and it is charged as a fixed part plus a percentage, which is why it bites hardest on small payments. Take the middleman out and the cost goes, but so does every route back: a ledger entry is as permanent when the address was wrong as when it was right."
};

ACT.cryOrder = {
  kind: "order",
  label: "Order",
  title: "The life of one payment on a public ledger",
  how: "Put the six steps into the order they actually happen; each explanation names the bank function that the step replaces.",
  objective: "4.5",
  intro: "One payment, followed from the moment it is requested to the moment it becomes permanent.",
  steps: [
    {
      t: "The payer prepares a transfer from their own address to the payee&rsquo;s address",
      why: "A bank would look up an account holder in records it keeps privately. Here the sending and receiving addresses are the only identities involved, and neither is a name."
    },
    {
      t: "The payer signs the transfer with the digital signature belonging to the sending address",
      why: "This replaces the bank&rsquo;s check that you are who you claim to be. The signature shows that whoever controls that address authorised this particular transfer."
    },
    {
      t: "The transfer is broadcast to the whole decentralized peer-to-peer network",
      why: "A bank would pass an instruction privately to one other institution. The announcement instead reaches thousands of computers, none of which is in charge of the others."
    },
    {
      t: "Any computer running the open source software verifies the signature and the transfer",
      why: "Checking is done many times over by strangers rather than once by a clearing department, which is what removes the need to trust any single participant."
    },
    {
      t: "The verified transfer is bundled with others into a block and added to the ledger",
      why: "A bank would post a line into its own private book. This block joins one public book that every participating computer holds its own copy of."
    },
    {
      t: "A majority of the network accepts the block and the entry becomes permanent",
      why: "There is no ledger department that can amend an entry afterwards. Changing it would need consensus from a majority of nodes, and entries once made cannot be deleted."
    }
  ]
};

ACT.cryDiagram = {
  kind: "diagram",
  label: "Compare",
  title: "Three ways to settle a payment",
  how: "Step through the three arrangements and read the four points under each; the third is the business use the chapter mentions rather than a currency anybody spends.",
  objective: "4.5",
  models: [
    {
      id: "mid",
      name: "Paying through a trusted middleman",
      site: "A card network or a payment service stands between the two parties.",
      boxes: [
        {c: "a", t: "Payer", w: "Hands financial details to one company, not to the seller"},
        {c: "b", t: "Middleman", w: "Verifies, holds the details, and can reverse the payment"},
        {c: "c", t: "Seller", w: "Is paid, and is told only what it needs to know"}
      ],
      points: [
        "Who verifies: one company that both sides have agreed to rely on.",
        "What it costs: roughly one to three percent for card processing, and sometimes several percentage points for a payment service.",
        "When it goes wrong: the middleman arbitrates, and the payment can be reversed.",
        "Who can see it: the middleman sees everything, and the record is private to the parties and their banks."
      ]
    },
    {
      id: "led",
      name: "Paying on a public ledger",
      site: "No company sits between the two parties; the network itself keeps the record.",
      boxes: [
        {c: "a", t: "Payer&rsquo;s address", w: "Signs the transfer with a digital signature"},
        {c: "b", t: "The network", w: "Thousands of computers check the signature"},
        {c: "c", t: "The blockchain", w: "The block joins a record nobody can delete"},
        {c: "d", t: "Payee&rsquo;s address", w: "Receives the amount, with no account to open"}
      ],
      points: [
        "Who verifies: any computer running the open source software, which is why no single one of them has to be trusted.",
        "What it costs: very little, which is what makes tiny payments and international transfers practical.",
        "When it goes wrong: nothing reverses it, because an entry once made cannot be deleted.",
        "Who can see it: everybody, permanently, which is why pseudonymous is the accurate word and anonymous is not."
      ]
    },
    {
      id: "shr",
      name: "A ledger shared between known partners",
      site: "The business use the chapter points to: organizations in banking and technology exploring the same record-keeping for other kinds of transaction.",
      boxes: [
        {c: "a", t: "Known partners", w: "Each one identified in advance, unlike an open network"},
        {c: "b", t: "An agreed entry", w: "Added once the partners agree that the event happened"},
        {c: "c", t: "One shared record", w: "A single history instead of a copy held by each firm"}
      ],
      points: [
        "Who verifies: a defined group of organizations rather than the whole world.",
        "What it costs: the saving sits in reconciliation and disputes rather than in payment fees.",
        "When it goes wrong: the partners still need a contract, because the record proves what was entered and not whether it was fair.",
        "Who can see it: the partners, which suits transactions that need trust, accountability and transparency at the same time."
      ]
    }
  ]
};

ACT.cryQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Privacy, adoption, and what the cryptography does",
  how: "Four options, one best answer; read every explanation, including the ones for the options you did not choose.",
  objective: "4.5",
  questions: [
    {
      q: "A friend tells you that transactions on a public ledger are anonymous, in the way that paying with cash is anonymous. What is wrong with the description?",
      opts: [
        "Nothing is wrong; the addresses carry no names, so the comparison with cash holds",
        "Names are attached to every entry, which makes the ledger less private than a card statement",
        "The record is permanent and public, so no name is needed for a payment to be traced",
        "Entries can be read only by the computers that verified them, which is a narrower kind of privacy"
      ],
      a: 2,
      why: [
        "Cash leaves no record behind it. A ledger keeps a permanent public one, and that permanence is exactly what makes the two unlike each other.",
        "No names appear on the ledger at all. Addresses stand in for them, which is the reason the accurate word sits between the two extremes.",
        "Correct. Every transaction stays visible to anyone who looks, and an address can often be tied to a person through other information, so the privacy is partial and can be undone later.",
        "The ledger is deliberately open to any computer that wants to verify it, and that openness is what allows checking without trusting anybody in particular."
      ]
    },
    {
      q: "The chapter reports that several major online companies announced in 2014 that they would accept the best-known cryptocurrency, and that those trials were later terminated. What should a manager take from that?",
      opts: [
        "That the underlying technology turned out not to work in the way it had been described",
        "That a mechanism can work as designed and still fail to be taken up for ordinary purchases",
        "That the companies involved were too small to give the payment method a fair trial at scale",
        "That the ledger cannot carry the transaction volumes a large online retailer would send it"
      ],
      a: 1,
      why: [
        "Nothing in the chapter says the mechanism failed. The ledger kept running throughout, and the account of how it works is presented as accurate.",
        "Correct. The chapter supplies this evidence against its own enthusiasm: use for ordinary purchase transactions has stayed negligible even though the technology does what it claims.",
        "The chapter describes them as major online companies, so scale is not the explanation, and it reports the ended trials without naming a cause.",
        "Capacity is not the reason the chapter gives. It reports an outcome rather than a technical failure, which is why adoption and not throughput is the lesson here."
      ]
    },
    {
      q: "Which description of the cryptography behind a public ledger is accurate?",
      opts: [
        "The whole ledger is encrypted, so only participants who hold the right key can read what it contains",
        "Digital signatures authorise transfers, and the ledger itself is meant to be readable by anyone",
        "Encryption hides the amounts, while the addresses involved are left in readable form",
        "The ledger is kept in one secured location and copied out to participants on request"
      ],
      a: 1,
      why: [
        "An encrypted ledger could not be checked by strangers, and checking by strangers is the entire mechanism that removes the need for a trusted middleman.",
        "Correct. A signature proves the holder of the sending address authorised the transfer, and hashing chains each block to the one before it; openness is a design requirement rather than an oversight.",
        "Amounts are visible alongside the addresses. Hiding them would stop any computer from confirming that a sender actually holds what is being spent.",
        "A single secured copy is what a bank keeps. The design here is that thousands of computers hold the record at once, which is what makes tampering hard."
      ]
    }
  ]
};
