#!/usr/bin/env python3
"""Build the homework case studies from one template.

Every paper is the signature assignment's shape — scenario, a chosen comparison
company, four tasks, two deliverables — so they are generated rather than written
out once each. Anything that differs between them is data in CASES below; anything that
is the same is in the template, which is the only way they stay in step.
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = pathlib.Path(__file__).parent
CSS = (SRC / "page.css.html").read_text()
SCRIPT = (SRC / "case-script.js").read_text()

FORCES = [
    ("f1", "Rivalry among existing competitors"),
    ("f2", "Threat of new entrants"),
    ("f3", "Bargaining power of buyers"),
    ("f4", "Bargaining power of suppliers"),
    ("f5", "Threat of substitutes"),
]

CASES = [
    dict(
        slug="homework-06-data-and-business-intelligence-case",
        storage="mis-homework-06-case-v2",
        title="Homework &mdash; Data and Business Intelligence: a framework analysis",
        description=(
            "A framework analysis case study: apply Porter's five forces and the value chain to an "
            "invented pet retailer whose problem is its data, recommend one IT initiative, and write a "
            "150-200 word comparison against a real retail or e-commerce company."),
        heroTitle="Data and Business Intelligence",
        heroLead=(
            "One firm, the two frameworks, one recommendation. You apply Porter&rsquo;s five competitive "
            "forces and the value chain to a retailer whose trouble is not its shops or its staff but its "
            "data, then recommend a single information system and defend it in writing against a real "
            "company you have gone and read about."),
        firm="Ashgrove Pet Company",
        firmShort="Ashgrove",
        exportTitle="Homework — Data and Business Intelligence: a framework analysis",
        exportSlug="homework-06-case",
        scenarioHeading="A retailer that is not short of data, and can act on almost none of it",
        scenario=[
            "You have been hired as an analyst at Ashgrove Pet Company, a mid-sized regional retailer "
            "selling pet food, supplies, small animals and live aquatics. Ashgrove runs "
            "<b>17 stores and one webshop</b> and has relied on in-store sales for more than a decade. "
            "Over the last three years it has lost share steadily.",
            "Leadership is uneasy, and for an unusual reason. Ashgrove is not short of data. Every till, "
            "every webshop order and every delivery leaves a record. The trouble is that almost none of "
            "it can be used to decide anything, and the executive team wants to understand <b>how "
            "information systems could strengthen Ashgrove&rsquo;s competitive position and support its "
            "long-term strategy</b> before it spends anything.",
        ],
        facts=[
            "<b>Five regional chains and about forty independents</b> sell the same ranges in the same "
            "area, and two national grocery chains enlarged their pet aisles last year. Prices sit "
            "within a few percent of each other and <b>nobody is discounting heavily</b>.",
            "<b>Renting storefront software is now most of what it takes to begin selling pet food "
            "online</b>, though stock and delivery still have to be built. Two subscription sellers "
            "launched in the region this year and between them have taken about <b>3 percent</b> of "
            "Ashgrove&rsquo;s food volume.",
            "No single shopper is more than <b>half a percent</b> of revenue and none of them "
            "negotiates. But <b>switching costs a shopper nothing at all</b>: about <b>a fifth</b> of "
            "last year&rsquo;s food customers did not come back, and of those who answered the "
            "follow-up email most named price and delivery convenience.",
            "<b>One manufacturer holds the licence</b> for the prescription diets two of "
            "Ashgrove&rsquo;s veterinary partnerships require. It raised prices <b>9 percent</b> in "
            "March and imposed a minimum order, and no other product is accepted as equivalent. The "
            "prescription range is <b>4 percent</b> of revenue.",
            "<b>Home-prepared and raw feeding meets the same need a different way.</b> About "
            "<b>12 percent</b> of pet owners in the region now feed a home-prepared diet, up from "
            "7 percent three years ago, and they buy from butchers and supermarkets rather than from "
            "any pet retailer.",
            "<b>Live aquatics and small animals cannot be shipped</b>, and no subscription seller "
            "offers them. That range is <b>11 percent</b> of revenue and the only part of the business "
            "growing.",
            "<b>Ashgrove has never been the cheapest.</b> It wins on having the right item actually in "
            "stock and on advice from staff who know the animals.",
            "Two years ago Ashgrove bought a four-store competitor, and <b>both product catalogs were "
            "loaded into the ordering system without reconciling their identifiers</b>. Of 19,000 "
            "product records, about <b>3,100 describe an item that already had a record</b>.",
            "<b>Returns and exchanges are recorded in a spreadsheet on one store manager&rsquo;s "
            "machine.</b> Nothing writes them back to the ordering system, and the other sixteen stores "
            "cannot open the file.",
            "<b>Marketing counts a shopper as a customer from the first email signup; finance counts one "
            "from the first paid order.</b> The two monthly reports of active customers differ by about "
            "<b>600</b>, and both are circulated.",
            "The monthly store report takes <b>nine working days</b> to produce. The management meeting "
            "is on the <b>fifth</b> working day, so managers discuss the month before last.",
            "Each store counts its own stock. <b>Head office sees those counts once a week</b>, on "
            "Monday morning, so a buying decision can rest on a figure six days old.",
            "The webshop&rsquo;s clickstream, its product reviews and the suppliers&rsquo; delivery "
            "notes all arrive in <b>different shapes</b> &mdash; newer records carry fields the older "
            "ones do not &mdash; and every bit of it is <b>discarded after 30 days</b>, because nothing "
            "in the firm can store it.",
        ],
        exhibitCaption="Exhibit &mdash; Ashgrove&rsquo;s $38.4 million of cost, by value chain activity",
        exhibit=[
            ("Inbound logistics", 640000, "$214,000",
             "Deliveries booked against the wrong record, because two identifiers describe one item"),
            ("Operations", 26400000, "&mdash;",
             "Store staff, shelf work and animal care. Nothing here is avoidable by fixing a record"),
            ("Outbound logistics", 1180000, "$386,000",
             "Webshop orders re-picked and re-shipped after the wrong item goes out under a duplicate identifier"),
            ("Sales and marketing", 2140000, "$612,000",
             "Campaigns targeted from two customer lists that disagree by about 600 names"),
            ("Service", 890000, "$298,000",
             "Investigating orders a customer says they never placed, and chasing credits for returns held in one store\u2019s spreadsheet"),
            ("Procurement <span style=\"color:var(--muted)\">(support)</span>", 1730000, "$270,000",
             "Buying decided from a stock count that can be six days old, and stock written off after expiring unnoticed at a store"),
            ("Technology development <span style=\"color:var(--muted)\">(support)</span>", 420000, "&mdash;",
             "Keeping the tills, the webshop and the ordering system running"),
            ("Human resources <span style=\"color:var(--muted)\">(support)</span>", 1800000, "&mdash;",
             "Recruiting, training and scheduling store and animal-care staff"),
            ("Administration <span style=\"color:var(--muted)\">(support)</span>", 3200000, "$142,000",
             "The monthly store report rebuilt by hand, because two systems disagree on who is a customer"),
        ],
        systemWords=[
            ("master data management", r"\bmaster data\b|\bMDM\b"),
            ("a relational database", r"\brelational database\b|\bRDBMS\b|\brelational database management system\b"),
            ("a data warehouse", r"\bwarehouse\b"),
            ("a data mart", r"\bdata mart\b|\bmart\b"),
            ("a data lake", r"\blake\b"),
            ("a document data store", r"\bdocument (data )?store\b|\bNoSQL\b|\bnon-relational\b"),
            ("an operational database", r"\boperational database\b|\bOLTP\b|\btransaction processing\b"),
            ("an ETL process", r"\bETL\b|\bextraction, transformation\b"),
            ("a data dictionary", r"\bdata dictionary\b|\bmetadata repository\b"),
            ("a reporting system", r"\bexception report\b|\bkey-indicator\b|\bdrill-down\b|\bdashboard\b"),
        ],
        chapterHeading="Name the failure, and settle what a generic answer leaves open",
        chapterIntro=(
            "A recommendation can name a system and still not show that you have read the chapter. This "
            "task is where you show it. Answer <b>all four</b>."),
        chapterParts=[
            "Which of the chapter&rsquo;s <b>three</b> failures your initiative actually fixes &mdash; a "
            "<b>data silo</b>, <b>data duplication</b>, or <b>conflicting definitions</b>. Name the one, "
            "and say which of the other two it leaves untouched.",
            "<b>Which record becomes the authoritative one</b>, the <b>role</b> inside Ashgrove that "
            "owns it, and what happens when two departments disagree about what a word means. The "
            "reading is explicit that neither department&rsquo;s meaning has to disappear &mdash; say "
            "what you would do instead of deleting one.",
            "<b>Why an operational fix rather than copying everything into one analytical store.</b> Say "
            "what copying would settle and what it would not.",
            "<b>How a corrected identifier actually reaches</b> goods receipt and the webshop. A record "
            "put right in one place and nowhere else is the problem you started with.",
        ],
        chapterPlaceholder=(
            "1. The failure is … It leaves … untouched.\n\n2. The authoritative record is … owned by "
            "…\n   When the two definitions conflict I would …\n\n3. An operational fix because … "
            "Copying would settle … but not …\n\n4. The corrected identifier reaches receipt and the "
            "webshop by …"),
        readingLinks=[
            ("../module-06-managing-data-and-business-intelligence.html",
             "Module 6 &mdash; Managing Data and Business Intelligence",
             "where the silo, the duplicate and the conflicting definition are told apart, where master "
             "data management and its ownership question are set out, and where warehouses, marts, "
             "document stores and lakes are chosen by the work they have to do."),
            ("../module-03-information-systems-infrastructure.html",
             "Module 3 &mdash; Information Systems Infrastructure",
             "the cloud service models, if you want to say more in Task 3 than built here or bought as a "
             "service. Not required."),
        ],
        revenue="Ashgrove turned over $43 million last year on costs of $38.4 million.",
        footerNote="Ashgrove Pet Company is a hypothetical practice scenario.",
        t3bHint=("Four parts, on the three failures this chapter tells apart. This is the part a "
                 "generic answer cannot fake."),
    ),
    dict(
        slug="homework-07-decision-making-and-analytics-case",
        storage="mis-homework-07-case-v2",
        title="Homework &mdash; Decision Making and Analytics: a framework analysis",
        description=(
            "A framework analysis case study: apply Porter's five forces and the value chain to an "
            "invented cycle retailer that cannot answer its own questions, recommend one IT initiative, "
            "and write a 150-200 word comparison against a real retail or e-commerce company."),
        heroTitle="Decision Making and Analytics",
        heroLead=(
            "One firm, the two frameworks, one recommendation. You apply Porter&rsquo;s five competitive "
            "forces and the value chain to a retailer holding four years of records it has asked almost "
            "nothing, then recommend a single information system and defend it in writing against a real "
            "company you have gone and read about."),
        firm="Corwin Cycle Company",
        firmShort="Corwin",
        exportTitle="Homework — Decision Making and Analytics: a framework analysis",
        exportSlug="homework-07-case",
        scenarioHeading="A retailer holding four years of records it has asked almost nothing",
        scenario=[
            "You have been hired as an analyst at Corwin Cycle Company, a mid-sized regional retailer "
            "selling bicycles, e-bikes, parts and servicing. Corwin runs <b>14 stores, each with a "
            "workshop</b>, and one webshop. Over the last three years it has lost share steadily.",
            "Leadership is uneasy, and for an unusual reason. Corwin holds four years of sales, service "
            "and webshop records, and has asked them <b>almost nothing</b>: one margin spreadsheet "
            "opened once a quarter, and one prediction pilot that failed. Before it spends anything, the "
            "executive team wants to understand <b>how information systems could strengthen "
            "Corwin&rsquo;s competitive position and support its long-term strategy</b>.",
        ],
        facts=[
            "<b>Five regional chains and about thirty independents</b> sell the same ranges in the same "
            "area, and <b>two direct-to-consumer brands</b> now ship an assembled e-bike with a "
            "two-year home-service contract. Prices sit within a few percent and nobody is discounting "
            "heavily; between them the two direct sellers have taken about <b>6 percent</b> of "
            "Corwin&rsquo;s e-bike volume this year.",
            "<b>Renting a webshop and drop-shipping parts costs almost nothing.</b> Four parts-only "
            "sellers started in the region this year and none of them holds any stock. Parts are "
            "<b>21 percent</b> of Corwin&rsquo;s revenue.",
            "No single customer is more than <b>half a percent</b> of revenue and none of them "
            "negotiates. But <b>a shopper can compare every price in the region from a phone</b>, and "
            "<b>14 percent</b> of the ninety daily enquiries are answered after the customer has "
            "already bought elsewhere.",
            "<b>One manufacturer is the only supplier certified</b> for the battery packs in "
            "Corwin&rsquo;s own-brand e-bikes, which are <b>34 percent of revenue and the "
            "highest-margin line in the business</b>. It raised prices <b>9 percent</b> and now requires "
            "orders a quarter ahead; moving to a different pack would mean recertifying the frame, which "
            "takes about a year and has been quoted at more than the range earns in one.",
            "<b>A bike-share scheme</b> in the two largest towns passed <b>9,000 memberships</b> against "
            "roughly 240,000 adults in those towns, and it meets the same need without anybody owning a "
            "bicycle at all.",
            "<b>Servicing cannot be bought that way.</b> Workshop revenue is <b>19 percent</b> of the "
            "total and the only line that is growing.",
            "<b>Corwin has never been the cheapest.</b> It wins on having a bike ready to ride the day "
            "it was promised, and on a workshop that will still see that bike three years later.",
            "The monthly pack is <b>one revenue figure per store</b>. When a figure moves, no manager "
            "can open it up to see which range, which region or which month is behind it.",
            "The buying team has <b>one spreadsheet model</b> of margin. It is opened once a quarter, "
            "one number is changed, the answer is written down, and it is closed again.",
            "<b>40,000 workshop notes a year</b> are written as free text by the mechanic who did the "
            "job. <b>Nobody has ever labelled one</b>, and nothing reads them.",
            "&ldquo;Have you a medium gravel bike near the Ashford store on Saturday&rdquo; arrives "
            "about <b>90 times a day</b>. Writing a reply takes a coordinator about <b>eight minutes</b>, "
            "but the average enquiry <b>waits 41 minutes</b> before anyone reaches it.",
            "<b>Nobody can say which customers are drifting away.</b> The one attempt reported "
            "<b>97 percent accuracy</b> and then failed in use: it had been <b>trained and tested on the "
            "same records</b>, and no accuracy threshold had been agreed before the result arrived.",
            "Two stores opened in the last three years. <b>Both were sited on the cheapest available "
            "lease</b>, and neither decision used a map of anything but rent.",
            "The <b>three longest-serving workshop managers</b>, who between them settle most "
            "repair-or-replace calls, <b>retire within eighteen months</b>. None of their reasoning is "
            "written down anywhere.",
        ],
        exhibitCaption="Exhibit &mdash; Corwin&rsquo;s $50.0 million of cost, by value chain activity",
        exhibit=[
            ("Inbound logistics", 1340000, "&mdash;",
             "Receiving parts and assembling bikes at the stores"),
            ("Operations", 28900000, "&mdash;",
             "Selling, fitting and servicing bikes. Nothing here is avoidable by answering a question better"),
            ("Outbound logistics", 2060000, "$707,000",
             "Stock sitting at a store where nobody wants it while another turns a customer away, plus the extra delivery mileage out of two stores sited on lease cost alone"),
            ("Sales and marketing", 4180000, "$340,000",
             "Ninety enquiries a day written by hand, and the margin lost on the 14 percent answered after the customer had bought elsewhere"),
            ("Service", 3220000, "$214,000",
             "Repair-or-replace settled differently in every store, and the rework when a call is reversed"),
            ("Procurement <span style=\"color:var(--muted)\">(support)</span>", 1910000, "$126,000",
             "Parts and battery packs committed a quarter ahead against a forecast nobody has ever tested"),
            ("Technology development <span style=\"color:var(--muted)\">(support)</span>", 740000, "$172,000",
             "The prediction pilot that reported 97 percent and was rebuilt twice"),
            ("Human resources <span style=\"color:var(--muted)\">(support)</span>", 2600000, "$158,000",
             "Training repeated from scratch, because the repair-or-replace judgement the workshops run on has never been written down"),
            ("Administration <span style=\"color:var(--muted)\">(support)</span>", 5050000, "&mdash;",
             "Finance, payroll and property"),
        ],
        systemWords=[
            ("an OLAP cube", r"\bcube\b|\bOLAP\b|\bdrill down\b|\broll up\b"),
            ("a digital dashboard", r"\bdashboard\b"),
            ("a decision support system", r"\bdecision support\b|\bDSS\b|\bwhat-if\b|\bgoal seek"),
            ("clustering", r"\bcluster"),
            ("anomaly detection", r"\banomal"),
            ("association discovery", r"\bassociation\b|\bmarket basket\b"),
            ("a supervised model", r"\bsupervised\b|\bclassif|\bmachine learning\b|\bpredictive model\b"),
            ("a generative AI assistant", r"\bgenerative\b|\blarge language model\b|\bLLM\b|\bretrieval-augmented\b|\bRAG\b"),
            ("a generative AI agent", r"\bagent\b"),
            ("a geographic information system", r"\bgeographic information\b|\bGIS\b|\bmap layer\b|\btrade area\b"),
            ("knowledge management", r"\bknowledge management\b|\bknowledge base\b|\btacit\b|\bexplicit knowledge\b"),
        ],
        chapterHeading="Name the method, and settle what a generic answer leaves open",
        chapterIntro=(
            "A recommendation can name a tool and still not show that you have read the chapter. Name "
            "the method, then answer <b>the set that belongs to it</b> &mdash; one set, not all four."),
        chapterParts=[
            "<b>A decision support model:</b> the <b>one input you can actually control</b>, the "
            "<b>constraint</b> you are working inside, and <b>one what-if question</b> you would put to "
            "it in words a buyer would use.",
            "<b>A predictive model:</b> what <b>one row</b> represents, what the <b>label</b> is, how "
            "you <b>hold data back</b> to test it, and the <b>threshold</b> you fix before you have seen "
            "any result. The scenario says what happens when that last step is skipped.",
            "<b>A generative assistant:</b> which <b>live source</b> answers the question, what it does "
            "<b>when it does not know</b>, and <b>who it escalates to</b>.",
            "<b>Knowledge management:</b> <b>whose</b> judgement you are capturing, whether it is "
            "<b>tacit or explicit</b>, and how anyone checks a year later that it is <b>still right</b>.",
        ],
        chapterPlaceholder=(
            "The method is …\n\nThe set that belongs to it:\n1. …\n2. …\n3. …\n4. …"),
        readingLinks=[
            ("../games/decision-engine.html",
             "Decision Engine &mdash; the Chapter 7 learning game",
             "eight quarters running an invented distributor&rsquo;s analytics programme: the four "
             "analytics questions, a real cube, a dashboard and a working what-if model, unlabelled "
             "data, an honestly tested model, generative AI and its governance, an agent and where the "
             "human stands in it, and a depot sited from map layers."),
            ("../module-03-information-systems-infrastructure.html",
             "Module 3 &mdash; Information Systems Infrastructure",
             "the cloud service models, if you want to say more in Task 3 than built here or bought as a "
             "service. Not required."),
        ],
        revenue="Corwin turned over $56 million last year on costs of $50 million.",
        footerNote="Corwin Cycle Company is a hypothetical practice scenario.",
        t3bHint=("One set of four, belonging to the method you named. This is the part a generic "
                 "answer cannot fake."),
    ),
    dict(
        slug="homework-08-enterprise-systems-case",
        storage="mis-homework-08-case-v1",
        title="Homework &mdash; Enterprise Systems: a framework analysis",
        description=(
            "A framework analysis case study: apply Porter's five forces and the value chain to an "
            "invented home furnishings retailer whose four applications each hold a different version "
            "of the same order, recommend one enterprise-systems initiative, and write a 150-200 word "
            "comparison against a real retail or e-commerce company."),
        heroTitle="Enterprise Systems",
        heroLead=(
            "One firm, the two frameworks, one recommendation. You apply Porter&rsquo;s five competitive "
            "forces and the value chain to a retailer whose four applications each hold a different "
            "version of the same order, then recommend a single information system and defend it in "
            "writing against a real company you have gone and read about."),
        firm="Marchmont Home Company",
        firmShort="Marchmont",
        exportTitle="Homework — Enterprise Systems: a framework analysis",
        exportSlug="homework-08-case",
        scenarioHeading="A retailer whose four applications each hold a different version of the same order",
        scenario=[
            "You have been hired as an analyst at Marchmont Home Company, a mid-sized regional retailer "
            "selling furniture, floor coverings and lighting, and upholstering its own seating in a "
            "workshop behind its largest branch. Marchmont runs <b>11 showrooms and one webshop</b>, and "
            "sells to hotels and care homes through a contract desk. Over the last three years it has "
            "lost share steadily.",
            "Leadership is uneasy, and for an unusual reason. Nothing at Marchmont goes unrecorded: "
            "every order, every purchase and every payment is written down. It is written down "
            "<b>four times, in four applications that cannot read each other</b>, and the four do not "
            "agree. Before it spends anything, the executive team wants to understand <b>how "
            "information systems could strengthen Marchmont&rsquo;s competitive position and support its "
            "long-term strategy</b>.",
        ],
        facts=[
            "<b>Two national furniture chains</b> opened large stores in the region&rsquo;s three "
            "biggest towns, and a <b>direct-to-consumer upholstery brand</b> now ships a made-to-order "
            "sofa in four weeks. Marchmont&rsquo;s share of regional furnishing spend fell from "
            "<b>14 percent to 10 percent</b> in three years, and last year it <b>matched a "
            "competitor&rsquo;s advertised price on 31 percent</b> of showroom orders, at an average "
            "cost of <b>6 percentage points of margin</b> on those orders.",
            "<b>Setting up a furniture webshop and drop-shipping from a wholesaler costs almost "
            "nothing</b>, and six online-only sellers appeared in the region this year. None of them "
            "upholsters anything, carries anything into a room, or takes the old piece away, so they "
            "reach only the <b>flat-packed accessories, which are 12 percent</b> of Marchmont&rsquo;s "
            "revenue.",
            "No household is more than a fraction of a percent of revenue, and a shopper can "
            "<b>compare the same range across three sellers from a phone</b> without leaving the "
            "showroom. The <b>contract desk</b> &mdash; hotels and care homes &mdash; is "
            "<b>17 percent</b> of revenue across <b>eleven accounts</b>, the largest of them "
            "<b>3 percent</b>, and each of them retenders every two years.",
            "<b>Two frame mills supply about 70 percent</b> of the frames the workshop upholsters, and "
            "one of them raised prices <b>7 percent</b> in the spring. A third mill is certified to the "
            "same specification and holds stock; moving a range across to it takes about <b>a "
            "quarter</b>.",
            "<b>Furniture rental and restored second-hand pieces meet the same need without anybody "
            "buying new furniture at all.</b> Rental subscriptions in the trading area passed "
            "<b>6,400 households</b> against roughly 310,000, up from 1,900 three years ago, and the "
            "two largest restoration marketplaces between them list more upholstered seating in the "
            "region than Marchmont has on all eleven floors.",
            "<b>Fitting, carrying a piece into the room and taking the old one away cannot be shipped "
            "in a carton.</b> That work is <b>16 percent</b> of revenue and the only line that is "
            "growing.",
            "<b>Marchmont has never been the cheapest.</b> It wins on a sofa built in its own workshop "
            "in the customer&rsquo;s own fabric, and on a delivery carried in, assembled and set up on "
            "the day it was promised.",
            "Showroom orders, the workshop schedule, purchasing and the ledger run on <b>four "
            "standalone applications</b>. Two of the four hold an on-hand figure, and the two figures "
            "disagree.",
            "Last quarter Marchmont <b>promised stock it did not have on 214 of 3,600 orders</b>, at "
            "about <b>$390 each</b> in expedited freight, credits and a second delivery run.",
            "A sales order is <b>keyed three times</b> &mdash; once into the workshop schedule, once "
            "into purchasing, once into the ledger. About <b>3 lines in every 100</b> differ between at "
            "least two of the three.",
            "The ordering system was <b>written to order eleven years ago</b>. The supplier&rsquo;s "
            "last two releases were skipped, because every one of those changes would have had to be "
            "written again.",
            "<b>Month end takes eleven working days</b>, because finance and the workshop cannot settle "
            "what has actually shipped until somebody walks the workshop floor with a clipboard.",
            "A supplier invoice is matched by hand against a paper goods receipt. <b>9 percent are paid "
            "late</b> and <b>1.4 percent are paid twice</b>.",
            "Payroll and rostering run on a <b>fifth application</b> a branch manager bought four years "
            "ago. Its list of employees and the ledger&rsquo;s differ by <b>23 names</b>.",
            "The board has approved <b>$240,000 for year one</b> and will fund <b>one</b> initiative. "
            "Three quotes sit on the table at <b>$86,000</b>, <b>$148,000</b> and <b>$305,000</b> for "
            "year one, and <b>none of the three carries a line for training</b>. The last system change "
            "budgeted nothing for training either, and the showrooms took <b>five months</b> to get "
            "back to the order rate they had before it.",
        ],
        exhibitCaption="Exhibit &mdash; Marchmont&rsquo;s $62.0 million of cost, by value chain activity",
        exhibit=[
            ("Inbound logistics", 2240000, "$318,000",
             "Frames and floor coverings received against a purchase order the workshop schedule cannot see, so every receipt is keyed a second time and matched by hand"),
            ("Operations", 33600000, "&mdash;",
             "Showroom staff, the upholstery workshop and the delivery crews. Nothing here is avoidable by making four applications agree"),
            ("Outbound logistics", 4120000, "$896,000",
             "Deliveries rebooked, reloaded and run a second time after an order was promised against stock that was not there"),
            ("Sales and marketing", 5480000, "$402,000",
             "Quotations rebuilt by hand from three screens, and the margin given away matching an advertised price on an order nobody could confirm"),
            ("Service", 2960000, "$274,000",
             "Establishing what was actually delivered, because the showroom, the workshop and the ledger each hold a different version of the order"),
            ("Procurement <span style=\"color:var(--muted)\">(support)</span>", 2310000, "$246,000",
             "Buying decided from whichever on-hand figure the buyer happened to open, and invoices matched by hand against paper receipts"),
            ("Technology development <span style=\"color:var(--muted)\">(support)</span>", 1180000, "$358,000",
             "Keeping eleven years of written-to-order changes alive, and the two releases that were skipped rather than written again"),
            ("Human resources <span style=\"color:var(--muted)\">(support)</span>", 4060000, "$187,000",
             "Rostering and payroll run from a fifth application whose list of employees the ledger has never seen"),
            ("Administration <span style=\"color:var(--muted)\">(support)</span>", 6050000, "$521,000",
             "Month end rebuilt by hand over eleven working days, because no two applications agree on what has shipped"),
        ],
        systemWords=[
            ("an enterprise system", r"\benterprise (resource planning|system|systems)\b|\bERP\b"),
            ("an ERP core component", r"\bcore component\b|\bfinancial management\b|\boperations management\b|\bhuman resource management\b"),
            ("an ERP extended component", r"\bextended component\b"),
            ("supply chain management", r"\bsupply chain management\b|\bSCM\b"),
            ("customer relationship management", r"\bcustomer relationship management\b|\bCRM\b"),
            ("a module", r"\bmodule\b"),
            ("configuration", r"\bconfigur"),
            ("customization", r"\bcustomi[sz]"),
            ("a vanilla installation", r"\bvanilla\b"),
            ("a best-of-breed selection", r"\bbest.of.breed\b"),
            ("replacing a standalone application", r"\bstand.?alone\b|\blegacy (application|system)\b"),
            ("an internally focused system", r"\binternally focused\b"),
            ("an externally focused system", r"\bexternally focused\b"),
        ],
        chapterHeading="Name the process that fails, and price the whole thing",
        chapterIntro=(
            "A recommendation can name a system and still not show that you have read the chapter. This "
            "task is where you show it, and it is the ladder a manager actually walks down before "
            "approving anything. Answer <b>all four</b>."),
        chapterParts=[
            "<b>State the problem as a process failure rather than a purchase.</b> Name the process "
            "&mdash; <b>order-to-cash</b> or <b>procure-to-pay</b> &mdash; then say what goes wrong, to "
            "whom, how often, and what it costs, using a figure from the brief somebody could go and "
            "count. &ldquo;We need a new system&rdquo; is not a problem; it is a purchase.",
            "<b>Walk down the ladder of precision.</b> The <b>class</b> of system; then whether you are "
            "switching on an <b>ERP core component or an extended component</b>, and which one; then "
            "the <b>module</b> you would turn on first. Say whether the work is <b>configuration or "
            "customization</b>, and what the difference costs Marchmont the next time a release "
            "arrives. The brief says what happened to the last two.",
            "<b>Price the whole thing, not the licence.</b> Name the year-one lines: licence or "
            "subscription, <b>configuration labour</b>, <b>integration</b> with whatever you are not "
            "replacing, <b>training and change management</b>, and the <b>recurring</b> cost of the "
            "years after this one. Then say which of the three quotes on the table your recommendation "
            "fits inside, and show the arithmetic that rules any of them out.",
            "<b>Say what would make it fail, and what evidence you will accept.</b> There is usually a "
            "sharp drop in productivity in the weeks straight after go-live, while experienced people "
            "work slowly in an unfamiliar system &mdash; say what you would tell the board about that "
            "<b>in advance</b>, which figure from the brief you would watch instead, and when you would "
            "look at it.",
        ],
        chapterPlaceholder=(
            "1. The process that fails is … It goes wrong to … about … times, and it costs …\n\n"
            "2. The class is … The component is … The module is … The work is configuration/"
            "customization because …\n\n3. Year one: licence …, configuration …, integration …, "
            "training …, recurring … That fits inside the … quote because …\n\n4. It would fail if … "
            "I would tell the board … I would watch … on …"),
        readingLinks=[
            ("../module-08-enterprise-information-systems.html",
             "Module 8 &mdash; Enterprise Information Systems",
             "where order-to-cash and procure-to-pay are followed end to end, where the cost of "
             "standalone applications is set out, and where the ladder from enterprise system to core "
             "or extended component to module to configuration is the thing a manager actually "
             "approves &mdash; including the cost lines nobody quotes and the first month after "
             "go-live."),
            ("../games/rocks-in-the-river.html",
             "Rocks in the River &mdash; the Chapter 8 game",
             "seven rounds running an invented refrigeration maker&rsquo;s business systems programme, "
             "starting with the difference between what is on hand and what can actually be promised "
             "&mdash; which is this case&rsquo;s whole problem in one screen."),
        ],
        revenue="Marchmont turned over $69 million last year on costs of $62 million.",
        footerNote="Marchmont Home Company is a hypothetical practice scenario.",
        t3bHint=("Four parts, from the problem statement down to what you would tell the board about "
                 "the first month. This is the part a generic answer cannot fake."),
    ),
    dict(
        slug="homework-09-supply-chains-and-customer-relationships-case",
        storage="mis-homework-09-case-v1",
        title="Homework &mdash; Supply Chains and Customer Relationships: a framework analysis",
        description=(
            "A framework analysis case study: apply Porter's five forces and the value chain to an "
            "invented workplace supplies distributor whose problems all sit on its two boundaries, "
            "recommend one enterprise-systems initiative, and write a 150-200 word comparison against "
            "a real retail or e-commerce company."),
        heroTitle="Supply Chains and Customer Relationships",
        heroLead=(
            "One firm, the two frameworks, one recommendation. You apply Porter&rsquo;s five competitive "
            "forces and the value chain to a distributor whose troubles all sit on the two boundaries it "
            "does not control, then recommend a single information system and defend it in writing "
            "against a real company you have gone and read about."),
        firm="Pentworth Workplace Company",
        firmShort="Pentworth",
        exportTitle="Homework — Supply Chains and Customer Relationships: a framework analysis",
        exportSlug="homework-09-case",
        scenarioHeading="A distributor whose troubles all sit on the two boundaries it does not control",
        scenario=[
            "You have been hired as an analyst at Pentworth Workplace Company, a mid-sized regional "
            "distributor of office and workplace supplies &mdash; paper, print consumables, desks and "
            "chairs, catering and cleaning &mdash; selling to businesses through a webshop, a telephone "
            "desk and <b>240 contract accounts</b>, served out of <b>four depots</b>. Over the last "
            "three years it has lost share steadily.",
            "Leadership is uneasy, and for an unusual reason. Almost nothing that hurts Pentworth "
            "happens inside Pentworth. Its trouble sits on its two boundaries: <b>the suppliers above "
            "it, who are shown nothing but its orders, and the customers below it, who exist four times "
            "over in four systems</b>. Before it spends anything, the executive team wants to "
            "understand <b>how information systems could strengthen Pentworth&rsquo;s competitive "
            "position and support its long-term strategy</b>.",
        ],
        facts=[
            "<b>Three regional distributors and two national ones</b> sell much the same catalog in the "
            "same towns. Contract business is won on <b>three-year tenders</b> that fall due at "
            "different times, so only about <b>a third of the market is contestable in any one "
            "year</b>, and list prices sit within a few percent of each other.",
            "<b>A reseller webshop that drop-ships from a wholesaler can be trading inside a "
            "weekend</b>, and five of them appeared in the region this year holding no stock at all. "
            "None of them can deliver next day out of local stock or sign a service level, so they "
            "reach only the <b>single-order online business, which is 14 percent</b> of "
            "Pentworth&rsquo;s revenue.",
            "Contract accounts are <b>61 percent</b> of revenue across 240 accounts, the largest of "
            "them <b>4 percent</b>. Every one of them retenders, and <b>19 of the 240 did not renew "
            "last year</b>. Moving, though, means a customer republishing its own approved catalog and "
            "reapproving every user who buys from it, which takes a purchasing team about a month.",
            "<b>Three manufacturers hold 48 percent</b> of the lines Pentworth stocks, and one of them "
            "raised prices <b>7 percent</b> in the spring. Substitutable equivalents exist for most of "
            "those lines, and two of the four depots already stock them.",
            "<b>The work is being done a different way, and it needs less of what Pentworth sells.</b> "
            "Print volume across its contract accounts fell <b>34 percent in four years</b> as "
            "documents stopped being printed at all; hybrid working left desks empty and took the "
            "catering and cleaning lines down with them; and <b>four of Pentworth&rsquo;s ten largest "
            "accounts</b> moved to a <b>managed print service</b> that buys consumables direct from the "
            "manufacturer and bills by the page.",
            "<b>Next-day delivery out of local stock, and a named person who answers the phone, cannot "
            "be drop-shipped.</b> The service and account-management side of the business is "
            "<b>13 percent</b> of revenue and the only line that is growing.",
            "<b>Pentworth has never been the cheapest.</b> It wins on next-day delivery out of a depot "
            "twenty miles away, and on one named account manager who knows what a customer ordered last "
            "time.",
            "Pentworth sends about <b>1,900 purchase orders a month to 86 suppliers</b> by email and "
            "PDF attachment, and every one of them is keyed in again at the other end. <b>Eleven of "
            "those suppliers have asked for an electronic link</b> and been told there is not one.",
            "A March promotion raised customer demand for one paper line <b>18 percent</b>. The order "
            "Pentworth placed on its wholesaler rose <b>41 percent</b>, and the order that wholesaler "
            "placed on the mill rose <b>86 percent</b>. <b>Forty-two pallets</b> of that paper were "
            "written off four months later.",
            "<b>No supplier is shown anything but Pentworth&rsquo;s orders.</b> Nothing about what "
            "Pentworth expects to sell is shared with any of them, and lead times run from three weeks "
            "on paper to <b>eleven weeks</b> on the imported furniture line.",
            "There is no plan, only a reaction. <b>One buyer purchases from last month&rsquo;s "
            "sales</b> in a spreadsheet, and nothing anywhere in the firm states what it expects to "
            "sell next quarter.",
            "<b>A customer exists four times.</b> The webshop, the contract catalog, the delivery "
            "system and the ledger each hold their own record, and about <b>2,900 of 11,400 business "
            "customers appear in more than one of them</b>. A customer who moves premises has to be "
            "asked to change the address in each.",
            "<b>54 percent of calls to the trade desk are settled on the first contact.</b> The rest "
            "call back an average of <b>2.4 times</b>, and nobody has ever counted what the other "
            "46 percent costs to handle.",
            "<b>Account managers keep their accounts in their own spreadsheets.</b> Two left last year; "
            "their notes left with them, and <b>9 of their 61 accounts</b> did not renew at the next "
            "tender.",
            "<b>Nobody can say which contract account is about to leave</b> until the tender documents "
            "arrive. The firm has never put the question in a form that anything it owns could answer.",
        ],
        exhibitCaption="Exhibit &mdash; Pentworth&rsquo;s $44.0 million of cost, by value chain activity",
        exhibit=[
            ("Inbound logistics", 3180000, "$612,000",
             "Purchase orders keyed in again at the other end, and the freight and the write-off when an order amplified up the chain arrives late and far too large"),
            ("Operations", 21400000, "&mdash;",
             "Picking, packing and running four depots. Nothing here is avoidable by fixing what crosses the firm’s boundary"),
            ("Outbound logistics", 2240000, "$291,000",
             "Second delivery runs to an address that was changed in one system and left alone in the other three"),
            ("Sales and marketing", 3860000, "$348,000",
             "Tender responses rebuilt from an account manager’s own spreadsheet, and campaigns sent twice to a customer who exists twice"),
            ("Service", 1940000, "$233,000",
             "The 46 percent of trade calls that are not settled on the first contact, and everything that follows one"),
            ("Procurement <span style=\"color:var(--muted)\">(support)</span>", 2420000, "$457,000",
             "Buying from last month’s sales, with no plan behind it and no forecast any supplier is allowed to see"),
            ("Technology development <span style=\"color:var(--muted)\">(support)</span>", 860000, "$119,000",
             "Keeping four customer records in step by hand, and the interfaces written again each time a system is added"),
            ("Human resources <span style=\"color:var(--muted)\">(support)</span>", 3100000, "&mdash;",
             "Recruiting, training and scheduling depot and trade-desk staff"),
            ("Administration <span style=\"color:var(--muted)\">(support)</span>", 5000000, "$164,000",
             "Credit notes and reconciliations after a delivery went out against the wrong version of a customer"),
        ],
        systemWords=[
            ("supply chain management", r"\bsupply chain management\b|\bSCM\b"),
            ("customer relationship management", r"\bcustomer relationship management\b|\bCRM\b"),
            ("an ERP extended component", r"\bextended component\b"),
            ("supply chain planning", r"\bsupply chain planning\b|\bdemand plan|\bproduction plan|\bdistribution plan|\bsafety stock\b"),
            ("supply chain execution", r"\bsupply chain execution\b|\bexecution system"),
            ("supply chain visibility", r"\bvisibilit"),
            ("operational CRM", r"\boperational CRM\b|\btouch ?point\b|\bsales force automation\b"),
            ("analytical CRM", r"\banalytical CRM\b|\bcustomer analytic"),
            ("collaborative CRM", r"\bcollaborative CRM\b|\bself-service\b|\bportal\b"),
            ("an electronic data interchange link", r"\bEDI\b|\belectronic data interchange\b|\bXML\b"),
            ("a business-to-business exchange", r"\bB2B\b|\bbusiness-to-business\b|\bexchange\b"),
            ("an enterprise system", r"\benterprise (resource planning|system|systems)\b|\bERP\b"),
            ("a single customer record", r"\bsingle (customer )?record\b|\bone record\b|\bmaster record\b"),
        ],
        chapterHeading="Name the component, and settle what a generic answer leaves open",
        chapterIntro=(
            "A recommendation can name a system and still not show that you have read the chapter. Say "
            "which <b>extended component</b> you are switching on &mdash; supply chain management or "
            "customer relationship management &mdash; and then answer <b>the set that belongs to the "
            "part of it you chose</b>, plus the last item, which applies whichever you named. <b>One "
            "set, not all four.</b>"),
        chapterParts=[
            "<b>Supply chain planning:</b> which plan you are making &mdash; <b>demand</b>, "
            "<b>production or stock</b>, or <b>distribution</b> &mdash; the <b>forecast</b> it starts "
            "from and <b>who outside Pentworth is allowed to see it</b>, and the <b>lead time</b> it "
            "has to respect. The brief says what happens up the chain when a supplier is shown nothing "
            "but orders.",
            "<b>Supply chain execution:</b> which of the <b>three flows</b> &mdash; product, "
            "information, financial &mdash; you are fixing first, <b>what replaces the emailed purchase "
            "order</b> across the firm&rsquo;s boundary, and <b>what a supplier would be able to see "
            "that it cannot see today</b>. Say which of the eighty-six you would start with and why.",
            "<b>Operational CRM:</b> which <b>touch point</b> it serves &mdash; sales, marketing or "
            "support &mdash; <b>which of the four records becomes the one record</b> of a customer and "
            "<b>who inside Pentworth owns it</b>, and <b>what the person on the trade desk does "
            "differently</b> on the morning it goes live.",
            "<b>Analytical CRM:</b> the <b>one question</b> you are putting to the customer data, what "
            "would count as an answer somebody could <b>act on before a tender</b> rather than after "
            "it, and <b>who acts on it</b>. A number nobody is obliged to do anything about is a "
            "report, not a decision.",
            "<b>Whichever you named:</b> say whether that component is <b>internally or externally "
            "focused</b>, and name <b>who outside Pentworth has to agree</b> before it works at all. "
            "This is the item that separates the two halves of the chapter, and the answer is not the "
            "same for both.",
        ],
        chapterPlaceholder=(
            "The component is … and the part of it I am switching on is …\n\nThe set that belongs to "
            "it:\n1. …\n2. …\n3. …\n\nInternally or externally focused: … Who has to agree: …"),
        readingLinks=[
            ("../module-08-enterprise-information-systems.html",
             "Module 8 &mdash; Enterprise Information Systems",
             "where the supply network, the ways data is exchanged across a firm&rsquo;s boundary and "
             "the bullwhip effect are set out; where planning is separated from execution and the three "
             "flows are named; and where CRM is argued as a strategy with operational, analytical and "
             "collaborative parts rather than as a purchase."),
            ("../module-03-information-systems-infrastructure.html",
             "Module 3 &mdash; Information Systems Infrastructure",
             "the cloud service models, if you want to say more in Task 3 than built here or bought as "
             "a service. Not required."),
        ],
        revenue="Pentworth turned over $49 million last year on costs of $44 million.",
        footerNote="Pentworth Workplace Company is a hypothetical practice scenario.",
        t3bHint=("One set, belonging to the component you named, plus the last item. This is the part "
                 "a generic answer cannot fake."),
    ),
]


def money(n):
    return "${:,}".format(n)


def js_regex_list(pairs):
    items = ",\n  ".join(
        '{{label:"{}", re:/{}/i}}'.format(label, pattern) for label, pattern in pairs)
    return "[\n  " + items + "\n]"


def build(case):
    total_cost = sum(row[1] for row in case["exhibit"])
    avoidable_values = [row[2] for row in case["exhibit"] if row[2].startswith("$")]
    total_rework = sum(int(v.replace("$", "").replace(",", "")) for v in avoidable_values)
    avoidable_figures = [v for v in avoidable_values]

    facts = "\n".join(
        "        <li>{}</li>".format(f) for f in case["facts"])
    scenario = "\n".join(
        "      <p>{}</p>".format(p) for p in case["scenario"])
    exhibit_rows = "\n".join(
        '            <tr><td>{}</td><td class="num">{}</td><td class="num">{}</td><td>{}</td></tr>'.format(
            name, money(cost), rework, driver)
        for name, cost, rework, driver in case["exhibit"])
    force_rows = "\n".join(
        '            <tr><td class="num">{n}</td><td>{label}</td>\n'
        '              <td class="pick"><textarea id="{key}" data-key="{key}" rows="3" '
        'aria-label="Rating and evidence for {lower}"></textarea></td></tr>'.format(
            n=i + 1, label=label, key=key, lower=label.lower())
        for i, (key, label) in enumerate(FORCES))
    chapter_parts = "\n".join(
        "          <li>{}</li>".format(part) for part in case["chapterParts"])
    reading = "\n".join(
        '        <li><a href="{}">{}</a> &mdash; {}</li>'.format(href, label, blurb)
        for href, label, blurb in case["readingLinks"])

    script = (SCRIPT
              .replace("__STORAGE_KEY__", case["storage"])
              .replace("__FIRM__", case["firm"])
              .replace("__EXPORT_TITLE__", case["exportTitle"])
              .replace("__EXPORT_SLUG__", case["exportSlug"])
              .replace("__T3B_HINT__", case["t3bHint"])
              .replace("__SYSTEM_WORDS__", js_regex_list(case["systemWords"]))
              .replace("__EXHIBIT_FIGURES__",
                       "[" + ", ".join('"{}"'.format(v) for v in avoidable_figures) + "]"))

    revenue = case["revenue"]
    firm = case["firm"]
    short = case["firmShort"]

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{case['title']}</title>
<meta name="description" content="{case['description']}">
{CSS}</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <span class="eyebrow">Homework &middot; case study</span>
    <h1>{case['heroTitle']}</h1>
    <p>{case['heroLead']}</p>
    <p class="print-only" id="printIdentity">Name: <span class="rule">&nbsp;</span></p>
  </div>
</header>

<div class="toolbar">
  <div class="wrap toolbar-inner">
    <label>Name <input type="text" id="who" autocomplete="name"></label>
    <button type="button" class="btn ghost" id="exportBtn">Export my work</button>
    <button type="button" class="btn ghost" id="printBtn">Print / Save PDF</button>
    <button type="button" class="btn danger" id="clearBtn">Clear my work</button>
    <span class="save-status" id="saveStatus">Saved in this browser as you type.</span>
  </div>
</div>

<main>
  <div class="wrap">

    <section class="card">
      <span class="kicker">Scenario</span>
      <h2>{case['scenarioHeading']}</h2>
      <p><b>{firm} is not a real company.</b> It is invented for this assignment, the way the
        practice examples in the lecture modules are, and every organisation, figure and quotation in it
        is hypothetical.</p>
{scenario}

      <h3 style="margin:18px 0 0;font-size:1rem">What the executives have told you</h3>
      <ul class="facts">
{facts}
      </ul>

      <div class="callout">Nothing here is drawn from a real company. If a detail sounds familiar for
        reasons outside this assignment, that is a coincidence &mdash; analyse this {short} and only this
        one, using the evidence above plus any assumption you are willing to state in writing.</div>
    </section>

    <section class="card">
      <span class="kicker">The figures</span>
      <h2>Where the money goes</h2>
      <p>{revenue} The exhibit splits those costs by value chain activity &mdash; all nine of them
        &mdash; and then splits each activity again into the part that is <b>avoidable</b>: cost the
        firm would not carry at all if the problems listed above were not there. Some of it is work done
        twice, some is capacity spent on something a system would do, and some is margin that walked out
        of the door. The two columns answer different questions.</p>
      <div class="tbl-wrap">
        <table class="tbl">
          <caption>{case['exhibitCaption']}</caption>
          <thead><tr><th>Activity</th><th class="num">Annual cost</th>
              <th class="num">Avoidable inside it</th><th>What makes it avoidable</th></tr></thead>
          <tbody>
{exhibit_rows}
          </tbody>
          <tfoot><tr><td>Total</td><td class="num">{money(total_cost)}</td>
              <td class="num">{money(total_rework)}</td><td></td></tr></tfoot>
        </table>
      </div>
      <div class="callout warn"><b>The two columns answer different questions, and neither answers
        yours on its own.</b> The activity carrying most of the money carries no avoidable cost that
        anyone has identified &mdash; which means the obvious target is the wrong one, not that the
        activity could never be improved. Equally, the largest avoidable figure is not automatically the
        best thing to fund: what it would cost to fix, how much of it you would really recover, and
        whether it defends what this firm competes on all bear on that. Say which of those you are
        weighing.</div>
    </section>

    <section class="card">
      <span class="kicker">Before you start</span>
      <h2>Choose a company to compare against</h2>
      <p>Choose <b>one real retail or e-commerce company</b> to use as a point of comparison with
        {short}. Take a close look at its competitive landscape, what it has done with technology, and
        the difficulties it is working through now. The goal is not admiration; it is to gather enough
        understanding to draw a clear parallel, and then to use that parallel to sharpen your view of
        where information systems would make the greatest strategic difference at {short}.</p>
      <div class="callout warn">Pick a company whose relevant practice is actually <i>documented</i>
        somewhere you can read. A famous company whose inner workings are undescribed gives you a name
        and nothing else, and a lesson that only works at that company&rsquo;s budget or footprint is not
        a lesson that transfers to a regional chain.</div>
    </section>

    <section class="card">
      <span class="kicker">Your tasks</span>
      <h2>Four tasks, one analysis</h2>
      <p>Work them in order. Each depends on the one before it, which is also the order a real analyst is
        obliged to work in: name the pressure before naming the fix, and name the activity before naming
        the system. Everything you type is saved in this browser as you go, and nothing is uploaded,
        submitted or sent anywhere from this page.</p>

      <div class="task">
        <h3>Task 1 &middot; Apply the five competitive forces</h3>
        <p class="stem">Evaluate the competitive pressures facing {short}. One row per force. In each
          row say whether the force is <b>weak, moderate or strong</b>, and give the evidence from the
          scenario &mdash; or a reasonable assumption you state plainly &mdash; that supports that
          rating. Each row has to name something a reader could <b>count, compare or verify</b>: a share
          of revenue, a number of competitors, a switching cost, a price move. &ldquo;A lot of
          competition&rdquo; is not evidence, and it is not a different answer in each of the five
          rows.</p>
        <table class="match grid">
          <thead><tr><th></th><th>The force</th><th>Weak, moderate or strong &mdash; and the evidence</th></tr></thead>
          <tbody>
{force_rows}
          </tbody>
        </table>
      </div>

      <div class="task">
        <h3>Task 1b &middot; Name the single strongest force</h3>
        <p>In two or three sentences, name the <b>one</b> force that puts the most pressure on {short}
          and say why it beats the force you would rank second. Rating all five and naming none leaves
          the decision to your reader, and the decision was the job.</p>
        <textarea id="strongest" data-key="strongest" aria-label="The single strongest force, and why it beats the runner-up" placeholder="The strongest force is … The evidence is … It beats … because …"></textarea>
      </div>

      <div class="task">
        <h3>Task 2 &middot; Use the value chain to find the opportunities</h3>
        <p>Using the value chain, identify <b>at least two internal areas</b> &mdash; primary activities
          or support bands &mdash; where information systems could create an <b>operational or
          customer-focused</b> advantage. They have to be two genuinely different activities, not one
          activity described twice: the second is what shows you scanned the chain instead of stopping at
          your first idea. It may turn out to be the alternative your recommendation was preferred over,
          or the place a single initiative lands a second saving &mdash; both are good answers, and the
          second is the better one when you can show it. For
          <b>each</b> of the two give all three of these:</p>
        <ol class="parts">
          <li>The activity, named in the value chain&rsquo;s own words.</li>
          <li><b>The avoidable figure exactly as the exhibit prints it</b>, so a reader can trace it.
            Describe the driver in your own words &mdash; it is the figure that has to be quoted, not
            the sentence beside it.</li>
          <li>One or two sentences saying what the weakness actually is, and what a system would change
            there.</li>
        </ol>
        <table class="match grid">
          <thead><tr><th></th><th>Area</th><th>The activity, the figure, and the weakness</th></tr></thead>
          <tbody>
            <tr><td class="num">1</td><td>First area</td>
              <td class="pick"><textarea id="a1" data-key="a1" rows="4" aria-label="First value chain area"></textarea></td></tr>
            <tr><td class="num">2</td><td>A genuinely different area</td>
              <td class="pick"><textarea id="a2" data-key="a2" rows="4" aria-label="Second value chain area"></textarea></td></tr>
          </tbody>
        </table>
      </div>

      <div class="task">
        <h3>Task 3 &middot; Recommend exactly one IT initiative</h3>
        <p>Recommend <b>one</b> initiative, drawn from one of the areas you just named, that would
          directly support {short}&rsquo;s strategic goals. Do not list options and let the reader
          choose &mdash; one initiative is a decision, three are a wish list. Cover all <b>six</b> of
          these:</p>
        <ol class="parts">
          <li><b>What it does</b>, concretely enough that somebody could cost it and later judge whether
            it shipped.</li>
          <li><b>What kind of system it is</b>, named in the reading&rsquo;s own words rather than by a
            product name.</li>
          <li><b>Which activity it belongs to, and where the saving appears.</b> These are frequently not
            the same activity, and naming both is what answers the obvious objection.</li>
          <li><b>Which force it answers</b>, named explicitly. It does not have to be the force you
            called strongest in Task 1b &mdash; the biggest pressure is not always the one worth
            spending on first &mdash; but if it is a different one, say why you are spending there
            instead.</li>
          <li><b>How it would run</b>: built and hosted by {short}, or bought as a service &mdash; and
            one sentence on what that choice costs you in control. (If you want to name a cloud service
            model, Module 3 covers them; neither reading for this case does, so it is not required.)</li>
          <li><b>How you would know it worked</b>: the number as it stands today, the number you expect
            instead, and the date somebody should look at it.</li>
        </ol>
        <textarea id="t3" data-key="t3" aria-label="The one IT initiative, with its six elements" placeholder="What it does: …&#10;&#10;What kind of system it is: …&#10;&#10;The activity it belongs to, and where the saving appears: …&#10;&#10;The force it answers, from Task 1: …&#10;&#10;How it would run: …&#10;&#10;The measure and the date: …"></textarea>
      </div>

      <div class="task">
        <h3>Task 3b &middot; {case['chapterHeading']}</h3>
        <p>{case['chapterIntro']}</p>
        <ol class="parts">
{chapter_parts}
        </ol>
        <textarea id="t3b" data-key="t3b" aria-label="The chapter-specific decisions behind the initiative" placeholder="{case['chapterPlaceholder']}"></textarea>
      </div>

      <div class="task">
        <h3>Task 4 &middot; The written summary, in 150 to 200 words</h3>
        <p>This is the second deliverable, and it is one piece of writing rather than a set of answers.
          Explain how the two companies complement each other and what {short} can draw from the
          comparison. All <b>five</b> of these have to be in it:</p>
        <ol class="parts">
          <li>The company you chose, <b>named</b>, and what it actually did &mdash; the mechanism, not
            its size or its reputation.</li>
          <li>What makes it worth comparing even though the two are almost certainly a different
            size.</li>
          <li>The <b>one lesson</b> that would still make sense at {short}&rsquo;s scale, and one thing
            from that company you would explicitly <b>decline</b> to copy.</li>
          <li>How your Task 3 initiative <b>aligns</b> with what {short} has chosen to compete on. The
            scenario says what the firm sells itself on; say how the initiative serves that.</li>
          <li>What it would mean if the money went somewhere that did not.</li>
        </ol>
        <p>Stay inside the band, and <b>give the source</b> for what you say the company did &mdash; a
          link or a reference, written underneath and not counted in the word total. A mechanism nobody
          can check is a story.</p>
        <textarea id="t4" data-key="t4" aria-label="The written summary comparing against a real company" placeholder="The company I am comparing with {short} is …"></textarea>
        <div class="wc-row">
          <span class="wc-badge" id="wcBadge">0 words</span>
          <span id="wcMsg" style="color:var(--muted)">Aim for 150&ndash;200 words.</span>
        </div>
      </div>
    </section>

    <section class="card no-print">
      <span class="kicker">Before you hand it in</span>
      <h2>Check the shape of what you wrote</h2>
      <p>This checks <b>structure, not correctness</b> &mdash; it cannot tell whether your reasoning is
        any good, and a full row of ticks is not a grade. What it can catch is the handful of omissions
        that cost marks on this kind of analysis every single time. Nothing here is graded and nothing is
        sent anywhere.</p>
      <ul class="checks" id="checkList"></ul>
    </section>

    <section class="card no-print">
      <span class="kicker">Also worth checking</span>
      <h2>Anything still empty</h2>
      <p id="unansweredMsg">Nothing yet.</p>
    </section>

    <section class="card">
      <span class="kicker">What to hand in</span>
      <h2>Two deliverables</h2>
      <ul>
        <li><b>The framework analysis</b> &mdash; the five forces and the value chain areas: Tasks 1, 1b
          and 2.</li>
        <li><b>The written summary</b> explaining the strategic alignment between the initiative and the
          business: Tasks 3, 3b and 4.</li>
      </ul>
      <p>Use <b>Export my work</b> for a text file containing your name and every answer in order, or
        <b>Print / Save PDF</b> for a printable copy, or write them in your own document if you prefer
        &mdash; any of the three is fine, as long as every task is clearly labelled and your name is on
        it. Submit it the way you have been asked to.</p>
      <div class="callout warn">Your work lives in this browser only, on this computer. Reopening this
        page on the same machine brings it back, but clearing the browser&rsquo;s data, using a
        different machine, or opening it in a private window will not. Export as soon as you finish.</div>
    </section>

    <section class="card no-print">
      <span class="kicker">If you are stuck</span>
      <h2>Where to practise first</h2>
      <ul>
        <li><a href="../five-forces-and-value-chain.html">Five Forces and the Value Chain &mdash; a
          working review</a> &mdash; rate an industry force by force against an analyst&rsquo;s reading,
          sort evidence to the force it actually demonstrates, place a proposed system on the chain, and
          work three cases that need both models at once.</li>
        <li><a href="../five-forces-and-value-chain-quiz.html">The frameworks quiz</a> &mdash; every
          answer explains itself, including the ones you did not choose.</li>
{reading}
      </ul>
      <div class="callout good"><b>One habit worth copying from the worked cases.</b> Write the sentence
        &ldquo;the strongest force is X, and the evidence is Y&rdquo; before you write anything at all
        about technology. Nearly every weak analysis of this kind is a system that was chosen first and
        given a diagnosis afterwards.</div>
    </section>

  </div>
</main>

<footer>
  <div class="wrap">{case['footerNote']} Every company on this assignment is invented and every figure in
    it is hypothetical. Your work is saved in this browser only &mdash; nothing you type is uploaded,
    submitted or collected.</div>
</footer>

<script>
{script}</script>

<!--
================================================================================
This page carries no answers, no marking guidance and no weighting, on purpose:
a student can read this source as easily as the page. Both live in the
instructor key beside this file, which is not in version control.

Generated. Edit homework/src/ and run `python3 homework/src/build.py`.
================================================================================
-->
</body>
</html>
"""
    return html, total_cost, total_rework


if __name__ == "__main__":
    import sys
    out = ROOT / "homework"
    if "--out" in sys.argv:
        out = pathlib.Path(sys.argv[sys.argv.index("--out") + 1])
    out.mkdir(parents=True, exist_ok=True)
    quiet = "--quiet" in sys.argv
    for case in CASES:
        html, cost, rework = build(case)
        path = out / (case["slug"] + ".html")
        path.write_text(html)
        if not quiet:
            print("wrote {}  ({:,} bytes, cost {:,}, avoidable {:,})".format(
                path.name, len(html), cost, rework))
