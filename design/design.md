# Design Document: ResQTh

This document contains the **UML diagrams, logical data model, and UI design / user-flow mapping** for the ResQTh MVP.

The system architecture is documented separately in the `architecture/` folder.

---

## 1. UML Diagrams

### 1.1 Use Case Diagram

The use case diagram shows the scope of the ResQTh MVP and focuses on the four Must-Have Functional Requirements defined in the SRS.

![ResQTh Use Case Diagram](diagrams/use-case-diagram.png)

### Actors / External Systems

- **User** — the primary actor who uses ResQTh during an emergency or post-incident situation.
- **Location Service** — supports location detection so the system can identify the user's province.
- **AI Service** — supports natural-language interpretation for users who describe a situation in their own words.

### Use Cases and SRS Alignment

| Use Case | Related FR | Alignment with the SRS |
| :--- | :--- | :--- |
| `UC-01 Detect User's Location` | FR-1 | FR-1 requires ResQTh to detect the user's province automatically or allow manual province selection when location detection is unavailable. |
| `UC-02 Select Emergency Category` | FR-2 | FR-2 requires the user to select a predefined emergency category so the system can filter the appropriate emergency information and determine urgency. |
| `UC-03 Display Information` | FR-3 | FR-3 requires ResQTh to display different emergency information and actions depending on urgency, with a national fallback when no local match is available. |
| `UC-04 Add via Natural Language` | FR-4 | FR-4 requires the system to interpret a natural-language description and allow the user to correct the result before continuing. |

The diagram intentionally excludes features such as account registration, payment, group chat, and automated emergency dispatch because they are outside the ResQTh MVP scope.

---

### 1.2 Sequence Diagram — Happy Path

The happy-path sequence diagram shows a normal successful flow from identifying the user's province to displaying the appropriate emergency response.

![ResQTh Happy Path Sequence Diagram](diagrams/sequence-happy-path.png)

### Step-by-step Execution

1. The user opens ResQTh and requests or selects a location.
2. The system identifies the user's province.
3. The user selects an emergency category.
4. The system receives the selected province and category.
5. The system retrieves matching emergency information.
6. The system determines whether the situation should use a high-urgency or low-urgency response.
7. The appropriate response is displayed to the user.

### SRS Alignment

- **FR-1** is represented by location detection or manual province selection.
- **FR-2** is represented by emergency-category selection.
- **FR-3** is represented by emergency-information retrieval, urgency handling, and response display.

---

### 1.3 Sequence Diagram — Unhappy Path / Error Handling

The unhappy-path sequence diagram shows how ResQTh recovers when a natural-language result is unclear or when no matching local emergency contact is available.

![ResQTh Unhappy Path Sequence Diagram](diagrams/sequence-unhappy-path.png)

### Step-by-step Execution

1. The user enters a natural-language description.
2. The prototype performs a simulated interpretation of the input.
3. The interpreted province, category, and urgency are presented for review.
4. The user confirms or changes the province and/or category.
5. The system continues using the confirmed values.
6. The prototype can demonstrate a national emergency fallback when no local match is available.
7. The user receives a usable response instead of reaching a dead-end error.

### SRS Alignment

- **FR-4** requires the user to be able to correct the interpreted province or category before continuing.
- **FR-3** requires a national emergency hotline fallback when no local contact matches the selected province and category.

---

## 2. Data Model

The ResQTh data model describes the information the intended system needs to support the Must-Have Functional Requirements.

At this stage, the model is **technology-agnostic**. It does not select a specific database or framework.

> **Prototype note:** The current M3 prototype does not use a real database. It uses simplified in-memory mock data to demonstrate the required flows. The entities below represent the logical data model for the intended system.

### 2.1 Entity Summary

| Entity | Purpose | Related FR |
| :--- | :--- | :--- |
| `Province` | Represents the province used to localize emergency information | FR-1 |
| `EmergencyCategory` | Represents the type of emergency and its urgency level | FR-2 |
| `EmergencyContact` | Represents emergency hotline/contact information | FR-3 |
| `GuidanceStep` | Represents ordered checklist steps for low-urgency situations | FR-3 |
| `OfficialFacility` | Represents an official place the user may need to visit | FR-3 |
| `IncidentNote` | Represents notes entered during a low-urgency flow | FR-3 |

### 2.2 Entity Specifications

#### Entity: `Province`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `provinceId` | String | Unique identifier for a province |
| `nameEnglish` | String | Province name in English |
| `nameThai` | String | Province name in Thai |

#### Entity: `EmergencyCategory`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `categoryId` | String | Unique category identifier |
| `categoryName` | String | Name of the emergency category |
| `urgencyLevel` | String | `High` or `Low` urgency |

#### Entity: `EmergencyContact`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `contactId` | String | Unique contact identifier |
| `name` | String | Name of the emergency service |
| `phoneNumber` | String | Hotline or contact number |
| `provinceId` | String | Province associated with the contact |
| `categoryId` | String | Emergency category associated with the contact |
| `isNationalFallback` | Boolean | Indicates whether the contact is a national fallback |

#### Entity: `GuidanceStep`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `stepId` | String | Unique step identifier |
| `instruction` | String | Guidance text shown to the user |
| `stepOrder` | Integer | Display order of the step |
| `categoryId` | String | Related emergency category |

#### Entity: `OfficialFacility`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `facilityId` | String | Unique facility identifier |
| `name` | String | Name of the official facility |
| `location` | String | Facility location or address |
| `provinceId` | String | Province where the facility is located |
| `categoryId` | String | Related emergency category |

#### Entity: `IncidentNote`

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `noteId` | String | Unique note identifier |
| `content` | String | User-entered incident note |
| `createdAt` | Date/Time | Time the note was created |
| `categoryId` | String | Related emergency category |

