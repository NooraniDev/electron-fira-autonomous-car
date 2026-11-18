<div align="center">

<img src="assets/icons/favicon.svg" width="72" height="72" alt="ELECTRON mark">

# ELECTRON

### FIRA Autonomous Mobile Robotics

**2nd Place — Iran National FIRA Competition** · **Qualified — FIRA International Competition**

[**English Documentation**](docs/en/overview.md) · [**مستندات فارسی**](docs/fa/overview.md) · [**English Section**](#1-project-overview) · [**بخش فارسی**](#فارسی--persian)

</div>

---

## Portfolio Website & Language Links

This repository powers the bilingual (**English / Persian**) engineering portfolio website for the **ELECTRON** autonomous mobile robotics team.

| Version | Website Entry Point | Technical Documentation |
| :--- | :--- | :--- |
| **Default (configured in `js/config.js`)** | [`index.html`](index.html) | [`docs/en/overview.md`](docs/en/overview.md) |
| **English (LTR)** | [`index.html?lang=en`](index.html?lang=en) | [`docs/en/`](docs/en/overview.md) |
| **Persian / فارسی (RTL)** | [`index.html?lang=fa`](index.html?lang=fa) | [`docs/fa/`](docs/fa/overview.md) |

> **Deployment URL Notice:** Once GitHub Pages (or a custom domain) is enabled and confirmed, replace the relative links above or set `siteUrl` in [`js/config.js`](js/config.js) for canonical and Open Graph URLs.

---

## Primary Robot Photograph

<div align="center">

<img src="assets/images/robot-hero.png" width="540" alt="The ELECTRON autonomous mobile robot developed for the FIRA Robotics Competition">

*Primary robot photograph path: [`assets/images/robot-hero.png`](assets/images/README.md) (`1:1` square aspect ratio, recommended `2048 × 2048` px).*

</div>

---

## Competition Achievements

| Level | Achievement | Competition |
| :--- | :--- | :--- |
| **National — Iran** | **SECOND PLACE (2nd Place)** | Iran National FIRA Robotics Competition |
| **International** | **QUALIFIED** | FIRA International Competition |

> **Competition Distinction:** This project was developed specifically for the **FIRA Robotics Competition**. It is completely separate from and unrelated to the WorldSkills / National Skills Autonomous Mobile Robotics competition. Competition year, edition, and exact league designation are marked as _Pending verification_ until confirmed by the team.

---

## 1. Project Overview

**ELECTRON** is an autonomous mobile robot engineered to compete in the **FIRA Robotics Competition**. It integrates onboard computer vision, image processing, embedded control, and proximity sensing into a self-directed mobile platform capable of perceiving its surroundings, interpreting visual cues, and executing controlled motion without human intervention.

### Autonomy Objectives
1. Perceive the competition environment through onboard vision and obstacle sensing.
2. Recognize visual fiducial markers and objects relevant to navigation and traffic-related instructions.
3. Make autonomous navigation decisions in real time on the primary computing platform.
4. Translate high-level decisions into deterministic, precise motor and servo actuation.
5. Operate reliably as an untethered platform under real competition constraints.

### Engineering Domains
`Autonomous Robotics` · `Computer Vision` · `Image Processing` · `Embedded Systems` · `Sensor Integration` · `Robotic Navigation` · `Object Recognition` · `Hardware/Software Integration`

---

## 2. Team

| Name | Persian Name | Role | Specific Responsibilities |
| :--- | :--- | :--- | :--- |
| **Amirali Noorani** | امیرعلی نورانی | Team Member | _Pending verification_ |
| **Matin Fakhim** | متین فخیم | Team Member | _Pending verification_ |
| **Hamidreza Ramezani** | حمیدرضا رمضانی | Coach | _Pending verification_ |

---

## 3. Personal Engineering Contributions — Amirali Noorani

This portfolio highlights the participation and engineering contributions of **Amirali Noorani** to the **ELECTRON** autonomous mobile robot. Candidate contribution areas below are clearly marked for review until verified:

| # | Contribution Category | Verification Status |
| :--- | :--- | :--- |
| 01 | Robotics Software Development | _Pending verification_ |
| 02 | Computer Vision | _Pending verification_ |
| 03 | Image Processing | _Pending verification_ |
| 04 | Raspberry Pi Integration | _Pending verification_ |
| 05 | Embedded Systems | _Pending verification_ |
| 06 | Hardware/Software Integration | _Pending verification_ |
| 07 | System Testing | _Pending verification_ |
| 08 | Debugging & Optimization | _Pending verification_ |

---

## 4. Hardware Architecture

| Component | Subsystem | Role & System Relationship |
| :--- | :--- | :--- |
| **Raspberry Pi 5 (16 GB)** | Main Computing Platform | Primary processing unit running image acquisition, image processing, computer-vision inference, and autonomous decision-making; receives camera frames and sends high-level commands to the Arduino Uno. |
| **Raspberry Pi Camera** | Vision Sensor | Captures live visual frames of the robot's environment and feeds the Raspberry Pi 5 perception pipeline. |
| **Arduino Uno** | Embedded Controller | Dedicated microcontroller handling deterministic, time-critical actuation between the Raspberry Pi 5 and the motor/servo stages. |
| **L298 Motor Driver** | Motor Power Stage | Dual H-bridge driver converting low-power control signals from the Arduino Uno into controlled current for drive motor speed and direction. |
| **Servo Motor** | Precision Actuator | Position-controlled actuator driven by the Arduino Uno for accurate angular positioning. |
| **Li-ion Battery System** | Energy Source | Rechargeable onboard lithium-ion battery pack supplying untethered energy for competition runs. |
| **DC-DC Voltage Regulation** | Power Conditioning | Converts battery voltage into stable supply rails for computing, sensing, and control electronics under varying motor loads. |
| **Obstacle Detection Sensor** | Proximity Sensing | Detects physical obstacles in the robot's path, providing a camera-independent sensing layer for collision-aware navigation. |

> _Note: Component relationships are conceptual. Exact electrical schematics are intentionally omitted, and the final competition hardware configuration is marked for team confirmation._

---

## 5. Software & Technologies

| Technology | Category | Role in the Robot |
| :--- | :--- | :--- |
| **Python** | Programming Language | Primary language for high-level perception, decision-making, and system coordination on the Raspberry Pi 5. |
| **OpenCV** | Vision Library | Frame capture, preprocessing, filtering, and classical computer-vision operations. |
| **YOLO** | Object Detection | Real-time deep-learning object recognition within the camera stream. |
| **Computer Vision** | Perception | Scene interpretation and standardized **AprilTag** fiducial marker recognition (`36h11` family) for navigation and traffic-related instructions. |
| **Image Processing** | Signal Processing | Transforming raw camera frames into clean, actionable representations. |
| **Embedded Systems** | Real-Time Control | Microcontroller software on the Arduino Uno for deterministic motor and servo timing. |
| **Autonomous Robotics** | System Integration | Closed-loop coordination of perception, decision-making, and actuation without human intervention. |

---

## 6. High-Level System Architecture

![ELECTRON High-Level Conceptual Architecture](assets/diagrams/architecture.svg)

```text
[ Camera & Obstacle Sensor ]
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ Main Computing Platform · Raspberry Pi 5 (16 GB)       │
│   [ Image Processing ]  ───►  [ Decision-Making ]      │
└────────────────────────────────────────────────────────┘
             │
             ▼
[ Embedded Control · Arduino Uno ]
             │
             ▼
[ Actuation · L298 Motor Driver + Drive Motors + Servo ]
             │
             └───► Closed perception–action loop through the environment
```

**Power Subsystem:** The **Li-ion Battery System** and **DC-DC Voltage Regulation** supply stable onboard energy across all computing, sensing, control, and actuation stages.

---

## 7. Engineering Challenges

The following engineering challenge categories are tracked and will be populated with confirmed competition-safe details upon verification by the team:

1. **Sensor Reliability** — _Pending verification_
2. **Navigation** — _Pending verification_
3. **Environmental Interference** — _Pending verification_
4. **Computer Vision Performance** — _Pending verification_
5. **Real-Time Processing** — _Pending verification_
6. **Hardware Integration** — _Pending verification_
7. **System Stability** — _Pending verification_

---

## 8. Central Language Configuration (`js/config.js`)

The default language of the entire website is controlled by **one single variable** in [`js/config.js`](js/config.js):

```javascript
const SITE_CONFIG = Object.freeze({
    defaultLanguage: "en",
    siteUrl: ""
});
```

- Set `defaultLanguage: "en"` for **English (LTR)** as the default.
- Set `defaultLanguage: "fa"` for **Persian / Farsi (RTL)** as the default.

### Language Resolution Priority
1. **`?lang=en` or `?lang=fa` URL query parameter** (for direct shareable language links; does not overwrite saved preference).
2. **Visitor's saved preference** (`localStorage` key `electron.lang`, set when clicking the language switcher).
3. **`SITE_CONFIG.defaultLanguage`** in `js/config.js` when no saved visitor preference exists.

To reset a saved visitor preference during testing: click **"Reset language preference"** in the website footer, open `?resetLang=1`, or run `ElectronI18n.reset()` in the browser console.

---

## 9. Repository Structure

```text
electron-fira-autonomous-car/
├── index.html                  # Complete bilingual single-page portfolio (EN / FA)
├── README.md                   # Bilingual GitHub showcase README
├── LICENSE-NOTICE.md           # Confidentiality & intellectual property notice
├── .gitignore                  # Excludes secrets, OS artifacts, and robot weights/code
├── .nojekyll                   # Serves static assets directly on GitHub Pages
├── robots.txt                  # Search engine crawler rules
├── sitemap.xml                 # Bilingual sitemap template
├── assets/
│   ├── images/
│   │   ├── README.md           # Placement specs for robot-hero.png (1:1, 2048×2048)
│   │   └── robot-hero.png      # Primary robot photograph (supplied by the team)
│   ├── fonts/                  # Local Inter & Vazirmatn variable WOFF2 fonts + OFL licenses
│   ├── icons/
│   │   └── favicon.svg         # ELECTRON vector emblem
│   └── diagrams/
│       └── architecture.svg    # High-level conceptual architecture diagram
├── css/
│   └── style.css               # Dark Professional Engineering design system (LTR & RTL)
├── js/
│   ├── config.js               # Single central default-language configuration
│   ├── translations.js         # Complete English & Persian translation dictionaries
│   └── app.js                  # Bilingual engine, navigation, media fallback & viewer
├── docs/
│   ├── en/                     # English technical documentation
│   │   ├── overview.md
│   │   ├── achievements.md
│   │   ├── hardware.md
│   │   ├── architecture.md
│   │   └── team.md
│   └── fa/                     # Persian technical documentation (مستندات فارسی)
│       ├── overview.md
│       ├── achievements.md
│       ├── hardware.md
│       ├── architecture.md
│       └── team.md
└── .github/
    └── workflows/
        └── pages.yml           # Official static GitHub Pages deployment workflow
```

---

## 10. Confidentiality Notice

> **Important:** The source code, computer-vision pipelines, trained models, control logic, and proprietary implementation details of the **ELECTRON** robot are **intentionally not published** due to competition confidentiality requirements. See [`LICENSE-NOTICE.md`](LICENSE-NOTICE.md) for full details.

---

<div dir="rtl" align="right">

# فارسی — Persian

## ELECTRON — رباتیک متحرک خودران FIRA

- **مقام دوم** — مسابقات ملی رباتیک FIRA ایران (`Second Place — National Competition, Iran`)
- **راه‌یافته** — مسابقات بین‌المللی FIRA (`Qualified — FIRA International Competition`)

> **توجه مهم درباره‌ی تمایز مسابقات:** این پروژه منحصراً برای **مسابقات رباتیک FIRA** طراحی و توسعه داده شده است و هیچ ارتباطی با مسابقات ملی مهارت یا مسابقات جهانی مهارت (`WorldSkills`) ندارد.

### معرفی پروژه

ربات متحرک خودران **ELECTRON** توسط تیم مهندسی **ELECTRON** برای شرکت در **مسابقات رباتیک FIRA** طراحی و ساخته شده است. این ربات بینایی ماشین، پردازش تصویر، سامانه‌های نهفته و ناوبری مبتنی بر حسگر را در یک سکوی خودگردان یکپارچه می‌کند تا بدون دخالت انسان محیط مسابقه را درک کرده، نشانگرها و اشیا را تشخیص دهد و حرکتی دقیق و کنترل‌شده را اجرا نماید.

### اعضای تیم

- **امیرعلی نورانی** (`Amirali Noorani`) — عضو تیم (_مسئولیت‌ها در انتظار تأیید_)
- **متین فخیم** (`Matin Fakhim`) — عضو تیم (_مسئولیت‌ها در انتظار تأیید_)
- **حمیدرضا رمضانی** (`Hamidreza Ramezani`) — مربی (_مسئولیت‌ها در انتظار تأیید_)

### سخت‌افزار و فناوری‌ها

- **سخت‌افزار:** برد پردازش اصلی `Raspberry Pi 5 (16 GB)`، دوربین `Raspberry Pi Camera`، کنترل‌گر نهفته `Arduino Uno`، درایور موتور `L298`، سروو موتور (`Servo Motor`)، سامانه‌ی باتری لیتیوم-یون (`Li-ion Battery System`)، تنظیم ولتاژ `DC-DC` و حسگر تشخیص مانع (`Obstacle Detection Sensor`).
- **نرم‌افزار و فناوری‌ها:** `Python`، `OpenCV`، `YOLO`، بینایی ماشین (`Computer Vision`)، نشانگرهای تصویری `AprilTag` (خانواده‌ی `36h11`)، پردازش تصویر (`Image Processing`)، سامانه‌های نهفته (`Embedded Systems`) و رباتیک خودران (`Autonomous Robotics`).

### مستندات کامل فارسی

- [معرفی پروژه](docs/fa/overview.md)
- [افتخارات مسابقات](docs/fa/achievements.md)
- [معماری سخت‌افزار](docs/fa/hardware.md)
- [نرم‌افزار و معماری سامانه](docs/fa/architecture.md)
- [تیم و مشارکت‌های فردی](docs/fa/team.md)

### اطلاعیه‌ی محرمانگی

کد منبع، الگوریتم‌ها و جزئیات اختصاصی پیاده‌سازی ربات **ELECTRON** به دلیل الزامات محرمانگی مسابقه عمداً منتشر نشده‌اند. برای جزئیات بیشتر به فایل [`LICENSE-NOTICE.md`](LICENSE-NOTICE.md) مراجعه فرمایید.

</div>

---

<div align="center">

© 2026 ELECTRON Robotics Team · FIRA Autonomous Mobile Robotics

</div>
