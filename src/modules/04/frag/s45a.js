/* ===== s45a ===== */
PROSE.s45a = `
<span class="eyebrow">Section 4&ndash;5a</span>
<h2>Paying online without handing over everything</h2>
<p class="lede">Every online sale ends the same way: a stranger is asked to type a card number into a page they have never seen before. This section is about that moment &mdash; why it is where a sale is won or lost, and how a payment service changes who ends up holding the dangerous part.</p>

<h3>Handing the sensitive part to somebody else</h3>
<p>Concern about that moment produced independent <b>payment services</b> &mdash; PayPal, Apple Pay and Square among them &mdash; which stand between the shopper and the seller. The shopper pays using an account held with the service instead of typing card details into the seller&rsquo;s page.</p>
<p>The consequence is structural rather than cosmetic, and it is worth setting out item by item.</p>
<ul class="keys">
<li><b>The card number</b> &mdash; goes to the payment service and stops there, so it never reaches the seller&rsquo;s order system in the first place.</li>
<li><b>The account and its password</b> &mdash; belong to the service, which means the seller is not defending a login that guards somebody&rsquo;s money.</li>
<li><b>The email address and purchase history</b> &mdash; are kept by the service alongside the payment details, and are not shared with the merchant.</li>
<li><b>What is left with the seller</b> &mdash; is an order, a name and an address: what it needs to ship the parcel, and nothing beyond that.</li>
</ul>
<p>Turn that around and the point becomes plain. The merchant stops holding the thing a thief would want. The order still exists and the shipment still happens; the card number is simply somewhere else.</p>
<p>The sequence below is the ordinary checkout most people have already used, read for what each step takes off the seller&rsquo;s hands.</p>

<div class="activity" data-activity="payOrder"></div>

<h3>The moment the sale is lost</h3>
<p>Keeping transactions secure is one of the most important parts of selling to consumers, of consumers trading with each other, and of any purchase made on a phone. Money moves at that moment, and so does everything needed to move it.</p>
<p>The chapter is blunt about the human half of the problem. People are reluctant to change their habits online, and they hand sensitive information to sites they know nothing about. As a snapshot of what that costs, the chapter reports that identity fraud cost Americans about US$23 billion in 2023.</p>
<p>Shoppers who feel that unease respond by leaving. The chapter reports that more than half of online shopping carts are abandoned, and it names four reasons sitting behind most of it.</p>
<ul class="keys">
<li><b>Security concerns</b> &mdash; the shopper is not sure this seller can be trusted with a card number, and walking away from a cart costs them nothing at all.</li>
<li><b>Impatience</b> &mdash; the purchase was a passing intention rather than a plan, and every extra second gives that intention time to fade.</li>
<li><b>Lengthy checkout procedures</b> &mdash; each additional field and page is one more chance to decide the item was not worth this much effort.</li>
<li><b>Comparison shopping</b> &mdash; the cart was being used as somewhere to park a candidate while the same item was priced somewhere else.</li>
</ul>
<p>Read those four together and one management idea follows, and the rest of this objective turns on it. A seller has to strike a balance between providing security and reducing friction. Tighten the checkout and more shoppers leave; loosen it and the seller carries more risk.</p>

<div class="activity" data-activity="payQuiz"></div>

<p class="takeaway">A decision about payment security is never only a security decision. Every step you add to protect a sale is a step some shoppers will not finish, so the same choice shows up again in the revenue figures.</p>
<p>A payment service is not free. It charges a fee, and the fee lands on every completed order rather than only on the ones that would otherwise have gone wrong. The shop in the case below is invented, and so are its figures; the trade it faces is not.</p>

<div class="activity" data-activity="payCase"></div>

<h3>Where these services went next</h3>
<p>Google linked its payment service to its search results, so that somebody searching for a product can see immediately whether a merchant offers that way of paying. The stated intention was to ease the shopping experience and, by doing so, to reduce the number of abandoned carts.</p>
<p>PayPal went in a different direction, letting anyone with an email address send and receive money rather than only pay a shop. One person could now pay another, which was instrumental in the rise of the auction marketplace eBay, where buyer and seller are both ordinary people.</p>
<p>The chapter describes one of those two as owned by the other. That ownership ended in 2015 and they are separate companies now, so what matters here is the shared history: a payment tool and a marketplace that each made the other workable.</p>
<p>Phones then extended the same idea in two directions at once.</p>
<ul class="split">
<li>Paying inside a shop by holding a phone to a terminal, which is an alternative to carrying cash or cards.</li>
<li>Paying a person rather than a business, so a table of friends can settle a restaurant bill between them.</li>
</ul>
<p>The Chinese messaging platform WeChat shows how far that can run: online payments, in-person payments and transfers between people, all inside a service people already open for other reasons.</p>

<p class="takeaway">The balance is the whole objective in one sentence. A payment service is attractive because it moves both sides of it at once: fewer steps for the shopper to abandon, and less sensitive data left sitting with the seller.</p>

<div class="activity" data-activity="payReady"></div>
`;

