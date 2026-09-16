/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s83b = "\n<span class=\"eyebrow\">Objective 8.3 · Part 2</span><h2>Choosing, installing, and living with an ERP</h2>\n<p class=\"lede\">Buying the software is the short part. The long part is everything around it: deciding which system, deciding how much of it to change, settling several thousand small rules about how the company works, and getting people through the first month after the switch. This section follows that arc, from the reason these systems record so much to the drop in output that usually follows go-live.</p>\n<h3>Compliance is why the system records what it records</h3>\n<p>Beyond improving business processes, an ERP system improves and eases an organization's ability to implement audit controls and comply with government-imposed regulations. Compliance with mandates such as the Sarbanes-Oxley Act rests on implementing and documenting internal controls, procedures, and processes. ERP systems are designed to include an abundance of control features that can mirror the way the organization actually works.</p>\n<p>Two of those features explain a great deal of ordinary friction at work:</p>\n<ul class=\"keys\"><li><b>Controlling access</b> decides who may see or change a given record, so an approval cannot be granted by whoever happens to be sitting at the desk.</li><li><b>Segregating duties</b> splits a task across job functions, so the person who enters a supplier invoice is not the person who releases its payment.</li></ul>\n<p>An ERP will not answer every regulatory requirement by itself. It has still been a central strategy for organizations working through the legal, regulatory, and supply chain mandates they live under.</p>\n<h3>One suite, or the best of each</h3>\n<p>A <b>best-of-breed</b> approach uses a suite of independent systems, each the strongest in its own area. Plenty of firms have built successful businesses that way, because a modular set of parts keeps them agile and quick to respond when the business environment changes. An <b>enterprise-wide information system</b> takes the other road, integrating data across functional areas in one shared database behind a common interface.</p>\n<p>The honest objection to best of breed is arithmetic rather than principle. Integration is built and maintained between pairs of systems, and pairs multiply faster than systems do. Four systems have 6 possible pairs. Eight systems have 28. Every connection you actually build is a custom interface that somebody maintains, and each one has to survive the next upgrade at either end of it.</p>\n<p>Neither road is automatically right. Three questions decide it:</p>\n<ul class=\"keys\"><li><b>How many seams you will owe</b> counts the pairs of systems that must exchange data, not the systems themselves.</li><li><b>Where the advantage actually lives</b> asks whether a distinctive process earns real money or is simply the habit the staff grew up with.</li><li><b>Who repairs a broken seam</b> names the team or vendor on the hook when a nightly transfer fails and the warehouse opens at six.</li></ul>\n<h3>Vanilla, configured, customized</h3>\n<p>The features and modules an enterprise system arrives with out of the box are the <b>vanilla</b> version. <b>Configuration</b> is not optional: the system has to be set up to reflect the way this organization does business and the business rules it follows. That means countless decisions about hundreds or thousands of database tables, and thousands more about the processes themselves.</p>\n<p>Those configuration decisions sound small and are not:</p>\n<ul class=\"keys\"><li><b>What a customer identifier looks like</b> fixes how every future record is matched, merged, and searched for.</li><li><b>When a bill is considered overdue</b> drives the reminder letters, the credit holds, and the aging report finance reads each month.</li><li><b>What counts as the standard shipping method</b> sets the default on thousands of orders nobody will stop to review.</li></ul>\n<p>Deciding all that needs someone who knows how the company really runs, which is why organizations hire experienced business analysts or outside consultants to help with configuration work.</p>\n<p><b>Customization</b> is a different thing, and it is often discouraged. It means programming company-specific modules, or changing the vanilla application itself. The reason for the caution is a bill that arrives again and again: a customization has to be reprogrammed when a new release is implemented, because later releases of the software do not carry your earlier changes forward. That is costly to redo, not impossible, and the cost lands at every release rather than once.</p>\n<p class=\"warn\">The next move is the dangerous one. Rather than re-fit the custom modules to the new release, many organizations stay on the old version so their custom features keep working. That leaves known flaws unpatched in a system that touches sales, inventory, and payroll.</p>\n<h3>The lines nobody quotes</h3>\n<p><b>Total cost of ownership</b> is everything the system costs to acquire and then to keep, not just what the invoice says. It is the figure a business case needs, and many companies underestimate it and go over budget as a result.</p>\n<p>Acquisition costs are the ones printed on the proposal: software licenses and maintenance, technical implementation, hardware. The costs that push these projects over budget are the ones estimated last, or not at all.</p>\n<p>Four of them come up again and again:</p>\n<ul class=\"keys\"><li><b>Travel and training for personnel</b> covers the hours people are paid to learn the system rather than to produce anything with it.</li><li><b>Ongoing customization and integration</b> recurs at every release, which is what makes it an operating cost instead of a one-time project cost.</li><li><b>Business process studies</b> pay for finding out how the work is really done before the software is told to assume something else.</li><li><b>Project governance</b> funds the steering, reporting, and decision-making that keep a multi-year project from quietly drifting off course.</li></ul>\n<p>Leave them out of the estimate and you get unexpected budget increases, delayed timelines, and angry management. Put a figure on them instead.</p>\n<div class=\"activity\" data-activity=\"erpliveFormula\"></div>\n<h3>What makes an implementation succeed</h3>\n<p>Horror stories about failed ERP implementations abound, and many of them are the same story: costlier and more time-consuming than anyone envisioned. Four recommendations raise the odds.</p>\n<ul class=\"keys\"><li><b>Secure executive sponsorship</b>, because executives control the resources and can authorize the changes in how the company works.</li><li><b>Get help from outside experts</b> to define the functionality before a vendor is chosen, rather than leaning on the vendor's own salespeople.</li><li><b>Thoroughly train users</b>, the most overlooked, underestimated, and poorly budgeted expense in the entire plan.</li><li><b>Take a multidisciplinary approach</b> by putting mid-level managers, IS staff, consultants, and end users on the implementation team.</li></ul>\n<p>Training earns that warning. An enterprise system is harder to learn than a standalone one, because a user has to absorb an unfamiliar interface and an unfamiliar set of business processes at the same time. Once the consultants leave, the staff do the work themselves.</p>\n<div class=\"activity\" data-activity=\"erpliveOrder\"></div>\n<h3>Limitations, and the first month</h3>\n<p>These systems have real limits, and the one the chapter names is <b>lock-in</b>. An ERP typically requires the organization to modify various business processes, and once it is implemented the company is virtually locked in: further change is difficult, which costs flexibility and agility exactly when something outside the firm shifts. That is the real price of one integrated suite, and it is why the best-of-breed argument does not simply lose.</p>\n<p>Then there is the dip. Many companies see a dramatic drop-off in productivity once the system goes live, together with dissatisfied users who would rather do the work the familiar way. Training people before go-live, and giving them room to practice, is what shrinks it.</p>\n<p>Read that dip carefully, because two wrong readings are on offer:</p>\n<ul class=\"split\"><li>A dip is not proof the system was the wrong choice. It is the expected cost of new screens and new processes landing on the same morning.</li><li>A dip is not proof of nothing either. If output stays flat for weeks and errors keep climbing, something is wrong past the learning curve.</li></ul>\n<div class=\"activity\" data-activity=\"erpliveCase\"></div>\n<p class=\"takeaway\">Choose on the arithmetic of seams, change the process before you change the software, budget the lines nobody quotes, and train people before the switch is thrown. Then read the first month as a trend rather than a verdict.</p>\n";

