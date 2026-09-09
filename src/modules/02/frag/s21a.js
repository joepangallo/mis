/* ===== s21a ===== */
PROSE.s21a = `
<span class="eyebrow">Section 2&ndash;1a</span>
<h2>How an organization is arranged for deciding</h2>
<p class="lede">Before anyone can say which information system a company needs, they have to say who is asking. A cashier, a store manager and a chief executive all work for the same firm and all want information &mdash; but different information, on different clocks, for different reasons.</p>

<h3>What a company actually does all day</h3>
<p>Companies do not exist to own technology; they exist to do things. <b>Business processes</b> are the activities an organization performs to reach its business goals, and they come in two kinds.</p>
<ul class="keys">
<li><b>Core activities</b> &mdash; the activities that transform inputs into outputs, because that transformation is the thing a customer eventually pays for: flour and labor become a loaf.</li>
<li><b>Supporting activities</b> &mdash; the activities that enable the core activities to happen, because nobody bakes the loaf if payroll never runs and no baker was ever hired.</li>
</ul>

<h3>Three levels, three different questions</h3>
<p>Every organization is composed of decision-making levels, usually drawn as a pyramid: a wide <b>operational level</b> at the bottom, a narrower <b>managerial level</b> (also called <b>tactical</b>) in the middle, and a narrow <b>executive level</b> (also called <b>strategic</b>) at the top.</p>
<p>Each level carries different responsibilities and therefore different informational needs, which is why each is served by a different type of system. Work through the three one at a time.</p>

<div class="activity" data-activity="lvlLevels"></div>

<p>Set out together, the differences stop reading like job titles and start reading like a design brief.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Level</th><th>Who works there</th><th>What its systems do</th><th>Why</th><th>Decision type</th><th>Horizon</th></tr></thead>
<tbody>
<tr><td><b>Operational</b></td><td>Foremen, supervisors</td><td>Automate routine, repetitive activities</td><td>Improve efficiency</td><td>Structured</td><td>Hours or days</td></tr>
<tr><td><b>Managerial</b><br><span class="mini">tactical</span></td><td>Midlevel, functional managers</td><td>Monitor and control operational activity</td><td>Improve effectiveness</td><td>Semistructured</td><td>Days to months</td></tr>
<tr><td><b>Executive</b><br><span class="mini">strategic</span></td><td>CEO, CIO, vice presidents</td><td>Summarize the past, project the future</td><td>Improve strategy and planning</td><td>Unstructured</td><td>Long-term</td></tr>
</tbody>
</table></div>

<p>Four terms travel with that table, and each belongs to a particular row of it.</p>
<ul class="keys">
<li><b>Transaction</b> &mdash; anything in a firm&rsquo;s daily business of which it must keep a record: a sale rung up, an item received, a shift clocked. It is the operational level&rsquo;s unit of work.</li>
<li><b>Tactical planning</b> &mdash; the managerial horizon of a few days to a few months, such as a marketing manager at Nike allocating next quarter&rsquo;s advertising budget.</li>
<li><b>Key performance indicators</b> &mdash; the metrics deemed most critical to assessing progress toward a goal, displayed on <b>digital dashboards</b> so a manager watches a few numbers instead of every transaction.</li>
<li><b>Environmental scanning</b> &mdash; the executive habit of assessing how new information systems could support the strategy or open new products and services.</li>
</ul>

<div class="callout tip"><p><b>Efficiency is not effectiveness.</b> <b>Efficiency</b> is accomplishing goals faster, at lower cost, or with little time and effort, and it belongs to the operational level. <b>Effectiveness</b> is accomplishing them <i>well</i>, and it belongs to the managerial level. A warehouse shipping the wrong item in record time is efficient, not effective.</p></div>

<p>Executive KPIs do two further jobs: balancing performance across the organization so demand spikes do not all hit the supply chain at once, and benchmarking the firm against its competitors. Test the levels against a few situations.</p>

<div class="activity" data-activity="lvlQuiz1"></div>

<h3>Structured, semistructured, and unstructured decisions</h3>
<p>The decisions themselves have different shapes, and the shape determines how much of the decision a machine can take over.</p>
<ul class="keys">
<li><b>Structured decisions</b> &mdash; the procedures for a given situation can be specified in advance, so they can be programmed into operational systems and made with little or no human intervention.</li>
<li><b>Semistructured decisions</b> &mdash; some procedures can be specified in advance, but not far enough to yield a specific recommendation, because the problems require judgment and expertise.</li>
<li><b>Unstructured decisions</b> &mdash; few or no procedures can be specified in advance, because the problems are complex and nonroutine and their consequences reach the whole organization.</li>
</ul>
<p>The chapter&rsquo;s smallest example is the clearest. An inventory system in a mall shoe store reorders when stock drops below a set point, and operational managers simply confirm the order was needed. The rule existed before the situation did, so software can carry it.</p>
<p class="takeaway">The less a procedure can be written down in advance, the higher in the organization the decision travels, and the more the system shifts from deciding to informing.</p>

<div class="activity" data-activity="lvlSort"></div>

<h3>Functional areas and the systems that serve them</h3>
<p>Decision levels cut the organization horizontally; functional areas cut it vertically. A <b>functional area</b> is a discrete area of an organization focused on a specific set of activities &mdash; marketing promotes the organization and its products to attract and retain customers, while accounting and finance control its capital assets and financial resources.</p>
<p>Because the activities differ, the systems differ. <b>Functional area information systems</b> support the unique business processes of specific functional areas: accounting and finance, human resources, marketing, and production and operations. Each also reaches upward, from a basic transaction record through tactical control to complex planning. Match the eight below.</p>

<div class="activity" data-activity="lvlAreas"></div>

<p class="takeaway">Ask which function owns the process and which level makes the call; those two answers describe the system before a single vendor is contacted.</p>
<p>One last pass over this section&rsquo;s vocabulary, from KPIs to functional area systems.</p>

<div class="activity" data-activity="lvlQuiz2"></div>
`;

