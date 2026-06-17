'use strict'

/**
 * Ordered steps for every roadmap. Each step optionally links to a course on
 * this platform (`course`, matched by name) and/or an external reference
 * (`resourceUrl`) from trusted sources such as roadmap.sh, MDN, freeCodeCamp,
 * and The Odin Project.
 */
const steps = {
  'Frontend Developer': [
    { title: 'Internet & How the Web Works', description: 'Understand HTTP, DNS, browsers, and how a request becomes a rendered page.', resourceUrl: 'https://roadmap.sh/frontend' },
    { title: 'HTML & CSS', description: 'Semantic markup and responsive styling — the foundation of every web page.', course: 'Responsive Web Design with HTML & CSS', resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
    { title: 'JavaScript Essentials', description: 'The language of the browser — DOM, events, and modern ES syntax.', course: 'Modern JavaScript from Zero to Hero', resourceUrl: 'https://javascript.info/' },
    { title: 'Version Control with Git', description: 'Track changes and collaborate using Git and GitHub.', course: 'Git & GitHub for Teams', resourceUrl: 'https://learngitbranching.js.org/' },
    { title: 'CSS Framework: Tailwind', description: 'Build interfaces faster with a utility-first CSS framework.', course: 'Tailwind CSS Masterclass' },
    { title: 'Pick a Framework: Vue or React', description: 'Learn a component-based framework to build single-page applications.', course: 'Vue.js 3 — The Complete Guide' },
    { title: 'TypeScript', description: 'Add type safety to your JavaScript for larger, more reliable apps.', course: 'TypeScript Fundamentals' },
    { title: 'Build & Deploy', description: 'Bundle, optimize, and deploy your app with modern tooling.', resourceUrl: 'https://vitejs.dev/guide/' },
  ],

  'Backend Developer': [
    { title: 'Pick a Language', description: 'Choose a backend language — JavaScript/Node, Python, or Go.', resourceUrl: 'https://roadmap.sh/backend' },
    { title: 'JavaScript & Node Fundamentals', description: 'Master the runtime that powers modern backends.', course: 'JavaScript Algorithms and Data Structures' },
    { title: 'Build REST APIs', description: 'Design and implement RESTful APIs with routing, middleware, and validation.', course: 'Node.js & Express REST API Development' },
    { title: 'Databases & SQL', description: 'Model data and write queries with a relational database.', course: 'SQL & Relational Databases', resourceUrl: 'https://www.postgresql.org/docs/' },
    { title: 'ORM & Data Access', description: 'Map objects to tables and manage migrations with an ORM.', course: 'Sequelize ORM in Depth' },
    { title: 'Authentication & Security', description: 'Protect your API with JWT, hashing, and access control.', course: 'API Authentication with JWT' },
    { title: 'Caching & Scaling', description: 'Improve performance with caching, queues, and horizontal scaling.', course: 'System Design Fundamentals' },
    { title: 'Containerize & Deploy', description: 'Package your service with Docker and ship it.', course: 'Docker & Containers from Scratch' },
  ],

  'Full Stack Developer': [
    { title: 'Frontend Foundations', description: 'HTML, CSS, and JavaScript to build the user-facing layer.', course: 'Responsive Web Design with HTML & CSS' },
    { title: 'Frontend Framework', description: 'Build interactive UIs with React or Vue.', course: 'React — From Beginner to Advanced' },
    { title: 'Backend & APIs', description: 'Create the server and API that power your app.', course: 'Node.js & Express REST API Development' },
    { title: 'Databases', description: 'Persist and query application data.', course: 'PostgreSQL for Developers' },
    { title: 'Authentication', description: 'Add secure login and authorization end to end.', course: 'API Authentication with JWT' },
    { title: 'Connect Frontend & Backend', description: 'Wire up the SPA to your API and handle state.', resourceUrl: 'https://www.theodinproject.com/paths/full-stack-javascript' },
    { title: 'Deploy a Full App', description: 'Ship frontend and backend with CI/CD.', course: 'CI/CD with GitHub Actions' },
  ],

  'React Developer': [
    { title: 'JavaScript & ES6+', description: 'Solidify the JS features React relies on.', course: 'Modern JavaScript from Zero to Hero' },
    { title: 'React Core', description: 'Components, props, state, and the rendering model.', course: 'React — From Beginner to Advanced', resourceUrl: 'https://react.dev/learn' },
    { title: 'Hooks in Depth', description: 'useState, useEffect, useContext, and custom hooks.', resourceUrl: 'https://react.dev/reference/react/hooks' },
    { title: 'Routing', description: 'Client-side navigation with React Router.', resourceUrl: 'https://reactrouter.com/' },
    { title: 'State Management', description: 'Manage complex state with Context, Redux, or Zustand.' },
    { title: 'TypeScript with React', description: 'Type your components, props, and hooks.', course: 'TypeScript Fundamentals' },
    { title: 'Testing & Deployment', description: 'Test components and deploy your React app.' },
  ],

  'Mobile App Developer': [
    { title: 'Programming Fundamentals', description: 'Learn a language and core programming concepts.', course: 'JavaScript Algorithms and Data Structures', resourceUrl: 'https://roadmap.sh/android' },
    { title: 'Choose Your Path', description: 'Cross-platform (Flutter / React Native) or native (Kotlin / Swift).' },
    { title: 'Cross-Platform with Flutter', description: 'Build for iOS and Android from one codebase.', course: 'Flutter & Dart — Build iOS and Android Apps' },
    { title: 'Or React Native', description: 'Reuse React skills to build native apps.', course: 'React Native for Beginners' },
    { title: 'Native Android (Kotlin)', description: 'Go native on Android with Kotlin and Compose.', course: 'Android Development with Kotlin' },
    { title: 'Native iOS (Swift)', description: 'Build iOS apps with Swift and SwiftUI.', course: 'iOS App Development with Swift' },
    { title: 'Publish to the Stores', description: 'Prepare, sign, and submit your app to Google Play and the App Store.' },
  ],

  'Data Analyst': [
    { title: 'Spreadsheets & Statistics', description: 'Foundational data skills and basic statistics.', resourceUrl: 'https://roadmap.sh/data-analyst' },
    { title: 'SQL for Analysis', description: 'Query databases to answer business questions.', course: 'SQL for Data Analysis' },
    { title: 'Python for Data', description: 'Use Pandas and NumPy to clean and analyze data.', course: 'Data Analysis with Python (Pandas & NumPy)' },
    { title: 'Data Visualization', description: 'Communicate findings with clear charts and dashboards.', course: 'Data Visualization with Matplotlib & Seaborn' },
    { title: 'Build a Portfolio Project', description: 'Analyze a real dataset end to end and present insights.', resourceUrl: 'https://www.kaggle.com/datasets' },
  ],

  'Data Scientist': [
    { title: 'Math & Statistics', description: 'Probability, linear algebra, and statistics for ML.', resourceUrl: 'https://www.khanacademy.org/math/statistics-probability' },
    { title: 'Python Programming', description: 'The primary language of data science.', course: 'Python for Everybody' },
    { title: 'Data Wrangling', description: 'Clean, transform, and explore data with Pandas.', course: 'Data Analysis with Python (Pandas & NumPy)' },
    { title: 'Machine Learning', description: 'Regression, classification, and model evaluation.', course: 'Introduction to Machine Learning' },
    { title: 'Deep Learning', description: 'Neural networks for vision, text, and more.', course: 'Deep Learning with TensorFlow & Keras' },
    { title: 'Communicate Results', description: 'Tell stories with data and present to stakeholders.', course: 'Data Visualization with Matplotlib & Seaborn' },
  ],

  'Machine Learning Engineer': [
    { title: 'Math Foundations', description: 'Linear algebra, calculus, and probability for ML.', resourceUrl: 'https://roadmap.sh/ai-data-scientist' },
    { title: 'Python & Tooling', description: 'Python, NumPy, and the scientific stack.', course: 'Python for Everybody' },
    { title: 'Classical ML', description: 'Supervised and unsupervised learning with scikit-learn.', course: 'Introduction to Machine Learning' },
    { title: 'Deep Learning', description: 'Build and train neural networks.', course: 'Deep Learning with TensorFlow & Keras' },
    { title: 'MLOps & Deployment', description: 'Package, serve, and monitor models in production.', course: 'Docker & Containers from Scratch' },
  ],

  'AI Engineer (LLM Apps)': [
    { title: 'Programming & APIs', description: 'Be comfortable calling and building APIs.', course: 'Node.js & Express REST API Development', resourceUrl: 'https://roadmap.sh/ai-engineer' },
    { title: 'LLM Fundamentals', description: 'How large language models work and where they shine.', resourceUrl: 'https://docs.claude.com/en/docs/intro-to-claude' },
    { title: 'Prompt Engineering & Tool Use', description: 'Design reliable prompts and give models tools.', course: 'Building LLM Apps with the Claude API' },
    { title: 'Retrieval-Augmented Generation', description: 'Ground responses in your own data with RAG.' },
    { title: 'Evaluation & Safety', description: 'Measure quality and ship AI features responsibly.' },
    { title: 'Ship an AI Product', description: 'Build and deploy an end-to-end LLM-powered app.', course: 'Building LLM Apps with the Claude API' },
  ],

  'DevOps Engineer': [
    { title: 'Linux & Scripting', description: 'Command line, shell scripting, and OS fundamentals.', resourceUrl: 'https://roadmap.sh/devops' },
    { title: 'Version Control', description: 'Git workflows for teams.', course: 'Git & GitHub for Teams' },
    { title: 'Containers', description: 'Package apps with Docker.', course: 'Docker & Containers from Scratch' },
    { title: 'Orchestration', description: 'Run containers at scale with Kubernetes.', course: 'Kubernetes for Developers' },
    { title: 'CI/CD Pipelines', description: 'Automate build, test, and deploy.', course: 'CI/CD with GitHub Actions' },
    { title: 'Cloud Platform', description: 'Provision and operate infrastructure on the cloud.', course: 'AWS Cloud Practitioner Essentials' },
    { title: 'Monitoring & Observability', description: 'Logs, metrics, and alerts to keep systems healthy.' },
  ],

  'Cybersecurity Specialist': [
    { title: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP, and how data moves across networks.', course: 'Network Security Basics', resourceUrl: 'https://roadmap.sh/cyber-security' },
    { title: 'Operating Systems & Linux', description: 'Understand the systems you’re defending.' },
    { title: 'Web Application Security', description: 'Defend against the OWASP Top 10.', course: 'Web Application Security Fundamentals', resourceUrl: 'https://owasp.org/www-project-top-ten/' },
    { title: 'Ethical Hacking', description: 'Learn the attacker’s playbook to build better defenses.', course: 'Ethical Hacking Foundations' },
    { title: 'Hands-on Labs', description: 'Practice in safe, legal environments like TryHackMe.', resourceUrl: 'https://tryhackme.com/' },
  ],

  'UX/UI Designer': [
    { title: 'Design Principles', description: 'Color, typography, layout, and visual hierarchy.', resourceUrl: 'https://roadmap.sh/ux-design' },
    { title: 'User Research', description: 'Understand users through interviews, surveys, and testing.', course: 'UI/UX Design Fundamentals' },
    { title: 'Wireframing & Prototyping', description: 'Turn ideas into testable prototypes in Figma.', course: 'Figma for Designers & Developers' },
    { title: 'Design Systems', description: 'Build consistent, scalable products with reusable components.', course: 'Design Systems in Practice' },
    { title: 'Build a Portfolio', description: 'Showcase your process and case studies to get hired.' },
  ],

  'Game Developer': [
    { title: 'Programming Basics', description: 'Learn C# or GDScript and core programming concepts.', course: 'C++ Fundamentals' },
    { title: 'Choose an Engine', description: 'Unity (C#) or the free, open-source Godot.' },
    { title: 'Build with Unity', description: '2D/3D games, physics, and animation in Unity.', course: 'Game Development with Unity' },
    { title: 'Or Build with Godot', description: 'Ship a complete 2D game with Godot.', course: 'Godot Engine for Beginners' },
    { title: 'Game Design Principles', description: 'Mechanics, level design, and player feedback loops.' },
    { title: 'Publish Your Game', description: 'Release your game on itch.io or Steam.', resourceUrl: 'https://itch.io/' },
  ],

  'Blockchain Developer': [
    { title: 'Blockchain Fundamentals', description: 'How blockchains, consensus, and wallets work.', resourceUrl: 'https://roadmap.sh/blockchain' },
    { title: 'Smart Contracts with Solidity', description: 'Write, test, and deploy contracts on Ethereum.', course: 'Blockchain & Smart Contracts with Solidity' },
    { title: 'Web3 Frontend', description: 'Connect dApps to the chain with ethers.js and wallets.', course: 'Web3 Development Essentials' },
    { title: 'Security & Auditing', description: 'Avoid common smart-contract vulnerabilities.', resourceUrl: 'https://consensys.github.io/smart-contract-best-practices/' },
    { title: 'Build a dApp', description: 'Ship a full decentralized application.' },
  ],

  'Computer Science Foundations': [
    { title: 'How Computers Work', description: 'Binary, memory, CPUs, and the internet.', course: 'Computer Science 101' },
    { title: 'Programming Fundamentals', description: 'Variables, control flow, functions, and recursion.', course: 'Python for Everybody' },
    { title: 'Data Structures & Algorithms', description: 'Arrays, trees, graphs, sorting, and Big-O.', course: 'Data Structures & Algorithms', resourceUrl: 'https://roadmap.sh/computer-science' },
    { title: 'System Design', description: 'Design scalable systems and understand trade-offs.', course: 'System Design Fundamentals' },
    { title: 'Interview Practice', description: 'Apply your skills to coding interview problems.', course: 'Technical Interview Preparation', resourceUrl: 'https://leetcode.com/' },
  ],
}

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const [roadmaps] = await queryInterface.sequelize.query('SELECT id, title FROM "Roadmaps";')
    const roadmapId = Object.fromEntries(roadmaps.map((r) => [r.title, r.id]))

    const [courses] = await queryInterface.sequelize.query('SELECT id, name FROM "Courses";')
    const courseId = Object.fromEntries(courses.map((c) => [c.name, c.id]))

    const rows = []
    for (const [title, list] of Object.entries(steps)) {
      const RoadmapId = roadmapId[title]
      if (!RoadmapId) throw new Error(`Roadmap not found: ${title}`)

      list.forEach((step, i) => {
        let CourseId = null
        if (step.course) {
          CourseId = courseId[step.course] || null
          if (!CourseId) {
            // Surface a typo early rather than silently dropping the link.
            throw new Error(`Course not found for roadmap "${title}" step "${step.title}": ${step.course}`)
          }
        }
        rows.push({
          RoadmapId,
          order: i + 1,
          title: step.title,
          description: step.description || null,
          CourseId,
          resourceUrl: step.resourceUrl || null,
          createdAt: now,
          updatedAt: now,
        })
      })
    }

    await queryInterface.bulkInsert('RoadmapSteps', rows, {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RoadmapSteps', null, {})
  },
}
