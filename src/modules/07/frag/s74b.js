/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s74b = "\n<span class=\"eyebrow\">Objective 7.4 · Part 2</span><h2>Geographic information systems</h2>\n<p class=\"lede\">Fairmount Provisions, the invented distributor you have been running through this module, has approved a forty-first depot and narrowed the choice to three sites. The property team sent the district map with every layer switched off. That is the honest way to send one, and it is also the dangerous way: a site looks excellent until the layer that disqualifies it is turned on, and nobody turns on a layer they have not thought of.</p>\n<h3>Location as a dimension of analysis</h3>\n<p>A <b>geographic information system (GIS)</b> is a system for creating, storing, analyzing, and managing geographically referenced data. It does not replace the reporting and the models from earlier in this chapter. It adds a spatial dimension to them, so that a characteristic of a place can be coupled with your own records and queried alongside them. The chapter also calls this <b>location analytics</b>, or location intelligence.</p>\n<p>The coupling is the whole idea. A GIS can link the square footage of a commercial property to its exact latitude and longitude, then pair that with population density, average incomes, travel accessibility such as highways and major thoroughfares, or proximity to services such as fire, police, and public transportation stops.</p>\n<p>You already use one. When you search for a restaurant near you, the map or satellite image is geographic data, and the name, address, opening hours, and reviews are attribute data about that same point.</p>\n<p>Most of the questions a distributor asks have a spatial dimension hiding inside them:</p>\n<ul class=\"keys\"><li><b>Where the customers are</b> is answered by geocoding survey answers or captured postcodes into coordinates and adding them to the map as a layer.</li><li><b>Where the next depot goes</b> is a siting question, and a GIS used to model one is working as a <b>spatial decision support system</b>.</li><li><b>Which areas go in the next mailing</b> turns on which districts are underserved, not on how many names sit on the list.</li><li><b>How far a buyer will travel</b> is a question about drive time rather than distance, and the two disagree badly wherever a river does.</li></ul>\n<h3>Layers, and the one nobody switched on</h3>\n<p>A GIS hands you a blank map of an area. You then add data stored in <b>layers</b>, each one resembling a transparency holding a single kind of information about the same ground. Adding and removing layers is how a question with a spatial dimension actually gets answered.</p>\n<p>The five layers that came with the depot map are ordinary ones, and each can decide the case on its own:</p>\n<ul class=\"keys\"><li><b>Population density</b> shades each district by how many people live on each square kilometer of it.</li><li><b>Arterial road access</b> draws the main roads, because a depot a loaded truck cannot leave at six in the morning is not a depot.</li><li><b>Twenty-minute drive time</b> rings each candidate with the ground a truck can actually reach inside twenty minutes.</li><li><b>Competitor depots</b> marks the rivals already serving that ground, which is how you learn that a promising ring is somebody else's.</li><li><b>Floodplain</b> outlines the ground that goes under water, and in this case it is the layer that quietly decides everything.</li></ul>\n<p>Those rings have a name. <b>Trade area analysis</b> combines location information with drive time to work out where customers can come from and in how long, whether an area is underserved, and whether two of your own sites overlap so far that one is eating the other.</p>\n<div class=\"activity\" data-activity=\"gisDiagram\"></div>\n<h3>Quantities against densities</h3>\n<p>Another way to show geospatial data is a <b>thematic map</b>, which color-codes data aggregated for specific geographic regions: median household income by block, average household size, or the blocks where car theft happens most often.</p>\n<p>This is also where a thematic map will mislead you. There is a difference between a <b>quantity</b> and a <b>density</b>. A quantity is how many orders a district placed. A density is how many orders it placed per square kilometer of itself.</p>\n<p>Last year's Fairmount order counts make the gap concrete. Postcode 47 placed 2,980 orders, more than any other district on the map. Postcode 52 placed 860, the fewest of the four. Now divide by the ground each one covers: 47 sprawls over 149 square kilometers and works out at 20.0 orders per square kilometer, the thinnest of the four; 52 is packed into 8 and works out at 107.5.</p>\n<p class=\"takeaway\">A count mapped raw mostly shows you where the people are. The largest district wins on quantity and can still be the emptiest ground on the map, which is how a delivery round ends up covering the most kilometers to reach the fewest customers. A rate — per square kilometer, or per head — is usually the honest layer.</p>\n<div class=\"activity\" data-activity=\"gisCase\"></div>\n<h3>What the map will not tell you</h3>\n<p>A map makes a pattern visible. It does not explain it. A cluster of cancelled orders on the east side is a fact about where the cancellations are. The reason could be a competitor's new price list, a closed bridge, or one driver who keeps arriving after the kitchen has started service. The map narrows the question to a few streets. Somebody still has to go and answer it.</p>\n<p>Three further uses are worth knowing, because all three are already in the field:</p>\n<ul class=\"keys\"><li><b>Aerial imagery</b> from satellites and drones is now classified by machine learning, which handles land and soil judgements that resist a clean yes or no.</li><li><b>Location data from phones and sensors</b> supports analysis that was not possible before, such as estimating the traffic on a road from how the devices moving along it behave.</li><li><b>Map-based communication</b> points the same output outward, in a store locator or a map of where an expansion is going, for people who will never open the analytics tool.</li></ul>\n<p>That is the range of it. The same blank map, a different set of transparencies for every question, and a reader who has to know which kind of thing each transparency is showing. Sort the last set before you leave this objective.</p>\n<div class=\"activity\" data-activity=\"gisSort\"></div>\n<p class=\"takeaway\">Switch on every layer that could disqualify a site before you choose one, and divide before you color a map. A layer you never turned on cannot rule anything out, and a raw count spread across unequal ground will point you at the largest district rather than the busiest one.</p>\n";

