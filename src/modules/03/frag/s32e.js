/* ===== s32e ===== */
PROSE.s32e = `
<span class="eyebrow">Section 3&ndash;2e</span>
<h2>How the internet and the web actually work</h2>
<p class="lede">Everything in the sections before this one &mdash; the machines, the operating systems, the stored data, the wires between them &mdash; only becomes useful when something far away can reach it. So this section takes the most ordinary act in modern working life, opening a page, and pulls it apart. None of it is difficult. It is only unfamiliar, and every later argument in this module about cost, renting and risk quietly assumes you can picture what is happening here.</p>

<h3>One network made out of many networks</h3>
<p>The previous section sorted networks by how far they reach: a few metres, a building, a city, the world. The largest of them is the one you are almost certainly using right now. The <b>internet</b> is a large worldwide collection of networks that use a common protocol to communicate with each other. Notice what that definition does not say. It does not say one network, and it does not name an owner.</p>
<p>Three things are packed into that one sentence, and each of them explains something you have probably noticed without ever being able to name it.</p>
<ul class="keys">
<li><b>Many networks, not one</b> &mdash; the internet is a collection, so what you connect to is your own provider&rsquo;s network, which connects to others, and so on outward until the far end is reached.</li>
<li><b>A common protocol</b> &mdash; the only thing every participant has to share is an agreement about how to talk, which is why equipment from different decades and different manufacturers still exchanges traffic without difficulty.</li>
<li><b>No owner named</b> &mdash; nobody is in charge of the whole of it, so there is no central office to approve a new connection and equally none to telephone when something between two networks stops working.</li>
</ul>
<p>The word itself records how the thing was built. <b>Internetworking</b> means connecting host computers and their networks together to form even larger networks, and that is exactly what happened: a university network here, a company network there, a home connection somewhere else, each separately owned and separately paid for, all agreeing to speak to each other the same way.</p>
<p>The practical consequence is worth sitting with. When you send a message from a kitchen table to an office server, it crosses equipment belonging to several companies that have never heard of you, and nobody arranged any of it in advance. That is not a weakness in the design. That is the design.</p>

<h3>The web is not the internet</h3>
<p>These two words are used as synonyms in ordinary speech, and they are not synonyms. The <b>World Wide Web</b> is a system of interlinked documents on the internet &mdash; or, as the chapter also puts it, a graphical user interface to the internet. The web runs on the internet in roughly the way an application runs on an operating system.</p>
<p>Five words do most of the work here, and each one names something you already handle every day:</p>
<ul class="keys">
<li><b>Hypertext</b> &mdash; documents that carry links to other documents, so a reader can move between them in any order rather than front to back. The chapter calls this the key feature of the web, and everything else is built on top of it.</li>
<li><b>A web page</b> &mdash; a hypertext document, meaning it holds not only content but also the links that lead away from it. That combination is what makes it a page rather than simply a file somebody stored.</li>
<li><b>A hyperlink</b> &mdash; a reference from one document to another that a reader can follow, which is what turns a heap of separate documents into a web instead of a library of unconnected ones.</li>
<li><b>A web browser</b> &mdash; the software application used to locate and display web pages, including their text, graphics and multimedia content. It asks for documents and then decides how they look.</li>
<li><b>A website</b> &mdash; a collection of interlinked web pages owned by the same organization or individual, usually hosted on a web server. The site is what an organization publishes; the page is what a visitor reads.</li>
</ul>
<p>Keeping the two words apart is not pedantry. Email, a video call and a file transfer all travel over the internet without being the web at all, so &ldquo;our supplier system is on the web&rdquo; and &ldquo;our supplier system is on the internet&rdquo; describe two different arrangements carrying two different sets of risks.</p>

<div class="activity" data-activity="webQuiz1"></div>

<h3>What a page is actually made of</h3>
<p>Open any page, ask the browser to show you its source, and you will find the same words you were just reading, wrapped in short codes. That file is written in <b>Hypertext Markup Language</b>, or HTML: the standard method of specifying the structure and content of web pages. It is a text-based file format, which means a person can read it, and it uses codes called <b>HTML tags</b> to instruct the browser on how a document should be presented.</p>
<p>A tag is set apart from the surrounding text with angle brackets, and most tags come in pairs, one to begin an element and one to end it. Some tags say how something should look; others say what something is, such as the page title, a heading level, or the end of a paragraph. The chapter&rsquo;s own list is short, and it is enough to read the source of a real page.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Tag</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><code>&lt;html&gt; ... &lt;/html&gt;</code></td><td>Delineates the whole HTML document, so everything else sits inside this one pair</td></tr>
<tr><td><code>&lt;head&gt; ... &lt;/head&gt;</code></td><td>Holds the title, scripts, styles, metadata and other elements that are not displayed on the page itself</td></tr>
<tr><td><code>&lt;body&gt; ... &lt;/body&gt;</code></td><td>Holds the visible portion of the document, which is everything a reader actually sees</td></tr>
<tr><td><code>&lt;b&gt; ... &lt;/b&gt;</code></td><td>Creates bold text: the first tag turns bolding on, the second turns it off again</td></tr>
<tr><td><code>&lt;p&gt; ... &lt;/p&gt;</code></td><td>Creates a new paragraph, which is how the browser knows where to break the running text</td></tr>
<tr><td><code>&lt;table&gt; ... &lt;/table&gt;</code></td><td>Creates a table, so the content is laid out as rows and columns rather than as prose</td></tr>
<tr><td><code>&lt;a href=&quot;second-page.html&quot;&gt; ... &lt;/a&gt;</code></td><td>Creates a hyperlink, so the enclosed words carry the reader to another document</td></tr>
<tr><td><code>&lt;a href=&quot;mailto:name@example.org&quot;&gt; ... &lt;/a&gt;</code></td><td>Creates a link that opens a new email message rather than a page</td></tr>
</tbody>
</table></div>
<p>The addresses inside those last two are placeholders. They are printed here as inert text so that you can read the shape of a tag without anything on this page ever reaching out to a network.</p>
<p>Two more names complete the picture. <b>HTML5</b> is the name the chapter gives the current version of the language, which added ways of structuring a page and of presenting modern multimedia without extra software installed alongside the browser. Treat that as a label rather than as a version number still being counted up: the web&rsquo;s markup is now revised continuously instead of being released in numbered editions, so there is no HTML6 waiting behind it.</p>
<p><b>Cascading style sheets</b>, or CSS, are what developers use to specify the formatting and layout of the elements on a page.</p>
<p>The division between those two is the transferable idea, and it is the same abstraction argument the section on operating systems made. HTML says what the parts of a document are; CSS says how they should look. Separating them is why one style change can resize every heading across a site of a thousand pages without anyone editing a thousand pages, and why the same page can be legible on a phone and on a projector.</p>
<p>Anything you have met beyond the tags in that table &mdash; headings, images, embedded video &mdash; is a real part of modern HTML but is an addition to the chapter&rsquo;s list rather than part of it. Get the eight the chapter gives before you go looking for more.</p>

<div class="activity" data-activity="webTags"></div>

<h3>Where pages live, and how one is asked for</h3>
<p>Pages are stored on <b>web servers</b>, which process user requests for those pages using the <b>Hypertext Transfer Protocol</b>, or HTTP. A protocol, from the previous section, is simply the agreed set of rules by which two machines talk. This one is the reason a browser written by one company can read a page served by software written by another company that has never heard of it.</p>
<p>The word &ldquo;stored&rdquo; is doing less work than it looks, and the next sentence is the most useful one in this section for anyone who will later touch a database. Web servers often employ scripting languages to assemble pages on the fly, or to retrieve data from databases and insert it into the page presented to the user.</p>
<p>That product page you looked at last week did not exist before you asked for it. It was built, on request, out of stored rows about that one product &mdash; which is a thread the supplement on databases later in this module picks up and follows.</p>
<p>One more thing rides along with every request, and it is the difference between privacy and none. Data travelling between a server and a user&rsquo;s computer can easily be intercepted, so organizations now routinely use <b>HTTPS</b>, the secure form of the same protocol, for anything at all sensitive.</p>
<p>The padlock a browser shows beside an address is the browser reporting that the secure protocol is in use. Its absence on a page asking for a card number means that number crosses several unknown networks in a form anyone along the way could read.</p>

<h3>How a request finds one machine out of billions</h3>
<p>Every computer or device on the internet is identified by an <b>IP address</b>, which serves as that machine&rsquo;s destination address and lets the network route messages to it. The older form is written as four numbers separated by periods, each of them between zero and 255. The newer form uses a far larger address, and it exists for a blunt reason: the world ran short of the older kind.</p>
<p>Numbers are hard to remember and they change from time to time, so people use names instead. A <b>uniform resource locator</b>, or URL, is the address you actually type, and the chapter dissects it into three distinct parts. Take a plain address such as <code>mail.example-museum.org</code> and read it from the right:</p>
<ul class="keys">
<li><b>The top-level domain</b> &mdash; the suffix at the end, here <code>org</code>, which indicates the family of names this one was registered under and something about the kind of registrant.</li>
<li><b>The domain name</b> &mdash; here <code>example-museum</code>, the part that helps a person recognize the company or individual the address belongs to. This is the piece an organization registers and pays for.</li>
<li><b>The host name</b> &mdash; here <code>mail</code>, naming the particular web server, or group of web servers, that will answer this request. The prefix <code>www</code> normally means the default site including the home page.</li>
</ul>
<p>That third part carries an unexpectedly practical fact. An organization registers one domain and then puts as many host names in front of it as it has services, so <code>www.example-museum.org</code>, <code>mail.example-museum.org</code> and <code>photos.example-museum.org</code> can be three entirely separate systems on three different machines, all under one registered name.</p>
<p>A URL usually carries a path after the address as well, naming the particular resource wanted rather than the site as a whole. Something ending <code>example-museum.org/collections/textiles</code> is asking for one page in one part of the site, in the same way that a folder path names one file rather than a whole drive.</p>
<p>Top-level domains arrive in three families, and the chapter gives examples of each.</p>
<ul class="keys">
<li><b>Suffixes for a kind of organization</b> &mdash; <code>com</code> is reserved for commercial organizations, <code>edu</code> for educational institutions, <code>org</code> for organizations and typically non-profit ones, and <code>gov</code> for a United States government entity.</li>
<li><b>Country codes</b> &mdash; more than two hundred and forty two-letter suffixes, one for each country, such as <code>de</code> for Germany. These are the reason an address can tell you where a name was registered.</li>
<li><b>Generic suffixes</b> &mdash; added as names proliferated, each naming an industry or a use. The chapter&rsquo;s examples are <code>aero</code> for the air transport industry, <code>name</code> for individuals, <code>coop</code> for business cooperatives and <code>museum</code> for museums.</li>
</ul>
<p>Names are registered through many different companies that compete with one another, and that is worth knowing for one reason: a suffix tells you which family of names something was registered in, not whether the registrant is honest.</p>
<p>An address need not be typed at all, either. A <b>QR code</b> is a two-dimensional bar code with a high storage capacity, most often holding an address so that scanning it with a camera opens the page. The same code can instead trigger an action, such as starting a call to a sales representative, sending a message to a set number, or authorizing a contactless payment through a banking or payment application.</p>
<p>Reading an address correctly is a small skill with an outsized payoff, and it is worth practising as code rather than as prose, because writing the rule down forces you to be exact about where one part of a name ends and the next begins.</p>

<div class="activity" data-activity="webAddress"></div>

<p>The second function in that exercise is the whole of one very common fraud. A name such as <code>login.example-bank.com.example-attacker.net</code> contains a familiar bank&rsquo;s name in full and reads convincingly at a glance, but the registered part is the last two labels, so the site belongs to whoever registered <code>example-attacker.net</code>. Reading an address from the right rather than from the left is the habit that catches it, and it is a habit a machine can be taught in about six lines.</p>

<h3>What actually travels: one request, end to end</h3>
<p>The internet moves web pages and everything else using <b>TCP/IP</b>, the transmission control protocol and the internet protocol taken together. Its first move is counter-intuitive. It does not send your request as one piece: it breaks it into small chunks called <b>packets</b>, sends those off separately, and reassembles them at the far end.</p>
<p>Breaking requests and files into small packets is what allows data to be routed and transferred efficiently across a network, and it buys three things at once:</p>
<ul class="keys">
<li><b>Pieces travel independently</b> &mdash; different packets belonging to one file may take different routes through the network, so no single congested link gets to decide how fast the whole thing arrives.</li>
<li><b>A failure costs a fragment rather than a file</b> &mdash; when a packet goes missing it can be sent again on its own, instead of the entire transfer having to start over from the beginning.</li>
<li><b>Many conversations share one path</b> &mdash; because everyone&rsquo;s traffic is in small pieces, a single large download cannot occupy a link for minutes on end while everybody else waits their turn.</li>
</ul>
<p>You never see any of this happening, which is rather the point of it. It is also why trouble on a network so often shows up as something slow and intermittent rather than as something plainly broken.</p>
<p>The eight steps below make up one complete round trip, from your keystroke to the finished page on the screen. Put them in order, then read why each one has to sit where it does.</p>

<div class="activity" data-activity="webOrder"></div>

<h3>The same pipes carry calls, and let programs talk to each other</h3>
<p>Once everything is packets, the difference between a telephone network and a computer network stops meaning very much. TCP/IP has allowed a convergence of computing and telecommunications, and the clearest evidence is <b>Voice over IP</b>, also called IP telephony: technologies that use internet infrastructure to place telephone or video calls. The chapter names WhatsApp, FaceTime, Zoom and Microsoft Teams among the consumer-facing examples, and notes that the versions sold to organizations add intelligent call routing, secure audio, and integration with other applications such as Salesforce or Slack.</p>
<p>The same web protocols carry something less visible and rather more consequential. They also let applications communicate with each other, which is the basis of an <b>application programming interface</b>, or API. The idea is simple and worth stating carefully, because a great deal of modern software is assembled out of it.</p>
<ul class="keys">
<li><b>A service consumer</b> &mdash; the program that wants something done, such as a ride-hailing application that needs a route across a city for which it holds no map of its own.</li>
<li><b>A service provider</b> &mdash; the program that can do it, such as a mapping service that already holds the roads and the traffic and does little else but answer that kind of question.</li>
<li><b>Pre-specified parameters</b> &mdash; the agreed values the consumer passes across, here a pickup location and a destination, and the result that comes back, here the best route between them.</li>
<li><b>No knowledge of the inside</b> &mdash; the consumer never has to know how the provider produces its answer, which is exactly why a small team can ship a product resting on capabilities it could never have built itself.</li>
</ul>
<p>A request of this kind is often just an address with values attached to the end of it, and the shape is worth seeing once.</p>
<div class="callout info"><b>The shape of an interface request.</b> <code>directions?origin=CITY_A&amp;destination=CITY_B&amp;key=YOUR_KEY_GOES_HERE</code> &mdash; three agreed values sent across, and a route sent back. The names before each equals sign are the parameters the provider has published; the values after them are what this particular caller wants. Nothing here is a real address and nothing here is a real key.</div>
<div class="callout warn"><b>Now look at the last value in that request.</b> The key is a credential: it identifies the account that will be billed for the work. Sitting where it does, in the middle of an address, it also travels into server logs, browser history, screenshots, chat messages and copied-and-pasted examples. Hold that thought. The cloud sections later in this module describe a company whose ordinary monthly bill became a ruinous one after exactly this kind of credential was taken and used by somebody else &mdash; and the reason that was possible is visible right here, on the page where the interface was first explained.</div>

<h3>The part of the web you cannot search</h3>
<p>Search engines work by following links. A program walks from page to page, collects what it finds and builds an index, so anything it can walk to becomes findable and anything it cannot walk to does not. That one mechanism explains a fact most people find surprising: the searchable part of the web is a small fraction of it.</p>
<p>The <b>deep web</b> is those parts of the web that conventional search engines cannot index. The chapter estimates the searchable surface at as little as a hundredth of the whole; treat that as an illustration rather than a measurement, since something unindexed is by definition uncountable. The structure is what matters, and the chapter enumerates it exactly.</p>
<ul class="keys">
<li><b>Private areas requiring authentication</b> &mdash; a course system, an electronic textbook, a bank statement. The pages are perfectly ordinary; they simply refuse to open for anyone without an account.</li>
<li><b>Pages generated from a database on request</b> &mdash; a product listing, a library catalogue record, a government agency&rsquo;s weather archive. There is no stored page for a program to walk to, because the page comes into existence when somebody asks a question of the data.</li>
<li><b>Pages nothing links to</b> &mdash; a document sitting on a public server with no link anywhere in the world pointing at it. A program that navigates by following links has no route by which to arrive.</li>
</ul>
<p>None of that is sinister, and one consequence of it lands squarely on a manager. A company&rsquo;s own records are invisible to a search engine for the second and third reasons at once, which is why &ldquo;just search for it&rdquo; is never an answer to a question about internal information, and why organizations have to build their own ways of finding what they already hold.</p>
<p>The <b>dark web</b> is a different thing that happens to share a syllable, and the chapter is emphatic that the two are not to be confused. It is those areas of the web used for various nefarious purposes &mdash; the chapter names trading in drugs, in stolen payment card details and in illegal material &mdash; typically reachable only with specialized browsers that anonymize the user and hide their traces.</p>
<p class="takeaway">Put the two side by side and the confusion dissolves. The deep web is most of the ordinary web with a login screen or a database in front of it; the dark web is a small, deliberately hidden neighbourhood that most people will never have any reason to enter.</p>

<div class="activity" data-activity="webLayers"></div>

<div class="callout exam"><b class="tagline">The four confusions worth fixing before you move on</b>The internet is the network of networks, and the web is one thing running on it. HTTP is the rule for asking, and HTTPS is that same rule with the conversation sealed. The domain is what an organization registered, and the host name is which of its servers answers. And the deep web is ordinary content behind a login or a database, while the dark web is something else entirely.</div>

<div class="activity" data-activity="webQuiz2"></div>
`;

