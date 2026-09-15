/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s65 = "\n<span class=\"eyebrow\">Application supplement 6.5</span><h2>Recommend one data initiative</h2>\n<p class=\"lede\">A manager needs a decision about what to fund, why it matters, and how success will be judged. This closing application brings together a data problem, competitive pressure, two value-chain opportunities, and one recommendation supported by numbers.</p>\n<div class=\"callout info\"><b>Application supplement.</b> All firms, conditions, and figures in this section are hypothetical. The practice extends Chapter 6 into a strategy recommendation; it is not another textbook objective. The spreadsheet below runs locally and illustrates decision support rather than completing a full spreadsheet or database application.</div>\n<h3>Read the conditions before choosing a tool</h3>\n<p>Imagine a regional seller of replacement equipment parts. Its customers compare several similar sellers and often need immediate availability. Repairing an existing part can sometimes replace buying another. New sellers can rent storefront software, but acquiring reliable catalog mappings and a stocked local range takes time.</p>\n<p>The seller also depends on one supplier for a hard-to-replace product range. Its own duplicate product identifiers cause receiving discrepancies and customer-support investigations. Those are internal data failures. They affect its response to competitive pressure, but they do not themselves establish how much bargaining power a supplier has.</p>\n<p>Begin with an evidence statement for every force. The hypothetical case supports these starting interpretations:</p>\n<ul class=\"keys\"><li><b>Rivalry is high</b> because several comparable sellers compete on availability and price; service reliability is a plausible way to respond.</li><li><b>Buyer power is high</b> because customers can compare alternatives and move purchases readily when availability claims fail.</li><li><b>Supplier power is high</b> for the specialized range because credible replacement sources are scarce, regardless of whether the current supplier delivers reliably.</li><li><b>Entry pressure is moderate</b> because software is accessible but local stock and trustworthy catalog mappings require additional effort.</li><li><b>Substitution pressure is moderate</b> because repair meets some customers' needs, though it cannot replace every required part purchase.</li></ul>\n<p>These are reasoned ratings within the assumed conditions, not universal facts about parts retailing. A real analysis would investigate margins, customer concentration, switching behavior, entry costs, and repair alternatives. State where evidence is missing instead of converting an assumption into an observed fact.</p>\n<div class=\"activity\" data-activity=\"planCase\"></div>\n<h3>Work the evidence yourself</h3>\n<p>The spreadsheet separates the two activity-level benefits. Enter formulas for row 2 and the lab applies them down the rows. Column letters and row references work like a filled-down sheet. The exercise uses invented estimates, so its purpose is to make the arithmetic and assumptions inspectable.</p>\n<p>Estimated saved hours equal hours before minus hours after. Multiplying by an hourly value estimates released capacity. That time becomes financial savings only if spending actually falls or the capacity produces additional useful output. Subtracting operating cost does not turn an estimate into a realized result.</p>\n<div class=\"activity\" data-activity=\"planFormula\"></div>\n<h3>Specify a pilot somebody can evaluate</h3>\n<p>The recommendation needs an owner, boundary, baseline, target, review time, and safeguards. Name the receiving and service teams responsible for measuring outcomes. Give product-data ownership to a person empowered to settle definition conflicts. A vendor cannot make those business decisions merely by configuring a database.</p>\n<p>A reviewable pilot defines what happens if the evidence is weaker than expected:</p>\n<ul class=\"keys\"><li><b>Scope</b> starts with a defined product range and the mappings used by receiving and service, making it possible to trace changes.</li><li><b>Measures</b> compare correction hours and support investigation hours using a consistent workload denominator and equivalent reporting periods.</li><li><b>Guardrails</b> check order accuracy, processing time, appropriate access, and visible handling of unresolved product matches.</li><li><b>Decision rule</b> sets a review after eight weeks and requires useful time savings without worse order accuracy before extending the rollout.</li></ul>\n<div class=\"activity\" data-activity=\"planSim\"></div>\n<p>If comparing another organization, compare a mechanism rather than its size or reputation. Describe how its data supports a relevant activity, what pressure that helps it answer, and whether the conditions transfer. Finish by identifying what your focal firm should adapt or decline and why.</p>\n<div class=\"activity\" data-activity=\"planReady\"></div>\n<h3>Separate one-time and recurring costs</h3><p>The case's $2,000 setup cost occurs once; the $300 operating cost recurs monthly. Report both. Under the full estimate, net monthly capacity value is $2,700; under half realization, it is $1,200. Comparing these estimates with setup cost is useful, but a cash payback claim requires evidence that the released time creates actual financial benefit.</p><p class=\"takeaway\">A strong recommendation connects evidence, competitive pressure, value-chain work, and one measurable change. Treat its costs and benefits as testable estimates, and make the next decision depend on what the pilot actually shows.</p>\n";