ACT.gisDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "The same ground, one transparency at a time",
  "objective": "7.4",
  "how": "Select each tab to see a different view of the depot map. Read the boxes left to right, then the notes beneath them.",
  "models": [
    {
      "id": "0",
      "name": "The stack of layers",
      "site": "Start from a blank map of the district, then lay one transparency over it at a time.",
      "boxes": [
        {
          "t": "Blank base map",
          "w": "Streets and boundaries, no business data yet",
          "c": "a"
        },
        {
          "t": "Population density",
          "w": "People per square kilometer, shaded by district",
          "c": "b"
        },
        {
          "t": "Arterial road access",
          "w": "Where a loaded truck can actually get out",
          "c": "b"
        },
        {
          "t": "Twenty-minute drive time",
          "w": "The trade area ring around each candidate",
          "c": "c"
        },
        {
          "t": "Competitor depots",
          "w": "Ground a rival already reaches faster",
          "c": "c"
        },
        {
          "t": "Floodplain",
          "w": "The constraint layer, and the quiet one",
          "c": "d"
        }
      ],
      "points": [
        "Every layer covers the same ground, which is what lets you read any two of them against each other.",
        "The stack is not a ranking. A site is only as good as the worst layer somebody remembered to switch on.",
        "A layer left off cannot disqualify anything, so the map arrives looking more encouraging than the ground is."
      ]
    },
    {
      "id": "1",
      "name": "What a layer can answer",
      "site": "Layers answer different shapes of question, and mixing the shapes is how a map misleads a reader.",
      "boxes": [
        {
          "t": "Features and patterns",
          "w": "Where the dots are, and where they bunch",
          "c": "a"
        },
        {
          "t": "Quantities",
          "w": "How many orders a district placed, in total",
          "c": "b"
        },
        {
          "t": "Densities",
          "w": "How many it placed per square kilometer",
          "c": "b"
        },
        {
          "t": "What is nearby",
          "w": "Rival depots within a set radius of a site",
          "c": "c"
        },
        {
          "t": "Change",
          "w": "The same measure, before and after",
          "c": "d"
        }
      ],
      "points": [
        "Quantities and densities come out of the same two columns and point at different districts.",
        "A thematic map colors regions by whichever of these you hand it, and it will not warn you which one you chose.",
        "A pattern on the map is a fact about location. The cause of the pattern is not on the map."
      ]
    },
    {
      "id": "2",
      "name": "The three sites, twice",
      "site": "The same three candidates, read first as the property team pitched them and then with all five layers switched on.",
      "boxes": [
        {
          "t": "Site A, as pitched",
          "w": "Decent road, third on density, nothing visibly wrong",
          "c": "a"
        },
        {
          "t": "Site A, layers on",
          "w": "Trade area overlaps a competitor depot",
          "c": "d"
        },
        {
          "t": "Site B, as pitched",
          "w": "Highest density and sits on the arterial",
          "c": "a"
        },
        {
          "t": "Site B, layers on",
          "w": "Inside the floodplain, so it is out",
          "c": "d"
        },
        {
          "t": "Site C, as pitched",
          "w": "Second on density, nothing outstanding",
          "c": "a"
        },
        {
          "t": "Site C, layers on",
          "w": "Clears all five layers, so it wins",
          "c": "c"
        }
      ],
      "points": [
        "Site B is the warning in this case: best on the numbers anyone had looked at, disqualified by the layer nobody switched on.",
        "A site that is second best on every layer beats a site that is first on one and ruled out on another.",
        "Site A shows the other failure mode, where the ground is fine and somebody else is already standing on it."
      ]
    }
  ]
};