ACT.lvlLevels = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "The three decision-making levels, one at a time",
  how: "Pick a level to see who works there, what its information systems do, why the organization wants them, and what kind of decision gets made.",
  objective: "2.1",
  models: [
    {
      id: "operational",
      name: "Operational level",
      site: "The widest part of the pyramid, where the day happens one recorded event at a time",
      boxes: [
        {c: "a", t: "Who", w: "Foremen and supervisors"},
        {c: "b", t: "What", w: "Automate routine and repetitive activities and events"},
        {c: "c", t: "Why", w: "To improve organizational efficiency"},
        {c: "d", t: "Decision type", w: "Structured and recurring"}
      ],
      points: [
        "This is where the routine, day-to-day business processes and the interactions with customers occur, so the systems sit at the customer interface: registers, order screens, receiving scanners.",
        "The unit of work is the <b>transaction</b> &mdash; anything that occurs as part of a firm&rsquo;s daily business of which it must keep a record.",
        "Decisions here are <b>structured</b>: the procedures to follow can be specified in advance, so they can be programmed directly into the system and made with little or no human intervention.",
        "Operational planning typically has a time frame of a few hours or days, and because the activities are clearly delineated and well focused, optimizing them can offer quick returns on the investment."
      ]
    },
    {
      id: "managerial",
      name: "Managerial level, also called tactical",
      site: "The middle of the pyramid, where one business function is monitored and steered",
      boxes: [
        {c: "a", t: "Who", w: "Midlevel managers and functional managers"},
        {c: "b", t: "What", w: "Automate the monitoring and controlling of operational activities"},
        {c: "c", t: "Why", w: "To improve organizational effectiveness"},
        {c: "d", t: "Decision type", w: "Semistructured"}
      ],
      points: [
        "Functional managers &mdash; marketing, finance, manufacturing, human resource managers &mdash; monitor and control the level below them and provide information to the levels above them.",
        "Their aim is <b>effectiveness</b>, the extent to which goals or tasks are accomplished well, achieved by effectively utilizing and deploying organizational resources toward the strategic objectives.",
        "Decisions here are <b>semistructured</b>: some procedures can be specified in advance, but not to the point of producing a specific recommendation, so judgment and expertise are still required.",
        "The scope is usually contained within the business function, is moderately complex, and has a horizon of a few days to a few months, which the chapter calls <b>tactical planning</b>."
      ]
    },
    {
      id: "executive",
      name: "Executive level, also called strategic",
      site: "The narrow top of the pyramid, where commitments are made for the whole organization",
      boxes: [
        {c: "a", t: "Who", w: "Executives: CEO, CIO, vice presidents, possibly the board"},
        {c: "b", t: "What", w: "Aggregate summaries of past data and projections of the future"},
        {c: "c", t: "Why", w: "To improve organizational strategy and planning"},
        {c: "d", t: "Decision type", w: "Unstructured"}
      ],
      points: [
        "The questions are long-term: which products to produce, which countries to compete in, and what organizational strategy to follow.",
        "Decisions here are <b>unstructured</b>, because few or no procedures can be specified in advance for problems that are relatively complex, nonroutine, and consequential for the overall organization.",
        "KPIs at this level balance performance across the organization &mdash; staggering product launches so demand spikes do not hit the supply chain at once &mdash; and benchmark the firm against its competitors.",
        "These systems must handle unstructured data such as global economic factors, demographic changes, and shifting customer tastes, and executives use <b>environmental scanning</b> to see how new systems could support strategy."
      ]
    }
  ]
};

