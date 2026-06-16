'use strict'

/**
 * Courses. Topics and structure are inspired by popular online learning
 * platforms (freeCodeCamp, The Odin Project, Coursera, Udemy, Codecademy).
 * Prices are in IDR; many foundational courses are free (price = 0).
 * Thumbnails use the deterministic picsum.photos seed endpoint so every
 * course renders a stable image without bundling assets.
 */
const thumb = (seed) => `https://picsum.photos/seed/${seed}/640/360`

const courses = [
  // ── Web / Frontend ────────────────────────────────────────────────
  { name: 'Responsive Web Design with HTML & CSS', category: 'Frontend Development', difficulty: 'easy', price: 0,
    description: 'Build accessible, responsive layouts from scratch using semantic HTML5 and modern CSS — flexbox, grid, and media queries. Based on the freeCodeCamp Responsive Web Design certification.' },
  { name: 'JavaScript Algorithms and Data Structures', category: 'Programming Languages', difficulty: 'medium', price: 0,
    description: 'Master core JavaScript: variables, functions, ES6+, recursion, and the fundamental algorithms and data structures every developer should know.' },
  { name: 'Modern JavaScript from Zero to Hero', category: 'Programming Languages', difficulty: 'easy', price: 149000,
    description: 'A complete tour of modern JavaScript — DOM manipulation, async/await, fetch, modules, and clean code patterns used in production apps.' },
  { name: 'Vue.js 3 — The Complete Guide', category: 'Frontend Development', difficulty: 'medium', price: 199000,
    description: 'Learn Vue 3 with the Composition API, Pinia state management, Vue Router, and component-driven design by building real single-page applications.' },
  { name: 'React — From Beginner to Advanced', category: 'Frontend Development', difficulty: 'medium', price: 249000,
    description: 'Components, hooks, context, and routing in React. Build, test, and deploy a full single-page application following industry best practices.' },
  { name: 'Tailwind CSS Masterclass', category: 'Frontend Development', difficulty: 'easy', price: 99000,
    description: 'Design beautiful, utility-first interfaces fast. Covers responsive design, dark mode, custom themes, and component extraction with Tailwind CSS.' },
  { name: 'TypeScript Fundamentals', category: 'Programming Languages', difficulty: 'medium', price: 179000,
    description: 'Add static typing to JavaScript. Learn types, interfaces, generics, and how to integrate TypeScript into React and Node projects.' },

  // ── Backend ───────────────────────────────────────────────────────
  { name: 'Node.js & Express REST API Development', category: 'Backend Development', difficulty: 'medium', price: 199000,
    description: 'Build production-grade REST APIs with Node.js and Express — routing, middleware, authentication, error handling, and deployment.' },
  { name: 'API Authentication with JWT', category: 'Backend Development', difficulty: 'medium', price: 129000,
    description: 'Implement secure stateless authentication using JSON Web Tokens, refresh tokens, password hashing with bcrypt, and role-based access control.' },
  { name: 'Building APIs with Python & FastAPI', category: 'Backend Development', difficulty: 'medium', price: 189000,
    description: 'Create fast, typed, auto-documented APIs with FastAPI, Pydantic validation, dependency injection, and async database access.' },
  { name: 'Django for Web Developers', category: 'Backend Development', difficulty: 'medium', price: 219000,
    description: 'The batteries-included Python framework: models, the ORM, admin, templates, forms, and building a complete data-driven web application.' },

  // ── Databases ─────────────────────────────────────────────────────
  { name: 'SQL & Relational Databases', category: 'Databases', difficulty: 'easy', price: 0,
    description: 'Query and design relational databases. SELECT, JOIN, aggregation, indexes, normalization, and transactions using PostgreSQL.' },
  { name: 'PostgreSQL for Developers', category: 'Databases', difficulty: 'medium', price: 159000,
    description: 'Go beyond the basics: window functions, CTEs, JSON columns, performance tuning, and database design for real applications.' },
  { name: 'MongoDB & NoSQL Essentials', category: 'Databases', difficulty: 'easy', price: 129000,
    description: 'Document databases explained. Modeling data, CRUD, aggregation pipelines, and indexing with MongoDB.' },
  { name: 'Sequelize ORM in Depth', category: 'Databases', difficulty: 'medium', price: 149000,
    description: 'Map JavaScript objects to SQL tables with Sequelize — models, associations, migrations, validations, and query optimization.' },

  // ── Programming Languages ─────────────────────────────────────────
  { name: 'Python for Everybody', category: 'Programming Languages', difficulty: 'easy', price: 0,
    description: 'A friendly introduction to programming with Python — data types, loops, functions, files, and working with data. Inspired by the famous Coursera specialization.' },
  { name: 'Java Programming Masterclass', category: 'Programming Languages', difficulty: 'medium', price: 229000,
    description: 'Core Java and object-oriented programming: classes, inheritance, collections, exceptions, generics, and an intro to the JVM ecosystem.' },
  { name: 'C++ Fundamentals', category: 'Programming Languages', difficulty: 'hard', price: 199000,
    description: 'Learn systems programming with C++ — pointers, memory management, references, the STL, and object-oriented design.' },
  { name: 'Go (Golang) for Backend Engineers', category: 'Programming Languages', difficulty: 'medium', price: 209000,
    description: 'Build fast, concurrent services in Go. Goroutines, channels, interfaces, modules, and writing idiomatic, testable code.' },
  { name: 'Rust Programming Crash Course', category: 'Programming Languages', difficulty: 'hard', price: 219000,
    description: 'Ownership, borrowing, lifetimes, traits, and error handling — write safe, performant systems software in Rust.' },

  // ── Mobile ────────────────────────────────────────────────────────
  { name: 'Flutter & Dart — Build iOS and Android Apps', category: 'Mobile Development', difficulty: 'medium', price: 249000,
    description: 'Create beautiful cross-platform mobile apps from a single codebase with Flutter — widgets, state management, navigation, and APIs.' },
  { name: 'React Native for Beginners', category: 'Mobile Development', difficulty: 'medium', price: 219000,
    description: 'Reuse your React skills to ship native mobile apps. Components, navigation, native modules, and publishing to the app stores.' },
  { name: 'Android Development with Kotlin', category: 'Mobile Development', difficulty: 'medium', price: 239000,
    description: 'Modern Android development with Kotlin and Jetpack Compose — activities, layouts, view models, and Room persistence.' },
  { name: 'iOS App Development with Swift', category: 'Mobile Development', difficulty: 'medium', price: 239000,
    description: 'Build iOS apps with Swift and SwiftUI — declarative UI, state, navigation, networking, and the App Store submission flow.' },

  // ── Data Science / ML ─────────────────────────────────────────────
  { name: 'Data Analysis with Python (Pandas & NumPy)', category: 'Data Science', difficulty: 'medium', price: 179000,
    description: 'Clean, transform, and analyze data with Pandas and NumPy. Real datasets, grouping, merging, and exploratory data analysis.' },
  { name: 'Data Visualization with Matplotlib & Seaborn', category: 'Data Science', difficulty: 'easy', price: 149000,
    description: 'Turn data into insight. Build charts, dashboards, and compelling visual stories with Python visualization libraries.' },
  { name: 'Introduction to Machine Learning', category: 'Machine Learning & AI', difficulty: 'medium', price: 0,
    description: 'Supervised and unsupervised learning, regression, classification, and model evaluation with scikit-learn. Inspired by Andrew Ng’s landmark course.' },
  { name: 'Deep Learning with TensorFlow & Keras', category: 'Machine Learning & AI', difficulty: 'hard', price: 269000,
    description: 'Neural networks from the ground up — CNNs, RNNs, training, regularization, and deploying deep learning models.' },
  { name: 'Building LLM Apps with the Claude API', category: 'Machine Learning & AI', difficulty: 'medium', price: 199000,
    description: 'Design AI features with large language models: prompting, tool use, streaming, retrieval-augmented generation, and cost-aware engineering.' },
  { name: 'SQL for Data Analysis', category: 'Data Science', difficulty: 'easy', price: 99000,
    description: 'Answer business questions with SQL — aggregations, window functions, and analytical queries on real datasets.' },

  // ── DevOps / Cloud ────────────────────────────────────────────────
  { name: 'Git & GitHub for Teams', category: 'DevOps & Cloud', difficulty: 'easy', price: 0,
    description: 'Version control done right — branching, merging, pull requests, resolving conflicts, and collaborative Git workflows.' },
  { name: 'Docker & Containers from Scratch', category: 'DevOps & Cloud', difficulty: 'medium', price: 189000,
    description: 'Package and ship applications anywhere. Images, containers, volumes, networking, Docker Compose, and multi-stage builds.' },
  { name: 'Kubernetes for Developers', category: 'DevOps & Cloud', difficulty: 'hard', price: 259000,
    description: 'Orchestrate containers at scale — pods, deployments, services, config, secrets, and rolling updates on Kubernetes.' },
  { name: 'CI/CD with GitHub Actions', category: 'DevOps & Cloud', difficulty: 'medium', price: 159000,
    description: 'Automate testing and deployment. Build pipelines, run jobs, manage secrets, and ship continuously with GitHub Actions.' },
  { name: 'AWS Cloud Practitioner Essentials', category: 'DevOps & Cloud', difficulty: 'easy', price: 199000,
    description: 'Core AWS services and cloud concepts — EC2, S3, IAM, VPC, billing, and the well-architected framework.' },

  // ── Cybersecurity ─────────────────────────────────────────────────
  { name: 'Web Application Security Fundamentals', category: 'Cybersecurity', difficulty: 'medium', price: 189000,
    description: 'Understand and defend against the OWASP Top 10 — XSS, SQL injection, CSRF, authentication flaws, and secure coding practices.' },
  { name: 'Ethical Hacking Foundations', category: 'Cybersecurity', difficulty: 'hard', price: 249000,
    description: 'Learn the offensive mindset for defense — reconnaissance, scanning, common vulnerabilities, and responsible disclosure in a lab environment.' },
  { name: 'Network Security Basics', category: 'Cybersecurity', difficulty: 'medium', price: 169000,
    description: 'Firewalls, encryption, VPNs, TLS, and the principles of securing networks and protecting data in transit.' },

  // ── UI/UX ─────────────────────────────────────────────────────────
  { name: 'UI/UX Design Fundamentals', category: 'UI/UX Design', difficulty: 'easy', price: 149000,
    description: 'Design thinking, user research, wireframing, and prototyping. Learn the principles behind interfaces people love to use.' },
  { name: 'Figma for Designers & Developers', category: 'UI/UX Design', difficulty: 'easy', price: 129000,
    description: 'Master Figma — components, auto layout, variants, prototyping, and handing designs off to engineering.' },
  { name: 'Design Systems in Practice', category: 'UI/UX Design', difficulty: 'medium', price: 179000,
    description: 'Build scalable, consistent products with design tokens, reusable components, and documented design systems.' },

  // ── Game Dev ──────────────────────────────────────────────────────
  { name: 'Game Development with Unity', category: 'Game Development', difficulty: 'medium', price: 229000,
    description: 'Build 2D and 3D games in Unity with C# — physics, animation, input, UI, and publishing your first playable game.' },
  { name: 'Godot Engine for Beginners', category: 'Game Development', difficulty: 'easy', price: 0,
    description: 'Create games with the free, open-source Godot engine. Nodes, scenes, GDScript, and shipping a complete 2D game.' },

  // ── Blockchain ────────────────────────────────────────────────────
  { name: 'Blockchain & Smart Contracts with Solidity', category: 'Blockchain & Web3', difficulty: 'hard', price: 259000,
    description: 'Understand blockchains and write smart contracts in Solidity. Ethereum, gas, security pitfalls, and building a dApp.' },
  { name: 'Web3 Development Essentials', category: 'Blockchain & Web3', difficulty: 'hard', price: 249000,
    description: 'Connect frontends to the blockchain with ethers.js and wallets, interact with contracts, and build decentralized applications.' },

  // ── CS Fundamentals ───────────────────────────────────────────────
  { name: 'Data Structures & Algorithms', category: 'Computer Science', difficulty: 'hard', price: 199000,
    description: 'Arrays, linked lists, trees, graphs, sorting, searching, and Big-O analysis — the core CS knowledge for technical interviews.' },
  { name: 'Computer Science 101', category: 'Computer Science', difficulty: 'easy', price: 0,
    description: 'How computers really work — binary, memory, the internet, and the big ideas behind software, explained for everyone.' },
  { name: 'System Design Fundamentals', category: 'Computer Science', difficulty: 'hard', price: 239000,
    description: 'Design scalable systems — caching, load balancing, databases, queues, and trade-offs behind real-world architectures.' },

  // ── Career ────────────────────────────────────────────────────────
  { name: 'Technical Interview Preparation', category: 'Career & Soft Skills', difficulty: 'medium', price: 159000,
    description: 'Crack coding interviews — problem-solving patterns, behavioral questions, resume tips, and mock interview practice.' },
  { name: 'Soft Skills for Software Engineers', category: 'Career & Soft Skills', difficulty: 'easy', price: 99000,
    description: 'Communication, teamwork, time management, and giving and receiving feedback — the human skills that grow careers.' },
]

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const [categories] = await queryInterface.sequelize.query('SELECT id, name FROM "Categories";')
    const categoryId = Object.fromEntries(categories.map((c) => [c.name, c.id]))

    const rows = courses.map((c) => {
      const CategoryId = categoryId[c.category]
      if (!CategoryId) throw new Error(`Category not found for course "${c.name}": ${c.category}`)
      return {
        name: c.name,
        description: c.description,
        price: c.price,
        thumbnailUrl: thumb(c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')),
        difficulty: c.difficulty,
        status: 'active',
        CategoryId,
        createdAt: now,
        updatedAt: now,
      }
    })

    await queryInterface.bulkInsert('Courses', rows, {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Courses', null, {})
  },
}
