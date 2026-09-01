import { createRoot } from 'react-dom/client';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, Building2, CalendarDays, CheckCircle2, ExternalLink, FilePenLine, Landmark, MapPin, Megaphone, Menu, Users, UsersRound } from 'lucide-react';
import './styles.css';

const pages = ['home', 'calendar', 'get-involved', 'our-clp'] as const;
type Page = typeof pages[number];
const href = (page: Page) => page === 'home' ? '#/' : `#/${page}`;

function A({ page, className, children }: { page: Page; className?: string; children: ReactNode }) {
  return <a href={href(page)} className={className}>{children}</a>;
}

function Header() {
  const nav: [string, Page][] = [['Home', 'home'], ['Calendar', 'calendar'], ['Member guide', 'get-involved'], ['CLP and branches', 'our-clp']];
  return <header className="site-header"><div className="shell header-inner">
    <A page="home" className="brand"><span className="brand-mark">F&amp;G</span><span><strong>Finchley &amp; Golders Green</strong><small>Labour Party</small></span></A>
    <nav aria-label="Primary navigation">{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</nav>
    <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={22} /></summary><div>{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</div></details>
  </div></header>;
}

function Footer() {
  return <footer><div className="shell footer-inner"><div className="brand footer-brand"><span className="brand-mark">F&amp;G</span><span><strong>Finchley &amp; Golders Green</strong><small>Labour Party</small></span></div></div></footer>;
}

function Intro({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><div className="shell narrow"><p className="kicker"><span />{kicker}</p><h1>{title}</h1><p>{children}</p></div></section>;
}

function Home() {
  const cards = [
    { page: 'calendar' as Page, Icon: CalendarDays, small: 'Meetings and events', title: 'Calendar', copy: 'Dates for branch meetings, CLP meetings, campaigning and social events.', cta: 'View the calendar' },
    { page: 'get-involved' as Page, Icon: Landmark, small: 'Taking part', title: 'Member guide', copy: 'Conference delegates, motions and bringing an idea to the General Committee.', cta: 'Read the member guide' },
    { page: 'our-clp' as Page, Icon: UsersRound, small: 'How decisions are made', title: 'CLP and branches', copy: 'Our delegate structure, the three branches and a ward-based branch finder.', cta: 'View the CLP structure' },
  ];
  return <main><section className="hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="shell hero-grid">
    <div><h1>Member handbook</h1><p className="hero-intro">Information for members of Finchley &amp; Golders Green Labour Party.</p><div className="hero-actions"><A page="calendar" className="button button-primary">View the calendar <ArrowRight size={18} /></A><A page="our-clp" className="button button-ghost">Find your branch</A></div></div>
    <aside className="notice-card"><p className="notice-label">Start here</p><h2>Three first steps</h2><ol><li><span>1</span><div><strong>Find your branch</strong><small>Your ward decides which branch you belong to.</small></div></li><li><span>2</span><div><strong>Attend a meeting</strong><small>Dates and details are in the calendar.</small></div></li><li><span>3</span><div><strong>Take part</strong><small>Campaign, propose a motion or apply to be a delegate.</small></div></li></ol></aside>
  </div></section>
  <section className="pathways shell"><div className="section-heading"><div><h2>Information for members</h2></div></div><div className="card-grid">{cards.map(({ page, Icon, small, title, copy, cta }) => <A page={page} className="path-card" key={page}><span className="icon-tile"><Icon size={24} /></span><small>{small}</small><h3>{title}</h3><p>{copy}</p><strong>{cta} <ArrowRight size={17} /></strong></A>)}</div></section></main>;
}

function Calendar() {
  return <main className="content-page"><Intro kicker="Meetings and events" title="Calendar">Dates for branch meetings, CLP meetings, campaigning and social events.</Intro><section className="shell embed-section"><div className="embed-heading"><div><CalendarDays size={22} /><h2>Upcoming events</h2></div><a href="https://luma.com/calendar/cal-GocAPBW0BUOu5cK" target="_blank" rel="noreferrer">Open calendar in a new window <ExternalLink size={15} /></a></div><div className="calendar-frame"><iframe src="https://luma.com/embed/calendar/cal-GocAPBW0BUOu5cK/events" title="Finchley and Golders Green Labour events calendar" allowFullScreen /></div><p className="embed-note">If the calendar does not appear, use the link above.</p></section></main>;
}

const delegateSteps = [
  ['Check you are eligible', 'For the 2026 draft process, delegates must have been individual members for at least six months by the closing date. The official call for each conference is the final authority.'],
  ['Apply through your branch', 'You can normally self-nominate or be nominated with your consent. Include your name, membership number, the role you seek and confirmation of eligibility.'],
  ['Branch nomination', 'Each branch considers applications and agrees which members to nominate to the General Committee (GC).'],
  ['GC selection', 'GC delegates agree the final delegation. If a choice is needed, the supplied 2026 draft proposes an anonymous secret ballot.'],
];

function Guide() {
  return <main className="content-page"><Intro kicker="Member guide" title="How members can take part">How to apply to be a conference delegate, submit a motion and bring an idea to the General Committee.</Intro><section className="shell guide-layout">
    <aside className="guide-nav"><p>On this page</p><a href="#delegate">Conference delegate</a><a href="#motion">Submit a motion</a><a href="#gc">Bring an idea to GC</a><a href="#expectations">What delegates do</a></aside>
    <div className="guide-content"><article id="delegate" className="guide-section"><span className="section-icon"><Users /></span><p className="eyebrow">Annual Conference</p><h2>Apply to be a conference delegate</h2><p>Conference delegates represent the CLP in formal conference business: listening to debates, participating in votes and ballots, and helping carry local priorities into the wider party.</p><div className="process-list">{delegateSteps.map(([title, copy], i) => <div className="process-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="draft-callout"><strong>2026 draft timetable — check before publishing</strong><p>The supplied local draft lists applications by <b>15 May 2026</b>, branch nominations in May, GC selection in June and Party accreditation by <b>12 noon on 26 June 2026</b>. The draft itself flags the accreditation deadline and some costs for confirmation, so members should verify these with their Branch Secretary.</p></div></article>
    <article id="motion" className="guide-section"><span className="section-icon"><FilePenLine /></span><p className="eyebrow">Policy & campaigning</p><h2>Submit a motion</h2><p>A motion asks a party body to take a position or action. Conference and local motions can have different rules, but a useful draft is always focused, factual and clear about the decision you want.</p><div className="motion-grid"><div><h3>A strong motion usually has</h3><ul className="check-list"><li><CheckCircle2 />A short title</li><li><CheckCircle2 />A few factual points explaining the issue</li><li><CheckCircle2 />A clear statement of what the branch or CLP believes</li><li><CheckCircle2 />Specific actions the body can actually take</li></ul></div><div className="motion-example"><small>Simple structure</small><p><b>This branch notes…</b><br />The important facts.</p><p><b>This branch believes…</b><br />The principle or position.</p><p><b>This branch resolves…</b><br />The action requested.</p></div></div><p className="rule-note"><b>Conference motions:</b> subject areas, word limits, deadlines and submission routes are set in the official annual conference guidance. Ask your Branch Secretary for the current call before drafting.</p></article>
    <article id="gc" className="guide-section"><span className="section-icon"><Megaphone /></span><p className="eyebrow">Local decisions</p><h2>Bring an idea to the GC</h2><p>Because this CLP uses a delegate structure, a normal route is to raise your idea at your branch, ask the branch to agree a motion, and have the branch’s GC delegates take that decision forward. The Chair can rule on whether a motion is in order under the CLP’s current standing orders.</p><ol className="plain-steps"><li><b>Talk it through.</b> Contact your Branch Secretary early and ask when the next agenda closes.</li><li><b>Write the decision.</b> Keep the motion within the powers of the branch or CLP and name any owner or next action.</li><li><b>Win branch support.</b> Attend the meeting, explain the proposal and accept useful amendments.</li><li><b>Follow it to GC.</b> Check that branch delegates have the agreed wording and ask how the outcome will be reported back.</li></ol></article>
    <article id="expectations" className="guide-section final-guide"><span className="section-icon"><ArrowRight /></span><p className="eyebrow">Representing members</p><h2>What conference delegates commit to</h2><ul className="check-list two-col"><li><CheckCircle2 />Attend conference business while it is in session</li><li><CheckCircle2 />Take part in key votes and ballots</li><li><CheckCircle2 />Engage with briefings on CLP priorities</li><li><CheckCircle2 />Follow safeguarding and behaviour expectations</li><li><CheckCircle2 />Give members a written report after conference</li><li><CheckCircle2 />Answer questions at a GC meeting</li></ul></article></div>
  </section></main>;
}

const branchByWard: Record<string, string> = { 'Church End':'Church End, West Finchley & Woodhouse', 'West Finchley':'Church End, West Finchley & Woodhouse', 'Woodhouse':'Church End, West Finchley & Woodhouse', 'Golders Green':'Golders Green, Childs Hill & Cricklewood', 'Childs Hill':'Golders Green, Childs Hill & Cricklewood', 'Cricklewood':'Golders Green, Childs Hill & Cricklewood', 'East Finchley':'East Finchley & Hampstead Garden Suburb', 'Hampstead Garden Suburb':'East Finchley & Hampstead Garden Suburb' };

function BranchFinder() {
  const [ward, setWard] = useState('');
  return <div className="branch-finder"><label htmlFor="ward">Which ward do you live in?</label><select id="ward" value={ward} onChange={e => setWard(e.target.value)}><option value="">Choose your ward</option>{Object.keys(branchByWard).map(name => <option value={name} key={name}>{name}</option>)}</select><div className={`finder-result ${ward ? 'visible' : ''}`} aria-live="polite">{ward && <><small>Your branch is</small><strong>{branchByWard[ward]}</strong><p>Your membership address normally determines your ward. If you are unsure, check your membership record or contact the CLP.</p></>}</div></div>;
}

function OurClp() {
  const branches = [ ['01','Church End, West Finchley & Woodhouse','Church End · West Finchley · Woodhouse'], ['02','Golders Green, Childs Hill & Cricklewood','Golders Green · Childs Hill · Cricklewood'], ['03','East Finchley & Hampstead Garden Suburb','East Finchley · Hampstead Garden Suburb'] ];
  return <main className="content-page"><Intro kicker="CLP structure" title="How the CLP works">The CLP has three branches. Your ward decides which branch you belong to.</Intro><section className="shell structure-section"><div className="structure-flow"><div><span><UsersRound /></span><small>Members</small><strong>All members</strong><p>Attend and vote at their branch meeting</p></div><ArrowDown /><div><span><MapPin /></span><small>Three branches</small><strong>Branch meetings</strong><p>Discuss campaigns, nominations and motions</p></div><ArrowDown /><div><span><Building2 /></span><small>CLP</small><strong>General Committee</strong><p>Branch delegates make constituency-wide decisions</p></div></div><div className="explainer"><h2>What is a delegate structure?</h2><div><p>Every member can attend their branch meeting. Each branch chooses delegates to attend the General Committee (GC), the main constituency-wide decision-making meeting.</p><p>Raise an issue, motion, nomination or volunteering offer through your branch first.</p></div></div></section><section className="branch-section"><div className="shell"><div className="section-heading"><div><h2>The three branches</h2></div><p>Your membership address normally determines your branch.</p></div><div className="branch-grid">{branches.map(([n,name,wards]) => <article className="branch-card" key={n}><small>{n}</small><h3>{name}</h3><p>{wards}</p></article>)}</div></div></section><section className="finder-section shell"><div className="finder-copy"><h2>Find your branch</h2><p>Select the ward shown on your Labour Party membership record.</p><div className="ward-help"><h3>Not sure which ward you live in?</h3><p>Enter your postcode on WriteToThem to see your local councillors and representatives. Use the ward shown there in the branch finder.</p><a href="https://www.writetothem.com/" target="_blank" rel="noreferrer">Find my ward and representatives <ExternalLink size={17} /></a></div></div><BranchFinder /></section></main>;
}

function App() {
  const getPage = (): Page => { const slug = location.hash.replace(/^#\/?/, ''); return pages.includes(slug as Page) ? slug as Page : slug === '' ? 'home' : 'home'; };
  const [page, setPage] = useState<Page>(getPage);
  useEffect(() => { const onHash = () => { setPage(getPage()); window.scrollTo({ top: 0 }); }; addEventListener('hashchange', onHash); return () => removeEventListener('hashchange', onHash); }, []);
  const View = page === 'calendar' ? Calendar : page === 'get-involved' ? Guide : page === 'our-clp' ? OurClp : Home;
  return <><Header /><View /><Footer /></>;
}

createRoot(document.getElementById('root')!).render(<App />);