ACT.lvlSort = {
  kind: "sort",
  label: "Sort",
  title: "How structured is this decision?",
  how: "Place each decision in the category the chapter defines for it. Situations that are not the chapter&rsquo;s own examples are practice situations, and each one states the conditions you need.",
  objective: "2.1",
  buckets: [
    {id: "structured", name: "Structured", hint: "the procedures to follow can be specified in advance, so the system can carry the decision itself"},
    {id: "semi", name: "Semistructured", hint: "some procedures can be specified in advance, but not far enough to produce a specific recommendation"},
    {id: "unstructured", name: "Unstructured", hint: "few or no procedures can be specified in advance, and the ramifications reach the whole organization"}
  ],
  items: [
    {t: "An inventory system in a mall shoe store tracks stock and issues an order for more shoes whenever the count falls below a set level, and the operational managers in the store only confirm it", b: "structured", why: "This is the chapter&rsquo;s own example of a rule written before the situation arose, which is why it can be programmed directly into an operational system and run with almost no human intervention."},
    {t: "A payroll system multiplies the hours a system recorded by a stored pay rate to produce gross pay for each employee", b: "structured", why: "The procedure is fixed in advance and the same every period, so it is highly structured and recurring &mdash; exactly the work operational systems automate."},
    {t: "A register records each completed sale so the firm keeps a record of its daily business", b: "structured", why: "Recording a transaction is the definition of routine operational work, and no judgment enters it: the steps are identical for every customer."},
    {t: "In a practice situation, a supervisor assigns a returning part-time worker to a shift using a posted seniority rule that already covers this exact case", b: "structured", why: "Because the rule was specified in advance and fits the situation without interpretation, the decision is structured even though a person happens to be the one applying it."},
    {t: "A marketing manager at Nike decides how to allocate the advertising budget for the next business quarter", b: "semi", why: "The chapter gives this as managerial work: past results and forecasts narrow the choice, but no procedure returns the specific allocation, so judgment finishes the job."},
    {t: "A production manager uses a business intelligence system to build several hypothetical production schedules and then runs predictive analyses on each one", b: "semi", why: "The system supplies analytics, forecasts, and comparisons, but it stops short of naming the schedule to use, which is precisely the semistructured boundary."},
    {t: "In a practice situation, a functional manager watching a dashboard of quarterly KPIs must choose which of two underperforming processes to repair first, with the metrics known but no rule ranking them", b: "semi", why: "Measurement is specified in advance and the choice is not, so the manager brings judgment and expertise to a moderately complex problem inside one function."},
    {t: "In a practice situation, a midlevel manager decides how many temporary staff to bring into one department for a seasonal peak, using a forecast that narrows the range without naming a number", b: "semi", why: "The scope stays inside a single business function on a horizon of a few weeks, and the forecast informs the decision rather than making it."},
    {t: "Top managers decide whether to develop a new product or discontinue an existing one, knowing employment levels and profitability may be affected for years", b: "unstructured", why: "The chapter uses this decision to show ramifications that are vast and long-term, and no procedure written in advance can settle it."},
    {t: "Executives decide which countries the organization will compete in", b: "unstructured", why: "This is one of the long-term strategic questions the chapter puts at the executive level, and it turns on complex, nonroutine judgments about the whole organization."},
    {t: "Executives weigh global economic factors, demographic changes, and shifting customer tastes in choosing what organizational strategy to follow", b: "unstructured", why: "These are the unstructured data types the chapter says executive systems must consider, and no advance procedure converts them into a single answer."}
  ]
};