ACT.gisCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Siting depot 41",
  "objective": "7.4",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical regional food and household goods distributor running forty depots. The board has approved a forty-first and narrowed it to three sites. The property team sent the district map with all five layers switched off, plus last year's order counts by postcode.",
  "facts": [
    {
      "k": "Decision on the table",
      "v": "Which of three sites gets depot 41"
    },
    {
      "k": "Layers switched on when the map arrived",
      "v": "None of the five"
    },
    {
      "k": "Site A",
      "v": "Third on density, clear of the floodplain, good road, trade area overlaps a competitor depot 2 km away"
    },
    {
      "k": "Site B",
      "v": "Highest population density, on the arterial, inside the floodplain"
    },
    {
      "k": "Site C",
      "v": "Second on density, clear of the floodplain, on the arterial, no competitor in its trade area"
    }
  ],
  "exhibit": {
    "name": "Orders last year, by postcode",
    "caption": "Invented practice figures, carried over from the Chapter 7 decision game.",
    "headers": [
      "Postcode",
      "Orders last year",
      "Area"
    ],
    "rows": [
      [
        "41",
        "1,240",
        "31 square kilometers"
      ],
      [
        "47",
        "2,980",
        "149 square kilometers"
      ],
      [
        "52",
        "860",
        "8 square kilometers"
      ],
      [
        "58",
        "1,610",
        "46 square kilometers"
      ]
    ]
  },
  "questions": [
    {
      "q": "The sales director wants a thematic map that shades each postcode by orders placed, darkest for the most. Which postcode comes out darkest?",
      "opts": [
        "Postcode 41, whose 1,240 orders are spread across 31 square kilometers.",
        "Postcode 52, whose 860 orders sit inside just 8 square kilometers.",
        "Postcode 47, whose 2,980 orders are the largest raw count here.",
        "Postcode 58, whose 1,610 orders are spread across 46 square kilometers."
      ],
      "a": 2,
      "why": [
        "Postcode 41 placed 1,240 orders, third of the four and well short of the largest count.",
        "Postcode 52 placed the fewest orders of the four, so a count map shades it lightest.",
        "A quantity map colors by the raw count, and 2,980 orders is the biggest of the four.",
        "Postcode 58's 1,610 orders come second, so a count map shades it lighter than postcode 47."
      ]
    },
    {
      "q": "Now divide each count by the ground it covers. Which postcode has the most orders per square kilometer?",
      "opts": [
        "Postcode 47, because 2,980 orders is more than any other district placed.",
        "Postcode 41, at 40.0 orders per square kilometer across its 31 square kilometers.",
        "Postcode 58, at 35.0 orders per square kilometer across its 46 square kilometers.",
        "Postcode 52, at 107.5 orders per square kilometer on 8 square kilometers."
      ],
      "a": 3,
      "why": [
        "Dividing 2,980 by 149 square kilometers gives 20.0, which is the thinnest ground of the four.",
        "1,240 over 31 square kilometers is 40.0 per square kilometer, second rather than first on density.",
        "1,610 over 46 square kilometers is 35.0 per square kilometer, third once the areas are taken into account.",
        "860 orders over 8 square kilometers is 107.5, the busiest ground here and the smallest raw count."
      ]
    },
    {
      "q": "With all five layers on, which site should get depot 41?",
      "opts": [
        "Site C, which is second on density but clears all five layers.",
        "Site B, whose population density is the highest of the three candidates.",
        "Site A, which is clear of the floodplain and sits on a good road.",
        "Hold the decision until the property team finds a fourth candidate site."
      ],
      "a": 0,
      "why": [
        "A site that is second best on every layer beats one that leads on a single layer and is ruled out on another.",
        "Density is one layer. Site B sits inside the floodplain, which disqualifies it whatever the density says.",
        "Site A is clear of the floodplain, but it is third on density and its trade area is already served from two kilometers away.",
        "Site C already clears every one of the five layers, so waiting buys nothing and costs a year of trading."
      ]
    },
    {
      "q": "The map arrived with every layer switched off. What does that practice put at risk?",
      "opts": [
        "Nothing much, because the property team would have flagged a floodplain in its covering note.",
        "A choice made without the one layer that would have ruled a site out.",
        "A slower decision, because each of the five layers has to be switched on and read.",
        "A cluttered comparison, because analysts switch on more layers than the question needs."
      ],
      "a": 1,
      "why": [
        "A written summary is not the layer, and a constraint nobody switched on is a constraint nobody checked.",
        "Site B is plainly the best candidate with the floodplain off, which is exactly why leaving it off is dangerous.",
        "Switching five layers on costs minutes, and the risk being run here is a wrong site rather than a slow one.",
        "The danger runs the other way: too few layers were on, and the missing one was the disqualifying one."
      ]
    }
  ],
  "debrief": "Site C wins because nothing disqualifies it. Site B is plainly the best site for as long as the floodplain layer stays off, which is how a floodplain ends up inside a lease. And a map colored by raw counts would have pointed the new delivery round at postcode 47, the thinnest ground of the four, while postcode 52 packs more than five times as many orders into each square kilometer as postcode 47 does. Divide before you color, and switch on every layer that could stop you."
};

