/* ===== s21b ===== */
PROSE.s21b = `
<span class="eyebrow">Section 2&ndash;1b</span>
<h2>Automating, learning, and strategizing</h2>
<p class="lede">Three companies can buy identical software for different reasons. One wants the work done faster. One wants to learn whether the work is worth doing. One wants to change what it competes on. The chapter treats these as a ladder.</p>

<p>An information system adds value in three general ways: by enabling <b>automating</b>, by enabling <b>learning</b>, and by enabling the execution of <b>organizational strategy</b>. They are not mutually exclusive, but each rung adds more value. The shorthand is faster, better, smarter.</p>

<div class="activity" data-activity="alsLadder"></div>

<h3>Automating: doing things faster</h3>
<p>An <b>automating</b> perspective sees technology as a way to complete a task faster, more cheaply and perhaps more accurately. What it buys is <b>efficiency</b> &mdash; goals accomplished faster, at lower cost, or with little effort. The work itself is never questioned; only what it costs.</p>
<p>The chapter&rsquo;s example is a bank screening loan applications, where that mentality makes three moves and none changes who decides.</p>
<ul class="keys">
<li><b>Put the applications into a database</b> &mdash; so the deciders process them faster and with fewer errors than from a stack of paper.</li>
<li><b>Let customers apply online</b> &mdash; because an application completed at home arrives already entered, removing a step from the schedule.</li>
<li><b>Redeploy the people it frees</b> &mdash; moving off a manual process lets the firm deploy employees more efficiently, which is where the further savings come from.</li>
</ul>
<p>The chapter runs one application through three versions of that process: manual, technology-supported and fully automated. Put the six activities in order.</p>

<div class="activity" data-activity="alsLoanSteps"></div>

<h3>What the totals actually show</h3>
<p>The headline is a fall from 25&ndash;40 days to 15 minutes. Three quieter facts teach more.</p>
<ul class="keys">
<li><b>One row never moves</b> &mdash; the committee deciding any loan over $250,000 takes 15 days in all three processes, because no column changed who decides.</li>
<li><b>That row is the ceiling</b> &mdash; the automated process runs from 15 minutes to 15 days, and 15 days is the committee&rsquo;s own figure, so the slowest automated loan is slow for a human reason.</li>
<li><b>One step gets worse first</b> &mdash; data entry takes an hour on paper but 2.5 days in the technology-supported process, where an employee keys batches.</li>
</ul>
<p class="takeaway">Automation compresses only the parts a machine is permitted to touch and leaves the rest where it was, which is why the automated column reports a range instead of a number.</p>

<div class="activity" data-activity="alsQuiz1"></div>

<h3>Organizational learning: doing things better</h3>
<p><b>Organizational learning</b> is the ability of an organization to use past behavior and data to improve its business processes. It builds on the automating rung: analyzing the data a process creates improves your understanding of the process.</p>
<p>A loan system tracking applications by date, month and season lets the manager see more auto loans arriving each fall, staff for that shape, plan the funds they need, and study how they performed.</p>
<p>The test is not how much data a system holds, but whether it creates data about the underlying process that can be used to monitor, control and change it. That is <b>effectiveness</b> &mdash; goals accomplished well &mdash; and it places the system at the managerial level.</p>

<div class="callout warn"><p><b>What automating alone can hide.</b> Suppose the criteria are poor: they approve a heavily indebted applicant so long as no payment was recently late.</p>
<p>By hand a reviewer clears four a day and accepts about two bad loans a week. Automate that faulty process with no learning built in and the reviewer clears 12 a day, accepting up to six. The technology only magnified the business problem.</p></div>

<p>Uber sits on all three rungs at once: it matches riders and drivers automatically, learns their preferences, and builds its strategy on that data.</p>

<p>One learning technology is worth naming because it sounds futuristic and is not. A <b>digital twin</b> is a software model of a physical object, fed live sensor data so people can troubleshoot or plan maintenance on equipment they cannot reach. It is the learning rung in hardware form.</p>
<h3>Supporting strategy: doing things smarter</h3>
<p>The best use of a system, the chapter argues, is to support the firm&rsquo;s strategy. <b>Organizational strategy</b> is a firm&rsquo;s plan to accomplish its mission and goals and to gain or sustain competitive advantage over rivals.</p>
<p>It is made at the executive level through <b>strategic planning</b>: senior managers form a vision, convert it into measurable objectives and targets, and craft a strategy to reach them. Four ways a system serves that plan.</p>
<ul class="split">
<li>Innovating, because a new offering changes what the company sells rather than what it costs.</li>
<li>Streamlining operations, so savings serve the chosen plan instead of being an end in themselves.</li>
<li>Optimizing the supply chain, since what a firm promises a customer depends on its suppliers.</li>
<li>Understanding customers better, because deep customer knowledge is not something a rival can buy.</li>
</ul>
<p>The funding rule follows: a system that will not clearly deliver strategic value, while also helping people work smarter and save money, is not likely to be funded. A firm parked on the automating rung only gets cheaper at work a newcomer may make unnecessary.</p>

<p>Draft a one-page pitch and see which rung it reaches.</p>

<div class="activity" data-activity="alsPitch"></div>

<h3>Reading the ladder correctly</h3>
<p>Three payoffs, and three questions for any proposal.</p>
<ol class="steps">
<li><b>Faster</b> &mdash; ask what this work costs today and afterwards; the payoff is efficiency, measured in time and money saved.</li>
<li><b>Better</b> &mdash; ask what the system teaches you about the process; the payoff is effectiveness, measured in decisions that turn out well.</li>
<li><b>Smarter</b> &mdash; ask what the system lets you do that a rival cannot; the payoff is competitive advantage, measured against rivals not last year.</li>
</ol>
<p class="takeaway">The useful question is not which rung a proposal sits on but how far up it reaches &mdash; a project that answers only the first is an efficiency story told in a room that funds strategy.</p>

<div class="activity" data-activity="alsQuiz2"></div>
`;

