/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s62a = "\n<span class=\"eyebrow\">Objective 6.2 · Part 1</span><h2>Tables, keys, and relationships</h2>\n<p class=\"lede\">A customer places several orders, and each order contains several products. A useful database must represent those connections without confusing a person, a purchase, and a product. Designing that structure is a business reasoning task before it becomes a software task.</p>\n<h3>Name the things and their properties</h3>\n<p>A <b>database</b> is an organized collection of related data. A <b>relational database management system (RDBMS)</b> is the software used to define, store, organize, and retrieve data in related tables. The stored records are the database; the software managing them is the RDBMS. A website can query those records to populate a reusable product-page template.</p>\n<p>A <b>data model</b> describes the entities and relationships the organization needs. The model should answer ordinary questions: what counts as an order, can a customer place more than one, and can one product appear on several orders? Work through these questions with the people who perform the process.</p>\n<p>The relational vocabulary separates four levels that are easy to mix up:</p>\n<ul class=\"keys\"><li><b>Entity</b> means a kind of thing being described, such as a customer, product, order, or employee.</li><li><b>Table</b> organizes records about an entity or relationship into rows and columns with defined meanings.</li><li><b>Record</b> means one row, such as the information describing order 501 rather than every order in the company.</li><li><b>Attribute</b> means a property represented by a column, such as an order date, quantity, or customer identifier.</li></ul>\n<div class=\"activity\" data-activity=\"modelMatch\"></div>\n<h3>Choose types and document meaning</h3>\n<p>A <b>data type</b> specifies the kind of value a field holds, such as text, a number, or a date. A quantity can be used in arithmetic; a postal code is an identifier even if it contains digits. Treating a postal code as a number can discard a meaningful leading zero.</p>\n<p>A <b>data dictionary</b>, also called a metadata repository, explains field names, types, valid values, business meanings, and uses. <b>Metadata</b> is data describing other data. Document whether a price includes tax, which currency it uses, and whether a timestamp represents ordering or shipping before people compare totals.</p>\n<p><b>Business rules</b> describe permitted business behavior and can guide validation. An order line may require a positive quantity; a completed shipment cannot precede the order. State exactly what event a field records. Applying a blanket ban on future dates would incorrectly reject planned delivery appointments.</p>\n<h3>Identify and connect rows</h3>\n<p>A <b>primary key</b> identifies each row uniquely and cannot be null. It can contain one column or a combination. Names make poor identifiers when different people can share a name or one person can change it. A stable customer_id lets the business retain the relationship while correcting descriptive details.</p>\n<p>A <b>foreign key</b> references a key in a related table. Orders.customer_id can reference Customers.customer_id. Repeated customer identifiers in Orders are useful: the same customer can place many orders. An enforced relationship prevents an order from pointing to a nonexistent customer.</p>\n<p>An <b>entity-relationship diagram (ERD)</b> draws entities as boxes and relationships as lines. Read the relationship in both directions:</p>\n<ul class=\"keys\"><li><b>One-to-one</b> associates at most one related record on each side, such as an employee and an assigned locker when the stated policy permits one each.</li><li><b>One-to-many</b> lets one customer have many orders, while each order in this model belongs to one customer.</li><li><b>Many-to-many</b> lets an order contain many products and a product appear in many orders; an OrderLines table records each pairing.</li></ul>\n<div class=\"activity\" data-activity=\"modelDiagram\"></div>\n<div class=\"activity\" data-activity=\"modelCase\"></div>\n<h3>Read an unfamiliar model with a business user</h3><p>For each table, finish the sentence “one row represents…” before choosing its key. One row might represent an order, an order line, or a delivery attempt. Those are different events. Counting delivery attempts as orders could overstate demand whenever a courier tries a destination more than once.</p><p>Then ask whether a relationship is required. Can an order exist before a customer is assigned, and can a product appear on no order yet? The answers determine additional rules. An ERD communicates those decisions; its boxes and lines are useful because they make assumptions available for review before data accumulates.</p><p>Check the keys against two ordinary changes:</p><ul class=\"keys\"><li><b>A changed name</b> should update a descriptive attribute while existing orders still identify the correct customer through a stable key.</li><li><b>A second order</b> should create a new order record referencing the same customer, without requiring another independently maintained customer record.</li></ul><p class=\"takeaway\">Start with the business relationship, give each row a dependable identity, and place each fact where its meaning belongs. Related tables remain tables; joining them does not create a literal third spatial dimension.</p>\n";

