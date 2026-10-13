window.NavariAIData = window.NavariAIData || {};
window.NavariAIData.projects = [
  {
    "id": "agrisathi",
    "title": "AgriSathi — Smart Farmer Assistant",
    "category": "IoT & Machine Learning",
    "domain": "Agriculture & AI",
    "status": "Completed / Active Showcase",
    "description": "An intelligent digital assistant and crop recommendation platform combining machine learning algorithms with IoT environmental sensors to provide real-time agricultural guidance.",
    "objective": "Empower farmers with data-driven crop selection and automated field monitoring to maximize yield and conserve water resources.",
    "architecture": "Sensor data collection (soil moisture, pH, temperature) -> Feature normalization pipeline -> Predictive crop classification model -> Actionable advisories presented via web dashboard.",
    "technologies": [
      "Python",
      "Machine Learning",
      "IoT Sensors",
      "Data Analysis",
      "Scikit-Learn",
      "Flask"
    ],
    "highlights": [
      "Data-driven crop recommendations based on environmental feature vectors",
      "Telemetry integration with IoT ground sensors for continuous monitoring",
      "Intuitive farmer-centric advisory reports"
    ],
    "repoUrl": "https://github.com/YashwanthNavari/agrisathi--smart-farmer-assistant",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "age-gender-detection",
    "title": "Age & Gender Detection (NeuroVision)",
    "category": "Computer Vision & Deep Learning",
    "domain": "Computer Vision",
    "status": "Completed",
    "description": "Real-time demographic analysis system that accurately predicts age groups and gender classifications directly from live video streams using Convolutional Neural Networks (CNNs).",
    "objective": "Achieve high-frame-rate demographic inference on consumer hardware without prohibitive computational latency.",
    "architecture": "OpenCV video capture -> Haar Cascade/DNN facial localization -> Face alignment & normalization -> Multi-head CNN forward pass -> Real-time HUD bounding box and probability annotation.",
    "technologies": [
      "Python",
      "OpenCV",
      "CNN",
      "Deep Learning",
      "NumPy",
      "TensorFlow"
    ],
    "highlights": [
      "Sub-50ms inference latency per video frame",
      "Dual-task classification architecture (gender probability + age bracket)",
      "Robust face normalization under varying lighting angles"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "ml-object-detection",
    "title": "Real-Time Object Detection & Tracking",
    "category": "Computer Vision",
    "domain": "Computer Vision",
    "status": "Completed",
    "description": "Real-time multi-class object detection and tracking pipeline utilizing YOLO architectures and deep CNN feature extractors on high-throughput video streams.",
    "objective": "Deploy low-latency object localization and tracking for surveillance and automated monitoring scenarios.",
    "architecture": "Video stream demuxing -> Single-stage bounding box prediction (YOLO) -> Non-Maximum Suppression (NMS) -> Object tracking vector calculation.",
    "technologies": [
      "Python",
      "OpenCV",
      "YOLO",
      "CNN",
      "PyTorch",
      "Computer Vision"
    ],
    "highlights": [
      "High frame-rate multi-object localization and classification",
      "Custom confidence thresholding and spatial IoU tracking",
      "Engineered for edge deployment resilience"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "smart-parking",
    "title": "Smart Parking Management System",
    "category": "Software Engineering & Algorithms",
    "domain": "Software Engineering",
    "status": "Completed",
    "description": "Desktop parking optimization software featuring an intuitive GUI and algorithmic vehicle slot allocation powered by custom data structures.",
    "objective": "Eliminate parking congestion and manual logging through automated slot indexing and ticket generation.",
    "architecture": "Custom hash index & priority queue slot manager -> Event-driven Tkinter UI -> File persistence and fee calculation ledger.",
    "technologies": [
      "Python",
      "Tkinter",
      "Data Structures",
      "Algorithmic Optimization"
    ],
    "highlights": [
      "Optimized slot retrieval via custom data structures",
      "Automated parking duration tracking and tariff computation",
      "Clear administrative visualization of occupancy"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "customer-churn",
    "title": "Customer Churn Prediction Engine",
    "category": "Machine Learning & Analytics",
    "domain": "Data Science & ML",
    "status": "Completed",
    "description": "Supervised predictive classification system forecasting client attrition risk using ensemble Random Forest algorithms and thorough feature engineering.",
    "objective": "Provide business stakeholders with early risk indicators to trigger targeted customer retention workflows.",
    "architecture": "Data ingestion & handling of missing values -> Synthetic balancing -> Feature importance ranking -> Random Forest Classifier training -> Calibrated probability scoring.",
    "technologies": [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "Random Forest",
      "Data Science"
    ],
    "highlights": [
      "High precision/recall balance on imbalanced historical customer data",
      "Interpretability analysis identifying key churn drivers",
      "Clean modular scoring scripts for batch inference"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "water-level-indicator",
    "title": "Automated Water Level Indicator & Controller",
    "category": "IoT & Embedded Systems",
    "domain": "IoT Hardware",
    "status": "Completed",
    "description": "Hardware-based fluid telemetry and automated pump control station using ultrasonic distance sensors and Arduino microcontroller relays.",
    "objective": "Prevent water wastage and tank dry-running through automatic relay actuation and visual percentage feedback.",
    "architecture": "HC-SR04 ultrasonic sensor time-of-flight -> Arduino analog/digital controller -> Relay activation trigger -> Multi-stage LED & buzzer alert.",
    "technologies": [
      "C++",
      "Arduino",
      "Ultrasonic Sensors",
      "Embedded Electronics",
      "Hardware Prototyping"
    ],
    "highlights": [
      "Non-contact acoustic liquid depth measurement",
      "Failsafe automated pump shutdown on threshold breach",
      "Low power microcontroller design"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "library-management",
    "title": "Enterprise Library Database System",
    "category": "DBMS & Web Applications",
    "domain": "Databases & Full-Stack",
    "status": "Completed",
    "description": "Normalized database architecture and web management portal handling multi-tier book borrowing, student records, and fine accrual transactions.",
    "objective": "Replace redundant spreadsheets with a 3NF normalized relational schema ensuring zero record inconsistencies.",
    "architecture": "3rd Normal Form (3NF) relational database schema -> Parameterized SQL queries -> Web administration dashboard with role-based access.",
    "technologies": [
      "MySQL",
      "PHP",
      "Database Normalization",
      "Relational ER Modeling",
      "SQL"
    ],
    "highlights": [
      "Eliminated insertion, update, and deletion anomalies via 3NF normalization",
      "Efficient index design for rapid member search and inventory queries",
      "Automated transaction ledger for book return deadlines"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "campus-shuttle-routing",
    "title": "Campus Shuttle Routing Optimization",
    "category": "Algorithms & Software Eng",
    "domain": "Algorithmic Optimization",
    "status": "Completed",
    "description": "Graph-theoretical scheduling and routing simulator optimizing transit cycles for university campus shuttles.",
    "objective": "Minimize student transit wait times and operational fuel costs through algorithmic path calculation.",
    "architecture": "Campus road network modeled as a directed weighted graph -> Dijkstra/A* path optimization -> Dispatch schedule matrix.",
    "technologies": [
      "Python",
      "Graph Algorithms",
      "Dijkstra",
      "Routing Optimization"
    ],
    "highlights": [
      "Dynamic schedule adjustment based on campus peak hours",
      "Proven reduction in transit bottlenecks across simulated schedules"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "fingerprint-voting",
    "title": "Biometric Fingerprint Voting Machine",
    "category": "IoT & Security Systems",
    "domain": "Hardware Security",
    "status": "Completed",
    "description": "Hardware electronic voting prototype secured by optical fingerprint biometric verification to eliminate proxy voting and voter fraud.",
    "objective": "Deliver tamper-evident, one-person-one-vote verification using standalone hardware security modules.",
    "architecture": "Optical fingerprint scanner -> Biometric minutiae template matching -> Vote cast confirmation stored in encrypted EEPROM.",
    "technologies": [
      "Arduino",
      "Biometrics",
      "Embedded Security",
      "C++"
    ],
    "highlights": [
      "Cryptographically isolated biometric template comparison",
      "Anti-tamper vote tally locking upon session conclusion"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  },
  {
    "id": "iot-waste-management",
    "title": "Smart City IoT Waste Monitoring Station",
    "category": "IoT & Smart Cities",
    "domain": "IoT Hardware",
    "status": "Completed",
    "description": "Distributed waste receptacle monitoring network transmitting fill percentages to a central municipal dispatch dashboard.",
    "objective": "Optimize municipal sanitation truck routes and prevent overflow in public bins.",
    "architecture": "Ultrasonic depth measurement -> Microcontroller packet transmission -> Cloud telemetry aggregation -> Route dispatch alerts.",
    "technologies": [
      "IoT Sensors",
      "Python",
      "Cloud Telemetry",
      "Embedded Systems"
    ],
    "highlights": [
      "Real-time municipal capacity alerts before overflow occurs",
      "Significant reduction in unnecessary sanitation vehicle trips"
    ],
    "repoUrl": "https://github.com/YashwanthNavari",
    "liveUrl": "projects.html",
    "portfolioSection": "projects.html"
  }
];