ACT.alsLadder = {
  kind: "explore",
  label: "Explore",
  title: "Faster, better, smarter",
  how: "Open each card and read all four panels; the fourth card sets the three against each other, which is where the distinction usually breaks down.",
  objective: "2.1",
  labels: ["The mindset in one line", "What it looks like in practice", "The payoff it produces", "Where it stops"],
  items: [
    {
      icon: "FAST",
      name: "Automating",
      sub: "Doing things faster",
      what: "Technology used to help complete a task within an organization faster, more cheaply, and perhaps with greater accuracy or consistency &mdash; in other words, to increase efficiency.",
      real: "Loan applications go into a computer database so the people deciding on them work faster, more easily, and with fewer errors, and customers can complete the application online instead of carrying paper home.",
      absent: "Time and cost fall. In the fully automated loan process a small loan can be finished in as little as 15 minutes, and moving off the manual process may enable the organization to deploy its employees more efficiently.",
      why: "It changes what a process costs, never what the process is. If the underlying process is flawed, automating use of technology may mask the problem while multiplying its effects."
    },
    {
      icon: "LEARN",
      name: "Organizational learning",
      sub: "Doing things better",
      what: "The ability of an organization to use past behavior and data to improve its business processes, built on top of the automating mentality rather than in place of it.",
      real: "The loan processing system tracks types of application by date, month, or season, so a manager can see trends, plan timely staffing and training, and manage the funds used to fulfill the loans.",
      absent: "Effectiveness rises, meaning goals get accomplished well rather than merely quickly, because new data about the underlying process can be used to monitor, control, and change that process.",
      why: "Learning tells you how well the current process is working. It does not by itself say what the organization ought to be competing on, which is a question decided a level higher up."
    },
    {
      icon: "SMART",
      name: "Supporting strategy",
      sub: "Doing things smarter",
      what: "Going beyond automating and learning to find ways of using information systems to achieve the organization&rsquo;s chosen strategy &mdash; by innovating, streamlining operations, optimizing the supply chain, or better understanding customers.",
      real: "Uber&rsquo;s use of information systems for personalization, anticipation, and coordination sits at the heart of its organizational strategy, is fundamental to its business model, and is essential to the long-term survival of the organization.",
      absent: "Strategic value, meaning help in improving the business so that it can compete better &mdash; and the chapter is blunt that a system delivering none of that, even while saving money, is not likely to be funded.",
      why: "It depends on the organization already having a strategy worth serving. Strategic planning happens at the executive level, and no system can supply the vision it is being built to carry out."
    },
    {
      icon: "VS",
      name: "The three compared",
      sub: "Why the order matters",
      what: "Three general ways an information system can provide value, which the chapter presents as progressively more useful to the firm and therefore as adding progressively more business value.",
      real: "One product can occupy all three at once: Uber automatically matches riders and drivers, learns preferences from past behavior, and builds its strategy on exactly those capabilities.",
      absent: "The chapter draws the comparison as three bars of business value added, where automating is the shortest bar, learning is taller, and strategizing is the tallest of the three.",
      why: "They are not mutually exclusive, so the real question is never which single rung a proposal belongs to but how far up it reaches, since a strategic system almost always automates and learns as well."
    }
  ]
};