ACT.erpliveOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "An implementation done in the right order",
  "objective": "8.3",
  "how": "Put the six steps into the order a careful implementation follows. Read why each one has to come where it does.",
  "steps": [
    {
      "t": "Secure executive sponsorship before anything is bought",
      "why": "Lack of top-level support is believed to be the main reason enterprise system implementations fail. Executives control the resources and are the only people who can authorize changes to the way the company does business."
    },
    {
      "t": "Put end users, mid-level managers, IS staff, and outside consultants on one team",
      "why": "End users are involved in daily business activity and will name requirements nobody on the project team thought of. Leaving departments out also breeds animosity toward a system they had no hand in choosing."
    },
    {
      "t": "Evaluate each vendor's modules against the processes you actually run",
      "why": "The evaluation has to say how far the modules support existing processes, which modules must be added, and how far the existing processes will have to bend to fit. That is a comparison, so it needs the requirements first."
    },
    {
      "t": "Decide, process by process, whether the process changes or the software does",
      "why": "Adopting the built-in practice makes the implementation and every later upgrade go more smoothly. Customizing keeps a process that may be genuinely distinctive, at the price of reprogramming it at each release."
    },
    {
      "t": "Configure the database and the business rules",
      "why": "Hundreds or thousands of tables and thousands of process decisions have to be settled: the format of a customer identifier, when a bill is overdue, what standard shipping means. These answers depend on the choices made in the step before."
    },
    {
      "t": "Train users thoroughly before the switch is thrown",
      "why": "Training is the most overlooked, underestimated, and poorly budgeted expense in these projects. Doing it before go-live, rather than after, is what shrinks the drop in productivity that follows."
    }
  ]
};