ACT.planCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One budget, two places to create value",
  "objective": "6.5",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical parts seller can fund one initial improvement. Product IDs differ across purchasing, receiving, and service. Managers propose either cleaning the shared product master, replacing the website theme, or collecting more social posts. A pilot estimate suggests shared identifiers could reduce both receiving corrections and repeat support investigations.",
  "facts": [
    {
      "k": "One-time pilot cost",
      "v": "$2,000"
    },
    {
      "k": "Monthly operating cost",
      "v": "$300"
    },
    {
      "k": "Pilot scope",
      "v": "One shared product master and its downstream mappings"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Process",
      "Monthly hours before",
      "Estimated hours after",
      "Hourly value"
    ],
    "rows": [
      [
        "Receiving corrections",
        "100",
        "40",
        "$25"
      ],
      [
        "Support reinvestigation",
        "80",
        "30",
        "$30"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which two value-chain activities directly benefit?",
      "opts": [
        "Procurement and marketing and sales.",
        "Technology development and human resource management.",
        "Firm infrastructure and procurement only.",
        "Inbound logistics and service."
      ],
      "a": 3,
      "why": [
        "Selecting suppliers and reaching customers are not the two measured workflows in this exhibit.",
        "The rows measure receiving corrections and customer support, not design work or workforce development.",
        "Shared governance supports the pilot, but the measured benefits occur in the operating workflows.",
        "Receiving corrections belong to inbound logistics, while after-sale support investigation belongs to service."
      ]
    },
    {
      "q": "Which initial recommendation follows most directly from this evidence?",
      "opts": [
        "Pilot shared product IDs across receiving and service.",
        "Replace the website’s colors and measure visitor counts.",
        "Retain more social posts and measure stored gigabytes.",
        "Buy every proposed tool and compare login frequency."
      ],
      "a": 0,
      "why": [
        "One governed master with downstream mappings addresses the common cause in both measured workflows.",
        "A visual change does not resolve the identifier conflicts producing the documented labor costs.",
        "More social data does not repair product identity within the current operating systems.",
        "Combining unrelated purchases makes cost and causal attribution harder while ignoring the one-initiative scope."
      ]
    },
    {
      "q": "What is the estimated monthly net capacity value after operating cost?",
      "opts": [
        "$3,000 per month.",
        "$2,700 per month.",
        "$700 per month.",
        "$300 per month."
      ],
      "a": 1,
      "why": [
        "Three thousand is the gross value of released time before subtracting the monthly operating cost.",
        "Receiving releases $1,500 and service releases $1,500; subtracting $300 leaves $2,700.",
        "Seven hundred mixes the one-time implementation cost into a recurring monthly measure.",
        "Three hundred is the operating expense, rather than the value remaining after that expense."
      ]
    }
  ],
  "debrief": "The projected benefit is $3,000 of monthly staff capacity, or $2,700 after operating cost. These are estimates of released time, not guaranteed cash savings. One coordinated product-master pilot addresses both activities; success requires data ownership, mappings, training, and measurement as well as technology."
};

ACT.planFormula = {
  "kind": "formula",
  "label": "Spreadsheet lab",
  "title": "Calculate the benefit and its sensitivity",
  "objective": "6.5",
  "how": "Write a formula for row 2 in each target column, then run it. The formula fills down both hypothetical rows. The final task assumes only half of the forecast time saving occurs.",
  "headers": [
    "Activity",
    "Hours before",
    "Hours after",
    "Hourly value",
    "Hours released",
    "Gross capacity value",
    "Value at 50% realization"
  ],
  "data": [
    [
      "Inbound logistics",
      100,
      40,
      25,
      "",
      "",
      ""
    ],
    [
      "Service",
      80,
      30,
      30,
      "",
      "",
      ""
    ]
  ],
  "tasks": [
    {
      "column": 4,
      "prompt": "Column E: calculate monthly hours released from B and C.",
      "expect": "=B2-C2",
      "hint": "Subtract estimated after hours in C from before hours in B.",
      "explain": "The estimates release 60 receiving hours and 50 service hours each month."
    },
    {
      "column": 5,
      "prompt": "Column F: calculate the gross monthly capacity value using the original B, C, and D inputs.",
      "expect": "=(B2-C2)*D2",
      "hint": "Multiply the hours difference by the hourly value in D.",
      "explain": "Each row produces $1,500, totaling $3,000 before the separate $300 monthly operating cost."
    },
    {
      "column": 6,
      "prompt": "Column G: calculate capacity value if only 50% of the projected hours are released. Use B, C, and D.",
      "expect": "=(B2-C2)*D2*0.5",
      "hint": "Compute the original capacity value, then multiply by 0.5.",
      "explain": "Each row falls to $750. Total value becomes $1,500, or $1,200 after the unchanged $300 operating cost. The benefit remains an estimate and depends on useful redeployment of staff time."
    }
  ]
};