ACT.alsLoanSteps = {
  kind: "order",
  label: "Sequence",
  title: "The loan application process, activity by activity",
  how: "Put the six primary activities into the order the loan table lists them, then read why each one sits where it does.",
  objective: "2.1",
  intro: "The table you just read runs the same six activities through three different processes. Getting the sequence straight is what makes the time savings legible, because each activity can only be shortened by the technology that touches it.",
  steps: [
    {
      t: "Complete and submit the loan application. Manually the customer takes the application home, completes it, and returns it in 1.5 days; in the fully automated process the customer fills it out from home via the web in 15 minutes.",
      why: "Nothing else can start until an application exists, and this is the only activity where the work sits with the customer rather than the bank, which is why moving it to the web removes a day and a half at a stroke."
    },
    {
      t: "Check the application for errors. An employee does this in batches over 2.5 days in both the manual and the technology-supported processes; the computer does it in 1 second as the form is being completed.",
      why: "Errors are caught before the data travel any further into the bank. Batching is what makes this take days rather than minutes, because a form waits for the batch it belongs to rather than for a person."
    },
    {
      t: "Input the data from the application into the information system. Paper handling takes about 1 hour in the manual process, an employee keys batches over 2.5 days in the technology-supported process, and no extra time is needed once the customer fills the form in online.",
      why: "This is the activity that gets worse before it gets better: the middle column costs 2.5 days where the manual process cost an hour, because a half-computerized process still needs somebody to type everything in."
    },
    {
      t: "Assess loan applications under $250,000 to determine whether to fund them. An employee does this completely by hand in 15 days, does it with the help of the computer in 1 hour, or the computer does it automatically in 1 second.",
      why: "This is the largest single saving in the table, falling from 15 days to 1 second, and it is the one activity where an actual funding decision was handed over to a machine rather than merely assisted by one."
    },
    {
      t: "The committee decides on any loan over $250,000, which takes 15 days in the manual, technology-supported, and fully automated processes alike.",
      why: "The table lists this immediately after the smaller-loan assessment because the two are alternative paths chosen by the size of the loan, which is why every total is given as a range. This is also the only row technology never touches."
    },
    {
      t: "The applicant is notified. Manually generated letters go out in batches over a week, computer-assisted letters take a day, and the fully automated system notifies the applicant by email in 1 second.",
      why: "A loan process is not finished when the decision is made but when the customer knows the decision, which is why a week of letter writing belonged in the manual total all along."
    }
  ]
};

