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
    <A page="home" className="brand"><img className="brand-mark" src="./labour-rose.png" alt="Labour rose" /><span><strong>Finchley &amp; Golders Green</strong><small>Labour Party</small></span></A>
    <nav aria-label="Primary navigation">{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</nav>
    <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={22} /></summary><div>{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</div></details>
  </div></header>;
}

function Intro({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><div className="shell narrow"><p className="kicker"><span />{kicker}</p><h1>{title}</h1><p>{children}</p></div></section>;
}

function Home() {
  const cards = [
    { page: 'calendar' as Page, Icon: CalendarDays, small: 'Meetings and events', title: 'Calendar', copy: 'Dates for branch meetings, CLP meetings, campaigning and social events.', cta: 'View the calendar' },
    { page: 'get-involved' as Page, Icon: Landmark, small: 'Taking part', title: 'Member guide', copy: 'Voting, candidate selections, conference delegates and other ways to take part.', cta: 'Read the member guide' },
    { page: 'our-clp' as Page, Icon: UsersRound, small: 'How decisions are made', title: 'CLP and branches', copy: 'Our delegate structure, the three branches and a ward-based branch finder.', cta: 'View the CLP structure' },
  ];
  return <main><section className="hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="shell hero-grid">
    <div><h1>Member handbook</h1><p className="hero-intro">Information for members of Finchley &amp; Golders Green Labour Party.</p><div className="hero-actions"><A page="calendar" className="button button-primary">View the calendar <ArrowRight size={18} /></A><A page="our-clp" className="button button-ghost">Find your branch</A></div></div>
    <aside className="notice-card"><p className="notice-label">Start here</p><h2>Three first steps</h2><ol><li><span>1</span><div><strong>Find your branch</strong><small>Your ward decides which branch you belong to.</small></div></li><li><span>2</span><div><strong>Attend a meeting</strong><small>Dates and details are in the calendar.</small></div></li><li><span>3</span><div><strong>Take part</strong><small>Campaign, vote in Party ballots, attend events or suggest a speaker.</small></div></li></ol></aside>
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
  return <main className="content-page"><Intro kicker="Member guide" title="How members can take part">Voting, selections, events, campaigning, conference and the formal routes for raising an issue.</Intro><section className="shell guide-layout">
    <aside className="guide-nav"><p>On this page</p><a href="#democracy">NEC, NPF and selections</a><a href="#speakers">Suggest a speaker</a><a href="#delegate">Conference delegate</a><a href="#local-motion">Local motions</a><a href="#conference-motion">Conference motions</a><a href="#expectations">What delegates do</a></aside>
    <div className="guide-content"><article id="democracy" className="guide-section"><span className="section-icon"><Landmark /></span><p className="eyebrow">Membership democracy</p><h2>Your vote and your voice</h2><div className="motion-grid"><div><h3>National Executive Committee (NEC)</h3><p>The NEC is the Party’s national administrative authority, subject to Annual Conference. It oversees organisation, rules, elections and the running of the Party.</p><p>Eligible members vote directly for the NEC seats allocated to individual members when a ballot is held. The Party emails ballot papers and the rules for that election. CLPs can also make nominations through their local meetings.</p></div><div><h3>National Policy Forum (NPF)</h3><p>The NPF and its policy commissions develop the Party’s rolling policy programme for Annual Conference. Members can contribute through policy consultations and local policy discussions.</p><p>Under the 2026 rules, CLPs nominate their regional NPF representatives, while the relevant regional and national delegations at Annual Conference elect them by card vote. This is not normally a direct ballot of every member.</p></div></div><h3>Choosing Labour candidates</h3><p>Members also help select Labour candidates for public office. The process and timetable depend on the election. The 2026 Rule Book says eligible members living in the electoral area, normally with at least six months’ continuous membership, are entitled to participate unless the NEC approves an exception. Watch for official emails and attend any hustings before voting.</p><p className="rule-note">Ballot eligibility and timetables can change. Follow the instructions issued for each election or selection.</p></article>
    <article id="speakers" className="guide-section"><span className="section-icon"><UsersRound /></span><p className="eyebrow">Meetings and events</p><h2>Suggest a speaker</h2><p>Know someone members would benefit from hearing? Suggest a speaker or topic for a future CLP or branch event. A suggestion does not guarantee an invitation, but it helps the team plan a useful programme.</p><a className="button button-primary form-button" href="https://docs.google.com/forms/d/1hnWOxp8OGsX-VWnSxm4dpRJMaItzqbeAt1H6JHlPcPA/viewform" target="_blank" rel="noreferrer">Suggest a speaker <ExternalLink size={17} /></a></article>
    <article id="delegate" className="guide-section"><span className="section-icon"><Users /></span><p className="eyebrow">Annual Conference</p><h2>Apply to be a conference delegate</h2><p>Conference delegates represent the CLP in formal conference business: listening to debates, participating in votes and ballots, and helping carry local priorities into the wider party.</p><div className="process-list">{delegateSteps.map(([title, copy], i) => <div className="process-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="draft-callout"><strong>2026 draft timetable — check before publishing</strong><p>The supplied local draft lists applications by <b>15 May 2026</b>, branch nominations in May, GC selection in June and Party accreditation by <b>12 noon on 26 June 2026</b>. The draft itself flags the accreditation deadline and some costs for confirmation, so members should verify these with their Branch Secretary.</p></div></article>
    <article id="local-motion" className="guide-section"><span className="section-icon"><FilePenLine /></span><p className="eyebrow">Branch and GC business</p><h2>Ordinary local motions</h2><p>A local motion is a formal way to ask a branch or the General Committee to take a position or action. It is most useful when a clear decision is actually needed. You can also raise questions, volunteer, join a discussion or suggest an activity without writing a motion.</p><ol className="plain-steps"><li><b>Speak to your Branch Secretary first.</b> They can advise whether a motion is needed and tell you the agenda deadline.</li><li><b>Keep it practical.</b> State the issue and the action requested, within the powers of the branch or CLP.</li><li><b>Raise it through your branch.</b> In this delegate CLP, an agreed branch motion can be taken to GC by the branch’s delegates.</li></ol></article>
    <article id="conference-motion" className="guide-section"><span className="section-icon"><Megaphone /></span><p className="eyebrow">Annual Conference</p><h2>Conference motions are different</h2><p>A contemporary motion asks Annual Conference to consider one current policy subject. Under the 2026 Rule Book, a CLP may submit one; it must be in writing, cover one subject, be no more than 250 words and not be substantially addressed by the NEC or NPF reports.</p><p><b>Local deadline:</b> for this CLP, a proposed conference motion must reach and be agreed by the September GC. Ask the CLP Secretary for the exact agenda deadline before drafting.</p><p className="rule-note"><b>Emergency motions are exceptional.</b> They must concern an urgent and immediate matter that arose after the contemporary-motion deadline and must meet the Conference Arrangements Committee’s deadline and test.</p></article>
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
  return <><Header /><View /></>;
}

createRoot(document.getElementById('root')!).render(<App />);
