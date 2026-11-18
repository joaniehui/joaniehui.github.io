/* =====================================================================
   YOUR PORTFOLIO CONFIG — edit this file, nothing else is required.
   Every piece of text, every project, and every photo lives here.

   PHOTOS: each project is a "record" on the shelf. Its first photo becomes
   the album cover. Save photos in images/projects/ with the names listed
   below (or change the names here). Until a photo exists, the record shows
   a line-art cover instead.
   ===================================================================== */

window.PORTFOLIO = {
  // ---------- Identity ----------
  name: "Joanie Hui",
  initials: "JH",
  role: "Mechanical Engineering · University of Waterloo",
  tagline: "I like seeing a part all the way through, from the first sketch to the last test.",
  location: "Waterloo, ON",
  status: "Open to Summer 2027 co-op",
  email: "joaniehui@gmail.com",
  // Links shown as buttons at the top and in the Contact section. Set either to "" to hide it.
  // You can use a file in this folder (like "assets/resume.pdf") or a Google Drive share link.
  resume: "assets/resume.pdf",
  portfolioPdf: "https://drive.google.com/file/d/1wNL47646Q7aJTWn6l1dW6U0sUfzBA4tb/view?usp=sharing",
  // Your photo, shown in the centre of the spinning record at the top of the page.
  // Save a square-ish photo as images/projects/me.jpg (or change the name here). Set to "" to hide it.
  photo: "images/projects/me.jpg",
  photoSpins: false,                   // true = your photo spins with the record
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/joaniehui/" },
  ],

  // ---------- Look & feel ----------
  accent: "",                          // leave "" for the grayish blue, or put any color like "#2f6fb0"

  // ---------- About ----------
  about: [
    "I'm a Mechanical Engineering student at the University of Waterloo, currently on co-op in R&D Testing at Musashi North Americas and leading Chassis Safety & Ergonomics on UW Formula Electric.",
    "I'm happiest when a project takes me from CAD and virtual validation all the way to hands-on fabrication and physical testing. I'm always looking for chances to learn something new, especially in fields I haven't explored yet.",
  ],

  // Shown as "Liner notes" beside the About text
  specs: [
    { label: "Program", value: "BASc Mechanical Engineering, University of Waterloo" },
    { label: "Co-op",   value: "R&D Testing, Musashi North Americas" },
    { label: "Team",    value: "UW Formula Electric, Chassis" },
  ],

  // "On rotation": interests (any emoji works as an icon)
  interests: [
    { icon: "🎧", label: "Music",                  note: "✏️ your favourite genres" },
    { icon: "🏎️", label: "Formula Electric",       note: "Building a race car with the team" },
    { icon: "🧵", label: "Composites",             note: "Lightweight structures and layups" },
    { icon: "🖥️", label: "Simulation",             note: "FEA and CFD to test ideas before building" },
  ],

  // ✏️ "Now playing": what you're up to right now
  currently: [
    "Spinning: (your favourite record right now)",
    "R&D Testing co-op at Musashi North Americas",
    "Leading Chassis Safety & Ergonomics on UW Formula Electric",
    "Looking for a Summer 2027 co-op",
  ],

  // ---------- Discography (experience) ----------
  experience: [
    { when: "Sep 2026 – Present", title: "R&D Testing Co-op",                 org: "Musashi North Americas", where: "Waterloo, ON" },
    { when: "Jan – Apr 2026",     title: "Chassis Mechanical Intern",         org: "UW Formula Electric",   where: "Waterloo, ON" },
    { when: "Sep 2025 – Present", title: "Chassis Safety & Ergonomics Lead",  org: "UW Formula Electric",   where: "Waterloo, ON" },
  ],

  // ---------- Projects (the record shelf) ----------
  // The first image is the album cover. Captions are optional.
  // Covers are square, so photos get cropped to fit. Per photo you can add
  //   fit: "contain"     → show the whole photo, no cropping
  //   position: "top"    → keep the top in view when cropping ("bottom", "left", "right" work too)
  // Set upcoming: true to show a "coming soon" sticker on the sleeve.
  // Records alternate between vinyl and CD automatically. To choose, add
  // format: "cd" or format: "vinyl" to a project.
  projects: [
    {
      title: "Torque Machine Calibration",
      category: "Musashi",
      year: 2026,
      summary: "I owned the calibration of the lab's torque machine across 4 sensors, from fixture design to procedure development.",
      description: [
        "I took full ownership of calibrating the torque test machine, covering 4 sensors: an angle sensor, two load cells, and a torque transducer.",
        "For the angle sensor, I designed a protractor holder and developed a bidirectional procedure that accounts for uncertainty and repeatability. I calibrated the sensor to ±0.4% of full scale.",
        "I designed the multi-sensor calibration fixtures in-house, with part and assembly drawings, GD&T and BOMs. This saved about $1,000 in equipment costs.",
        "I devised the calibration procedures for the two load cells and the torque transducer, including a multi-level procedure for the transducer, then handled the data acquisition and processing to validate their accuracy.",
      ],
      images: [
        { src: "images/projects/calibration-1.jpg", caption: "Calibration setup on the torque machine" },
        { src: "images/projects/calibration-2.jpg", caption: "Torque transducer fixture" },
        { src: "images/projects/calibration-3.jpg", caption: "Load cell fixture drawing" },
        { src: "images/projects/calibration-4.jpg", caption: "Angle sensor protractor holder" },
      ],
      stats: [
        { label: "sensors",    value: "4" },
        { label: "full scale", value: "±0.4%" },
        { label: "saved",      value: "$1,000" },
      ],
      tags: ["SolidWorks", "GD&T", "Fixture design", "Uncertainty analysis", "LabVIEW", "Excel"],
      links: [],
    },
    {
      title: "Carbon Fiber Floor Panels & Composites",
      category: "Formula Electric",
      year: "2025–26",
      summary: "Leading the design and manufacturing of carbon fiber floor panels for a 65% mass reduction, plus the car's other composite parts.",
      description: [
        "I'm leading the design and manufacturing of the car's carbon fiber floor panels, targeting a 65% mass reduction.",
        "I validated the composite stacking sequence in Ansys ACP to reach a minimum safety factor of 1.5.",
        "By minimizing the total panel count, I improved serviceability and assembly efficiency by 33%. I refined the driver compartment packaging to integrate 6 sub-assemblies, using water-jet post-processing.",
        // ✏️ Add specifics: layup method (wet layup / vacuum bagging / prepreg), mold making
        "I also manufactured other composite parts for the car: a Kevlar lid, a Kevlar dash plate, and a carbon fiber headrest plate.",
      ],
      images: [
        { src: "images/projects/floor-1.jpg", caption: "Carbon fiber floor panel" },
        { src: "images/projects/floor-2.jpg", caption: "Ansys ACP layup analysis" },
        { src: "images/projects/floor-3.jpg", caption: "Layup in progress" },
        { src: "images/projects/composites-1.jpg", caption: "Kevlar dash plate" },
        { src: "images/projects/composites-2.jpg", caption: "Carbon fiber headrest plate" },
      ],
      stats: [
        { label: "mass",                value: "−65%" },
        { label: "min. safety factor",  value: "1.5" },
        { label: "assembly efficiency", value: "+33%" },
      ],
      tags: ["Ansys ACP", "Carbon fiber", "Kevlar", "Composite layup", "Water-jet"],
      links: [],
    },
    {
      title: "FSAE LV Battery Enclosure",
      category: "Formula Electric",
      year: 2026,
      summary: "A smaller, lighter enclosure for the 46Ah low-voltage battery: 30% less volume, 43% less mass, 75% faster swaps.",
      description: [
        "I redesigned the enclosure for the car's 46Ah low-voltage battery to optimize rear chassis packaging. It takes up 30% less volume.",
        "I cut the enclosure's mass by 43% by printing it in UL94 V-0 polycarbonate filament, which meets FSAE safety standards.",
        "I validated fitment clearances with CAD sweeps and 3D-printed prototypes to eliminate assembly interferences.",
        "Dedicated service access features and snap-on geometry cut battery swap time by 75%.",
      ],
      images: [
        { src: "images/projects/lv-enclosure-1.jpg", caption: "LV battery enclosure" },
        { src: "images/projects/lv-enclosure-2.jpg", caption: "CAD model" },
        { src: "images/projects/lv-enclosure-3.jpg", caption: "3D-printed prototype fit check" },
      ],
      stats: [
        { label: "volume",    value: "−30%" },
        { label: "mass",      value: "−43%" },
        { label: "swap time", value: "−75%" },
      ],
      tags: ["SolidWorks", "3D printing", "UL94 V-0", "FSAE rules", "Design for service"],
      links: [],
    },
    {
      title: "Primary & Secondary Firewalls",
      category: "Formula Electric",
      year: "2025–26",
      summary: "The firewalls that separate the driver from the car's systems, designed to FSAE rules and validated with FEA.",
      description: [
        // ✏️ Say what each firewall separates, and which results below belong to which one
        "I'm designing and integrating the car's primary and secondary firewalls, along with the cockpit floor, to keep the driver safe in compliance with FSAE rules.",
        "I ran structural FEA to optimize the firewall material configuration for a minimum safety factor of 1.5.",
        "My preliminary firewall model cut sealing interfaces by 66%. A packaging study and tests on a physical prototype found interferences with the accumulator mounting, and showed the clearance needed to keep the side closeouts.",
      ],
      images: [
        { src: "images/projects/firewall-1.jpg", caption: "Firewall CAD" },
        { src: "images/projects/firewall-2.jpg", caption: "FEA results" },
        { src: "images/projects/firewall-3.jpg", caption: "Physical prototype" },
      ],
      stats: [
        { label: "sealing interfaces", value: "−66%" },
        { label: "min. safety factor", value: "1.5" },
      ],
      tags: ["SolidWorks", "Ansys Mechanical", "FEA", "Packaging study", "FSAE rules"],
      links: [],
    },
    {
      title: "Radial Lift Test Fixture",
      category: "Musashi",
      year: 2026,
      summary: "A custom V-block fixture that holds the full range of ball joint housing sizes and loads through the ball center.",
      description: [
        "I designed a custom fixture for radial lift testing of ball joints. First I reverse-engineered the radial lift machine in CAD as a parametric model, so I could design around its real geometry.",
        "The V-block design is versatile: it fits both the maximum and minimum housing dimensions, uses less material, and keeps the load on the ball center.",
        "Deliverables included part and assembly drawings with GD&T and a BOM.",
      ],
      images: [
        { src: "images/projects/radial-fixture-1.jpg", caption: "Radial lift fixture" },
        { src: "images/projects/radial-fixture-2.jpg", caption: "V-block design in SolidWorks" },
        { src: "images/projects/radial-fixture-3.jpg", caption: "Reverse-engineered machine model" },
      ],
      stats: [
        { label: "housing sizes", value: "Min → Max" },
        { label: "CAD",           value: "Parametric" },
      ],
      tags: ["SolidWorks", "Reverse engineering", "Parametric modeling", "GD&T", "BOM"],
      links: [],
    },
    {
      title: "FSAE Vehicle Maintenance Stands",
      category: "Formula Electric",
      year: 2026,
      summary: "4130 steel stands, TIG welded and machined to ±0.1 mm, that give clearance to remove the high-voltage battery.",
      description: [
        "I designed 4130 steel maintenance stands that give enough clearance to remove the high-voltage battery and service the car.",
        "I TIG welded and machined them on the lathe and mill, holding ±0.1 mm tolerance and 0.0° parallel alignment.",
        "I also wrote a Standard Operating Procedure for lifting the car safely, so the team stays fully compliant with its safety protocols.",
      ],
      images: [
        { src: "images/projects/stands-1.jpg", caption: "Car on the stands" },
        { src: "images/projects/stands-2.jpg", caption: "Stand design" },
        { src: "images/projects/stands-3.jpg", caption: "Welding" },
      ],
      stats: [
        { label: "tolerance",   value: "±0.1 mm" },
        { label: "parallelism", value: "0.0°" },
        { label: "material",    value: "4130" },
      ],
      tags: ["SolidWorks", "TIG welding", "Lathe", "Mill", "SOP writing"],
      links: [],
    },
    {
      title: "Ball Joint Testing & Validation",
      category: "Musashi",
      year: 2026,
      summary: "Prototype correlation testing and production validation of ball joints and control arms against customer specs.",
      description: [
        "I verified the functional compliance of more than 200 ball joints with oscillation, torque, and lift durability tests, and assembled more than 150 control arms to strict customer tolerances.",
        "For a prototype correlation study, I ran more than 500 tests on more than 150 parts, measuring oscillation and running torque (at fast and slow speeds), breakaway torque, and stick-slip.",
        "I used statistical lot sampling to qualify whole batches: 6 parts randomly selected from a 40-unit lot stood in for the full lot. Axial lift was analyzed with hysteresis loop graphs.",
        "Quality checks included CMM inspection, surface quality, grease burn, caulking validation, and straightness testing.",
      ],
      images: [
        { src: "images/projects/ball-joint-1.jpg", caption: "Ball joint on the torque test machine" },
        { src: "images/projects/ball-joint-2.jpg", caption: "Axial lift hysteresis loop" },
        { src: "images/projects/ball-joint-3.jpg", caption: "Control arm assembly" },
      ],
      stats: [
        { label: "ball joints", value: "200+" },
        { label: "tests",       value: "500+" },
        { label: "control arms", value: "150+" },
      ],
      tags: ["Torque testing", "Durability testing", "CMM", "SPC / lot sampling", "Data acquisition"],
      links: [],
    },
    {
      title: "Chassis Frame",
      category: "Formula Electric",
      year: "Upcoming",
      upcoming: true,
      summary: "Next up: tacking and welding the car's chassis frame.",
      description: [
        "I'll be tacking and welding the car's frame, building on the welding experience from the mock front bulkhead and the vehicle stands. I'll update this record as the build progresses.",
      ],
      images: [
        { src: "images/projects/frame-1.jpg", caption: "Frame build" },
      ],
      tags: ["TIG welding", "Tacking", "Fabrication"],
      links: [],
    },
    {
      title: "VEX Automated Pipetting Machine",
      category: "Robotics",
      year: 2026,
      summary: "A course project: a VEX pipetting machine coded in C++, packaged into a 60 cm footprint on a $100 budget.",
      description: [
        "For a course project, we built an automated pipetting machine on the VEX platform and programmed it in C++.",
        "I resolved interferences between the machine's 3 subsystems by integrating the CAD packaging within a strict 60 cm footprint.",
        "I made the custom structural parts by 3D printing and laser cutting, staying within a $100 budget.",
        "Through iterative testing and system calibration, we kept volumetric error at or below 20% across all pipetting volumes.",
      ],
      images: [
        { src: "images/projects/pipetting-1.jpg", caption: "Pipetting machine" },
        { src: "images/projects/pipetting-2.jpg", caption: "CAD packaging" },
      ],
      stats: [
        { label: "footprint",  value: "60 cm" },
        { label: "budget",     value: "$100" },
        { label: "vol. error", value: "≤20%" },
      ],
      tags: ["C++", "VEX", "SolidWorks", "AutoCAD", "3D printing", "Laser cutting"],
      links: [],
    },
    {
      title: "Pedal Welding Jigs",
      category: "Formula Electric",
      year: 2026,
      summary: "Custom welding jigs that hold pedal clevis position and concentricity to ±0.1 mm.",
      description: [
        "I designed and manufactured custom pedal welding jigs that hold clevis positioning and concentricity to ±0.1 mm.",
      ],
      images: [
        { src: "images/projects/jigs-1.jpg", caption: "Pedal welding jig" },
      ],
      stats: [
        { label: "positioning", value: "±0.1 mm" },
      ],
      tags: ["Jig design", "Welding", "SolidWorks"],
      links: [],
    },
    {
      title: "Headrest Locating Jig",
      category: "Formula Electric",
      year: 2026,
      summary: "A jig that aligns the headrest during mounting so the car meets FSAE rollover safety rules.",
      description: [
        "I designed a headrest locating jig that holds the headrest in alignment while it's mounted, so it ends up in the right position every time.",
        "Accurate headrest placement is part of meeting FSAE rollover safety rules, so the jig keeps the car compliant.",
      ],
      images: [
        { src: "images/projects/jig-2.jpg", caption: "Headrest locating jig" },
      ],
      tags: ["Jig design", "SolidWorks", "FSAE rules", "Rollover safety"],
      links: [],
    },
    {
      title: "Pedal Heel Cups",
      category: "Formula Electric",
      year: 2026,
      summary: "Heel cups made 25% lighter by switching from rivets to epoxy bonding, and positioned for multiple driver heights.",
      description: [
        "I cut the pedal heel cups' mass by 25% by switching from rivets to epoxy bonding, and validated the bond with shear analysis.",
        "I ran a positioning study across multiple driver heights to place the heel cups for better pedal control.",
      ],
      images: [
        { src: "images/projects/heel-cups-1.jpg", caption: "Pedal heel cups" },
      ],
      stats: [
        { label: "mass", value: "−25%" },
      ],
      tags: ["Epoxy bonding", "Shear analysis", "Ergonomics", "SolidWorks"],
      links: [],
    },
    {
      title: "Mock Front Bulkhead",
      category: "Formula Electric",
      year: "2025–26",
      summary: "I led the tacking and welding of a mock front bulkhead used to test the impact attenuator.",
      description: [
        "I was in charge of tacking and TIG welding a mock front bulkhead, which the team used for quasi-static testing of the impact attenuator.",
      ],
      images: [
        { src: "images/projects/bulkhead-1.jpg", caption: "Mock front bulkhead" },
        { src: "images/projects/bulkhead-2.jpg", caption: "Impact attenuator test" },
      ],
      tags: ["TIG welding", "Tacking", "Fabrication", "Impact attenuator"],
      links: [],
    },
    {
      title: "Taper Holders",
      category: "Musashi",
      year: 2026,
      summary: "A family of 3D-printed taper holders built from one SolidWorks model using configurations.",
      description: [
        "I designed taper holders as a single SolidWorks part with configurations, so one model could produce every size we needed. Then I 3D-printed them.",
        "The project taught me how taper dimensions are specified and formatted on drawings.",
      ],
      images: [
        { src: "images/projects/taper-1.jpg", caption: "Printed taper holders" },
        { src: "images/projects/taper-2.jpg", caption: "SolidWorks configurations" },
      ],
      tags: ["SolidWorks configurations", "3D printing", "Taper dimensioning"],
      links: [],
    },
  ],

  // ---------- Skills ("Credits") ----------
  skills: [
    { group: "Design & Analysis",     items: ["SolidWorks", "AutoCAD", "Ansys Mechanical", "Ansys ACP", "SolidWorks FEA", "GD&T", "Parametric modeling"] },
    { group: "Fabrication",           items: ["TIG welding", "Spot welding", "Lathe", "Mill", "3D printing", "Laser cutting", "Composite layup"] },
    { group: "Testing & Metrology",   items: ["CMM", "Sensor calibration", "Torque & lift testing", "Uncertainty analysis", "SPC / lot sampling"] },
    { group: "Software & Data",       items: ["MATLAB", "Python", "Java", "C++", "LabVIEW", "Excel"] },
  ],

  // ---------- Contact ----------
  contactHeadline: "Let's build something together.",
  contactText: "I'm currently looking for a Summer 2027 co-op. If you think I'd be a good fit for your team, my inbox is open.",

  // A little message for anyone who opens the browser dev console
  consoleMessage: "Thanks for looking under the hood. Feel free to reach out.",
};