ACT.payOrder = {
  kind: "order",
  label: "Sequence",
  title: "What happens when a shopper pays through a payment service",
  how: "Put the six steps into the order they actually happen, then read what each one removes from the seller&rsquo;s exposure.",
  objective: "4.5",
  intro: "Nothing in this sequence is unusual; it is the checkout most people have used without thinking about it. The point of putting it in order is to notice what the seller never receives.",
  steps: [
    {
      t: "At checkout the shopper chooses the payment service instead of the form that asks for a card number.",
      why: "Nothing sensitive has been typed into the seller&rsquo;s page, so there is nothing on that page to intercept and nothing the seller can store by accident."
    },
    {
      t: "The shopper is handed over to the payment service and signs in to the account they already hold with it.",
      why: "The credential being checked belongs to the service. The seller never sees the password and never has to build or defend a login that guards anybody&rsquo;s money."
    },
    {
      t: "Inside the service, the shopper sees who is being paid and how much, and approves the payment.",
      why: "The approval happens where the payment details already live, so the seller receives a decision rather than the card number that produced it."
    },
    {
      t: "The service charges the card or account it holds for that shopper and moves the money to the seller.",
      why: "This is the step that would otherwise have put a card number into the seller&rsquo;s system. Here the number stays with the service, along with the email address and purchase history it keeps."
    },
    {
      t: "The service tells the seller the payment succeeded and returns the shopper to the shop&rsquo;s confirmation page.",
      why: "What crosses to the seller is a confirmation and an order reference. Somebody who later breaks into the seller&rsquo;s records finds an order list rather than a set of card numbers."
    },
    {
      t: "The seller ships the order, keeping the details it needs to deliver it and to answer questions about it.",
      why: "A name and an address stay with the seller, because no parcel can be posted without them. The part a thief would have wanted was removed four steps earlier and never arrives."
    }
  ]
};