ACT.webQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Two words that are not the same word",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "A hypothetical charity&rsquo;s new volunteer says the internet and the World Wide Web are two names for the same thing. Which correction matches the chapter?",
      opts: [
        "There is no real difference worth making; the chapter uses the two words interchangeably, and so may anyone else",
        "The web is the collection of separately owned networks, and the internet is the set of documents that travels across it",
        "The internet is a worldwide collection of networks using a common protocol, and the web is a system of interlinked documents running on top of it",
        "The internet is the part of the web that ordinary members of the public can reach, and the web also takes in private company systems"
      ],
      a: 2,
      why: [
        "The chapter defines the two separately, in different subsections, and the distinction does real work: a video call and a file transfer use the internet without touching the web at all.",
        "This has a sound pair of definitions attached to the wrong words. The network of networks is the internet; the interlinked documents are the web, which the chapter calls one of the most powerful uses of the internet.",
        "Correct. The chapter defines the internet as a large worldwide collection of networks that use a common protocol to communicate with each other, and the World Wide Web as a system of interlinked documents on the internet.",
        "Private company systems appear later in this objective as intranets, and they are not a further layer of the web. Who may reach something is a question of authorization, not of which of these two words applies."
      ]
    },
    {
      q: "What makes a document a web page rather than simply a file of text somebody stored on a machine?",
      opts: [
        "It sits on a server rather than on a personal computer, which is what the word page is recording",
        "It is a hypertext document, so it carries both content and links to other documents, which is what lets a reader move between pages in any order",
        "It has been indexed by a search engine, since a document nobody can find is not yet part of the web",
        "It is written in a language browsers understand, which is the whole requirement, and links are an optional extra on top"
      ],
      a: 1,
      why: [
        "Where a file sits does not decide what kind of thing it is. The chapter defines a web page by what it contains, and such a page can be written and read on one machine long before it is put on a server.",
        "Correct. The chapter defines a web page as a hypertext document containing not only content but also hyperlinks, and calls hypertext the key feature of the web.",
        "Indexing is something a search engine does afterwards, and the material on the deep web makes the opposite case: most of the web has never been indexed and is still the web.",
        "Being readable by a browser is necessary but is not the defining feature. Without links the result would be a library of unconnected documents rather than a web, which is precisely the distinction the word carries."
      ]
    },
    {
      q: "The same page looks slightly different on two machines, although both asked the same server for the same address. Which division of labour explains that?",
      opts: [
        "The server sends a finished picture of the page, so a difference has to be a fault in one of the two connections",
        "The server sends the document and its markup, and the browser interprets that markup and decides how the result is drawn on that particular screen",
        "The browser keeps pages permanently, so the second machine is showing an older copy that the server has since replaced",
        "The difference comes from the address, since a small variation in an address returns a different version of the page"
      ],
      a: 1,
      why: [
        "A server sends a document, not a picture. If it sent finished images, the web could not adapt to a phone, a laptop and a projector without the site being rebuilt separately for each of them.",
        "Correct. In the chapter&rsquo;s walkthrough the browser translates the markup, formats its visual appearance and displays the result, so the final drawing is the browser&rsquo;s decision rather than the server&rsquo;s.",
        "Browsers do keep copies to save time, but the chapter&rsquo;s account of a request ends with the browser rendering what it has just received, and an older copy would not by itself explain a difference in appearance.",
        "Both machines used the same address, which is what the situation states. Different addresses can certainly return different pages, but that is not what happened here."
      ]
    }
  ]
};