### 2.3 Main Relationships

- One **Province** can be related to many **EmergencyContacts**.
- One **EmergencyCategory** can be related to many **EmergencyContacts**.
- One **EmergencyCategory** can have many **GuidanceSteps**.
- One **Province** can have many **OfficialFacilities**.
- One **EmergencyCategory** can have many **OfficialFacilities**.
- One **EmergencyCategory** can be associated with many **IncidentNotes**.

### 2.4 Data-Model Alignment with the SRS

- **FR-1** needs `Province` because emergency information is localized by province.
- **FR-2** needs `EmergencyCategory` because the user selects a category and the system uses the category's urgency level.
- **FR-3** needs `EmergencyContact`, `GuidanceStep`, `OfficialFacility`, and `IncidentNote` to support the different response types.
- **FR-4** does not require a permanent `AIQuery` entity. Natural-language input produces temporary province, category, and urgency values and then reuses the existing model.

---

## 3. UI Design & User Flow

The ResQTh UI is designed to help users reach relevant emergency information with a clear and simple flow.

### 3.1 Design System

#### Colors

| Design Token | Usage |
| :--- | :--- |
| Primary Blue | Main actions, location controls, links, and focus states |
| Emergency Red | High-urgency response and urgent status |
| Guidance Green | Low-urgency and post-incident guidance |
| Neutral Gray | Backgrounds, borders, and secondary information |
| White | Main cards and content surfaces |

Color is not used alone to communicate urgency. Text labels such as **Urgent** and **Guidance** are also displayed.

#### Typography

- Large bold headings provide visual hierarchy.
- Body text uses readable sentence case.
- Labels and helper text are visually separated from primary information.
- Buttons use clear action-oriented labels such as **Call 1669**, **Choose Province**, and **Save Note**.

#### Spacing

The UI uses a consistent spacing scale:

**4 / 8 / 16 / 24 / 32 px**

#### Reusable UI Components

- Top navigation bar
- Location card
- Emergency category card
- Natural-language input panel
- Primary and secondary buttons
- Urgency status badge
- Hotline card
- Checklist item
- Official-facility guidance card
- Incident-note field
- Error / fallback alert
- Help panel

---

### 3.2 Accessibility Considerations

The prototype includes several accessibility-oriented design choices:

- Visible keyboard focus styles
- Interactive controls sized around 44 px or larger
- Labelled form fields
- Semantic HTML controls
- Clear error and fallback messages
- Urgency communicated with text/icons as well as color

---

### 3.3 UI-to-Requirement Mapping

| UI Screen ID | Screen / State | Mapped Requirement | Action / Trigger | Prototype Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `UI-01` | Home / Location | FR-1 | Detect location or choose province | Simulated location detection and manual province selection; selected province is kept as UI state |
| `UI-02` | Emergency Category Selection | FR-2 | Select or clear emergency category | Category selection and return to general-hotline state |
| `UI-03` | High-Urgency Response | FR-3 | Call hotline or choose GPS sharing | Hotline action is simulated; GPS sharing requires confirmation and is not transmitted |
| `UI-04` | Low-Urgency Guidance | FR-3 | Follow checklist, add note, view facility guidance | Checklist and temporary note are interactive; route action is simulated |
| `UI-05` | Natural-Language Input | FR-4 | Submit natural-language description | Natural-language interpretation is simulated |
| `UI-06` | AI Result Review | FR-4 | Confirm or correct province/category | User can manually correct the interpreted result before continuing |
| `UI-07` | National Fallback | FR-3 | Show national emergency contact | Demonstrates the intended fallback state; no real local-contact lookup is performed |
| `UI-08` | Offline State | NFR-4 | Open offline-state demonstration | Shows mock preloaded national hotline information; real offline caching is not implemented |

---

### 3.4 Main User Flows

#### Manual Emergency Flow

**Home → Set Province → Select Emergency Category → Display High/Low-Urgency Response**

#### Natural-Language Flow

**Home → Describe Situation → Review Parsed Result → Correct if Needed → Display Response**

#### Error / Fallback Flow

**No Local Match → National Emergency Fallback**

#### Offline Demonstration

**Offline State → Mock Preloaded National Hotlines**

---

### 3.5 Prototype Scope and Limitations

The M3 prototype is intended to demonstrate the required clickable flows without a real backend or database.

The following behaviors are simulated in the current prototype:

- Location detection
- Natural-language interpretation
- Emergency phone calling
- GPS-coordinate sharing
- Facility routing
- Offline caching / preloaded data behavior

The selected province is maintained and displayed throughout the flow, but the current mock emergency-contact and facility data are not yet separate province-specific datasets.

The national-fallback screen is available as a prototype demonstration; it is not triggered by a real backend lookup failure.

Incident notes are stored only temporarily in the prototype state and are not saved to a persistent database.

The Thai-language button is present as a planned language option, but full Thai translation is not implemented in the current prototype.

Performance-related NFRs are design targets and have not been formally measured with real external services at this prototype stage.

---

## 4. Traceability Summary

| Requirement | Main Operation | Main Data | Main UI |
| :--- | :--- | :--- | :--- |
| FR-1 | Detect or manually select province | Province | UI-01 |
| FR-2 | Select / clear emergency category | EmergencyCategory | UI-02 |
| FR-3 | Determine and display appropriate response | EmergencyContact, GuidanceStep, OfficialFacility, IncidentNote | UI-03, UI-04, UI-07 |
| FR-4 | Interpret natural-language input and allow correction | Temporary province/category/urgency values | UI-05, UI-06 |
| NFR-4 | Demonstrate intended offline behavior | Mock preloaded hotline information | UI-08 |
