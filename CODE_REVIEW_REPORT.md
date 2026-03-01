# Code Review: Destination Calculator

I had a look through the codebase and compared it with what we’d agreed on (modular structure, no inline/sx styling, clear separation of types, services, components, pages, utils, hooks). Here’s a concise, honest take—written as if I’m giving feedback to myself after reviewing a junior’s work.

---

## What’s working

- **Features**: The app does what it’s supposed to: origin/destination, mode, distance/duration, weather, attractions, emergency numbers. That’s solid.
- **Services**: `apiClient` and `apiCalls` are separated from UI. API logic lives in one place, which is good.
- **Types**: There’s a `types/` folder with shared types and API result types. That’s the right idea.
- **Component CSS**: Components use their own `.css` files (e.g. `DestinationCalculator.css`, `RouteResult.css`) instead of one giant stylesheet. That’s a good habit.
- **Constants**: API URLs and keys are in `apiConstants`, which keeps config out of components.

So the high-level idea of “modular” was understood; the gaps are mostly in consistency and in sticking to the rules we set.

---

## Where it falls short

### 1. Styling: `sx` and inline styles (we said no)

We explicitly asked to avoid `sx` and inline CSS. The code doesn’t follow that.

- **DestinationCalculator.tsx** uses `sx` a lot: on `FormControlLabel`, all three `Autocomplete`s, `TextField`s, both `Button`s, `Box`, `TabList`, and every `Tab`. There’s also an `autoCompleteStyle` object used inside `sx`. All of that should move to CSS (e.g. component-level or a shared theme/classes).
- **CopyButton.tsx** uses `sx={{ color: ... }}` for theme-dependent color. That could be a class or a CSS variable.
- **CityDetailsPanel.tsx** uses inline `style={{ color, textDecoration, marginRight, wordBreak }}` on the booking link. That should be a class in `CityDetailsPanel.css`.

So: the feedback here is “we wanted modular CSS and no sx/inline; the current approach goes the other way.” For next time, we should either stick to plain CSS + classes or, if we use MUI, style via `styled()` or theme + classes, not `sx` in the component.

---

### 2. Modular structure: missing pieces

We asked for a clear split: **types**, **services**, **components**, **pages**, **utils**, **hooks**.

- **Pages**: There’s no `pages/` (or similar) layer. Everything is under `App` → `DestinationCalculator`. For a single flow it’s not a disaster, but we did ask for “pages” to be a separate concept. Even one page (e.g. `pages/CalculatorPage.tsx`) that wraps `DestinationCalculator` would match the intended structure.
- **Hooks**: There are no custom hooks. A lot of logic (theme, current location, form state, tab state) lives inside `DestinationCalculator`, which is a big component. Extracting things like `useThemeToggle()`, `useCurrentCity()`, or `useCalculatorForm()` would make the structure clearer and the component easier to read and test.
- **Utils**: We have `utils/`, but several files are `.tsx` even though they don’t render anything: `getTheme.tsx`, `matchWeatherIcon.tsx`, `getLocalTime.tsx`, `getAttractionsInfo.tsx`, `calculatePopularityScore.tsx`, `calculateFlightDistance.tsx`. Pure logic like that should be `.ts` so it’s obvious they’re not UI. File extension should match content (JSX → `.tsx`, no JSX → `.ts`).

So the structure is “partially modular”: types and services are there, components are there, but pages and hooks are missing, and utils are mixed in with `.tsx` where it’s not needed.

---

### 3. Types and data

- **CopyButton**: Props are defined inline as `{ textToCopy: string; isLightTheme: boolean }`. We have a shared `types/index.ts` for other components; CopyButton should have something like `CopyButtonProps` there (or in a component-specific types file) for consistency.
- **`any` usage**:  
  - `renderInput={(params: any) => ...}` in `DestinationCalculator` (three times). MUI’s `AutocompleteRenderInputParams` (or the correct type from `@mui/material`) should be used.  
  - `cities.find((city: any) => ...)` in `apiCalls.ts`. The list comes from `cities.json`; we should have a proper type for a city (or use the one from types) and avoid `any`.  
  - `EmergencyContacts`: `useState<any | null>`. The shape of the emergency numbers object is known; it should be a small interface.  
  - `AttractionsList`: `useState<any[] | null>`; same idea—type it properly.
- **Types vs data**: `types/constants/cities.json` is data, not type definitions. Usually “constants” or “data” live under something like `data/` or `constants/`, and `types/` is for `.ts` type definitions. Moving `cities.json` to e.g. `src/data/` or `src/constants/` would make the intent clearer.

---

### 4. Small but important details

- **Duplicate keys**: In `CityDetailsPanel`, both `<td className='activity-name'>` and `<td className='activity-short-desc'>` (and possibly others) use `key={activity.id}`. Keys should be on the top-level element in the map (the parent `div` or `tr`), and they should be unique. Here the parent already has `key={activity.id}`; the `td`s don’t need keys, and if they did, they shouldn’t reuse the same value.
- **Leftover log**: In `apiClient.ts`, `fetchCityName` has `console.log(...)`. That should be removed before we call it “done.”
- **Package.json**: The project runs with Vite (`vite.config.ts`, `dev`/`build`/`preview`), but `package.json` includes `next` and a `"start": "next start"` script. That’s misleading and can confuse anyone cloning the repo. Either remove Next.js and the `start` script or document why they’re there.
- **AttractionsList vs getAttractionsInfo**: `getAttractionsInfo` is synchronous and reads from local data, but the component uses `useEffect` and a “loading” state. So we’re simulating async for something that isn’t. Either make the data loading async (e.g. from an API) and keep loading state, or treat it as sync and drop the loading state and effect. Right now it’s inconsistent.

---

## Summary table

| Area              | Asked for                         | Current state                                      |
|------------------|------------------------------------|----------------------------------------------------|
| No sx / no inline| No sx, no inline CSS               | Heavy use of `sx` and one inline `style`           |
| Modular structure| types, services, components, pages, utils, hooks | types/services/components/utils ✓; pages ✗; hooks ✗ |
| Styling          | Modular CSS (e.g. per-component)   | Component CSS exists but MUI/sx dominates          |
| Types            | Clear, shared types                | Good base; `any` in several places; CopyButton inline props |
| Utils            | Pure logic in utils                | Logic in utils ✓ but many files wrongly as `.tsx`  |

---

## Tone of the review

I didn’t want this to feel like a strict audit. The intern clearly understood the problem domain and got a working app with a reasonable starting structure. The main takeaway is: we had agreed on a few concrete rules (no sx/inline, modular folders, pages, hooks, proper types), and the implementation drifted from those. So the feedback is “good progress, but we need to align with the architecture and styling rules we set.” If we’re going to use this as a reference or bring it into a bigger codebase, the next step would be a refactor focusing on: (1) moving all MUI/inline styling to CSS or theme, (2) introducing a pages layer and a couple of custom hooks, (3) renaming utils to `.ts` where there’s no JSX, and (4) replacing `any` and adding the missing types (including CopyButton and emergency/attractions data). I’d present this report as “here’s what I’d improve so it matches what we agreed on,” rather than “everything is wrong”—because the base is there, it just needs to be tightened up.