ACT.webTags = {
  kind: "match",
  label: "Match",
  title: "The chapter&rsquo;s eight HTML tags",
  how: "Pair each tag with what it does. All eight come from the chapter&rsquo;s own table, and the addresses inside them are placeholders printed as inert text rather than working links.",
  objective: "3.2",
  pairs: [
    {
      l: "&lt;html&gt; ... &lt;/html&gt;",
      r: "Delineates the whole document, so every other element sits inside this one pair",
      why: "This is the outermost pair. A browser reading a file knows the markup starts here and ends at the closing tag, which is why it is the only tag that never sits inside another."
    },
    {
      l: "&lt;head&gt; ... &lt;/head&gt;",
      r: "Holds the title, scripts, styles and metadata that are not displayed on the page itself",
      why: "Everything in here is about the document rather than in the document. The title shows in the browser tab, the styles decide how things look, and none of it appears as text a reader can see."
    },
    {
      l: "&lt;body&gt; ... &lt;/body&gt;",
      r: "Holds the visible portion of the document, which is everything the reader actually sees",
      why: "The split between this and the head is the first structural decision in any page: information about the page in one place, the page itself in the other."
    },
    {
      l: "&lt;b&gt; ... &lt;/b&gt;",
      r: "Creates bold text, turning bolding on at the opening tag and off again at the closing one",
      why: "The chapter uses this to explain paired tags in general: one marks the beginning of an effect and the other marks its end, which is why leaving out a closing tag bolds the rest of the page."
    },
    {
      l: "&lt;p&gt; ... &lt;/p&gt;",
      r: "Creates a new paragraph, which is how the browser knows where to break the running text",
      why: "Pressing return in the source file does nothing at all. A browser only breaks the text where the markup tells it to, which is the first surprise for everyone who views the source of a page."
    },
    {
      l: "&lt;table&gt; ... &lt;/table&gt;",
      r: "Creates a table, so the enclosed content is laid out in rows and columns rather than as prose",
      why: "This tag changes the shape of the layout rather than the appearance of a few words, which is why it encloses a whole block of content instead of a phrase inside a sentence."
    },
    {
      l: "&lt;a href=&quot;second-page.html&quot;&gt; ... &lt;/a&gt;",
      r: "Creates a hyperlink, so the enclosed words carry the reader to another document",
      why: "This is hypertext made concrete. The setting inside the opening tag names the destination, and the words between the two tags are what the reader sees and clicks."
    },
    {
      l: "&lt;a href=&quot;mailto:name@example.org&quot;&gt; ... &lt;/a&gt;",
      r: "Creates a link that opens a new email message rather than opening a page",
      why: "The same tag with a different kind of destination. It is a useful reminder that a link names a resource in general, and a web page is only the most common kind of resource to name."
    }
  ]
};