ACT.lvlAreas = {
  kind: "match",
  label: "Match",
  title: "Functional areas and the systems that serve them",
  how: "Pair each function or functional area system with the work it does. Four pairs come from Table 2.1 and name a functional area; the other four come from the chapter&rsquo;s figure of applications stacked by decision level.",
  objective: "2.1",
  pairs: [
    {l: "Accounting and finance", r: "Systems used for managing, controlling, and auditing the financial resources of the organization", why: "Accounts payable, expense accounts, cash management, and payroll processing are the sample applications, and all four track where money sits and where it moves."},
    {l: "Human resources", r: "Systems used for managing, controlling, and auditing the human resources of the organization", why: "Recruiting and hiring, education and training, benefits management, employee termination, and workforce planning cover a person&rsquo;s whole span with the organization."},
    {l: "Marketing", r: "Systems used for managing new product development, distribution, pricing, promotional effectiveness, and sales forecasting", why: "This function focuses on activities that promote the organization and its products in a way that attracts and retains customers, which is why forecasting and pricing sit here."},
    {l: "Production and operations", r: "Systems used for managing, controlling, and auditing the production and operations resources of the organization", why: "Inventory management, cost and quality tracking, materials and resource planning, job costing, and resource utilization all concern making the thing rather than selling it."},
    {l: "Financial information systems", r: "Cash management, then financial forecasting, then portfolio management and ratio analysis", why: "One functional system reaches across all three application layers, from a basic transaction record up to complex planning and coordination."},
    {l: "Human resource information systems", r: "An employee skill inventory, then compensation analysis, then personnel forecasting", why: "The same function is served at three heights: recording who has which skill, controlling pay, and planning the workforce the organization will need."},
    {l: "Marketing information systems", r: "Pricing and sales analysis, then sales force automation, then advertising and promotion planning", why: "Analysis of what sold supports tactical control of the sales force, which in turn feeds the longer planning of campaigns."},
    {l: "Operational information systems", r: "Manufacturing resource utilization, then inventory management, then manufacturing resource planning", why: "Measuring how resources were used supports managing stock, and both feed the complex coordination of manufacturing resource planning."}
  ]
};

ACT.lvlQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Placing work at the right level",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "2.1",
  questions: [
    {
      q: "A supervisor on a distribution floor needs to know whether tonight&rsquo;s shift can clear the orders already sitting in the building. Which level is she working at, and what are its systems for?",
      opts: [
        "The managerial level, because a supervisor is a manager and the question covers a whole shift rather than one order",
        "The operational level, where systems automate routine and repetitive activities and events in order to improve efficiency",
        "The executive level, because whether orders ship tonight affects whether customers stay with the firm at all",
        "The managerial level, because the systems there automate the monitoring and controlling of operational activities"
      ],
      a: 1,
      why: [
        "Job titles are not levels. The chapter places foremen and supervisors at the operational level precisely because their decisions are day-to-day, highly structured, and recurring, whatever the word on the badge.",
        "Correct. This is routine day-to-day work with a horizon of a few hours, and operational systems exist to automate routine and repetitive activities and events so that goals are accomplished faster, at lower cost, or with relatively little time and effort.",
        "Executive-level decisions deal with complex problems whose ramifications are broad and long-term, such as which countries to compete in. Tonight&rsquo;s backlog matters, but it is settled before the executives next meet.",
        "The description of managerial systems is accurate, and it would fit a functional manager comparing this week&rsquo;s throughput across several shifts. Here the supervisor is inside the shift doing the work, not standing above it monitoring a function."
      ]
    },
    {
      q: "A company reports that one process now finishes faster and at lower cost than it did last year. Which term names that result, and which level does the chapter associate it with?",
      opts: [
        "Effectiveness, at the managerial level, since the goal is now being accomplished well",
        "Efficiency, at the managerial level, since midlevel managers deploy the organization&rsquo;s resources",
        "Efficiency, at the operational level, since goals are accomplished faster and at lower cost",
        "Effectiveness, at the executive level, since a faster process supports the organization&rsquo;s long-term strategy"
      ],
      a: 2,
      why: [
        "Effectiveness is the extent to which goals or tasks are accomplished <i>well</i>, and it is the managerial-level aim. Speed and cost alone say nothing about whether the right thing was produced.",
        "Half right is still wrong here. Efficiency is the correct term, but the chapter ties it to the operational level, where systems optimize clearly delineated processes and return the investment quickly.",
        "Correct. Efficiency is defined as the extent to which goals are accomplished faster, at lower cost, or with relatively little time and effort, and improving it is the stated purpose of operational-level systems.",
        "Executive systems aim at strategy and planning through aggregate summaries and projections, not at the speed of a single process. Naming this effectiveness also misses that nothing was said about how well the work was done."
      ]
    },
    {
      q: "A marketing manager is deciding how to allocate the advertising budget for the next business quarter. How does the chapter describe the scope and time horizon of a decision like this one?",
      opts: [
        "The scope is usually contained within one business function, is moderately complex, and runs a few days to a few months",
        "The scope reaches across the whole organization with long-term ramifications, since real money is being committed",
        "The scope is a single business function, but the horizon is a few hours or days, matching operational planning",
        "The scope covers several functions at once, which is exactly why the chapter calls this level tactical planning"
      ],
      a: 0,
      why: [
        "Correct. That is the chapter&rsquo;s description of managerial decisions, and it is why this horizon of a few days to a few months carries the name tactical planning.",
        "Broad scope and long-term ramifications describe executive-level decisions, such as developing or discontinuing a product. A quarter of advertising spend is a large sum inside one function, not a commitment for the whole organization.",
        "The scope is right and the horizon is not. A few hours or days is operational planning, the pace of the register and the loading dock, whereas a business quarter is months away.",
        "Tactical planning is named for its time horizon, not for spanning functions, and midlevel managers typically focus on problems within one business function such as marketing or finance."
      ]
    }
  ]
};