ACT.alsQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Reading an automation table honestly",
  how: "Four options, one best answer; read every explanation, including the ones for the answers you did not choose.",
  objective: "2.1",
  questions: [
    {
      q: "Which activity in the loan table takes the same amount of time in the manual, technology-supported, and fully automated processes, and why does that matter?",
      opts: [
        "Checking the application for errors, because a person still has to read every form no matter how it arrives",
        "The committee decision on loans over $250,000, at 15 days in all three, because none of the three processes changed who makes that decision",
        "Notifying the applicant, because a decision still has to reach a human being at the other end",
        "Inputting the data into the information system, because entering an application takes as long as it takes"
      ],
      a: 1,
      why: [
        "Error checking is one of the activities that changes the most across the table: an employee does it in batches over 2.5 days in the first two processes, while the computer does it in 1 second as the form is being completed. This would be right only if a person still had to read each form.",
        "Correct. That row reads 15 days in every column, so the ceiling on the fully automated process &mdash; anywhere from 15 minutes to 15 days &mdash; is set by a decision reserved for people rather than by any limit of the technology.",
        "Notification changes in all three columns: letters generated manually in batches take a week, computer-assisted letters take a day, and the fully automated system emails the applicant in 1 second. The letter is precisely the part that disappeared.",
        "This activity does change, and unusually it moves in both directions: about an hour of paper handling in the manual process, 2.5 days of batch keying in the technology-supported process, and no extra time at all once the customer completes the form online."
      ]
    },
    {
      q: "Entering application data takes 2.5 days in the technology-supported process but only about an hour in the manual one. What is the accurate reading of that?",
      opts: [
        "The columns must be reversed, since a process that gained a computer should not take longer at that step than the paper one did",
        "In the manual process nothing is keyed in at all, since applications stay on paper, while the supported process needs somebody to key batches in",
        "The technology-supported process is checking each application far more thoroughly than the paper one ever did, and it is that extra scrutiny rather than the keying which takes the extra time",
        "The two processes handle different sizes of loan, so their times for this activity cannot fairly be compared"
      ],
      a: 1,
      why: [
        "It is reasonable to expect every row to improve, but the table reports what it reports: applications are kept in paper form with handling time in the manual process, and an employee keys batches for 2.5 days in the technology-supported one. Partly computerizing a process can create work where none existed.",
        "Correct. The hour in the manual column is handling paper, not data entry. Once a system exists but the customer is not filling it in directly, somebody has to type every application into it, and that work is done in batches.",
        "Checking the application for errors is a separate row of the table and takes 2.5 days in both the manual and the technology-supported processes, so the extra time here is not extra scrutiny. It is data entry that simply did not exist before.",
        "Loan size splits the assessment activity and the committee activity, not data entry, and the three columns describe three versions of one process rather than three kinds of loan. Every row is meant to be read straight across."
      ]
    },
    {
      q: "A manager says: &ldquo;Our new system lets each reviewer handle three times as many files a day at a lower cost per file. That is all I need to know.&rdquo; Which mentality is that, and what does the chapter say it leaves out?",
      opts: [
        "An automating mentality, and it leaves out whether the process being sped up is a sound one",
        "A learning mentality, and it leaves out how much the system costs the bank to run",
        "A strategic mentality, and it leaves out the return the investment will produce",
        "An automating mentality, and it leaves out how many employees the change will let the bank redeploy"
      ],
      a: 0,
      why: [
        "Correct. Automating aims at efficiency &mdash; accomplishing goals faster, at lower cost, or with relatively little time and effort &mdash; and the chapter warns that automating a flawed process with no learning built in can mask the problem while multiplying its effects.",
        "A learning mentality uses past behavior and data to improve the business process itself, and this manager has asked about neither. Cost is also the one thing he did mention, so it cannot be what is missing from his account.",
        "A strategic mentality asks how a system helps achieve the organization&rsquo;s chosen strategy and produces competitive advantage. Throughput and cost per file are efficiency measures, which the chapter places on the lowest rung rather than the strategic one.",
        "The first half is right and the second half is not. Redeploying employees more efficiently is part of the automating case, since the chapter names it as where the further cost savings come from, so adding that number makes the efficiency story fuller rather than answering whether the process being sped up is sound."
      ]
    }
  ]
};