ACT.gisSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "What kind of thing is this map showing?",
  "objective": "7.4",
  "how": "Drop each map into the kind of geospatial reading it represents, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "feat",
      "name": "Features and patterns",
      "hint": "Where the individual things are, and where they bunch together."
    },
    {
      "id": "qty",
      "name": "Quantities",
      "hint": "A raw count attached to a place: how many, with nothing yet divided."
    },
    {
      "id": "dens",
      "name": "Densities",
      "hint": "A count divided by the ground it sits on, per square kilometer."
    },
    {
      "id": "chg",
      "name": "Change",
      "hint": "The same measure on the same ground, before and after something happened."
    }
  ],
  "items": [
    {
      "t": "Every cancelled order last month, one dot per delivery address",
      "b": "feat",
      "why": "Plotting each order as its own point maps features, and the bunching you can see among them is the pattern."
    },
    {
      "t": "The clustering of late deliveries along the eastern ring road",
      "b": "feat",
      "why": "This is a distribution of events read off the map rather than a figure attached to a district."
    },
    {
      "t": "2,980 orders placed in postcode 47 last year",
      "b": "qty",
      "why": "A raw count for one district is a quantity, which is what the darkest region on a count map means."
    },
    {
      "t": "The number of school kitchens on the books in each sales district",
      "b": "qty",
      "why": "Counting the customers in a district gives a quantity, with nothing yet divided by the ground it covers."
    },
    {
      "t": "Pallets shipped out of each depot during March",
      "b": "qty",
      "why": "One total per depot is a straightforward count, so it belongs with the quantities rather than the rates."
    },
    {
      "t": "107.5 orders per square kilometer in postcode 52",
      "b": "dens",
      "why": "Dividing 860 orders by 8 square kilometers turns a count into a density, which is the honest layer here."
    },
    {
      "t": "Independent grocers per square kilometer inside each depot's territory",
      "b": "dens",
      "why": "Per square kilometer is the tell: the count has already been divided by the ground it covers."
    },
    {
      "t": "Chilled cases sold per square kilometer across the northern districts",
      "b": "dens",
      "why": "Sales divided by area is a density, and it will point at different districts than the raw sales figure does."
    },
    {
      "t": "Deliveries into the north side before and after depot 41 opened",
      "b": "chg",
      "why": "The same measure over the same ground at two moments is a change reading, not a single snapshot."
    },
    {
      "t": "How far the twenty-minute drive-time ring shrank after the bridge closed",
      "b": "chg",
      "why": "Comparing the trade area before the closure with the one after it is a before-and-after reading of the map."
    }
  ]
};