ACT.erpliveFormula = {
  "kind": "formula",
  "label": "Spreadsheet",
  "title": "Five years of an ERP, including the parts nobody quoted",
  "objective": "8.3",
  "how": "Type one formula for row 2 in each column and run it; it is applied down every row the way a filled-down formula behaves in a real sheet. The firm and every figure in this sheet are invented for practice.",
  "headers": [
    "Cost line",
    "In the vendor's quote",
    "Year 1",
    "Each later year",
    "Five-year total",
    "Share of the five-year bill",
    "Bigger than the license line?"
  ],
  "data": [
    ["Software licenses and maintenance", "Quoted", 240000, 60000, "", "", ""],
    ["Hardware and technical implementation", "Quoted", 180000, 20000, "", "", ""],
    ["Travel and training for personnel", "Not quoted", 150000, 45000, "", "", ""],
    ["Ongoing customization and integration", "Not quoted", 130000, 92000, "", "", ""],
    ["Business process studies", "Not quoted", 95000, 15000, "", "", ""],
    ["Project governance", "Not quoted", 70000, 30000, "", "", ""]
  ],
  "tasks": [
    {
      "column": 4,
      "prompt": "Column E: what does each line cost across five years? Year 1 is in column C, and column D is what the same line costs in each of the four years after it.",
      "placeholder": "=C2+D2*4",
      "expect": "=C2+D2*4",
      "note": "Every figure here is invented for this hypothetical firm.",
      "hint": "Year 1 is paid once. The later-year figure is paid four more times, so multiply column D by 4 before adding column C to it.",
      "explain": "The ranking changes the moment you look past year 1. Ongoing customization and integration starts smaller than the license line and finishes larger, because it is an operating cost that recurs at every release rather than a purchase."
    },
    {
      "column": 5,
      "prompt": "Column F: what share of the whole five-year bill is each line, as a percentage rounded to one decimal place? Build the row's five-year figure from columns C and D again, then divide it by the five-year figure for the entire sheet.",
      "placeholder": "=ROUND((C2+D2*4)/(SUM($C$2:$C$7)+SUM($D$2:$D$7)*4)*100,1)",
      "expect": "=ROUND((C2+D2*4)/(SUM($C$2:$C$7)+SUM($D$2:$D$7)*4)*100,1)",
      "note": "Column E holds what you worked out, not stored data, so this formula rebuilds the figure from columns C and D.",
      "hint": "The bottom of the fraction is the whole sheet: add every year-1 figure, add four times every later-year figure, then add those two sums together. Lock the ranges with dollar signs so they do not slide down the column.",
      "explain": "The two quoted lines come to under 39 percent of the five-year bill. Travel and training, ongoing customization and integration, business process studies, and project governance make up the rest, and they are the four lines the proposal never showed."
    },
    {
      "column": 6,
      "prompt": "Column G: mark every line whose five-year total beats the software license line as Bigger, and mark the rest as Not bigger. The license line is row 2.",
      "placeholder": "=IF(C2+D2*4>$C$2+$D$2*4,\"Bigger\",\"Not bigger\")",
      "expect": "=IF(C2+D2*4>$C$2+$D$2*4,\"Bigger\",\"Not bigger\")",
      "hint": "Compare this row's five-year figure with row 2's five-year figure. Row 2 must stay row 2 as the formula fills down, so write its references as $C$2 and $D$2.",
      "explain": "Exactly one line in this sheet outgrows the software license, and it is ongoing customization and integration, which nobody quoted. Travel and training is the largest line after those two, and over five years it costs more than the hardware does."
    }
  ]
};