ACT.planSim = {
  "kind": "sim",
  "label": "Decision walkthrough",
  "title": "Make the pilot decisions",
  "objective": "6.5",
  "how": "Choose an action at each stage of the hypothetical pilot. Compare the consequences before proceeding.",
  "intro": "The shared product master is ready for a small rollout, but operational decisions still determine whether it creates value.",
  "steps": [
    {
      "situation": "Two similar product codes may refer to different package sizes. What should happen?",
      "opts": [
        {
          "t": "Merge by similar names to speed the rollout.",
          "ok": false,
          "out": "A name match can combine different units and cause incorrect receiving and shipment quantities."
        },
        {
          "t": "Have the product owner verify size and unit before mapping.",
          "ok": true,
          "out": "The owner resolves meaning first; uncertain mappings remain visible rather than being silently accepted."
        },
        {
          "t": "Exclude all product identifiers from future reports.",
          "ok": false,
          "out": "Removing identifiers makes it harder to trace the transactions and does not settle the mismatch."
        }
      ]
    },
    {
      "situation": "After four weeks, total correction hours fell, but order volume also fell. What is the next analysis?",
      "opts": [
        {
          "t": "Declare the pilot successful from the lower total.",
          "ok": false,
          "out": "Lower workload can reduce total hours even when the process has not improved."
        },
        {
          "t": "Ignore the baseline because the new master is cleaner.",
          "ok": false,
          "out": "Cleaner records are useful, but the stated business benefit still requires an outcome comparison."
        },
        {
          "t": "Compare correction hours per 1,000 comparable orders.",
          "ok": true,
          "out": "A consistent denominator helps distinguish workload change from process improvement; also check the case mix."
        }
      ]
    },
    {
      "situation": "The pilot releases time, but order errors increase. What should the team do?",
      "opts": [
        {
          "t": "Investigate and correct the mappings before expanding.",
          "ok": true,
          "out": "Order accuracy is a guardrail. Faster incorrect processing fails the customer promise and can destroy the estimated benefit."
        },
        {
          "t": "Expand because the cost estimate is still positive.",
          "ok": false,
          "out": "The estimate omitted the new cost of errors, so it is no longer a sufficient basis for rollout."
        },
        {
          "t": "Stop measuring errors until the staff become familiar.",
          "ok": false,
          "out": "Hiding an adverse outcome prevents the team from finding whether mappings or training need correction."
        }
      ]
    }
  ]
};

ACT.planReady = {
  "kind": "selfcheck",
  "label": "Readiness check",
  "title": "Can you defend the recommendation?",
  "objective": "6.5",
  "how": "Mark the statements you can explain without notes. Use each hint to revisit a weak area.",
  "items": [
    {
      "t": "I can trace the transaction data from source to business decision.",
      "hint": "Revisit the data-flow diagrams and identify the owner of each handoff."
    },
    {
      "t": "I can distinguish keys, normalization, and MDM using the case.",
      "hint": "Revisit the order model and the supplier-reconciliation sequence."
    },
    {
      "t": "I can justify all five force ratings within a stated industry boundary.",
      "hint": "Revisit the starting interpretations and name the assumptions behind each rating."
    },
    {
      "t": "I can name two distinct value-chain activities and their measurable outcomes.",
      "hint": "The case measures inbound logistics and service, with different process owners."
    },
    {
      "t": "I can defend one initiative, its estimated value, and a downside scenario.",
      "hint": "Use the product-master case and the spreadsheet’s 50% realization column."
    },
    {
      "t": "I can state an owner, review date, and reason to pause expansion.",
      "hint": "Use the pilot decision walkthrough and the order-accuracy guardrail."
    }
  ]
};