ACT.webAddress = {
  kind: "code",
  label: "Write the code",
  title: "Read an address the way a machine has to",
  how: "Write each function so every test passes; a failing test prints what your code returned beside what was expected.",
  objective: "3.2",
  exercises: [
    {
      prompt: "The chapter splits an address into a host name, a domain and a top-level domain. Implement <b>addressParts(address)</b>: return those three parts as an array, in that order. The domain and the top-level domain are the last two labels; anything before them is the host name, and an address with fewer than two labels names no domain at all.",
      signature: "addressParts(address) -> [host, domain, topLevelDomain]",
      starter: "function addressParts(address) {\n  // 'mail.example-museum.org' -> ['mail', 'example-museum', 'org']\n  // The last label is the top-level domain, the one before it is the\n  // domain, and everything left over is the host name (joined by dots).\n  // Fewer than two labels: return ['', '', ''].\n  return ['', '', ''];\n}\n",
      solution: "function addressParts(address) {\n  var labels = String(address).split('.').filter(function (l) { return l.length > 0; });\n  if (labels.length < 2) return ['', '', ''];\n  var n = labels.length;\n  return [labels.slice(0, n - 2).join('.'), labels[n - 2], labels[n - 1]];\n}\n",
      tests: [
        {call: "addressParts('mail.example-museum.org')", expect: ["mail", "example-museum", "org"]},
        {call: "addressParts('www.example-museum.org')", expect: ["www", "example-museum", "org"], note: "www is a host name like any other, not a special word"},
        {call: "addressParts('example-museum.org')", expect: ["", "example-museum", "org"], note: "an address can carry no host label at all"},
        {call: "addressParts('careers.eu.example-cooperative.coop')", expect: ["careers.eu", "example-cooperative", "coop"], note: "the host name can itself be several labels"},
        {call: "addressParts('deskmachine')", expect: ["", "", ""], note: "one label names a machine on a local network, not a site"}
      ],
      hint: "Split on the dot and work from the end of the list, not the beginning. The two positions you want are always the last and the one before it, however many labels there are.",
      explain: "Counting from the right is the whole trick, and it is the reason this is worth writing down. Reading a name from the left tells you what somebody wants you to notice; reading it from the right tells you which name was actually registered."
    },
    {
      prompt: "Two addresses belong to the same site when they share a domain and a top-level domain, whatever host names sit in front. Implement <b>sameSite(a, b)</b>, returning <code>true</code> or <code>false</code>. An address that names no domain matches nothing, including another address that names no domain.",
      signature: "sameSite(a, b) -> boolean",
      starter: "function sameSite(a, b) {\n  // Same registered name and same suffix means the same site,\n  // however many host labels sit in front of them.\n  // An address with fewer than two labels matches nothing.\n  return false;\n}\n",
      solution: "function sameSite(a, b) {\n  function registered(s) {\n    var l = String(s).split('.').filter(function (x) { return x.length > 0; });\n    return l.length < 2 ? '' : l[l.length - 2] + '.' + l[l.length - 1];\n  }\n  var ra = registered(a);\n  return ra !== '' && ra === registered(b);\n}\n",
      tests: [
        {call: "sameSite('www.example-museum.org', 'mail.example-museum.org')", expect: true, note: "two services, one registered name"},
        {call: "sameSite('shop.example-clinic.org', 'example-clinic.org')", expect: true, note: "a missing host label changes nothing about the site"},
        {call: "sameSite('www.example-museum.org', 'www.example-museum.com')", expect: false, note: "same word, different suffix, and therefore a different registration"},
        {call: "sameSite('login.example-bank.com', 'login.example-bank.com.example-attacker.net')", expect: false, note: "the familiar name has been pushed into the host part; the site belongs to whoever registered the last two labels"},
        {call: "sameSite('example-museum.org', '')", expect: false, note: "nothing matches an address that names no domain"}
      ],
      hint: "Reduce each address to just its last two labels joined back together, then compare those two strings. Guard the case where an address does not have two labels before you compare anything.",
      explain: "The fourth test is the one to remember. A convincing name in the host position proves nothing, because the host part is chosen freely by whoever owns the domain &mdash; and the domain is the last two labels, not the first two words you happen to recognize."
    }
  ]
};

