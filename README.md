# Josiah's Open Source School (JOSS) - Cloud Tutorials

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

**🇿🇲🇰🇪 Building in the Cloud: Your Journey from Dev to Ops**

A comprehensive collection of hands-on tutorials and guides for DevOps, MLOps, Containers, and CI/CD - written by a 4th-year Software Engineering student with roots in Zambia and based in Kenya.

## 📚 What You'll Learn

This documentation site covers:

- **Foundations**: DevOps culture, cloud computing, and Linux essentials
- **Containers** (Docker): Building, deploying, and orchestrating applications
- **CI/CD**: GitHub Actions, Azure Pipelines, and automation workflows
- **MLOps Fundamentals**: AI model deployment, monitoring, and scalability
- **Systems Programming**: High-performance services with Go and Rust

Each tutorial draws from real projects like **Ona Vision** (YOLOv8 computer vision), **FraudFlow** (credit card fraud detection), Go reverse proxy systems, and Django API performance optimization.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/josiah-mbao/cloud-tutorials.git
cd cloud-tutorials

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site.

### Project Structure

```
.
├── src/
│   ├── content/docs/          # Documentation pages
│   │   ├── foundations/       # DevOps fundamentals
│   │   ├── containers/        # Docker tutorials
│   │   ├── cicd/              # CI/CD pipelines
│   │   └── kubernetes/        # K8s guides
│   ├── assets/                # Images and media
│   └── content.config.ts      # Content schema
├── public/                    # Static assets
├── astro.config.mjs           # Astro configuration
└── package.json               # Dependencies
```

## 📖 Available Scripts

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🤝 Contributing

This is a personal project focused on practical DevOps education. While PRs are welcome for corrections, the content roadmap is driven by the author's experiences and GDSC leadership activities.

## 📧 Contact

- **Author**: Josiah Mbao
- **GitHub**: [josiah-mbao](https://github.com/josiah-mbao)
- **LinkedIn**: Connect for opportunities

## 🙏 Acknowledgments

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/). Inspired by the vibrant African tech community and the belief that practical, accessible education can bridge the DevOps knowledge gap.

---

*"Do Hard Things"* - The guiding principle behind every tutorial.
