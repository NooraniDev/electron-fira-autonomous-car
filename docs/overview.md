# Platform Overview — ELECTRON

[Back to Repository Root](../README.md) · [Achievements](achievements.md) · [Hardware](hardware.md) · [Architecture](architecture.md) · [Team](team.md)

---

## Summary

**ELECTRON** is an autonomous mobile robotics platform developed by the **ELECTRON** engineering team for the **FIRA Robotics Competition**. It integrates onboard computer vision, fiducial marker recognition, real-time decision-making, and deterministic embedded control into an untethered mobile robot.

### Competition Record

- **Second Place (2nd Place)** — Iran National FIRA Robotics Competition
- **Qualified** — FIRA International Competition

---

## Core Capabilities

1. **Visual Perception** — Onboard camera acquisition paired with image preprocessing and deep-learning object recognition.
2. **Fiducial Navigation** — Real-time decoding of standardized **AprilTag (`36h11` family, IDs `0–5`, `0.05 m`)** visual markers for navigation and traffic-related instructions.
3. **Split-Compute Autonomy** — High-level vision and navigation decisions run on the **Raspberry Pi 5 (16 GB)** while time-critical actuation runs on the **Arduino Uno**.
4. **Untethered Operation** — Rechargeable **Li-ion battery system** and **DC-DC voltage regulation** provide clean power across compute, sensing, and motor stages.

---

## Engineering Domains

- Autonomous Robotics
- Computer Vision
- Image Processing
- Embedded Systems
- Sensor Integration
- Robotic Navigation
- Object Recognition
- Hardware / Software Integration