ACT.webOrder = {
  kind: "order",
  label: "Sequence",
  title: "One request, from keystroke to page",
  how: "Put the eight steps into the order the chapter describes, then read why each one has to sit where it does.",
  objective: "3.2",
  intro: "This is the chapter&rsquo;s own walkthrough of what happens between typing an address and seeing a page. It is worth getting the order exactly right, because almost every complaint you will ever hear about a slow or broken system is really a complaint about one of these eight steps.",
  steps: [
    {
      t: "The user enters the address of a web page into the browser&rsquo;s address bar, and the browser turns it into a request for the page at that address.",
      why: "Nothing can begin until something has been asked for. Note that the person supplies a name, not a machine: everything that follows is the work of turning that name into a specific destination."
    },
    {
      t: "TCP/IP breaks the request into small chunks called packets and routes them across the internet toward the web server where the requested page is stored.",
      why: "This is where the request stops being one thing. Breaking it up is what lets the pieces travel efficiently over networks that are carrying millions of other people&rsquo;s pieces at the same time."
    },
    {
      t: "When the packets reach their destination, TCP/IP reassembles them into the original request and passes that request to the web server.",
      why: "Reassembly has to happen before the server sees anything, because a web server answers requests and knows nothing about packets. Each layer hides its own mess from the layer above it."
    },
    {
      t: "The web server recognises that a web page is being requested, because the transfer protocol is named at the front of the address, and it retrieves the page.",
      why: "The protocol named in the address is what tells the server which kind of conversation this is. The same machine can answer several kinds, and it needs to know which set of rules applies before it can respond at all."
    },
    {
      t: "The page is broken into packets by TCP/IP in turn and transmitted back across the internet toward the computer that asked for it.",
      why: "The journey home works exactly like the journey out, which is why a connection can be fast in one direction and slow in the other. Nothing about the reply is privileged; it is traffic like any other traffic."
    },
    {
      t: "TCP/IP reassembles the packets at the destination and delivers the finished page to the web browser.",
      why: "The second reassembly restores the document the server sent. Only now does anything on your machine hold something that looks like a page rather than a pile of numbered fragments."
    },
    {
      t: "The browser translates the HTML code, formats its visual appearance, and displays the results on the screen.",
      why: "This is the step people mistake for the whole process. The server sent structure and content; the decision about what it looks like on this screen was made here, at the last possible moment."
    },
    {
      t: "If the page contains a hyperlink and the user follows it, the whole process repeats from the beginning.",
      why: "Hypertext is what makes the cycle a loop rather than a line, and it means the browser is not holding a session with one machine but starting a fresh conversation, often with a different organization entirely."
    }
  ]
};