ACT.lvlQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Indicators, executives, and functions",
  how: "Three questions on the vocabulary this section introduced; the explanations say what each wrong option genuinely describes.",
  objective: "2.1",
  questions: [
    {
      q: "What are key performance indicators, and where does the chapter say they are displayed?",
      opts: [
        "The complete set of transactions a firm records each day, displayed inside a transaction processing system",
        "The metrics deemed most critical to assessing progress toward a certain goal, displayed on digital dashboards",
        "Targets set once a year by executives for every function, displayed in an annual report prepared for the board",
        "The procedures specified in advance for a recurring decision, displayed to supervisors as they do the work"
      ],
      a: 1,
      why: [
        "That describes raw transaction data, which is the record of everything that happened rather than the few numbers chosen to show progress. Indicators exist because nobody can watch every transaction.",
        "Correct. KPIs are the metrics deemed most critical to assessing progress toward a certain goal, and they are displayed on digital dashboards for managers who need the state of things at a glance.",
        "KPIs are watched continuously rather than published once a year, and both managers and executives use them. This would be closer to a description of annual financial reporting.",
        "Procedures specified in advance define a structured decision, not an indicator. A rule tells you what to do; an indicator tells you how the goal is going."
      ]
    },
    {
      q: "How does the chapter describe the information executives need from their systems?",
      opts: [
        "Detailed records of individual transactions, so that nothing is lost between the register and the boardroom",
        "Summaries built from the organization&rsquo;s own internal transaction data, because outside signals such as demographic change belong to the marketing function",
        "Reports confined to one business function at a time, because each executive is responsible for a single function",
        "Aggregate summaries of past organizational data and projections of the future, with KPIs that balance performance and benchmark competitors"
      ],
      a: 3,
      why: [
        "Individual transaction records are the output of operational systems. Executives receive them summarized, because the question at that level is the shape of the trend and not the content of one sale.",
        "The chapter says the opposite about the sources: executive-level systems need to consider various types of unstructured data, such as global economic factors, demographic changes, and changing customer tastes and preferences, none of which start inside the firm.",
        "That is the managerial level, where a midlevel manager typically focuses on problems within a specific business function. Executives must consider the ramifications of a decision for the overall organization.",
        "Correct. Executive systems supply aggregate summaries of trends and projections of the future, with KPIs that balance performance across the organization and benchmark it against competitors."
      ]
    },
    {
      q: "What is a functional area, and what makes a functional area information system different from an information system in general?",
      opts: [
        "A functional area is one of the decision-making levels, and its systems serve everyone standing on that rung",
        "A functional area is a discrete area focused on a specific set of activities, and its systems support that area&rsquo;s unique business processes",
        "A functional area is a physical site such as a store or a plant, and its systems are installed and operated locally",
        "A functional area is a single business process such as order fulfillment, and its systems automate the steps of that one process"
      ],
      a: 1,
      why: [
        "Levels and functions are the two different cuts through an organization. Operational, managerial, and executive are the levels; marketing, human resources, and the rest are the functions.",
        "Correct. A functional area is a discrete area of an organization that focuses on a specific set of activities, and functional area information systems are designed to support the unique business processes of specific functional areas.",
        "Location is not what defines a function. A single marketing function can operate from several sites, and a single site usually contains people from several functional areas.",
        "Business processes are the activities an organization performs to reach its goals, and a functional area is the standing part of the organization that owns a whole set of them: marketing runs market research, pricing, and promotion, not one process."
      ]
    }
  ]
};
