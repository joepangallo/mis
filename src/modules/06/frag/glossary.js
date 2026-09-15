GLOSSARY = [
  {
    "lo": "6.1",
    "t": "data-driven organization",
    "d": "An organization that incorporates data into processes and uses evidence to inform decisions.",
    "e": "A retailer uses observed demand to allocate stock and evaluate a new location."
  },
  {
    "lo": "6.1",
    "t": "data flows",
    "d": "The movement and transformation of data within and between systems.",
    "e": "An order address moves from checkout to a carrier label."
  },
  {
    "lo": "6.1",
    "t": "data silo",
    "d": "An isolated store of data that cannot readily support other organizational work.",
    "e": "Support cannot access a dispatch correction log."
  },
  {
    "lo": "6.1",
    "t": "data duplication",
    "d": "Unnecessary repetition of the same fact across records or systems.",
    "e": "Five applications separately maintain a supplier’s current phone number."
  },
  {
    "lo": "6.1",
    "t": "data inconsistency",
    "d": "A conflict between data representations, values, or business meanings.",
    "e": "Two systems show different current addresses for the same customer."
  },
  {
    "lo": "6.2",
    "t": "database",
    "d": "An organized collection of related data supporting retrieval and use.",
    "e": "Product, customer, and order records are stored together with their relationships."
  },
  {
    "lo": "6.2",
    "t": "relational database management system (RDBMS)",
    "d": "Software that defines and manages data organized in related tables.",
    "e": "The system executes a query joining customers to orders."
  },
  {
    "lo": "6.2",
    "t": "entity",
    "d": "A kind of person, object, event, or concept about which data is collected.",
    "e": "Customer and Order are different things the business describes."
  },
  {
    "lo": "6.2",
    "t": "table",
    "d": "A structure organizing records into rows and attributes into columns.",
    "e": "Products contains one row per product in the model."
  },
  {
    "lo": "6.2",
    "t": "record",
    "d": "One row describing a particular entity or relationship instance.",
    "e": "The row for order 501 stores that order’s date and customer reference."
  },
  {
    "lo": "6.2",
    "t": "attribute",
    "d": "A property represented by a column in a relational table.",
    "e": "order_date describes when an order was placed."
  },
  {
    "lo": "6.2",
    "t": "data model",
    "d": "A representation of entities, relationships, and relevant structural rules.",
    "e": "The model links Customers to Orders and Orders to OrderLines."
  },
  {
    "lo": "6.2",
    "t": "data type",
    "d": "The category of value a field holds, influencing valid operations and storage.",
    "e": "Quantity is numeric, while a postal code is text."
  },
  {
    "lo": "6.2",
    "t": "data dictionary",
    "d": "Documentation of field names, types, meanings, valid values, and uses.",
    "e": "A price definition specifies the currency and whether tax is included."
  },
  {
    "lo": "6.2",
    "t": "metadata",
    "d": "Information describing other data and its context.",
    "e": "A sensor dataset’s units and collection time describe its readings."
  },
  {
    "lo": "6.2",
    "t": "business rules",
    "d": "Policies defining valid business behavior and acceptable records.",
    "e": "An order-line quantity must be greater than zero."
  },
  {
    "lo": "6.2",
    "t": "primary key",
    "d": "A chosen column or combination that uniquely identifies each row and cannot be null.",
    "e": "order_id distinguishes each order even when two were placed at the same time."
  },
  {
    "lo": "6.2",
    "t": "foreign key",
    "d": "A column or combination referencing a key in a related table.",
    "e": "Orders.customer_id refers to a customer in Customers."
  },
  {
    "lo": "6.2",
    "t": "entity-relationship diagram (ERD)",
    "d": "A diagram showing entities and the relationships between them.",
    "e": "Boxes and connecting lines show one customer associated with many orders."
  },
  {
    "lo": "6.2",
    "t": "one-to-one",
    "d": "A relationship allowing at most one related instance on each side.",
    "e": "A policy assigns each employee at most one dedicated locker and each locker to at most one employee."
  },
  {
    "lo": "6.2",
    "t": "one-to-many",
    "d": "A relationship in which one instance can relate to several instances on the other side.",
    "e": "One customer can place many orders; each order has one customer in this model."
  },
  {
    "lo": "6.2",
    "t": "many-to-many",
    "d": "A relationship permitting multiple related instances in both directions.",
    "e": "Orders contain products and products occur in orders, connected through order lines."
  },
  {
    "lo": "6.2",
    "t": "normalization",
    "d": "Organization of relational tables to reduce unnecessary duplication and inappropriate dependencies.",
    "e": "Instructor contact details are separated from individual student grades."
  },
  {
    "lo": "6.2",
    "t": "program–data independence",
    "d": "Separation of application logic from data management that reduces certain maintenance dependencies.",
    "e": "Several applications reuse a centrally managed data structure."
  },
  {
    "lo": "6.2",
    "t": "master data",
    "d": "Core shared descriptions of business actors and things.",
    "e": "Customer, supplier, product, and employee records are shared across processes."
  },
  {
    "lo": "6.2",
    "t": "master data management (MDM)",
    "d": "Organizational coordination of shared data identity, definitions, ownership, and quality.",
    "e": "Two divisions agree which records describe the same supplier."
  },
  {
    "lo": "6.2",
    "t": "form",
    "d": "An interface with fields for entering or changing data.",
    "e": "A customer updates a delivery address using labeled input fields."
  },
  {
    "lo": "6.2",
    "t": "query",
    "d": "A request that retrieves or operates on data according to specified criteria.",
    "e": "A request selects orders delayed by more than two days."
  },
  {
    "lo": "6.2",
    "t": "Structured Query Language (SQL)",
    "d": "A language used to define, query, and manipulate relational data.",
    "e": "SELECT retrieves columns from rows that satisfy a WHERE condition."
  },
  {
    "lo": "6.2",
    "t": "report",
    "d": "An organized presentation of data for a user.",
    "e": "A manager reads a summary of late deliveries by branch."
  },
  {
    "lo": "6.2",
    "t": "report generator",
    "d": "A tool for creating organized presentations of query results.",
    "e": "A visual designer builds a recurring branch performance report."
  },
  {
    "lo": "6.2",
    "t": "scheduled reports",
    "d": "Presentations produced at predefined intervals.",
    "e": "The standard fulfillment summary arrives each morning."
  },
  {
    "lo": "6.2",
    "t": "key-indicator reports",
    "d": "Presentations of metrics considered critical to a goal.",
    "e": "A management panel shows on-time delivery and cost per shipment."
  },
  {
    "lo": "6.2",
    "t": "exception reports",
    "d": "Presentations highlighting observations outside a defined acceptable range.",
    "e": "A list contains only orders delayed more than two days."
  },
  {
    "lo": "6.2",
    "t": "drill-down reports",
    "d": "Presentations that expose more detail beneath a summary.",
    "e": "Selecting a branch reveals the late orders behind its total."
  },
  {
    "lo": "6.2",
    "t": "ad hoc queries",
    "d": "Requests created to answer an unplanned information need.",
    "e": "A manager investigates orders affected by an unexpected road closure."
  },
  {
    "lo": "6.2",
    "t": "operational systems",
    "d": "Systems supporting the current state and daily transactions of the business.",
    "e": "An order system reserves inventory during checkout."
  },
  {
    "lo": "6.2",
    "t": "online transaction processing (OLTP)",
    "d": "Processing of concurrent business transactions through defined reads and updates.",
    "e": "The system records a purchase and produces a receipt."
  },
  {
    "lo": "6.2",
    "t": "informational systems",
    "d": "Systems supporting analysis and decisions with historical or point-in-time information.",
    "e": "A manager compares two years of promotions and returns."
  },
  {
    "lo": "6.2",
    "t": "online analytical processing (OLAP)",
    "d": "Analysis of summarized data from different perspectives to support decisions.",
    "e": "An analyst compares sales by product, region, and period."
  },
  {
    "lo": "6.2",
    "t": "data warehouse",
    "d": "An integrated repository designed for historical analysis and reporting across sources.",
    "e": "Orders and refunds from several divisions support a consistent profitability analysis."
  },
  {
    "lo": "6.2",
    "t": "extraction, transformation, and loading (ETL)",
    "d": "A process retrieving source data, preparing it, and placing the result in a destination.",
    "e": "Orders are extracted, identifiers reconciled, and accepted records loaded for reporting."
  },
  {
    "lo": "6.2",
    "t": "data cleansing",
    "d": "Detection and correction or documented removal of inaccurate or inconsistent data.",
    "e": "Known date formats are standardized while ambiguous dates are flagged."
  },
  {
    "lo": "6.2",
    "t": "denormalization",
    "d": "Deliberate combination or repetition of selected data to serve a workload.",
    "e": "An analytical table includes commonly queried customer and order attributes."
  },
  {
    "lo": "6.2",
    "t": "data mart",
    "d": "An analytical collection limited to a business area or user group.",
    "e": "A finance team uses a selected subset of warehouse data."
  },
  {
    "lo": "6.3",
    "t": "big data",
    "d": "Data whose scale, diversity, or speed creates substantial management challenges.",
    "e": "A fleet combines years of footage with rapidly arriving sensor messages."
  },
  {
    "lo": "6.3",
    "t": "volume",
    "d": "The amount of data accumulated or processed.",
    "e": "An archive grows to billions of events."
  },
  {
    "lo": "6.3",
    "t": "variety",
    "d": "The diversity of data structures, formats, and meanings.",
    "e": "An investigation combines invoice tables, event documents, notes, and video."
  },
  {
    "lo": "6.3",
    "t": "velocity",
    "d": "The rate at which data arrives and the speed required to use it.",
    "e": "A sensor alert must trigger a response within seconds."
  },
  {
    "lo": "6.3",
    "t": "structured data",
    "d": "Information following a defined, consistent organization.",
    "e": "Order rows contain typed identifiers, dates, and quantities."
  },
  {
    "lo": "6.3",
    "t": "semistructured data",
    "d": "Information with identifiable elements and a flexible record structure.",
    "e": "A JSON event includes nested readings and optional device context."
  },
  {
    "lo": "6.3",
    "t": "unstructured data",
    "d": "Information that does not follow a predefined tabular business schema.",
    "e": "Repair notes and camera recordings require interpretation for many analyses."
  },
  {
    "lo": "6.3",
    "t": "non-relational databases",
    "d": "Systems using data models beyond conventional related tables.",
    "e": "A document store retrieves nested event records as units."
  },
  {
    "lo": "6.3",
    "t": "NoSQL",
    "d": "A category name meaning not only SQL, commonly applied to non-relational databases.",
    "e": "A system uses flexible documents for evolving event records."
  },
  {
    "lo": "6.3",
    "t": "document data store",
    "d": "A database organizing records as documents with potentially nested and optional fields.",
    "e": "One order document contains an array of purchased items."
  },
  {
    "lo": "6.3",
    "t": "distributed computing",
    "d": "Division of processing or storage tasks among multiple computers.",
    "e": "A large processing job distributes work across a cluster."
  },
  {
    "lo": "6.3",
    "t": "data lake",
    "d": "A repository preserving varied data in original formats for later processing.",
    "e": "An organization retains raw event documents, tables, and recordings with a catalog."
  },
  {
    "lo": "6.3",
    "t": "data swamp",
    "d": "An inadequately governed repository whose data is hard to discover, interpret, or trust.",
    "e": "Sensor files have no documented owners, units, or collection context."
  }
];