ACT.webLayers = {
  kind: "sort",
  label: "Sort",
  title: "Surface, deep, or dark",
  how: "Place each item in the layer it belongs to. Situations described as hypothetical are practice situations, and each one states the condition you need in order to decide.",
  objective: "3.2",
  buckets: [
    {id: "surface", name: "Surface web", hint: "public pages that other pages link to, so a search engine can walk to them and put them in its index"},
    {id: "deep", name: "Deep web", hint: "ordinary content a conventional search engine cannot index: behind a login, generated from a database on request, or linked from nowhere"},
    {id: "dark", name: "Dark web", hint: "a deliberately hidden area used for criminal purposes, reachable only with software that anonymizes the user and hides their traces"}
  ],
  items: [
    {
      t: "A news agency&rsquo;s front page, which dozens of other sites link to and any search engine can reach",
      b: "surface",
      why: "Public and linked from elsewhere, which is the whole requirement. A program that navigates by following links has an obvious route to it and will index what it finds."
    },
    {
      t: "The pages of a course system that open only after a student signs in with an account",
      b: "deep",
      why: "This is the chapter&rsquo;s first category of deep-web content: private areas requiring authentication. A learning management system is its own example, and nothing about it is hidden or improper."
    },
    {
      t: "An online store&rsquo;s product page, assembled from a database at the moment somebody asks for that particular product",
      b: "deep",
      why: "The chapter&rsquo;s second category: dynamic pages created from connected databases. There is no stored page for an indexing program to walk to, because the page is made in response to a question."
    },
    {
      t: "A document on a public server that no page anywhere links to",
      b: "deep",
      why: "The chapter&rsquo;s third category: static pages that are not connected to other pages by hyperlinks. The document is public in the sense that anyone with the exact address can open it, and unfindable to anyone who does not have it."
    },
    {
      t: "A marketplace trading stolen payment card details, reachable only through software that conceals who is visiting",
      b: "dark",
      why: "Both halves of the chapter&rsquo;s definition are present: a nefarious purpose, and access only through specialized browsers that anonymize the user. This is the part that is deliberately hidden rather than merely unindexed."
    },
    {
      t: "An encyclopedia article that anyone can open and that thousands of other pages point at",
      b: "surface",
      why: "The chapter names this kind of site among its examples of the common or surface web. Public plus heavily linked is the most indexable combination there is."
    },
    {
      t: "A hypothetical hospital&rsquo;s patient records, held behind its own firewall on its own network",
      b: "deep",
      why: "Internal content behind a corporate or institutional firewall is not accessible to search engines. It is a variation on the authentication category, and it is why an organization has to build its own way of searching what it holds."
    },
    {
      t: "A scientific journal archive that charges institutions for access and admits no indexing program",
      b: "deep",
      why: "The chapter names subscription archives directly. Because the publisher charges for access, the contents are not made freely available for indexing, so they sit outside the searchable surface."
    },
    {
      t: "A government agency&rsquo;s weather records, which appear only once somebody runs a query against its database",
      b: "deep",
      why: "The chapter names public agency databases among deep-web content for exactly this reason: their contents are dynamically generated from databases and displayed on demand, so there is nothing standing there to be indexed."
    }
  ]
};