ACT.modelMatch = {
  "kind": "match",
  "label": "Match",
  "title": "Read the structure before the data",
  "objective": "6.2",
  "how": "Match each idea to its example, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Entity",
      "r": "The type of thing called a Product",
      "why": "A product is something the organization needs to describe and distinguish."
    },
    {
      "l": "Record",
      "r": "The row describing product P12",
      "why": "One row represents one instance, not the whole product category."
    },
    {
      "l": "Attribute",
      "r": "The unit_price column",
      "why": "The column defines a property shared by product records."
    },
    {
      "l": "RDBMS",
      "r": "The software accepting a query against Products",
      "why": "The system manages the stored data and executes the retrieval request."
    }
  ]
};

ACT.modelDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Explore the order model",
  "objective": "6.2",
  "how": "Select each tab to trace a different model. Read the connections and the explanation beneath it.",
  "models": [
    {
      "id": "0",
      "name": "Customer to orders",
      "site": "A customer can place many orders; each order has one customer.",
      "boxes": [
        {
          "t": "Customers",
          "w": "customer_id is the primary key",
          "c": "a"
        },
        {
          "t": "Orders",
          "w": "order_id is the primary key",
          "c": "b"
        },
        {
          "t": "Reference",
          "w": "Orders.customer_id is a foreign key",
          "c": "c"
        }
      ],
      "points": [
        "Customer C1 may appear in many Orders rows without duplicating the customer’s address there.",
        "A required customer_id and an enforced foreign key ensure that each order references an existing customer."
      ]
    },
    {
      "id": "1",
      "name": "Orders to products",
      "site": "Resolve the many-to-many relationship with order lines.",
      "boxes": [
        {
          "t": "Orders",
          "w": "One order has many lines",
          "c": "a"
        },
        {
          "t": "OrderLines",
          "w": "order_id + line_no identifies a line",
          "c": "b"
        },
        {
          "t": "Products",
          "w": "One product appears on many lines",
          "c": "c"
        }
      ],
      "points": [
        "OrderLines stores product_id, quantity, and the price agreed for that sale.",
        "Using line_no allows the same product to appear on separate lines if the business permits it."
      ]
    },
    {
      "id": "2",
      "name": "Dictionary to validation",
      "site": "Field definitions make the model usable.",
      "boxes": [
        {
          "t": "Meaning",
          "w": "Quantity ordered on this line",
          "c": "a"
        },
        {
          "t": "Type",
          "w": "Whole number",
          "c": "b"
        },
        {
          "t": "Rule",
          "w": "Quantity must be greater than zero",
          "c": "c"
        },
        {
          "t": "Feedback",
          "w": "Reject with an understandable explanation",
          "c": "d"
        }
      ],
      "points": [
        "A valid type alone would still permit a negative whole number.",
        "Business rules require explicit enforcement; writing them in a dictionary does not execute them."
      ]
    }
  ]
};

ACT.modelCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Two customers named Alex",
  "objective": "6.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical shop identifies customers by full name and stores a comma-separated product list in each order. Two different people named Alex Morgan now appear in its records. Staff cannot confidently link a refund to the right customer or calculate how many units of a product sold.",
  "facts": [
    {
      "k": "Customer names",
      "v": "Not unique"
    },
    {
      "k": "Orders",
      "v": "Can contain multiple products"
    },
    {
      "k": "Need",
      "v": "Correct refunds and product quantities"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Order",
      "Customer name",
      "Products"
    ],
    "rows": [
      [
        "501",
        "Alex Morgan",
        "P1, P2"
      ],
      [
        "502",
        "Alex Morgan",
        "P2, P3"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which change best fixes customer identity?",
      "opts": [
        "Use a customer_id key and reference it from Orders.",
        "Sort all customers by their first and last names.",
        "Use the first product as the customer identifier.",
        "Put every customer record into a separate report."
      ],
      "a": 0,
      "why": [
        "A stable key distinguishes the two people while a reference connects each order correctly.",
        "Sorting changes display order and cannot make two identical names identify different people.",
        "Products are purchased by many customers, so this would create new identity conflicts.",
        "Separate reports change presentation without repairing how stored orders reference customers."
      ]
    },
    {
      "q": "Where should quantity sold for each product on an order be stored?",
      "opts": [
        "In a shared customer name field.",
        "In the order’s date field as text.",
        "In the product’s current description.",
        "In a separate order-line record."
      ],
      "a": 3,
      "why": [
        "A customer name describes a person and cannot represent a product quantity per purchase.",
        "A date field describes time; combining meanings makes validation and calculation unreliable.",
        "A product description is shared across orders, while quantities vary by transaction.",
        "The order-product relationship has its own facts, including quantity and agreed price."
      ]
    }
  ],
  "debrief": "The two errors require different design choices. Customer identity needs stable keys. Products within orders need a relationship table carrying facts about each line. A better report cannot compensate for a model that never represented the distinctions the business needs."
};

