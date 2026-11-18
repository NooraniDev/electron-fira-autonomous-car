# Project Overview — ELECTRON

[English](overview.md) · [فارسی](../fa/overview.md) · [Back to Repository Root](../../README.md)

---

## Summary

**ELECTRON** is an autonomous mobile robotics project developed by the **ELECTRON** engineering team to compete in the **FIRA Robotics Competition**. The platform integrates onboard computer vision, image processing, embedded control, and sensor-based navigation into a self-directed mobile robot capable of operating without human intervention.

### Competition Honors

- **Second Place** — National Competition, Iran (FIRA Robotics Competition)
- **Qualified** — FIRA International Competition

> **Competition Distinction:** This project was engineered specifically for the **FIRA Robotics Competition**. It is completely independent of the WorldSkills / National Skills Autonomous Mobile Robotics competition.

---

## Engineering Purpose

Modern autonomous mobile robotics requires tight coordination between visual perception, real-time decision-making, and deterministic low-level actuation. The ELECTRON robot was built to address those requirements under real competition conditions:

1. **Perceive the environment** through an onboard camera and obstacle detection sensing.
2. **Recognize visual markers and objects** relevant to navigation and traffic-related instructions, including standardized AprilTag fiducial markers (`36h11` family).
3. **Make autonomous decisions in real time** on the primary computing unit.
4. **Translate high-level decisions into controlled motion** through a dedicated microcontroller and motor/servo actuation stage.
5. **Operate reliably as an untethered platform** powered by an onboard lithium-ion battery and regulated DC-DC power distribution.

---

## Core Engineering Domains

| Domain | Role in the ELECTRON Platform |
| :--- | :--- |
| **Autonomous Robotics** | Closed-loop integration of sensing, decision-making, and motion without human teleoperation. |
| **Computer Vision** | Interpreting camera frames to recognize fiducial markers, objects, and navigation cues. |
| **Image Processing** | Frame acquisition, filtering, and geometric/color preprocessing prior to high-level inference. |
| **Embedded Systems** | Deterministic, time-critical microcontroller execution for motor and servo control signals. |
| **Sensor Integration** | Combining visual perception with proximity/obstacle sensing for safe navigation. |
| **Robotic Navigation** | Translating visual and proximity cues into directional and speed commands. |
| **Object Recognition** | Deep-learning and fiducial recognition pipelines (YOLO, OpenCV, AprilTag). |
| **Hardware/Software Integration** | Coordinating the Raspberry Pi 5 computing platform, Arduino Uno controller, power electronics, and mechanical actuators. |

---

## Items Pending Confirmation

- **Competition league / category and year:** _Pending verification by the team._

---

## Documentation Index

- [Project Overview](overview.md)
- [Competition Achievements](achievements.md)
- [Hardware Architecture](hardware.md)
- [Software & System Architecture](architecture.md)
- [Team & Personal Contributions](team.md)
