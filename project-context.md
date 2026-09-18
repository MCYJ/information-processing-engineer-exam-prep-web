# KOR-0001 marketing site context

## Scope

- Independent public marketing and study site for released app `KOR-0001` only.
- App source is read-only: `/Users/youngjunma/Documents/various test prep apps project/services/kor/00/kor-0001`.
- Android package and iOS bundle identifier: `app.mcyj.examprep.kor0001`.
- Production target: `https://mcyj.github.io/information-processing-engineer-exam-prep-web/`.

## Verified Store state — 2026-09-19

- Google Play resolves publicly for the exact package.
- Apple lookup returns no public record for the exact bundle in KR, US or GB.
- Google Play uses its active official badge. App Store is a localized disabled control in the same 194 × 75 px frame, with no fabricated URL.

## Content and official facts

- Korean and English routes with 10 substantive guides per locale.
- Written subjects: Software Design, Software Development, Database Construction, Programming Language Use and Information System Construction Management.
- The written test uses 20 four-choice items and 30 minutes per subject: 100 items and 150 minutes total.
- Written passage requires at least 40 points in every subject and a 60-point overall average.
- The practical Information Processing Practice examination is written-response, 150 minutes, with a 60-point threshold.
- Q-Net currently separates the standard applying in 2026 from the standard applying in 2027–2029.
- 2026 dates and fees are mutable and the live Q-Net page remains authoritative.
- Canonical sources:
  - `https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s02&jmCd=1320&jmInfoDivCcd=B0`
  - `https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320`
  - `https://www.q-net.or.kr/man001.do?gId=&gSite=Q&id=man00102`

## Design and implementation

- Visual thesis: a soft-apricot IT workbench with terracotta markers, compact system cards and real app screens.
- Global Korean-safe wrapping uses `word-break: keep-all` and `overflow-wrap: break-word`.
- Dependency-free static generator; GitHub Actions builds, checks and deploys `dist/` to Pages.

## Verification log

- 2026-09-19: project initialized from the proven static-site system and retargeted to KOR-0001 content, app assets and exact live Store state.
- 2026-09-19: local build generated 34 indexable routes and 36 HTML files; metadata, links, exact package, disabled App Store state, `keep-all`, equal marketplace frames and stale-content rejection passed.
- 2026-09-19: local HTTP QA returned 200 for all 34 sitemap routes and five key assets; an unknown route returned 404.