ACT.webQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Protocols, addresses, packets and keys",
  how: "Five situations drawn from this section; read every explanation, including the ones for options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "A hypothetical cooperative&rsquo;s membership page asks for a bank account number, and the browser shows no padlock beside the address. What does the chapter&rsquo;s account of the two web protocols say is at stake?",
      opts: [
        "Nothing much, since the padlock reports whether the organization behind the site is trustworthy rather than anything about the connection",
        "The page will load more slowly, because the secure form of the protocol is the one browsers are optimized for",
        "Data travelling between the server and the member&rsquo;s computer can easily be intercepted, and the secure protocol is what stops the account number crossing in readable form",
        "The account number is safe the moment it reaches the server, so the protocol matters for what the server does with it afterwards rather than for the journey"
      ],
      a: 2,
      why: [
        "The padlock reports on the protocol in use, not on the character of the organization. A dishonest site can be reached over a protected connection and an honest one over an unprotected connection.",
        "Speed is not what separates them. The chapter&rsquo;s reason for the secure protocol is interception in transit, together with growing concern about both legitimate and illegitimate monitoring of web traffic.",
        "Correct. The chapter says data traveling between a server and a user&rsquo;s computer can easily be intercepted, which is why organizations now routinely use the secure protocol for anything sensitive, and the padlock is the browser reporting that it is in use.",
        "What the server does later is a separate question with separate safeguards. The exposure described here happens on the way, across several networks belonging to companies neither party has any relationship with."
      ]
    },
    {
      q: "A hypothetical garden centre sells forty thousand products and its site shows a page for every one of them, yet its web server stores only a few dozen files. How does the chapter explain that?",
      opts: [
        "The remaining pages are held on each visitor&rsquo;s own computer and assembled there by the browser out of files it has kept from earlier visits",
        "Web servers often employ scripting to assemble pages on the fly, retrieving data from a database and inserting it into the page when somebody asks for a particular product",
        "The site must be using compression, which is what allows forty thousand separate pages to be squeezed into the space that a few dozen ordinary files would otherwise occupy on the server",
        "Forty thousand pages do exist as stored files, but a search engine reaches only the few dozen that other pages link to"
      ],
      a: 1,
      why: [
        "A browser draws what it is sent; it does not hold a company&rsquo;s product data. Nothing on the visitor&rsquo;s machine knows what is in stock this morning or what it now costs.",
        "Correct. The chapter says web servers often employ scripting languages to assemble pages on the fly or retrieve data from databases and insert it into the page presented to the user, which is why the page did not exist until it was asked for.",
        "Compression makes stored files smaller; it does not conjure a page that was never written. The gap here is between stored files and reachable pages, not between large files and small ones.",
        "This confuses storage with indexing. It is a true statement about why such pages sit in the deep web, but it assumes the pages were written and stored in advance, which is exactly what did not happen."
      ]
    },
    {
      q: "A hypothetical museum is told it can run its public site, its ticketing system and its staff mail under one registered name without any of the three interfering with the others. Which reading of an address explains how?",
      opts: [
        "Each service needs its own registered domain, and the three would merely be made to look similar to visitors",
        "The path written after the address is what separates one service from another, so all three would answer on the same single server out of three different folders sitting side by side on its disk",
        "An address names a host, a domain and a top-level domain, so different host names in front of one registered domain can reach different servers or groups of servers",
        "The top-level domain selects the service, so the museum would register the same name under three different suffixes"
      ],
      a: 2,
      why: [
        "Registering three names is possible but is not what was described, and it throws away the shared identity that made the arrangement attractive. One registration can carry as many host names as an organization needs.",
        "A path does name a particular resource inside a site, and it is a real part of many addresses, but it is not one of the three parts of the address itself and it cannot send a request to a different machine.",
        "Correct. The chapter dissects an address into the host name, the domain and the top-level domain, and gives an organization&rsquo;s mail, photo and mapping services each answering on a different host name in front of the same domain.",
        "Suffixes indicate the family a name was registered in and something about the registrant. Using three of them would create three separate registrations rather than three services under one name."
      ]
    },
    {
      q: "Why does the internet break a file into packets and send the pieces separately, rather than sending it as one continuous stream?",
      opts: [
        "Because a network carries one message at a time and no more, so a long file has to be interrupted at intervals to let everybody else&rsquo;s traffic through before it is allowed to continue",
        "Because breaking requests and files into small chunks lets them be routed and transferred efficiently, with pieces able to take different paths and a lost piece resent on its own",
        "Because the receiving machine cannot hold a whole file at once and has to be given it in instalments",
        "Because encryption operates on small blocks, so a file has to be divided before a secure protocol is able to carry it"
      ],
      a: 1,
      why: [
        "Networks carry traffic from many senders at the same time, which is what they exist to do. Packets are what makes that sharing orderly rather than a workaround for a network that could otherwise manage one thing.",
        "Correct. The chapter&rsquo;s justification is that breaking requests and files into small packets allows for efficiently routing and transferring data across a network, and reassembly at the destination puts the pieces back before anyone sees a result.",
        "Storage is not the constraint. A machine with ample room for the entire file still receives it in packets, because the reason lies in the network between the two ends rather than at either end.",
        "Secure transport and packet transport are separate matters. Traffic carrying nothing sensitive at all is packetized in exactly the same way, and the chapter gives efficiency as the reason."
      ]
    },
    {
      q: "In the interface request shown in this section, the final value passed across is a key identifying the account that will be billed for the work. Which conclusion follows?",
      opts: [
        "It is safe where it is, because values inside an address are discarded as soon as a page has finished loading",
        "It is a credential travelling in a place that is routinely logged, copied and shared, so treating it exactly like a password is the least that is required",
        "It identifies the provider rather than the consumer, so losing it would inconvenience the mapping service rather than the caller",
        "It cannot be misused on its own, because a request is accepted only when the other agreed values are supplied alongside it"
      ],
      a: 1,
      why: [
        "Addresses are among the most copied strings in computing. They turn up in server logs, browser history, screenshots, chat messages and pasted examples, any of which can outlive the page by years.",
        "Correct. The key names the account that pays, and it is sitting in the part of a request most likely to be recorded and passed on, which is why this section flags it before the cloud material returns to a case built on exactly this failure.",
        "The key is issued to the consumer so that the provider knows whose account to charge. Whoever holds it can spend against that account, which is why the consumer is the party exposed.",
        "Those other values are supplied by whoever makes the request, so they are no obstacle whatever. Anyone holding the key can supply their own and have the work billed to somebody else."
      ]
    }
  ]
};
