---
name: clearance-metrics-dashboard
description: Generate executive-grade backlog clearance dashboards. TRIGGER when a user provides AR/AP/invoice/ticket/backlog clearance numbers (e.g. "we cleared $X in Y weeks", "Z% of backlog in N days", "clearing $N per day") and asks for metrics, rates, visuals, charts, or an executive/director-level summary. Produces a self-contained HTML dashboard plus a concise KPI readout sized for Directors, Sr. Managers, Sr. Directors, and VPs.
---

# Clearance Metrics Dashboard

Purpose: turn raw backlog-clearance numbers into a crisp, executive-ready KPI story. Audience is senior leadership — Directors, Sr. Managers, Sr. Directors, VPs. They want **rate, velocity, trajectory, and ETA** in under 30 seconds of reading.

## When to use

Use this skill whenever the user provides clearance data in any of these forms:
- Dollars cleared over a time window ("$19M in 3 weeks")
- Percentage of backlog cleared ("32% in 15 business days")
- A daily/weekly run rate ("clearing $1.7M/day")
- Invoice / ticket / case counts cleared over time
- Any mix of the above

Do NOT use this skill for generic financial reporting, forecasting unrelated to backlog, or operational dashboards that aren't about clearing a queue.

## Core metrics to always compute

Given the inputs, derive and present ALL of these (skip only if data is truly missing):

| Metric | Formula | Why leadership cares |
|---|---|---|
| Total Cleared ($ or #) | input | Headline win |
| Elapsed window | input (convert to both calendar days and business days) | Normalizes "weeks" talk |
| Avg Daily Clearance | Total Cleared / business days | Baseline velocity |
| Current Run Rate | input or latest period | Is pace improving? |
| Acceleration | (Run Rate − Avg) / Avg | Proves momentum |
| % of Backlog Cleared | input | Progress vs. whole |
| Implied Total Backlog | Cleared / % cleared | Frames scope |
| Remaining Backlog | Total − Cleared | What's left |
| Daily Backlog % Burn | % cleared / business days | "Points per day" |
| Weekly Run Rate | daily × 5 | Exec-friendly unit |
| ETA to Zero (business days) | Remaining / Run Rate | The answer to "when done?" |
| ETA to Zero (calendar weeks) | business days / 5 | Same, in weeks |
| Projected Total Cycle | elapsed + ETA | Full-story timeline |

## Output format (two deliverables)

Always produce BOTH:

### 1. Inline KPI readout (markdown)
A ~10-line summary in the chat. Lead with the headline rate, then trajectory, then ETA. No fluff.

### 2. Self-contained HTML dashboard
Write to `dashboards/clearance-dashboard-<slug>.html` (create the folder if missing). Must be:
- **One file**, no external JS/CSS/CDN dependencies (inline everything; Chart.js only if vendored, otherwise use inline SVG).
- **Print-friendly** (A4 landscape), because execs paste into decks and PDFs.
- **Above-the-fold hero**: 4 giant KPI tiles — Cleared, Rate/day, % Backlog, ETA.
- **Three charts** (SVG, no libraries required):
  1. Progress bar: % of backlog cleared vs. remaining
  2. Burn-down projection: remaining backlog over time at current rate
  3. Run-rate comparison: avg vs. current (shows acceleration)
- **One "So what" callout box** at the top — the single sentence a director should take into their next meeting.
- Monochrome + 1 accent color (navy `#0B2545` + emerald `#2E8B57` works well). No gradients, no emoji, no clipart.
- Footer: "As of <date> • Source: <user-provided or 'Ops team'>"

## Design rules for executive audiences

1. **Numbers first, words second.** Tiles should be readable from 6 feet away.
2. **Round aggressively** for display ($19.0M, not $19,000,000.00) but keep precise values in tooltips/notes.
3. **Always show the trajectory**, not just the snapshot. Execs ask "what's next" — answer it before they ask.
4. **Anchor every metric to a decision.** If a number doesn't inform a decision, cut it.
5. **Never use "approximately" three times.** Commit to the math; footnote assumptions.
6. **Name the assumption explicitly** when you infer backlog size from a percentage (e.g. "Implied backlog = $19M / 32% = $59.4M").
7. **Business days ≠ calendar days.** Convert and label. 3 weeks = 15 business days = 21 calendar days.

## Workflow

1. Parse inputs. Identify which of {dollars cleared, % cleared, time window, run rate} are given.
2. Compute the full metric table above. Flag any metric that required an assumption.
3. Write the inline KPI readout to the chat.
4. Generate the HTML dashboard file.
5. Tell the user the file path and summarize in one sentence what the dashboard says.

## Reference calculation (sanity check template)

```
Inputs:
  cleared        = 19_000_000      # $
  window_weeks   = 3
  biz_days       = 15              # 3 weeks × 5
  pct_cleared    = 0.32
  run_rate_day   = 1_700_000       # $/day

Derived:
  avg_daily      = cleared / biz_days           # 1.267M
  acceleration   = (run_rate_day - avg_daily) / avg_daily   # +34%
  total_backlog  = cleared / pct_cleared        # 59.375M
  remaining      = total_backlog - cleared      # 40.375M
  daily_pct_burn = pct_cleared / biz_days       # 2.13%
  weekly_rate    = run_rate_day * 5             # 8.5M
  eta_biz_days   = remaining / run_rate_day     # ~24
  eta_weeks      = eta_biz_days / 5             # ~4.75
  total_cycle    = biz_days + eta_biz_days      # ~39 biz days
```

## Anti-patterns to avoid

- Don't bury the headline metric under a table of secondary numbers.
- Don't show raw CSV dumps or long tables — execs won't read them.
- Don't use rainbow color palettes. 1 accent color only.
- Don't cite `≈` or `~` on the headline tiles. Commit to a value.
- Don't include methodology paragraphs on the dashboard itself — put assumptions in a small footnote.
- Don't forget the ETA. The #1 question from leadership is always "when is this done?"
