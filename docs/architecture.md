# ResQTh System Architecture

## 1. Architecture Overview

ResQTh uses a layered, client-server, and monolithic architecture. These architectural styles are used together because they address different aspects of the system.

### Layered Architecture

ResQTh is organized into three main layers:

- **Presentation Layer** — handles user interaction, including location selection, emergency category selection, natural-language input, and emergency information screens.
- **Application Logic Layer** — handles location processing, emergency category and urgency logic, emergency information retrieval, and natural-language interpretation.
- **Data Layer** — manages access to information such as provinces, emergency categories, emergency contacts, guidance steps, official facilities, and incident notes.

This separation keeps each part of the system focused on its own responsibilities and reduces unnecessary coupling between the user interface, system logic, and data.

### Client-Server Architecture

ResQTh follows a client-server structure in which the client provides the user-facing interface and communicates with server-side functionality when processing requests and accessing required information. The system may also communicate with external services required for functions such as location processing and natural-language interpretation.

The client-server structure separates user interaction from server-side processing and data responsibilities.

### Monolithic Structure

The ResQTh application is designed as a monolith rather than a collection of microservices. The system has a small set of closely related core functions and is developed by one student team within one semester. There is currently no requirement for individual parts of the system to be deployed or scaled independently.

The system can still contain separate modules with clear responsibilities while being deployed as a single application.