<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the single-screen studio experience in a reusable StudioPage rendered by the index route; the requested design is one scrolling page.
- Define studio visual tokens, typography, and motion centrally in src/styles.css and expose CTA styles as Button variants for consistent presentation.
- Reference downloaded photography through committed Lovable asset pointers, so production never depends on temporary image URLs.
- Until a verified booking destination is supplied, appointment actions open an accessible dialog linking to a clearly labelled Maps contact search, never imply a booking is submitted.
- Keep the supplied full-page composition in StudioPage with data-driven service and bridal rows; this preserves one-page navigation without duplicating section markup.
- Appointment form submission prepares a local contact summary in the dialog only; no persistence or confirmed booking is implied without a verified delivery destination.
