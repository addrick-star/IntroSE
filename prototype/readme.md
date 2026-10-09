# ResQTh — Final M3 Prototype v5

This version keeps the stronger visual quality and full category coverage while also applying the Week 5 UX/UI review criteria and Nielsen's 10 usability heuristics.

## What changed from the previous version

* Restored **all 9 emergency categories directly on the home screen**.
* Restored larger category cards and icons so categories are easy to scan.
* Replaced the black natural-language panel with a light blue assistance card that matches the rest of the design system.
* Kept the useful heuristic improvements:

  * visible loading/status feedback
  * review-before-apply for AI parsing
  * back/cancel/change/clear controls
  * confirmation before GPS sharing
  * plain-language error and fallback states
  * Help panel
  * keyboard-visible focus
  * labelled fields and semantic controls
  * general hotlines when no category is selected

## Nielsen's 10 heuristics

1. **Visibility of system status** — detecting, interpreting, saving, confirmed and error feedback are shown.
2. **Match between system and real world** — plain emergency language such as Medical emergency, Police, Lost passport, Call, Province.
3. **User control and freedom** — Back, Cancel, Change situation, Clear category, and GPS-share cancellation.
4. **Consistency and standards** — repeated card, button, status, spacing, heading and navigation patterns.
5. **Error prevention** — AI results are confirmed before use; GPS sharing requires confirmation; empty natural-language input is blocked.
6. **Recognition rather than recall** — all 9 categories remain visible and context chips show province/category/urgency.
7. **Flexibility and efficiency** — manual category route and natural-language route are both available.
8. **Aesthetic and minimalist design** — restrained palette, consistent 4/8/16/24/32 spacing, one visual hierarchy, no black AI panel.
9. **Help users recognize, diagnose and recover from errors** — location failure, no-local-match and offline states explain what happened and what the user can do.
10. **Help and documentation** — Help panel explains the core flow.

## Accessibility / POUR

* high-contrast primary text and controls
* visible focus outlines
* minimum 44 px interactive targets
* labelled form fields
* semantic HTML controls
* urgency is conveyed with text/icons, not color alone
* live status feedback through an ARIA live region

## FR coverage

* **FR-1:** detect province or manual province selection.
* **FR-2:** choose/clear emergency category.
* **FR-3:** high-urgency immediate response; low-urgency checklist, notes and facility guidance; national fallback.
* **FR-4:** natural-language description → review/correct province/category/urgency → response.

## Prototype limitation

No real backend, database, GPS transmission, AI service or phone call is connected. Interactions are simulated for the M3 clickable prototype.

