# Hardware Architecture — ELECTRON

[Back to Repository Root](../README.md) · [Overview](overview.md) · [Achievements](achievements.md) · [Architecture](architecture.md) · [Team](team.md)

---

## Subsystem Overview

The **ELECTRON** platform separates high-level visual perception from deterministic low-level actuation across eight integrated subsystems:

| Subsystem | Category | Role & System Interface |
| :--- | :--- | :--- |
| **Raspberry Pi 5 (16 GB)** | Primary Compute | Central single-board computer executing camera capture, OpenCV preprocessing, YOLO inference, AprilTag decoding, and navigation decision-making. Interfaces with the camera and sends high-level commands to the Arduino Uno. |
| **Raspberry Pi Camera** | Optical Sensor | Captures the live forward visual stream used for marker recognition, object detection, and path tracking. Streams frames directly to the Raspberry Pi 5. |
| **Arduino Uno** | Embedded Controller | Microcontroller dedicated to deterministic, time-critical control loops and actuator signal generation between the Raspberry Pi 5 and the motor/servo stages. |
| **L298 Motor Driver** | Motor Power Stage | Dual full-bridge driver converting low-current control logic from the Arduino Uno into regulated current for drive motor speed and direction. |
| **Servo Motor** | Precision Actuator | Closed-loop rotary actuator driven by PWM signals from the Arduino Uno for accurate angular steering positioning. |
| **Li-ion Battery System** | Energy Storage | Rechargeable lithium-ion battery pack supplying untethered onboard energy across competition runs. |
| **DC-DC Voltage Regulation** | Power Conditioning | Stabilizes battery voltage into clean supply rails, isolating computing and sensing electronics from transient motor loads. |
| **Obstacle Detection Sensor** | Proximity Sensing | Detects physical obstacles in the robot's path, providing a direct proximity layer alongside optical perception. |
