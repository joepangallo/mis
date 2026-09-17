/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s72a = "\n<span class=\"eyebrow\">Objective 7.2 &middot; Part 1</span>\n<h2>Measures, dimensions, and the cube</h2>\n<p class=\"lede\">The chief financial officer of Fairmount Provisions &mdash; an invented regional food and household goods distributor running forty depots &mdash; has four questions and a spreadsheet that answers none of them. Last year&rsquo;s sales sit in a cube: four product lines, four regions, four quarters, and two measures, revenue and gross margin, both in thousands of dollars. Sixty-four numbers for each measure, which is a hundred and twenty-eight numbers more than anyone can hold in their head.</p>\n<h3>A decision support system is a model you can argue with</h3>\n<p>Start with the older tool, because the cube sits inside it. A <b>decision support system (DSS)</b> analyses structured data to support decision making, which is descriptive analytics. Modern ones reach a little way into predictive analytics as well.</p>\n<p>A DSS is an interactive decision aid that uses <b>models</b> to manipulate data. A model here is a formula, not a machine learning model. Take an average of past sales and adjust it for seasonal change: that formula is the model. A more complicated one might use time-series analysis or linear regression.</p>\n<p>Once a manager has a formula they can interrogate, there are four ways to interrogate it:</p>\n<ul class=\"keys\"><li><b>What-if analysis</b> makes a hypothetical change to an input, such as a loan duration or an interest rate, and shows how the result moves.</li><li><b>Sensitivity analysis</b> weighs each input by how likely it is to occur, so a one-in-four chance and a three-in-four chance do not count the same.</li><li><b>Goal seeking</b> fixes the end state you want and works backwards to the input value that would produce it.</li><li><b>Optimisation</b> finds the best balance between several parameters inside the constraints you are genuinely under.</li></ul>\n<p>Keep the limits in view. A decision support system handles relatively simple analyses of structured data, usually pulled from transaction processing systems, and what it produces is input to a decision. Human judgement still makes the final one.</p>\n<h3>Online analytical processing</h3>\n<p><b>Online analytical processing (OLAP)</b> is the process of quickly running complex, multidimensional analyses of data held in a database that is optimised for retrieval. The questions are ad hoc, and they go past the summaries and aggregations an ordinary database query returns.</p>\n<p>The shape to remember is the sort of question the chapter calls typical: what were the profits for each week last year, by sales region and customer type? That question carries one measure and three dimensions. A two-dimensional table cannot hold it, and a multidimensional query against a large transactional database used to take hours.</p>\n<p>Three pieces of machinery bring the answer back while the meeting is still running:</p>\n<ul class=\"keys\"><li><b>The OLAP server</b> knows how the data are organised in the database and carries special functions for analysing them.</li><li><b>Pre-aggregation</b> works the totals out in advance, so a query extracts only the subset of data it actually needs.</li><li><b>In-memory computing</b> holds the data in a computer&rsquo;s main memory rather than on a comparatively slow hard drive.</li></ul>\n<p>Fairmount&rsquo;s cube reads off a disk, and every query takes about 4.1 seconds. Moving it into memory costs $200,000 and brings that to 0.3 seconds. Nothing about the questions changes. What changes is that the third follow-up question in a meeting gets asked at all, and the third one is usually the one that matters.</p>\n<h3>Measures and dimensions</h3>\n<p>OLAP separates two things a flat table mixes together. <b>Measures</b>, sometimes called facts, are the values you want to analyse: sales revenue, the number of orders placed. <b>Dimensions</b> are the ways you summarise them: region, time, product line, distributor.</p>\n<p>Said in one line: revenue is a measure, region is a dimension, and you add the first up <b>by</b> the second. Getting that backwards is how a cube ends up with a design nobody can query. Fairmount&rsquo;s cube names its parts plainly:</p>\n<ul class=\"keys\"><li><b>Two measures</b> are carried here, revenue and gross margin, both stated in thousands of dollars.</li><li><b>Three dimensions</b> organise them: the product line, the region, and the quarter of the trading year.</li><li><b>Members</b> are the individual values inside a dimension, so chilled, the West and Q3 are each one member.</li><li><b>Hierarchies</b> run inside a dimension, which is what lets a user move between years, quarters, months and days.</li></ul>\n<p>The hierarchy is why a dimension is more than a list. Analysing sales by geography, you can drill down from state to county to city to the individual store, or roll up from state to sales region, to country, to continent. Time behaves the same way.</p>\n<div class=\"activity\" data-activity=\"cubeSort\"></div>\n<h3>The four moves</h3>\n<p>Dimensions organised as hierarchies give you four things to do with a cube, and each one has a name worth keeping:</p>\n<ul class=\"keys\"><li><b>Roll up</b> includes every member of a dimension so it disappears into a total, and four quarters become a year.</li><li><b>Drill down</b> puts a dimension back on an axis so its members show separately, and a state becomes its cities.</li><li><b>Slice</b> fixes one dimension to a single member, so everything on the screen is Q2, or everything is the West.</li><li><b>Dice</b> narrows several dimensions at once, pulling a smaller block out of the middle of the cube.</li></ul>\n<p>Now watch what those moves buy you. Slice the cube to chilled goods, roll the four quarters up into a full year, lay the regions down the side, then read the same cut twice, once for each measure.</p>\n<div class=\"tbl-wrap\"><table class=\"tbl\"><thead><tr><th>Chilled, full year</th><th>Revenue ($000)</th><th>Gross margin ($000)</th></tr></thead><tbody><tr><td>North</td><td>1,681</td><td>184</td></tr><tr><td>South</td><td>1,456</td><td>190</td></tr><tr><td>East</td><td>1,222</td><td>196</td></tr><tr><td>West</td><td>1,075</td><td>97</td></tr></tbody></table></div>\n<p>The North sells the most chilled. The East earns the most on it. Same dimensions, same slice, one measure swapped, and the answer reverses. A dashboard that only ever showed revenue would have sent the sales effort north, and nobody would have seen the mistake.</p>\n<p>The West row is the second lesson. It turns over $1,075,000 of chilled goods and keeps $97,000 of it, a little over nine cents in the dollar against sixteen in the East. That is a pricing or a freight question, and a revenue report cannot see it.</p>\n<div class=\"activity\" data-activity=\"cubeMatch\"></div>\n<h3>Pulling a block out of the middle</h3>\n<p>Dicing is the move students most often fudge, so do it on numbers rather than on a definition. The case below hands you two product lines, two regions and two quarters: eight cells lifted out of a sixty-four-cell cube, and three different questions waiting inside them.</p>\n<div class=\"activity\" data-activity=\"cubeCase\"></div>\n<p class=\"takeaway\">Ask what is being added up, and what it is being added up by. The first is your measure, the second is your dimension, and every move in this section &mdash; roll up, drill down, slice, dice &mdash; is a decision about how much of a dimension you leave switched on.</p>\n";