ACT.payCase = {
  kind: "case",
  label: "Mini case",
  title: "The step the owner was not looking at",
  how: "Read the brief, the facts and the exhibit, then take the three decisions in order; the shop, its funnel and every figure in it are invented for practice.",
  objective: "4.5",
  brief: "A hypothetical online shop sells specialist walking and climbing gear. Plenty of shoppers fill a basket and few of them finish. The owner is convinced the delivery charge is driving them away and wants to cut it. Before that, an adviser pulls one week of checkout data and asks whether a payment service, which charges a fee on every completed order, would be the better change.",
  facts: [
    {k: "What it sells", v: "Specialist walking and climbing gear, online only"},
    {k: "Shoppers reaching the basket", v: "About 1,000 a week"},
    {k: "Average order", v: "US$96, at roughly 45 percent gross margin"},
    {k: "Where card details sit today", v: "Stored in the shop&rsquo;s own order system"},
    {k: "What the owner believes", v: "That shoppers leave because delivery costs too much"},
    {k: "Payment service fee, if adopted", v: "US$2.60 on each completed order"}
  ],
  exhibit: {
    name: "Exhibit A &middot; One week of checkouts",
    caption: "Of every 1,000 shoppers who reach the basket, how many are still there after each step. Every figure here is invented for practice.",
    headers: ["Checkout step", "Still there, of 1,000", "Lost at this step"],
    rows: [
      ["1. Basket", "1,000", "&mdash;"],
      ["2. Create an account and sign in", "610", "390"],
      ["3. Delivery address", "540", "70"],
      ["4. Delivery choice and cost", "500", "40"],
      ["5. Card details", "320", "180"],
      ["6. Confirm and pay", "290", "30"]
    ]
  },
  questions: [
    {
      q: "The owner is about to cut the delivery charge. Which line of the exhibit should change that plan?",
      opts: [
        "Step 2, where 390 shoppers leave rather than create an account",
        "Step 4, where the delivery cost is shown for the first time",
        "Step 5, where 180 shoppers leave rather than type a card number",
        "Step 6, where 30 shoppers stop at the final confirmation"
      ],
      a: 0,
      why: [
        "Correct. The account requirement costs 390 of the 1,000, more than steps 3 to 6 lose between them, and it is demanded before the shopper has any reason to trust this shop.",
        "The delivery step loses 40 shoppers, the second smallest loss on the sheet. The owner&rsquo;s explanation is the one line the numbers do not support at all.",
        "The card step is the second largest loss and is worth fixing, but it costs 180 shoppers against the 390 lost one screen earlier. Deal with the larger one first.",
        "Thirty shoppers stopping at the confirmation is ordinary. By that point they have spent effort and made the decision, so it is the wrong place to look for the missing sales."
      ]
    },
    {
      q: "The payment service would let shoppers sign in with their payment account and skip the card screen, and the owner expects completions to rise from 290 to about 360 per 1,000. He objects to paying a fee on every order. What settles the question?",
      opts: [
        "The fee falls on completed orders the shop would have won anyway, so it should be refused",
        "Compare the fee across all completed orders with the margin the extra orders bring in",
        "Nothing can be decided until the shop knows what its current card processor charges",
        "The fee is paid whether or not an order completes, so treat it as a fixed monthly cost"
      ],
      a: 1,
      why: [
        "The fee does land on orders the shop would have won anyway, which is the honest part of the objection. It is not a reason on its own, because what matters is the net result rather than whether every dollar of fee was strictly needed.",
        "Correct. The fee on 360 orders is about US$936 a week, while the 70 additional orders add roughly US$6,720 in sales and about US$3,024 in margin. The change pays for itself several times over.",
        "Knowing the current processing cost would sharpen the figure and is worth finding out. It does not decide this one, because the gap between the fee and the recovered margin is far too wide for it to close.",
        "The facts strip says the fee is charged on completed orders, so it behaves like a cost of sale rather than rent. Reading it as a fixed cost makes a good change look worse than it is."
      ]
    },
    {
      q: "With the service in place the shop no longer stores card numbers in its own order system. In a year with no fraud at all, what has that bought?",
      opts: [
        "Nothing that year; the benefit only appears in a year when the shop is actually breached",
        "A smaller pile of data for anyone who does get in, which is worth something daily",
        "A transfer of chargeback costs onto the payment service, which is why the fee exists",
        "The same records held in a safer form, which is what the shop pays the service for"
      ],
      a: 1,
      why: [
        "A breach is not the only thing this changes, and waiting for one is the reasoning that leaves the data sitting there in the meantime. The exposure exists on every ordinary day, whether or not anybody has come for it yet.",
        "Correct. The chapter&rsquo;s point is structural: the payment information sits with the service, so what the shop holds is an order rather than a card number. That is true on quiet days too.",
        "Chargebacks are a genuine cost for online merchants and a later section deals with them properly. A payment service does not simply absorb them, and that is not what this fee buys.",
        "Nothing here says the shop keeps an encrypted copy of its own. The change is that the card details never reach the shop at all, which is a different and stronger thing than storing them carefully."
      ]
    }
  ],
  debrief: "The case did two jobs. It located the friction, which was an account demanded before any trust existed rather than the delivery charge the owner blamed. And it separated two benefits that arrive together: fewer steps, so more orders finish, and less sensitive data held, so a bad day costs less. That pair is the balance between security and friction, priced."
};

