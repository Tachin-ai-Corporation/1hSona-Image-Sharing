# Sona × 1Health Integration Demo — PRD

**Version:** 1.0  
**Date:** April 18, 2026  
**Author:** Neil Sethi, Platform Lead, 1Health  
**Audience:** Internal (rebuild reference), Ellen Murphy (Sona CEO)

---

## Purpose

A clickable prototype demonstrating how Sona (prenatal ultrasound image sharing) gains immediate distribution and growth by integrating physician-to-physician image sharing through the 1Health provider network. The demo is designed to be presented to Ellen Murphy to make the value proposition tangible before any backend connectors are built.

## Core Narrative

Sona's customers are requesting physician-to-physician image sharing (e.g., second opinions, referrals). Today, Sona doesn't offer this. 1Health solves it by providing a verified physician directory, SSO authentication, and a platform dashboard where Sona becomes discoverable alongside other apps (TRC, Giggle Gauge, etc.). The aligned incentive: every share event either leverages the existing 1Health network or pulls a new physician onto it, compounding network effects for both Sona and 1Health.

## Demo Flow — 7 Screens

### Screen 1: Sona Provider Dashboard (Sender Side)

**Context:** A Sona provider has just completed an ultrasound exam and wants to share images with a specialist.

**UI Elements:**
- Sona-branded header (pink gradient logo, "Provider Portal" badge, practice name "Bay Area Women's Health")
- Patient card: Sarah Johnson, MRN SN-284719, DOB 03/15/1992, gestational age 20w 3d
- 3 ultrasound image thumbnails (Profile View, 3D Render, Heartbeat) with selectable checkmarks; all pre-selected
- Two action buttons: "Send to Patient" (dimmed, existing Sona feature) and **"Share with Physician via 1Health"** (prominent, blue gradient, this is the new capability)
- Footer line: "Powered by the 1Health physician network — 4,827 providers and growing"

**Interaction:** Clicking "Share with Physician" advances to Screen 2.

---

### Screen 2: Search & Share (Physician Lookup)

**Context:** The sender searches the 1Health directory to find the specialist they want to share with.

**UI Elements:**
- Header breadcrumb: Sona → 1Health "Share with Physician"
- Patient context bar (pink): "Sharing: Sarah Johnson · 3 images · Today"
- **Reason selector** (pill buttons): Second Opinion, Referral / Consult, Co-Management, Transfer of Care. Selected reason carries through to all downstream screens.
- Search input: "Search by name, NPI, specialty, or organization..."
- Quick-filter specialty pills below search

**Two Search Outcomes (both demoed sequentially):**

#### A) Dr. Calvin G. Broadus — Found on 1Health Network
- **Visual treatment:** Blue-shaded result card, blue "On 1Health Network" badge, green verified checkmark
- Shows: name, specialty (Maternal-Fetal Medicine), org (Pacific MFM Associates), NPI
- Direct "Share" button — no email entry needed
- Clicking Share advances to Screen 3