ACT.erpliveCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Three weeks after the switch",
  "objective": "8.3",
  "how": "Study this hypothetical firm and its invented figures. Make every decision to unlock the debrief, and read the explanation attached to each option.",
  "brief": "Bellrock Fasteners replaced six standalone applications with a single ERP suite twenty-one days ago. Order entry is slower than it used to be, the warehouse is running behind, and two sales managers have asked the controller to switch the old order desk back on for a month while everyone catches up.",
  "facts": [
    { "k": "Go-live", "v": "21 days ago" },
    { "k": "Modules live", "v": "Finance, operations, human resources" },
    { "k": "Training delivered", "v": "Two hours, the week after go-live" },
    { "k": "Old systems", "v": "Still installed, no longer connected" }
  ],
  "exhibit": {
    "name": "Order entry, week by week",
    "caption": "Invented practice figures for this hypothetical firm only.",
    "headers": ["Week", "Orders entered", "Minutes per order", "Entry errors caught later"],
    "rows": [
      ["Typical week before go-live", "1,180", "4.0", "31"],
      ["Week 1 after go-live", "690", "9.5", "44"],
      ["Week 2 after go-live", "840", "7.8", "36"],
      ["Week 3 after go-live", "1,010", "6.1", "19"]
    ]
  },
  "questions": [
    {
      "q": "Which reading do the three weeks of figures best support?",
      "opts": [
        "The dip is easing week by week as staff learn the new screens.",
        "The suite is a poor fit and the old order desk should return.",
        "Three weeks of figures are too few to read the switch either way.",
        "The warehouse backlog, not order entry, explains the slower weeks."
      ],
      "a": 0,
      "why": [
        "Orders climb each week while minutes per order fall from 9.5 to 6.1, which is what a learning curve looks like from the inside.",
        "A poor fit would hold output down or push it lower, and here every measure has moved back toward the old baseline.",
        "The figures do carry a reading. A trend across three weeks is weak evidence about a single week and good evidence about direction.",
        "The exhibit measures order entry alone, so it cannot be explained by a backlog in a part of the business it does not cover."
      ]
    },
    {
      "q": "The managers want the old order desk running beside the new one for a month. What is the strongest objection?",
      "opts": [
        "Running both systems for a month adds license and support cost.",
        "Orders would then live in two places, and no figure could be trusted.",
        "Staff would learn the new screens faster with the familiar one beside them.",
        "The training hours already delivered would have to be delivered again."
      ],
      "a": 1,
      "why": [
        "The extra cost is real but small next to the problem, and a month of it would be cheap if the split records were harmless.",
        "The whole benefit is one central repository. Split the orders and inventory, sales, and accounting each read a different version of the day.",
        "This is the argument the managers are making, and it is the opposite of what happens: a familiar fallback is the one people keep using.",
        "Repeating training is a cost of running two systems, not the reason the second system damages the business it is meant to help."
      ]
    },
    {
      "q": "The controller can fund one thing this quarter. Which fits what the figures show?",
      "opts": [
        "Faster hardware for the order desk so the new screens load more quickly.",
        "A customized order-entry module rebuilt to match the old screens.",
        "Another demonstration of the module from the vendor's sales team.",
        "Paid practice time for the order desk with someone answering questions."
      ],
      "a": 3,
      "why": [
        "Minutes per order are falling on the hardware already installed, so the delay being measured is in the people, not the machines.",
        "A rebuilt module would have to be reprogrammed at each release, and it would freeze the old process the switch was meant to replace.",
        "Salespeople are selling a system rather than teaching one, and the staff need supported practice rather than another walkthrough.",
        "Training is the most underestimated line in these projects, and two hours delivered after go-live left this order desk learning on live orders."
      ]
    }
  ],
  "debrief": "The three weeks read as a learning curve, not a verdict: output climbing, minutes per order falling, and errors now below the old baseline. That is the normal drop-off after go-live, and it is shortened by training rather than by reopening a second order desk that would split the records the whole suite exists to keep together."
};
