/* ===== final ===== */
FINAL = {
  title:"Final challenge",
  how:"Thirty-six hypothetical situations built from the chapter and its two application supplements: every organization described is invented. Work out what is actually happening before you answer, then read every explanation, including the ones for options you did not choose.",
  questions:[

    {q:"A hypothetical national insurer processes millions of policy transactions a day against one central system that ten thousand staff and a public website all use at once. It is being replaced, and four options are on the table. Which class of computer does the chapter describe for this work, and why that one?",
     opts:[
       "A supercomputer, because the volume is enormous and this is the most powerful class of machine available",
       "A mainframe, because it is optimized for high availability, heavy shared use and security, and is the chapter&rsquo;s machine for mission-critical transaction processing",
       "A rack of workstations, because workstations carry fast processors and large memory and several of them together would cover the load",
       "A larger personal computer, because the difference between the classes is mostly physical size, and a desktop machine can be ordered with as much memory and as fast a processor as the nightly run needs"],
     a:1, obj:"3.2",
     why:[
       "Supercomputers are the most expensive and most powerful class, but the chapter says they are used primarily to assist in solving massive scientific problems and are typically not used by business organizations. Raw speed is not what this workload needs.",
       "Correct. The chapter defines a mainframe as a large computer used as the main central computing system for major corporations, optimized for high availability, resource utilization and security, and typically used for mission-critical applications such as transaction processing.",
       "Workstations are optimized for visualization and rendering of three-dimensional models for medical, engineering, architectural and graphics work, and typically serve one user each. Their strengths are the wrong strengths for shared transaction processing.",
       "The classes differ by what they are optimized for, not by size alone. A personal computer serves one user; the chapter&rsquo;s comparison has mainframes serving ten thousand or more at once, which is a difference in kind."]},

    {q:"A hypothetical architecture practice buys two machines in the same month. One will let a designer walk clients through unbuilt buildings in three dimensions. The other will hold the practice&rsquo;s drawings and be reachable by everyone in the office. How does the chapter classify them?",
     opts:[
       "Both are servers, because both are more powerful than an ordinary desktop and both are shared resources of the practice",
       "The first is a server because rendering is a service, and the second is a workstation because it stores the working files people work on",
       "Both are workstations, because a workstation is any professional machine used for architectural or engineering work and both were bought for the practice",
       "The first is a workstation and the second is a server, because one is optimized for rendering for a single user and the other for access by many concurrent users"],
     a:3, obj:"3.2",
     why:[
       "Cost and power do not decide the class. The chapter separates them by what they are optimized for: one machine visualizes and renders for the person sitting at it, the other answers many people at once.",
       "This reverses both definitions. The word service in the chapter means making files, printing and communications available to users of a network, not the professional service the practice sells to its clients.",
       "The intended use of the practice does not classify the machine. The second one has no single user sitting at it and exists to answer requests, which is the chapter&rsquo;s definition of a server rather than a workstation.",
       "Correct. A workstation is optimized for visualization and rendering of three-dimensional models and typically has one user; a server makes files, printing and other services available to users of the network and is optimized for many concurrent users, with more memory, storage and network capability."]},

    {q:"On a hypothetical bottling line, small dedicated controllers start and stop conveyors, sensors report temperature and vibration continuously, and the whole line reorganizes itself when a batch changes without an operator intervening. Which description matches the chapter?",
     opts:[
       "The controllers are embedded systems and the sensors are output devices, and because they exchange readings continuously over the factory network the arrangement is best described as an intranet on the production floor",
       "This is a peer-to-peer network, because the machines request and provide services from one another with no central server involved",
       "The controllers are programmable logic controllers, the sensors are input devices supplying environmental data in real time, and the whole arrangement is a cyber-physical system",
       "This is grid computing, because many small independent machines are combining their computing power to complete one large task"],
     a:2, obj:"3.2",
     why:[
       "The controllers are indeed a kind of purpose-built computer, but sensors supply data rather than present results, which makes them input devices. An intranet is a private internal website, not a factory network.",
       "Peer-to-peer describes machines that both request and provide services on a general-purpose network, and the chapter places it in small offices and homes. It says nothing about coordinating physical processes.",
       "Correct. Programmable logic controllers are the chapter&rsquo;s specialized devices for automating machines and processes, sensors are input technologies collecting environmental data such as temperature and vibration in real time, and a cyber-physical system integrates computing with physical processes through tight coordination of software, sensors and mechanical components.",
       "Grid computing combines many independent computers, often ordinary desktops, on a single large computational problem. Nothing here is being computed collectively; the machines are running a physical process."]},

    {q:"A hypothetical equipment hire firm wants to identify returned items automatically as they come through a doorway, without anyone pointing a scanner at each one. Items are low in value and arrive in bulk. Which reading of the chapter&rsquo;s material is accurate?",
     opts:[
       "Passive tags are the obvious fit, because they cost a few cents and are read from a few feet, and the doorway can be the reader",
       "Active tags are required, because only a tag with its own battery can be read without the item being pointed at a scanner",
       "Bar codes are the better answer, because the chapter says radio-frequency identification cannot be read unless the tag is plainly visible",
       "Neither technology applies, because identification at a distance requires a network connection on each item"],
     a:0, obj:"3.2",
     why:[
       "Correct. The chapter describes passive tags as small and inexpensive, starting from a few cents, with a typical range of up to several feet, and lists eliminating line-of-sight reading and reading at greater distances among the advantages over bar codes.",
       "Active tags include a battery and can transmit hundreds of feet, but they cost several dollars each. Paying that for a low-value item is the trade-off the chapter is asking you to notice, not a requirement.",
       "This inverts the chapter. Not needing line of sight is precisely the advantage it lists first: the data is readable regardless of the item&rsquo;s position or whether the tag is plainly visible, which is what bar codes cannot do.",
       "A tag is not a networked computer. It is a small transponder that answers a reader&rsquo;s electromagnetic field, which is why a passive one needs no battery and no connection of its own."]},

    {q:"A hypothetical software company sells one product that runs on two different operating systems. A new manager asks why the company does not instead ship a version for each of the several hundred computer models its customers own. What does the chapter&rsquo;s account of system software say?",
     opts:[
       "Each model would need its own build, and testing every combination of processor, graphics card and disk on the market would be far too expensive, so the company ships two versions and accepts that some machines will run them badly",
       "Applications talk to hardware directly, so the company writes one version and relies on device drivers supplied by customers to make up the difference",
       "Modern hardware is standardized enough that any program will run on any machine, so the two versions exist only for commercial reasons",
       "The operating system provides a common layer over different underlying devices, so applications only have to be built for the operating system rather than for each computer model"],
     a:3, obj:"3.2",
     why:[
       "Cost is not the reason, because the per-model builds are not needed in the first place. The chapter&rsquo;s point is structural: the operating system removes the need for them entirely.",
       "The chapter states the opposite. Application software cannot interact directly with hardware; it interacts with the system software, which in turn interacts with the hardware, and drivers are part of that layer rather than a customer responsibility.",
       "Hardware is not uniform, which is why drivers exist at all. Two versions are needed because the two operating systems present different layers, not because of marketing.",
       "Correct. The chapter says the operating system provides a common layer for different underlying devices so that applications only have to be developed for different operating systems rather than for each different computer model, which is exactly why a product ships in two versions and not two hundred."]},

    {q:"A hypothetical veterinary group must keep three kinds of data: today&rsquo;s appointments and charges, a nightly copy in case a server fails, and years of old internal correspondence it must be able to produce if asked. Which arrangement matches what the chapter says about matching data to media?",
     opts:[
       "All three belong on the fastest available storage, because data that cannot be reached instantly has no value to the practice",
       "Operational data on fast disk or flash storage, backups on hard drives so recovery is quick, and archival data on low-cost removable media such as magnetic tape",
       "Operational data on tape because it is written continuously, backups on flash storage, and archival data on hard drives so it stays searchable",
       "Operational and backup data together on one drive, and archival data deleted once the retention period is over, since old email has no operational use"],
     a:1, obj:"3.2",
     why:[
       "The chapter separates the three types precisely because their requirements differ along timeliness, access speed, searchability and life span. Paying for instant access to correspondence nobody reads is the waste the distinction exists to prevent.",
       "Correct. The chapter puts operational data on disk-based or flash storage for speed, notes that storing backups on hard drives enables quick recovery without slowing operations, and archives data that is no longer used operationally on magnetic tape, which is slow and not quickly searchable but very low cost and removable.",
       "This reverses the media. Tape stores data sequentially, so access can be very slow and the contents are not quickly searchable, which is why the chapter reserves it for archives rather than for live transactions.",
       "Keeping the backup on the same drive as the live data defeats its purpose, since one failure takes both. Whether old correspondence may be deleted is a compliance question, and archival data exists precisely because the answer is often no."]},

    {q:"Two hypothetical laboratories agree to exchange results automatically. The cable is installed, the files leave one system and arrive intact at the other, and the receiving system rejects every one of them. Which of the chapter&rsquo;s three requirements of a network has not been met?",
     opts:[
       "The pathway, because a cable that delivers unusable files has not really transmitted the data",
       "The sender and receiver, because a system that rejects a file is not genuinely a receiver for that message",
       "The protocol, because the two sides have not agreed on the procedures they will follow when transmitting and receiving",
       "None of them, because all three are present and the problem is simply a software defect at the receiving laboratory"],
     a:2, obj:"3.2",
     why:[
       "The pathway is the physical medium, cable or wireless, used to transmit data, and here it did its job: the files arrived intact. Arrival is a separate question from comprehension.",
       "Both ends exist and one of them has something to share, which is what the first requirement asks for. Rejecting a message you cannot interpret is what a receiver without a shared protocol does.",
       "Correct. The chapter&rsquo;s third requirement is rules or protocols governing communication between sender and receiver, and its own illustration is an email that arrives perfectly in a language the reader cannot decode: if the message is not understood by the receiver, there is no communication.",
       "Calling it a defect skips the diagnosis. The chapter&rsquo;s framework says a message can travel the whole way successfully and still fail, and the missing element in that case is the agreed procedure, not the code."]},

    {q:"A hypothetical training department must move a one gigabyte video file to a site that has an old low-speed connection. Someone proposes buying a much faster connection for the site instead. Which statement follows from the chapter&rsquo;s own comparison of connection speeds?",
     opts:[
       "Transfer time falls roughly in proportion to the increase in capacity, so a connection a thousand times faster turns a transfer of well over a day into seconds",
       "Transfer time depends mainly on the size of the file, so a faster connection will make only a marginal difference to a file this large",
       "Transfer time is set by the slower of the two connections only when both ends are wireless, and by the faster one otherwise",
       "Transfer time cannot be estimated in advance, because bandwidth describes capacity rather than speed and the two are unrelated"],
     a:0, obj:"3.2",
     why:[
       "Correct. Bandwidth is the transmission capacity measured in bits per second, so time is size divided by rate: the chapter&rsquo;s own table takes the same one gigabyte video from more than a day and a half on an old modem down to a few seconds on gigabit fiber.",
       "Size is only half of the calculation. Holding the file constant and changing the rate is exactly the comparison the chapter&rsquo;s table makes, and it changes the answer by orders of magnitude.",
       "The slower link limits the transfer regardless of whether either end is wireless. Nothing in the chapter makes the medium decide which end governs.",
       "Bandwidth is defined as how much binary data can reliably be transmitted over the medium in one second, which is precisely what makes an estimate possible."]},

    {q:"A hypothetical clinic replaces the computers in its examination rooms with cheap terminals that hold no data and run everything from a server in the basement. What has it done, in the chapter&rsquo;s terms, and what does it gain?",
     opts:[
       "It has built a peer-to-peer network, gaining resilience because any terminal can serve any other if the basement server fails",
       "It has installed embedded systems, because each terminal now performs one specific set of tasks rather than being a general-purpose computer",
       "It has moved to a public cloud, because the applications now run somewhere other than where the user is sitting",
       "It has adopted thin clients with desktop virtualization, reducing software licensing and maintenance costs and helping with strict privacy and data protection duties"],
     a:3, obj:"3.2",
     why:[
       "Peer-to-peer means any device can both request and provide services. These terminals only request, and if the server fails none of them can serve anything, so no resilience has been gained.",
       "An embedded system is built into a device to perform a specific set of tasks, such as controlling an engine. A thin client is still a general-purpose window onto general-purpose software running elsewhere.",
       "A public cloud is a service any interested party can rent on a pay-per-use basis. The clinic still owns the server in its own basement, so the resources were never pooled with anyone else&rsquo;s.",
       "Correct. Thin clients are microcomputers with minimal memory, storage and processing capability, and the chapter says they use desktop virtualization to provide workers with a virtual desktop environment, helping reduce costs for software licensing or maintenance and comply with stringent privacy and data protection laws."]},

    {q:"A hypothetical university librarian is asked why a search engine cannot find the library&rsquo;s catalogue records, its subscription journals, or the student portal, and whether that means they are on the dark web. What is the accurate answer?",
     opts:[
       "They are on the dark web, which is the chapter&rsquo;s name for everything a conventional search engine cannot index",
       "They are on the deep web because somebody hid them deliberately, and material reaches the surface web only when an organization pays a search company to index it, which is why public bodies with no advertising budget stay invisible",
       "They are on the deep web: pages behind authentication, pages generated from databases on demand, and pages nothing links to are not indexable, and that is unrelated to the dark web",
       "They are on the surface web but rank too low to appear, so better search terms would eventually reach them"],
     a:2, obj:"3.2",
     why:[
       "The chapter is explicit that the dark web is not to be confused with the deep web. The dark web is the part used for nefarious purposes and reachable only with specialized anonymizing browsers.",
       "Nothing here is hidden in the sense the dark web is hidden, and indexing is not something an organization purchases. A catalogue is unindexable because its pages are generated from a database when somebody asks.",
       "Correct. The chapter enumerates the deep web as private areas requiring authentication such as a learning management system, dynamic pages created from connected databases, and static pages not connected to others by hyperlinks &mdash; and separately warns that the dark web is something else entirely.",
       "Search terms cannot reach a page that was never indexed. A search engine cannot traverse content that only exists once a database query is run for a specific request."]},

    {q:"A hypothetical charity is told that its address, its mail service and its donation service can share one domain while behaving as separate systems. Which explanation of a web address matches the chapter?",
     opts:[
       "The three parts of an address are the protocol, the domain and the file path, and only the file path can vary between one service and another, so the two names must be reaching the same machine and the same software",
       "An address is one indivisible name registered as a whole, so a separate service requires a separately registered domain name",
       "The address names a host, a domain and a top-level domain, and different host names in front of the same domain reach different servers or groups of servers",
       "Host names are decorative, since the numeric address underneath is what actually identifies the organization to a browser"],
     a:2, obj:"3.2",
     why:[
       "The chapter&rsquo;s dissection names the host name, the domain and the top-level domain. A path to a particular resource may follow, but it is not one of the three parts of the address itself.",
       "Registrars register domains, and the organization is then free to use as many host names in front of that domain as it needs. The chapter&rsquo;s own example lists several services on one domain.",
       "Correct. The chapter says a URL has three distinct parts &mdash; the host name, the domain and the top-level domain &mdash; and gives examples of one organization&rsquo;s mail, photo and mapping services each answering on a different host name in front of the same domain.",
       "The host name is what tells the network which server or group of servers should answer, so it is doing real routing work rather than decoration."]},

    {q:"A hypothetical manufacturer wants three things: a public site, a private site where employees enrol in benefits, and a site where its suppliers see live order status. It asks whether these are three technologies or one. What does the chapter say?",
     opts:[
       "One set of technologies used three ways: an internet site, an intranet restricted to authorized employees, and an extranet restricted to authorized partners",
       "Three different technologies, because an internet site is built with web standards while an intranet and an extranet run on proprietary software that the organization buys separately for each audience",
       "One technology used twice, since an extranet is simply the name for an intranet once suppliers are given accounts on it",
       "Three different networks, because internal communication cannot travel over the same infrastructure as public content"],
     a:0, obj:"3.2",
     why:[
       "Correct. The chapter says an intranet looks and acts just like a publicly accessible website and uses the same software, hardware and networking technologies, but adds authentication or firewalls; an extranet is a private part of the internet enabling two or more firms to do business together. Its summary table separates them by focus, content, users and access, not by technology.",
       "The chapter explicitly says the same technologies are used. What differs is who is authorized and whether the content ever crosses the public internet.",
       "The chapter&rsquo;s table gives them different users, different content and different focus: internal communications with corporate content for employees, versus external communications between business partners. Adding supplier accounts to an internal site is not the same design.",
       "Internal communication in the simplest intranet stays inside organizational boundaries, but an extranet deliberately uses the public internet infrastructure and protects the traffic with a secured tunnel."]},

    {q:"A hypothetical logistics company is choosing where to build a facility that will hold its servers. Two candidate sites are equally priced: one is far from any customers but very safe from severe weather, the other is close to its largest customer base but on a more exposed coast. What does the chapter say the decision involves?",
     opts:[
       "Proximity is irrelevant once a connection is fast enough, so the safer site wins automatically",
       "The exposed site wins automatically, because reducing delay for users is the only thing customers ever notice",
       "Neither site should be built on, because reliability of this order is obtainable only by renting space in a facility a third party already operates, and a company of this size has no business running a data center at all",
       "A genuine trade-off between protection from the elements and proximity to users for lower latency, decided alongside power, cooling, connectivity, expandability and security"],
     a:3, obj:"3.2",
     why:[
       "Distance still costs time, which is why the chapter says organizations weigh proximity to customers to reduce latency rather than treating location as settled by the network.",
       "Latency matters, but a facility that floods is unavailable, and the chapter&rsquo;s availability discussion makes downtime the more expensive failure. Both considerations are live.",
       "Renting space in a collocation facility is a real option the chapter names, but it is an alternative to be weighed rather than the only way to reach high availability.",
       "Correct. The chapter says organizations go to great lengths selecting locations that strike the optimal balance between protection from the elements and proximity to customers or users to reduce latency, and separately lists connectivity, floor space, energy, cooling, security and modular expandability as requirements of the facility overall."]},

    {q:"A hypothetical municipal utility is told that its five-year-old server fleet is fine because nothing has broken. Its technology manager disagrees and points to the chapter&rsquo;s account of obsolescence, in which the planning horizon of five years managers once worked to has given way to new versions of devices every six to twelve months. Which argument is the chapter&rsquo;s?",
     opts:[
       "Capability keeps advancing underneath a fleet that is standing still, so the question to put to the machines is not whether they still work but what the utility can no longer do with them",
       "Equipment that has not failed has not yet been used up, so replacement should wait until something actually stops working and the money already committed to these machines has been earned back in full",
       "Machines become unreliable at a known age, so a fixed replacement interval removes the need to make a judgment",
       "Obsolescence is a hardware problem only, so a fleet that runs current software is by definition current"],
     a:0, obj:"3.3",
     why:[
       "Correct. The chapter says rapid advances continuously force organizations to upgrade to gain or maintain competitive advantage, and that whereas managers once thought in terms of five years, new versions of devices are now released every six to twelve months.",
       "Whether a machine still runs is not the chapter&rsquo;s test. It frames obsolescence as the gap between what current technology enables and what the installed base can do, which opens long before a failure.",
       "The chapter gives no such interval, and a fixed schedule would replace machines that are still capable while leaving others in place after they have become a constraint.",
       "The chapter devotes a whole subsection to software obsolescence: new operating systems often require new hardware, and older applications may not be compatible with the new operating system."]},

    {q:"A hypothetical school district hears that its operating system will stop receiving mainstream support, with paid extended updates available for a limited period afterwards. The new version has strict hardware requirements. What is the managerial shape of this situation, in the chapter&rsquo;s terms?",
     opts:[
       "A software licensing question, since paying for the extended updates converts a fleet-wide upgrade into an ordinary recurring subscription the district can carry in its operating budget for as long as it likes",
       "Planned obsolescence, in which a vendor&rsquo;s end-of-support decision forces a fleet-wide upgrade whose real cost is the hardware and the labour of upgrading every machine",
       "A security question only, because support and updates concern vulnerabilities rather than capability",
       "A negotiation, because vendors routinely extend support indefinitely for large institutional customers who ask"],
     a:1, obj:"3.3",
     why:[
       "Extended updates buy time rather than removing the decision, and they are a bridge with an end date rather than a permanent arrangement.",
       "Correct. The chapter defines planned obsolescence as designing a product to last only a certain life span, notes that a company may cease support for a product and effectively force users to switch, and says the cost lies both in hardware and software and in the time and resources needed to upgrade tens, hundreds or thousands of computers.",
       "Security is part of it, but the chapter&rsquo;s emphasis is the compulsory upgrade: a new operating system that requires new hardware and may not run the organization&rsquo;s older applications.",
       "Nothing in the chapter suggests support dates are individually negotiable, and building a plan on that assumption would leave the district without a path when the date arrives."]},

    {q:"A hypothetical publisher notices a pattern: each hardware refresh is justified by software that will not run on the old machines, and each new software release is justified by capabilities the new hardware made possible. A director asks whether someone is being manipulated. What does the chapter&rsquo;s figure describe?",
     opts:[
       "A loop in which more powerful hardware enables more powerful software, and the more powerful software then requires hardware more powerful still",
       "A vendor conspiracy between the hardware makers and the software houses, which is why the chapter recommends refusing every upgrade until a business case for it arrives from outside the technology function",
       "A misunderstanding, because software capability and hardware capability advance independently of one another",
       "A financing decision, since the pattern disappears once equipment is leased rather than purchased"],
     a:0, obj:"3.3",
     why:[
       "Correct. The chapter draws exactly this two-arrow loop: powerful hardware enables powerful software, which requires powerful hardware. It names the same pattern a vicious circle when describing how enhanced capabilities enable new applications that then demand more data and communications capacity.",
       "The chapter does not allege bad faith. It observes that upgrades may increase productivity and often do not, while remaining a large cost factor, which is a management problem rather than a conspiracy.",
       "The chapter&rsquo;s whole point is that they are coupled: new operating systems use new processor architectures and often require new hardware to run at all.",
       "Leasing changes who owns the equipment and how it is paid for. It does not change the fact that new software needs capability the installed machines do not have."]},

    {q:"A hypothetical parcel service sizes its own equipment for the busiest week of December. For the remaining eleven months much of that capacity sits idle, and it still ran short during one unexpected week. Which reading matches the chapter?",
     opts:[
       "The sizing was simply wrong, and a more careful forecast would have produced a capacity figure that fits the whole year",
       "This is evidence against owning any infrastructure, since the chapter concludes that owned capacity can never be justified",
       "This is a storage problem, because the shortage appeared at the moment the volume of parcel records being captured and kept exceeded the disk space that had been provisioned for the year",
       "This is the demand fluctuation problem: capacity bought in fixed increments is either idle most of the time or short at the peak, and it cannot be changed as quickly as temporary staff can be hired"],
     a:3, obj:"3.3",
     why:[
       "No single figure fits both a December peak and a February trough. The chapter describes the mismatch as structural rather than as a forecasting error.",
       "The chapter presents renting as a way to address the problem and later notes considerable disagreement about whether it is ultimately cheaper, including one company that concluded owning suited its workload better.",
       "The shortage was of capacity to serve a peak in activity, which is a different problem from the growth in data volumes the chapter treats separately.",
       "Correct. The chapter says demands for computing resources fluctuate, leaving either too few resources at some times or too many idle most of the time, cites estimates that a large share of infrastructure runs at a small fraction of capacity, and notes that while it is relatively easy to hire temporary staff, it is typically not that easy to make quick changes to the infrastructure."]},

    {q:"A hypothetical research institute doubles the processing power in its server room and budgets for the extra electricity the new machines will draw. Its facilities manager says the budget is short. Why, according to the chapter?",
     opts:[
       "Because electricity prices rise every year, so any energy budget written in advance will be short",
       "Because more powerful hardware needs more energy to run and, at the same time, more energy to cool, so one upgrade produces two increases",
       "Because servers draw their maximum power continuously regardless of load, so idle figures cannot be used in a budget",
       "Because energy is charged to the technology budget rather than to facilities, so the figure was recorded in the wrong place"],
     a:1, obj:"3.3",
     why:[
       "Price movements are real but are not the chapter&rsquo;s argument, which is about the physical consequence of adding processing power rather than about tariffs.",
       "Correct. The chapter spells out that components such as the processor and power supply generate heat, that more powerful hardware needs more energy to deliver the extra computing power, and that at the same time more powerful hardware requires more energy for cooling &mdash; and it puts a busy rack&rsquo;s draw at the equivalent of more than ten homes.",
       "The chapter gives a range between idling and full load for a desktop precisely because draw varies with load, so a constant maximum is not the assumption it makes.",
       "Moving a cost between budget lines does not change its size. The shortfall exists because a second cost was never counted."]},

    {q:"A hypothetical media startup wants to test whether anyone will use a new service. A consultant proposes buying servers and building the capacity the service would need if it succeeded. What does the chapter&rsquo;s treatment of agility say?",
     opts:[
       "Buy the capacity in advance, because a service that succeeds and then falls over under the load has lost its chance for good, and the equipment is cheap set against the cost of that one bad week",
       "Buy half the capacity, because the chapter recommends provisioning to the midpoint between failure and success",
       "Neither: the chapter argues that startups should not concern themselves with infrastructure, because the question only arises once a company is established",
       "It makes little sense to spend time and money on infrastructure before knowing whether the experiment will succeed or how much demand it would attract, which is why a minimum viable product comes first"],
     a:3, obj:"3.3",
     why:[
       "The chapter names this specific case &mdash; buying hardware and installing web servers for a mobile app before knowing whether it will be accepted or how much demand must be met &mdash; as an example of what makes little sense.",
       "No such midpoint rule appears anywhere in the chapter, and provisioning to a number nobody has evidence for is guessing with more steps.",
       "The chapter draws the opposite conclusion: the infrastructure question is most acute for organizations experimenting, which is why it uses startups to make the point.",
       "Correct. The chapter says being ahead of the competition necessitates speed, describes the lean startup approach of rapid cycles and minimum viable products to test whether solutions have the desired effect, and states that it makes little sense to invest in infrastructure changes before knowing whether the experiment will be a success."]},

    {q:"A hypothetical charity plans to train a model on its own case records and budgets for it using the price of the servers it bought last year. What does the chapter say makes that estimate unsafe?",
     opts:[
       "Training work runs on specialized processors that are not normally part of a traditional infrastructure and cost far more per unit, and the storage requirements differ in both capacity and speed",
       "Training work runs on ordinary processors but for much longer, so the estimate is right in unit price and wrong only in duration",
       "The estimate is safe, because the chapter says the processing, storage and analysis requirements of machine learning work are broadly similar to those of the transaction processing a business already runs",
       "The estimate is unsafe only because prices for computing equipment fall over time, so last year&rsquo;s figure is above the current one"],
     a:0, obj:"3.3",
     why:[
       "Correct. The chapter says training machine learning models typically does not take place on traditional processors, that an AI infrastructure requires graphics or tensor processing units not normally part of the traditional infrastructure, and that data storage requirements in both capacity and speed often exceed those of traditional systems &mdash; with unit prices in the tens of thousands of dollars.",
       "The chapter&rsquo;s point is that the hardware is different in kind, not merely used for longer. Sequential processors are the wrong shape for work that can be done in parallel.",
       "The chapter states the requirements differ vastly from traditional computing workloads, which is why it treats an AI infrastructure as a separate topic at all.",
       "Falling prices would make an old estimate too high; the chapter&rsquo;s warning is that the required equipment is a different and far more expensive category altogether."]},

    {q:"A hypothetical training provider stops buying servers and instead rents processing and storage from an outside provider, paying only for what it uses. Its finance director asks what has actually changed. What is the chapter&rsquo;s answer?",
     opts:[
       "Nothing has changed except the supplier, since the same resources are being used in the same quantities for the same work",
       "The organization has adopted a utility computing model, which transforms infrastructure costs from a capital expenditure into an operational expenditure and makes fixed costs variable",
       "The organization has outsourced its technology function altogether, so what looks like an infrastructure decision is really a staffing decision, and the finance question is which contracts of employment end",
       "The organization has moved to a private cloud, because the resources it rents are reserved for its own use"],
     a:1, obj:"3.4",
     why:[
       "The quantity is no longer fixed in advance, which is the change. Under the previous arrangement the organization paid for capacity whether or not it was used.",
       "Correct. The chapter defines utility computing as renting resources such as processing, storage or networking from an external provider on an as-needed basis and paying only for what is actually used, and says cloud computing helps transform infrastructure costs from a capital expenditure to an operational expenditure.",
       "Renting infrastructure does not by itself remove the technology function, and the chapter notes that responsibility for choosing, integrating and managing services remains with the customer.",
       "A private cloud is internal to an organization. Renting from an outside provider on a pay-per-use basis is the chapter&rsquo;s definition of a public cloud."]},

    {q:"A hypothetical ticketing company doubles its capacity in the minutes after a popular event goes on sale and releases it an hour later, all automatically. Which of the five cloud characteristics is doing the work, and what would the alternative have looked like?",
     opts:[
       "Broad network access, because the extra capacity was reachable from anywhere over the internet, on whatever device staff had with them, without a single new machine arriving at the company&rsquo;s own site",
       "Resource pooling, because the company was given capacity from a shared pool it does not own and cannot locate",
       "Rapid elasticity, because resources scaled up and down almost instantaneously and automatically, where owned equipment takes weeks to arrive and days to configure",
       "Measured service, because the company was billed for the extra hour rather than for the whole month"],
     a:2, obj:"3.4",
     why:[
       "Broad network access describes services being reachable from almost anywhere and from almost any web-enabled device. It explains who can use the system, not how the capacity grew.",
       "Resource pooling is what makes the spare capacity available to be assigned, and it is genuinely present. It does not describe the speed of the change, which is what the question is about.",
       "Correct. The chapter contrasts servers that take several weeks to be delivered and days or weeks to configure with a cloud environment where computing resources can be scaled up or down almost instantaneously and often automatically, and it uses exactly this holiday-surge case to make the point.",
       "Measured service explains the shape of the bill afterwards. The capability being described is the change in capacity itself, which happened before any invoice existed."]},

    {q:"A hypothetical language app normally spends a small predictable amount each month on a translation service it reaches through an interface key. One month the bill is several hundred times larger. Investigation shows the key was used by someone else to request an enormous volume of work. What is the chapter&rsquo;s lesson?",
     opts:[
       "The cloud is inherently unsafe for a company of this size, because once a customer depends on a provider that provider can charge whatever it likes, and a small firm has no leverage to argue about a bill",
       "Measured service means the meter runs for whoever holds the credential, so cost monitoring, regular review of what is provisioned, budget alerts and reading the contract are the defences",
       "The provider is at fault for not detecting the anomaly, so the remedy is contractual rather than operational",
       "This is a billing dispute rather than a security incident, since nothing was stolen and no data was disclosed"],
     a:1, obj:"3.4",
     why:[
       "The chapter does not conclude that the cloud is unsafe. Its own case shows the charges followed real usage, which is what a metered service does, and it responds with practices rather than avoidance.",
       "Correct. This is the chapter&rsquo;s own cautionary case, in which a startup faced a bill hundreds of times its usual monthly spend after a credential was apparently stolen and used to request billions of characters of translation, and its five prevention strategies are cost monitoring tools, regular review of resource allocations, budget alerts, educating teams on cost awareness and reading the fine print.",
       "Anomaly detection would help, and budget alerts are among the chapter&rsquo;s recommendations, but the customer holds the credential and the chapter puts the vigilance on the customer.",
       "A credential was taken and used, which is exactly a security failure, and the chapter&rsquo;s own earlier interface example shows how easily such a key can be left where it can be read."]},

    {q:"A hypothetical insurer wants to run software its own developers wrote, without anyone on staff installing or patching operating systems or database engines, and without buying licences for either. Which service model does the chapter describe for this, and what does the insurer still control?",
     opts:[
       "Infrastructure as a service, which supplies processing, storage and networking and leaves the insurer to choose and license everything above them",
       "Software as a service, because the insurer is running an application and does not want to manage anything beneath it",
       "Platform as a service, which supplies the operating system, web server and database management system while the insurer controls only its own applications",
       "A private cloud, because running software the organization wrote itself requires infrastructure the organization owns"],
     a:2, obj:"3.4",
     why:[
       "Infrastructure as a service gives the most control and also the most responsibility: the chapter notes that managing software licences remains the customer&rsquo;s job and setup costs are relatively high.",
       "Software as a service means using an application the provider supplies, with limited ability to configure it. The insurer wants to run software of its own, which this model does not allow.",
       "Correct. The chapter defines platform as a service as customers running their own applications, typically designed using tools the provider supplies, with control over the applications but limited or no control over the underlying infrastructure, and says the customer does not have to worry about purchasing licences for the web servers&rsquo; operating systems or for database management systems.",
       "Writing your own software does not require owning hardware. The chapter&rsquo;s platform model exists precisely so that custom applications can run on rented infrastructure."]},

    {q:"A hypothetical broadcaster rents raw computing capacity and runs its own operating systems on it, converting video into many formats and hosting its own site. Elsewhere the same broadcaster&rsquo;s staff use a rented email service and a rented customer-records application. How does the chapter classify these?",
     opts:[
       "Both are software as a service, because in both cases the broadcaster is a customer rather than an owner of the equipment",
       "Neither is a cloud service, because the broadcaster is managing operating systems in one case and configuring an application in the other",
       "The first is platform as a service, because the provider supplies the machines on which the broadcaster&rsquo;s software runs",
       "The first is infrastructure as a service and the second is software as a service, and the difference is how far up the stack the provider&rsquo;s responsibility reaches"],
     a:3, obj:"3.4",
     why:[
       "Being a customer is common to all three models. What separates them is what the provider manages, and the broadcaster is managing operating systems in the first case and nothing at all in the second.",
       "All three models are cloud services. Managing an operating system on rented hardware is what the chapter says infrastructure as a service involves.",
       "Platform as a service supplies the operating system and database engine as well, so the customer does not install them. Here the broadcaster is choosing and running its own.",
       "Correct. The chapter gives infrastructure as a service as processing, storage and networking only, with the most customer control and the customer&rsquo;s own licences, and software as a service as using only applications supplied over a cloud infrastructure, with no knowledge or control of what lies beneath."]},

    {q:"A hypothetical regional hospital moves its public information site and its appointment reminders to a rented public service, while keeping patient records on machines in its own building. A board member calls this indecisive. What does the chapter say?",
     opts:[
       "It is indecisive, because splitting an infrastructure across two models multiplies cost and complexity for no benefit",
       "It is a hybrid approach, which the chapter presents as what organizations often choose because no single provider meets every need and some data is not worth moving",
       "It is a private cloud, since keeping any data in-house means the whole arrangement is private by definition",
       "It is a temporary state that ends the moment the remaining systems are migrated, because the chapter treats a complete move to a public provider as the destination every organization is travelling towards"],
     a:1, obj:"3.4",
     why:[
       "The chapter acknowledges that combining approaches adds complexity, and still describes it as the common outcome, because the alternative is treating very different data as though it had the same requirements.",
       "Correct. The chapter says organizations often have to partner with different providers and combine public and private clouds, that there is not one solution that fits all, and that they often choose a hybrid approach with certain applications in-house while moving others to the public cloud.",
       "A private cloud is an internal cloud providing self-service access to pooled internal resources. Owning some servers does not make a rented public service private.",
       "The chapter never treats full migration as the goal. Its evaluation criteria exist so that each application and data set is decided on its own merits."]},

    {q:"A hypothetical payments company reads a provider&rsquo;s service-level agreement promising very high uptime with refunds if it is missed, and concludes it no longer needs its own continuity plan. What does the chapter say about that conclusion?",
     opts:[
       "It is sound, because a contractual uptime commitment transfers the risk of downtime to the provider",
       "It is sound for availability but not for security, since an agreement of this kind covers performance and says nothing about how the provider protects the data it is holding on the pharmacy&rsquo;s behalf",
       "It is unsound, because such an agreement promises a service level and pays a refund or a discount rather than guaranteeing availability, and money back does not replace the business lost while the service was down",
       "It is unsound, because the chapter concludes that in-house infrastructure achieves better uptime than any provider"],
     a:2, obj:"3.4",
     why:[
       "A commitment is not the same as a guarantee. The chapter describes such agreements mainly as a vehicle for resolving conflicts in case of problems.",
       "The distinction between availability and security is real, but the flaw in the reasoning is present within availability itself, before security is even considered.",
       "Correct. The chapter says service-level agreements do not guarantee the availability of resources but only promise certain service levels and provide refunds or discounts if the promises are not met, and that refunds normally cover only the fees paid and can never offset the opportunity costs of lost business &mdash; which is why organizations should plan ahead and replicate their infrastructure in different locations.",
       "The chapter says the opposite in its fair counterpoint: organizations often realize that even when agreements are missed, a provider can still offer better uptime than a poorly managed in-house infrastructure."]},

    {q:"A hypothetical genomics institute holds many terabytes with one provider and receives a better offer from another. Its analysts assume moving is a weekend&rsquo;s work. Which of the chapter&rsquo;s criteria have they overlooked?",
     opts:[
       "Openness, because providers use different infrastructures and ways of storing data, and charges for moving data out make a transfer of this size slow and expensive",
       "Viability, because the question is whether the new provider will still exist in several years",
       "Scalability, because the new provider may not be able to meet the institute&rsquo;s storage needs as the sequencing work grows, and a second migration in three years would cost more than this one",
       "Diversity of offerings, because using two providers is harder to manage than using one"],
     a:0, obj:"3.4",
     why:[
       "Correct. The chapter says most providers use different infrastructures and different ways to store data, making migration extremely difficult and leading to lock-in, and adds that bandwidth and data transmission costs are a further limitation because providers often charge for moving data into or out of their infrastructure.",
       "Viability is a real criterion and worth asking about, but it concerns whether the provider survives, not why the move itself is difficult.",
       "Scalability concerns whether a provider can meet current and future demands. It says nothing about the cost and time of the migration itself.",
       "Diversity of offerings is about how many providers an organization must manage. The institute is planning to move rather than to add a second relationship."]},

    {q:"A hypothetical publisher compares a monthly rented server bill against what it believes the same server costs in-house, and concludes renting is more expensive. What does the chapter say about that comparison?",
     opts:[
       "It is reliable, because the internal cost of a server is straightforward to work out from its purchase price divided over its expected life, which is the figure the finance system already carries for it",
       "It is unreliable in one direction only, because rented costs are understated by charges that appear later",
       "The comparison is hard because the rented figure is exact while many organizations do not know what an in-house server truly costs once licences, electricity, the facility and the staff are counted",
       "The comparison is unnecessary, because the chapter concludes that public cloud infrastructure is cheaper for essentially all workloads"],
     a:2, obj:"3.4",
     why:[
       "Purchase price and expected life leave out most of the cost. The chapter lists licences, electricity, the data center itself and the staff as parts of the figure organizations usually cannot produce.",
       "The chapter&rsquo;s difficulty is not hidden charges on the rented side, where costs are transparent and easy to track, but the unknown figure on the in-house side.",
       "Correct. The chapter says it is easy to calculate the monthly cost of a server in a public cloud while many organizations do not know exactly what it costs to run a comparable server in-house, including the server, the licence fees, the electricity, the data center and the staff, and it acknowledges considerable disagreement about which is ultimately cheaper.",
       "The chapter reaches no such conclusion, and it cites one company that moved back out of a public cloud after deciding owning suited its own workload better."]},

    {q:"A hypothetical engineering consultancy needs a simulation that would take a very long time on any single machine it can afford. It arranges for the work to be split into small pieces and completed by hundreds of ordinary networked computers. How does the chapter distinguish this from cloud computing?",
     opts:[
       "There is no distinction; the chapter treats grid computing as an early name for cloud computing",
       "Grid computing uses only machines the organization already owns and has paid for, whereas cloud computing means renting machines that belong to somebody else and are housed in their building",
       "Grid computing is a way of storing data across many machines, whereas cloud computing is a way of processing it",
       "Both use distributed resources, but in a grid the resources are typically applied to a single large problem, whereas cloud resources serve many separate customers and purposes"],
     a:3, obj:"3.4",
     why:[
       "The chapter draws the comparison explicitly in order to separate the two, rather than treating one as a former name for the other.",
       "Ownership is not the line the chapter draws, and a grid can be assembled from machines in several organizations. The distinguishing feature is what the resources are pointed at.",
       "Grid computing is defined as combining computing power to solve problems that previously needed a supercomputer, which is processing rather than storage.",
       "Correct. The chapter says that similar to cloud computing, grid computing makes use of distributed resources, but that in contrast to cloud computing the resources in a grid are typically applied to a single large problem, with large tasks broken into small chunks completed by individual computers."]},

    {q:"A hypothetical online seller of camping equipment sells to customers worldwide, but visitors far from its servers wait noticeably longer for pages and video to load. Which of the chapter&rsquo;s trends addresses this, and what does it actually do?",
     opts:[
       "A content delivery network, which keeps copies of the content on servers in various geographical locations so the nearest one answers, cutting the delay caused by distance",
       "A private cloud, which would give the seller control over performance by keeping all content on machines it owns",
       "A wider connection at the seller&rsquo;s own data center, since the delay is caused by the capacity of that single connection rather than by distance, and doubling it would halve the wait for every visitor",
       "Grid computing, which would combine many small computers to serve the pages faster than one large one could"],
     a:0, obj:"3.4",
     why:[
       "Correct. The chapter says the larger the geographical distance between a user and the web server hosting the content, the longer transmission takes, and that content delivery networks reduce this latency by providing servers in various geographical locations holding copies, with the closest one delivering the content &mdash; a process normally unnoticed by the user.",
       "A private cloud changes who owns and controls the infrastructure. It does nothing about the distance between one location and a user on another continent.",
       "Capacity at the origin matters, but the chapter identifies distance itself as the cause of this particular delay, which is why the answer is to move copies closer rather than to widen one pipe.",
       "Grid computing applies many machines to one large computation. Serving a page to a distant visitor is not a computation that can be divided up."]},

    {q:"A hypothetical animal shelter keeps its adoption records in a folder of spreadsheet files, one per month, each edited by whoever is on shift. Two staff now report different totals for the same period. In terms of the supplement on databases, what is the underlying problem?",
     opts:[
       "The files are too large for a spreadsheet, so the totals are being truncated before they are displayed",
       "There is no single stored set of records that everyone reads and writes, so the same fact exists in several places at once and nothing decides which copy is authoritative",
       "The staff need training in spreadsheet functions, because the totals would agree if every branch used the same formula, and the disagreement is arithmetic rather than anything to do with where the records live",
       "Spreadsheets cannot hold dates, so records from the same period are being counted in different months"],
     a:1, obj:"3.5",
     why:[
       "Nothing in the situation suggests a size limit has been reached, and a truncated file would produce obviously missing rows rather than two plausible but different totals.",
       "Correct. This is the case for storing records once, in one place, and asking questions of them: a database gives every record a single home and a defined shape, so a total is a question asked of the stored rows rather than a copy someone made and then edited.",
       "A shared formula would make two copies agree only until the next edit. The disagreement arises from having two sets of records, not two ways of adding them up.",
       "Spreadsheets handle dates perfectly well. The problem is that the same adoption may exist in more than one file, or in only one of them."]},

    {q:"In the supplement on databases, a hypothetical bicycle-hire service asks two questions of the same stored table: which bicycles are currently out, and how many hires each depot recorded last month. What is the difference between those two questions in query terms?",
     opts:[
       "The first chooses which rows to return, and the second groups rows together and returns a calculated value for each group",
       "The first is a query and the second is a report, so only the first can be expressed as a query at all",
       "The first requires the whole table to be read and the second does not, which is why the second finishes sooner in every case",
       "There is no difference, because both questions return all the rows and the difference is only in how they are displayed afterwards"],
     a:0, obj:"3.5",
     why:[
       "Correct. Choosing rows and choosing columns are separate decisions, and summarising is a third: the first question filters to a subset of rows, while the second collapses many rows into one result per depot, which is the difference between filtering and aggregating.",
       "Both are queries. Producing a count per group is ordinary query work, and calling the result a report describes what is done with the answer rather than how it is obtained.",
       "How much of the table is read is a performance detail that depends on the stored data, and it is not what separates the two questions.",
       "The second question does not return the underlying rows at all. It returns one row for each depot, which is a different result rather than a different presentation."]},

    {q:"A hypothetical museum runs its collection catalogue on a rented platform, so nobody there installs or patches a database engine. Its curator concludes the museum no longer has to think about its data at all. What does the supplement on databases say?",
     opts:[
       "The curator is right, because on a rented platform the provider is responsible for the data as much as for the software beneath it, which is the whole reason an institution pays somebody else to run it",
       "The curator is wrong only about backups, since everything else about the data is handled by the provider",
       "The provider manages the platform, but the museum still owns what the data means: which records exist, how they relate to each other, and what must be unique",
       "The curator is wrong because a rented platform cannot host a catalogue, which needs a database engine the museum installs itself"],
     a:2, obj:"3.5",
     why:[
       "The platform model removes the work of running and updating the software, and the chapter says exactly that. It does not transfer authorship of the data model or responsibility for what the records mean.",
       "Backups matter, and so does everything about the design: a provider that keeps the engine running has no view about whether two records describe the same object.",
       "Correct. This is where the chapter&rsquo;s service models meet the course&rsquo;s own database work: renting the platform removes the licence and the maintenance, and leaves the design of the tables, the keys and the questions exactly where it was.",
       "A rented platform is a normal place to run a catalogue, and the chapter names the database management system as one of the things such a platform provides."]},

    {q:"A hypothetical community orchestra keeps one stored table of members, each with the town they live in, and a second stored table of instrument loans, each carrying a member identifier rather than a name. The treasurer asks how many loans went to members from each town. Using the supplement on databases, why can no single row answer that?",
     opts:[
       "Because the answer has to be assembled at the moment of asking: the town lives in one table and the loan in another, so the rows are matched on the value they share and then collapsed into one line per town",
       "Because the loans table is missing a column, and the question becomes answerable only once the town is copied into every loan record as well",
       "Because a stored table can be read only in the order its rows were written, so a question about towns cannot be asked until the rows have been sorted into towns first and stored again in that order",
       "Because counting is arithmetic rather than retrieval, so a total of this kind has to be worked out in a spreadsheet after the rows themselves have been exported out of the database"],
     a:0, obj:"3.5",
     why:[
       "Correct. Two things are happening at once, and the supplement separates them: a join matches facts that were deliberately kept apart by the value they share, and a grouping collapses many matched rows into one result per town. Neither result exists in any stored row.",
       "Copying the town into every loan is exactly what storing records once is meant to avoid. It creates a second copy of a fact that can then disagree with the first when a member moves.",
       "Rows are not read in the order they were written, and nothing has to be re-stored to ask a new question. That is the difference the supplement draws between a set of files and a database.",
       "Counting per group is ordinary query work. Exporting first would leave the answer sitting in a file that is out of date the moment the next loan is recorded."]},
    {q:"A hypothetical seed cooperative wants three things: a public catalogue for customers, a private area where members read notices and enrol in training, and a shared area where two partner laboratories exchange live test results. Using the supplement on internet uses, how should these be built?",
     opts:[
       "Three separate public sites, each with its own address, since separating them by address is what keeps the audiences apart",
       "An intranet for all three audiences, since the cooperative writes the content in every case and can simply issue accounts to the buying public alongside its members and its two laboratories",
       "One public site with three sections, relying on visitors not to follow links they were not given",
       "A public internet site, an intranet restricted to authorized members, and an extranet restricted to the two partner laboratories, separated by who is authorized rather than by technology"],
     a:3, obj:"3.6",
     why:[
       "Three addresses do not restrict anyone. Without authentication, anything published on a public site is public no matter how many addresses it is spread across.",
       "Issuing accounts to every customer turns a public catalogue into a barrier to sales, and the chapter separates these uses by focus and audience rather than by who controls the content.",
       "An unlinked page is still reachable by anyone who has the address, and the chapter treats authentication and firewalls, not obscurity, as what makes content private.",
       "Correct. This is the chapter&rsquo;s own trio mapped onto the three uses the course objective names: general public content for anyone with a connection, corporate content for authorized employees or members, and content between business partners restricted to authorized partners, all using the same underlying technologies."]},

    {q:"A hypothetical parts distributor and its largest supplier currently exchange orders by email, and staff on both sides rekey the details into their own systems. Using the supplement on internet uses, what does the chapter say a shared partner arrangement offers instead?",
     opts:[
       "Faster email, since the same messages would travel over a dedicated connection rather than the public internet",
       "A single point of data entry from which both organizations work, improving the timeliness and accuracy of communication, automating transactions and reducing errors and cycle times",
       "A private cloud shared between the two firms, which is how two organizations come to read the same records",
       "Nothing that email does not already do, since the benefit of a partner arrangement is presentational rather than operational and the same figures are being sent either way, just through a different window"],
     a:1, obj:"3.6",
     why:[
       "The delay is not in the email. It is in the rekeying and in the two separate sets of records that rekeying creates.",
       "Correct. The chapter&rsquo;s list of extranet benefits includes dramatically improving the timeliness and accuracy of communications, automating business transactions to reduce processing costs and cycle times, reducing errors by providing a single point of data entry from which data can be updated without reentry, and giving management real-time data.",
       "A shared private cloud is not what the chapter proposes here, and an extranet works precisely because it uses the public internet infrastructure with the traffic secured.",
       "The chapter&rsquo;s claim is operational: fewer versions of a document, fewer errors, shorter cycles and real-time visibility for management, none of which follows from sending an email."]},

    {q:"A hypothetical printing firm needs to show one delivery schedule to a haulage contractor it works with. The quickest route is to issue the contractor a staff login to the firm&rsquo;s intranet. Using the supplement on internet uses, what is wrong with that?",
     opts:[
       "Nothing is wrong, provided the contractor is asked not to open anything other than the delivery schedule while it is logged in",
       "An employee login carries everything else an employee can reach, so an outside firm would be granted the whole internal site in order to see one schedule",
       "Intranets are technically incapable of showing a page to anyone outside the organization, so the login would simply fail when the contractor tried to use it",
       "The schedule should be published on the public site instead, because anything a partner is allowed to see has already stopped being confidential and needs no protection"],
     a:1, obj:"3.6",
     why:[
       "An instruction is not a restriction. The supplement&rsquo;s point is that access is granted by the credential rather than by the request that accompanies it.",
       "Correct. This is one of the three ways of getting the audience wrong: partners handed employee access receive everything else an employee can reach along with the one thing they were meant to see. The extranet exists precisely so that authorized partners get a restricted view rather than a staff view.",
       "There is no such technical barrier. An intranet uses the same web technologies as any other site, and it is authentication rather than the technology that decides who gets in.",
       "A schedule shared with one contractor is not public. Publishing it would hand a competitor the firm&rsquo;s delivery pattern, which is the first of the three ways of getting the audience wrong."]},

    {q:"A hypothetical garden supplier sells only through its own website. Its owner argues that because the business owns no shop, its infrastructure matters less than a high-street rival&rsquo;s. Using the supplement on internet uses, what does the chapter&rsquo;s material say?",
     opts:[
       "The owner is right, because a rented site transfers the whole question of availability to the provider that operates the servers",
       "The owner is right for most of the year and wrong only in December, since a seasonal spike is the single moment at which a website has to be treated as infrastructure",
       "It matters more: the site is the shop, so a firm trading electronically strives for the highest availability of its hardware, storage and networking",
       "Availability targets belong to organizations large enough to run a data center of their own, so a supplier of this size has no reason to think about downtime at all and should spend the money on stock instead"],
     a:2, obj:"3.6",
     why:[
       "Renting moves who operates the machines, not who loses the sale. The supplement is explicit that the availability of the store is the availability of the site.",
       "The December spike is real and it is not the whole argument. A page that fails to load on an ordinary Monday costs the orders that would have been placed that Monday.",
       "Correct. The chapter says organizations depending on electronic trading strive for the highest availability of their hardware, storage and networking components, and describes the five-nines target as leaving just over five minutes of downtime in a year &mdash; which for this firm is the door being locked with customers outside.",
       "The chapter attaches availability to the dependence rather than to the size of the organization, and a firm that trades only online is more dependent than a shop with a till, not less."]}
  ]
};
