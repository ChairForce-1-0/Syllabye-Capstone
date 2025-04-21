# Scrum Process Documentation

## Overview

This document outlines the Scrum process followed by Team **Chair Force One** during the Syllabye Capstone Project. The goal of this process was to promote collaboration, increase transparency, and ensure consistent delivery of high-quality software in alignment with Agile best practices. All Scrum ceremonies, tools, and workflows were designed to meet both academic standards and real-world software engineering expectations.

---

## 📅 Sprint Structure

- **Sprint Duration:** 2 Weeks (unless otherwise specified)
- **Sprint Cycle:** Starts Monday, Ends Sunday
- **Scrum Methodology:** Agile Scrum

---

## 🧭 Scrum Ceremonies

| Event               | Frequency                 | Purpose                                                                 |
|---------------------|---------------------------|-------------------------------------------------------------------------|
| Sprint Planning     | First Monday of each Sprint | Define sprint objectives, select backlog stories, estimate story points |
| Daily Check-ins     | Asynchronously via Discord | Discuss progress, blockers, and next steps                              |
| Sprint Review       | Final Sunday of Sprint     | Present completed work to team, gather peer/instructor feedback         |
| Sprint Retrospective| Final Sunday of Sprint     | Reflect on team collaboration, processes, and continuous improvement    |

---

## 🛠️ Workflow & Development Tools

- **Sprint Planning:** Used to collaboratively define the sprint goal, assign stories based on capacity, and align on deliverables.
- **Backlog Grooming:** Conducted between sprints to reprioritize, clarify, or split large stories for improved planning.
- **Daily Collaboration:** Maintained through Discord with real-time updates, asynchronous discussions, and file sharing.
- **Code Management:** Branching strategy employed using Git + GitHub. All work initiated in feature branches, merged via pull requests to `main`, and deployed to `production` after review.
- **Deployment Pipeline:** Static deployment using **Azure Static Web Apps**; file storage and metadata managed using **Firebase**.
- **Documentation:** Tracked in `README.md`, `TEAM.md`, and relevant component documentation to ensure future developer clarity.

---

## ✅ Issue Tracking & Task Assignment

- **Tooling:** GitHub Projects and Issues
- **Sprint Backlog:** Actively maintained to track work in progress and visualize team progress
- **Story Assignment:** Stories were selected collaboratively based on team member strengths, availability, and capacity
- **Story Status:** Monitored through commit messages, pull request tags, and GitHub issue linking

---

## 🔄 Change Management

- **Branching Workflow:**
  - `main`: Acts as the integration branch where features are merged after peer review and basic testing.
  - `production`: Receives verified, stable builds intended for live deployment.
- **Merge Protocol:**
  - Pull requests must be reviewed by at least one team member.
  - Each feature must pass basic manual testing and fulfill the team’s Definition of Done.

---

## 🔍 Continuous Improvement

We committed to regular reflection through retrospectives, improving on communication, sprint estimation, and documentation clarity each cycle. Our evolving adoption of TailwindCSS, i18n, and deployment strategies showcases our adaptive mindset and long-term thinking.

---

*This process guide is intended for future student developers to understand, adopt, and enhance the collaborative structure used by Chair Force One.*