ACT.alsPitch = {
  kind: "sim",
  label: "Decide",
  title: "Which ambition does this proposal actually serve?",
  how: "Work the four decisions in order, and after each one compare every outcome before moving on.",
  objective: "2.1",
  intro: "A hypothetical practice situation. You manage the loan department at a community bank, and four proposals land on your desk. For each one the question is not whether it is a good idea, but which of the three ways of adding value it actually serves &mdash; because that decides what you measure and who has to approve it.",
  steps: [
    {
      situation: "A vendor offers to replace the paper application with a web form customers complete at home, with the computer checking for errors as they type and the data flowing straight into the loan system with no separate keying.",
      opts: [
        {t: "Automating. It compresses activities the bank already performs, and the payoff is time and cost.", ok: true, out: "Right. Completing the application from home via the web, error checking as the form is filled in, and no separate data entry step are exactly the moves in the fully automated column of the loan table. Judge it on efficiency: faster, cheaper, fewer errors."},
        {t: "Organizational learning, because the applications will now sit in a database where they can be analyzed.", ok: false, out: "Storing data and learning from data are different things. Nothing in this proposal creates information about the underlying process &mdash; who applies when, or how the approved loans later perform &mdash; and nobody has been given a report. A database is a precondition for learning, not learning itself."},
        {t: "Supporting strategy, because customers will prefer a bank they can apply to from the sofa.", ok: false, out: "Convenience may well matter to customers, but nothing here ties it to a plan to gain or sustain advantage over rivals, and any competitor can buy a comparable web form. Labelling an efficiency project strategic is how a project ends up measured against the wrong target."}
      ]
    },
    {
      situation: "The same vendor offers a reporting add-on. It charts application types by date, month, and season, and tracks how the loans that were approved perform afterwards. It will not speed up a single approval by one minute.",
      opts: [
        {t: "Nothing worth funding, because a report does not process an application.", ok: false, out: "This is the mistake the chapter warns about most directly. Without learning it is more difficult to uncover a bad process underneath the system, so the bank would simply run the existing process faster. Reports are how a process gets examined at all."},
        {t: "Automating, because reporting is one more clerical task the computer takes over.", ok: false, out: "Efficiency is measured in time and cost, and this proposal saves neither by its own description. Judging it on approval speed would kill a proposal whose whole purpose is to tell you something you do not currently know."},
        {t: "Organizational learning, because it creates data about the process that can be used to change the process.", ok: true, out: "Right. The manager can now plan timely staffing and training, manage the funds used to fulfill loans, and study the patterns in the decisions made and the later performance of those loans. That is using past behavior and data to improve a business process."}
      ]
    },
    {
      situation: "Now the pressure. A consultant reports a finding in this hypothetical bank: the department approves applicants carrying a high level of debt as long as they have not been late on any payments recently, and those loans are performing badly. The vendor&rsquo;s throughput system would take each reviewer from four applications a day to twelve.",
      opts: [
        {t: "Deploy the throughput system now and revisit the acceptance criteria later, once the backlog is cleared.", ok: false, out: "This is the chapter&rsquo;s cautionary arithmetic. A reviewer working by hand under those criteria might accept two bad applications a week; automated to twelve applications a day, the same faulty process yields up to six bad ones a week. The technology serves only to magnify the existing business problem."},
        {t: "Fix the acceptance criteria first and install the reporting that would have exposed them, then raise throughput.", ok: true, out: "Right. Automating a loan process requires sound underlying business processes, and the learning layer is what surfaces the pattern &mdash; distinguishing low-performing from high-performing loans over their lives and changing the acceptance criteria accordingly."},
        {t: "Keep technology out of this department altogether, since automation is what produced the bad loans.", ok: false, out: "Automation did not write the criteria; it would only multiply their effect. Removing the technology leaves a flawed process in place and slow, and leaves nobody any way to see the pattern that would identify the flaw."}
      ]
    },
    {
      situation: "The executive committee will fund one write-up of the same project. Three drafts of the case sit in front of you.",
      opts: [
        {t: "&ldquo;It will cut our processing cost per application.&rdquo;", ok: false, out: "True, and on its own insufficient. This is a pure efficiency case, and the chapter states that a proposed system that does not clearly deliver strategic value as well is not likely to be funded in today&rsquo;s business environment."},
        {t: "&ldquo;It gives us same-day decisions on small loans, and lowers cost per application.&rdquo;", ok: true, out: "Right. Same-day decisions are built on the application and performance data the bank already holds, so the claim is one the committee can check. That reaches strategic value &mdash; helping the business compete better &mdash; while also helping people work smarter and saving money in the process, which is the combination the chapter says a proposal needs to be likely to be funded."},
        {t: "&ldquo;Every competitor is digitizing their loan process, so we cannot afford to be the last one.&rdquo;", ok: false, out: "This argues for parity, never for advantage, and it hands the bank&rsquo;s technology plan to its rivals. It also tells the committee nothing about what the system would do here or how anyone would know whether it worked."}
      ]
    }
  ]
};