ACT.cubeSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Measure, dimension, or member?",
  "objective": "7.2",
  "how": "Drop each item into what a cube would call it, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "meas",
      "name": "Measure",
      "hint": "A value you want to analyse. It is the thing that gets added up."
    },
    {
      "id": "dim",
      "name": "Dimension",
      "hint": "A way of summarising a measure. It is the thing you add up by."
    },
    {
      "id": "mem",
      "name": "Member",
      "hint": "One individual value sitting inside a dimension."
    }
  ],
  "items": [
    {
      "t": "Revenue, in thousands of dollars",
      "b": "meas",
      "why": "Revenue is a value the analysis adds up, which is what the chapter means by a measure."
    },
    {
      "t": "Gross margin, in thousands of dollars",
      "b": "meas",
      "why": "Margin is the second value Fairmount's cube stores in every cell, so it is a measure like revenue."
    },
    {
      "t": "The number of orders placed",
      "b": "meas",
      "why": "The chapter names the number of orders placed as a measure; it is counted, not used to group."
    },
    {
      "t": "Product line",
      "b": "dim",
      "why": "Product line is a way of summarising revenue, so it is a dimension rather than a value."
    },
    {
      "t": "Region",
      "b": "dim",
      "why": "Region is one of the chapter's own examples of a dimension, alongside time and product line."
    },
    {
      "t": "Quarter of the trading year",
      "b": "dim",
      "why": "Time is a dimension, and quarter is a level in its hierarchy of year, quarter, month and day."
    },
    {
      "t": "Distributor",
      "b": "dim",
      "why": "The chapter lists distributor among the dimensions sales revenue can be analysed by."
    },
    {
      "t": "Chilled",
      "b": "mem",
      "why": "Chilled is one of the four values inside the product line dimension, so it is a member of it."
    },
    {
      "t": "The West",
      "b": "mem",
      "why": "The West is one value inside the region dimension, which is what you fix when you slice."
    },
    {
      "t": "Q3",
      "b": "mem",
      "why": "Q3 is a single member of the quarter dimension, not the dimension itself."
    }
  ]
};

ACT.cubeMatch = {
  "kind": "match",
  "label": "Match",
  "title": "The question, and the cut that answers it",
  "objective": "7.2",
  "how": "Match each question the chief financial officer asks to the cut of the cube that answers it, then check. Every figure comes from the invented cube in this section.",
  "pairs": [
    {
      "l": "What did we bill on frozen goods in the West in Q3?",
      "r": "Slice each of the three dimensions to one member in turn",
      "why": "Fixing product to frozen, region to West and quarter to Q3 leaves one cell, and it holds $292,000."
    },
    {
      "l": "Which region sells the most chilled across the whole year?",
      "r": "Roll the quarters up, slice to chilled, and read revenue",
      "why": "Rolling up folds the four quarters into a year total, and the North leads on $1,681,000 of revenue."
    },
    {
      "l": "Which region earns the most on chilled across the whole year?",
      "r": "Roll the quarters up, slice to chilled, and read gross margin",
      "why": "Same dimensions and same slice, different measure, and the East wins on $196,000 of gross margin."
    },
    {
      "l": "How did chilled and frozen do in the North and East over Q2 and Q3?",
      "r": "Dice all three dimensions down to two members each",
      "why": "Narrowing three dimensions at once lifts an eight-cell block worth $2,429,000 out of the middle."
    },
    {
      "l": "The year looks flat. Was one quarter to blame, or one region?",
      "r": "Drill the year back down into its four quarters",
      "why": "Putting the quarter dimension back on an axis shows the members a rolled-up total was hiding."
    }
  ]
};