#### B) Dr. Dana Owens — Found in NPPES, Not on 1Health
- **Visual treatment:** Orange/amber-shaded result card, orange "NPPES Directory" badge, no verified checkmark
- Shows: name, specialty (OB/GYN), org (Meridian Women's Health), NPI
- **Email confirmation required:** Text explains she isn't on 1Health yet; sender must enter her email to trigger a secure fax invitation with QR code
- Email input field with validation (turns green border on valid email)
- "Send Invitation" button activates only when email is valid
- Demo hint text: "Try: dana@latifah.com"
- Clicking Send Invitation advances to Screen 5 (Owens registration)

**Search behavior:** Typing "Broadus"/"Calvin"/"MFM"/"Pacific" triggers result A. Typing "Owens"/"Dana"/"Latifah"/"Meridian" triggers result B. Any other 3+ character query defaults to Broadus.

---

### Screen 3: Dr. Broadus Accepts (Handshake Verification)

**Context:** Broadus is already on 1Health. He receives a notification and must explicitly accept the shared images before viewing them.

**UI Chrome:**
- 1Health platform header matching real platform: "1h" logo, tenant selector showing "Practice of Dr. Calvin G. Broadus" with green person icon, breadcrumb tabs ("1h Personal Dashboard" | "Sona"), notification/folder badges, user initials "CB"
- `iframe: app.1health.io` badge in top-right (matching real platform screenshots)

**Content — Handshake Card:**
- Sona-branded card header: "Incoming Image Share via Sona on 1Health"
- Visual flow: Bay Area Women's Health (sender, with Sona icon) → HIPAA SECURE arrow → Dr. Broadus (receiver, with initials avatar)
- Details grid: Patient (Sarah Johnson), Reason (Second Opinion or whatever was selected), Images (3 ultrasound files), Expires (30 days)
- Security badges: HIPAA Compliant, NPI Verified, E2E Encrypted, Audit Trail
- **CTA button:** "Accept & View Images"

**After clicking Accept:**
- Loading spinner (1.2s)
- Success state: green checkmark, "Images Accepted", "View Images →" button

**Interaction:** Clicking "View Images" advances to Screen 4.

---

### Screen 4: Broadus Views Images (Sona in 1Health Platform)

**Context:** Broadus is now viewing the ultrasound images inside Sona, which runs as an app within the 1Health platform.

**UI Chrome:**
- Same 1Health platform header with "Practice of Dr. Calvin G. Broadus" tenant
- Breadcrumb tabs: "1h Personal Dashboard" | **"Sona"** (active)
- `iframe: app.1health.io` badge

**Content:**
- App header: Sona icon + "Sona — Ultrasound Imaging" / "Viewing as Practice of Dr. Calvin G. Broadus"
- Pink gradient divider line
- **Shared images card:**
  - Header: "Shared With You" / "Sarah Johnson — Prenatal Ultrasound" / "From Bay Area Women's Health · Second Opinion · April 18, 2026"
  - "HIPAA Secure" green badge
  - Patient info bar: DOB, Gestational Age, Exam Date, MRN
  - 3 ultrasound images in a grid, each with label (Profile View/3D Render/Heartbeat) and technical mode (Sagittal/3D Surface/M-Mode)
- **Activity Overview chart:** Bar chart showing historical activity (12 bars, pink gradient). Placeholder demonstrating that Sona has its own analytics within the platform.

**Interaction:** "See Dr. Owens' Experience →" button advances to Screen 5.

---

### Screen 5: Dr. Owens Registration (New Physician, PIN Entry)

**Context:** Owens received a physical fax at her practice with a QR code. She scanned it and landed on this 1Health registration page. She has no existing 1Health account.

**UI Elements (centered, standalone page, light gray background):**
- 1Health dark logo (rounded square with "1h")
- Green "New Practice Registration" badge
- Welcome heading: "Welcome, Practice of Dr. Dana Owens"

**Invitation Card (white card, left-aligned):**
- Sona app icon + "Sonographic Images Shared" label (uppercase, muted)
- "Bay Area Women's Health" (bold) / "On behalf of patient Sarah Johnson"
- Reason pill: wifi icon + "Inviting you for Second Opinion" (or selected reason)
- Sona app card (pink-tinted border): Sona icon + "Sona — Ultrasound Imaging" / "Securely view prenatal ultrasound images"

**PIN Entry:**
- "4-Digit Invitation PIN" heading
- 4 individual digit input boxes (large, rounded, green border on focus/fill)
- Auto-advance between boxes on digit entry
- On all 4 digits entered: loading spinner → success state

**Success State:**
- Green checkmark circle
- "Welcome to 1Health" / "Practice of Dr. Dana Owens verified."
- "Open Sona →" button

**Footer note:** "This PIN was included in the secure fax sent to your practice. Multiple verification faxes may be sent if needed."

**Demo note:** Any 4 digits work for the demo.

**Interaction:** "Open Sona" advances to Screen 6.

---

### Screen 6: Dr. Owens Verifies & Views Images

**Context:** Owens is dropped directly into Sona — she has no other 1Health apps. She must verify her identity and accept the images before viewing.

**UI Chrome:**
- 1Health platform header with "Practice of Dr. Dana Owens" tenant
- **Only one breadcrumb tab: "Sona"** (no "1h Personal Dashboard" alongside other apps — she's new, Sona is her only app)
- `iframe: app.1health.io` badge

**Content — Phase 1 (Verification Handshake):**
- Sona app header: "Sona — Ultrasound Imaging" / "Viewing as Practice of Dr. Dana Owens"
- Verification card:
  - Header: "Verify Image Share" / "Please confirm you're the intended recipient"
  - Details grid: Patient, Reason, From, Images
  - Security badges: HIPAA Compliant, NPI Verified, E2E Encrypted
  - Consent text: "By accepting, you confirm you are Dr. Dana Owens and consent to receive HIPAA-protected patient images for the purpose of a second opinion."
  - **CTA:** "I am Dr. Dana Owens — Accept & View Images"
- Loading spinner on click (1s)

**Content — Phase 2 (Images Displayed):**
- Same Sona in-platform layout as Broadus (Screen 4) but with Owens' tenant context
- Shared images card with patient info and 3 ultrasound thumbnails
- "See the Network Effect →" button

**Interaction:** Advances to Screen 7.

---

### Screen 7: Network Effect (Closing Pitch)

**Context:** The money slide. Summarizes the flywheel and value proposition for Ellen.

**Design:** Dark gradient background (navy/slate), white text. Sona + 1Health logos side by side.

**Headline:** "Every Share Grows the Network. Every Provider Strengthens the Platform."

**4-Step Flywheel (2×2 grid):**

| Step | Title | Description | Color |
|------|-------|-------------|-------|
| 01 | Provider Shares via Sona | Selects a specialist, chooses a reason, shares ultrasound images through the 1Health network. | Pink |
| 02 | Existing MD Accepts Instantly | Dr. Broadus is on 1Health — gets a notification, clicks accept, views images. No friction. | Blue |
| 03 | New MD Gets a Fax + QR Code | Dr. Owens isn't on 1Health. Receives a fax, scans QR, enters PIN, dropped directly into Sona. | Amber |
| 04 | Network Compounds | Payors drive providers through TRC. Sona adds a new vector. Every physician who joins sees the full app ecosystem. | Teal |

**Value Props for Sona (2×3 grid):**

| Icon | Title | Description |
|------|-------|-------------|
| 📈 | Instant Distribution | 4,800+ verified physicians already on 1Health. |
| 🔐 | SSO & Shared Identity | One credential, all apps. No new logins. |
| 🏥 | Payor-Driven Adoption | Payors onboard providers through TRC. Sona rides the same wave. |
| 🔍 | App Discovery | Sona visible on every provider's dashboard. |
| 💰 | Fundraising Narrative | Network distribution = a stronger pitch to investors. |
| 🚀 | No Infrastructure Build | Identity, compliance, directories — all built. Ship the feature. |

**Closing:** "Let's build this together. Sona × 1Health"

---

## Global Navigation

- **Top control bar** with: "DEMO Sona × 1Health" label, progress dots (7 dots, active = blue pill, completed = green, upcoming = gray), Back/Next buttons
- All screens scrollable; scroll resets to top on navigation
- Next button auto-sets physician data when skipping past search

## Visual Design Specifications

### Sona Brand (Sender Screens)
- Primary: #E8567F (pink), Light: #FDF2F5
- Logo: Rounded square with pink-to-dark-pink gradient, white "S"
- Used for: Provider portal header, patient cards, image selection borders, app icon in 1Health

### 1Health Platform (Receiver Screens)
- Header: White background, border-bottom #E2E8F0
- Logo: Rounded square with gray border, "1h" in dark text
- Tenant icon: Green (#00B894) rounded square with person silhouette
- Tenant name format: "Practice of Dr. [Full Name]"
- Breadcrumb tabs: Light gray background when active, app icon + label
- iframe badge: Top-right, monospace, light gray background ("iframe: app.1health.io")
- Body background: #F0F2F5

### Search Result Differentiation
- **On-network physician:** Blue tint (#4A7BF7 at 10% opacity), blue "On 1Health Network" badge, green verified checkmark
- **NPPES-only physician:** Amber tint (#ED8936 at 10% opacity), amber "NPPES Directory" badge, no checkmark, requires email confirmation

### Typography
- System font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Headings: 18-22px, weight 700
- Body: 13-14px, weight 400-500
- Labels/badges: 10-12px, weight 600, uppercase with letter-spacing

## Data Model (Demo Only)

### Patient
```
name: "Sarah Johnson"
dob: "03/15/1992"
mrn: "SN-284719"
gestational_age: "20w 3d"
exam_date: "April 18, 2026"
images: [
  { label: "Profile View", mode: "Sagittal", time: "10:32 AM" },
  { label: "3D Render", mode: "3D Surface", time: "10:35 AM" },
  { label: "Heartbeat", mode: "M-Mode", time: "10:38 AM" }
]
```

### Sending Provider
```
practice: "Bay Area Women's Health"
```

### Receiving Physicians
```
broadus: {
  name: "Dr. Calvin G. Broadus"
  specialty: "Maternal-Fetal Medicine"
  org: "Pacific MFM Associates"
  npi: "1928374650"
  initials: "CB"
  status: "on_network"  // blue treatment
}

owens: {
  name: "Dr. Dana Owens"
  specialty: "OB/GYN"
  org: "Meridian Women's Health"
  npi: "1567890234"
  initials: "DO"
  email: "dana@latifah.com"
  status: "nppes_only"  // amber treatment, requires email + fax invitation
}
```

### Share Reasons (Enum)
```
second_opinion | referral | comanage | transfer
```

## Key Product Assumptions (Not Yet Built)

These are presented as real in the demo but do not exist in production. Documenting for honesty with Ellen and for engineering scoping:

1. **1Health physician search from within Sona** — Sona does not currently call any 1Health API. This would require an integration endpoint.
2. **NPPES directory lookup** — 1Health has a public NPI endpoint but the search-by-name UX shown here is not built.
3. **Secure fax with QR code** — The fax/QR/PIN registration flow is a concept. The PIN-based practice registration page exists in 1Health (screenshot 3) but the Sona-specific invitation card content is new.
4. **Sona as an iframe app in 1Health** — 1Health supports iframe apps (TCM App screenshot), but Sona is not yet registered as one.
5. **Handshake/accept flow** — The explicit consent step before viewing images is a demo concept, not a shipped feature.
6. **Share reason passing** — No mechanism currently exists to attach a reason (second opinion, referral, etc.) to a share event.

## Out of Scope for This Demo

- Sona's existing patient-facing app flow
- 1Health dashboard for Broadus showing all his apps (we go directly to Sona after accept)
- Multiple fax retry logic (mentioned in copy only)
- Provider-to-provider messaging/chat
- Billing or payment flows
- Admin/payor view of the network

## Success Criteria

Ellen leaves the demo understanding:
1. Her customers' request for physician-to-physician sharing is solvable today through 1Health
2. Every share event either uses or grows the 1Health provider network
3. Sona gets dashboard real estate alongside payor-driven apps (TRC) with zero distribution cost
4. The SSO/single-login story removes the biggest friction point for provider adoption
5. This strengthens her fundraising narrative with concrete network distribution mechanics