ACT.alsQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Learning, strategy, and the funding test",
  how: "Three questions on the upper two rungs; the wrong answers are the ones people actually give in meetings.",
  objective: "2.1",
  questions: [
    {
      q: "What makes an information system produce organizational learning rather than mere speed?",
      opts: [
        "It stores considerably more data than the system it replaced, since learning is a matter of volume",
        "It creates data about the underlying business process that can be used to monitor, control, and change that process",
        "It removes human judgment from the process, so that the decisions come out consistent",
        "It operates at the executive level of the organization rather than the managerial level"
      ],
      a: 1,
      why: [
        "Volume by itself changes nothing, because an automated process also generates data and the question is what the data are about and whether anyone analyzes them. A bigger database nobody examines teaches an organization exactly as much as a smaller one.",
        "Correct. That is the chapter&rsquo;s own test, and the loan example shows it working: trends by season, the patterns of the decisions that were made, and the later performance of those loans, all of which can change how applications are evaluated.",
        "Consistency is one of the benefits claimed for automating, not for learning, and the chapter&rsquo;s learning example depends on a manager reading trends and acting on them. A system that removed the judgment would leave nothing to improve.",
        "The chapter places the learning-focused loan processing system at the managerial level, where midlevel managers monitor and control operational activity. Which level a system serves is a separate question from whether it produces learning."
      ]
    },
    {
      q: "In the chapter&rsquo;s illustration, a reviewer working by hand under flawed acceptance criteria handles four applications a day and inadvertently accepts about two bad ones a week. The same faulty process is automated so that the reviewer handles twelve a day. What follows?",
      opts: [
        "Up to six bad applications a week are accepted, because the technology serves only to magnify the existing business problem",
        "Bad acceptances stay near two a week, because the criteria were the problem and the criteria did not change",
        "Bad acceptances fall, because a computer applies the criteria more consistently than a tired reviewer does",
        "It cannot be worked out from the illustration, because tripling the number of files reviewed says nothing about how many of the extra files were bad ones"
      ],
      a: 0,
      why: [
        "Correct. Three times the throughput under the same bad criteria produces up to three times the bad loans, which is why automating a process requires sound underlying business processes or the errors rapidly increase.",
        "The criteria did not change, which is why the failure rate per application does not improve &mdash; but the number of applications reviewed tripled, so the count of bad acceptances rises with it. Holding the total steady would require the system to catch what the criteria miss.",
        "Consistency is a real benefit of automation, and it is beside the point when the rules being applied consistently are the wrong rules. Applying a flawed criterion identically every time simply produces flawed results faster.",
        "The illustration deliberately holds the criteria and the applicant mix constant so that only throughput changes, which is how it arrives at up to six bad acceptances a week &mdash; three times the volume run through the same flawed rules, drawn as cumulative errors climbing as automation increases."
      ]
    },
    {
      q: "A project team proposes a system that will clearly cut cost per transaction but has no answer to how it helps the company compete. What does the chapter say about its prospects?",
      opts: [
        "It will be funded, because cost reduction is the most reliable justification an information system can offer",
        "It is not likely to be funded, because a proposal is expected to deliver strategic value as well as helping people work smarter and save money",
        "It is not likely to be funded, because a proposal is expected to show competitive advantage instead of cost savings",
        "It will be funded, because the strategic value of a system only becomes clear once the system is running"
      ],
      a: 1,
      why: [
        "Cost reduction is genuine value and it is the automating rung, which the chapter treats as the least of the three ways of adding value. It is not presented as the strongest case a proposal can make in today&rsquo;s business environment.",
        "Correct. The chapter states the test directly: a system that will not clearly deliver strategic value, meaning help to improve the business so that it can compete better, while also helping people work smarter and save money, is not likely to be funded.",
        "The conclusion is right and the reasoning is not. The chapter&rsquo;s test asks for strategic value while also helping people to work smarter and save money, so cost savings are half of what a proposal is expected to show rather than the wrong sort of argument.",
        "Strategy is set in advance through strategic planning, in which executives form a vision, convert it into measurable objectives and performance targets, and craft a strategy to reach them. Discovering the strategic value afterwards is what the funding test exists to prevent."
      ]
    }
  ]
};