ACT.cubeCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Eight cells out of sixty-four",
  "objective": "7.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical distributor and every figure below is invented. Merchandising believes the chilled and frozen lines were carried by the North and East depots through the middle of last year, and wants that block pulled out of the cube before it rearranges a single pick-face.",
  "facts": [
    {
      "k": "The full cube",
      "v": "4 product lines by 4 regions by 4 quarters"
    },
    {
      "k": "Measures carried",
      "v": "Revenue and gross margin, both in $000"
    },
    {
      "k": "The cut requested",
      "v": "Chilled and frozen, North and East, Q2 and Q3"
    },
    {
      "k": "Cells in the block",
      "v": "8 of the cube's 64"
    }
  ],
  "exhibit": {
    "name": "The diced block, revenue in $000",
    "caption": "Two product lines, two regions and two quarters, lifted out of the invented cube.",
    "headers": [
      "Product line and region",
      "Q2",
      "Q3",
      "Block total"
    ],
    "rows": [
      [
        "Chilled, North",
        "435",
        "467",
        "902"
      ],
      [
        "Chilled, East",
        "316",
        "340",
        "656"
      ],
      [
        "Frozen, North",
        "220",
        "237",
        "457"
      ],
      [
        "Frozen, East",
        "199",
        "215",
        "414"
      ],
      [
        "All four rows, totalled",
        "1,170",
        "1,259",
        "2,429"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which OLAP move selected these eight cells out of the full sixty-four-cell cube?",
      "opts": [
        "Dicing, because three dimensions were each narrowed to a subset at once.",
        "Slicing, because a dimension was pinned to one member and held there.",
        "Rolling up, because a block total gathers the four separate rows together.",
        "Drilling down, because the cube was opened out to show every member."
      ],
      "a": 0,
      "why": [
        "Product, region and quarter were each narrowed to two members, and narrowing several at once is dicing.",
        "A slice fixes one dimension to a single member, but three dimensions were narrowed here.",
        "Rolling up totals members together; it cannot choose which eight cells appear in the first place.",
        "Drilling down adds members back to an axis; this exhibit took members away instead."
      ]
    },
    {
      "q": "Merchandising wants one number for chilled across both regions and both quarters. What is it?",
      "opts": [
        "$871,000, which is the two frozen rows added together.",
        "$1,558,000, which is the two chilled rows added together.",
        "$1,170,000, which is the whole block in the second quarter.",
        "$2,429,000, which is every cell in the block added up."
      ],
      "a": 1,
      "why": [
        "That is the frozen pair, 457 plus 414, which answers a completely different question.",
        "Chilled North at 902 plus chilled East at 656 rolls both region and quarter up into one figure.",
        "The Q2 column covers both product lines, so it mixes frozen figures into a chilled question.",
        "The block total includes the frozen rows as well, which overstates the chilled answer badly."
      ]
    },
    {
      "q": "The Q2 and Q3 columns total $1,170,000 and $1,259,000. What can you conclude from that pair?",
      "opts": [
        "The West depots recovered, because the block total rose from Q2 to Q3.",
        "The frozen rows drove the rise, since they gained more than the chilled rows did.",
        "The block billed $89,000 more in Q3 than in Q2, and nothing says why.",
        "Gross margin improved in Q3, since higher revenue carries higher margin."
      ],
      "a": 2,
      "why": [
        "Dicing cut the West out of this block, so nothing in these eight cells says anything about it.",
        "Chilled gained 56 across its two rows and frozen only 33, so chilled moved the block.",
        "Subtracting 1,170 from 1,259 gives the change, and a cube reports a change without explaining it.",
        "Margin is a different measure and is not in this exhibit, so it cannot be read off these columns."
      ]
    },
    {
      "q": "The CFO now wants the same eight cells shown as gross margin instead of revenue. What has to change?",
      "opts": [
        "The dimensions have to be recut, because margin uses a different set of them.",
        "Nothing changes, because margin is a fixed percentage of the revenue shown.",
        "The block has to be rolled up first, because margin is stored as a total.",
        "Only the measure changes; the same cut of the three dimensions holds."
      ],
      "a": 3,
      "why": [
        "A cube stores both measures against the same dimensions, so the cut does not have to move.",
        "Margin varies by product and region: chilled in the West keeps nine cents in the dollar, the East sixteen.",
        "Margin is held cell by cell exactly as revenue is, so those eight cells can be read directly.",
        "Measures and dimensions are separate parts of the cube, so one can be swapped without touching the other."
      ]
    }
  ],
  "debrief": "Eight cells, and three different questions came out of them. The cut is a decision, not a formatting choice: roll the quarters up and the $89,000 that arrived in Q3 disappears, slice to chilled and the frozen rows stop diluting the answer. Swap the measure and the dimensions stay exactly where you left them."
};