ACT.payQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Friction, and who holds what",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose. Any shop described is hypothetical.",
  objective: "4.5",
  questions: [
    {
      q: "A shop adds two more fields and one more page to its checkout so it can learn more about its buyers. Judging by the chapter&rsquo;s account of abandonment, what should it expect?",
      opts: [
        "More carts abandoned, since a lengthy checkout is one listed reason shoppers quit",
        "No change, because a shopper who reaches the checkout has already decided to buy",
        "Fewer abandoned carts, because the added detail makes the shop look more established",
        "A fall in fraud losses that comfortably outweighs anything lost at the checkout"
      ],
      a: 0,
      why: [
        "Correct. The chapter names lengthy checkout procedures beside security concerns, impatience and comparison shopping as reasons more than half of carts are abandoned.",
        "Reaching a checkout is an intention rather than a commitment. The chapter&rsquo;s point about abandonment is precisely that shoppers leave after they have started, which is how the figure passes half.",
        "Looking established does help, but it comes from clear policies and a recognisable way to pay rather than from the number of questions asked before the money moves.",
        "Screening for fraud does draw on data collected at checkout, and that trade is real enough to be worth its own section later. It does not change what extra fields do to finished orders."
      ]
    },
    {
      q: "A shopper pays a small online seller through a payment service. Which description matches what the seller ends up holding?",
      opts: [
        "The card number and the address, both encrypted by the payment service beforehand",
        "The order and the delivery details, but not the card number the shopper used",
        "Nothing about the buyer at all, since the service handles the whole relationship",
        "A copy of everything the service holds, kept in case the service is unavailable"
      ],
      a: 1,
      why: [
        "The service does not pass the card number along in any form. The design is that the sensitive information stops there rather than travelling onward in a protected wrapper.",
        "Correct. The shopper gives the payment information only to the service, which keeps it along with details such as the email address and purchase history, and does not share it with the merchant.",
        "The seller still needs a name and an address to post the parcel, so it is not blind to the buyer. What it gives up is the payment detail, not the customer.",
        "No such copy is made. Duplicating the service&rsquo;s records would recreate exactly the store of card data that using the service was meant to remove."
      ]
    },
    {
      q: "Tapping a phone to pay for a coffee, and splitting a restaurant bill with friends in an app, share something with paying an online shop through a payment service. What is it?",
      opts: [
        "The payment credentials stay with the service; the other party gets only a transfer",
        "The money moves without any company keeping a record of who paid whom",
        "The transfer costs nothing, because no card network is involved at any point in it",
        "Both parties must hold accounts at the same bank before the payment can clear"
      ],
      a: 0,
      why: [
        "Correct. In each case the payment details sit with the service, and the shop, the coffee counter or the friend receives money and a confirmation rather than the details behind it.",
        "Records certainly are kept. The service knows the parties, the amount and the time, which is part of how a dispute can be settled later; what changes is who holds them.",
        "Fees vary and are often invisible to the payer, but they are not absent. Payment services charge for what they do, which is a cost any shop adopting one has to weigh.",
        "Peer-to-peer services are built to work across different banks and cards, which is what makes splitting a bill practical when nobody at the table banks in the same place."
      ]
    }
  ]
};

ACT.payReady = {
  kind: "selfcheck",
  label: "Ready?",
  title: "Could you make this call yourself?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer to the exact part of this section to reread.",
  objective: "4.5",
  items: [
    {t: "I can say roughly how many online carts are abandoned and name the four reasons the chapter gives for it.", hint: "Go back to the part on the moment the sale is lost, where the four reasons are listed one by one."},
    {t: "I can state the balance a seller has to strike, and explain why it is a revenue decision as well as a security one.", hint: "Go back to the balance paragraph in the part on the moment the sale is lost, and to the takeaway that follows it."},
    {t: "I can describe what a payment service is and say exactly what the merchant stops holding once one is in place.", hint: "Go back to the part on handing the sensitive part to somebody else, and to the fourth step of the sequence."},
    {t: "I can walk through a checkout paid by a payment service and say what each step removes from the seller&rsquo;s exposure.", hint: "Go back to the six-step sequence, which you can reorder as many times as you like."},
    {t: "I can read a checkout funnel and find where shoppers are actually leaving rather than where I assume they are.", hint: "Go back to the mini case, especially its first decision and the exhibit that decision turns on."}
  ]
};
